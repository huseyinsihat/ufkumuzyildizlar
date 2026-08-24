import {
  BufferGeometry,
  CanvasTexture,
  Color,
  Float32BufferAttribute,
  Group,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  SphereGeometry,
  Vector2,
  Vector3,
} from 'three'
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'
import { LineMaterial } from 'three/addons/lines/LineMaterial.js'
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js'
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js'
import {
  CONSTELLATIONS,
  constellationCentroidDir,
  type Constellation,
} from '../content/constellations'
import { SKY_SPHERE_RADIUS } from '../astronomy/skyCoordinates'
import { worldRadiusToPixels, type ScreenPickTarget } from './skyPick'
import { createStarPointTexture } from './proceduralTextures'

const SPHERE_RADIUS = SKY_SPHERE_RADIUS
const STAR_GEO = new SphereGeometry(2.4, 8, 6)
const LINE_IDLE = 0.5
const LINE_SELECTED = 0.92
const LINE_DIM = 0.28
const CORE_WIDTH = 1.7
const CORE_WIDTH_SEL = 2.5
const GLOW_WIDTH = 5.2
const GLOW_WIDTH_SEL = 7.4
const STAR_SIZE = 3.4
const STAR_SIZE_SEL = 4.4
let starPoint: CanvasTexture | null = null

function starPointMap(): CanvasTexture {
  starPoint ??= createStarPointTexture()
  return starPoint
}

interface FigureStroke {
  glow: LineSegments2
  core: LineSegments2
  stars: Points
}

export class ConstellationLayer {
  readonly group: Group
  private selectedId: string | null = null
  private figures = new Map<string, Group>()
  private strokes = new Map<string, FigureStroke>()
  private labels = new Map<string, CSS2DObject>()
  private centroids = new Map<string, Vector3>()
  private spreads = new Map<string, number>()
  readonly pickMeshes: Mesh[] = []
  private readonly ndc = new Vector3()
  private readonly view = new Vector3()
  private readonly resolution = new Vector2(1, 1)
  private labelsOn = true

  constructor() {
    this.group = new Group()
    this.group.name = 'constellations'
    this.group.visible = false
    for (const constellation of CONSTELLATIONS) {
      this.figures.set(constellation.id, this.build(constellation))
    }
  }

  setResolution(width: number, height: number): void {
    this.resolution.set(Math.max(width, 1), Math.max(height, 1))
    for (const stroke of this.strokes.values()) {
      this.copyResolution(stroke.glow)
      this.copyResolution(stroke.core)
    }
  }

  private copyResolution(line: LineSegments2): void {
    const material = line.material
    if (!Array.isArray(material) && material instanceof LineMaterial) {
      material.resolution.copy(this.resolution)
    }
  }

  private build(constellation: Constellation): Group {
    const root = new Group()
    root.name = constellation.id
    const starPositions: number[] = []
    const byId = new Map(constellation.stars.map((item) => [item.id, item]))
    const center = constellationCentroidDir(constellation)
    const centroid = new Vector3(center.x * SPHERE_RADIUS, center.y * SPHERE_RADIUS, center.z * SPHERE_RADIUS)
    this.centroids.set(constellation.id, centroid)
    let spread = 10
    for (const item of constellation.stars) {
      const x = item.x * SPHERE_RADIUS
      const y = item.y * SPHERE_RADIUS
      const z = item.z * SPHERE_RADIUS
      starPositions.push(x, y, z)
      spread = Math.max(spread, Math.hypot(x - centroid.x, y - centroid.y, z - centroid.z))
      if (constellation.id === 'ursa-major') {
        const mesh = new Mesh(
          STAR_GEO,
          new MeshBasicMaterial({ color: '#e2f6ff', transparent: true, opacity: 0, depthWrite: false }),
        )
        mesh.position.set(x, y, z)
        mesh.userData.constellationId = constellation.id
        mesh.userData.starId = item.id
        root.add(mesh)
        this.pickMeshes.push(mesh)
      }
    }
    this.spreads.set(constellation.id, spread * 0.62)

    const starGeo = new BufferGeometry()
    starGeo.setAttribute('position', new Float32BufferAttribute(starPositions, 3))
    const stars = new Points(
      starGeo,
      new PointsMaterial({
        map: starPointMap(),
        color: '#e7f8ff',
        size: STAR_SIZE,
        sizeAttenuation: true,
        transparent: true,
        depthWrite: false,
      }),
    )
    stars.renderOrder = 3
    root.add(stars)

    const linePositions: number[] = []
    for (const [fromId, toId] of constellation.lines) {
      const from = byId.get(fromId)
      const to = byId.get(toId)
      if (!from || !to) continue
      linePositions.push(
        from.x * SPHERE_RADIUS,
        from.y * SPHERE_RADIUS,
        from.z * SPHERE_RADIUS,
        to.x * SPHERE_RADIUS,
        to.y * SPHERE_RADIUS,
        to.z * SPHERE_RADIUS,
      )
    }
    const glow = this.makeStroke(linePositions, GLOW_WIDTH, '#7ecfff', 0.22)
    glow.renderOrder = 1
    const core = this.makeStroke(linePositions, CORE_WIDTH, '#c4eeff', LINE_IDLE)
    core.renderOrder = 2
    root.add(glow)
    root.add(core)
    this.strokes.set(constellation.id, { glow, core, stars })

    const label = document.createElement('div')
    label.className = 'planet-label sky-label constellation-label'
    label.textContent = constellation.name
    const css = new CSS2DObject(label)
    css.position.copy(centroid)
    root.add(css)
    this.labels.set(constellation.id, css)

    this.group.add(root)
    return root
  }

  private makeStroke(positions: number[], width: number, color: string, opacity: number): LineSegments2 {
    const geometry = new LineSegmentsGeometry()
    geometry.setPositions(positions)
    const material = new LineMaterial({
      color: new Color(color),
      linewidth: width,
      transparent: true,
      opacity,
      depthTest: true,
      depthWrite: false,
      dashed: false,
      worldUnits: false,
    })
    material.resolution.copy(this.resolution)
    const line = new LineSegments2(geometry, material)
    line.frustumCulled = false
    return line
  }

  setVisible(visible: boolean): void {
    this.group.visible = visible
  }

  setLabelsVisible(visible: boolean): void {
    this.labelsOn = visible
    for (const label of this.labels.values()) {
      if (!visible) label.visible = false
    }
  }

  select(id: string | null): void {
    this.selectedId = id
    for (const [key, stroke] of this.strokes) {
      const selected = id !== null && key === id
      const idle = id === null
      const opacity = idle ? LINE_IDLE : selected ? LINE_SELECTED : LINE_DIM
      const coreWidth = selected ? CORE_WIDTH_SEL : CORE_WIDTH
      const glowWidth = selected ? GLOW_WIDTH_SEL : GLOW_WIDTH
      this.paintStroke(stroke.core, opacity, coreWidth)
      this.paintStroke(stroke.glow, selected ? 0.42 : idle ? 0.22 : 0.1, glowWidth)
      const starMat = stroke.stars.material
      if (!Array.isArray(starMat) && starMat instanceof PointsMaterial) {
        starMat.opacity = idle ? 1 : selected ? 1 : 0.45
        starMat.size = selected ? STAR_SIZE_SEL : STAR_SIZE
      }
    }
    for (const [key, label] of this.labels) {
      label.element.classList.toggle('is-selected', key === id)
    }
  }

  private paintStroke(line: LineSegments2, opacity: number, width: number): void {
    const material = line.material
    if (Array.isArray(material) || !(material instanceof LineMaterial)) return
    material.opacity = opacity
    material.linewidth = width
  }

  getSelectedId(): string | null {
    return this.selectedId
  }

  centroidWorld(id: string): Vector3 | undefined {
    const centroid = this.centroids.get(id)
    return centroid ? centroid.clone() : undefined
  }

  pickTargets(camera: PerspectiveCamera, _width: number, height: number): ScreenPickTarget[] {
    camera.updateMatrixWorld()
    const targets: ScreenPickTarget[] = []
    for (const [id, centroid] of this.centroids) {
      this.view.copy(centroid).applyMatrix4(camera.matrixWorldInverse)
      const behindCamera = this.view.z > 0
      const distance = centroid.distanceTo(camera.position)
      this.ndc.copy(centroid).project(camera)
      targets.push({
        id,
        ndcX: this.ndc.x,
        ndcY: this.ndc.y,
        radiusPx: worldRadiusToPixels(this.spreads.get(id) ?? 12, distance, camera.fov, height),
        behindCamera,
      })
    }
    return targets
  }

  updateLabels(camera: PerspectiveCamera): void {
    if (!this.labelsOn || !this.group.visible) {
      for (const label of this.labels.values()) label.visible = false
      return
    }
    camera.updateMatrixWorld()
    for (const [id, label] of this.labels) {
      const centroid = this.centroids.get(id)
      if (!centroid) continue
      this.view.copy(centroid).applyMatrix4(camera.matrixWorldInverse)
      label.visible = this.view.z <= 0
    }
  }

  dispose(): void {
    this.group.traverse((child) => {
      if (child instanceof LineSegments2 || child instanceof Points) {
        child.geometry.dispose()
        const material = child.material
        if (!Array.isArray(material)) material.dispose()
      }
      if (child instanceof Mesh && !(child instanceof LineSegments2)) {
        const material = child.material
        if (!Array.isArray(material)) material.dispose()
      }
    })
  }
}
