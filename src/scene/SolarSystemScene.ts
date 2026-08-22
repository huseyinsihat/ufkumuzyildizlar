import {
  Clock,
  Color,
  Group,
  Mesh,
  MeshBasicMaterial,
  Plane,
  Points,
  Raycaster,
  Scene,
  SRGBColorSpace,
  TorusGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { BODIES, getBody } from '../astronomy/planetData'
import { TimeEngine } from '../astronomy/timeEngine'
import { getHeliocentricEclipticAu } from '../astronomy/coordinateSystems'
import { auToScene, educationalOrbitRadius, visualMoonOrbitRadius, visualRadius } from '../astronomy/visualScale'
import { RAD2DEG } from '../astronomy/astronomyConstants'
import { earthYearTours, eclipticLongitude, wrapDelta } from '../features/lab/orbitMath'
import { LIGHT_TRAVEL_SEC, mercuryDayProgress } from '../features/lab/wowMath'
import { useEducationStore } from '../store/educationStore'
import { useLabStore } from '../store/labStore'
import { useSimulationStore } from '../store/simulationStore'
import { useUiStore } from '../store/uiStore'
import { onSunSelected } from '../features/planetExplorer/focus'
import { findEarthCraft } from '../content/earthCrafts'
import { capPixelRatio, starCountForDevice } from '../utils/performance'
import { AsteroidBelt } from './AsteroidBelt'
import { CameraController } from './CameraController'
import { CityPins } from './CityPins'
import { EarthCrafts } from './EarthCrafts'
import { CometMesh } from './CometMesh'
import { ConstellationLayer } from './ConstellationLayer'
import { HeatAura } from './HeatAura'
import { LabelLayer, type LabelOccluder } from './LabelLayer'
import { loadBodyTextures } from './loadBodyTextures'
import { addLighting, setFillLight, type SceneLights } from './Lighting'
import { KeplerSlices } from './KeplerSlices'
import { SurfaceLab } from './SurfaceLab'
import { UmbraMesh } from './UmbraMesh'
import { LightPulse } from './LightPulse'
import { NotableStars } from './NotableStars'
import { OrbitRenderer } from './OrbitRenderer'
import { PlanetMesh } from './PlanetMesh'
import { registerScene } from './sceneApi'
import { SkyRocks } from './SkyRocks'
import { createStarField } from './StarField'
import { SunMesh } from './SunMesh'
import type { BodyId } from '../types/planet'
import type { ScaleMode } from '../types/simulation'

export class SolarSystemScene {
  private renderer: WebGLRenderer
  private composer: EffectComposer
  private bloom: UnrealBloomPass
  private scene: Scene
  private camera: CameraController
  private labels: LabelLayer
  private sun: SunMesh
  private planets = new Map<BodyId, PlanetMesh>()
  private orbits: OrbitRenderer
  private asteroids: AsteroidBelt
  private constellations: ConstellationLayer
  private stars: Points
  private starRoot: Group
  private cityPins: CityPins
  private earthCrafts = new EarthCrafts()
  private clock = new Clock()
  private raycaster = new Raycaster()
  private pointer = new Vector2()
  private world = new Vector3()
  private hit = new Vector3()
  private plane = new Plane()
  private frame = 0
  private running = false
  private lastUi = 0
  private unsub: () => void
  private canvas: HTMLCanvasElement
  private host: HTMLElement
  private scaleMode: ScaleMode = 'educational'
  private labelsReadyAt = 0
  private occluders: LabelOccluder[] = []
  private engine: TimeEngine
  private watchKind: 'none' | 'year' | 'race' | 'mercury-year' | 'mercury-day' = 'none'
  private lonPrev = new Map<BodyId, number>()
  private lonAcc = new Map<BodyId, number>()
  private raceBodies: BodyId[] = []
  private draggingMoon = false
  private moonPinned = false
  private draggingComet = false
  private lightPulse = new LightPulse()
  private heatAura = new HeatAura()
  private comet = new CometMesh()
  private notableStars = new NotableStars()
  private skyRocks = new SkyRocks()
  private kepler = new KeplerSlices()
  private surface = new SurfaceLab()
  private umbra = new UmbraMesh()
  private lights: SceneLights
  private arrangeGroup = new Group()
  private arrangeRings: Mesh[] = []
  private arrangeHandler: ((index: number) => void) | null = null
  private arrangeOn = false

  constructor(canvas: HTMLCanvasElement, host: HTMLElement) {
    this.canvas = canvas
    this.host = host
    this.engine = useSimulationStore.getState().getEngine()

    this.renderer = new WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    })
    this.renderer.setClearColor(new Color('#030712'), 1)
    this.renderer.setPixelRatio(capPixelRatio(window.devicePixelRatio || 1))
    this.renderer.outputColorSpace = SRGBColorSpace
    this.renderer.toneMappingExposure = 1.05

    this.scene = new Scene()
    this.camera = new CameraController(canvas)
    this.lights = addLighting(this.scene)

    this.starRoot = new Group()
    this.stars = createStarField(starCountForDevice())
    this.starRoot.add(this.stars)
    this.scene.add(this.starRoot)

    this.sun = new SunMesh(getBody('sun').rotationPeriodHours)
    this.scene.add(this.sun.group)

    this.orbits = new OrbitRenderer()
    this.scene.add(this.orbits.group)
    this.orbits.rebuild(this.scaleMode)

    this.asteroids = new AsteroidBelt()
    this.scene.add(this.asteroids.mesh)

    this.constellations = new ConstellationLayer()
    this.scene.add(this.constellations.group)

    this.labels = new LabelLayer(host)
    this.cityPins = new CityPins()
    this.scene.add(this.lightPulse.group)
    this.scene.add(this.heatAura.group)
    this.scene.add(this.comet.group)
    this.scene.add(this.notableStars.group)
    this.scene.add(this.skyRocks.group)
    this.scene.add(this.kepler.group)
    this.scene.add(this.surface.group)
    this.scene.add(this.umbra.group)
    this.arrangeGroup.visible = false
    this.scene.add(this.arrangeGroup)
    const arrangeIds = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'] as const
    arrangeIds.forEach((id, index) => {
      const r = educationalOrbitRadius(getBody(id).orbitalRadiusAu)
      const ring = new Mesh(
        new TorusGeometry(r, 1.15, 8, 64),
        new MeshBasicMaterial({ color: getBody(id).color, transparent: true, opacity: 0.18 }),
      )
      ring.rotation.x = Math.PI / 2
      ring.userData.arrangeIndex = index
      this.arrangeGroup.add(ring)
      this.arrangeRings.push(ring)
    })

    for (const body of BODIES) {
      if (body.id === 'sun') {
        this.labels.attach(body, this.sun.group, visualRadius('sun', 'educational') * 1.35)
        continue
      }
      const planet = new PlanetMesh(body)
      this.planets.set(body.id, planet)
      this.scene.add(planet.group)
      this.labels.attach(body, planet.group, visualRadius(body.id, 'educational') * 1.45)
      if (body.id === 'earth') {
        planet.mesh.add(this.cityPins.group)
        planet.group.add(this.earthCrafts.group)
      }
    }

    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(new RenderPass(this.scene, this.camera.camera))
    this.bloom = new UnrealBloomPass(new Vector2(800, 600), 0.28, 0.5, 0.82)
    this.composer.addPass(this.bloom)

    this.canvas.addEventListener('pointerdown', this.onPointerDown)
    this.canvas.addEventListener('pointermove', this.onPointerMove)
    this.canvas.addEventListener('pointerup', this.onPointerUp)
    window.addEventListener('keydown', this.onKeyDown)

    this.unsub = useSimulationStore.subscribe((state, prev) => {
      if (state.scaleMode !== prev.scaleMode) {
        this.scaleMode = state.scaleMode
        this.orbits.rebuild(state.scaleMode)
        this.camera.setMaxDistance(state.scaleMode === 'trueScale' ? 420 : 280)
        this.camera.setFar(state.scaleMode === 'trueScale' ? 1600 : 800)
        const keep = state.selectedBodyId
        if (keep && keep !== 'sun') {
          this.focusBody(keep)
        } else {
          this.camera.focusOverview(state.scaleMode === 'trueScale')
        }
      }
      this.orbits.setVisible(state.showOrbits)
      this.constellations.setVisible(state.showConstellations)
      this.labels.setVisible(state.showLabels)
      this.cityPins.setVisible(state.cityPinsVisible)
      for (const planet of this.planets.values()) {
        planet.setAxisVisible(state.showAxes)
        planet.setSelected(state.selectedBodyId === planet.body.id)
        planet.applyScale(state.scaleMode)
      }
      this.sun.setVisualRadius(visualRadius('sun', state.scaleMode))
      this.earthCrafts.setEarthRadius(visualRadius('earth', state.scaleMode))
      this.earthCrafts.setVisible(state.scaleMode === 'educational')
      this.orbits.highlight(state.selectedBodyId)
      if (this.kepler.isPinned()) {
        this.kepler.rebuild(state.scaleMode)
      }
      this.labels.highlight(state.selectedBodyId)
      this.labels.setOffset('sun', visualRadius('sun', state.scaleMode) * 1.35)
      for (const planet of this.planets.values()) {
        this.labels.setOffset(planet.body.id, visualRadius(planet.body.id, state.scaleMode) * 1.45)
      }
    })

    const initial = useSimulationStore.getState()
    this.scaleMode = initial.scaleMode
    this.orbits.setVisible(initial.showOrbits)
    this.constellations.setVisible(initial.showConstellations)
    this.labels.setVisible(initial.showLabels)
    this.cityPins.setVisible(initial.cityPinsVisible)

    this.earthCrafts.setEarthRadius(visualRadius('earth', this.scaleMode))
    this.earthCrafts.setVisible(this.scaleMode === 'educational')
    this.resize()
    registerScene(this)
    void loadBodyTextures().then((maps) => {
      for (const [id, set] of maps) {
        if (id === 'sun') {
          if (set.map) this.sun.applyMap(set.map)
          continue
        }
        this.planets.get(id)?.applyMaps(set)
      }
    })
  }

  start(): void {
    if (this.running) return
    this.running = true
    this.clock.start()
    this.renderer.setAnimationLoop(this.tick)
  }

  stop(): void {
    this.running = false
    this.renderer.setAnimationLoop(null)
  }

  focusBody(id: BodyId): void {
    if (id === 'sun') {
      this.camera.stopFollow()
      this.camera.focusOn(new Vector3(0, 0, 0), visualRadius('sun', this.scaleMode), false)
      return
    }
    const planet = this.planets.get(id)
    if (!planet) return
    planet.group.getWorldPosition(this.world)
    this.camera.focusOn(this.world.clone(), visualRadius(id, this.scaleMode), true)
  }

  focusOverview(): void {
    this.camera.stopFollow()
    this.camera.focusOverview(this.scaleMode === 'trueScale')
  }

  focusEarthSurface(): void {
    const earth = this.planets.get('earth')
    if (!earth) return
    earth.group.getWorldPosition(this.world)
    this.camera.focusClose(this.world.clone(), visualRadius('earth', this.scaleMode))
  }

  enterSkyView(): void {
    this.camera.enterSkyView()
  }

  selectConstellation(id: string | null): void {
    this.constellations.select(id)
  }

  startEarthYearWatch(): void {
    this.watchKind = 'year'
    this.seedLongitude('earth')
    this.lonAcc.set('earth', 0)
  }

  startOrbitRace(a: BodyId, b: BodyId): void {
    this.watchKind = 'race'
    this.raceBodies = [a, b]
    this.seedLongitude(a)
    this.seedLongitude(b)
    this.lonAcc.set(a, 0)
    this.lonAcc.set(b, 0)
  }

  startLightPulse(target: 'earth' | 'jupiter'): void {
    this.clearWow()
    const dest = this.planets.get(target)
    if (!dest) return
    dest.group.getWorldPosition(this.world)
    const targetPos = this.world.clone()
    useLabStore.getState().setLightArrived(false)
    useLabStore.getState().setLightProgress(0, LIGHT_TRAVEL_SEC[target])
    this.lightPulse.onArrive = () => {
      useLabStore.getState().setLightArrived(true)
      useLabStore.getState().setStep('result')
    }
    this.lightPulse.start(new Vector3(0, 0, 0), targetPos, LIGHT_TRAVEL_SEC[target], target === 'earth' ? 6.2 : 9)
    this.camera.focusOn(targetPos.clone().multiplyScalar(0.55), 10)
  }

  setSeasonDemo(tiltOn: boolean, month: 'jan' | 'jul'): void {
    this.clearWow()
    const earth = this.planets.get('earth')
    if (!earth) return
    earth.setTiltDeg(tiltOn ? 23.44 : 0)
    earth.setAxisVisible(true)
    earth.setNorthCap(tiltOn ? (month === 'jan' ? 'cold' : 'warm') : 'off')
    const date = month === 'jan' ? { year: 2026, month: 1, day: 4, hour: 12, minute: 0 } : { year: 2026, month: 7, day: 4, hour: 12, minute: 0 }
    useSimulationStore.getState().setDateParts(date)
    useSimulationStore.getState().setPlaying(false)
    earth.group.getWorldPosition(this.world)
    this.camera.focusSeasonEarth(this.world.clone(), visualRadius('earth', this.scaleMode))
  }

  setHeatCompare(on: boolean): void {
    if (!on) {
      this.heatAura.setEnabled(false)
      return
    }
    this.clearWow()
    this.heatAura.setEnabled(true)
    this.heatAura.setBlanket(true)
    const venus = this.planets.get('venus')
    venus?.group.getWorldPosition(this.world)
    this.camera.focusOn(this.world.clone(), 3.2)
  }

  setVenusBlanket(on: boolean): void {
    this.heatAura.setBlanket(on)
  }

  setCometDemo(on: boolean): void {
    if (!on) {
      this.comet.setEnabled(false)
      return
    }
    this.clearWow()
    this.comet.setEnabled(true)
    this.camera.focusOverview(this.scaleMode === 'trueScale')
  }

  startMercuryWatch(kind: 'mercury-year' | 'mercury-day'): void {
    this.clearWow()
    this.watchKind = kind
    this.seedLongitude('mercury')
    this.lonAcc.set('mercury', 0)
    this.focusBody('mercury')
  }

  setKeplerOverlay(id: BodyId | null, pin = false): void {
    this.kepler.setTarget(id, pin)
  }

  setUmbra(on: boolean): void {
    this.umbra.setEnabled(on)
    setFillLight(this.lights, on || useSimulationStore.getState().moonDragEnabled)
  }

  startSurfaceLab(mode: 'drop' | 'jump'): void {
    this.clearWow()
    if (mode === 'drop') this.surface.startDrop()
    else this.surface.startJump('earth')
    this.camera.stopFollow()
    this.camera.focusOn(this.surface.group.position.clone(), 9)
  }

  playSurfaceLab(): void {
    this.surface.play()
  }

  setSurfaceJumpBody(id: BodyId): void {
    this.surface.setJumpBody(id)
  }

  setArrangeMode(on: boolean): void {
    this.arrangeOn = on
    this.arrangeGroup.visible = this.arrangeOn
  }

  setArrangeHandler(handler: ((index: number) => void) | null): void {
    this.arrangeHandler = handler
  }

  applyGyro(yaw: number, pitch: number): void {
    this.camera.setGyro(yaw, pitch)
  }

  clearWow(): void {
    this.lightPulse.stop()
    this.heatAura.setEnabled(false)
    this.comet.setEnabled(false)
    this.draggingComet = false
    this.surface.stop()
    this.umbra.setEnabled(false)
    this.kepler.setTarget(null)
    this.setArrangeMode(false)
    setFillLight(this.lights, false)
    const earth = this.planets.get('earth')
    if (earth) {
      earth.setTiltDeg(earth.body.axialTiltDeg)
      earth.setNorthCap('off')
      earth.setAxisVisible(useSimulationStore.getState().showAxes)
    }
  }

  clearWatches(): void {
    this.watchKind = 'none'
    this.lonPrev.clear()
    this.lonAcc.clear()
    this.raceBodies = []
    this.moonPinned = false
    this.draggingMoon = false
    this.kepler.setTarget(null)
    this.clearWow()
  }

  private labelOverlay(): boolean {
    const ui = useUiStore.getState()
    const lab = useLabStore.getState()
    if (lab.activityId === 'arrange-orbits') return true
    const blocked = ui.introVisible || Boolean(lab.labOpen && !lab.activityId)
    if (blocked) {
      this.labelsReadyAt = performance.now() + 400
      return true
    }
    return performance.now() < this.labelsReadyAt
  }

  private collectOccluders(): LabelOccluder[] {
    this.occluders.length = 0
    this.occluders.push({
      id: 'sun',
      x: 0,
      y: 0,
      z: 0,
      radius: visualRadius('sun', this.scaleMode),
    })
    for (const id of ['jupiter', 'saturn', 'earth'] as const) {
      const planet = this.planets.get(id)
      if (!planet) continue
      planet.group.getWorldPosition(this.world)
      this.occluders.push({
        id,
        x: this.world.x,
        y: this.world.y,
        z: this.world.z,
        radius: visualRadius(id, this.scaleMode),
      })
    }
    return this.occluders
  }

  private seedLongitude(id: BodyId): void {
    const date = new Date(this.engine.simulationTimeMs)
    this.lonPrev.set(id, eclipticLongitude(getHeliocentricEclipticAu(id, date)))
  }

  private tick = (): void => {
    const dt = Math.min(this.clock.getDelta(), 0.05)
    const sim = useSimulationStore.getState()
    const before = this.engine.simulationTimeMs
    this.engine.step(dt)
    const dtSim = (this.engine.simulationTimeMs - before) / 1000
    const date = new Date(this.engine.simulationTimeMs)

    this.updateBodies(date, dtSim, sim.freezeRotation, sim.freezeRevolution, sim.moonDragEnabled)
    this.asteroids.update(dtSim / 86_400)
    this.skyRocks.update(dt, dtSim / 86_400)
    this.notableStars.update(dt)
    this.earthCrafts.update(dt)
    this.earthCrafts.setSelected(sim.selectedWonderId)
    const followId = sim.selectedBodyId
    const craft = sim.selectedWonderId ? this.earthCrafts.meshById(sim.selectedWonderId) : undefined
    if (followId && followId !== 'sun') {
      const followed = this.planets.get(followId)
      if (followed) {
        followed.group.getWorldPosition(this.world)
        this.camera.track(this.world)
      }
    } else if (craft) {
      craft.getWorldPosition(this.world)
      this.camera.track(this.world)
    } else {
      this.camera.stopFollow()
    }
    if (sim.skyCamera) {
      this.starRoot.rotation.y += dtSim * (Math.PI * 2) / (23.934 * 3600)
    }
    this.camera.update(dt)
    const hideLabels = this.labelOverlay()
    this.labels.updateScales(
      this.camera.camera,
      hideLabels || !sim.showLabels,
      this.collectOccluders(),
      sim.selectedBodyId,
    )
    this.notableStars.setLabelsVisible(!hideLabels && sim.showLabels)
    this.skyRocks.setLabelsVisible(!hideLabels && sim.showLabels)
    this.cityPins.setLabelsVisible(!hideLabels && sim.showLabels)
    const earth = this.planets.get('earth')
    if (earth) {
      earth.group.getWorldPosition(this.world)
      const nearEarth = this.camera.camera.position.distanceTo(this.world) < visualRadius('earth', this.scaleMode) * 16 + 10
      const craftOn = Boolean(sim.selectedWonderId && this.earthCrafts.meshById(sim.selectedWonderId))
      this.earthCrafts.setLabelsVisible(
        !hideLabels &&
          sim.showLabels &&
          sim.scaleMode === 'educational' &&
          (nearEarth || sim.selectedBodyId === 'earth' || craftOn),
      )
    }
    this.lightPulse.update(dt)
    const mercury = this.planets.get('mercury')
    const venus = this.planets.get('venus')
    if (this.heatAura.enabled && mercury && venus) {
      mercury.group.getWorldPosition(this.world)
      const m = this.world.clone()
      venus.group.getWorldPosition(this.world)
      this.heatAura.update(m, this.world, visualRadius('mercury', this.scaleMode), visualRadius('venus', this.scaleMode))
    }
    this.comet.updateTail(new Vector3(0, 0, 0))
    this.surface.update(dt)
    this.kepler.advance(dtSim / 86_400, getBody(this.kepler.pinnedBody() ?? 'mercury').orbitalPeriodDays)
    const earthPos = this.planets.get('earth')?.group.position
    if (earthPos) this.umbra.update(earthPos, visualMoonOrbitRadius() * 2.4)
    if (sim.moonDragEnabled) {
      setFillLight(this.lights, true)
      const kind = this.eclipseKind()
      if (kind !== useLabStore.getState().eclipseKind) useLabStore.getState().setEclipseKind(kind)
    }
    this.updateWatches(date)

    const now = performance.now()
    if (now - this.lastUi > 220) {
      this.lastUi = now
      useSimulationStore.getState().pushDisplayedTime(this.engine.simulationTimeMs)
      if (sim.moonDragEnabled) {
        useLabStore.getState().setMoonPhaseDeg(this.moonPhaseDeg())
      }
      if (this.lightPulse.active || this.lightPulse.arrived) {
        useLabStore.getState().setLightProgress(this.lightPulse.progress, this.lightPulse.realSeconds)
      }
    }

    this.composer.render()
    this.labels.renderer.render(this.scene, this.camera.camera)
    this.frame += 1
  }

  private updateWatches(date: Date): void {
    if (this.watchKind === 'none') return
    if (this.watchKind === 'mercury-year' || this.watchKind === 'mercury-day') {
      const lon = eclipticLongitude(getHeliocentricEclipticAu('mercury', date))
      const prev = this.lonPrev.get('mercury') ?? lon
      const acc = (this.lonAcc.get('mercury') ?? 0) + wrapDelta(prev, lon)
      this.lonPrev.set('mercury', lon)
      this.lonAcc.set('mercury', acc)
      const tours = acc / (Math.PI * 2)
      const bars = mercuryDayProgress(tours)
      if (this.frame % 8 === 0) useLabStore.getState().setMercuryBars(bars.year, bars.day)
      const need = this.watchKind === 'mercury-year' ? 1 : 2
      if (tours >= need) {
        useSimulationStore.getState().setPlaying(false)
        useLabStore.getState().setStep('result')
        this.watchKind = 'none'
      }
      return
    }
    const ids = this.watchKind === 'year' ? (['earth'] as BodyId[]) : this.raceBodies
    for (const id of ids) {
      const lon = eclipticLongitude(getHeliocentricEclipticAu(id, date))
      const prev = this.lonPrev.get(id) ?? lon
      const acc = (this.lonAcc.get(id) ?? 0) + wrapDelta(prev, lon)
      this.lonPrev.set(id, lon)
      this.lonAcc.set(id, acc)
      if (acc >= Math.PI * 2) {
        useSimulationStore.getState().setPlaying(false)
        if (this.watchKind === 'year') {
          useLabStore.getState().setYearTours(earthYearTours())
          useLabStore.getState().setStep('result')
        } else {
          useLabStore.getState().setRaceWinner(id)
          useLabStore.getState().setStep('result')
        }
        this.clearWatches()
        return
      }
    }
  }

  private updateBodies(
    date: Date,
    dtSim: number,
    freezeRotation: boolean,
    freezeRevolution: boolean,
    moonDrag: boolean,
  ): void {
    this.sun.update(dtSim)
    const earth = this.planets.get('earth')
    for (const [id, planet] of this.planets) {
      const skipMoonEphemeris = id === 'moon' && (moonDrag && (this.draggingMoon || this.moonPinned))
      if (!freezeRevolution && !skipMoonEphemeris) {
        if (id === 'moon' && earth) {
          this.placeMoonFromEphemeris(date, earth, planet)
        } else if (this.kepler.isPinned() && this.kepler.pinnedBody() === id) {
          const pinned = this.kepler.planetPoint()
          if (pinned) planet.group.position.set(pinned.x, pinned.y, pinned.z)
        } else {
          const au = getHeliocentricEclipticAu(id, date)
          const scenePos = auToScene(au, this.scaleMode)
          planet.group.position.set(scenePos.x, scenePos.y, scenePos.z)
        }
      }
      if (!freezeRotation && id !== 'moon') {
        planet.update(dtSim)
      } else if (id === 'moon' && earth) {
        planet.mesh.lookAt(earth.group.position)
      }
      if (this.frame % 30 === 0) {
        planet.updateLod(this.camera.camera.position.distanceTo(planet.group.position))
      }
    }
  }

  private placeMoonFromEphemeris(date: Date, earth: PlanetMesh, planet: PlanetMesh): void {
    const earthAu = getHeliocentricEclipticAu('earth', date)
    const moonAu = getHeliocentricEclipticAu('moon', date)
    const dir = {
      x: moonAu.x - earthAu.x,
      y: moonAu.z - earthAu.z,
      z: -(moonAu.y - earthAu.y),
    }
    const length = Math.hypot(dir.x, dir.y, dir.z) || 1
    const orbit = visualMoonOrbitRadius()
    planet.group.position.set(
      earth.group.position.x + (dir.x / length) * orbit,
      earth.group.position.y + (dir.y / length) * orbit,
      earth.group.position.z + (dir.z / length) * orbit,
    )
  }

  eclipseKind(): 'none' | 'solar' | 'lunar' {
    const deg = this.moonPhaseDeg()
    if (Math.abs(deg - 180) < 16) return 'lunar'
    if (deg < 16 || deg > 344) return 'solar'
    return 'none'
  }

  moonPhaseDeg(): number {
    const earth = this.planets.get('earth')
    const moon = this.planets.get('moon')
    if (!earth || !moon) return 0
    const ex = earth.group.position.x
    const ey = earth.group.position.y
    const ez = earth.group.position.z
    const toSun = new Vector3(-ex, -ey, -ez).normalize()
    const toMoon = new Vector3(
      moon.group.position.x - ex,
      moon.group.position.y - ey,
      moon.group.position.z - ez,
    ).normalize()
    return ((Math.atan2(toSun.x * toMoon.z - toSun.z * toMoon.x, toSun.dot(toMoon)) * RAD2DEG) % 360 + 360) % 360
  }

  focusWonder(id: string): void {
    const craft = this.earthCrafts.meshById(id)
    if (craft) {
      useSimulationStore.getState().selectWonder(id)
      craft.getWorldPosition(this.world)
      this.camera.focusOn(this.world.clone(), 0.55, true)
      return
    }
    const target =
      this.notableStars.meshes.find((mesh) => mesh.userData.wonderId === id) ??
      this.skyRocks.meshes.find((mesh) => mesh.userData.wonderId === id)
    if (!target) return
    useSimulationStore.getState().selectWonder(id)
    this.camera.stopFollow()
    const pos = new Vector3()
    target.getWorldPosition(pos)
    this.camera.focusOn(pos, 6, false)
  }

  private onPointerDown = (event: PointerEvent): void => {
    if (event.button !== 0) return
    this.setPointer(event)
    if (this.arrangeOn) {
      this.raycaster.setFromCamera(this.pointer, this.camera.camera)
      const hits = this.raycaster.intersectObjects(this.arrangeRings, false)
      const index = hits[0]?.object.userData.arrangeIndex as number | undefined
      if (index !== undefined) {
        this.arrangeHandler?.(index)
        return
      }
    }
    const hunt = useLabStore.getState().activityId === 'ursa-hunt'
    if (hunt) {
      this.raycaster.setFromCamera(this.pointer, this.camera.camera)
      const hits = this.raycaster.intersectObjects(this.constellations.pickMeshes, false)
      const starId = hits[0]?.object.userData.starId as string | undefined
      if (starId) {
        useLabStore.getState().addHuntStar(starId)
        return
      }
    }
    if (useSimulationStore.getState().moonDragEnabled) {
      this.raycaster.setFromCamera(this.pointer, this.camera.camera)
      const moon = this.planets.get('moon')
      if (moon) {
        const hits = this.raycaster.intersectObject(moon.mesh, false)
        if (hits.length) {
          this.draggingMoon = true
          this.moonPinned = true
          this.canvas.setPointerCapture(event.pointerId)
          return
        }
      }
    }
    if (this.comet.enabled) {
      this.raycaster.setFromCamera(this.pointer, this.camera.camera)
      const hits = this.raycaster.intersectObject(this.comet.group, true)
      if (hits.length) {
        this.draggingComet = true
        this.canvas.setPointerCapture(event.pointerId)
        return
      }
    }
    this.raycaster.setFromCamera(this.pointer, this.camera.camera)
    const craftHits = this.raycaster.intersectObjects(this.earthCrafts.pickMeshes, false)
    const craftId = craftHits[0]?.object.userData.craftId as string | undefined
    if (craftId && findEarthCraft(craftId)) {
      useSimulationStore.getState().selectWonder(craftId)
      const craft = this.earthCrafts.meshById(craftId)
      if (craft) {
        craft.getWorldPosition(this.world)
        this.camera.focusOn(this.world.clone(), 0.55, true)
      }
      return
    }
    const skyHits = this.raycaster.intersectObjects([...this.notableStars.meshes, ...this.skyRocks.meshes], false)
    const wonderId = skyHits[0]?.object.userData.wonderId as string | undefined
    if (wonderId) {
      useSimulationStore.getState().selectWonder(wonderId)
      this.camera.stopFollow()
      const target = skyHits[0]?.object
      if (target) this.camera.focusOn(target.position.clone(), 6, false)
      return
    }
    const meshes: Mesh[] = [this.sun.mesh]
    for (const planet of this.planets.values()) meshes.push(planet.mesh)
    const hits = this.raycaster.intersectObjects(meshes, false)
    const id = hits[0]?.object.userData.bodyId as BodyId | undefined
    if (!id) return
    useSimulationStore.getState().selectBody(id)
    useEducationStore.getState().notifySelection(id)
    this.focusBody(id)
    if (id === 'sun') onSunSelected()
  }

  private onPointerMove = (event: PointerEvent): void => {
    if (this.draggingComet) {
      this.setPointer(event)
      this.raycaster.setFromCamera(this.pointer, this.camera.camera)
      this.plane.setFromNormalAndCoplanarPoint(new Vector3(0, 1, 0), new Vector3(0, 0, 0))
      if (!this.raycaster.ray.intersectPlane(this.plane, this.hit)) return
      const len = Math.hypot(this.hit.x, this.hit.z) || 1
      const radius = Math.min(42, Math.max(12, len))
      this.comet.group.position.set((this.hit.x / len) * radius, 0, (this.hit.z / len) * radius)
      return
    }
    if (!this.draggingMoon) return
    this.setPointer(event)
    const earth = this.planets.get('earth')
    const moon = this.planets.get('moon')
    if (!earth || !moon) return
    this.raycaster.setFromCamera(this.pointer, this.camera.camera)
    this.plane.setFromNormalAndCoplanarPoint(new Vector3(0, 1, 0), earth.group.position)
    if (!this.raycaster.ray.intersectPlane(this.plane, this.hit)) return
    const dx = this.hit.x - earth.group.position.x
    const dz = this.hit.z - earth.group.position.z
    const len = Math.hypot(dx, dz) || 1
    const orbit = visualMoonOrbitRadius()
    moon.group.position.set(
      earth.group.position.x + (dx / len) * orbit,
      earth.group.position.y,
      earth.group.position.z + (dz / len) * orbit,
    )
    moon.mesh.lookAt(earth.group.position)
    useLabStore.getState().setMoonPhaseDeg(this.moonPhaseDeg())
  }

  private onPointerUp = (event: PointerEvent): void => {
    if (this.draggingComet) {
      this.draggingComet = false
      try {
        this.canvas.releasePointerCapture(event.pointerId)
      } catch {
        // ignore
      }
      return
    }
    if (!this.draggingMoon) return
    this.draggingMoon = false
    try {
      this.canvas.releasePointerCapture(event.pointerId)
    } catch {
      // ignore
    }
  }

  private setPointer(event: PointerEvent): void {
    const rect = this.canvas.getBoundingClientRect()
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
  }

  private onKeyDown = (event: KeyboardEvent): void => {
    if (
      event.code === 'Space' &&
      !(event.target instanceof HTMLInputElement) &&
      !(event.target instanceof HTMLTextAreaElement) &&
      !(event.target instanceof HTMLButtonElement)
    ) {
      event.preventDefault()
      useSimulationStore.getState().togglePlaying()
    }
    if (event.code === 'Escape') {
      useSimulationStore.getState().selectBody(null)
      useUiStore.getState().closeSunChat()
      this.focusOverview()
    }
  }

  resize(): void {
    const width = this.host.clientWidth || window.innerWidth
    const height = this.host.clientHeight || window.innerHeight
    this.renderer.setSize(width, height, false)
    this.camera.resize(width, height)
    this.labels.resize(width, height)
    this.composer.setSize(width, height)
    this.bloom.setSize(width, height)
  }

  dispose(): void {
    this.stop()
    this.unsub()
    registerScene(null)
    this.canvas.removeEventListener('pointerdown', this.onPointerDown)
    this.canvas.removeEventListener('pointermove', this.onPointerMove)
    this.canvas.removeEventListener('pointerup', this.onPointerUp)
    window.removeEventListener('keydown', this.onKeyDown)
    this.sun.dispose()
    this.lightPulse.dispose()
    this.heatAura.dispose()
    this.comet.dispose()
    this.notableStars.dispose()
    this.skyRocks.dispose()
    this.kepler.dispose()
    this.surface.dispose()
    this.umbra.dispose()
    this.arrangeRings.forEach((ring) => {
      ring.geometry.dispose()
      const mat = ring.material
      if (!Array.isArray(mat)) mat.dispose()
    })
    for (const planet of this.planets.values()) planet.dispose()
    this.orbits.dispose()
    this.asteroids.dispose()
    this.constellations.dispose()
    this.labels.dispose()
    this.cityPins.dispose()
    this.earthCrafts.dispose()
    this.camera.dispose()
    this.composer.dispose()
    this.renderer.dispose()
  }
}
