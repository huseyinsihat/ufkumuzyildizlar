import { DoubleSide, Mesh, MeshBasicMaterial, RingGeometry, type Texture } from 'three'
import { createRingTexture } from './proceduralTextures'

export class RingMesh {
  readonly mesh: Mesh
  private texture: Texture

  constructor(innerScale: number, outerScale: number, faint: boolean) {
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
  }

  setPlanetRadius(radius: number): void {
    this.mesh.scale.setScalar(radius)
  }

  update(_dtSimSeconds: number): void {
    // Rings share the planet's axial tilt group; no extra spin needed.
  }

  dispose(): void {
    this.mesh.geometry.dispose()
    const material = this.mesh.material
    if (!Array.isArray(material)) material.dispose()
    this.texture.dispose()
  }
}
