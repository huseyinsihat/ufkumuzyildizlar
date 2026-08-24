import { useEffect } from 'react'
import { DEMO_STEPS } from '../../content/team'
import { runDemoAction } from '../../features/planetExplorer/focus'
import { useUiStore } from '../../store/uiStore'

export function DemoTour() {
  const step = useUiStore((s) => s.demoStep)
  const next = useUiStore((s) => s.nextDemoStep)
  const stop = useUiStore((s) => s.stopDemo)
  const current = DEMO_STEPS[step]

  useEffect(() => {
    runDemoAction(step)
  }, [step])

  if (!current) {
    return (
      <div className="demo-card" role="status">
        <p>Kısa tur bitti. Şimdi sen keşfet.</p>
        <button type="button" className="btn" onClick={stop}>
          Kapat
        </button>
      </div>
    )
  }

  return (
    <div className="demo-card" role="dialog" aria-label="Kısa tur">
      <p className="eyebrow">
        Adım {step + 1} / {DEMO_STEPS.length}
      </p>
      <h3>{current.title}</h3>
      <p>{current.body}</p>
      <div className="row-actions">
        <button type="button" className="btn primary" onClick={next}>
          İleri
        </button>
        <button type="button" className="btn" onClick={stop}>
          Bitir
        </button>
      </div>
    </div>
  )
}
