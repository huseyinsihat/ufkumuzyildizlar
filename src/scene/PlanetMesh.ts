import {
  AdditiveBlending,
  BufferGeometry,
  Float32BufferAttribute,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  SphereGeometry,
} from 'three'
import { DEG2RAD } from '../astronomy/astronomyConstants'
import type { PlanetDefinition } from '../types/planet'
import type { ScaleMode } from '../types/simulation'
import { visualRadius } from '../astronomy/visualScale'
import { createBodyTexture } from './proceduralTextures'
import { RingMesh } from './RingMesh'

const HIGH_GEO = new SphereGeometry(1, 64, 48)
const LOW_GEO = new SphereGeometry(1, 24, 16)

export class PlanetMesh {
  readonly group: Group
  readonly tiltGroup: Group
  readonly mesh: Mesh
  readonly body: PlanetDefinition
  readonly glow: Mesh
  readonly axis: Line
  private northCap: Mesh | null = null
  private rings: RingMesh | null = null
  private spin = 0
  private lod: 'high' | 'low' = 'high'

  constructor(body: PlanetDefinition) {
    this.body = body
    this.group = new Group()
    this.group.name = body.id

    this.tiltGroup = new Group()
    this.tiltGroup.rotation.z = body.axialTiltDeg * DEG2RAD
    this.group.add(this.tiltGroup)

    const texture = createBodyTexture(body.id, body.color, 512)
    const material = new MeshStandardMaterial({
      map: texture,
      roughness: body.category === 'gasGiant' || body.category === 'iceGiant' ? 0.72 : 0.86,
      metalness: 0.02,
      emissive: '#000000',
      emissiveIntensity: 0,
    })

    this.mesh = new Mesh(HIGH_GEO, material)
    this.mesh.userData.bodyId = body.id
    this.mesh.castShadow = false
    this.mesh.receiveShadow = false
    this.tiltGroup.add(this.mesh)

    this.glow = new Mesh(
      LOW_GEO,
      new MeshBasicMaterial({
        color: '#7ee0ff',
        transparent: true,
        opacity: 0,
        blending: AdditiveBlending,
        depthWrite: false,
      }),
    )
    this.glow.scale.setScalar(1.12)
    this.glow.raycast = () => {}
    this.tiltGroup.add(this.glow)

    const axisGeo = new BufferGeometry()
    axisGeo.setAttribute('position', new Float32BufferAttribute([0, -2.1, 0, 0, 2.1, 0], 3))
    this.axis = new Line(axisGeo, new LineBasicMaterial({ color: '#9be7ff' }))
    this.axis.visible = false
    this.axis.raycast = () => {}
    this.tiltGroup.add(this.axis)

    if (body.id === 'earth') {
      this.northCap = new Mesh(
        new SphereGeometry(0.38, 16, 12),
        new MeshBasicMaterial({ color: '#93c5fd', transparent: true, opacity: 0 }),
      )
      this.northCap.raycast = () => {}
      this.tiltGroup.add(this.northCap)
    }

    if (body.id === 'moon') {
      const mark = new Mesh(
        new SphereGeometry(0.12, 12, 10),
        new MeshBasicMaterial({ color: '#f6e05e' }),
      )
      mark.position.set(0, 0, 1.12)
      mark.raycast = () => {}
      this.mesh.add(mark)
    }

    if (body.hasRings) {
      this.rings = new RingMesh(body.ringInnerScale ?? 1.2, body.ringOuterScale ?? 2.1, body.id === 'uranus')
      this.tiltGroup.add(this.rings.mesh)
    }

    this.applyScale('educational')
  }

  applyScale(mode: ScaleMode): void {
    const radius = Math.max(visualRadius(this.body.id, mode), 0.012)
    this.mesh.scale.setScalar(radius)
    this.glow.scale.setScalar(radius * 1.14)
    this.axis.scale.setScalar(radius)
    this.northCap?.position.set(0, radius * 1.02, 0)
    this.northCap?.scale.setScalar(radius)
    this.rings?.setPlanetRadius(radius)
  }

  setTiltDeg(deg: number): void {
    this.tiltGroup.rotation.z = deg * DEG2RAD
  }

  setNorthCap(kind: 'warm' | 'cold' | 'off'): void {
    if (!this.northCap) return
    const mat = this.northCap.material
    if (!(mat instanceof MeshBasicMaterial)) return
    if (kind === 'off') {
      mat.opacity = 0
      return
    }
    mat.color.set(kind === 'warm' ? '#fbd38d' : '#93c5fd')
    mat.opacity = 0.85
  }

  setSelected(selected: boolean): void {
    const material = this.glow.material
    if (!Array.isArray(material)) {
      material.opacity = selected ? 0.28 : 0
    }
  }

  setAxisVisible(visible: boolean): void {
    this.axis.visible = visible
  }

  updateLod(cameraDistance: number): void {
    const radius = this.mesh.scale.x
    const next = cameraDistance / Math.max(radius, 0.01) > 90 ? 'low' : 'high'
    if (next === this.lod) {
      return
    }
    this.lod = next
    this.mesh.geometry = next === 'high' ? HIGH_GEO : LOW_GEO
  }

  update(dtSimSeconds: number): void {
    const period = Math.abs(this.body.rotationPeriodHours) * 3600
    if (period === 0) {
      return
    }
    const sign = this.body.rotationPeriodHours < 0 ? -1 : 1
    this.spin += sign * ((Math.PI * 2) / period) * dtSimSeconds
    this.mesh.rotation.y = this.spin
    this.rings?.update(dtSimSeconds)
  }

  dispose(): void {
    const material = this.mesh.material
    if (material instanceof MeshStandardMaterial) {
      material.map?.dispose()
      material.dispose()
    }
    this.axis.geometry.dispose()
    const axisMat = this.axis.material
    if (!Array.isArray(axisMat)) axisMat.dispose()
    const glowMat = this.glow.material
    if (!Array.isArray(glowMat)) glowMat.dispose()
    this.rings?.dispose()
    if (this.northCap) {
      this.northCap.geometry.dispose()
      const capMat = this.northCap.material
      if (!Array.isArray(capMat)) capMat.dispose()
    }
  }
}
