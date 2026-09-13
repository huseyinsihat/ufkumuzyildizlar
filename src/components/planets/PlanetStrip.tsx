import { displayName, getBody } from '../../astronomy/planetData'
import { insightFor } from '../../content/insights'
import { bodyDescription } from '../../i18n/bodies'
import { loc } from '../../i18n/types'
import { useLang, useT } from '../../i18n/useT'
import { formatDays, formatHours, formatNumberTr } from '../../utils/formatting'
import { openCompare } from '../../features/planetExplorer/focus'
import { useSimulationStore } from '../../store/simulationStore'

export function PlanetStrip() {
  const t = useT()
  const lang = useLang()
  const id = useSimulationStore((s) => s.selectedBodyId)
  if (!id) return null
  const body = getBody(id)
  const tip = insightFor([id])
  const name = displayName(body, lang)

  return (
    <aside className="planet-strip" aria-label={`${name}`}>
      <div>
        <p className="eyebrow">{body.englishName}</p>
        <h2>{name}</h2>
        <p>{bodyDescription(body.id, lang)}</p>
        <p className="insight compact">{loc(lang, tip.text)}</p>
      </div>
      <div className="strip-stats">
        <div>
          <span>{t('day')}</span>
          <strong>{formatHours(body.rotationPeriodHours, lang)}</strong>
        </div>
        <div>
          <span>{t('year')}</span>
          <strong>{body.orbitalPeriodDays > 0 ? formatDays(body.orbitalPeriodDays, lang) : '—'}</strong>
        </div>
        <div>
          <span>{t('moons')}</span>
          <strong>{formatNumberTr(body.moons, 0, lang)}</strong>
        </div>
      </div>
      <div className="row-actions">
        <button type="button" className="btn" onClick={() => openCompare(id)}>
          {t('compare')}
        </button>
        <button type="button" className="icon-btn" onClick={() => useSimulationStore.getState().selectBody(null)} aria-label={t('close')}>
          ×
        </button>
      </div>
    </aside>
  )
}
