import { useEffect } from 'react'
import { DEMO_STEPS } from '../../content/team'
import { runDemoAction } from '../../features/planetExplorer/focus'
import { loc } from '../../i18n/types'
import { useLang, useT } from '../../i18n/useT'
import { useUiStore } from '../../store/uiStore'

export function DemoTour() {
  const t = useT()
  const lang = useLang()
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
        <p>{t('tourDone')}</p>
        <button type="button" className="btn" onClick={stop}>
          {t('close')}
        </button>
      </div>
    )
  }

  return (
    <div className="demo-card" role="dialog" aria-label={t('shortTour')}>
      <p className="eyebrow">
        {t('stepOf')} {step + 1} / {DEMO_STEPS.length}
      </p>
      <h3>{loc(lang, current.title)}</h3>
      <p>{loc(lang, current.body)}</p>
      <div className="row-actions">
        <button type="button" className="btn primary" onClick={next}>
          {t('next')}
        </button>
        <button type="button" className="btn" onClick={stop}>
          {t('finish')}
        </button>
      </div>
    </div>
  )
}
