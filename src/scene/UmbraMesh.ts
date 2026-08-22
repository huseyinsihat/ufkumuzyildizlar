import { CylinderGeometry, Group, Mesh, MeshBasicMaterial } from 'three'

/** Earth's shadow cone — shown only during the eclipse activity. */
export class UmbraMesh {
  readonly group: Group
  private cone: Mesh

  constructor() {
    this.group = new Group()
    this.group.name = 'umbra'
    this.group.visible = false
    this.cone = new Mesh(
      new CylinderGeometry(0.2, 2.4, 8, 20, 1, true),
      new MeshBasicMaterial({
        color: '#020617',
        transparent: true,
        opacity: 0.45,
        depthWrite: false,
      }),
    )
    this.cone.rotation.x = Math.PI / 2
    this.cone.raycast = () => {}
    this.group.add(this.cone)
  }

  setEnabled(on: boolean): void {
    this.group.visible = on
  }

  /** Place the cone from Earth, pointing away from the Sun. */
  update(earth: { x: number; y: number; z: number }, length: number): void {
    if (!this.group.visible) return
    const dist = Math.hypot(earth.x, earth.y, earth.z) || 1
    const dirX = earth.x / dist
    const dirY = earth.y / dist
    const dirZ = earth.z / dist
    this.group.position.set(earth.x + dirX * length * 0.55, earth.y + dirY * length * 0.55, earth.z + dirZ * length * 0.55)
    this.group.lookAt(earth.x + dirX * 40, earth.y + dirY * 40, earth.z + dirZ * 40)
    this.cone.scale.set(1, length / 8, 1)
  }

  dispose(): void {
    this.cone.geometry.dispose()
    const mat = this.cone.material
    if (!Array.isArray(mat)) mat.dispose()
  }
}
