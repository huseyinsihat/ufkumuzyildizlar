import {
  AdditiveBlending,
  Color,
  Group,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  type Texture,
  Vector3,
} from 'three'
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'
import { starHex } from '../astronomy/starSpectrum'
import { NOTABLE_STARS, starDisplayName, type NotableStar } from '../content/skyWonders'
import type { AppLang } from '../i18n/types'
import { eduSkyDirection, SKY_SPHERE_RADIUS } from '../astronomy/skyCoordinates'
import type { ScaleMode } from '../types/simulation'
import {
  createNebulaTexture,
  createStarGlowTexture,
  createStarPhotosphereTexture,
  createStarSpikeTexture,
} from './proceduralTextures'
import { worldRadiusToPixels, type ScreenPickTarget } from './skyPick'
import {
  STAR_LABEL_LOCAL_Y,
  photosphereKey,
  starCoreRadius,
  starGlowRadius,
  starHasSpikes,
  starLook,
  starSelectedScale,
  type StarLook,
} from './starVisual'

const COMPANIONS: Record<string, { offset: number; scale: number; tempK: number }> = {
  capella: { offset: 0.58, scale: 0.84, tempK: 5700 },
  alphacen: { offset: 0.46, scale: 0.88, tempK: 5260 },
  algol: { offset: 0.7, scale: 0.64, tempK: 4500 },
}

interface StarVisual {
  star: NotableStar
  look: StarLook
  mesh: Mesh
  chromosphere: Mesh
  glow: Sprite
  corona: Sprite
  spike: Sprite | null
  motes: Sprite[]
  core: number
  glowSize: number
  phase: number
  label: CSS2DObject
}

export class NotableStars {
  readonly group: Group
  readonly meshes: Mesh[] = []
  private visuals: StarVisual[] = []
  private pulse = 0
  private selectedId: string | null = null
  private scaleMode: ScaleMode = 'educational'
  private lang: AppLang = 'tr'
  private readonly world = new Vector3()
  private readonly ndc = new Vector3()
  private readonly view = new Vector3()
  private readonly shared = new Set<Texture>()

  constructor() {
    this.group = new Group()
    this.group.name = 'notable-stars'
    const geometry = new SphereGeometry(1, 32, 24)
    const shellGeo = new SphereGeometry(1, 24, 18)
    const glowMap = createStarGlowTexture()
    const spikeMap = createStarSpikeTexture()
    const nebulaMap = createNebulaTexture()
    this.shared.add(glowMap)
    this.shared.add(spikeMap)
    this.shared.add(nebulaMap)
    const photos = new Map<string, Texture>()

    const ordered = NOTABLE_STARS.slice().sort((a, b) => a.raHours - b.raHours || a.name.localeCompare(b.name, 'tr'))
    for (let i = 0; i < ordered.length; i += 1) {
      const star = ordered[i]!
      const dir = eduSkyDirection({ x: star.x, y: star.y, z: star.z }, i, ordered.length)
      const x = dir.x * SKY_SPHERE_RADIUS
      const y = dir.y * SKY_SPHERE_RADIUS
      const z = dir.z * SKY_SPHERE_RADIUS
      const core = starCoreRadius(star.radiusSolar, star.mag, this.scaleMode)
      const glowSize = starGlowRadius(star.radiusSolar, star.mag, star.kind, this.scaleMode)
      const look = starLook(star.tempK, star.radiusSolar, star.mag, star.kind)
      const key = photosphereKey(star.tempK, star.radiusSolar)
      let photo = photos.get(key)
      if (!photo) {
        photo = createStarPhotosphereTexture(star.tempK, star.radiusSolar)
        photos.set(key, photo)
        this.shared.add(photo)
      }

      const mesh = new Mesh(
        geometry,
        new MeshBasicMaterial({
          map: photo,
          color: star.kind === 'nebula' ? look.chromosphereHex : '#ffffff',
          transparent: true,
          opacity: star.kind === 'nebula' ? 0.35 : 1,
        }),
      )
      mesh.position.set(x, y, z)
      mesh.scale.setScalar(core)
      mesh.userData.wonderId = star.id
      this.group.add(mesh)
      this.meshes.push(mesh)

      const chromosphere = new Mesh(
        shellGeo,
        new MeshBasicMaterial({
          color: look.chromosphereHex,
          transparent: true,
          opacity: look.chromosphereOpacity,
          blending: AdditiveBlending,
          depthWrite: false,
        }),
      )
      chromosphere.position.copy(mesh.position)
      chromosphere.scale.setScalar(core * look.chromosphereScale)
      chromosphere.raycast = () => {}
      this.group.add(chromosphere)

      const glow = new Sprite(
        new SpriteMaterial({
          map: glowMap,
          color: new Color(look.haloHex),
          transparent: true,
          opacity: look.haloOpacity,
          blending: AdditiveBlending,
          depthWrite: false,
        }),
      )
      glow.scale.setScalar(glowSize)
      glow.position.copy(mesh.position)
      glow.raycast = () => {}
      this.group.add(glow)

      const corona = new Sprite(
        new SpriteMaterial({
          map: star.kind === 'nebula' ? nebulaMap : glowMap,
          color: new Color(look.coronaHex),
          transparent: true,
          opacity: look.coronaOpacity,
          blending: AdditiveBlending,
          depthWrite: false,
        }),
      )
      corona.scale.setScalar(glowSize * look.coronaScale)
      if (star.kind === 'nebula') corona.scale.set(glowSize * 1.35, glowSize * 2.05, 1)
      corona.position.copy(mesh.position)
      corona.raycast = () => {}
      this.group.add(corona)

      let spike: Sprite | null = null
      if (starHasSpikes(star.mag, star.kind)) {
        spike = new Sprite(
          new SpriteMaterial({
            map: spikeMap,
            color: new Color(look.coreHex),
            transparent: true,
            opacity: 0.5,
            blending: AdditiveBlending,
            depthWrite: false,
          }),
        )
        spike.scale.setScalar(glowSize * 1.7)
        spike.position.copy(mesh.position)
        spike.raycast = () => {}
        this.group.add(spike)
      }

      const motes: Sprite[] = []
      if (star.kind === 'cluster') {
        for (let n = 0; n < 8; n += 1) {
          const mote = new Sprite(
            new SpriteMaterial({
              map: glowMap,
              color: new Color(n % 3 === 0 ? '#f4f8ff' : look.haloHex),
              transparent: true,
              opacity: 0.55 + (n % 3) * 0.1,
              blending: AdditiveBlending,
              depthWrite: false,
            }),
          )
          const angle = n * 0.92
          const spread = 1.6 + (n % 4) * 1.15
          mote.position.set(
            x + Math.cos(angle) * spread,
            y + Math.sin(angle * 0.7) * spread * 0.42,
            z + Math.sin(angle) * spread,
          )
          mote.scale.setScalar(core * (0.22 + (n % 4) * 0.08))
          mote.raycast = () => {}
          this.group.add(mote)
          motes.push(mote)
        }
      }

      const companion = COMPANIONS[star.id]
      if (companion) {
        const mote = new Sprite(
          new SpriteMaterial({
            map: glowMap,
            color: new Color(starHex(companion.tempK)),
            transparent: true,
            opacity: 0.82,
            blending: AdditiveBlending,
            depthWrite: false,
          }),
        )
        mote.position.set(x + companion.offset * core, y + companion.offset * 0.18 * core, z)
        mote.scale.setScalar(glowSize * 0.38 * companion.scale)
        mote.raycast = () => {}
        this.group.add(mote)
        motes.push(mote)
      }

      const label = document.createElement('div')
      label.className = 'planet-label sky-label'
      label.textContent = starDisplayName(star, this.lang)
      const css = new CSS2DObject(label)
      css.position.set(0, STAR_LABEL_LOCAL_Y, 0)
      mesh.add(css)

      this.visuals.push({
        star,
        look,
        mesh,
        chromosphere,
        glow,
        corona,
        spike,
        motes,
        core,
        glowSize,
        phase: Math.hypot(star.raHours, star.decDeg) * 0.37,
        label: css,
      })
    }
  }

  setLabelsVisible(visible: boolean): void {
    for (const visual of this.visuals) visual.label.visible = visible
  }

  updateLabels(camera: PerspectiveCamera, enabled: boolean): void {
    if (!enabled) {
      this.setLabelsVisible(false)
      return
    }
    camera.updateMatrixWorld()
    for (const visual of this.visuals) {
      visual.label.getWorldPosition(this.world)
      this.view.copy(this.world).applyMatrix4(camera.matrixWorldInverse)
      this.ndc.copy(this.world).project(camera)
      const inFront = this.view.z < -0.2
      const onScreen = Math.abs(this.ndc.x) < 1.45 && Math.abs(this.ndc.y) < 1.45
      visual.label.visible = inFront && onScreen
    }
  }

  setSelected(id: string | null): void {
    if (this.selectedId === id) return
    this.selectedId = id
    this.applyScales()
  }

  setScaleMode(mode: ScaleMode): void {
    if (this.scaleMode === mode) return
    this.scaleMode = mode
    this.applyScales()
  }

  setLang(lang: AppLang): void {
    this.lang = lang
    for (const visual of this.visuals) {
      visual.label.element.textContent = starDisplayName(visual.star, lang)
    }
  }

  coreRadius(id: string): number | undefined {
    return this.visuals.find((visual) => visual.star.id === id)?.core
  }

  pickTargets(camera: PerspectiveCamera, _width: number, height: number): ScreenPickTarget[] {
    camera.updateMatrixWorld()
    const targets: ScreenPickTarget[] = []
    for (const visual of this.visuals) {
      visual.mesh.getWorldPosition(this.world)
      this.view.copy(this.world).applyMatrix4(camera.matrixWorldInverse)
      const behindCamera = this.view.z > 0
      const distance = this.world.distanceTo(camera.position)
      this.ndc.copy(this.world).project(camera)
      targets.push({
        id: visual.star.id,
        ndcX: this.ndc.x,
        ndcY: this.ndc.y,
        radiusPx: worldRadiusToPixels(visual.glowSize, distance, camera.fov, height),
        behindCamera,
      })
    }
    return targets
  }

  update(dt: number): void {
    this.pulse += dt
    for (const visual of this.visuals) {
      const twinkle = visual.look.twinkle * Math.sin(this.pulse * (2.4 + visual.phase * 0.15) + visual.phase)
      visual.glow.material.opacity = visual.look.haloOpacity + twinkle
      visual.corona.material.opacity = visual.look.coronaOpacity + twinkle * 0.45
      if (visual.spike) visual.spike.material.opacity = 0.38 + twinkle * 0.7
      const chromo = visual.chromosphere.material
      if (chromo instanceof MeshBasicMaterial) chromo.opacity = visual.look.chromosphereOpacity + twinkle * 0.08
      visual.mesh.rotation.y += dt * visual.look.spin
    }
  }

  dispose(): void {
    for (const mesh of this.meshes) {
      const material = mesh.material
      if (material instanceof MeshBasicMaterial) {
        material.map = null
        material.dispose()
      }
    }
    for (const visual of this.visuals) {
      const chromo = visual.chromosphere.material
      if (!Array.isArray(chromo)) chromo.dispose()
      visual.glow.material.map = null
      visual.glow.material.dispose()
      visual.corona.material.map = null
      visual.corona.material.dispose()
      if (visual.spike) {
        visual.spike.material.map = null
        visual.spike.material.dispose()
      }
      for (const mote of visual.motes) {
        mote.material.map = null
        mote.material.dispose()
      }
    }
    for (const map of this.shared) map.dispose()
  }

  private applyScales(): void {
    for (const visual of this.visuals) {
      visual.core = starCoreRadius(visual.star.radiusSolar, visual.star.mag, this.scaleMode)
      visual.glowSize = starGlowRadius(
        visual.star.radiusSolar,
        visual.star.mag,
        visual.star.kind,
        this.scaleMode,
      )
      const boost = starSelectedScale(visual.star.id === this.selectedId)
      visual.mesh.scale.setScalar(visual.core * boost)
      visual.chromosphere.scale.setScalar(visual.core * visual.look.chromosphereScale * boost)
      visual.glow.scale.setScalar(visual.glowSize * boost)
      if (visual.star.kind === 'nebula') {
        visual.corona.scale.set(visual.glowSize * 1.35 * boost, visual.glowSize * 2.05 * boost, 1)
      } else {
        visual.corona.scale.setScalar(visual.glowSize * visual.look.coronaScale * boost)
      }
      if (visual.spike) visual.spike.scale.setScalar(visual.glowSize * 1.7 * boost)
      visual.label.position.set(0, STAR_LABEL_LOCAL_Y, 0)
      visual.motes.forEach((mote, index) => {
        if (visual.star.kind === 'cluster') {
          mote.scale.setScalar(visual.core * (0.22 + (index % 4) * 0.08) * boost)
        } else {
          mote.scale.setScalar(visual.glowSize * 0.38 * boost)
        }
      })
    }
  }
}
