import { useEffect, useRef } from 'react'
import { getBody } from '../../astronomy/planetData'
import type { BodyId } from '../../types/planet'

const DROP_BODIES = ['moon', 'earth', 'mars', 'jupiter'] as const

const GROUND: Record<(typeof DROP_BODIES)[number], { sky: string; floor: string; note: string }> = {
  moon: { sky: '#07070a', floor: '#9aa0a8', note: 'İnce toz, yavaş düşüş' },
  earth: { sky: '#17324d', floor: '#3d7a46', note: 'Güneş soldan gelir' },
  mars: { sky: '#2a140c', floor: '#b4532a', note: 'İnce hava, soğuk zemin' },
  jupiter: { sky: '#24180c', floor: '#c48a48', note: 'Katı yer yok, buluta batar' },
}

interface Props {
  mode: 'drop' | 'jump'
  running: boolean
  bodyId?: BodyId
  heightM?: number
  launchMs?: number
}

function drawBall(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string, light = -0.45) {
  const glow = ctx.createRadialGradient(x + radius * light, y - radius * 0.4, radius * 0.12, x, y, radius)
  glow.addColorStop(0, '#fff8e8')
  glow.addColorStop(0.28, color)
  glow.addColorStop(1, '#141414')
  ctx.fillStyle = glow
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fill()
}

export function PhysicsCanvas({ mode, running, bodyId = 'earth', heightM = 12, launchMs = 4.2 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let frame = 0
    let elapsed = 0
    let last = performance.now()

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      if (running) elapsed += dt
      const w = canvas.width
      const h = canvas.height

      if (mode === 'drop') {
        const colW = w / DROP_BODIES.length
        DROP_BODIES.forEach((id, index) => {
          const look = GROUND[id]
          const left = colW * index
          ctx.fillStyle = look.sky
          ctx.fillRect(left, 0, colW, h)
          if (id === 'earth') {
            const sun = ctx.createLinearGradient(left, 0, left + colW, 0)
            sun.addColorStop(0, 'rgba(255, 214, 140, 0.28)')
            sun.addColorStop(0.45, 'rgba(255, 214, 140, 0)')
            ctx.fillStyle = sun
            ctx.fillRect(left, 0, colW, h)
          }
          const g = getBody(id).gravityMs2
          const fallT = Math.sqrt((2 * heightM) / g)
          const t = Math.min(elapsed, fallT)
          const yM = 0.5 * g * t * t
          const grounded = t >= fallT - 0.001
          const px = left + colW / 2
          const py = 28 + (yM / heightM) * (h - 70)
          const shadow = 10 + (1 - yM / heightM) * 10
          ctx.fillStyle = 'rgba(0,0,0,0.35)'
          ctx.beginPath()
          ctx.ellipse(px, h - 22, shadow, 4, 0, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillStyle = look.floor
          if (id === 'jupiter') {
            ctx.globalAlpha = 0.7
            ctx.fillRect(left, h - 36, colW, 36)
            ctx.globalAlpha = 1
          } else {
            ctx.fillRect(left, h - 22, colW, 22)
          }
          const sink = id === 'jupiter' && grounded ? 16 : 0
          drawBall(ctx, px, py + sink, 13, getBody(id).color, id === 'earth' ? -0.55 : -0.35)
          if (grounded && id !== 'jupiter') {
            ctx.strokeStyle = 'rgba(255,220,160,0.45)'
            ctx.beginPath()
            ctx.arc(px, h - 24, 16 + (elapsed % 0.4) * 20, 0, Math.PI * 2)
            ctx.stroke()
          }
          ctx.fillStyle = '#f4f7ff'
          ctx.font = '600 13px Segoe UI'
          ctx.textAlign = 'center'
          ctx.fillText(getBody(id).name, px, 16)
          ctx.font = '11px Segoe UI'
          ctx.fillStyle = '#c5d4ee'
          ctx.fillText(look.note, px, h - 6)
        })
      } else {
        const look = bodyId === 'moon' || bodyId === 'mars' || bodyId === 'jupiter' ? GROUND[bodyId] : GROUND.earth
        ctx.fillStyle = look.sky
        ctx.fillRect(0, 0, w, h)
        ctx.fillStyle = look.floor
        ctx.fillRect(0, h - 22, w, 22)
        const g = getBody(bodyId).gravityMs2
        const v0 = launchMs
        const tPeak = v0 / g
        const hMax = (v0 * v0) / (2 * g)
        const t = elapsed % (tPeak * 2 + 0.4)
        const going = Math.min(t, tPeak * 2)
        const yM = Math.max(0, v0 * going - 0.5 * g * going * going)
        const py = h - 28 - (yM / Math.max(hMax, 0.2)) * (h - 70)
        drawBall(ctx, w / 2, py - 18, 12, '#e8eef8')
        ctx.fillStyle = '#f4f7ff'
        ctx.font = '600 13px Segoe UI'
        ctx.textAlign = 'left'
        ctx.fillText(`${getBody(bodyId).name} · g=${g.toFixed(1)}`, 12, 20)
      }
      frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frame)
  }, [mode, running, bodyId, heightM, launchMs])

  return <canvas ref={ref} className="physics-canvas" width={720} height={240} aria-hidden="true" />
}
