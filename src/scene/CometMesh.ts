import {
  AdditiveBlending,
  ConeGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  SphereGeometry,
  Vector3,
} from 'three'
import { cometTailAwayFromSun } from '../features/lab/wowMath'

export const COMET_SUN_CLEARANCE = 2.5

export class CometMesh {
  readonly group = new Group()
  private nucleus: Mesh
  private tail: Mesh
  private sun = new Vector3()
  enabled = false

  constructor() {
    this.nucleus = new Mesh(
      new SphereGeometry(0.42, 16, 12),
      new MeshBasicMaterial({ color: '#e8f4ff' }),
    )
    this.nucleus.userData.comet = true
    this.tail = new Mesh(
      new ConeGeometry(0.55, 4.2, 12, 1, true),
      new MeshBasicMaterial({
        color: '#9be7ff',
        transparent: true,
        opacity: 0.45,
        blending: AdditiveBlending,
        depthWrite: false,
      }),
    )
    this.tail.raycast = () => {}
    this.group.add(this.nucleus)
    this.group.add(this.tail)
    this.group.visible = false
    this.group.position.set(18, 0, 8)
  }

  setEnabled(on: boolean): void {
    this.enabled = on
    this.group.visible = on
    if (on) this.group.position.set(18, 0, 8)
  }

  nudge(towardSun: boolean, sunRadius = 8): void {
    const minRadius = sunRadius + COMET_SUN_CLEARANCE
    const len = this.group.position.length() || 1
    const next = Math.min(28, Math.max(minRadius, towardSun ? len * 0.62 : len * 1.4))
    this.group.position.multiplyScalar(next / len)
  }

  updateTail(sun: Vector3): void {
    if (!this.enabled) return
    this.sun.copy(sun)
    const dir = cometTailAwayFromSun(sun, this.group.position)
    const away = new Vector3(dir.x, dir.y, dir.z)
    this.tail.position.copy(away).multiplyScalar(2.1)
    this.tail.quaternion.setFromUnitVectors(new Vector3(0, 1, 0), away)
    const closeness = Math.max(0.35, Math.min(1.6, 22 / dir.length))
    this.tail.scale.set(0.85 * closeness, 0.7 + closeness * 0.55, 0.85 * closeness)
  }

  dispose(): void {
    this.nucleus.geometry.dispose()
    this.tail.geometry.dispose()
    const a = this.nucleus.material
    const b = this.tail.material
    if (!Array.isArray(a)) a.dispose()
    if (!Array.isArray(b)) b.dispose()
  }
}
