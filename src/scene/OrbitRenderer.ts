import { Color, Group, Vector2 } from 'three'
import { Line2 } from 'three/addons/lines/Line2.js'
import { LineGeometry } from 'three/addons/lines/LineGeometry.js'
import { LineMaterial } from 'three/addons/lines/LineMaterial.js'
import { sampleHeliocentricOrbitAu } from '../astronomy/coordinateSystems'
import { getBody, getMoonsOf, getPlanets } from '../astronomy/planetData'
import { sampleSatelliteOrbitLocal } from '../astronomy/satellitePlacement'
import { auToScene, visualSatelliteOrbitRadius } from '../astronomy/visualScale'
import type { BodyId } from '../types/planet'
import type { ScaleMode } from '../types/simulation'
import type { PlanetMesh } from './PlanetMesh'

/** Screen-space stroke widths. Pick is wide enough to click; visuals stay hairline. */
export const ORBIT_LINE_PX = {
  visual: 1.2,
  visualHover: 1.9,
  visualSelected: 2.25,
  visualSatellite: 1.05,
  pick: 20,
  pickSatellite: 16,
} as const

export const ORBIT_OPACITY = {
  idle: 0.22,
  hover: 0.46,
  selected: 0.6,
  satelliteIdle: 0.18,
  satelliteOn: 0.5,
} as const

const IDLE_COLOR_SCALE = 0.34
const ACTIVE_COLOR_SCALE = 0.82

export class OrbitRenderer {
  readonly group: Group
  readonly pickMeshes: Line2[] = []
  private visuals = new Map<BodyId, Line2>()
  private picks = new Map<BodyId, Line2>()
  private satelliteVisuals = new Map<BodyId, Line2>()
  private satelliteHolders = new Map<BodyId, Group>()
  private overlayHidden: BodyId | null = null
  private selectedId: BodyId | null = null
  private hoverId: BodyId | null = null
  private resolution = new Vector2(1, 1)

  constructor() {
    this.group = new Group()
    this.group.name = 'orbits'
    this.group.renderOrder = 0
  }

  setResolution(width: number, height: number): void {
    this.resolution.set(Math.max(width, 1), Math.max(height, 1))
    this.applyResolution()
  }

  rebuild(mode: ScaleMode, date: Date = new Date()): void {
    this.disposeLines()
    for (const planet of getPlanets()) {
      const points = sampleHeliocentricOrbitAu(planet.id, date, 192)
      const positions: number[] = []
      for (const point of points) {
        const scene = auToScene(point, mode)
        positions.push(scene.x, scene.y, scene.z)
      }
      const visual = this.makeLine(positions, orbitLineWidthPx('visual'), planet.color, ORBIT_OPACITY.idle)
      visual.userData.bodyId = planet.id
      visual.userData.family = 'planet'
      visual.raycast = () => {}
      const pick = this.makeLine(positions, orbitLineWidthPx('pick'), '#ffffff', 0)
      pick.userData.bodyId = planet.id
      pick.userData.kind = 'orbit'
      this.group.add(visual)
      this.group.add(pick)
      this.visuals.set(planet.id, visual)
      this.picks.set(planet.id, pick)
      this.pickMeshes.push(pick)
    }
    for (const planet of getPlanets()) {
      for (const moon of getMoonsOf(planet.id)) {
        const radius = visualSatelliteOrbitRadius(moon.id, mode)
        const positions: number[] = []
        for (const point of sampleSatelliteOrbitLocal(moon, radius, 96)) {
          positions.push(point.x, point.y, point.z)
        }
        const visual = this.makeLine(
          positions,
          orbitLineWidthPx('visual', 'satellite'),
          moon.color,
          ORBIT_OPACITY.satelliteIdle,
        )
        visual.userData.bodyId = moon.id
        visual.userData.family = 'satellite'
        visual.raycast = () => {}
        const pick = this.makeLine(positions, orbitLineWidthPx('pick', 'satellite'), '#ffffff', 0)
        pick.userData.bodyId = moon.id
        pick.userData.kind = 'orbit'
        const holder = new Group()
        holder.userData.parentId = planet.id
        holder.userData.bodyId = moon.id
        holder.add(visual)
        holder.add(pick)
        this.group.add(holder)
        this.satelliteVisuals.set(moon.id, visual)
        this.satelliteHolders.set(moon.id, holder)
        this.pickMeshes.push(pick)
      }
    }
    this.applyResolution()
    this.applyOverlayHidden()
    this.applyTints()
  }

  followParents(planets: Map<BodyId, PlanetMesh>): void {
    for (const holder of this.satelliteHolders.values()) {
      const parentId = holder.userData.parentId as BodyId | undefined
      const parent = parentId ? planets.get(parentId) : undefined
      if (!parent) continue
      holder.position.copy(parent.group.position)
    }
  }

  setSatelliteVisible(id: BodyId, visible: boolean): void {
    const holder = this.satelliteHolders.get(id)
    if (holder) holder.visible = visible
  }

  highlight(bodyId: BodyId | null): void {
    this.selectedId = bodyId
    this.applyTints()
  }

  setHover(bodyId: BodyId | null): void {
    if (this.hoverId === bodyId) return
    this.hoverId = bodyId
    this.applyTints()
  }

  setVisible(visible: boolean): void {
    this.group.visible = visible
    if (!visible) this.setHover(null)
  }

  /** Hide the default ring while a lab overlay is the only path. */
  hideForOverlay(bodyId: BodyId | null): void {
    if (this.overlayHidden && this.overlayHidden !== bodyId) {
      this.setOrbitVisible(this.overlayHidden, true)
    }
    this.overlayHidden = bodyId
    this.applyOverlayHidden()
  }

  private applyOverlayHidden(): void {
    if (!this.overlayHidden) return
    this.setOrbitVisible(this.overlayHidden, false)
  }

  private setOrbitVisible(id: BodyId, visible: boolean): void {
    const visual = this.visuals.get(id)
    const pick = this.picks.get(id)
    if (visual) visual.visible = visible
    if (pick) pick.visible = visible
  }

  private applyTints(): void {
    for (const [id, line] of this.visuals) {
      const selected = id === this.selectedId
      const hovered = !selected && id === this.hoverId
      this.tintLine(line, selected, hovered, getBody(id).color, 'planet')
    }
    for (const [id, line] of this.satelliteVisuals) {
      const parentId = this.satelliteHolders.get(id)?.userData.parentId as BodyId | undefined
      const selected = this.selectedId === id || this.selectedId === parentId
      const hovered = !selected && this.hoverId === id
      this.tintLine(line, selected, hovered, getBody(id).color, 'satellite')
    }
  }

  private tintLine(
    line: Line2,
    selected: boolean,
    hovered: boolean,
    color: string,
    family: 'planet' | 'satellite',
  ): void {
    const material = line.material
    if (Array.isArray(material) || !(material instanceof LineMaterial)) return
    const active = selected || hovered
    material.opacity = selected
      ? family === 'satellite'
        ? ORBIT_OPACITY.satelliteOn
        : ORBIT_OPACITY.selected
      : hovered
        ? ORBIT_OPACITY.hover
        : family === 'satellite'
          ? ORBIT_OPACITY.satelliteIdle
          : ORBIT_OPACITY.idle
    material.linewidth = selected
      ? ORBIT_LINE_PX.visualSelected
      : hovered
        ? ORBIT_LINE_PX.visualHover
        : orbitLineWidthPx('visual', family)
    material.color.set(active ? '#7ee0ff' : color).multiplyScalar(active ? ACTIVE_COLOR_SCALE : IDLE_COLOR_SCALE)
  }

  private makeLine(positions: number[], width: number, color: string, opacity: number): Line2 {
    const geometry = new LineGeometry()
    geometry.setPositions(closedLoop(positions))
    const material = new LineMaterial({
      color: new Color(color).multiplyScalar(opacity === 0 ? 1 : IDLE_COLOR_SCALE),
      linewidth: width,
      transparent: true,
      opacity,
      depthTest: opacity > 0,
      depthWrite: false,
      dashed: false,
      worldUnits: false,
    })
    material.colorWrite = opacity > 0
    material.visible = opacity > 0
    material.resolution.copy(this.resolution)
    const line = new Line2(geometry, material)
    line.frustumCulled = false
    return line
  }

  private applyResolution(): void {
    const lines = [...this.visuals.values(), ...this.picks.values(), ...this.satelliteVisuals.values()]
    for (const line of lines) {
      const material = line.material
      if (!Array.isArray(material) && material instanceof LineMaterial) {
        material.resolution.copy(this.resolution)
      }
    }
  }

  private disposeLines(): void {
    const lines = new Set<Line2>([
      ...this.visuals.values(),
      ...this.picks.values(),
      ...this.satelliteVisuals.values(),
      ...this.pickMeshes,
    ])
    for (const line of lines) {
      line.geometry.dispose()
      const material = line.material
      if (!Array.isArray(material)) material.dispose()
      this.group.remove(line)
    }
    for (const holder of this.satelliteHolders.values()) {
      this.group.remove(holder)
    }
    this.visuals.clear()
    this.picks.clear()
    this.pickMeshes.length = 0
    this.satelliteVisuals.clear()
    this.satelliteHolders.clear()
  }

  dispose(): void {
    this.disposeLines()
  }
}

function closedLoop(positions: number[]): number[] {
  if (positions.length < 6) return positions
  const startX = positions[0]
  const startY = positions[1]
  const startZ = positions[2]
  const last = positions.length
  if (
    startX === positions[last - 3] &&
    startY === positions[last - 2] &&
    startZ === positions[last - 1]
  ) {
    return positions
  }
  return [...positions, startX ?? 0, startY ?? 0, startZ ?? 0]
}

export function orbitLineWidthPx(
  kind: 'visual' | 'pick',
  family: 'planet' | 'satellite' = 'planet',
): number {
  if (kind === 'pick') return family === 'satellite' ? ORBIT_LINE_PX.pickSatellite : ORBIT_LINE_PX.pick
  return family === 'satellite' ? ORBIT_LINE_PX.visualSatellite : ORBIT_LINE_PX.visual
}
