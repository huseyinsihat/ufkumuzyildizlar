import {
  CanvasTexture,
  CylinderGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  SphereGeometry,
} from 'three'
import { getBody } from '../astronomy/planetData'
import { fallTimeSeconds, jumpHeightMeters, earthRelativeWeight } from '../features/lab/gravityMath'
import type { BodyId } from '../types/planet'

const DROP_IDS = ['moon', 'earth', 'jupiter'] as const
const HEIGHT_M = 12
const LAUNCH = 4.2

function namePlate(text: string): Mesh {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.fillStyle = 'rgba(4, 10, 24, 0.82)'
    ctx.fillRect(0, 0, 256, 64)
    ctx.fillStyle = '#f8fafc'
    ctx.font = 'bold 28px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, 128, 32)
  }
  const mesh = new Mesh(
    new PlaneGeometry(2.6, 0.65),
    new MeshBasicMaterial({ map: new CanvasTexture(canvas), transparent: true, depthWrite: false }),
  )
  mesh.raycast = () => {}
  return mesh
}

export class SurfaceLab {
  readonly group: Group
  private balls: Mesh[] = []
  private jumper: Mesh
  private pole: Mesh
  private peak: Mesh
  private plates: Mesh[] = []
  private kids: Group[] = []
  private kidBodies: Mesh[] = []
  private grounds: Mesh[] = []
  private mode: 'off' | 'drop' | 'jump' | 'weight' = 'off'
  private elapsed = 0
  private jumpBody: BodyId = 'earth'
  private running = false
  private dropSignaled = false
  onDropDone: (() => void) | null = null

  constructor() {
    this.group = new Group()
    this.group.name = 'surface-lab'
    this.group.visible = false
    this.group.position.set(0, 18, 36)

    DROP_IDS.forEach((id, index) => {
      const body = getBody(id)
      const cloudy = id === 'jupiter'
      const globe = new Mesh(
        new SphereGeometry(1.35, 28, 20),
        new MeshStandardMaterial({ color: body.color, roughness: cloudy ? 0.55 : 0.7, transparent: cloudy, opacity: cloudy ? 0.92 : 1 }),
      )
      globe.position.set((index - 1) * 5.2, 0, 0)
      globe.userData.bodyId = id
      const ground = new Mesh(
        new CylinderGeometry(1.7, 1.7, cloudy ? 0.55 : 0.18, 24),
        new MeshStandardMaterial({
          color: cloudy ? '#c4a574' : '#1e293b',
          roughness: 0.9,
          transparent: cloudy,
          opacity: cloudy ? 0.42 : 1,
        }),
      )
      ground.position.set((index - 1) * 5.2, cloudy ? -1.6 : -1.45, 0)
      const ball = new Mesh(new SphereGeometry(0.28, 16, 12), new MeshStandardMaterial({ color: '#f8fafc', roughness: 0.35 }))
      ball.position.set((index - 1) * 5.2, 3.4, 0)
      const plate = namePlate(cloudy ? 'Jüpiter · katı yer yok' : body.name)
      plate.position.set((index - 1) * 5.2, -2.2, 0.8)
      const kid = new Group()
      const torso = new Mesh(
        new CylinderGeometry(0.22, 0.28, 0.7, 10),
        new MeshStandardMaterial({ color: '#fbbf24' }),
      )
      const head = new Mesh(new SphereGeometry(0.18, 12, 10), new MeshStandardMaterial({ color: '#fde68a' }))
      head.position.y = 0.52
      kid.add(torso, head)
      kid.position.set((index - 1) * 5.2, -0.85, 0.35)
      kid.visible = false
      this.plates.push(plate)
      this.balls.push(ball)
      this.grounds.push(ground)
      this.kids.push(kid)
      this.kidBodies.push(torso)
      this.group.add(globe, ground, ball, plate, kid)
    })

    this.jumper = new Mesh(
      new SphereGeometry(0.34, 16, 12),
      new MeshBasicMaterial({ color: '#fbbf24' }),
    )
    this.jumper.visible = false
    this.pole = new Mesh(
      new CylinderGeometry(0.05, 0.05, 4.2, 8),
      new MeshBasicMaterial({ color: '#94a3b8' }),
    )
    this.pole.position.set(1.8, 0.6, 0)
    this.pole.visible = false
    this.peak = new Mesh(new CylinderGeometry(0.28, 0.28, 0.08, 16), new MeshBasicMaterial({ color: '#22d3ee' }))
    this.peak.position.set(1.8, -1.1, 0)
    this.peak.visible = false
    this.kids.forEach((kid) => {
      kid.visible = false
    })
    this.group.add(this.jumper, this.pole, this.peak)
  }

  startDrop(): void {
    this.mode = 'drop'
    this.elapsed = 0
    this.running = false
    this.dropSignaled = false
    this.group.visible = true
    this.jumper.visible = false
    this.pole.visible = false
    this.peak.visible = false
    this.plates.forEach((plate) => {
      plate.visible = true
    })
    this.balls.forEach((ball, index) => {
      ball.visible = true
      ball.position.set((index - 1) * 5.2, 3.4, 0)
    })
    this.kids.forEach((kid) => {
      kid.visible = false
    })
  }

  startJump(bodyId: BodyId): void {
    this.mode = 'jump'
    this.jumpBody = bodyId
    this.elapsed = 0
    this.running = false
    this.group.visible = true
    this.jumper.visible = true
    this.pole.visible = true
    this.peak.visible = true
    this.plates.forEach((plate) => {
      plate.visible = false
    })
    this.balls.forEach((ball) => {
      ball.visible = false
    })
    this.kids.forEach((kid) => {
      kid.visible = false
    })
    this.jumper.position.set(0, -1.1, 0)
    this.placePeak()
  }

  startWeight(massKg: number): void {
    this.mode = 'weight'
    this.running = false
    this.group.visible = true
    this.jumper.visible = false
    this.pole.visible = false
    this.peak.visible = false
    this.balls.forEach((ball) => {
      ball.visible = false
    })
    this.plates.forEach((plate) => {
      plate.visible = true
    })
    this.kids.forEach((kid) => {
      kid.visible = true
    })
    this.setKidMass(massKg)
  }

  setKidMass(massKg: number): void {
    DROP_IDS.forEach((id, index) => {
      const vs = earthRelativeWeight(massKg, id).vsEarth
      const squash = 1 / Math.max(0.38, Math.min(2.4, vs * 0.72 + 0.28))
      const fat = 1 + Math.max(0, vs - 1) * 0.18
      this.kidBodies[index]?.scale.set(fat, squash, fat)
      this.kids[index]?.position.setY(-0.85 - (1 - squash) * 0.28)
    })
  }

  play(): void {
    this.elapsed = 0
    this.running = true
    this.dropSignaled = false
  }

  setJumpBody(id: BodyId): void {
    this.jumpBody = id
    if (this.mode === 'jump' && !this.running) this.jumper.position.set(0, -1.1, 0)
    if (this.mode === 'jump') this.placePeak()
  }

  stop(): void {
    this.mode = 'off'
    this.running = false
    this.group.visible = false
  }

  update(dt: number): void {
    if (this.mode === 'weight' || !this.running || this.mode === 'off') return
    this.elapsed += dt
    if (this.mode === 'drop') {
      let allDown = true
      DROP_IDS.forEach((id, index) => {
        const g = getBody(id).gravityMs2
        const fallT = fallTimeSeconds(HEIGHT_M, g)
        const t = Math.min(this.elapsed, fallT)
        const yM = 0.5 * g * t * t
        const y = 3.4 - (yM / HEIGHT_M) * 4.5
        this.balls[index]?.position.setY(Math.max(-1.1, y))
        if (this.elapsed < fallT) allDown = false
      })
      if (allDown && !this.dropSignaled) {
        this.dropSignaled = true
        this.running = false
        this.onDropDone?.()
      }
      return
    }
    const g = getBody(this.jumpBody).gravityMs2
    const h = jumpHeightMeters(LAUNCH, g)
    const tPeak = LAUNCH / g
    const t = this.elapsed
    const yM = t < tPeak * 2 ? LAUNCH * t - 0.5 * g * t * t : 0
    this.jumper.position.setY(-1.1 + (yM / Math.max(h, 0.2)) * Math.min(h, 6) * 0.55)
  }

  private placePeak(): void {
    const g = getBody(this.jumpBody).gravityMs2
    const h = jumpHeightMeters(LAUNCH, g)
    const y = -1.1 + (Math.min(h, 6) / 6) * 3.4
    this.peak.position.set(1.8, y, 0)
  }

  dispose(): void {
    this.group.traverse((child) => {
      if (child instanceof Mesh) {
        child.geometry.dispose()
        const material = child.material
        if (!Array.isArray(material)) {
          if ('map' in material && material.map) material.map.dispose()
          material.dispose()
        }
      }
    })
  }
}
