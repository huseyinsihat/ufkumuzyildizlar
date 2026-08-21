import { Color, Group, Mesh, MeshStandardMaterial, SphereGeometry, Vector3 } from 'three'
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'
import { DEG2RAD } from '../astronomy/astronomyConstants'

export const CITIES = [
  { id: 'istanbul', name: 'İstanbul', lat: 41.01, lon: 28.97, color: '#2aa8a0', labelX: -0.08, labelY: 0.03 },
  { id: 'diyarbakir', name: 'Diyarbakır', lat: 37.91, lon: 40.23, color: '#c27a1a', labelX: -0.12, labelY: 0.06 },
] as const

function latLonToLocal(lat: number, lon: number) {
  const phi = (90 - lat) * DEG2RAD
  const theta = (lon + 180) * DEG2RAD
  return new Vector3(-Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta))
}

export class CityPins {
  readonly group: Group
  private dots: Mesh[] = []
  private labels: CSS2DObject[] = []
  private geometry: SphereGeometry

  constructor() {
    this.group = new Group()
    this.group.name = 'city-pins'
    this.geometry = new SphereGeometry(0.028, 14, 12)
    const up = new Vector3(0, 1, 0)
    for (const city of CITIES) {
      const n = latLonToLocal(city.lat, city.lon).normalize()
      const east = new Vector3().crossVectors(up, n)
      if (east.lengthSq() < 1e-8) east.set(1, 0, 0)
      east.normalize()
      const north = new Vector3().crossVectors(n, east).normalize()
      const dot = new Mesh(
        this.geometry,
        new MeshStandardMaterial({
          color: new Color(city.color),
          emissive: new Color(city.color),
          emissiveIntensity: 0.18,
          roughness: 0.72,
          metalness: 0.05,
        }),
      )
      dot.position.copy(n).multiplyScalar(1.035)
      const label = document.createElement('div')
      label.className = 'city-label'
      label.textContent = city.name
      label.style.color = city.color
      const css = new CSS2DObject(label)
      css.position.copy(east.multiplyScalar(city.labelX).add(north.multiplyScalar(city.labelY)))
      dot.add(css)
      this.group.add(dot)
      this.dots.push(dot)
      this.labels.push(css)
    }
    this.group.visible = false
  }

  setVisible(visible: boolean): void {
    this.group.visible = visible
  }

  setLabelsVisible(visible: boolean): void {
    for (const label of this.labels) label.visible = visible
  }

  dispose(): void {
    this.geometry.dispose()
    for (const dot of this.dots) {
      const material = dot.material
      if (!Array.isArray(material)) material.dispose()
    }
  }
}
