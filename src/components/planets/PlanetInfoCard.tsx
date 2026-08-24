import { useState } from 'react'
import { getBody, getMoonsOf } from '../../astronomy/planetData'
import { formatAu, formatDays, formatHours, formatKm, formatNumberTr } from '../../utils/formatting'
import { AU_KM } from '../../astronomy/astronomyConstants'
import { useEducationStore } from '../../store/educationStore'
import { useSimulationStore } from '../../store/simulationStore'
import { focusBody, openCompare } from '../../features/planetExplorer/focus'

const TABS = ['Bilgi', 'Keşfet', 'Karşılaştır', 'Yörünge', 'Dönüş', 'Uydular'] as const

export function PlanetInfoCard() {
  const id = useSimulationStore((s) => s.selectedBodyId)
  const showAxes = useSimulationStore((s) => s.showAxes)
  const setShowAxes = useSimulationStore((s) => s.setShowAxes)
  const notifyAxes = useEducationStore((s) => s.notifyAxesVisible)
  const [tab, setTab] = useState<(typeof TABS)[number]>('Bilgi')

  if (!id) return null
  const body = getBody(id)

  return (
    <aside className="info-card" aria-label={`${body.name} bilgisi`}>
      <header className="panel-head">
        <div>
          <p className="eyebrow">{body.englishName}</p>
          <h2>{body.name}</h2>
        </div>
        <button type="button" className="icon-btn" onClick={() => useSimulationStore.getState().selectBody(null)} aria-label="Kapat">
          ×
        </button>
      </header>
      <div className="tabs" role="tablist">
        {TABS.map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={tab === item}
            className={tab === item ? 'is-active' : ''}
            onClick={() => setTab(item)}
          >
            {item}
          </button>
        ))}
      </div>
      {tab === 'Bilgi' ? (
        <div>
          <p>{body.description}</p>
          <ul className="stats">
            <li>
              <span>{body.category === 'moon' && body.parentId ? `${getBody(body.parentId).name}’e uzaklığı` : 'Güneş’e uzaklığı'}</span>
              <strong>{body.orbitalRadiusAu > 0 ? `${formatAu(body.orbitalRadiusAu)} (${formatKm(body.orbitalRadiusAu * AU_KM)})` : 'Merkez'}</strong>
            </li>
            <li>
              <span>Çapı</span>
              <strong>{formatKm(body.radiusKm * 2)}</strong>
            </li>
            <li>
              <span>Bir yılı (dolanma)</span>
              <strong>{body.orbitalPeriodDays > 0 ? formatDays(body.orbitalPeriodDays) : '—'}</strong>
            </li>
            <li>
              <span>Bir günü (dönme)</span>
              <strong>{formatHours(body.rotationPeriodHours)}</strong>
            </li>
            <li>
              <span>Uydu sayısı</span>
              <strong>{formatNumberTr(body.moons)}</strong>
            </li>
            <li>
              <span>Eksen eğikliği</span>
              <strong>{formatNumberTr(body.axialTiltDeg, 2)}°</strong>
            </li>
            <li>
              <span>Atmosfer</span>
              <strong>{body.atmosphere}</strong>
            </li>
            <li>
              <span>Sıcaklık</span>
              <strong>{formatNumberTr(body.meanTempC, 0)} °C</strong>
            </li>
          </ul>
        </div>
      ) : null}
      {tab === 'Keşfet' ? (
        <ul className="facts">
          {body.facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      ) : null}
      {tab === 'Karşılaştır' ? (
        <p>
          {body.name} ile başka bir cismi karşılaştır.
          <button
            type="button"
            className="btn"
            onClick={() => openCompare(id)}
          >
            Karşılaştırma aç
          </button>
        </p>
      ) : null}
      {tab === 'Yörünge' ? (
        <div>
          <p>
            <strong>Dolanma</strong>, {body.name} cisminin Güneş (veya ana cisim) etrafındaki turudur.
          </p>
          <ul className="stats">
            <li>
              <span>Yörünge süresi</span>
              <strong>{body.orbitalPeriodDays > 0 ? formatDays(body.orbitalPeriodDays) : '—'}</strong>
            </li>
            <li>
              <span>Dış merkezlik</span>
              <strong>{formatNumberTr(body.eccentricity, 3)}</strong>
            </li>
            <li>
              <span>Yörünge eğimi</span>
              <strong>{formatNumberTr(body.inclinationDeg, 2)}°</strong>
            </li>
          </ul>
        </div>
      ) : null}
      {tab === 'Dönüş' ? (
        <div>
          <p>
            <strong>Dönme</strong>, cismin kendi ekseni etrafındaki dönüşüdür. <strong>Dolanma</strong> ise Güneş etrafındaki yolculuğudur.
          </p>
          <ul className="stats">
            <li>
              <span>Dönme süresi</span>
              <strong>{formatHours(body.rotationPeriodHours)}</strong>
            </li>
            <li>
              <span>Eksen eğikliği</span>
              <strong>{formatNumberTr(body.axialTiltDeg, 2)}°</strong>
            </li>
          </ul>
          <button
            type="button"
            className="btn"
            aria-pressed={showAxes}
            onClick={() => {
              const next = !showAxes
              setShowAxes(next)
              notifyAxes(next, id)
            }}
          >
            {showAxes ? 'Yana yatmayı gizle' : 'Yana yatmayı göster'}
          </button>
        </div>
      ) : null}
      {tab === 'Uydular' ? (
        <div>
          {body.category === 'moon' && body.parentId ? (
            <>
              <p>
                {body.name}, {getBody(body.parentId).name}’in uydusudur.
              </p>
              <p className="muted">
                Uzaklık: {formatKm(body.orbitalRadiusAu * AU_KM)} ({formatAu(body.orbitalRadiusAu)}).
              </p>
              <button type="button" className="btn" onClick={() => focusBody(body.parentId!)}>
                {getBody(body.parentId).name}’e git
              </button>
            </>
          ) : (
            <>
              <p>
                {body.name} cisminin bilinen uydu sayısı: <strong>{formatNumberTr(body.moons)}</strong>.
              </p>
              {getMoonsOf(body.id).length > 0 ? (
                <ul className="stats">
                  {getMoonsOf(body.id).map((moon) => (
                    <li key={moon.id}>
                      <span>{moon.name}</span>
                      <button type="button" className="text-link" onClick={() => focusBody(moon.id)}>
                        Git
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="muted">Sahnede gösterilen büyük uydusu yok.</p>
              )}
              {body.id === 'earth' ? (
                <div>
                  <p>Ay neden hep aynı yüzünü gösteriyor?</p>
                  <p className="muted">
                    Ay’ın kendi ekseni etrafında dönme süresi ile Dünya etrafındaki dolanma süresi eşittir. Buna gelgit
                    kilidi denir.
                  </p>
                </div>
              ) : null}
            </>
          )}
        </div>
      ) : null}
    </aside>
  )
}
