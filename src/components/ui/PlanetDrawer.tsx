import { useEffect, useRef, type PointerEvent } from 'react'
import { BODIES } from '../../astronomy/planetData'
import { focusBody, lookAtGalaxy, lookAtSolarSystem, openCompare } from '../../features/planetExplorer/focus'
import { starsAlphabetical, starDisplayName } from '../../content/skyWonders'
import { EVENT_STATUS_LABEL, eventsForDrawer, getAstroEvent } from '../../content/astroEvents'
import { focusEvent } from '../../features/astroEvents/focusEvent'
import { useEventStore } from '../../store/eventStore'
import { useLabStore } from '../../store/labStore'
import { useSimulationStore } from '../../store/simulationStore'
import { useUiStore } from '../../store/uiStore'
import { useVoiceStore } from '../../store/voiceStore'
import { TEAM } from '../../content/team'
import { getScene } from '../../scene/sceneApi'
import { Icon, type IconName } from './Icon'
import { ViewCube } from './ViewCube'

const ZOOM_IN = 0.9
const ZOOM_OUT = 1.11
const ZOOM_HOLD_MS = 50

function HoldZoomButton({ factor, label, icon }: { factor: number; label: string; icon: IconName }) {
  const hold = useRef(0)

  function stop() {
    window.clearInterval(hold.current)
    hold.current = 0
  }

  function start(event: PointerEvent<HTMLButtonElement>) {
    if (event.button !== 0) return
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    getScene()?.dollyBy(factor)
    window.clearInterval(hold.current)
    hold.current = window.setInterval(() => getScene()?.dollyBy(factor), ZOOM_HOLD_MS)
  }

  useEffect(
    () => () => {
      window.clearInterval(hold.current)
    },
    [],
  )

  return (
    <button
      type="button"
      className="btn icon-only"
      aria-label={label}
      title={`${label} — basılı tut`}
      onPointerDown={start}
      onPointerUp={stop}
      onPointerCancel={stop}
      onLostPointerCapture={stop}
      onContextMenu={(event) => event.preventDefault()}
    >
      <Icon name={icon} />
    </button>
  )
}

export function ExploreListStrip() {
  const planetOpen = useUiStore((s) => s.planetDrawerOpen)
  const starOpen = useUiStore((s) => s.starDrawerOpen)
  const eventOpen = useUiStore((s) => s.eventDrawerOpen)
  const setPlanetOpen = useUiStore((s) => s.setPlanetDrawerOpen)
  const setStarOpen = useUiStore((s) => s.setStarDrawerOpen)
  const selected = useSimulationStore((s) => s.selectedBodyId)
  const selectedWonder = useSimulationStore((s) => s.selectedWonderId)
  const selectedEvent = useEventStore((s) => s.selectedEventId)
  const lists = eventsForDrawer(Date.now())

  if (!planetOpen && !starOpen && !eventOpen) return null

  return (
    <div className="explore-strip">
      {planetOpen ? (
        <ul className="planet-drawer" aria-label="Gezegenler">
          {BODIES.filter((body) => body.category !== 'moon').map((body) => (
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
          {starsAlphabetical().map((star) => (
            <li key={star.id}>
              <button
                type="button"
                className={selectedWonder === star.id ? 'is-active' : ''}
                onClick={() => {
                  getScene()?.focusWonder(star.id)
                  setStarOpen(false)
                }}
              >
                <i
                  className={`body-swatch is-star${star.kind === 'nebula' ? ' is-nebula' : ''}${star.kind === 'cluster' ? ' is-cluster' : ''}`}
                  style={{ background: star.color, color: star.color }}
                  aria-hidden="true"
                />
                {starDisplayName(star)}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {eventOpen ? (
        <div className="planet-drawer event-drawer" aria-label="Olaylar">
          <section>
            <h3>{EVENT_STATUS_LABEL.now}</h3>
            <ul>
              {lists.now.map((event) => (
                <li key={event.id}>
                  <button
                    type="button"
                    className={selectedEvent === event.id ? 'is-active' : ''}
                    onClick={() => focusEvent(event.id)}
                  >
                    <i className="body-swatch" style={{ background: '#fbbf24' }} aria-hidden="true" />
                    <span>
                      {event.shortName}
                      <small>{event.title}</small>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
          {lists.upcoming.length ? (
            <section>
              <h3>{EVENT_STATUS_LABEL.upcoming}</h3>
              <ul>
                {lists.upcoming.map((event) => (
                  <li key={event.id}>
                    <button
                      type="button"
                      className={selectedEvent === event.id ? 'is-active' : ''}
                      onClick={() => focusEvent(event.id)}
                    >
                      <i className="body-swatch" style={{ background: '#67e8f9' }} aria-hidden="true" />
                      <span>
                        {event.dateLabel}
                        <small>{event.text}</small>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {lists.happened.length ? (
            <section>
              <h3>{EVENT_STATUS_LABEL.happened}</h3>
              <ul>
                {lists.happened.map((event) => (
                  <li key={event.id}>
                    <button
                      type="button"
                      className={selectedEvent === event.id ? 'is-active' : ''}
                      onClick={() => focusEvent(event.id)}
                    >
                      <i className="body-swatch" style={{ background: '#94a3b8' }} aria-hidden="true" />
                      <span>
                        {event.dateLabel}
                        <small>{event.text}</small>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export function ExploreDock() {
  const planetOpen = useUiStore((s) => s.planetDrawerOpen)
  const starOpen = useUiStore((s) => s.starDrawerOpen)
  const eventOpen = useUiStore((s) => s.eventDrawerOpen)
  const setPlanetOpen = useUiStore((s) => s.setPlanetDrawerOpen)
  const setStarOpen = useUiStore((s) => s.setStarDrawerOpen)
  const setEventOpen = useUiStore((s) => s.setEventDrawerOpen)
  const setPanel = useUiStore((s) => s.setActivePanel)
  const panel = useUiStore((s) => s.activePanel)
  const setMode = useUiStore((s) => s.setAppMode)
  const openLab = useLabStore((s) => s.openLab)
  const liveEvent = getAstroEvent(useEventStore((s) => s.activeEventId))
  const galaxyView = useSimulationStore((s) => s.galaxyView)

  function openPlanets() {
    if (!planetOpen) useVoiceStore.getState().play('ui-planets')
    setPlanetOpen(!planetOpen)
  }

  function openStars() {
    if (!starOpen) useVoiceStore.getState().play('ui-stars')
    setStarOpen(!starOpen)
  }

  function openEvents() {
    setEventOpen(!eventOpen)
  }

  function openFacts() {
    if (panel !== 'facts') useVoiceStore.getState().play('ui-facts')
    setPanel(panel === 'facts' ? 'none' : 'facts')
  }

  function openLabHome() {
    useVoiceStore.getState().play('mode-lab')
    setMode('lab')
    openLab()
  }

  function toggleCompare() {
    if (panel === 'compare') {
      setPanel('none')
      return
    }
    useVoiceStore.getState().play('ui-compare')
    openCompare()
  }

  function openTeam() {
    if (panel !== 'team') useVoiceStore.getState().play('ui-team')
    setPanel(panel === 'team' ? 'none' : 'team')
  }

  function openSettings() {
    setPanel(panel === 'settings' ? 'none' : 'settings')
  }

  return (
    <div className="explore-dock">
      <nav className="dock-buttons" aria-label="Keşif">
        <div className="dock-explore">
          <div className="dock-view">
            <button
              type="button"
              className={`btn ${galaxyView ? 'is-on' : ''}`}
              onClick={lookAtGalaxy}
              aria-pressed={galaxyView}
            >
              <Icon name="spark" />
              <span className="dock-label">{TEAM.project}</span>
            </button>
            <button
              type="button"
              className={`btn ${galaxyView ? '' : 'is-on'}`}
              onClick={lookAtSolarSystem}
              aria-pressed={!galaxyView}
            >
              <Icon name="sun" />
              <span className="dock-label">Güneş Sistemi</span>
            </button>
            <div className="dock-zoom" role="group" aria-label="Yakınlaştır">
              <HoldZoomButton factor={ZOOM_IN} label="Yakınlaştır" icon="up" />
              <HoldZoomButton factor={ZOOM_OUT} label="Uzaklaştır" icon="down" />
            </div>
            <ViewCube />
          </div>
          <button type="button" className={`btn ${starOpen ? 'is-on' : ''}`} onClick={openStars} aria-expanded={starOpen}>
            <Icon name="spark" />
            <span className="dock-label">Yıldızlar</span>
          </button>
          <button type="button" className={`btn ${planetOpen ? 'is-on' : ''}`} onClick={openPlanets} aria-expanded={planetOpen}>
            <Icon name="planet" />
            <span className="dock-label">Gezegenler</span>
          </button>
          <button
            type="button"
            className={`dock-live-event is-compare${panel === 'compare' ? ' is-on' : ''}`}
            onClick={toggleCompare}
            aria-pressed={panel === 'compare'}
            title="Gezegenleri karşılaştır"
          >
            Karşılaştır
          </button>
          <button type="button" className={`btn ${eventOpen ? 'is-on' : ''}`} onClick={openEvents} aria-expanded={eventOpen}>
            <Icon name="orbit" />
            <span className="dock-label">Olaylar</span>
          </button>
          <button
            type="button"
            className={`dock-live-event${liveEvent ? '' : ' is-idle'}`}
            onClick={() => (liveEvent ? focusEvent(liveEvent.id) : openEvents())}
            title={liveEvent ? liveEvent.title : 'Aktif olay yok'}
          >
            {liveEvent ? liveEvent.shortName : 'Aktif Olay Yok'}
          </button>
          <button type="button" className={`btn ${panel === 'facts' ? 'is-on' : ''}`} onClick={openFacts}>
            <Icon name="book" />
            <span className="dock-label">Bilgiler</span>
            <span className="dock-label-short">Bilgi</span>
          </button>
          <button type="button" className={`btn ${panel === 'team' ? 'is-on' : ''}`} onClick={openTeam}>
            <Icon name="people" />
            <span className="dock-label">Takım</span>
          </button>
          <button type="button" className={`btn ${panel === 'settings' ? 'is-on' : ''}`} onClick={openSettings}>
            <Icon name="gear" />
            <span className="dock-label">Ayarlar</span>
          </button>
        </div>
        <div className="dock-actions">
          <button type="button" className="btn primary" onClick={openLabHome}>
            <Icon name="flask" />
            <span className="dock-label">{TEAM.home}</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
