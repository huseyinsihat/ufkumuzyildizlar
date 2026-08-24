import {
  BufferGeometry,
  Color,
  ConeGeometry,
  DoubleSide,
  Float32BufferAttribute,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  SphereGeometry,
} from 'three'
import { educationalOrbitRadius, TRUE_SCALE_AU_UNITS, visualRadius } from '../astronomy/visualScale'
import {
  cappedVisualEccentricity,
  equalTimeSector,
  keplerRadius,
  keplerSpeedFactor,
  orbitPointFlat,
  trueAnomalyFromMean,
} from '../astronomy/orbitalCalculations'
import { getBody } from '../astronomy/planetData'
import type { BodyId } from '../types/planet'
import type { ScaleMode } from '../types/simulation'

const HALF = 0.42
const SUN_GAP = 2
const FAN_INSET = 0.4

function fanGeometry(points: { x: number; z: number }[]): BufferGeometry {
  const positions: number[] = []
  const origin = points[0]
  if (!origin) return new BufferGeometry()
  for (let i = 1; i < points.length - 1; i += 1) {
    const a = points[i]
    const b = points[i + 1]
    if (!a || !b) continue
    positions.push(origin.x, 0.08, origin.z, a.x, 0.08, a.z, b.x, 0.08, b.z)
  }
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
  return geometry
}

function ellipseLine(a: number, e: number, samples = 128): BufferGeometry {
  const positions: number[] = []
  for (let n = 0; n <= samples; n += 1) {
    const nu = (n / samples) * Math.PI * 2
    const p = orbitPointFlat(a, e, nu)
    positions.push(p.x, 0.06, p.z)
  }
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
  return geometry
}

export class KeplerSlices {
  readonly group: Group
  private near: Mesh
  private far: Mesh
  private peri: Mesh
  private arrow: Mesh
  private path: Line
  private bodyId: BodyId | null = null
  private pinPlanet = false
  private mean = 0
  private mode: ScaleMode = 'educational'

  constructor() {
    this.group = new Group()
    this.group.name = 'kepler-slices'
    this.group.visible = false

    this.near = new Mesh(
      new BufferGeometry(),
      new MeshBasicMaterial({
        color: '#fbbf24',
        transparent: true,
        opacity: 0.38,
        side: DoubleSide,
        depthWrite: false,
      }),
    )
    this.far = new Mesh(
      new BufferGeometry(),
      new MeshBasicMaterial({
        color: '#5eead4',
        transparent: true,
        opacity: 0.32,
        side: DoubleSide,
        depthWrite: false,
      }),
    )
    this.peri = new Mesh(new SphereGeometry(0.22, 12, 10), new MeshBasicMaterial({ color: '#fb7185' }))
    this.arrow = new Mesh(new ConeGeometry(0.42, 1.6, 8), new MeshBasicMaterial({ color: '#fde68a' }))
    this.path = new Line(
      new BufferGeometry(),
      new LineBasicMaterial({ color: new Color('#fbbf24'), transparent: true, opacity: 0.85 }),
    )
    this.near.raycast = () => {}
    this.far.raycast = () => {}
    this.peri.raycast = () => {}
    this.arrow.raycast = () => {}
    this.path.raycast = () => {}
    this.group.add(this.near, this.far, this.peri, this.arrow, this.path)
  }

  setTarget(bodyId: BodyId | null, pinPlanet = false): void {
    this.bodyId = bodyId && bodyId !== 'sun' && bodyId !== 'moon' ? bodyId : null
    this.pinPlanet = pinPlanet
    this.group.visible = Boolean(this.bodyId)
    if (this.bodyId) this.rebuild(this.mode)
  }

  isPinned(): boolean {
    return this.pinPlanet && Boolean(this.bodyId)
  }

  pinnedBody(): BodyId | null {
    return this.pinPlanet ? this.bodyId : null
  }

  planetPoint(): { x: number; y: number; z: number } | null {
    if (!this.bodyId) return null
    const { a, e } = this.elements()
    const nu = trueAnomalyFromMean(this.mean, e)
    const p = orbitPointFlat(a, e, nu)
    return { x: p.x, y: 0, z: p.z }
  }

  zone(): 'near' | 'far' | null {
    if (!this.bodyId) return null
    const { e } = this.elements()
    const nu = trueAnomalyFromMean(this.mean, e)
    return Math.cos(nu) > 0 ? 'near' : 'far'
  }

  perihelionRadius(): number {
    const { a, e } = this.elements()
    return keplerRadius(a, e, 0)
  }

  advance(dtSimDays: number, periodDays: number): void {
    if (!this.bodyId || periodDays <= 0) return
    this.mean = (this.mean + (dtSimDays / periodDays) * Math.PI * 2) % (Math.PI * 2)
    this.placeArrow()
  }

  rebuild(mode: ScaleMode): void {
    this.mode = mode
    if (!this.bodyId) return
    const { a, e } = this.elements()
    const inner = this.fanInnerRadius()
    this.near.geometry.dispose()
    this.far.geometry.dispose()
    this.path.geometry.dispose()
    this.near.geometry = fanGeometry(equalTimeSector(a, e, 0, HALF, 18, inner))
    this.far.geometry = fanGeometry(equalTimeSector(a, e, Math.PI, HALF, 18, inner))
    this.path.geometry = ellipseLine(a, e)
    const peri = orbitPointFlat(a, e, 0)
    this.peri.position.set(peri.x, 0.2, peri.z)
    this.placeArrow()
  }

  private fanInnerRadius(): number {
    return visualRadius('sun', this.mode) + FAN_INSET
  }

  private elements(): { a: number; e: number } {
    const body = getBody(this.bodyId ?? 'mercury')
    const a =
      this.mode === 'trueScale' ? body.orbitalRadiusAu * TRUE_SCALE_AU_UNITS : educationalOrbitRadius(body.orbitalRadiusAu)
    const minRadius = visualRadius('sun', this.mode) + visualRadius(this.bodyId ?? 'mercury', this.mode) + SUN_GAP
    const e = cappedVisualEccentricity(a, body.eccentricity, minRadius, this.mode !== 'trueScale')
    return { a, e }
  }

  private placeArrow(): void {
    const { a, e } = this.elements()
    const nu = trueAnomalyFromMean(this.mean, e)
    const p = orbitPointFlat(a, e, nu)
    const speed = keplerSpeedFactor(e, nu)
    this.arrow.position.set(p.x, 0.55, p.z)
    this.arrow.scale.setScalar(0.7 + speed * 0.55)
    this.arrow.rotation.set(Math.PI / 2, 0, -nu - Math.PI / 2)
  }

  dispose(): void {
    this.near.geometry.dispose()
    this.far.geometry.dispose()
    this.peri.geometry.dispose()
    this.arrow.geometry.dispose()
    this.path.geometry.dispose()
    const mats = [this.near.material, this.far.material, this.peri.material, this.arrow.material, this.path.material]
    for (const mat of mats) {
      if (!Array.isArray(mat)) mat.dispose()
    }
  }
}
