import { Color, Group, Mesh, MeshBasicMaterial, SphereGeometry } from 'three'
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'
import { DEG2RAD } from '../astronomy/astronomyConstants'

export const CITIES = [
  { id: 'ankara', name: 'Ankara', lat: 39.93, lon: 32.86 },
  { id: 'istanbul', name: 'İstanbul', lat: 41.01, lon: 28.97 },
  { id: 'london', name: 'Londra', lat: 51.51, lon: -0.13 },
  { id: 'newyork', name: 'New York', lat: 40.71, lon: -74.01 },
  { id: 'tokyo', name: 'Tokyo', lat: 35.68, lon: 139.69 },
] as const

function latLonToLocal(lat: number, lon: number) {
  const phi = (90 - lat) * DEG2RAD
  const theta = (lon + 180) * DEG2RAD
  return {
    x: -Math.sin(phi) * Math.cos(theta),
    y: Math.cos(phi),
    z: Math.sin(phi) * Math.sin(theta),
  }
}

export class CityPins {
  readonly group: Group
  private dots: Mesh[] = []
  private geometry: SphereGeometry

  constructor() {
    this.group = new Group()
    this.group.name = 'city-pins'
    this.geometry = new SphereGeometry(0.045, 12, 10)
    for (const city of CITIES) {
      const pos = latLonToLocal(city.lat, city.lon)
      const dot = new Mesh(this.geometry, new MeshBasicMaterial({ color: new Color('#ffe08a') }))
      dot.position.set(pos.x * 1.04, pos.y * 1.04, pos.z * 1.04)
      const label = document.createElement('div')
      label.className = 'city-label'
      label.textContent = city.name
      const css = new CSS2DObject(label)
      css.position.set(0, 0.08, 0)
      dot.add(css)
      this.group.add(dot)
      this.dots.push(dot)
    }
    this.group.visible = false
  }

  setVisible(visible: boolean): void {
    this.group.visible = visible
  }

  dispose(): void {
    this.geometry.dispose()
    for (const dot of this.dots) {
      const material = dot.material
      if (!Array.isArray(material)) material.dispose()
    }
  }
}
