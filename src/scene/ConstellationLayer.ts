import {
  BufferGeometry,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  Points,
  PointsMaterial,
  SphereGeometry,
} from 'three'
import { CONSTELLATIONS, type Constellation } from '../content/constellations'
import { SKY_SPHERE_RADIUS } from '../astronomy/skyCoordinates'

const SPHERE_RADIUS = SKY_SPHERE_RADIUS
const STAR_GEO = new SphereGeometry(0.55, 8, 6)

export class ConstellationLayer {
  readonly group: Group
  private selectedId: string | null = null
  private figures = new Map<string, Group>()
  readonly pickMeshes: Mesh[] = []

  constructor() {
    this.group = new Group()
    this.group.name = 'constellations'
    this.group.visible = false
    for (const constellation of CONSTELLATIONS) {
      this.figures.set(constellation.id, this.build(constellation))
    }
  }

  private build(constellation: Constellation): Group {
    const root = new Group()
    root.name = constellation.id
    const starPositions: number[] = []
    const byId = new Map(constellation.stars.map((star) => [star.id, star]))
    for (const star of constellation.stars) {
      starPositions.push(star.x * SPHERE_RADIUS, star.y * SPHERE_RADIUS, star.z * SPHERE_RADIUS)
      const mesh = new Mesh(STAR_GEO, new MeshBasicMaterial({ color: '#e2f6ff' }))
      mesh.position.set(star.x * SPHERE_RADIUS, star.y * SPHERE_RADIUS, star.z * SPHERE_RADIUS)
      mesh.userData.constellationId = constellation.id
      mesh.userData.starId = star.id
      mesh.visible = constellation.id === 'ursa-major'
      root.add(mesh)
      if (constellation.id === 'ursa-major') this.pickMeshes.push(mesh)
    }
    const starGeo = new BufferGeometry()
    starGeo.setAttribute('position', new Float32BufferAttribute(starPositions, 3))
    const stars = new Points(
      starGeo,
      new PointsMaterial({ color: '#d7f4ff', size: 3.2, sizeAttenuation: true }),
    )
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
    const lineGeo = new BufferGeometry()
    lineGeo.setAttribute('position', new Float32BufferAttribute(linePositions, 3))
    const lines = new LineSegments(
      lineGeo,
      new LineBasicMaterial({ color: '#8fd9ff', transparent: true, opacity: 0.55 }),
    )
    root.add(lines)
    this.group.add(root)
    return root
  }

  setVisible(visible: boolean): void {
    this.group.visible = visible
  }

  select(id: string | null): void {
    this.selectedId = id
    for (const [key, figure] of this.figures) {
      figure.traverse((child) => {
        if (child instanceof LineSegments) {
          const material = child.material
          if (!Array.isArray(material)) {
            material.opacity = key === id || id === null ? 0.85 : 0.22
          }
        }
      })
    }
  }

  getSelectedId(): string | null {
    return this.selectedId
  }

  dispose(): void {
    this.group.traverse((child) => {
      if (child instanceof LineSegments || child instanceof Points) {
        child.geometry.dispose()
        const material = child.material
        if (!Array.isArray(material)) material.dispose()
      }
    })
  }
}
