import {
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  RingGeometry,
  type Texture,
} from 'three'
import { createRingTexture } from './proceduralTextures'

export class RingMesh {
  readonly mesh: Mesh
  private texture: Texture

  constructor(innerScale: number, outerScale: number, faint: boolean) {
    this.texture = createRingTexture(innerScale, outerScale, faint)
    const geometry = new RingGeometry(innerScale, outerScale, 128, 6)
    const material = new MeshBasicMaterial({
      map: this.texture,
      transparent: true,
      opacity: faint ? 0.42 : 0.92,
      side: DoubleSide,
      depthWrite: false,
      alphaTest: 0.04,
    })
    this.mesh = new Mesh(geometry, material)
    this.mesh.rotation.x = Math.PI / 2
    this.mesh.raycast = () => {}
    this.mesh.renderOrder = 2
  }

  setPlanetRadius(radius: number): void {
    this.mesh.scale.setScalar(radius)
  }

  setLod(_close: boolean): void {}

  update(_dtSimSeconds: number): void {}

  dispose(): void {
    this.mesh.geometry.dispose()
    const material = this.mesh.material
    if (!Array.isArray(material)) material.dispose()
    this.texture.dispose()
  }
}
