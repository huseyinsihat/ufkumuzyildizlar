import {
  AdditiveBlending,
  Group,
  Mesh,
  MeshBasicMaterial,
  SphereGeometry,
  Vector3,
} from 'three'
import { cometTailAwayFromSun } from '../features/lab/wowMath'

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
      new SphereGeometry(1, 10, 8),
      new MeshBasicMaterial({
        color: '#9be7ff',
        transparent: true,
        opacity: 0.45,
        blending: AdditiveBlending,
        depthWrite: false,
      }),
    )
    this.tail.raycast = () => {}
    this.tail.scale.set(0.35, 0.35, 3.8)
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

  updateTail(sun: Vector3): void {
    if (!this.enabled) return
    this.sun.copy(sun)
    const dir = cometTailAwayFromSun(sun, this.group.position)
    this.tail.position.set(dir.x * 2.2, dir.y * 2.2, dir.z * 2.2)
    this.tail.lookAt(this.group.position.x + dir.x, this.group.position.y + dir.y, this.group.position.z + dir.z)
    const closeness = Math.max(0.35, Math.min(1.6, 22 / dir.length))
    this.tail.scale.set(0.28 * closeness, 0.28 * closeness, 2.6 + closeness * 3.2)
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
