import { useState } from 'react'
import { displayName, getBody } from '../../astronomy/planetData'
import { bodyAtmosphere, bodyDescription, bodyFacts } from '../../i18n/bodies'
import { useLang, useT } from '../../i18n/useT'
import { formatAu, formatDays, formatHours, formatKm, formatNumberTr } from '../../utils/formatting'
import { AU_KM } from '../../astronomy/astronomyConstants'
import { useSimulationStore } from '../../store/simulationStore'
import { openCompare } from '../../features/planetExplorer/focus'

export function PlanetInfoCard() {
  const t = useT()
  const lang = useLang()
  const id = useSimulationStore((s) => s.selectedBodyId)
  const tabs = ['facts', 'discovery', 'compare'] as const
  const [tab, setTab] = useState<(typeof tabs)[number]>('facts')

  if (!id) return null
  const body = getBody(id)
  const name = displayName(body, lang)

  return (
    <aside className="info-card" aria-label={name}>
      <header className="panel-head">
        <div>
          <p className="eyebrow">{body.englishName}</p>
          <h2>{name}</h2>
        </div>
        <button type="button" className="icon-btn" onClick={() => useSimulationStore.getState().selectBody(null)} aria-label={t('close')}>
          ×
        </button>
      </header>
      <div className="tabs" role="tablist">
        {tabs.map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={tab === item}
            className={tab === item ? 'is-active' : ''}
            onClick={() => setTab(item)}
          >
            {t(item)}
          </button>
        ))}
      </div>
      {tab === 'facts' ? (
        <div>
          <p>{bodyDescription(body.id, lang)}</p>
          <ul className="stats">
            <li>
              <span>{t('distance')}</span>
              <strong>
                {body.orbitalRadiusAu > 0
                  ? `${formatAu(body.orbitalRadiusAu, lang)} (${formatKm(body.orbitalRadiusAu * AU_KM, lang)})`
                  : t('center')}
              </strong>
            </li>
            <li>
              <span>{t('diameter')}</span>
              <strong>{formatKm(body.radiusKm * 2, lang)}</strong>
            </li>
            <li>
              <span>{t('year')}</span>
              <strong>{body.orbitalPeriodDays > 0 ? formatDays(body.orbitalPeriodDays, lang) : '—'}</strong>
            </li>
            <li>
              <span>{t('day')}</span>
              <strong>{formatHours(body.rotationPeriodHours, lang)}</strong>
            </li>
            <li>
              <span>{t('moons')}</span>
              <strong>{formatNumberTr(body.moons, 0, lang)}</strong>
            </li>
            <li>
              <span>{t('temperature')}</span>
              <strong>{formatNumberTr(body.meanTempC, 0, lang)} °C</strong>
            </li>
            <li>
              <span>{lang === 'en' ? 'Atmosphere' : 'Atmosfer'}</span>
              <strong>{bodyAtmosphere(body.id, lang)}</strong>
            </li>
          </ul>
        </div>
      ) : null}
      {tab === 'discovery' ? (
        <ul className="facts">
          {bodyFacts(body.id, lang).map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      ) : null}
      {tab === 'compare' ? (
        <p>
          {name}
          <button type="button" className="btn" onClick={() => openCompare(id)}>
            {t('compare')}
          </button>
        </p>
      ) : null}
    </aside>
  )
}
