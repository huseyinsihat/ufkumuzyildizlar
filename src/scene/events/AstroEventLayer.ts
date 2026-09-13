import {
  AdditiveBlending,
  BufferGeometry,
  CircleGeometry,
  ConeGeometry,
  DoubleSide,
  Float32BufferAttribute,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  NormalBlending,
  RingGeometry,
  SphereGeometry,
  TorusGeometry,
  Vector3,
  type Material,
  type Object3D,
} from 'three'
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'
import { getAstroEvent, getSelectableEvent, type AstroEventId } from '../../content/astroEvents'
import { visualMoonOrbitRadius, visualRadius } from '../../astronomy/visualScale'
import { stageLunarMoon, stageSolarMoon } from '../../features/astroEvents/eclipseStage'
import { focusEvent } from '../../features/astroEvents/focusEvent'
import { tx } from '../../i18n/types'
import { useEventStore } from '../../store/eventStore'
import { useVoiceStore } from '../../store/voiceStore'
import type { PlanetMesh } from '../PlanetMesh'
import type { SunMesh } from '../SunMesh'
import type { BodyId } from '../../types/planet'
import type { ScaleMode } from '../../types/simulation'

const SKY: Record<'supernova' | 'ns-merger' | 'black-hole', [number, number, number]> = {
  supernova: [92, 38, 36],
  'ns-merger': [-78, 32, 54],
  'black-hole': [58, -22, 86],
}

function glowMat(color: string, opacity: number, additive = true): MeshBasicMaterial {
  return new MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: additive ? AdditiveBlending : NormalBlending,
    depthWrite: false,
    side: DoubleSide,
  })
}

function envelope(progress: number): number {
  if (progress < 0.2) return progress / 0.2
  if (progress > 0.8) return Math.max(0, (1 - progress) / 0.2)
  return 1
}

function story(progress: number): number {
  if (progress <= 0.2) return 0
  if (progress >= 0.8) return 1
  return (progress - 0.2) / 0.6
}

function setOpacity(material: Material | Material[], opacity: number): void {
  const list = Array.isArray(material) ? material : [material]
  for (const item of list) {
    if ('opacity' in item) item.opacity = opacity
  }
}

export interface EventLayerHosts {
  sun: SunMesh
  planets: Map<BodyId, PlanetMesh>
  scaleMode: ScaleMode
}

export class AstroEventLayer {
  readonly group = new Group()
  readonly pickMeshes: Mesh[] = []
  private anchor = new Group()
  private marker: CSS2DObject
  private pick: Mesh
  private current: AstroEventId | null = null
  private inspecting = false
  private hidMoon = false
  private clock = 0
  private world = new Vector3()
  private tmp = new Vector3()

  private shadow: Mesh
  private moon: Mesh
  private moonShadow: Mesh
  private plume: Mesh
  private jets: Group
  private haze: Mesh
  private rain: Line
  private ice: Mesh
  private ocean: Mesh
  private flareLoop: Mesh
  private puff: Mesh
  private auroraN: Mesh
  private auroraS: Mesh
  private grs: Mesh
  private dust: Mesh
  private ringWave: Mesh
  private meteors: { line: Line; life: number; max: number }[] = []
  private meteorRoot = new Group()
  private meteorGeo: BufferGeometry
  private meteorMat: LineBasicMaterial
  private novaCore: Mesh
  private novaShell: Mesh
  private starA: Mesh
  private starB: Mesh
  private gwRing: Mesh
  private hole: Mesh
  private accretion: Mesh
  private alignLine: Line
  private cometHead: Mesh
  private cometTail: Mesh
  private axisY = new Vector3(0, 1, 0)
  private nodes: Object3D[] = []

  constructor() {
    this.group.name = 'astro-events'
    this.anchor.name = 'event-anchor'
    this.group.add(this.anchor)

    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'event-chip'
    button.innerHTML = '<span class="event-marker">?</span><span class="event-marker-name"></span>'
    button.setAttribute('aria-label', 'Gök olayını aç')
    button.addEventListener('click', (event) => {
      event.stopPropagation()
      const store = useEventStore.getState()
      const id = store.selectedEventId ?? store.activeEventId
      if (id) focusEvent(id)
    })
    this.marker = new CSS2DObject(button)
    this.marker.position.set(0, 0.15, 0)
    this.anchor.add(this.marker)

    this.pick = new Mesh(new SphereGeometry(1, 12, 10), glowMat('#fff8e1', 0, false))
    this.pick.userData.eventPick = true
    this.pick.scale.setScalar(1.15)
    this.anchor.add(this.pick)
    this.pickMeshes.push(this.pick)

    this.shadow = this.mesh(new CircleGeometry(1, 24), glowMat('#020617', 0.4, false), 'shadow')
    this.moon = this.mesh(new SphereGeometry(1, 24, 18), glowMat('#c9b8a6', 0.95, false), 'moon')
    this.moonShadow = this.mesh(new CircleGeometry(1, 20), glowMat('#0b1220', 0.38, false), 'moon-shadow')
    this.plume = this.mesh(new ConeGeometry(0.18, 1.1, 10, 1, true), glowMat('#f6c177', 0.32), 'plume')
    this.jets = new Group()
    this.jets.name = 'jets'
    this.group.add(this.jets)
    this.nodes.push(this.jets)
    for (let i = 0; i < 3; i += 1) {
      const geo = new BufferGeometry()
      geo.setAttribute('position', new Float32BufferAttribute([0, 0, 0, 0, -1.8, 0], 3))
      const line = new Line(geo, new LineBasicMaterial({ color: '#dbeafe', transparent: true, opacity: 0.35, blending: AdditiveBlending, depthWrite: false }))
      line.raycast = () => {}
      line.position.x = (i - 1) * 0.08
      this.jets.add(line)
    }
    this.haze = this.mesh(new SphereGeometry(1, 24, 18), glowMat('#e8a060', 0.22), 'haze')
    const rainGeo = new BufferGeometry()
    const rainPts: number[] = []
    for (let i = 0; i < 18; i += 1) {
      const a = (i / 18) * Math.PI * 2
      rainPts.push(Math.cos(a) * 0.55, 0.7, Math.sin(a) * 0.55, Math.cos(a) * 0.4, -0.15, Math.sin(a) * 0.4)
    }
    rainGeo.setAttribute('position', new Float32BufferAttribute(rainPts, 3))
    this.rain = new Line(rainGeo, new LineBasicMaterial({ color: '#f0d2a0', transparent: true, opacity: 0.28, depthWrite: false }))
    this.rain.raycast = () => {}
    this.group.add(this.rain)
    this.nodes.push(this.rain)
    this.ice = this.mesh(new SphereGeometry(1, 24, 18), glowMat('#e2e8f4', 0.28), 'ice')
    this.ocean = this.mesh(new SphereGeometry(1, 24, 18), glowMat('#3b82c4', 0.35), 'ocean')
    this.flareLoop = this.mesh(new TorusGeometry(1, 0.08, 8, 32), glowMat('#ffe08a', 0.4), 'flare')
    this.puff = this.mesh(new SphereGeometry(1, 16, 12), glowMat('#fde68a', 0.22), 'puff')
    this.auroraN = this.mesh(new TorusGeometry(0.72, 0.07, 8, 28), glowMat('#4ade80', 0.28), 'aurora-n')
    this.auroraS = this.mesh(new TorusGeometry(0.72, 0.07, 8, 28), glowMat('#f87171', 0.18), 'aurora-s')
    this.grs = this.mesh(new SphereGeometry(1, 16, 12), glowMat('#c45c28', 0.42, false), 'grs')
    this.dust = this.mesh(new SphereGeometry(1, 24, 18), glowMat('#c47b48', 0.28, false), 'dust')
    this.ringWave = this.mesh(new RingGeometry(1.35, 2.05, 96, 1), glowMat('#f5e6c8', 0.18), 'ring-wave')
    this.ringWave.rotation.x = Math.PI / 2
    this.meteorGeo = new BufferGeometry()
    this.meteorGeo.setAttribute('position', new Float32BufferAttribute([0, 0, 0, 0, 0, -1.8], 3))
    this.meteorMat = new LineBasicMaterial({
      color: '#ffe6b0',
      transparent: true,
      opacity: 0.7,
      blending: AdditiveBlending,
      depthWrite: false,
    })
    this.group.add(this.meteorRoot)
    this.nodes.push(this.meteorRoot)
    this.novaCore = this.mesh(new SphereGeometry(1, 16, 12), glowMat('#fff4d6', 0.7), 'nova-core')
    this.novaShell = this.mesh(new SphereGeometry(1, 24, 18), glowMat('#ffd27a', 0.18), 'nova-shell')
    this.starA = this.mesh(new SphereGeometry(1, 12, 10), glowMat('#dbeafe', 0.7), 'star-a')
    this.starB = this.mesh(new SphereGeometry(1, 12, 10), glowMat('#e0e7ff', 0.7), 'star-b')
    this.gwRing = this.mesh(new RingGeometry(0.8, 0.95, 48), glowMat('#93c5fd', 0.22), 'gw')
    this.hole = this.mesh(new SphereGeometry(1, 16, 12), glowMat('#020617', 0.92, false), 'hole')
    this.accretion = this.mesh(new RingGeometry(1.15, 1.7, 48), glowMat('#fbbf24', 0.22), 'accretion')
    const alignGeo = new BufferGeometry()
    alignGeo.setAttribute('position', new Float32BufferAttribute([0, 0, 0, 0, 0, 0.5, 0, 0, 1], 3))
    this.alignLine = new Line(
      alignGeo,
      new LineBasicMaterial({ color: '#fde68a', transparent: true, opacity: 0.55, blending: AdditiveBlending, depthWrite: false }),
    )
    this.alignLine.name = 'align'
    this.alignLine.raycast = () => {}
    this.group.add(this.alignLine)
    this.nodes.push(this.alignLine)
    this.cometHead = this.mesh(new SphereGeometry(1, 12, 10), glowMat('#fff6d5', 0.9), 'comet-head')
    this.cometTail = this.mesh(new ConeGeometry(0.28, 2.6, 8, 1, true), glowMat('#ffe08a', 0.42), 'comet-tail')
    this.hideAll()
  }

  private mesh(geometry: BufferGeometry, material: MeshBasicMaterial, name: string): Mesh {
    const mesh = new Mesh(geometry, material)
    mesh.name = name
    mesh.raycast = () => {}
    this.group.add(mesh)
    this.nodes.push(mesh)
    return mesh
  }

  markerWorldPosition(out: Vector3): boolean {
    if (!this.current) return false
    this.anchor.getWorldPosition(out)
    return true
  }

  skyWorldPosition(id: string, out: Vector3): boolean {
    const visual = getSelectableEvent(id)?.visualId
    if (visual !== 'supernova' && visual !== 'ns-merger' && visual !== 'black-hole') return false
    const [x, y, z] = SKY[visual]
    out.set(x, y, z)
    return true
  }

  update(
    dt: number,
    hosts: EventLayerHosts,
    eventId: AstroEventId | null,
    startedAt: number,
    now: number,
    inspecting = false,
  ): void {
    const event = getAstroEvent(eventId)
    if (!event) {
      if (this.current) this.teardown(hosts)
      return
    }
    if (this.current !== event.id || this.inspecting !== inspecting) {
      this.teardown(hosts)
      this.current = event.id
      this.inspecting = inspecting
      this.clock = 0
      this.setup(event.id, hosts, inspecting)
    }
    this.clock += dt
    const progress = Math.min(1, (now - startedAt) / Math.max(event.durationMs, 1))
    const fade = envelope(progress)
    this.animate(event.id, hosts, fade, progress, dt, inspecting)
    this.placeMarker(event.id, hosts, fade, inspecting)
    this.pick.userData.eventId = event.id
    const name = this.marker.element.querySelector('.event-marker-name')
    const lang = useVoiceStore.getState().lang
    const shortName = tx(lang, event.shortName)
    const title = tx(lang, event.title)
    if (name) name.textContent = shortName
    this.marker.element.setAttribute('aria-label', `${shortName}: ${title}`)
    this.marker.element.classList.toggle(
      'is-selected',
      getSelectableEvent(useEventStore.getState().selectedEventId)?.visualId === event.id,
    )
    this.marker.element.classList.toggle('is-hidden', fade < 0.08)
  }

  private setup(id: AstroEventId, hosts: EventLayerHosts, inspecting: boolean): void {
    const jupiter = hosts.planets.get('jupiter')
    const saturn = hosts.planets.get('saturn')
    const earth = hosts.planets.get('earth')
    const mars = hosts.planets.get('mars')
    if (id === 'solar-eclipse' && earth) this.adopt(this.shadow, earth.group)
    if (id === 'lunar-eclipse') {
      if (inspecting) this.adopt(this.shadow, this.moon)
      else {
        const moon = hosts.planets.get('moon')
        if (moon) this.adopt(this.shadow, moon.group)
      }
    }
    if (inspecting && (id === 'solar-eclipse' || id === 'lunar-eclipse')) {
      const moon = hosts.planets.get('moon')
      if (moon) {
        moon.group.visible = false
        this.hidMoon = true
      }
    }
    if ((id === 'jupiter-moon-shadow' || id === 'io-volcano' || id === 'europa-ocean') && jupiter) {
      const real = id === 'europa-ocean' ? hosts.planets.get('europa') : hosts.planets.get('io')
      if (!real) this.adopt(this.moon, jupiter.tiltGroup)
      if (id === 'jupiter-moon-shadow') this.adopt(this.moonShadow, jupiter.tiltGroup)
      if (id === 'io-volcano') this.adopt(this.plume, real?.mesh ?? this.moon)
      if (id === 'europa-ocean') {
        this.adopt(this.ocean, jupiter.tiltGroup)
        this.adopt(this.ice, jupiter.tiltGroup)
      }
    }
    if ((id === 'enceladus-geyser' || id === 'titan-methane') && saturn) {
      const titan = hosts.planets.get('titan')
      if (id === 'enceladus-geyser' || !titan) this.adopt(this.moon, saturn.tiltGroup)
      if (id === 'enceladus-geyser') this.adopt(this.jets, this.moon)
      if (id === 'titan-methane') {
        this.adopt(this.haze, titan?.group ?? this.moon)
        this.adopt(this.rain, titan?.group ?? this.moon)
      }
    }
    if (id === 'solar-flare') this.adopt(this.flareLoop, hosts.sun.group)
    if (id === 'cme-aurora' && earth) {
      this.adopt(this.auroraN, earth.tiltGroup)
      this.adopt(this.auroraS, earth.tiltGroup)
    }
    if (id === 'jupiter-grs' && jupiter) this.adopt(this.grs, jupiter.mesh)
    if (id === 'neptune-spot') {
      const neptune = hosts.planets.get('neptune')
      if (neptune) this.adopt(this.grs, neptune.mesh)
    }
    if (id === 'mars-dust' && mars) this.adopt(this.dust, mars.tiltGroup)
    if (id === 'saturn-rings' && saturn) this.adopt(this.ringWave, saturn.tiltGroup)
    if (id === 'uranus-tilt') {
      const uranus = hosts.planets.get('uranus')
      if (uranus) this.adopt(this.ringWave, uranus.tiltGroup)
    }
    if (id === 'venus-haze') {
      const venus = hosts.planets.get('venus')
      if (venus) this.adopt(this.haze, venus.tiltGroup)
    }
    if (id === 'comet-tail') {
      this.cometHead.visible = true
      this.cometTail.visible = true
    }
    if (id === 'meteor-shower' && earth) this.adopt(this.meteorRoot, earth.group)
    if (id === 'supernova') {
      this.novaCore.visible = true
      this.novaShell.visible = true
    }
    if (id === 'ns-merger') {
      this.starA.visible = true
      this.starB.visible = true
      this.gwRing.visible = true
    }
    if (id === 'black-hole') {
      this.hole.visible = true
      this.accretion.visible = true
    }
  }

  private animate(
    id: AstroEventId,
    hosts: EventLayerHosts,
    fade: number,
    progress: number,
    dt: number,
    inspecting: boolean,
  ): void {
    const r = (body: BodyId) => visualRadius(body, hosts.scaleMode)
    const t = this.clock
    const play = story(progress)
    const fx = fade * (inspecting ? 1 : 0.5)
    if (id === 'solar-eclipse') {
      const earth = hosts.planets.get('earth')
      if (!earth) return
      const radius = r('earth')
      const earthPos = earth.group.position
      this.shadow.visible = true
      if (this.shadow.material instanceof MeshBasicMaterial) this.shadow.material.color.set('#020617')
      this.shadow.scale.setScalar(radius * 0.34)
      if (inspecting) {
        const moonDist = visualMoonOrbitRadius(hosts.scaleMode)
        const staged = stageSolarMoon(earthPos, moonDist)
        this.moon.visible = true
        this.moon.position.set(staged.x, staged.y, staged.z)
        this.moon.scale.setScalar(r('moon'))
        this.tintMoon('#c9b8a6')
        setOpacity(this.moon.material, 0.98 * fx)
        this.tmp.set(staged.x - earthPos.x, staged.y - earthPos.y, staged.z - earthPos.z)
        if (this.tmp.lengthSq() < 1e-8) this.tmp.copy(earthPos).multiplyScalar(-1)
        this.tmp.normalize().multiplyScalar(radius * 1.04)
        this.shadow.position.copy(this.tmp)
        this.shadow.lookAt(0, 0, 0)
        this.setAlignLine(0, 0, 0, staged.x, staged.y, staged.z, earthPos.x, earthPos.y, earthPos.z)
        this.alignLine.visible = true
        setOpacity(this.alignLine.material, 0.78 * fx * Math.min(1, play * 1.5))
      } else {
        this.moon.visible = false
        this.alignLine.visible = false
        const moon = hosts.planets.get('moon')
        if (moon) {
          this.tmp.copy(moon.group.position).sub(earthPos)
          if (this.tmp.lengthSq() < 1e-8) this.tmp.copy(earthPos).multiplyScalar(-1)
        } else {
          this.tmp.copy(earthPos).multiplyScalar(-1)
        }
        this.tmp.normalize().multiplyScalar(radius * 1.04)
        this.shadow.position.copy(this.tmp)
        this.shadow.lookAt(0, 0, 0)
      }
      setOpacity(this.shadow.material, 0.78 * fx)
    } else if (id === 'lunar-eclipse') {
      const moonDist = visualMoonOrbitRadius(hosts.scaleMode)
      this.shadow.visible = true
      if (this.shadow.material instanceof MeshBasicMaterial) this.shadow.material.color.set('#7f1d1d')
      if (inspecting) {
        const earth = hosts.planets.get('earth')
        if (!earth) return
        const staged = stageLunarMoon(earth.group.position, moonDist)
        const radius = r('moon')
        this.moon.visible = true
        this.moon.position.set(staged.x, staged.y, staged.z)
        this.moon.scale.setScalar(radius)
        this.tintMoon('#c9b8a6')
        setOpacity(this.moon.material, 0.98 * fx)
        this.shadow.scale.setScalar(radius * 0.72)
        this.tmp.copy(this.moon.position).multiplyScalar(-1)
        if (this.tmp.lengthSq() < 1e-8) this.tmp.set(0, 0, 1)
        this.tmp.normalize().multiplyScalar(radius * 1.05)
        this.shadow.position.copy(this.tmp)
        this.shadow.lookAt(0, 0, 0)
        const ep = earth.group.position
        this.setAlignLine(0, 0, 0, ep.x, ep.y, ep.z, staged.x, staged.y, staged.z)
        this.alignLine.visible = true
        setOpacity(this.alignLine.material, 0.78 * fx * Math.min(1, play * 1.5))
      } else {
        const moon = hosts.planets.get('moon')
        if (!moon) return
        const radius = r('moon')
        this.moon.visible = false
        this.alignLine.visible = false
        this.shadow.scale.setScalar(radius * 0.72)
        this.tmp.copy(moon.group.position).multiplyScalar(-1)
        if (this.tmp.lengthSq() < 1e-8) this.tmp.set(0, 0, 1)
        this.tmp.normalize().multiplyScalar(radius * 1.05)
        this.shadow.position.copy(this.tmp)
        this.shadow.lookAt(0, 0, 0)
      }
      setOpacity(this.shadow.material, 0.8 * fx)
    } else if (id === 'jupiter-moon-shadow') {
      const jupiter = hosts.planets.get('jupiter')
      const io = hosts.planets.get('io')
      const jr = r('jupiter')
      this.moonShadow.visible = true
      this.moonShadow.scale.setScalar(jr * 0.22)
      if (io && jupiter) {
        this.moon.visible = false
        this.tmp.copy(io.group.position)
        jupiter.tiltGroup.worldToLocal(this.tmp)
        this.moonShadow.position.copy(this.tmp).multiplyScalar(0.42)
      } else {
        this.orbitMoon(jr * 2.65, jr * 0.24, t * 0.38)
        this.moon.visible = true
        this.tintMoon('#c9b8a6')
        this.moonShadow.position.set(this.moon.position.x * 0.4, this.moon.position.y * 0.35, this.moon.position.z * 0.4)
        setOpacity(this.moon.material, 0.98 * fx)
      }
      this.moonShadow.lookAt(0, 0, 0)
      setOpacity(this.moonShadow.material, 0.78 * fx)
    } else if (id === 'io-volcano') {
      const io = hosts.planets.get('io')
      this.plume.visible = true
      this.plume.position.set(0, 0.85, 0)
      this.plume.scale.setScalar(r('io') * 1.6 + 0.35)
      if (io) {
        this.moon.visible = false
      } else {
        this.orbitMoon(r('jupiter') * 2.35, r('jupiter') * 0.22, t * 0.22)
        this.moon.visible = true
        this.tintMoon('#e8b86a')
        setOpacity(this.moon.material, 0.98 * fx)
      }
      setOpacity(this.plume.material, (0.55 + 0.22 * Math.sin(t * 1.6)) * fx)
    } else if (id === 'enceladus-geyser') {
      this.orbitMoon(r('saturn') * 2.2, r('saturn') * 0.16, t * 0.28)
      this.moon.visible = true
      this.jets.visible = true
      this.tintMoon('#e8eef8')
      this.jets.scale.setScalar(r('saturn') * 0.28 + 0.45)
      setOpacity(this.moon.material, 0.98 * fx)
      this.jets.children.forEach((child, index) => {
        if (child instanceof Line) setOpacity(child.material, (0.45 + index * 0.08) * fx)
      })
    } else if (id === 'titan-methane') {
      const titan = hosts.planets.get('titan')
      this.haze.visible = true
      this.rain.visible = true
      if (this.haze.material instanceof MeshBasicMaterial) this.haze.material.color.set('#e8a060')
      this.haze.scale.setScalar(titan ? 1.18 : 1.55)
      this.rain.rotation.y = t * 0.8
      if (titan) {
        this.moon.visible = false
        this.haze.position.set(0, 0, 0)
        this.rain.position.set(0, 0, 0)
      } else {
        this.orbitMoon(r('saturn') * 3.25, r('saturn') * 0.36, t * 0.2)
        this.moon.visible = true
        this.tintMoon('#d4894a')
        setOpacity(this.moon.material, 0.96 * fx)
      }
      setOpacity(this.haze.material, 0.52 * fx)
      setOpacity(this.rain.material, 0.58 * fx)
    } else if (id === 'europa-ocean') {
      const jr = r('jupiter')
      const europa = hosts.planets.get('europa')
      const jupiter = hosts.planets.get('jupiter')
      this.moon.visible = false
      this.ocean.visible = true
      this.ice.visible = true
      if (europa && jupiter) {
        this.world.copy(europa.group.position)
        jupiter.tiltGroup.worldToLocal(this.world)
        this.ocean.position.copy(this.world)
        this.ice.position.copy(this.world)
        this.ocean.scale.setScalar(r('europa') * 0.92)
        this.ice.scale.setScalar(r('europa') * 1.12)
      } else {
        this.orbitMoon(jr * 2.05, jr * 0.18, t * 0.24)
        this.ocean.position.copy(this.moon.position)
        this.ice.position.copy(this.moon.position)
        this.ocean.scale.setScalar(jr * 0.16)
        this.ice.scale.setScalar(jr * 0.2)
      }
      setOpacity(this.ocean.material, 0.62 * fx)
      setOpacity(this.ice.material, 0.34 * fx)
    } else if (id === 'solar-flare') {
      const sr = r('sun')
      this.flareLoop.visible = true
      this.flareLoop.scale.setScalar(sr * 0.82)
      this.flareLoop.rotation.x = 0.7
      this.flareLoop.rotation.y = t * 0.55
      const pulse = fx * (0.65 + 0.35 * Math.sin(t * 7))
      setOpacity(this.flareLoop.material, 0.62 * pulse)
      hosts.sun.setFlare(pulse * 0.95)
    } else if (id === 'cme-aurora') {
      const earth = hosts.planets.get('earth')
      if (!earth) return
      this.puff.visible = true
      const travel = Math.min(1, progress / 0.55)
      earth.group.getWorldPosition(this.world)
      this.puff.position.lerpVectors(hosts.sun.group.position, this.world, travel)
      this.puff.scale.setScalar(0.9 + travel * 1.6)
      setOpacity(this.puff.material, 0.38 * fx * (1 - Math.max(0, travel - 0.75) / 0.25))
      const aurora = fx * Math.max(0, (progress - 0.38) / 0.22)
      const er = r('earth')
      this.auroraN.visible = true
      this.auroraS.visible = true
      this.auroraN.position.set(0, er * 0.78, 0)
      this.auroraS.position.set(0, -er * 0.78, 0)
      this.auroraN.scale.setScalar(er * 1.15)
      this.auroraS.scale.setScalar(er * 1.15)
      this.auroraN.rotation.x = Math.PI / 2
      this.auroraS.rotation.x = Math.PI / 2
      setOpacity(this.auroraN.material, 0.78 * aurora)
      setOpacity(this.auroraS.material, 0.58 * aurora)
    } else if (id === 'jupiter-grs') {
      this.grs.visible = true
      if (this.grs.material instanceof MeshBasicMaterial) this.grs.material.color.set('#c45c28')
      this.grs.position.set(0.72, -0.18, 0.62)
      this.grs.scale.set(0.52, 0.3, 0.14)
      setOpacity(this.grs.material, 0.82 * fx)
    } else if (id === 'mars-dust') {
      const mr = r('mars')
      this.dust.visible = true
      this.dust.scale.setScalar(mr * 1.14)
      setOpacity(this.dust.material, (0.42 + progress * 0.38) * fx)
    } else if (id === 'saturn-rings') {
      const sr = r('saturn')
      this.ringWave.visible = true
      if (this.ringWave.material instanceof MeshBasicMaterial) this.ringWave.material.color.set('#f5e6c8')
      this.ringWave.scale.setScalar(sr)
      this.ringWave.rotation.z = t * 0.32
      setOpacity(this.ringWave.material, (0.42 + 0.18 * Math.sin(t * 1.6)) * fx)
    } else if (id === 'venus-haze') {
      const venus = hosts.planets.get('venus')
      if (!venus) return
      const vr = r('venus')
      this.haze.visible = true
      this.haze.position.set(0, 0, 0)
      this.haze.scale.setScalar(vr * 1.28)
      if (this.haze.material instanceof MeshBasicMaterial) this.haze.material.color.set('#f0c070')
      setOpacity(this.haze.material, (0.5 + 0.12 * Math.sin(t * 0.9)) * fx)
    } else if (id === 'uranus-tilt') {
      const ur = r('uranus')
      this.ringWave.visible = true
      this.ringWave.scale.setScalar(ur * 0.95)
      this.ringWave.rotation.z = t * 0.18
      if (this.ringWave.material instanceof MeshBasicMaterial) this.ringWave.material.color.set('#9ee7f5')
      setOpacity(this.ringWave.material, 0.7 * fx)
    } else if (id === 'neptune-spot') {
      this.grs.visible = true
      if (this.grs.material instanceof MeshBasicMaterial) this.grs.material.color.set('#0f2744')
      this.grs.position.set(0.68, 0.12, 0.58)
      this.grs.scale.set(0.48, 0.28, 0.12)
      setOpacity(this.grs.material, 0.86 * fx)
    } else if (id === 'comet-tail') {
      const sr = r('sun')
      this.cometHead.visible = true
      this.cometTail.visible = true
      this.cometHead.position.set(sr * 4.1, sr * 0.35, sr * 1.15)
      this.cometHead.scale.setScalar(sr * 0.14)
      this.tmp.copy(this.cometHead.position).normalize()
      this.cometTail.position.copy(this.cometHead.position).addScaledVector(this.tmp, sr * 1.35)
      this.cometTail.quaternion.setFromUnitVectors(this.axisY, this.tmp)
      this.cometTail.scale.set(sr * 0.22, sr * 1.9, sr * 0.22)
      setOpacity(this.cometHead.material, 0.95 * fx)
      setOpacity(this.cometTail.material, (0.55 + 0.12 * Math.sin(t * 1.2)) * fx)
    } else if (id === 'meteor-shower') {
      this.meteorRoot.visible = true
      this.updateMeteors(dt, r('earth'), fx)
    } else if (id === 'supernova') {
      const [x, y, z] = SKY.supernova
      this.novaCore.position.set(x, y, z)
      this.novaShell.position.set(x, y, z)
      const flash = progress < 0.22 ? progress / 0.22 : Math.max(0.22, 1 - (progress - 0.22) / 0.78)
      this.novaCore.scale.setScalar(1.05 + flash * 1.8)
      this.novaShell.scale.setScalar(1.6 + progress * 8.4)
      setOpacity(this.novaCore.material, 0.88 * fx * flash)
      setOpacity(this.novaShell.material, 0.36 * fx * (1 - progress * 0.45))
    } else if (id === 'ns-merger') {
      const [x, y, z] = SKY['ns-merger']
      const spiral = Math.max(0, 1 - play) * 3.2
      const angle = t * 1.35
      this.starA.position.set(x + Math.cos(angle) * spiral, y, z + Math.sin(angle) * spiral)
      this.starB.position.set(x - Math.cos(angle) * spiral, y, z - Math.sin(angle) * spiral)
      this.starA.scale.setScalar(0.58)
      this.starB.scale.setScalar(0.58)
      this.gwRing.position.set(x, y, z)
      this.gwRing.scale.setScalar(0.8 + play * 8.2)
      this.gwRing.lookAt(0, 0, 0)
      const flash = progress > 0.55 && progress < 0.78 ? 1 : 0.5
      setOpacity(this.starA.material, 0.9 * fx * (progress < 0.62 ? 1 : 0.18))
      setOpacity(this.starB.material, 0.9 * fx * (progress < 0.62 ? 1 : 0.18))
      setOpacity(this.gwRing.material, 0.48 * fx * flash)
    } else if (id === 'black-hole') {
      const [x, y, z] = SKY['black-hole']
      const shrink = Math.max(0.28, 1 - play * 0.62)
      this.hole.position.set(x, y, z)
      this.accretion.position.set(x, y, z)
      this.hole.scale.setScalar(0.95 * shrink)
      this.accretion.scale.setScalar(1.25 + play * 0.9)
      this.accretion.lookAt(0, 0, 0)
      this.accretion.rotateZ(t * 0.4)
      setOpacity(this.hole.material, 0.96 * fx)
      setOpacity(this.accretion.material, 0.5 * fx)
    }
  }

  private setAlignLine(
    ax: number,
    ay: number,
    az: number,
    bx: number,
    by: number,
    bz: number,
    cx: number,
    cy: number,
    cz: number,
  ): void {
    const attr = this.alignLine.geometry.getAttribute('position')
    attr.setXYZ(0, ax, ay, az)
    attr.setXYZ(1, bx, by, bz)
    attr.setXYZ(2, cx, cy, cz)
    attr.needsUpdate = true
  }

  private tintMoon(color: string): void {
    const material = this.moon.material
    if (material instanceof MeshBasicMaterial) material.color.set(color)
  }

  private orbitMoon(orbit: number, size: number, angle: number): void {
    this.moon.position.set(Math.cos(angle) * orbit, 0, Math.sin(angle) * orbit)
    this.moon.scale.setScalar(size)
  }

  private updateMeteors(dt: number, earthR: number, fade: number): void {
    if (this.meteors.length < 18 && Math.random() > 0.45) {
      const line = new Line(this.meteorGeo.clone(), this.meteorMat.clone())
      const side = Math.random() > 0.5 ? 1 : -1
      line.position.set(side * (earthR * 2.4 + Math.random() * earthR * 3), earthR * 1.6, -earthR * 1.2)
      line.lookAt(0, 0, 0)
      line.userData.vx = -side * (6 + Math.random() * 8)
      line.userData.vy = -3 - Math.random() * 4
      line.userData.vz = 8 + Math.random() * 6
      line.raycast = () => {}
      this.meteorRoot.add(line)
      this.meteors.push({ line, life: 0, max: 0.7 + Math.random() * 0.5 })
    }
    for (let i = this.meteors.length - 1; i >= 0; i -= 1) {
      const meteor = this.meteors[i]
      if (!meteor) continue
      meteor.life += dt
      meteor.line.position.x += meteor.line.userData.vx * dt
      meteor.line.position.y += meteor.line.userData.vy * dt
      meteor.line.position.z += meteor.line.userData.vz * dt
      setOpacity(meteor.line.material, fade * Math.max(0, 1 - meteor.life / meteor.max) * 0.95)
      if (meteor.life >= meteor.max) {
        this.meteorRoot.remove(meteor.line)
        meteor.line.geometry.dispose()
        const mat = meteor.line.material
        if (!Array.isArray(mat)) mat.dispose()
        this.meteors.splice(i, 1)
      }
    }
  }

  private placeMarker(id: AstroEventId, hosts: EventLayerHosts, fade: number, inspecting: boolean): void {
    this.anchor.visible = fade > 0.08
    const sky = id === 'supernova' || id === 'ns-merger' || id === 'black-hole' ? SKY[id] : null
    if (sky) {
      this.anchor.position.set(sky[0], sky[1] + 3.2, sky[2])
      this.pick.scale.setScalar(1.6)
      return
    }
    if (inspecting && (id === 'solar-eclipse' || id === 'lunar-eclipse') && this.moon.visible) {
      this.moon.getWorldPosition(this.world)
      const radius = visualRadius('moon', hosts.scaleMode)
      this.anchor.position.set(this.world.x, this.world.y + radius * 1.45 + 0.7, this.world.z)
      this.pick.scale.setScalar(Math.max(1.05, radius * 0.55))
      return
    }
    const event = getAstroEvent(id)
    const hostId = event?.hostBodyId
    if (!hostId) return
    if (hostId === 'sun') {
      const radius = visualRadius('sun', hosts.scaleMode)
      this.anchor.position.set(0, radius * 1.45, 0)
      this.pick.scale.setScalar(Math.max(1.1, radius * 0.18))
      return
    }
    const planet = hosts.planets.get(hostId)
    if (!planet) return
    planet.group.getWorldPosition(this.world)
    const radius = visualRadius(hostId, hosts.scaleMode)
    this.anchor.position.set(this.world.x, this.world.y + radius * 1.45 + 0.7, this.world.z)
    this.pick.scale.setScalar(Math.max(1.05, radius * 0.22))
  }

  private adopt(node: Object3D, parent: Object3D): void {
    parent.add(node)
  }

  private teardown(hosts: EventLayerHosts): void {
    if (this.hidMoon) {
      const moon = hosts.planets.get('moon')
      if (moon) moon.group.visible = true
      this.hidMoon = false
    }
    hosts.sun.setFlare(0)
    for (const node of this.nodes) this.group.add(node)
    this.hideAll()
    this.clearMeteors()
    this.current = null
    this.inspecting = false
  }

  private hideAll(): void {
    this.anchor.visible = false
    for (const node of this.nodes) node.visible = false
    this.moon.visible = false
    this.plume.visible = false
    this.jets.visible = false
    this.haze.visible = false
    this.rain.visible = false
    this.ice.visible = false
    this.ocean.visible = false
    this.flareLoop.visible = false
    this.puff.visible = false
    this.auroraN.visible = false
    this.auroraS.visible = false
    this.grs.visible = false
    this.dust.visible = false
    this.ringWave.visible = false
    this.novaCore.visible = false
    this.novaShell.visible = false
    this.starA.visible = false
    this.starB.visible = false
    this.gwRing.visible = false
    this.hole.visible = false
    this.accretion.visible = false
    this.shadow.visible = false
    this.moonShadow.visible = false
    this.meteorRoot.visible = false
    this.alignLine.visible = false
    this.cometHead.visible = false
    this.cometTail.visible = false
  }

  private clearMeteors(): void {
    for (const meteor of this.meteors) {
      this.meteorRoot.remove(meteor.line)
      meteor.line.geometry.dispose()
      const mat = meteor.line.material
      if (!Array.isArray(mat)) mat.dispose()
    }
    this.meteors.length = 0
  }

  dispose(): void {
    for (const node of this.nodes) this.group.add(node)
    this.clearMeteors()
    this.meteorGeo.dispose()
    this.meteorMat.dispose()
    this.marker.element.remove()
    for (const node of this.nodes) {
      node.traverse((child) => {
        if (child instanceof Mesh || child instanceof Line) {
          child.geometry.dispose()
          const mat = child.material
          if (Array.isArray(mat)) mat.forEach((item) => item.dispose())
          else mat.dispose()
        }
      })
    }
    this.pick.geometry.dispose()
    const pickMat = this.pick.material
    if (!Array.isArray(pickMat)) pickMat.dispose()
  }
}
