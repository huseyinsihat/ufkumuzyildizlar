import { useEffect, type ReactNode } from 'react'
import { BADGES } from '../../content/missions'
import { TEAM } from '../../content/team'
import { getActivity } from '../../content/labActivities'
import { useEducationStore } from '../../store/educationStore'
import { useLabStore } from '../../store/labStore'
import { useVoiceStore } from '../../store/voiceStore'
import { speak } from '../../utils/speech'
import { Icon } from '../ui/Icon'

const STEPS = ['Tahmin', 'İzle', 'Neden'] as const

export function ActivityShell({ children }: { children: ReactNode }) {
  const id = useLabStore((s) => s.activityId)
  const step = useLabStore((s) => s.step)
  const complete = useLabStore((s) => s.completeActivity)
  const start = useLabStore((s) => s.startActivity)
  const reset = useLabStore((s) => s.resetActivityScene)
  const setPrediction = useLabStore((s) => s.setPrediction)
  const lastBadge = useEducationStore((s) => s.lastBadge)
  const guide = TEAM.members[0]?.name ?? TEAM.teamName
  const activity = id ? getActivity(id) : null

  useEffect(() => {
    if (step === 'explain' && activity && useVoiceStore.getState().enabled) speak(activity.explain)
  }, [step, activity])

  const backToCatalog = () => {
    reset()
    useLabStore.setState({ activityId: null, step: 'predict', prediction: null })
    useVoiceStore.getState().play('lab-done')
  }

  if (!id || !activity) return null
  const index = step === 'predict' ? 1 : step === 'simulate' ? 2 : 3
  const badge = BADGES.find((item) => item.id === lastBadge)

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
      <p className="guide-bubble">
        <strong>{guide}:</strong> {step === 'explain' ? activity.explain : activity.question}
      </p>
      {badge ? <p className="badge-toast">Rozet: {badge.name}</p> : null}
      {step === 'predict' && activity.choices ? (
        <div className="choice-row">
          {activity.choices.map((choice) => (
            <button key={choice.id} type="button" className="chip" onClick={() => setPrediction(choice.id)}>
              {choice.label}
            </button>
          ))}
        </div>
      ) : null}
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
          <div className="row-actions">
            <button type="button" className="btn primary" onClick={() => start(id)}>
              <Icon name="replay" />
              Yeniden
            </button>
            <button type="button" className="btn" onClick={backToCatalog}>
              <Icon name="back" />
              Etkinliklere dön
            </button>
          </div>
        </div>
      ) : null}
    </section>
  )
}
