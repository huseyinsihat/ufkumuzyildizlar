import { BODIES } from '../../astronomy/planetData'
import { kidCompare, massInKidWords } from '../../features/lab/kidCompare'
import { insightFor } from '../../content/insights'
import { Icon, type IconName } from '../ui/Icon'
import { useSimulationStore } from '../../store/simulationStore'
import { useUiStore } from '../../store/uiStore'
import type { BodyId } from '../../types/planet'

const ROW_ICONS: Record<string, IconName> = {
  Çap: 'ruler',
  'Bir yıl': 'clock',
  Yerçekimi: 'weight',
  Sıcaklık: 'thermo',
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
  const maxOf = (row: (typeof rows)[number]) => Math.max(row.aValue, row.bValue, 0.01)

  return (
    <aside className="hud-sheet compare-sheet" aria-label="Karşılaştırma">
      <header className="panel-head">
        <h2>Karşılaştır</h2>
        <button type="button" className="icon-btn" onClick={close} aria-label="Kapat">
          ×
        </button>
      </header>
      <div className="compare-pick">
        <label>
          <span className="swatch" style={{ background: bodyA?.color }} />
          Birinci
          <select value={a} onChange={(e) => setCompare(e.target.value as BodyId, b)}>
            {BODIES.map((body) => (
              <option key={body.id} value={body.id}>
                {body.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="swatch" style={{ background: bodyB?.color }} />
          İkinci
          <select value={b} onChange={(e) => setCompare(a, e.target.value as BodyId)}>
            {BODIES.map((body) => (
              <option key={body.id} value={body.id}>
                {body.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="muted">
        {bodyA?.name}: {massInKidWords(a)} · {bodyB?.name}: {massInKidWords(b)}
      </p>
      <div className="bar-list">
        {rows.map((row) => {
          const max = maxOf(row)
          return (
            <div key={row.label} className="bar-row">
              <p className="bar-label">
                <Icon name={ROW_ICONS[row.label] ?? 'spark'} />
                {row.label}
              </p>
              <div className="bar-pair">
                <div className="bar-line">
                  <div className="bar-track">
                    <i style={{ width: `${Math.max(6, (row.aValue / max) * 100)}%` }} />
                  </div>
                  <em>{row.aText}</em>
                </div>
                <div className="bar-line">
                  <div className="bar-track">
                    <i className="b" style={{ width: `${Math.max(6, (row.bValue / max) * 100)}%` }} />
                  </div>
                  <em>{row.bText}</em>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <p className="compare-hint">Sıcaklık çubuğu: daha uzun = daha sıcak.</p>
      <p className="insight">
        <Icon name="spark" />
        <span>{tip.text}</span>
      </p>
    </aside>
  )
}
