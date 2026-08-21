import { BufferGeometry, Color, Float32BufferAttribute, Group, Line, LineBasicMaterial } from 'three'
import { sampleOrbit } from '../astronomy/orbitalCalculations'
import { getBody, getPlanets } from '../astronomy/planetData'
import { auToScene } from '../astronomy/visualScale'
import type { BodyId } from '../types/planet'
import type { ScaleMode } from '../types/simulation'

export class OrbitRenderer {
  readonly group: Group
  private lines = new Map<BodyId, Line>()

  constructor() {
    this.group = new Group()
    this.group.name = 'orbits'
  }

  rebuild(mode: ScaleMode): void {
    this.disposeLines()
    for (const planet of getPlanets()) {
      const points = sampleOrbit(
        {
          semiMajorAxisAu: planet.orbitalRadiusAu,
          eccentricity: planet.eccentricity,
          inclinationDeg: planet.inclinationDeg,
          longitudeAscendingNodeDeg: planet.longitudeAscendingNodeDeg,
          argumentPeriapsisDeg: planet.argumentPeriapsisDeg,
        },
        192,
      )
      const positions: number[] = []
      for (const point of points) {
        const scene = auToScene(point, mode)
        positions.push(scene.x, scene.y, scene.z)
      }
      const geometry = new BufferGeometry()
      geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
      const material = new LineBasicMaterial({
        color: new Color(planet.color).multiplyScalar(0.65),
        transparent: true,
        opacity: 0.38,
      })
      const line = new Line(geometry, material)
      line.userData.bodyId = planet.id
      this.group.add(line)
      this.lines.set(planet.id, line)
    }
  }

  highlight(bodyId: BodyId | null): void {
    for (const [id, line] of this.lines) {
      const material = line.material
      if (Array.isArray(material)) continue
      const lineMat = material as LineBasicMaterial
      const selected = id === bodyId
      lineMat.opacity = selected ? 0.95 : 0.32
      lineMat.color.set(selected ? '#7ee0ff' : getBody(id).color)
    }
  }

  setVisible(visible: boolean): void {
    this.group.visible = visible
  }

  private disposeLines(): void {
    for (const line of this.lines.values()) {
      line.geometry.dispose()
      const material = line.material
      if (!Array.isArray(material)) material.dispose()
      this.group.remove(line)
    }
    this.lines.clear()
  }

  dispose(): void {
    this.disposeLines()
  }
}
