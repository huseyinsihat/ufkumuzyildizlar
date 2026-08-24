import { findWonder, starDisplayName } from '../../content/skyWonders'
import { useSimulationStore } from '../../store/simulationStore'

export function WonderStrip() {
  const id = useSimulationStore((s) => s.selectedWonderId)
  const wonder = findWonder(id)
  if (!wonder) return null

  return (
    <aside className="planet-strip" aria-label={`${starDisplayName(wonder)} bilgisi`}>
      <div>
        <p className="eyebrow">{wonder.tag}</p>
        <h2>{starDisplayName(wonder)}</h2>
        <p>{wonder.fact}</p>
      </div>
      <div className="row-actions">
        <button type="button" className="icon-btn" onClick={() => useSimulationStore.getState().selectWonder(null)} aria-label="Kapat">
          ×
        </button>
      </div>
    </aside>
  )
}
