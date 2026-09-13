import { useEffect, type ReactNode } from 'react'
import { BADGES } from '../../content/missions'
import { getActivity } from '../../content/labActivities'
import { loc, type AppLang } from '../../i18n/types'
import { useLang, useT } from '../../i18n/useT'
import { useEducationStore } from '../../store/educationStore'
import { useLabStore } from '../../store/labStore'
import { useVoiceStore } from '../../store/voiceStore'
import { speak } from '../../utils/speech'
import { Icon } from '../ui/Icon'
import type { LabActivity, LabStep } from '../../types/lab'

function bubbleText(activity: LabActivity, step: LabStep, lang: AppLang): string {
  if (step === 'explain') return loc(lang, activity.explain)
  if (step === 'result') return loc(lang, activity.resultTitle)
  if (step === 'simulate') return loc(lang, activity.watchHint)
  return loc(lang, activity.question)
}

export function ActivityShell({ children }: { children: ReactNode }) {
  const t = useT()
  const lang = useLang()
  const id = useLabStore((s) => s.activityId)
  const step = useLabStore((s) => s.step)
  const complete = useLabStore((s) => s.completeActivity)
  const start = useLabStore((s) => s.startActivity)
  const reset = useLabStore((s) => s.resetActivityScene)
  const setPrediction = useLabStore((s) => s.setPrediction)
  const lastBadge = useEducationStore((s) => s.lastBadge)
  const activity = id ? getActivity(id) : null
  const steps = [t('predict'), t('watch'), t('result'), t('why')] as const

  useEffect(() => {
    if (step === 'explain' && activity && useVoiceStore.getState().enabled) {
      speak(loc(lang, activity.explain), lang)
    }
  }, [step, activity, lang])

  const backToCatalog = () => {
    reset()
    useLabStore.setState({ activityId: null, step: 'predict', prediction: null })
    useVoiceStore.getState().play('lab-done')
  }

  if (!id || !activity) return null
  const index = step === 'predict' ? 1 : step === 'simulate' ? 2 : step === 'result' ? 3 : 4
  const badge = BADGES.find((item) => item.id === lastBadge)
  const title = loc(lang, activity.title)

  return (
    <section className={`activity-hud activity-hud--${activity.id}`} aria-label={title}>
      <header className="panel-head">
        <div>
          <h2>{title}</h2>
          <ol className="step-track">
            {steps.map((label, i) => (
              <li key={label} className={index === i + 1 ? 'is-on' : index > i + 1 ? 'is-done' : ''}>
                {i + 1} {label}
              </li>
            ))}
          </ol>
        </div>
        <button type="button" className="icon-btn" onClick={backToCatalog} aria-label={t('backToLab')}>
          ×
        </button>
      </header>
      <p className="guide-bubble">{bubbleText(activity, step, lang)}</p>
      {badge ? (
        <p className="badge-toast">
          {t('badge')}: {loc(lang, badge.name)}
        </p>
      ) : null}
      {step === 'predict' && activity.choices ? (
        <div className="choice-row">
          {activity.choices.map((choice) => (
            <button key={choice.id} type="button" className="chip" onClick={() => setPrediction(choice.id)}>
              {loc(lang, choice.label)}
            </button>
          ))}
        </div>
      ) : null}
      {step === 'simulate' ? children : null}
      {step === 'result' ? (
        <div className="activity-stage">
          {children}
          <button type="button" className="btn primary" onClick={complete}>
            {t('seeWhy')}
          </button>
        </div>
      ) : null}
      {step === 'explain' ? (
        <div className="activity-stage">
          <div className="row-actions">
            <button type="button" className="btn primary" onClick={() => start(id)}>
              <Icon name="replay" />
              {t('again')}
            </button>
            <button type="button" className="btn" onClick={backToCatalog}>
              <Icon name="back" />
              {t('backToLab')}
            </button>
          </div>
        </div>
      ) : null}
    </section>
  )
}
