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

function planetRows(body: PlanetDefinition): { label: string; value: string }[] {
  const vsEarth = earthRelativeWeight(1, body.id).vsEarth
  const rows: { label: string; value: string }[] = [
    { label: 'Tür', value: KIND[body.category] },
    { label: 'Gün', value: formatHours(body.rotationPeriodHours) },
  ]
  if (body.orbitalPeriodDays > 0) {
    rows.push({ label: 'Yıl', value: formatDays(body.orbitalPeriodDays) })
  }
  if (body.category !== 'star' && body.category !== 'moon') {
    rows.push({ label: 'Uydu', value: formatNumberTr(body.moons) })
  }
  if (body.orbitalRadiusAu > 0 && body.category !== 'moon') {
    rows.push({ label: 'Güneş’e uzaklık', value: formatAu(body.orbitalRadiusAu) })
  }
  if (body.category === 'moon') {
    rows.push({ label: 'Dünya’ya uzaklık', value: formatAu(body.orbitalRadiusAu) })
  }
  rows.push({ label: 'Çap', value: formatKm(body.radiusKm * 2) })
  rows.push({
    label: 'Yerçekimi',
    value: body.id === 'earth' ? '1 × Dünya' : `${formatNumberTr(vsEarth, 2)} × Dünya`,
  })
  rows.push({ label: 'Sıcaklık', value: `${formatNumberTr(body.meanTempC, 0)} °C` })
  rows.push({ label: 'Eksen eğikliği', value: `${formatNumberTr(body.axialTiltDeg, body.axialTiltDeg < 1 ? 2 : 1)}°` })
  if (body.orbitalPeriodDays > 0) {
    rows.push({ label: 'Yörünge eğikliği', value: `${formatNumberTr(body.inclinationDeg, 2)}°` })
  }
  if (body.hasRings) rows.push({ label: 'Halka', value: 'Var' })
  return rows
}

export function InspectRail() {
  const leftOpen = useUiStore((s) => s.leftOpen)
  const bodyId = useSimulationStore((s) => s.selectedBodyId)
  const wonderId = useSimulationStore((s) => s.selectedWonderId)

  if (!leftOpen) return null

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
          <p className="inspect-lead">{body.description}</p>
          <div className="inspect-stats">
            {planetRows(body).map((row) => (
              <Stat key={row.label} label={row.label} value={row.value} />
            ))}
          </div>
          <p className="inspect-atmo">
            <span>Atmosfer</span>
            {body.atmosphere}
          </p>
          <ul className="inspect-facts">
            {body.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
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
