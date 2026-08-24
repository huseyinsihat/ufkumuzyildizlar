import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshStandardMaterial,
  IcosahedronGeometry,
} from 'three'
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'
import { keplerMeanMotionRadPerDay } from '../astronomy/keplerMotion'
import { compressDistance } from '../astronomy/visualScale'
import { meteorShowerIntensity } from '../content/meteorShowers'
import { NAMED_ROCKS } from '../content/skyWonders'
import type { ScaleMode } from '../types/simulation'

interface Meteor {
  line: Line
  life: number
  max: number
}

export class SkyRocks {
  readonly group: Group
  readonly meshes: Mesh[] = []
  private angles: number[]
  private meteors: Meteor[] = []
  private spawn = 0
  private meteorGeo: BufferGeometry
  private meteorMat: LineBasicMaterial
  private scaleMode: ScaleMode = 'educational'

  constructor() {
    this.group = new Group()
    this.group.name = 'sky-rocks'
    this.angles = NAMED_ROCKS.map((_, index) => index * 1.9)
    const geometry = new IcosahedronGeometry(1, 1)
    for (const [index, rock] of NAMED_ROCKS.entries()) {
      const mesh = new Mesh(
        geometry,
        new MeshStandardMaterial({
          color: new Color('#b7a894'),
          roughness: 0.96,
          metalness: 0.04,
        }),
      )
      mesh.userData.wonderId = rock.id
      mesh.scale.setScalar(rock.size)
      this.group.add(mesh)
      this.meshes.push(mesh)
      const label = document.createElement('div')
      label.className = 'planet-label sky-label'
      label.textContent = rock.name
      const css = new CSS2DObject(label)
      css.position.set(0, 1.4, 0)
      mesh.add(css)
      this.place(index, 0)
    }

    this.meteorGeo = new BufferGeometry()
    this.meteorGeo.setAttribute('position', new Float32BufferAttribute([0, 0, 0, 0, 0, -8], 3))
    this.meteorMat = new LineBasicMaterial({
      color: '#ffe6b0',
      transparent: true,
      opacity: 0.85,
      blending: AdditiveBlending,
      depthWrite: false,
    })
  }

  private place(index: number, dtDays: number): void {
    const rock = NAMED_ROCKS[index]
    const mesh = this.meshes[index]
    if (!rock || !mesh) return
    this.angles[index] += keplerMeanMotionRadPerDay(rock.au) * dtDays
    const radius = compressDistance(rock.au, this.scaleMode)
    const angle = this.angles[index] ?? 0
    mesh.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle * 1.7) * rock.tilt * 6,
      Math.sin(angle) * radius,
    )
    mesh.rotation.y += dtDays * 0.4
    mesh.rotation.x += dtDays * 0.15
  }

  setScaleMode(mode: ScaleMode): void {
    this.scaleMode = mode
    for (let i = 0; i < this.meshes.length; i += 1) this.place(i, 0)
  }

  setLabelsVisible(visible: boolean): void {
    for (const mesh of this.meshes) {
      mesh.traverse((child) => {
        if (child instanceof CSS2DObject) child.visible = visible
      })
    }
  }

  update(dtSec: number, dtDays: number, timeMs: number, playing: boolean): void {
    for (let i = 0; i < this.meshes.length; i += 1) this.place(i, dtDays)
    if (!playing && Math.abs(dtDays) < 1e-9) return
    const intensity = meteorShowerIntensity(timeMs)
    const timeBoost = 1 + Math.min(8, Math.abs(dtDays) * 12)
    this.spawn += dtSec * (0.22 + intensity * 1.7) * timeBoost
    const cap = 3 + Math.round(intensity * 7)
    if (this.spawn > 2.8 && this.meteors.length < cap) {
      this.spawn = 0
      this.launchMeteor()
    }
    for (let i = this.meteors.length - 1; i >= 0; i -= 1) {
      const meteor = this.meteors[i]
      if (!meteor) continue
      meteor.life += dtSec
      meteor.line.position.x += meteor.line.userData.vx * dtSec
      meteor.line.position.y += meteor.line.userData.vy * dtSec
      meteor.line.position.z += meteor.line.userData.vz * dtSec
      const material = meteor.line.material
      if (!Array.isArray(material)) material.opacity = Math.max(0, 1 - meteor.life / meteor.max)
      if (meteor.life >= meteor.max) {
        this.group.remove(meteor.line)
        meteor.line.geometry.dispose()
        this.meteors.splice(i, 1)
      }
    }
  }

  private launchMeteor(): void {
    const line = new Line(this.meteorGeo.clone(), this.meteorMat.clone())
    const side = Math.random() > 0.5 ? 1 : -1
    line.position.set(side * (18 + Math.random() * 40), 8 + Math.random() * 22, -20 - Math.random() * 30)
    line.lookAt(0, 2, 10)
    line.userData.vx = -side * (18 + Math.random() * 22)
    line.userData.vy = -6 - Math.random() * 8
    line.userData.vz = 24 + Math.random() * 18
    line.raycast = () => {}
    this.group.add(line)
    this.meteors.push({ line, life: 0, max: 1.1 + Math.random() * 0.6 })
  }

  dispose(): void {
    for (const mesh of this.meshes) {
      const material = mesh.material
      if (!Array.isArray(material)) material.dispose()
    }
    this.meteorGeo.dispose()
    this.meteorMat.dispose()
    for (const meteor of this.meteors) {
      meteor.line.geometry.dispose()
      const material = meteor.line.material
      if (!Array.isArray(material)) material.dispose()
    }
  }
}
