import type { ReactNode } from 'react'
import { getActivity } from '../../content/labActivities'
import { useLabStore } from '../../store/labStore'
import { Icon } from '../ui/Icon'

const STEPS = ['Tahmin', 'İzle', 'Neden'] as const

export function ActivityShell({ children }: { children: ReactNode }) {
  const id = useLabStore((s) => s.activityId)
  const step = useLabStore((s) => s.step)
  const setStep = useLabStore((s) => s.setStep)
  const complete = useLabStore((s) => s.completeActivity)
  const start = useLabStore((s) => s.startActivity)
  const reset = useLabStore((s) => s.resetActivityScene)
  const backToCatalog = () => {
    reset()
    useLabStore.setState({ activityId: null, step: 'predict', prediction: null })
  }

  if (!id) return null
  const activity = getActivity(id)
  const index = step === 'simulate' ? 1 : step === 'result' ? 2 : 3

  return (
    <section className="activity-hud" aria-label={activity.title}>
      <header className="panel-head">
        <div>
          <h2>{activity.title}</h2>
          <ol className="step-track">
            {STEPS.map((label, i) => (
              <li key={label} className={index === i + 1 ? 'is-on' : index > i + 1 ? 'is-done' : ''}>
                {i + 1} {label}
              </li>
            ))}
          </ol>
        </div>
        <button type="button" className="icon-btn" onClick={backToCatalog} aria-label="Etkinliklere dön">
          ×
        </button>
      </header>
      {step === 'simulate' ? <p className="question">{activity.question}</p> : null}
      {step === 'simulate' ? children : null}
      {step === 'result' ? (
        <div className="activity-stage">
          <p>
            <strong>{activity.resultTitle}</strong>
          </p>
          {children}
          <button type="button" className="btn primary" onClick={complete}>
            Nedenini gör
          </button>
        </div>
      ) : null}
      {step === 'explain' ? (
        <div className="activity-stage">
          <p>{activity.explain}</p>
          <div className="row-actions">
            <button type="button" className="btn primary" onClick={() => start(id)}>
              <Icon name="replay" />
              Yeniden izle
            </button>
            <button type="button" className="btn" onClick={backToCatalog}>
              <Icon name="back" />
              Etkinliklere dön
            </button>
            <button type="button" className="btn" onClick={() => setStep('result')}>
              <Icon name="check" />
              Sonuca dön
            </button>
          </div>
        </div>
      ) : null}
    </section>
  )
}
