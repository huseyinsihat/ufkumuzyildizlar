import { useEffect, useRef, useState } from 'react'
import { L, tx } from '../../i18n/types'
import { useLang } from '../../i18n/useT'
import { getScene } from '../../scene/sceneApi'
import { ORBIT_MAX_POLAR, ORBIT_MIN_POLAR } from '../../scene/cameraOrbit'

const DRAG_SCALE = 0.008
const CLICK_PX = 5

const FACES: { id: string; label: ReturnType<typeof L>; theta: number | null; phi: number }[] = [
  { id: 'front', label: L('Ön', 'Front'), theta: 0, phi: Math.PI / 2 },
  { id: 'back', label: L('Arka', 'Back'), theta: Math.PI, phi: Math.PI / 2 },
  { id: 'right', label: L('Sağ', 'Right'), theta: Math.PI / 2, phi: Math.PI / 2 },
  { id: 'left', label: L('Sol', 'Left'), theta: -Math.PI / 2, phi: Math.PI / 2 },
  { id: 'top', label: L('Üst', 'Top'), theta: null, phi: ORBIT_MIN_POLAR },
  { id: 'bottom', label: L('Alt', 'Bottom'), theta: null, phi: ORBIT_MAX_POLAR },
]

export function ViewCube() {
  const lang = useLang()
  const host = useRef<HTMLDivElement>(null)
  const drag = useRef<{ x: number; y: number; moved: boolean } | null>(null)
  const [angles, setAngles] = useState({ yaw: 0, pitch: 18 })

  useEffect(() => {
    let frame = 0
    const tick = () => {
      const next = getScene()?.lookAngles()
      if (next) setAngles(next)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    event.preventDefault()
    event.stopPropagation()
    host.current?.setPointerCapture(event.pointerId)
    drag.current = { x: event.clientX, y: event.clientY, moved: false }
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const start = drag.current
    if (!start) return
    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    if (!start.moved && Math.hypot(dx, dy) < CLICK_PX) return
    start.moved = true
    start.x = event.clientX
    start.y = event.clientY
    getScene()?.orbitBy(-dx * DRAG_SCALE, dy * DRAG_SCALE)
  }

  function onPointerUp(event: React.PointerEvent<HTMLDivElement>) {
    const start = drag.current
    drag.current = null
    try {
      host.current?.releasePointerCapture(event.pointerId)
    } catch {
      // ignore
    }
    if (!start || start.moved) return
    const face = (event.target as HTMLElement).closest<HTMLElement>('[data-cube-face]')
    const id = face?.dataset.cubeFace
    const snap = FACES.find((item) => item.id === id)
    if (!snap) return
    getScene()?.snapOrbit(snap.theta, snap.phi)
  }

  return (
    <div
      ref={host}
      className="view-cube"
      role="application"
      aria-label="Bakışı döndür"
      title="Sürükle: bulunduğun yerden yıldızlara bak"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div className="view-cube-stage">
        <div className="view-cube-ring" aria-hidden="true" />
        <div
          className="view-cube-spin"
          style={{ transform: `rotateX(${-angles.pitch}deg) rotateY(${-angles.yaw}deg)` }}
        >
          {FACES.map((face) => (
            <button
              key={face.id}
              type="button"
              className={`view-cube-face is-${face.id}`}
              data-cube-face={face.id}
              tabIndex={-1}
              aria-label={tx(lang, face.label)}
            >
              {tx(lang, face.label)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
