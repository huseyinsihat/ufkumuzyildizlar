import { useState } from 'react'
import { BODIES } from '../../astronomy/planetData'
import { CONSTELLATIONS } from '../../content/constellations'
import { focusBody, lookAtSolarSystem } from '../../features/planetExplorer/focus'
import { getScene } from '../../scene/sceneApi'
import { useEducationStore } from '../../store/educationStore'
import { useSimulationStore } from '../../store/simulationStore'
import { useUiStore } from '../../store/uiStore'

export function LeftNav() {
  const showOrbits = useSimulationStore((s) => s.showOrbits)
  const setShowOrbits = useSimulationStore((s) => s.setShowOrbits)
  const showConstellations = useSimulationStore((s) => s.showConstellations)
  const setShowConstellations = useSimulationStore((s) => s.setShowConstellations)
  const selected = useSimulationStore((s) => s.selectedBodyId)
  const togglePanel = useUiStore((s) => s.togglePanel)
  const notifyOrbits = useEducationStore((s) => s.notifyOrbitsVisible)
  const open = useUiStore((s) => s.leftOpen)
  const [constellationId, setConstellationId] = useState<string | null>(null)
  const constellation = CONSTELLATIONS.find((item) => item.id === constellationId)

  return (
    <nav className={`left-nav ${open ? 'is-open' : ''}`} aria-label="Keşif menüsü">
      <button type="button" className="nav-btn" onClick={lookAtSolarSystem} aria-label="Güneş Sistemine bak">
        Güneş Sistemi
      </button>
      <p className="nav-label">Gezegenler</p>
      <ul className="planet-list">
        {BODIES.filter((body) => body.id !== 'moon').map((body) => (
          <li key={body.id}>
            <button
              type="button"
              className={selected === body.id ? 'is-active' : ''}
              onClick={() => focusBody(body.id)}
              aria-label={`${body.name} gezegenine git`}
            >
              {body.name}
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="nav-btn"
        aria-pressed={showOrbits}
        onClick={() => {
          const next = !showOrbits
          setShowOrbits(next)
          notifyOrbits(next, selected)
        }}
      >
        {showOrbits ? 'Yörüngeleri gizle' : 'Yörüngeleri göster'}
      </button>
      <button
        type="button"
        className="nav-btn"
        aria-pressed={showConstellations}
        onClick={() => setShowConstellations(!showConstellations)}
      >
        {showConstellations ? 'Takımyıldızları gizle' : 'Takımyıldızları göster'}
      </button>
      {showConstellations ? (
        <ul className="planet-list">
          {CONSTELLATIONS.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={constellationId === item.id ? 'is-active' : ''}
                onClick={() => {
                  setConstellationId(item.id)
                  getScene()?.selectConstellation(item.id)
                }}
                aria-label={item.name}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {constellation && showConstellations ? (
        <p className="muted">
          {constellation.name}: {constellation.description}
        </p>
      ) : null}
      <button type="button" className="nav-btn" onClick={() => togglePanel('missions')}>
        Görevler
      </button>
    </nav>
  )
}
