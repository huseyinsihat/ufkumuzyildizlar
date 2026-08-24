import { CylinderGeometry, Group, Mesh, MeshBasicMaterial, Vector3 } from 'three'

/** Earth's shadow cone — shown only during the eclipse activity. */
export class UmbraMesh {
  readonly group: Group
  private cone: Mesh
  private readonly up = new Vector3(0, 1, 0)
  private readonly away = new Vector3()

  constructor() {
    this.group = new Group()
    this.group.name = 'umbra'
    this.group.visible = false
    this.cone = new Mesh(
      new CylinderGeometry(0.2, 2.4, 8, 20, 1, true),
      new MeshBasicMaterial({
        color: '#020617',
        transparent: true,
        opacity: 0.62,
        depthWrite: false,
      }),
    )
    this.cone.raycast = () => {}
    this.group.add(this.cone)
  }

  setEnabled(on: boolean): void {
    this.group.visible = on
  }

  /** Place the cone from Earth, pointing away from the Sun (at the origin). */
  update(earth: { x: number; y: number; z: number }, length: number): void {
    if (!this.group.visible) return
    const dist = Math.hypot(earth.x, earth.y, earth.z) || 1
    this.away.set(earth.x / dist, earth.y / dist, earth.z / dist)
    this.group.position.set(
      earth.x + this.away.x * length * 0.5,
      earth.y + this.away.y * length * 0.5,
      earth.z + this.away.z * length * 0.5,
    )
    this.group.quaternion.setFromUnitVectors(this.up, this.away)
    this.cone.scale.set(1, length / 8, 1)
  }

  dispose(): void {
    this.cone.geometry.dispose()
    const mat = this.cone.material
    if (!Array.isArray(mat)) mat.dispose()
  }
}
