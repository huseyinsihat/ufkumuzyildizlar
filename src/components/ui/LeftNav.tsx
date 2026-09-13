import { useEffect, useState } from 'react'
import { displayName, getBody } from '../../astronomy/planetData'
import { CRAFT_KIND_LABEL, findEarthCraft } from '../../content/earthCrafts'
import {
  findConstellation,
  projectConstellationFigure,
  type Constellation,
} from '../../content/constellations'
import { findWonder, starDisplayName, wonderKindLabel } from '../../content/skyWonders'
import { wonderDetailStats, wonderFactList, wonderHasDetail, wonderPreviewStats } from '../../content/wonderScience'
import { displayEventStatus, EVENT_STATUS_LABEL, eventHasMore, getSelectableEvent } from '../../content/astroEvents'
import { earthRelativeWeight } from '../../features/lab/gravityMath'
import { bodyKindLabel } from '../../i18n/bodyKind'
import { bodyAtmosphere, bodyDescription, bodyFacts } from '../../i18n/bodies'
import { constellationDisplayName } from '../../i18n/constellations'
import { loc, tx, type AppLang } from '../../i18n/types'
import { UI } from '../../i18n/ui'
import { useLang, useT } from '../../i18n/useT'
import { formatAu, formatDays, formatHours, formatKm, formatNumberTr } from '../../utils/formatting'
import { useEventStore } from '../../store/eventStore'
import { useSimulationStore } from '../../store/simulationStore'
import { useUiStore } from '../../store/uiStore'
import type { PlanetDefinition } from '../../types/planet'

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function ConstellationSilhouette({ constellation, name }: { constellation: Constellation; name: string }) {
  const figure = projectConstellationFigure(constellation)
  const byId = new Map(figure.points.map((point) => [point.id, point]))
  return (
    <svg
      className="constellation-figure"
      viewBox={`0 0 ${figure.width} ${figure.height}`}
      role="img"
      aria-label={`${name}: ${constellation.shape}`}
    >
      {figure.lines.map(([fromId, toId]) => {
        const from = byId.get(fromId)
        const to = byId.get(toId)
        if (!from || !to) return null
        return <line key={`${fromId}-${toId}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} />
      })}
      {figure.points.map((point) => (
        <circle key={point.id} cx={point.x} cy={point.y} r={2.1} />
      ))}
    </svg>
  )
}

function firstSentence(text: string): string {
  const match = text.match(/^[^.!?]+[.!?]/)
  return (match ? match[0] : text).trim()
}

export function atmosphereChip(body: PlanetDefinition, lang: AppLang = 'tr'): string {
  if (body.category === 'star') return lang === 'en' ? 'Plasma' : 'Plazma'
  const text = bodyAtmosphere(body.id, 'tr').toLocaleLowerCase('tr-TR')
  if (text.includes('plazma')) return lang === 'en' ? 'Plasma' : 'Plazma'
  if (text.includes('neredeyse yok')) return lang === 'en' ? 'None' : 'Yok'
  if (text.includes('çok kalın') || text.includes('kalın')) return lang === 'en' ? 'Thick' : 'Kalın'
  if (text.includes('ince')) return lang === 'en' ? 'Thin' : 'İnce'
  if (body.category === 'gasGiant' || body.category === 'iceGiant') return lang === 'en' ? 'Thick' : 'Kalın'
  return lang === 'en' ? 'Yes' : 'Var'
}

function vsEarthText(body: PlanetDefinition, lang: AppLang): string {
  const vsEarth = earthRelativeWeight(1, body.id).vsEarth
  return body.id === 'earth' ? `1 ${tx(lang, UI.earthTimes)}` : `${formatNumberTr(vsEarth, 2, lang)} ${tx(lang, UI.earthTimes)}`
}

function coreRows(body: PlanetDefinition, lang: AppLang): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = [{ label: tx(lang, UI.day), value: formatHours(body.rotationPeriodHours, lang) }]
  if (body.orbitalPeriodDays > 0) {
    rows.push({ label: tx(lang, UI.year), value: formatDays(body.orbitalPeriodDays, lang) })
  }
  rows.push({ label: tx(lang, UI.diameter), value: formatKm(body.radiusKm * 2, lang) })
  rows.push({ label: tx(lang, UI.gravity), value: vsEarthText(body, lang) })
  rows.push({ label: tx(lang, UI.temperature), value: `${formatNumberTr(body.meanTempC, 0, lang)} °C` })
  return rows
}

function extraRows(body: PlanetDefinition, lang: AppLang): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = []
  if (body.category !== 'star' && body.category !== 'moon') {
    rows.push({ label: tx(lang, UI.moons), value: formatNumberTr(body.moons, 0, lang) })
  }
  if (body.orbitalRadiusAu > 0 && body.category !== 'moon') {
    rows.push({ label: tx(lang, UI.distance), value: formatAu(body.orbitalRadiusAu, lang) })
  }
  if (body.category === 'moon') {
    const parentName = body.parentId ? displayName(getBody(body.parentId), lang) : displayName('earth', lang)
    rows.push({ label: parentName, value: formatAu(body.orbitalRadiusAu, lang) })
  }
  rows.push({
    label: lang === 'en' ? 'Axial tilt' : 'Eksen eğikliği',
    value: `${formatNumberTr(body.axialTiltDeg, body.axialTiltDeg < 1 ? 2 : 1, lang)}°`,
  })
  if (body.orbitalPeriodDays > 0) {
    rows.push({
      label: lang === 'en' ? 'Orbit tilt' : 'Yörünge eğikliği',
      value: `${formatNumberTr(body.inclinationDeg, 2, lang)}°`,
    })
  }
  if (body.hasRings) rows.push({ label: lang === 'en' ? 'Rings' : 'Halka', value: lang === 'en' ? 'Yes' : 'Var' })
  return rows
}

export function InspectRail() {
  const t = useT()
  const lang = useLang()
  const leftOpen = useUiStore((s) => s.leftOpen)
  const listOpen = useUiStore((s) => s.planetDrawerOpen || s.starDrawerOpen || s.eventDrawerOpen)
  const moreOpen = useUiStore((s) => s.dockMoreOpen)
  const chatOpen = useUiStore((s) => s.sunChatOpen)
  const panel = useUiStore((s) => s.activePanel)
  const bodyId = useSimulationStore((s) => s.selectedBodyId)
  const wonderId = useSimulationStore((s) => s.selectedWonderId)
  const eventId = useEventStore((s) => s.selectedEventId)
  const simMs = useSimulationStore((s) => s.simulationTimeMs)
  const [more, setMore] = useState(false)
  const [moreEvent, setMoreEvent] = useState(false)

  useEffect(() => {
    setMore(false)
    setMoreEvent(false)
  }, [bodyId, wonderId, eventId])

  if (!leftOpen || listOpen || moreOpen || chatOpen || (panel !== 'none' && panel !== 'info')) return null

  const body = bodyId ? getBody(bodyId) : null
  const craft = findEarthCraft(wonderId)
  const wonder = craft ? undefined : findWonder(wonderId)
  const constellation = craft || wonder ? undefined : findConstellation(wonderId)
  const event = getSelectableEvent(eventId)
  if (!body && !wonder && !craft && !event && !constellation) return null
  const eventStatus = event ? displayEventStatus(event.targetMs, simMs, Date.now()) : 'now'
  const jumped = event?.targetMs != null && event.targetMs > Date.now() && simMs >= event.targetMs
  const bodyName = body ? displayName(body, lang) : ''
  const description = body ? bodyDescription(body.id, lang) : ''
  const facts = body ? bodyFacts(body.id, lang) : []
  const constellationName = constellation ? constellationDisplayName(constellation.id, lang, constellation.name) : ''

  return (
    <aside className={`inspect-rail${event ? ' has-event' : ''}`} aria-label={t('moreInfo')}>
      {event ? (
        <div className="inspect-card inspect-event">
          <header className="panel-head">
            <div>
              <p className="eyebrow">
                {t('show')} · {tx(lang, EVENT_STATUS_LABEL[eventStatus])}
                {loc(lang, event.shortName) !== loc(lang, event.title) ? ` · ${loc(lang, event.shortName)}` : ''}
              </p>
              <h2>{loc(lang, event.title)}</h2>
            </div>
            <button type="button" className="icon-btn" onClick={() => useEventStore.getState().selectEvent(null)} aria-label={t('close')}>
              ×
            </button>
          </header>
          {event.dateLabel ? (
            <p className="inspect-soon">
              {eventStatus === 'happened'
                ? loc(lang, event.dateLabel)
                : jumped
                  ? loc(lang, event.dateLabel)
                  : loc(lang, event.dateLabel)}
              {event.where ? ` — ${loc(lang, event.where)}` : ''}
            </p>
          ) : null}
          <p className="inspect-lead">{loc(lang, event.lead)}</p>
          <p className="inspect-see">
            <span>{t('show')}</span>
            {loc(lang, event.see)}
          </p>
          {!moreEvent ? (
            <ul className="inspect-facts">
              {event.facts.slice(0, 2).map((fact) => (
                <li key={loc(lang, fact)}>{loc(lang, fact)}</li>
              ))}
            </ul>
          ) : (
            <>
              {event.why ? (
                <p className="inspect-why">
                  <span>{t('why')}</span>
                  {loc(lang, event.why)}
                </p>
              ) : null}
              <ul className="inspect-facts">
                {event.facts.map((fact) => (
                  <li key={loc(lang, fact)}>{loc(lang, fact)}</li>
                ))}
              </ul>
              {event.wrong ? (
                <p className="inspect-wrong">
                  <span>{lang === 'en' ? 'Wrong idea' : 'Yanlış kanı'}</span>
                  {loc(lang, event.wrong)}
                </p>
              ) : null}
              {event.relatedBodyIds.length > 0 ? (
                <p className="inspect-related">
                  <span>{lang === 'en' ? 'Related bodies' : 'İlgili cisimler'}</span>
                  {event.relatedBodyIds.map((id) => displayName(id, lang)).join(' · ')}
                </p>
              ) : null}
              {event.upcoming && !event.targetMs ? (
                <>
                  <p className="inspect-soon">{tx(lang, EVENT_STATUS_LABEL.upcoming)}</p>
                  <ul className="inspect-facts inspect-upcoming">
                    {event.upcoming.map((row) => (
                      <li key={loc(lang, row.date)}>
                        <strong>{loc(lang, row.date)}</strong> {loc(lang, row.text)}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </>
          )}
          {eventHasMore(event) ? (
            <button type="button" className="text-link inspect-more" onClick={() => setMoreEvent((open) => !open)}>
              {moreEvent ? t('lessInfo') : t('moreInfo')}
            </button>
          ) : null}
        </div>
      ) : null}
      {body ? (
        <div className="inspect-card">
          <header className="panel-head">
            <div>
              <p className="eyebrow">
                <i className="body-swatch" style={{ background: body.color }} aria-hidden="true" />
                {bodyKindLabel(body.category, lang)}
              </p>
              <h2>{bodyName}</h2>
            </div>
            <button type="button" className="icon-btn" onClick={() => useSimulationStore.getState().selectBody(null)} aria-label={t('close')}>
              ×
            </button>
          </header>
          <p className="inspect-lead">{more ? description : firstSentence(description)}</p>
          <p className="inspect-atmo-chip">
            <span>{lang === 'en' ? 'Atmosphere' : 'Atmosfer'}</span>
            <strong>{atmosphereChip(body, lang)}</strong>
          </p>
          <div className="inspect-stats">
            {coreRows(body, lang).map((row) => (
              <Stat key={row.label} label={row.label} value={row.value} />
            ))}
            {more ? extraRows(body, lang).map((row) => <Stat key={row.label} label={row.label} value={row.value} />) : null}
          </div>
          {more ? (
            <p className="inspect-atmo">
              <span>{lang === 'en' ? 'Atmosphere' : 'Atmosfer'}</span>
              {bodyAtmosphere(body.id, lang)}
            </p>
          ) : null}
          <ul className="inspect-facts">
            {(more ? facts : facts.slice(0, 1)).map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
          <button type="button" className="text-link inspect-more" onClick={() => setMore((open) => !open)}>
            {more ? t('lessInfo') : t('moreInfo')}
          </button>
        </div>
      ) : null}
      {!body && craft ? (
        <div className="inspect-card">
          <header className="panel-head">
            <div>
              <p className="eyebrow">
                <i className="body-swatch" style={{ background: craft.color }} aria-hidden="true" />
                {tx(lang, CRAFT_KIND_LABEL[craft.kind])}
              </p>
              <h2>{craft.name}</h2>
            </div>
            <button type="button" className="icon-btn" onClick={() => useSimulationStore.getState().selectWonder(null)} aria-label={t('close')}>
              ×
            </button>
          </header>
          <p className="inspect-lead">{more ? loc(lang, craft.description) : loc(lang, craft.fact)}</p>
          <div className="inspect-stats">
            <Stat label={t('kind')} value={tx(lang, CRAFT_KIND_LABEL[craft.kind])} />
            <Stat label={t('trait')} value={loc(lang, craft.tag)} />
          </div>
          {more ? (
            <ul className="inspect-facts">
              {craft.facts.map((fact) => (
                <li key={loc(lang, fact)}>{loc(lang, fact)}</li>
              ))}
            </ul>
          ) : null}
          <button type="button" className="text-link inspect-more" onClick={() => setMore((open) => !open)}>
            {more ? t('lessInfo') : t('moreInfo')}
          </button>
        </div>
      ) : null}
      {!body && constellation ? (
        <div className="inspect-card">
          <header className="panel-head">
            <div>
              <p className="eyebrow">
                {t('constellations')} · {constellation.season}
              </p>
              <h2>{constellationName}</h2>
            </div>
            <button type="button" className="icon-btn" onClick={() => useSimulationStore.getState().selectWonder(null)} aria-label={t('close')}>
              ×
            </button>
          </header>
          <p className="inspect-atmo-chip">
            <span>{lang === 'en' ? 'Shape' : 'Şekil'}</span>
            <strong>{constellation.shape}</strong>
          </p>
          <p className="inspect-lead">{constellation.description}</p>
          <ConstellationSilhouette constellation={constellation} name={constellationName} />
          <div className="inspect-stats">
            <Stat label={lang === 'en' ? 'Brightest' : 'En parlak'} value={constellation.brightest} />
            <Stat label={lang === 'en' ? 'Season' : 'Mevsim'} value={constellation.season} />
            <Stat label={t('kindStar')} value={String(constellation.stars.length)} />
          </div>
          <p className="inspect-see">
            <span>{t('show')}</span>
            {constellation.see}
          </p>
          {more ? (
            <ul className="inspect-facts">
              {constellation.facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
              <li>
                {lang === 'en' ? 'Bright stars: ' : 'Parlak yıldızlar: '}
                {constellation.stars.map((star) => star.name).join(' · ')}
              </li>
            </ul>
          ) : (
            <ul className="inspect-facts">
              {constellation.facts.slice(0, 2).map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          )}
          <button type="button" className="text-link inspect-more" onClick={() => setMore((open) => !open)}>
            {more ? t('lessInfo') : t('moreInfo')}
          </button>
        </div>
      ) : null}
      {!body && !craft && !constellation && wonder ? (
        <div className="inspect-card">
          <header className="panel-head">
            <div>
              <p className="eyebrow">{wonderKindLabel(wonder.kind, lang)}</p>
              <h2>{starDisplayName(wonder, lang)}</h2>
            </div>
            <button type="button" className="icon-btn" onClick={() => useSimulationStore.getState().selectWonder(null)} aria-label={t('close')}>
              ×
            </button>
          </header>
          <p className="inspect-lead">{loc(lang, wonder.fact)}</p>
          <div className="inspect-stats">
            {wonderPreviewStats(wonder, lang).map((row) => (
              <Stat key={row.label} label={row.label} value={row.value} />
            ))}
            {more ? wonderDetailStats(wonder, lang).map((row) => <Stat key={row.label} label={row.label} value={row.value} />) : null}
          </div>
          {more && wonderFactList(wonder, true, lang).length > 0 ? (
            <ul className="inspect-facts">
              {wonderFactList(wonder, true, lang).map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          ) : null}
          {wonderHasDetail(wonder) ? (
            <button type="button" className="text-link inspect-more" onClick={() => setMore((open) => !open)}>
              {more ? t('lessInfo') : t('moreInfo')}
            </button>
          ) : null}
        </div>
      ) : null}
    </aside>
  )
}
