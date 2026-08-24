import { useMemo } from 'react'
import { BODIES } from '../../astronomy/planetData'
import { kidCompare } from '../../features/lab/kidCompare'
import { insightFor } from '../../content/insights'
import { createBodyPortraitUrl } from '../../scene/proceduralTextures'
import { Icon, type IconName } from '../ui/Icon'
import { useSimulationStore } from '../../store/simulationStore'
import { useUiStore } from '../../store/uiStore'
import type { BodyCategory, BodyId, PlanetDefinition } from '../../types/planet'

const KIND: Record<BodyCategory, string> = {
  star: 'Yıldız',
  terrestrial: 'Kaya gezegen',
  gasGiant: 'Gaz devi',
  iceGiant: 'Buz devi',
  dwarf: 'Cüce gezegen',
  moon: 'Uydu',
}

const ROW_ICONS: Record<string, IconName> = {
  Çap: 'ruler',
  'Bir yıl': 'orbit',
  Yerçekimi: 'weight',
  Sıcaklık: 'thermo',
}

function PlanetOrb({ body }: { body: PlanetDefinition }) {
  const url = useMemo(() => createBodyPortraitUrl(body.id, body.color), [body.id, body.color])
  return (
    <span className={`compare-orb-wrap${body.hasRings ? ' has-rings' : ''}${body.id === 'sun' ? ' is-sun' : ''}`}>
      {body.hasRings ? <i className="compare-ring" aria-hidden="true" /> : null}
      {url ? (
        <img className="compare-orb" src={url} alt={body.name} width={72} height={72} />
      ) : (
        <span className="compare-orb" role="img" aria-label={body.name} style={{ backgroundColor: body.color }} />
      )}
    </span>
  )
}

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
  return (
    <label className={`compare-pick-card is-${tone}`}>
      <PlanetOrb body={body} />
      <select value={value} onChange={(event) => onChange(event.target.value as BodyId)} aria-label={tone === 'a' ? 'Birinci gök cismi' : 'İkinci gök cismi'}>
        {BODIES.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <span className="compare-kind">{KIND[body.category]}</span>
    </label>
  )
}

export function ComparePanel() {
  const a = useSimulationStore((s) => s.compareA)
  const b = useSimulationStore((s) => s.compareB)
  const setCompare = useSimulationStore((s) => s.setCompare)
  const rows = kidCompare(a, b)
  const close = () => useUiStore.getState().setActivePanel('none')
  const bodyA = BODIES.find((item) => item.id === a)
  const bodyB = BODIES.find((item) => item.id === b)
  const tip = insightFor([a, b])
  if (!bodyA || !bodyB) return null

  return (
    <aside className="hud-sheet compare-sheet" aria-label="Karşılaştırma">
      <header className="panel-head">
        <h2>Karşılaştır</h2>
        <button type="button" className="icon-btn" onClick={close} aria-label="Kapat">
          ×
        </button>
      </header>
      <div className="compare-heroes">
        <PickCard body={bodyA} value={a} tone="a" onChange={(id) => setCompare(id, b)} />
        <p className="compare-vs" aria-hidden="true">
          karşı
        </p>
        <PickCard body={bodyB} value={b} tone="b" onChange={(id) => setCompare(a, id)} />
      </div>
      <div className="compare-table" role="table" aria-label="Karşılaştırma tablosu">
        <div className="compare-tr is-head" role="row">
          <span role="columnheader" className="compare-metric">
            Özellik
          </span>
          <span role="columnheader" className="is-a">
            {bodyA.name}
          </span>
          <span role="columnheader" className="is-b">
            {bodyB.name}
          </span>
        </div>
        {rows.map((row) => {
          const leadA = row.aValue > row.bValue * 1.08
          const leadB = row.bValue > row.aValue * 1.08
          return (
            <div key={row.label} className="compare-tr" role="row">
              <span role="rowheader" className="compare-metric">
                <Icon name={ROW_ICONS[row.label] ?? 'spark'} />
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
        <span>{tip.text}</span>
      </p>
    </aside>
  )
}
