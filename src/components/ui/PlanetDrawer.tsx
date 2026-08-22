import { BODIES } from '../../astronomy/planetData'
import { askTheSun, focusBody, lookAtSolarSystem } from '../../features/planetExplorer/focus'
import { NOTABLE_STARS } from '../../content/skyWonders'
import { useLabStore } from '../../store/labStore'
import { useSimulationStore } from '../../store/simulationStore'
import { useUiStore } from '../../store/uiStore'
import { useVoiceStore } from '../../store/voiceStore'
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
  const sunChatOpen = useUiStore((s) => s.sunChatOpen)
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
            useVoiceStore.getState().play('mode-lab')
            setMode('lab')
            openLab()
          }}
        >
          <Icon name="flask" />
          <span className="dock-label">{TEAM.home}</span>
        </button>
        <button type="button" className={`btn ${planetOpen ? 'is-on' : ''}`} onClick={() => {
          if (!planetOpen) useVoiceStore.getState().play('ui-planets')
          setPlanetOpen(!planetOpen)
        }} aria-expanded={planetOpen}>
          <Icon name="planet" />
          <span className="dock-label">Gezegenler</span>
        </button>
        <button type="button" className={`btn ${starOpen ? 'is-on' : ''}`} onClick={() => {
          if (!starOpen) useVoiceStore.getState().play('ui-stars')
          setStarOpen(!starOpen)
        }} aria-expanded={starOpen}>
          <Icon name="spark" />
          <span className="dock-label">Yıldızlar</span>
        </button>
        <button type="button" className={`btn ${panel === 'facts' ? 'is-on' : ''}`} onClick={() => {
          if (panel !== 'facts') useVoiceStore.getState().play('ui-facts')
          setPanel(panel === 'facts' ? 'none' : 'facts')
        }}>
          <Icon name="book" />
          <span className="dock-label">Bilgiler</span>
        </button>
        <button type="button" className={`btn ${panel === 'compare' ? 'is-on' : ''}`} onClick={() => {
          if (panel !== 'compare') useVoiceStore.getState().play('ui-compare')
          setPanel(panel === 'compare' ? 'none' : 'compare')
        }}>
          <Icon name="compare" />
          <span className="dock-label">Karşılaştır</span>
        </button>
        <button type="button" className={`btn ${sunChatOpen ? 'is-on' : ''}`} onClick={() => askTheSun()}>
          <Icon name="sun" />
          <span className="dock-label">Güneş’e sor</span>
        </button>
        <button type="button" className={`btn ${panel === 'settings' ? 'is-on' : ''}`} onClick={() => setPanel(panel === 'settings' ? 'none' : 'settings')}>
          <Icon name="gear" />
          <span className="dock-label">Ayarlar</span>
        </button>
      </nav>
      <nav className="view-tools" aria-label="Görünüm">
        <button type="button" className="btn emergency" onClick={lookAtSolarSystem}>
          <Icon name="sun" />
          <span className="dock-label">Güneşe Dön</span>
        </button>
        <button
          type="button"
          className={`btn ${showOrbits ? 'is-on' : ''}`}
          aria-pressed={showOrbits}
          onClick={() => setShowOrbits(!showOrbits)}
        >
          <Icon name="orbit" />
          <span className="dock-label">Yörünge</span>
        </button>
        <button type="button" className={`btn ${showAxes ? 'is-on' : ''}`} aria-pressed={showAxes} onClick={() => setShowAxes(!showAxes)}>
          <Icon name="ruler" />
          <span className="dock-label">Eksen</span>
        </button>
        <button type="button" className={`btn ${showLabels ? 'is-on' : ''}`} aria-pressed={showLabels} onClick={() => setShowLabels(!showLabels)}>
          <Icon name="spark" />
          <span className="dock-label">Etiket</span>
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
