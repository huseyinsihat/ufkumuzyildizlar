import { useEffect, useRef, type PointerEvent } from 'react'
import { BODIES, displayName } from '../../astronomy/planetData'
import { focusBody, lookAtGalaxy, lookAtSolarSystem } from '../../features/planetExplorer/focus'
import {
  openLabHome,
  toggleCompare,
  toggleEvents,
  toggleFacts,
  togglePlanets,
  toggleSettings,
  toggleStars,
  toggleTeam,
} from '../../features/planetExplorer/chrome'
import { starsAlphabetical, starDisplayName } from '../../content/skyWonders'
import { EVENT_STATUS_LABEL, eventsForDrawer, getAstroEvent } from '../../content/astroEvents'
import { eventIconName } from '../../features/astroEvents/eventIcons'
import { focusEvent } from '../../features/astroEvents/focusEvent'
import { loc, tx } from '../../i18n/types'
import { useLang, useT } from '../../i18n/useT'
import { useEventStore } from '../../store/eventStore'
import { useSimulationStore } from '../../store/simulationStore'
import { useUiStore } from '../../store/uiStore'
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
  holdHint,
}: {
  factor: number
  label: string
  icon: IconName
  text: string
  holdHint: string
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
      title={`${label} — ${holdHint}`}
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
  const t = useT()
  return (
    <div className="dock-look" aria-label={t('cameraView')}>
      <div className="dock-zoom" role="group" aria-label={t('zoomIn')}>
        <HoldZoomButton factor={ZOOM_IN} label={t('zoomIn')} icon="plus" text={t('zoomInShort')} holdHint={t('holdZoom')} />
        <HoldZoomButton factor={ZOOM_OUT} label={t('zoomOut')} icon="minus" text={t('zoomOutShort')} holdHint={t('holdZoom')} />
      </div>
      <ViewCube />
    </div>
  )
}

export function ExploreListStrip() {
  const t = useT()
  const lang = useLang()
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
        <ul className="planet-drawer" aria-label={t('planets')}>
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
                {displayName(body, lang)}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {starOpen ? (
        <ul className="planet-drawer star-drawer" aria-label={t('stars')}>
          {starsAlphabetical(lang).map((star) => (
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
                {starDisplayName(star, lang)}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {eventOpen ? (
        <div className="planet-drawer event-drawer" aria-label={t('events')}>
          <section>
            <h3>{tx(lang, EVENT_STATUS_LABEL.now)}</h3>
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
                      {loc(lang, event.shortName)}
                      <small>{loc(lang, event.title)}</small>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
          {lists.upcoming.length ? (
            <section>
              <h3>{tx(lang, EVENT_STATUS_LABEL.upcoming)}</h3>
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
                        {loc(lang, event.dateLabel)}
                        <small>{loc(lang, event.text)}</small>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {lists.happened.length ? (
            <section>
              <h3>{tx(lang, EVENT_STATUS_LABEL.happened)}</h3>
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
                        {loc(lang, event.dateLabel)}
                        <small>{loc(lang, event.text)}</small>
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

function PhoneZoomFloat() {
  const t = useT()
  return (
    <div className="dock-zoom-float" aria-label={t('zoomIn')}>
      <HoldZoomButton factor={ZOOM_IN} label={t('zoomIn')} icon="plus" text={t('zoomInShort')} holdHint={t('holdZoom')} />
      <HoldZoomButton factor={ZOOM_OUT} label={t('zoomOut')} icon="minus" text={t('zoomOutShort')} holdHint={t('holdZoom')} />
    </div>
  )
}

export function ExploreDock() {
  const t = useT()
  const lang = useLang()
  const planetOpen = useUiStore((s) => s.planetDrawerOpen)
  const starOpen = useUiStore((s) => s.starDrawerOpen)
  const eventOpen = useUiStore((s) => s.eventDrawerOpen)
  const moreOpen = useUiStore((s) => s.dockMoreOpen)
  const setMoreOpen = useUiStore((s) => s.setDockMoreOpen)
  const panel = useUiStore((s) => s.activePanel)
  const liveEvent = getAstroEvent(useEventStore((s) => s.activeEventId))
  const galaxyView = useSimulationStore((s) => s.galaxyView)
  const liveTitle = liveEvent ? loc(lang, liveEvent.title) : t('noEvent')
  const liveShort = liveEvent ? loc(lang, liveEvent.shortName) : t('noEvent')
  const labHome = loc(lang, TEAM.home)
  const overviewLines = t('overview').split(' ')

  function goLiveEvent() {
    if (!liveEvent) return
    setMoreOpen(false)
    focusEvent(liveEvent.id)
  }

  function goGalaxy() {
    setMoreOpen(false)
    lookAtGalaxy()
  }

  function goSolar() {
    setMoreOpen(false)
    lookAtSolarSystem()
  }

  return (
    <div className={`explore-dock${moreOpen ? ' is-more-open' : ''}`}>
      {moreOpen ? (
        <button type="button" className="dock-more-backdrop" aria-label={t('closeMenu')} onClick={() => setMoreOpen(false)} />
      ) : null}
      {moreOpen ? (
        <div className="dock-more-sheet" id="dock-more-sheet" role="menu" aria-label={t('moreMenu')}>
          <ViewTools />
          <button type="button" className={`btn${galaxyView ? ' is-on' : ''}`} onClick={goGalaxy} aria-pressed={galaxyView}>
            <Icon name="camera" />
            <span className="dock-label">{t('galaxy')}</span>
          </button>
          <button
            type="button"
            className={`btn${panel === 'compare' ? ' is-on' : ''}`}
            onClick={() => toggleCompare()}
            aria-pressed={panel === 'compare'}
          >
            <Icon name="compare" />
            <span className="dock-label">{t('compare')}</span>
          </button>
          {liveEvent ? (
            <button type="button" className="btn is-live-event" onClick={goLiveEvent} title={liveTitle}>
              <Icon name={eventIconName(liveEvent.id)} />
              <span className="dock-label">{liveShort}</span>
            </button>
          ) : null}
          <button type="button" className={`btn${panel === 'facts' ? ' is-on' : ''}`} onClick={() => toggleFacts()}>
            <Icon name="book" />
            <span className="dock-label">{t('facts')}</span>
          </button>
          <button type="button" className={`btn${panel === 'team' ? ' is-on' : ''}`} onClick={() => toggleTeam()}>
            <Icon name="people" />
            <span className="dock-label">{t('team')}</span>
          </button>
          <button type="button" className={`btn${panel === 'settings' ? ' is-on' : ''}`} onClick={() => toggleSettings()}>
            <Icon name="gear" />
            <span className="dock-label">{t('settings')}</span>
          </button>
          <button type="button" className="btn primary" onClick={() => openLabHome()} aria-label={labHome}>
            <Icon name="flask" />
            <span className="dock-label">{t('lab')}</span>
          </button>
        </div>
      ) : null}
      <PhoneZoomFloat />
      <nav className="dock-buttons" aria-label={t('exploreNav')}>
        <ViewTools />
        <div className="dock-views" role="group" aria-label={t('cameraView')}>
          <button
            type="button"
            className={`btn dock-phone-hide${galaxyView ? ' is-on' : ''}`}
            onClick={goGalaxy}
            aria-pressed={galaxyView}
          >
            <Icon name="camera" />
            <span className="dock-label">{t('galaxy')}</span>
            <span className="dock-label-short">{t('galaxyShort')}</span>
          </button>
          <button
            type="button"
            className={`btn dock-phone-tab${galaxyView ? '' : ' is-on'}`}
            onClick={goSolar}
            aria-pressed={!galaxyView}
          >
            <Icon name="camera" />
            <DockLabel lines={overviewLines.length > 1 ? overviewLines : [t('overview')]} />
            <span className="dock-label-short">{t('solarShort')}</span>
          </button>
        </div>
        <div className="dock-divider" aria-hidden="true" />
        <div className="dock-nav">
          <button
            type="button"
            className={`btn dock-phone-tab${starOpen ? ' is-on' : ''}`}
            onClick={() => toggleStars({ cycle: false })}
            aria-expanded={starOpen}
          >
            <Icon name="spark" />
            <span className="dock-label">{t('stars')}</span>
          </button>
          <div className="dock-planets">
            <button
              type="button"
              className={`btn dock-phone-tab${planetOpen ? ' is-on' : ''}`}
              onClick={() => togglePlanets()}
              aria-expanded={planetOpen}
            >
              <Icon name="planet" />
              <span className="dock-label">{t('planets')}</span>
            </button>
            <button
              type="button"
              className={`dock-tool${panel === 'compare' ? ' is-on' : ''}`}
              onClick={() => toggleCompare()}
              aria-pressed={panel === 'compare'}
            >
              <Icon name="compare" />
              <span>{t('compare')}</span>
            </button>
          </div>
          <div className="dock-events">
            <button
              type="button"
              className={`btn dock-phone-tab${eventOpen ? ' is-on' : ''}`}
              onClick={() => toggleEvents({ cycle: false })}
              aria-expanded={eventOpen}
            >
              <Icon name="orbit" />
              <span className="dock-label">{t('events')}</span>
            </button>
            <button
              type="button"
              className={`dock-tool${liveEvent ? ' is-live-event' : ' is-idle-event'}`}
              onClick={goLiveEvent}
              disabled={!liveEvent}
              title={liveTitle}
              aria-label={liveShort}
            >
              {liveEvent ? (
                <>
                  <Icon name={eventIconName(liveEvent.id)} />
                  <span className="dock-tool-label">{liveShort}</span>
                </>
              ) : (
                <span className="dock-tool-label is-empty" aria-hidden="true">
                  &nbsp;
                </span>
              )}
            </button>
          </div>
          <button type="button" className={`btn dock-facts${panel === 'facts' ? ' is-on' : ''}`} onClick={() => toggleFacts()}>
            <Icon name="book" />
            <span className="dock-label">{t('facts')}</span>
            <span className="dock-label-short">{t('factsShort')}</span>
          </button>
        </div>
        <div className="dock-meta">
          <button type="button" className={`btn${panel === 'team' ? ' is-on' : ''}`} onClick={() => toggleTeam()}>
            <Icon name="people" />
            <span className="dock-label">{t('team')}</span>
          </button>
          <button type="button" className={`btn${panel === 'settings' ? ' is-on' : ''}`} onClick={() => toggleSettings()}>
            <Icon name="gear" />
            <span className="dock-label">{t('settings')}</span>
          </button>
        </div>
        <div className="dock-cta">
          <button type="button" className="btn primary" onClick={() => openLabHome()} aria-label={labHome}>
            <Icon name="flask" />
            <DockLabel lines={t('lab').split(' ')} />
            <span className="dock-label-short">{t('labShort')}</span>
          </button>
        </div>
        <button
          type="button"
          className={`btn dock-more-btn dock-phone-tab${moreOpen ? ' is-on' : ''}`}
          onClick={() => setMoreOpen(!moreOpen)}
          aria-expanded={moreOpen}
          aria-controls="dock-more-sheet"
        >
          <Icon name="more" />
          <span className="dock-label">{t('more')}</span>
        </button>
      </nav>
    </div>
  )
}
