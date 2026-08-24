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
import { siderealAngleRad } from '../astronomy/siderealSpin'

export class SunMesh {
  readonly group: Group
  readonly mesh: Mesh
  private glow: Mesh
  private corona: Mesh
  private spin = 0
  private readonly rotationPeriodHours: number
  private readonly baseEmissive = 1.85
  private readonly baseGlow = 0.22
  private readonly baseCorona = 0.1

  constructor(rotationPeriodHours: number, texture?: Texture) {
    this.rotationPeriodHours = rotationPeriodHours
    this.group = new Group()
    this.group.name = 'sun'

    const geometry = new SphereGeometry(1, 64, 48)
    const map = texture ?? createBodyTexture('sun', '#F7C14A', 512)
    const material = new MeshStandardMaterial({
      map,
      emissive: '#ffb347',
      emissiveMap: map,
      emissiveIntensity: 1.85,
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
        opacity: 0.22,
        blending: AdditiveBlending,
        depthWrite: false,
      }),
    )
    this.glow.scale.setScalar(EDU_RADIUS.sun * 1.28)
    this.glow.renderOrder = 4
    this.glow.raycast = () => {}
    this.group.add(this.glow)

    this.corona = new Mesh(
      new SphereGeometry(1, 32, 24),
      new MeshBasicMaterial({
        color: '#ffe29a',
        transparent: true,
        opacity: 0.1,
        blending: AdditiveBlending,
        depthWrite: false,
      }),
    )
    this.corona.scale.setScalar(EDU_RADIUS.sun * 1.62)
    this.corona.renderOrder = 3
    this.corona.raycast = () => {}
    this.group.add(this.corona)
  }

  setVisualRadius(radius: number): void {
    const next = Math.max(radius, 0.08)
    this.mesh.scale.setScalar(next)
    this.glow.scale.setScalar(next * 1.28)
    this.corona.scale.setScalar(next * 1.62)
  }

  setFlare(amount: number): void {
    const t = Math.max(0, Math.min(1, amount))
    const sunMat = this.mesh.material
    if (sunMat instanceof MeshStandardMaterial) sunMat.emissiveIntensity = this.baseEmissive + t * 0.28
    const glowMat = this.glow.material
    if (glowMat instanceof MeshBasicMaterial) glowMat.opacity = this.baseGlow + t * 0.08
    const coronaMat = this.corona.material
    if (coronaMat instanceof MeshBasicMaterial) coronaMat.opacity = this.baseCorona + t * 0.05
  }

  applyMap(texture: Texture): void {
    const material = this.mesh.material
    if (!(material instanceof MeshStandardMaterial)) return
    material.map?.dispose()
    material.map = texture
    material.emissiveMap = texture
    material.needsUpdate = true
  }

  update(_dtSimSeconds: number, simTimeMs = 0): void {
    this.spin = siderealAngleRad(simTimeMs, this.rotationPeriodHours)
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
    this.corona.geometry.dispose()
    const coronaMat = this.corona.material
    if (Array.isArray(coronaMat)) coronaMat.forEach((item) => item.dispose())
    else coronaMat.dispose()
  }
}
