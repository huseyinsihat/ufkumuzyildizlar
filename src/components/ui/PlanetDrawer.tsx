import { BODIES } from '../../astronomy/planetData'
import { focusBody, lookAtSolarSystem } from '../../features/planetExplorer/focus'
import { useLabStore } from '../../store/labStore'
import { useSimulationStore } from '../../store/simulationStore'
import { useUiStore } from '../../store/uiStore'
import { TEAM } from '../../content/team'
import { Icon } from './Icon'

export function ExploreDock() {
  const drawer = useUiStore((s) => s.planetDrawerOpen)
  const setDrawer = useUiStore((s) => s.setPlanetDrawerOpen)
  const setPanel = useUiStore((s) => s.setActivePanel)
  const setMode = useUiStore((s) => s.setAppMode)
  const openLab = useLabStore((s) => s.openLab)
  const selected = useSimulationStore((s) => s.selectedBodyId)
  const showOrbits = useSimulationStore((s) => s.showOrbits)
  const setShowOrbits = useSimulationStore((s) => s.setShowOrbits)

  return (
    <div className="explore-dock">
      <p className="dock-brand">{TEAM.project}</p>
      <nav className="dock-buttons" aria-label="Keşif">
        <button
          type="button"
          className="btn primary"
          onClick={() => {
            setMode('lab')
            openLab()
          }}
        >
          <Icon name="sun" />
          {TEAM.home}
        </button>
        <button type="button" className="btn" onClick={() => setDrawer(!drawer)} aria-expanded={drawer}>
          <Icon name="planet" />
          Gezegenler
        </button>
        <button type="button" className="btn" onClick={lookAtSolarSystem}>
          <Icon name="sun" />
          Güneş Sistemi
        </button>
        <button type="button" className="btn" aria-pressed={showOrbits} onClick={() => setShowOrbits(!showOrbits)}>
          <Icon name="orbit" />
          {showOrbits ? 'Yörünge açık' : 'Yörünge'}
        </button>
        <button type="button" className="btn" onClick={() => setPanel('compare')}>
          <Icon name="compare" />
          Karşılaştır
        </button>
        <button type="button" className="btn" onClick={() => setPanel('settings')}>
          <Icon name="gear" />
          Ayarlar
        </button>
      </nav>
      {drawer ? (
        <ul className="planet-drawer">
          {BODIES.filter((body) => body.id !== 'moon').map((body) => (
            <li key={body.id}>
              <button
                type="button"
                className={selected === body.id ? 'is-active' : ''}
                onClick={() => {
                  focusBody(body.id)
                  setDrawer(false)
                }}
              >
                {body.name}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
