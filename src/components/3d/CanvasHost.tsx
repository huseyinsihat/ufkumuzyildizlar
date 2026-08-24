import { useEffect, useRef } from 'react'
import { SolarSystemScene } from '../../scene/SolarSystemScene'

export function CanvasHost() {
  const hostRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return

    const scene = new SolarSystemScene(canvas, host)
    scene.start()

    const onResize = () => scene.resize()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      scene.dispose()
    }
  }, [])

  return (
    <div className="canvas-host" ref={hostRef}>
      <canvas ref={canvasRef} className="space-canvas" aria-label="3B Güneş Sistemi görünümü" />
    </div>
  )
}
