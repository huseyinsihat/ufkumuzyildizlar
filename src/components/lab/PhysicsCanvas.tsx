import { useEffect, useRef } from 'react'
import { getBody } from '../../astronomy/planetData'
import type { BodyId } from '../../types/planet'

const DROP_BODIES: BodyId[] = ['moon', 'earth', 'mars', 'jupiter']

interface Props {
  mode: 'drop' | 'jump'
  running: boolean
  bodyId?: BodyId
  heightM?: number
  launchMs?: number
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
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#07101f'
      ctx.fillRect(0, 0, w, h)
      ctx.fillStyle = '#1b2a44'
      ctx.fillRect(0, h - 18, w, 18)
      ctx.font = '12px Segoe UI'

      if (mode === 'drop') {
        const colW = w / DROP_BODIES.length
        DROP_BODIES.forEach((id, index) => {
          const g = getBody(id).gravityMs2
          const t = Math.min(elapsed, Math.sqrt((2 * heightM) / g))
          const yM = 0.5 * g * t * t
          const px = colW * index + colW / 2
          const py = 24 + (yM / heightM) * (h - 56)
          ctx.fillStyle = getBody(id).color
          ctx.beginPath()
          ctx.arc(px, py, 11, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillStyle = '#d7e6ff'
          ctx.textAlign = 'center'
          ctx.fillText(getBody(id).name, px, h - 4)
        })
      } else {
        const g = getBody(bodyId).gravityMs2
        const v0 = launchMs
        const tPeak = v0 / g
        const hMax = (v0 * v0) / (2 * g)
        const t = elapsed % (tPeak * 2 + 0.4)
        const going = Math.min(t, tPeak * 2)
        const yM = Math.max(0, v0 * going - 0.5 * g * going * going)
        const py = h - 28 - (yM / Math.max(hMax, 0.2)) * (h - 70)
        ctx.fillStyle = '#7ee0ff'
        ctx.fillRect(w / 2 - 10, py - 28, 20, 28)
        ctx.fillStyle = '#f6e05e'
        ctx.beginPath()
        ctx.arc(w / 2, py - 34, 8, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#d7e6ff'
        ctx.textAlign = 'left'
        ctx.fillText(`${getBody(bodyId).name}  g=${g.toFixed(1)}`, 12, 18)
      }
      frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frame)
  }, [mode, running, bodyId, heightM, launchMs])

  return <canvas ref={ref} className="physics-canvas" width={640} height={220} aria-hidden="true" />
}
