import {
  AdditiveBlending,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  SphereGeometry,
  type Texture,
} from 'three'
import { EDU_RADIUS } from '../astronomy/visualScale'
import { createBodyTexture } from './proceduralTextures'

export class SunMesh {
  readonly group: Group
  readonly mesh: Mesh
  private glow: Mesh
  private spin = 0
  private readonly rotationPeriodHours: number

  constructor(rotationPeriodHours: number, texture?: Texture) {
    this.rotationPeriodHours = rotationPeriodHours
    this.group = new Group()
    this.group.name = 'sun'

    const geometry = new SphereGeometry(1, 64, 48)
    const map = texture ?? createBodyTexture('sun', '#F7C14A', 256)
    const material = new MeshStandardMaterial({
      map,
      emissive: '#ffb347',
      emissiveMap: map,
      emissiveIntensity: 1.35,
      roughness: 1,
      metalness: 0,
    })
    this.mesh = new Mesh(geometry, material)
    this.mesh.scale.setScalar(EDU_RADIUS.sun)
    this.mesh.userData.bodyId = 'sun'
    this.group.add(this.mesh)

    this.glow = new Mesh(
      new SphereGeometry(1, 32, 24),
      new MeshBasicMaterial({
        color: '#ffcc66',
        transparent: true,
        opacity: 0.18,
        blending: AdditiveBlending,
        depthWrite: false,
      }),
    )
    this.glow.scale.setScalar(EDU_RADIUS.sun * 1.28)
    this.glow.raycast = () => {}
    this.group.add(this.glow)
  }

  setVisualRadius(radius: number): void {
    this.mesh.scale.setScalar(Math.max(radius, 0.08))
    this.glow.scale.setScalar(Math.max(radius, 0.08) * 1.28)
  }

  update(dtSimSeconds: number): void {
    const period = Math.abs(this.rotationPeriodHours) * 3600
    this.spin += ((Math.PI * 2) / period) * dtSimSeconds
    this.mesh.rotation.y = this.spin
  }

  dispose(): void {
    this.mesh.geometry.dispose()
    const material = this.mesh.material
    if (Array.isArray(material)) material.forEach((item) => item.dispose())
    else material.dispose()
    this.glow.geometry.dispose()
    const glowMat = this.glow.material
    if (Array.isArray(glowMat)) glowMat.forEach((item) => item.dispose())
    else glowMat.dispose()
  }
}
