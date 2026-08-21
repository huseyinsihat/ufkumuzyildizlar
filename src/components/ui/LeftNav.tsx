import { getBody } from '../../astronomy/planetData'
import { findWonder } from '../../content/skyWonders'
import { formatDays, formatHours, formatNumberTr } from '../../utils/formatting'
import { useSimulationStore } from '../../store/simulationStore'
import { useUiStore } from '../../store/uiStore'

export function InspectRail() {
  const leftOpen = useUiStore((s) => s.leftOpen)
  const bodyId = useSimulationStore((s) => s.selectedBodyId)
  const wonderId = useSimulationStore((s) => s.selectedWonderId)

  if (!leftOpen) return null

  const body = bodyId ? getBody(bodyId) : null
  const wonder = findWonder(wonderId)
  if (!body && !wonder) return null

  return (
    <aside className="inspect-rail" aria-label="Seçim">
      {body ? (
        <div className="inspect-card">
          <header className="panel-head">
            <div>
              <p className="eyebrow">
                <i className="body-swatch" style={{ background: body.color }} aria-hidden="true" />
                {body.englishName}
              </p>
              <h2>{body.name}</h2>
            </div>
            <button type="button" className="icon-btn" onClick={() => useSimulationStore.getState().selectBody(null)} aria-label="Kapat">
              ×
            </button>
          </header>
          <p>{body.facts[0] ?? body.description}</p>
          <div className="strip-stats">
            <div>
              <span>Gün</span>
              <strong>{formatHours(body.rotationPeriodHours)}</strong>
            </div>
            <div>
              <span>Yıl</span>
              <strong>{body.orbitalPeriodDays > 0 ? formatDays(body.orbitalPeriodDays) : '—'}</strong>
            </div>
            <div>
              <span>Uydu</span>
              <strong>{formatNumberTr(body.moons)}</strong>
            </div>
          </div>
        </div>
      ) : null}
      {!body && wonder ? (
        <div className="inspect-card">
          <header className="panel-head">
            <div>
              <p className="eyebrow">{wonder.tag}</p>
              <h2>{wonder.name}</h2>
            </div>
            <button type="button" className="icon-btn" onClick={() => useSimulationStore.getState().selectWonder(null)} aria-label="Kapat">
              ×
            </button>
          </header>
          <p>{wonder.fact}</p>
        </div>
      ) : null}
    </aside>
  )
}
