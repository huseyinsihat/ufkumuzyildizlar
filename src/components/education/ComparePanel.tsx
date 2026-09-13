import { useMemo } from 'react'
import { bodiesInFamilyOrder, compareOptionLabel, displayName, getBody } from '../../astronomy/planetData'
import { kidCompare } from '../../features/lab/kidCompare'
import { insightFor } from '../../content/insights'
import { bodyKindLabel } from '../../i18n/bodyKind'
import { loc } from '../../i18n/types'
import { useLang, useT } from '../../i18n/useT'
import { createBodyPortraitUrl } from '../../scene/proceduralTextures'
import { Icon, type IconName } from '../ui/Icon'
import { useSimulationStore } from '../../store/simulationStore'
import { useUiStore } from '../../store/uiStore'
import type { BodyId, PlanetDefinition } from '../../types/planet'

const ROW_ICONS: Record<'size' | 'year' | 'gravity' | 'heat', IconName> = {
  size: 'ruler',
  year: 'orbit',
  gravity: 'weight',
  heat: 'thermo',
}

function PlanetOrb({ body, name }: { body: PlanetDefinition; name: string }) {
  const url = useMemo(() => createBodyPortraitUrl(body.id, body.color), [body.id, body.color])
  return (
    <span className={`compare-orb-wrap${body.hasRings ? ' has-rings' : ''}${body.id === 'sun' ? ' is-sun' : ''}`}>
      {body.hasRings ? <i className="compare-ring" aria-hidden="true" /> : null}
      {url ? (
        <img className="compare-orb" src={url} alt={name} width={72} height={72} />
      ) : (
        <span className="compare-orb" role="img" aria-label={name} style={{ backgroundColor: body.color }} />
      )}
    </span>
  )
}

const COMPARE_OPTIONS = bodiesInFamilyOrder()

function PickCard({
  body,
  value,
  tone,
  onChange,
}: {
  body: PlanetDefinition
  value: BodyId
  tone: 'a' | 'b'
  onChange: (id: BodyId) => void
}) {
  const t = useT()
  const lang = useLang()
  const name = displayName(body, lang)
  return (
    <label className={`compare-pick-card is-${tone}`}>
      <PlanetOrb body={body} name={name} />
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as BodyId)}
        aria-label={tone === 'a' ? t('firstBody') : t('secondBody')}
      >
        {COMPARE_OPTIONS.map((item) => (
          <option key={item.id} value={item.id}>
            {compareOptionLabel(item, lang)}
          </option>
        ))}
      </select>
      <span className="compare-kind">{bodyKindLabel(body.category, lang)}</span>
    </label>
  )
}

export function ComparePanel() {
  const t = useT()
  const lang = useLang()
  const a = useSimulationStore((s) => s.compareA)
  const b = useSimulationStore((s) => s.compareB)
  const setCompare = useSimulationStore((s) => s.setCompare)
  const rows = kidCompare(a, b, lang)
  const close = () => useUiStore.getState().setActivePanel('none')
  const bodyA = getBody(a)
  const bodyB = getBody(b)
  const tip = insightFor([a, b])

  return (
    <aside className="hud-sheet compare-sheet" aria-label={t('comparison')}>
      <header className="panel-head">
        <h2>{t('compare')}</h2>
        <button type="button" className="icon-btn" onClick={close} aria-label={t('close')}>
          ×
        </button>
      </header>
      <div className="compare-heroes">
        <PickCard body={bodyA} value={a} tone="a" onChange={(id) => setCompare(id, b)} />
        <p className="compare-vs" aria-hidden="true">
          {lang === 'en' ? 'vs' : 'karşı'}
        </p>
        <PickCard body={bodyB} value={b} tone="b" onChange={(id) => setCompare(a, id)} />
      </div>
      <div className="compare-table" role="table" aria-label={t('comparison')}>
        <div className="compare-tr is-head" role="row">
          <span role="columnheader" className="compare-metric">
            {t('trait')}
          </span>
          <span role="columnheader" className="is-a">
            {displayName(bodyA, lang)}
          </span>
          <span role="columnheader" className="is-b">
            {displayName(bodyB, lang)}
          </span>
        </div>
        {rows.map((row) => {
          const leadA = row.aValue > row.bValue * 1.08
          const leadB = row.bValue > row.aValue * 1.08
          return (
            <div key={row.id} className="compare-tr" role="row">
              <span role="rowheader" className="compare-metric">
                <Icon name={ROW_ICONS[row.id] ?? 'spark'} />
                {row.label}
              </span>
              <span role="cell" className={`is-a${leadA ? ' is-lead' : ''}`}>
                {row.aText}
              </span>
              <span role="cell" className={`is-b${leadB ? ' is-lead' : ''}`}>
                {row.bText}
              </span>
            </div>
          )
        })}
      </div>
      <p className="insight compact">
        <Icon name="spark" />
        <span>{loc(lang, tip.text)}</span>
      </p>
    </aside>
  )
}
