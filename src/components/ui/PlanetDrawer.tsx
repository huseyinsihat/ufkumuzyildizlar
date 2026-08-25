import { useEffect, useRef, type PointerEvent } from 'react'
import { BODIES } from '../../astronomy/planetData'
import { focusBody, lookAtGalaxy, lookAtSolarSystem, openCompare } from '../../features/planetExplorer/focus'
import { starsAlphabetical, starDisplayName } from '../../content/skyWonders'
import { EVENT_STATUS_LABEL, eventsForDrawer, getAstroEvent } from '../../content/astroEvents'
import { eventIconName } from '../../features/astroEvents/eventIcons'
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

function DockLabel({ lines }: { lines: string[] }) {
  return (
    <span className="dock-label">
      {lines.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </span>
  )
}

function HoldZoomButton({
  factor,
  label,
  icon,
  text,
}: {
  factor: number
  label: string
  icon: IconName
  text: string
}) {
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
      <span className="dock-label">{text}</span>
    </button>
  )
}

export function ViewTools() {
  return (
    <div className="dock-look" aria-label="Bakış">
      <div className="dock-zoom" role="group" aria-label="Yakınlaştır">
        <HoldZoomButton factor={ZOOM_IN} label="Yakınlaştır" icon="plus" text="Yakın" />
        <HoldZoomButton factor={ZOOM_OUT} label="Uzaklaştır" icon="minus" text="Uzak" />
      </div>
      <ViewCube />
    </div>
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
                    <Icon name={eventIconName(event.id)} />
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
                      className={`is-upcoming${selectedEvent === event.id ? ' is-active' : ''}`}
                      onClick={() => focusEvent(event.id)}
                    >
                      <Icon name={eventIconName(event.id)} />
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
                      className={`is-happened${selectedEvent === event.id ? ' is-active' : ''}`}
                      onClick={() => focusEvent(event.id)}
                    >
                      <Icon name={eventIconName(event.id)} />
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

  function goUfkumuz() {
    lookAtGalaxy()
  }

  function goSolarSystem() {
    lookAtSolarSystem()
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

  function goLiveEvent() {
    if (!liveEvent) return
    focusEvent(liveEvent.id)
  }

  return (
    <div className="explore-dock">
      <nav className="dock-buttons" aria-label="Keşif">
        <ViewTools />
        <div className="dock-views" role="group" aria-label="Kamera bakışı">
          <button
            type="button"
            className={`btn${galaxyView ? ' is-on' : ''}`}
            onClick={goUfkumuz}
            aria-pressed={galaxyView}
          >
            <Icon name="camera" />
            <span className="dock-label">Ufkumuz</span>
          </button>
          <button
            type="button"
            className={`btn${galaxyView ? '' : ' is-on'}`}
            onClick={goSolarSystem}
            aria-pressed={!galaxyView}
          >
            <Icon name="camera" />
            <DockLabel lines={['Güneş', 'Sistemi']} />
          </button>
        </div>
        <div className="dock-divider" aria-hidden="true" />
        <div className="dock-nav">
          <button type="button" className={`btn${starOpen ? ' is-on' : ''}`} onClick={openStars} aria-expanded={starOpen}>
            <Icon name="spark" />
            <span className="dock-label">Yıldızlar</span>
          </button>
          <div className="dock-planets">
            <button type="button" className={`btn${planetOpen ? ' is-on' : ''}`} onClick={openPlanets} aria-expanded={planetOpen}>
              <Icon name="planet" />
              <span className="dock-label">Gezegenler</span>
            </button>
            <button
              type="button"
              className={`dock-tool${panel === 'compare' ? ' is-on' : ''}`}
              onClick={toggleCompare}
              aria-pressed={panel === 'compare'}
            >
              <Icon name="compare" />
              <span>Karşılaştır</span>
            </button>
          </div>
          <div className="dock-events">
            <button type="button" className={`btn${eventOpen ? ' is-on' : ''}`} onClick={openEvents} aria-expanded={eventOpen}>
              <Icon name="orbit" />
              <span className="dock-label">Olaylar</span>
            </button>
            {liveEvent ? (
              <button
                type="button"
                className="dock-tool is-live-event"
                onClick={goLiveEvent}
                title={liveEvent.title}
              >
                <Icon name={eventIconName(liveEvent.id)} />
                <span className="dock-tool-label">{liveEvent.shortName}</span>
              </button>
            ) : null}
          </div>
          <button type="button" className={`btn${panel === 'facts' ? ' is-on' : ''}`} onClick={openFacts}>
            <Icon name="book" />
            <span className="dock-label">Bilgiler</span>
            <span className="dock-label-short">Bilgi</span>
          </button>
        </div>
        <div className="dock-meta">
          <button type="button" className={`btn${panel === 'team' ? ' is-on' : ''}`} onClick={openTeam}>
            <Icon name="people" />
            <span className="dock-label">Takım</span>
          </button>
          <button type="button" className={`btn${panel === 'settings' ? ' is-on' : ''}`} onClick={openSettings}>
            <Icon name="gear" />
            <span className="dock-label">Ayarlar</span>
          </button>
        </div>
        <div className="dock-cta">
          <button type="button" className="btn primary" onClick={openLabHome} aria-label={TEAM.home}>
            <Icon name="flask" />
            <DockLabel lines={['Proje', 'Etkinlikleri']} />
          </button>
        </div>
      </nav>
    </div>
  )
}
