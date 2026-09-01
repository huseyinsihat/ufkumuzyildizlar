import { useEffect, useState } from 'react'
import { getBody } from '../../astronomy/planetData'
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
import { formatAu, formatDays, formatHours, formatKm, formatNumberTr } from '../../utils/formatting'
import { useEventStore } from '../../store/eventStore'
import { useSimulationStore } from '../../store/simulationStore'
import { useUiStore } from '../../store/uiStore'
import type { BodyCategory, PlanetDefinition } from '../../types/planet'

const KIND: Record<BodyCategory, string> = {
  star: 'Yıldız',
  terrestrial: 'Kaya gezegen',
  gasGiant: 'Gaz devi',
  iceGiant: 'Buz devi',
  dwarf: 'Cüce gezegen',
  moon: 'Uydu',
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function ConstellationSilhouette({ constellation }: { constellation: Constellation }) {
  const figure = projectConstellationFigure(constellation)
  const byId = new Map(figure.points.map((point) => [point.id, point]))
  return (
    <svg
      className="constellation-figure"
      viewBox={`0 0 ${figure.width} ${figure.height}`}
      role="img"
      aria-label={`${constellation.name} şekli: ${constellation.shape}`}
    >
      {figure.lines.map(([fromId, toId]) => {
        const from = byId.get(fromId)
        const to = byId.get(toId)
        if (!from || !to) return null
        return (
          <line
            key={`${fromId}-${toId}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
          />
        )
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

export function atmosphereChip(body: PlanetDefinition): string {
  if (body.category === 'star') return 'Plazma'
  const text = body.atmosphere.toLocaleLowerCase('tr-TR')
  if (text.includes('plazma')) return 'Plazma'
  if (text.includes('neredeyse yok')) return 'Yok'
  if (text.includes('çok kalın') || text.includes('kalın')) return 'Kalın'
  if (text.includes('ince')) return 'İnce'
  if (body.category === 'gasGiant' || body.category === 'iceGiant') return 'Kalın'
  return 'Var'
}

function vsEarthText(body: PlanetDefinition): string {
  const vsEarth = earthRelativeWeight(1, body.id).vsEarth
  return body.id === 'earth' ? '1 × Dünya' : `${formatNumberTr(vsEarth, 2)} × Dünya`
}

function coreRows(body: PlanetDefinition): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = [{ label: 'Gün', value: formatHours(body.rotationPeriodHours) }]
  if (body.orbitalPeriodDays > 0) {
    rows.push({ label: 'Yıl', value: formatDays(body.orbitalPeriodDays) })
  }
  rows.push({ label: 'Çap', value: formatKm(body.radiusKm * 2) })
  rows.push({ label: 'Yerçekimi', value: vsEarthText(body) })
  rows.push({ label: 'Sıcaklık', value: `${formatNumberTr(body.meanTempC, 0)} °C` })
  return rows
}

function extraRows(body: PlanetDefinition): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = []
  if (body.category !== 'star' && body.category !== 'moon') {
    rows.push({ label: 'Uydu', value: formatNumberTr(body.moons) })
  }
  if (body.orbitalRadiusAu > 0 && body.category !== 'moon') {
    rows.push({ label: 'Güneş’e uzaklık', value: formatAu(body.orbitalRadiusAu) })
  }
  if (body.category === 'moon') {
    const parentName = body.parentId ? getBody(body.parentId).name : 'Dünya'
    rows.push({ label: `${parentName}’e uzaklık`, value: formatAu(body.orbitalRadiusAu) })
  }
  rows.push({
    label: 'Eksen eğikliği',
    value: `${formatNumberTr(body.axialTiltDeg, body.axialTiltDeg < 1 ? 2 : 1)}°`,
  })
  if (body.orbitalPeriodDays > 0) {
    rows.push({ label: 'Yörünge eğikliği', value: `${formatNumberTr(body.inclinationDeg, 2)}°` })
  }
  if (body.hasRings) rows.push({ label: 'Halka', value: 'Var' })
  return rows
}

export function InspectRail() {
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
  const jumped =
    event?.targetMs != null && event.targetMs > Date.now() && simMs >= event.targetMs

  return (
    <aside className={`inspect-rail${event ? ' has-event' : ''}`} aria-label="Seçim bilgisi">
      {event ? (
        <div className="inspect-card inspect-event">
          <header className="panel-head">
            <div>
              <p className="eyebrow">
                Gösteri · {EVENT_STATUS_LABEL[eventStatus]}
                {event.shortName !== event.title ? ` · ${event.shortName}` : ''}
              </p>
              <h2>{event.title}</h2>
            </div>
            <button type="button" className="icon-btn" onClick={() => useEventStore.getState().selectEvent(null)} aria-label="Kapat">
              ×
            </button>
          </header>
          {event.dateLabel ? (
            <p className="inspect-soon">
              {eventStatus === 'happened'
                ? `${event.dateLabel} tarihinde oldu`
                : jumped
                  ? `Zaman ${event.dateLabel} tarihine alındı`
                  : event.dateLabel}
              {event.where ? ` — ${event.where}` : ''}
            </p>
          ) : null}
          <p className="inspect-lead">{event.lead}</p>
          <p className="inspect-see">
            <span>Görüntüde</span>
            {event.see}
          </p>
          {!moreEvent ? (
            <ul className="inspect-facts">
              {event.facts.slice(0, 2).map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          ) : (
            <>
              {event.why ? (
                <p className="inspect-why">
                  <span>Neden</span>
                  {event.why}
                </p>
              ) : null}
              <ul className="inspect-facts">
                {event.facts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
              {event.wrong ? (
                <p className="inspect-wrong">
                  <span>Yanlış kanı</span>
                  {event.wrong}
                </p>
              ) : null}
              {event.relatedBodyIds.length > 0 ? (
                <p className="inspect-related">
                  <span>İlgili cisimler</span>
                  {event.relatedBodyIds.map((id) => getBody(id).name).join(' · ')}
                </p>
              ) : null}
              {event.upcoming && !event.targetMs ? (
                <>
                  <p className="inspect-soon">Yakında: 1 Haziran 2030, Türkiye halkalı tutulması</p>
                  <ul className="inspect-facts inspect-upcoming">
                    {event.upcoming.map((row) => (
                      <li key={row.date}>
                        <strong>{row.date}</strong> {row.text}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </>
          )}
          {eventHasMore(event) ? (
            <button type="button" className="text-link inspect-more" onClick={() => setMoreEvent((open) => !open)}>
              {moreEvent ? 'Daha az' : 'Daha fazla'}
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
                {KIND[body.category]}
              </p>
              <h2>{body.name}</h2>
            </div>
            <button type="button" className="icon-btn" onClick={() => useSimulationStore.getState().selectBody(null)} aria-label="Kapat">
              ×
            </button>
          </header>
          <p className="inspect-lead">{more ? body.description : firstSentence(body.description)}</p>
          <p className="inspect-atmo-chip">
            <span>Atmosfer</span>
            <strong>{atmosphereChip(body)}</strong>
          </p>
          <div className="inspect-stats">
            {coreRows(body).map((row) => (
              <Stat key={row.label} label={row.label} value={row.value} />
            ))}
            {more
              ? extraRows(body).map((row) => <Stat key={row.label} label={row.label} value={row.value} />)
              : null}
          </div>
          {more ? (
            <p className="inspect-atmo">
              <span>Atmosfer</span>
              {body.atmosphere}
            </p>
          ) : null}
          <ul className="inspect-facts">
            {(more ? body.facts : body.facts.slice(0, 1)).map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
          <button type="button" className="text-link inspect-more" onClick={() => setMore((open) => !open)}>
            {more ? 'Daha az' : 'Daha fazla'}
          </button>
        </div>
      ) : null}
      {!body && craft ? (
        <div className="inspect-card">
          <header className="panel-head">
            <div>
              <p className="eyebrow">
                <i className="body-swatch" style={{ background: craft.color }} aria-hidden="true" />
                {CRAFT_KIND_LABEL[craft.kind]}
              </p>
              <h2>{craft.name}</h2>
            </div>
            <button type="button" className="icon-btn" onClick={() => useSimulationStore.getState().selectWonder(null)} aria-label="Kapat">
              ×
            </button>
          </header>
          <p className="inspect-lead">{more ? craft.description : craft.fact}</p>
          <div className="inspect-stats">
            <Stat label="Tür" value={CRAFT_KIND_LABEL[craft.kind]} />
            <Stat label="Özellik" value={craft.tag} />
          </div>
          {more ? (
            <ul className="inspect-facts">
              {craft.facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          ) : null}
          <button type="button" className="text-link inspect-more" onClick={() => setMore((open) => !open)}>
            {more ? 'Daha az' : 'Daha fazla'}
          </button>
        </div>
      ) : null}
      {!body && constellation ? (
        <div className="inspect-card">
          <header className="panel-head">
            <div>
              <p className="eyebrow">Takımyıldız · {constellation.season}</p>
              <h2>{constellation.name}</h2>
            </div>
            <button type="button" className="icon-btn" onClick={() => useSimulationStore.getState().selectWonder(null)} aria-label="Kapat">
              ×
            </button>
          </header>
          <p className="inspect-atmo-chip">
            <span>Şekil</span>
            <strong>{constellation.shape}</strong>
          </p>
          <p className="inspect-lead">{constellation.description}</p>
          <ConstellationSilhouette constellation={constellation} />
          <div className="inspect-stats">
            <Stat label="En parlak" value={constellation.brightest} />
            <Stat label="Mevsim" value={constellation.season} />
            <Stat label="Yıldız" value={String(constellation.stars.length)} />
          </div>
          <p className="inspect-see">
            <span>Sahnede</span>
            {constellation.see}
          </p>
          {more ? (
            <ul className="inspect-facts">
              {constellation.facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
              <li>Parlak yıldızlar: {constellation.stars.map((star) => star.name).join(' · ')}</li>
            </ul>
          ) : (
            <ul className="inspect-facts">
              {constellation.facts.slice(0, 2).map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          )}
          <button type="button" className="text-link inspect-more" onClick={() => setMore((open) => !open)}>
            {more ? 'Daha az' : 'Daha fazla'}
          </button>
        </div>
      ) : null}
      {!body && !craft && !constellation && wonder ? (
        <div className="inspect-card">
          <header className="panel-head">
            <div>
              <p className="eyebrow">{wonderKindLabel(wonder.kind)}</p>
              <h2>{starDisplayName(wonder)}</h2>
            </div>
            <button type="button" className="icon-btn" onClick={() => useSimulationStore.getState().selectWonder(null)} aria-label="Kapat">
              ×
            </button>
          </header>
          <p className="inspect-lead">{wonder.fact}</p>
          <div className="inspect-stats">
            {wonderPreviewStats(wonder).map((row) => (
              <Stat key={row.label} label={row.label} value={row.value} />
            ))}
            {more
              ? wonderDetailStats(wonder).map((row) => (
                  <Stat key={row.label} label={row.label} value={row.value} />
                ))
              : null}
          </div>
          {more && wonderFactList(wonder, true).length > 0 ? (
            <ul className="inspect-facts">
              {wonderFactList(wonder, true).map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          ) : null}
          {wonderHasDetail(wonder) ? (
            <button type="button" className="text-link inspect-more" onClick={() => setMore((open) => !open)}>
              {more ? 'Daha az' : 'Daha fazla'}
            </button>
          ) : null}
        </div>
      ) : null}
    </aside>
  )
}
