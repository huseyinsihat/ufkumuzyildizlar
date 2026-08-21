import type { ReactNode } from 'react'
import { getActivity } from '../../content/labActivities'
import { TEAM } from '../../content/team'
import { useLabStore } from '../../store/labStore'

export function ActivityShell({ children }: { children: ReactNode }) {
  const id = useLabStore((s) => s.activityId)
  const step = useLabStore((s) => s.step)
  const setStep = useLabStore((s) => s.setStep)
  const complete = useLabStore((s) => s.completeActivity)
  const start = useLabStore((s) => s.startActivity)
  const reset = useLabStore((s) => s.resetActivityScene)
  const setActivityNone = () => useLabStore.setState({ activityId: null, step: 'predict', prediction: null })

  if (!id) return null
  const activity = getActivity(id)
  const index = step === 'simulate' ? 1 : step === 'result' ? 2 : 3

  return (
    <section className="activity-hud" aria-label={activity.title}>
      <header className="panel-head">
        <div>
          <p className="eyebrow">{TEAM.home}</p>
          <h2>{activity.title}</h2>
          <p className="step-dots" aria-hidden="true">
            <i className={index >= 1 ? 'is-on' : ''} />
            <i className={index >= 2 ? 'is-on' : ''} />
            <i className={index >= 3 ? 'is-on' : ''} />
            <span>{index === 1 ? '1 Tahmin' : index === 2 ? '2 İzle' : '3 Neden'}</span>
          </p>
        </div>
        <button
          type="button"
          className="icon-btn"
          aria-label="Kataloga dön"
          onClick={() => {
            reset()
            setActivityNone()
          }}
        >
          ×
        </button>
      </header>
      <p className="question">{activity.question}</p>
      {step === 'simulate' ? children : null}
      {step === 'result' ? (
        <div>
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
        <div>
          <p>{activity.explain}</p>
          <div className="row-actions">
            <button type="button" className="btn primary" onClick={() => start(id)}>
              Yeniden izle
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                reset()
                setActivityNone()
              }}
            >
              Etkinliklere dön
            </button>
            <button type="button" className="btn" onClick={() => setStep('result')}>
              Sonuca dön
            </button>
          </div>
        </div>
      ) : null}
    </section>
  )
}
