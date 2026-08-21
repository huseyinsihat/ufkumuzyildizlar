import { BODIES } from '../../astronomy/planetData'
import { focusBody, lookAtSolarSystem } from '../../features/planetExplorer/focus'
import { NOTABLE_STARS } from '../../content/skyWonders'
import { useLabStore } from '../../store/labStore'
import { useSimulationStore } from '../../store/simulationStore'
import { useUiStore } from '../../store/uiStore'
import { TEAM } from '../../content/team'
import { getScene } from '../../scene/sceneApi'
import { Icon } from './Icon'

export function ExploreDock() {
  const planetOpen = useUiStore((s) => s.planetDrawerOpen)
  const starOpen = useUiStore((s) => s.starDrawerOpen)
  const setPlanetOpen = useUiStore((s) => s.setPlanetDrawerOpen)
  const setStarOpen = useUiStore((s) => s.setStarDrawerOpen)
  const setPanel = useUiStore((s) => s.setActivePanel)
  const panel = useUiStore((s) => s.activePanel)
  const setMode = useUiStore((s) => s.setAppMode)
  const openLab = useLabStore((s) => s.openLab)
  const selected = useSimulationStore((s) => s.selectedBodyId)
  const selectedWonder = useSimulationStore((s) => s.selectedWonderId)
  const showOrbits = useSimulationStore((s) => s.showOrbits)
  const setShowOrbits = useSimulationStore((s) => s.setShowOrbits)
  const showAxes = useSimulationStore((s) => s.showAxes)
  const setShowAxes = useSimulationStore((s) => s.setShowAxes)
  const showLabels = useSimulationStore((s) => s.showLabels)
  const setShowLabels = useSimulationStore((s) => s.setShowLabels)

  return (
    <div className="explore-dock">
      <nav className="dock-buttons" aria-label="Keşif">
        <button
          type="button"
          className="btn primary"
          onClick={() => {
            setMode('lab')
            openLab()
          }}
        >
          <Icon name="flask" />
          {TEAM.home}
        </button>
        <button type="button" className={`btn ${planetOpen ? 'is-on' : ''}`} onClick={() => setPlanetOpen(!planetOpen)} aria-expanded={planetOpen}>
          <Icon name="planet" />
          Gezegenler
        </button>
        <button type="button" className={`btn ${starOpen ? 'is-on' : ''}`} onClick={() => setStarOpen(!starOpen)} aria-expanded={starOpen}>
          <Icon name="spark" />
          Yıldızlar
        </button>
        <button type="button" className={`btn ${panel === 'facts' ? 'is-on' : ''}`} onClick={() => setPanel(panel === 'facts' ? 'none' : 'facts')}>
          <Icon name="book" />
          Bilgiler
        </button>
        <button type="button" className={`btn ${panel === 'compare' ? 'is-on' : ''}`} onClick={() => setPanel(panel === 'compare' ? 'none' : 'compare')}>
          <Icon name="compare" />
          Karşılaştır
        </button>
        <button type="button" className={`btn ${panel === 'settings' ? 'is-on' : ''}`} onClick={() => setPanel(panel === 'settings' ? 'none' : 'settings')}>
          <Icon name="gear" />
          Ayarlar
        </button>
      </nav>
      <nav className="view-tools" aria-label="Görünüm">
        <button type="button" className="btn" onClick={lookAtSolarSystem}>
          <Icon name="sun" />
          Güneş Sistemi
        </button>
        <button
          type="button"
          className={`btn ${showOrbits ? 'is-on' : ''}`}
          aria-pressed={showOrbits}
          onClick={() => setShowOrbits(!showOrbits)}
        >
          <Icon name="orbit" />
          Yörünge
        </button>
        <button type="button" className={`btn ${showAxes ? 'is-on' : ''}`} aria-pressed={showAxes} onClick={() => setShowAxes(!showAxes)}>
          <Icon name="ruler" />
          Eksen
        </button>
        <button type="button" className={`btn ${showLabels ? 'is-on' : ''}`} aria-pressed={showLabels} onClick={() => setShowLabels(!showLabels)}>
          <Icon name="spark" />
          Etiket
        </button>
      </nav>
      {planetOpen ? (
        <ul className="planet-drawer" aria-label="Gezegenler">
          {BODIES.filter((body) => body.id !== 'moon').map((body) => (
            <li key={body.id}>
              <button
                type="button"
                className={selected === body.id ? 'is-active' : ''}
                onClick={() => {
                  focusBody(body.id)
                  setPlanetOpen(false)
                }}
              >
                <i className="body-swatch" style={{ background: body.color }} aria-hidden="true" />
                {body.name}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {starOpen ? (
        <ul className="planet-drawer star-drawer" aria-label="Yıldızlar">
          {NOTABLE_STARS.map((star) => (
            <li key={star.id}>
              <button
                type="button"
                className={selectedWonder === star.id ? 'is-active' : ''}
                onClick={() => {
                  getScene()?.focusWonder(star.id)
                  setStarOpen(false)
                }}
              >
                <i className="body-swatch" style={{ background: star.color }} aria-hidden="true" />
                {star.name}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
