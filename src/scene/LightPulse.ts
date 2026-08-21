import {
  AdditiveBlending,
  Group,
  Mesh,
  MeshBasicMaterial,
  SphereGeometry,
  Vector3,
} from 'three'

export class LightPulse {
  readonly group = new Group()
  private ball: Mesh
  private from = new Vector3()
  private to = new Vector3()
  private t = 0
  private duration = 6.4
  active = false
  arrived = false
  progress = 0
  realSeconds = 499
  onArrive: (() => void) | null = null

  constructor() {
    this.ball = new Mesh(
      new SphereGeometry(0.55, 16, 12),
      new MeshBasicMaterial({
        color: '#ffe27a',
        transparent: true,
        opacity: 0.95,
        blending: AdditiveBlending,
        depthWrite: false,
      }),
    )
    this.ball.raycast = () => {}
    this.group.add(this.ball)
    this.group.visible = false
  }

  start(from: Vector3, to: Vector3, realSeconds: number, duration = 6.4): void {
    this.from.copy(from)
    this.to.copy(to)
    this.realSeconds = realSeconds
    this.duration = duration
    this.t = 0
    this.progress = 0
    this.active = true
    this.arrived = false
    this.group.visible = true
    this.ball.position.copy(from)
  }

  update(dt: number): void {
    if (!this.active) return
    this.t = Math.min(this.duration, this.t + dt)
    this.progress = this.t / this.duration
    this.ball.position.lerpVectors(this.from, this.to, this.progress)
    const scale = 0.7 + this.progress * 0.6
    this.ball.scale.setScalar(scale)
    if (this.progress >= 1 && !this.arrived) {
      this.arrived = true
      this.active = false
      this.onArrive?.()
    }
  }

  stop(): void {
    this.active = false
    this.arrived = false
    this.progress = 0
    this.group.visible = false
  }

  dispose(): void {
    this.ball.geometry.dispose()
    const mat = this.ball.material
    if (!Array.isArray(mat)) mat.dispose()
  }
}
