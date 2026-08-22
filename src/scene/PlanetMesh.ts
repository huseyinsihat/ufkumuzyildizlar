import {
  AdditiveBlending,
  BufferGeometry,
  Float32BufferAttribute,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  SphereGeometry,
} from 'three'
import { DEG2RAD } from '../astronomy/astronomyConstants'
import type { PlanetDefinition } from '../types/planet'
import type { ScaleMode } from '../types/simulation'
import { visualRadius } from '../astronomy/visualScale'
import { createBodyTexture } from './proceduralTextures'
import type { BodyTextureSet } from './loadBodyTextures'
import { RingMesh } from './RingMesh'

const HIGH_GEO = new SphereGeometry(1, 64, 48)
const LOW_GEO = new SphereGeometry(1, 24, 16)

export class PlanetMesh {
  readonly group: Group
  readonly tiltGroup: Group
  readonly mesh: Mesh
  readonly body: PlanetDefinition
  readonly glow: Mesh
  readonly axis: Line
  private northCap: Mesh | null = null
  private atmosphere: Mesh | null = null
  private clouds: Mesh | null = null
  private rings: RingMesh | null = null
  private spin = 0
  private cloudSpin = 0
  private lod: 'high' | 'low' = 'high'

  constructor(body: PlanetDefinition) {
    this.body = body
    this.group = new Group()
    this.group.name = body.id

    this.tiltGroup = new Group()
    this.tiltGroup.rotation.z = body.axialTiltDeg * DEG2RAD
    this.group.add(this.tiltGroup)

    const texture = createBodyTexture(
      body.id,
      body.color,
      body.id === 'earth' || body.id === 'jupiter' || body.id === 'saturn' ? 768 : 512,
    )
    const gas = body.category === 'gasGiant' || body.category === 'iceGiant'
    const rocky = body.id === 'moon' || body.id === 'mercury'
    const material = new MeshStandardMaterial({
      map: texture,
      roughness: body.id === 'earth' ? 0.46 : body.id === 'venus' ? 0.4 : rocky ? 0.97 : gas ? 0.84 : 0.8,
      metalness: 0,
      emissive: '#000000',
      emissiveIntensity: 0,
    })

    this.mesh = new Mesh(HIGH_GEO, material)
    this.mesh.userData.bodyId = body.id
    this.mesh.castShadow = false
    this.mesh.receiveShadow = false
    this.tiltGroup.add(this.mesh)

    this.glow = new Mesh(
      LOW_GEO,
      new MeshBasicMaterial({
        color: '#7ee0ff',
        transparent: true,
        opacity: 0,
        blending: AdditiveBlending,
        depthWrite: false,
      }),
    )
    this.glow.scale.setScalar(1.12)
    this.glow.raycast = () => {}
    this.tiltGroup.add(this.glow)

    const axisGeo = new BufferGeometry()
    axisGeo.setAttribute('position', new Float32BufferAttribute([0, -2.1, 0, 0, 2.1, 0], 3))
    this.axis = new Line(axisGeo, new LineBasicMaterial({ color: '#9be7ff' }))
    this.axis.visible = false
    this.axis.raycast = () => {}
    this.tiltGroup.add(this.axis)

    if (body.id === 'earth' || body.id === 'venus' || gas) {
      const tint =
        body.id === 'earth' ? '#6ec8ff' : body.id === 'venus' ? '#f0c27a' : body.id === 'jupiter' ? '#e0c089' : body.id === 'saturn' ? '#ead7a4' : body.id === 'uranus' ? '#9fe4e2' : '#6ea4ff'
      this.atmosphere = new Mesh(
        HIGH_GEO,
        new MeshBasicMaterial({
          color: tint,
          transparent: true,
          opacity: body.id === 'earth' ? 0.16 : body.id === 'venus' ? 0.22 : gas ? 0.1 : 0.12,
          blending: AdditiveBlending,
          depthWrite: false,
        }),
      )
      this.atmosphere.scale.setScalar(gas ? 1.03 : 1.045)
      this.atmosphere.raycast = () => {}
      this.tiltGroup.add(this.atmosphere)
    }

    if (body.id === 'earth') {
      this.northCap = new Mesh(
        new SphereGeometry(0.38, 16, 12),
        new MeshBasicMaterial({ color: '#93c5fd', transparent: true, opacity: 0 }),
      )
      this.northCap.raycast = () => {}
      this.tiltGroup.add(this.northCap)
    }

    if (body.id === 'moon') {
      const mark = new Mesh(
        new SphereGeometry(0.12, 12, 10),
        new MeshBasicMaterial({ color: '#f6e05e' }),
      )
      mark.position.set(0, 0, 1.12)
      mark.raycast = () => {}
      this.mesh.add(mark)
    }

    if (body.hasRings) {
      this.rings = new RingMesh(body.ringInnerScale ?? 1.2, body.ringOuterScale ?? 2.1, body.id === 'uranus')
      this.tiltGroup.add(this.rings.mesh)
    }

    this.applyScale('educational')
  }

  applyMaps(set: BodyTextureSet): void {
    const material = this.mesh.material
    if (!(material instanceof MeshStandardMaterial)) return
    if (set.map) {
      material.map?.dispose()
      material.map = set.map
    }
    if (set.normalMap) {
      material.normalMap = set.normalMap
      material.normalScale.set(1.15, 1.15)
    }
    if (set.roughnessMap) {
      material.roughnessMap = set.roughnessMap
      material.roughness = 0.92
    } else if (this.body.id === 'earth') {
      material.roughness = 0.42
    }
    if (set.emissiveMap && this.body.id === 'earth') {
      material.emissiveMap = set.emissiveMap
      material.emissive.set('#ffc27a')
      material.emissiveIntensity = 0.55
    }
    if (set.clouds && this.body.id === 'earth' && !this.clouds) {
      this.clouds = new Mesh(
        HIGH_GEO,
        new MeshStandardMaterial({
          map: set.clouds,
          transparent: true,
          opacity: 0.44,
          depthWrite: false,
          roughness: 1,
          metalness: 0,
        }),
      )
      this.clouds.scale.setScalar(this.mesh.scale.x * 1.018)
      this.clouds.raycast = () => {}
      this.tiltGroup.add(this.clouds)
    }
    material.needsUpdate = true
  }

  applyScale(mode: ScaleMode): void {
    const radius = Math.max(visualRadius(this.body.id, mode), 0.012)
    this.mesh.scale.setScalar(radius)
    this.glow.scale.setScalar(radius * 1.14)
    this.atmosphere?.scale.setScalar(radius * (this.body.category === 'gasGiant' || this.body.category === 'iceGiant' ? 1.03 : 1.045))
    this.clouds?.scale.setScalar(radius * 1.018)
    this.axis.scale.setScalar(radius)
    this.northCap?.position.set(0, radius * 1.02, 0)
    this.northCap?.scale.setScalar(radius)
    this.rings?.setPlanetRadius(radius)
  }

  setTiltDeg(deg: number): void {
    this.tiltGroup.rotation.z = deg * DEG2RAD
  }

  setNorthCap(kind: 'warm' | 'cold' | 'off'): void {
    if (!this.northCap) return
    const mat = this.northCap.material
    if (!(mat instanceof MeshBasicMaterial)) return
    if (kind === 'off') {
      mat.opacity = 0
      return
    }
    mat.color.set(kind === 'warm' ? '#fbd38d' : '#93c5fd')
    mat.opacity = 0.85
  }

  setSelected(selected: boolean): void {
    const material = this.glow.material
    if (!Array.isArray(material)) {
      material.opacity = selected ? 0.28 : 0
    }
  }

  setAxisVisible(visible: boolean): void {
    this.axis.visible = visible
  }

  updateLod(cameraDistance: number): void {
    const radius = this.mesh.scale.x
    const next = cameraDistance / Math.max(radius, 0.01) > 90 ? 'low' : 'high'
    if (next === this.lod) {
      return
    }
    this.lod = next
    this.mesh.geometry = next === 'high' ? HIGH_GEO : LOW_GEO
    this.rings?.setLod(next === 'high')
  }

  update(dtSimSeconds: number): void {
    const period = Math.abs(this.body.rotationPeriodHours) * 3600
    if (period === 0) {
      return
    }
    const sign = this.body.rotationPeriodHours < 0 ? -1 : 1
    this.spin += sign * ((Math.PI * 2) / period) * dtSimSeconds
    this.mesh.rotation.y = this.spin
    if (this.clouds) {
      this.cloudSpin += sign * ((Math.PI * 2) / period) * dtSimSeconds * 1.12
      this.clouds.rotation.y = this.cloudSpin
    }
    this.rings?.update(dtSimSeconds)
  }

  dispose(): void {
    const material = this.mesh.material
    if (material instanceof MeshStandardMaterial) {
      material.map?.dispose()
      material.roughnessMap?.dispose()
      material.emissiveMap?.dispose()
      material.normalMap?.dispose()
      material.dispose()
    }
    this.axis.geometry.dispose()
    const axisMat = this.axis.material
    if (!Array.isArray(axisMat)) axisMat.dispose()
    const glowMat = this.glow.material
    if (!Array.isArray(glowMat)) glowMat.dispose()
    this.rings?.dispose()
    if (this.clouds) {
      const cloudMat = this.clouds.material
      if (cloudMat instanceof MeshStandardMaterial) {
        cloudMat.map?.dispose()
        cloudMat.dispose()
      }
    }
    if (this.atmosphere) {
      const atmMat = this.atmosphere.material
      if (!Array.isArray(atmMat)) atmMat.dispose()
    }
    if (this.northCap) {
      this.northCap.geometry.dispose()
      const capMat = this.northCap.material
      if (!Array.isArray(capMat)) capMat.dispose()
    }
  }
}
