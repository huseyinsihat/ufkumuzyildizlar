import {
  CylinderGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  SphereGeometry,
} from 'three'
import { getBody } from '../astronomy/planetData'
import { fallTimeSeconds, jumpHeightMeters } from '../features/lab/gravityMath'
import type { BodyId } from '../types/planet'

const DROP_IDS = ['moon', 'earth', 'jupiter'] as const
const HEIGHT_M = 12
const LAUNCH = 4.2

export class SurfaceLab {
  readonly group: Group
  private balls: Mesh[] = []
  private jumper: Mesh
  private mode: 'off' | 'drop' | 'jump' = 'off'
  private elapsed = 0
  private jumpBody: BodyId = 'earth'
  private running = false

  constructor() {
    this.group = new Group()
    this.group.name = 'surface-lab'
    this.group.visible = false
    this.group.position.set(0, 18, 36)

    DROP_IDS.forEach((id, index) => {
      const body = getBody(id)
      const globe = new Mesh(
        new SphereGeometry(1.35, 28, 20),
        new MeshStandardMaterial({ color: body.color, roughness: 0.7 }),
      )
      globe.position.set((index - 1) * 5.2, 0, 0)
      globe.userData.bodyId = id
      const ground = new Mesh(
        new CylinderGeometry(1.7, 1.7, 0.18, 24),
        new MeshStandardMaterial({ color: '#1e293b', roughness: 0.9 }),
      )
      ground.position.set((index - 1) * 5.2, -1.45, 0)
      const ball = new Mesh(new SphereGeometry(0.28, 16, 12), new MeshStandardMaterial({ color: '#f8fafc', roughness: 0.35 }))
      ball.position.set((index - 1) * 5.2, 3.4, 0)
      this.balls.push(ball)
      this.group.add(globe, ground, ball)
    })

    this.jumper = new Mesh(
      new SphereGeometry(0.34, 16, 12),
      new MeshBasicMaterial({ color: '#fbbf24' }),
    )
    this.jumper.visible = false
    this.group.add(this.jumper)
  }

  startDrop(): void {
    this.mode = 'drop'
    this.elapsed = 0
    this.running = false
    this.group.visible = true
    this.jumper.visible = false
    this.balls.forEach((ball, index) => {
      ball.visible = true
      ball.position.set((index - 1) * 5.2, 3.4, 0)
    })
  }

  startJump(bodyId: BodyId): void {
    this.mode = 'jump'
    this.jumpBody = bodyId
    this.elapsed = 0
    this.running = false
    this.group.visible = true
    this.jumper.visible = true
    this.balls.forEach((ball) => {
      ball.visible = false
    })
    this.jumper.position.set(0, -1.1, 0)
  }

  play(): void {
    this.elapsed = 0
    this.running = true
  }

  setJumpBody(id: BodyId): void {
    this.jumpBody = id
    if (this.mode === 'jump' && !this.running) this.jumper.position.set(0, -1.1, 0)
  }

  stop(): void {
    this.mode = 'off'
    this.running = false
    this.group.visible = false
  }

  update(dt: number): void {
    if (!this.running || this.mode === 'off') return
    this.elapsed += dt
    if (this.mode === 'drop') {
      DROP_IDS.forEach((id, index) => {
        const g = getBody(id).gravityMs2
        const fallT = fallTimeSeconds(HEIGHT_M, g)
        const t = Math.min(this.elapsed, fallT)
        const yM = 0.5 * g * t * t
        const y = 3.4 - (yM / HEIGHT_M) * 4.5
        this.balls[index]?.position.setY(Math.max(-1.1, y))
      })
      return
    }
    const g = getBody(this.jumpBody).gravityMs2
    const h = jumpHeightMeters(LAUNCH, g)
    const tPeak = LAUNCH / g
    const t = this.elapsed
    const yM = t < tPeak * 2 ? LAUNCH * t - 0.5 * g * t * t : 0
    this.jumper.position.setY(-1.1 + (yM / Math.max(h, 0.2)) * Math.min(h, 6) * 0.55)
  }

  dispose(): void {
    this.group.traverse((child) => {
      if (child instanceof Mesh) {
        child.geometry.dispose()
        const material = child.material
        if (!Array.isArray(material)) material.dispose()
      }
    })
  }
}
