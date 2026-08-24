import { AdditiveBlending, Group, Mesh, MeshBasicMaterial, SphereGeometry, Vector3 } from 'three'

export class HeatAura {
  readonly group = new Group()
  private mercury: Mesh
  private venus: Mesh
  private earth: Mesh
  private blanket: Mesh
  enabled = false
  blanketOn = true

  constructor() {
    this.mercury = this.orb('#f6ad55', 1.6)
    this.venus = this.orb('#fb7185', 2.6)
    this.earth = this.orb('#7dd3fc', 1.15)
    this.blanket = new Mesh(
      new SphereGeometry(1, 24, 18),
      new MeshBasicMaterial({
        color: '#fbd38d',
        transparent: true,
        opacity: 0.22,
        depthWrite: false,
      }),
    )
    this.blanket.raycast = () => {}
    this.group.add(this.mercury)
    this.group.add(this.venus)
    this.group.add(this.earth)
    this.group.add(this.blanket)
    this.group.visible = false
  }

  private orb(color: string, scale: number): Mesh {
    const mesh = new Mesh(
      new SphereGeometry(1, 20, 16),
      new MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.32,
        blending: AdditiveBlending,
        depthWrite: false,
      }),
    )
    mesh.scale.setScalar(scale)
    mesh.raycast = () => {}
    return mesh
  }

  setEnabled(on: boolean): void {
    this.enabled = on
    this.group.visible = on
  }

  setBlanket(on: boolean): void {
    this.blanketOn = on
    this.blanket.visible = on
    const mat = this.venus.material
    if (!Array.isArray(mat)) mat.opacity = on ? 0.4 : 0.12
    this.venus.scale.setScalar(on ? 2.7 : 1.4)
  }

  update(
    mercury: Vector3,
    venus: Vector3,
    earth: Vector3,
    mercuryR: number,
    venusR: number,
    earthR: number,
  ): void {
    if (!this.enabled) return
    this.mercury.position.copy(mercury)
    this.venus.position.copy(venus)
    this.earth.position.copy(earth)
    this.blanket.position.copy(venus)
    this.mercury.scale.setScalar(mercuryR * 2.1)
    this.venus.scale.setScalar(venusR * (this.blanketOn ? 2.8 : 1.5))
    this.earth.scale.setScalar(earthR * 1.7)
    this.blanket.scale.setScalar(venusR * 1.55)
  }

  dispose(): void {
    for (const mesh of [this.mercury, this.venus, this.earth, this.blanket]) {
      mesh.geometry.dispose()
      const mat = mesh.material
      if (!Array.isArray(mat)) mat.dispose()
    }
  }
}
