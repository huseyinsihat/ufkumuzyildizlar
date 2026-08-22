import {
  Color,
  DoubleSide,
  DynamicDrawUsage,
  InstancedMesh,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  Points,
  PointsMaterial,
  BufferGeometry,
  Float32BufferAttribute,
  RingGeometry,
  SphereGeometry,
  type Texture,
} from 'three'
import { asteroidCountForDevice } from '../utils/performance'
import { createRingTexture } from './proceduralTextures'

export class RingMesh {
  readonly mesh: Mesh
  private texture: Texture
  private particles: InstancedMesh | null = null
  private dust: Points | null = null
  private dummy = new Object3D()
  private inner: number
  private outer: number
  private faint: boolean

  constructor(innerScale: number, outerScale: number, faint: boolean) {
    this.inner = innerScale
    this.outer = outerScale
    this.faint = faint
    this.texture = createRingTexture()
    const geometry = new RingGeometry(innerScale, outerScale, 96, 4)
    const material = new MeshBasicMaterial({
      map: this.texture,
      color: faint ? '#9fd7d4' : '#e8d7b0',
      transparent: true,
      opacity: faint ? 0.28 : 0.72,
      side: DoubleSide,
      depthWrite: false,
    })
    this.mesh = new Mesh(geometry, material)
    this.mesh.rotation.x = Math.PI / 2
    this.mesh.raycast = () => {}
    this.mesh.renderOrder = 2

    if (!faint) {
      this.buildParticles()
    }
  }

  private buildParticles(): void {
    const rich = asteroidCountForDevice() > 700
    const count = rich ? 9000 : 2800
    const ice = new MeshBasicMaterial({ color: '#efe6c8', transparent: true, opacity: 0.85, depthWrite: false })
    this.particles = new InstancedMesh(new SphereGeometry(1, 6, 4), ice, count)
    this.particles.instanceMatrix.setUsage(DynamicDrawUsage)
    this.particles.raycast = () => {}
    this.particles.renderOrder = 3

    const dustPos: number[] = []
    for (let i = 0; i < count; i += 1) {
      const u = Math.random()
      const r = this.inner + Math.pow(u, 0.65) * (this.outer - this.inner)
      const theta = Math.random() * Math.PI * 2
      const y = (Math.random() - 0.5) * 0.035
      this.dummy.position.set(Math.cos(theta) * r, y, Math.sin(theta) * r)
      this.dummy.scale.setScalar(0.012 + Math.random() * 0.018)
      this.dummy.updateMatrix()
      this.particles.setMatrixAt(i, this.dummy.matrix)
      if (i % 3 === 0) dustPos.push(this.dummy.position.x, this.dummy.position.y, this.dummy.position.z)
    }
    this.particles.instanceMatrix.needsUpdate = true
    this.mesh.add(this.particles)

    const dustGeo = new BufferGeometry()
    dustGeo.setAttribute('position', new Float32BufferAttribute(dustPos, 3))
    this.dust = new Points(
      dustGeo,
      new PointsMaterial({ color: new Color('#d9c89a'), size: 0.035, transparent: true, opacity: 0.55, depthWrite: false }),
    )
    this.dust.raycast = () => {}
    this.mesh.add(this.dust)
  }

  setPlanetRadius(radius: number): void {
    this.mesh.scale.setScalar(radius)
  }

  setLod(close: boolean): void {
    if (this.particles) this.particles.visible = close
    if (this.dust) this.dust.visible = !close || this.faint
  }

  update(_dtSimSeconds: number): void {
    if (this.particles) this.particles.rotation.y += 0.00008
  }

  dispose(): void {
    this.mesh.geometry.dispose()
    const material = this.mesh.material
    if (!Array.isArray(material)) material.dispose()
    this.texture.dispose()
    if (this.particles) {
      this.particles.geometry.dispose()
      const mat = this.particles.material
      if (!Array.isArray(mat)) mat.dispose()
    }
    if (this.dust) {
      this.dust.geometry.dispose()
      const mat = this.dust.material
      if (!Array.isArray(mat)) mat.dispose()
    }
  }
}
