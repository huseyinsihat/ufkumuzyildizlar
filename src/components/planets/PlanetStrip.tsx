import { getBody } from '../../astronomy/planetData'
import { insightFor } from '../../content/insights'
import { formatDays, formatHours, formatNumberTr } from '../../utils/formatting'
import { useSimulationStore } from '../../store/simulationStore'
import { useUiStore } from '../../store/uiStore'

export function PlanetStrip() {
  const id = useSimulationStore((s) => s.selectedBodyId)
  const setCompare = useSimulationStore((s) => s.setCompare)
  const setPanel = useUiStore((s) => s.setActivePanel)
  if (!id) return null
  const body = getBody(id)
  const tip = insightFor([id])

  return (
    <aside className="planet-strip" aria-label={`${body.name} bilgisi`}>
      <div>
        <p className="eyebrow">{body.englishName}</p>
        <h2>{body.name}</h2>
        <p>{body.description}</p>
        <p className="insight compact">{tip.text}</p>
      </div>
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
      <div className="row-actions">
        <button
          type="button"
          className="btn"
          onClick={() => {
            setCompare(id === 'earth' ? 'earth' : id, id === 'earth' ? 'mars' : 'earth')
            setPanel('compare')
          }}
        >
          Karşılaştır
        </button>
        <button type="button" className="icon-btn" onClick={() => useSimulationStore.getState().selectBody(null)} aria-label="Kapat">
          ×
        </button>
      </div>
    </aside>
  )
}
