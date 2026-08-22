import { useEffect, useState } from 'react'
import { getBody } from '../../astronomy/planetData'
import { findWonder } from '../../content/skyWonders'
import { earthRelativeWeight } from '../../features/lab/gravityMath'
import { formatAu, formatDays, formatHours, formatKm, formatNumberTr } from '../../utils/formatting'
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
    rows.push({ label: 'Dünya’ya uzaklık', value: formatAu(body.orbitalRadiusAu) })
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
  const listOpen = useUiStore((s) => s.planetDrawerOpen || s.starDrawerOpen)
  const chatOpen = useUiStore((s) => s.sunChatOpen)
  const panel = useUiStore((s) => s.activePanel)
  const bodyId = useSimulationStore((s) => s.selectedBodyId)
  const wonderId = useSimulationStore((s) => s.selectedWonderId)
  const [more, setMore] = useState(false)

  useEffect(() => {
    setMore(false)
  }, [bodyId, wonderId])

  if (!leftOpen || listOpen || chatOpen || panel !== 'none') return null

  const body = bodyId ? getBody(bodyId) : null
  const wonder = findWonder(wonderId)
  if (!body && !wonder) return null

  return (
    <aside className="inspect-rail" aria-label="Seçim bilgisi">
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
      {!body && wonder ? (
        <div className="inspect-card">
          <header className="panel-head">
            <div>
              <p className="eyebrow">{wonder.kind === 'star' ? 'Yıldız' : 'Küçük cisim'}</p>
              <h2>{wonder.name}</h2>
            </div>
            <button type="button" className="icon-btn" onClick={() => useSimulationStore.getState().selectWonder(null)} aria-label="Kapat">
              ×
            </button>
          </header>
          <p className="inspect-lead">{wonder.fact}</p>
          <div className="inspect-stats">
            <Stat label="Tür" value={wonder.kind === 'star' ? 'Yıldız' : 'Küçük cisim'} />
            <Stat label="Özellik" value={wonder.tag} />
          </div>
        </div>
      ) : null}
    </aside>
  )
}
