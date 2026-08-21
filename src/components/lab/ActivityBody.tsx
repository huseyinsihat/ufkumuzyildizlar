import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { TIME_PRESETS } from '../../astronomy/timeEngine'
import { getBody } from '../../astronomy/planetData'
import { earthRelativeWeight } from '../../features/lab/gravityMath'
import { earthYearTours } from '../../features/lab/orbitMath'
import { isFullMoon, moonPhaseName } from '../../features/lab/orbitMath'
import { lightTravelLabel } from '../../features/lab/wowMath'
import { getScene } from '../../scene/sceneApi'
import { useLabStore } from '../../store/labStore'
import { useSimulationStore } from '../../store/simulationStore'
import { PhysicsCanvas } from './PhysicsCanvas'
import type { BodyId } from '../../types/planet'
import { NOTABLE_STARS } from '../../content/skyWonders'

const yearScale = TIME_PRESETS.find((item) => item.id === 'year')?.scale ?? 86_400 * 365
const dayScale = TIME_PRESETS.find((item) => item.id === 'day')?.scale ?? 86_400

export function EarthYearLab() {
  const tours = useLabStore((s) => s.yearTours)
  const step = useLabStore((s) => s.step)
  const setStep = useLabStore((s) => s.setStep)
  const rows = tours.length ? tours : earthYearTours()

  return (
    <div>
      {step === 'simulate' ? (
        <button
          type="button"
          className="btn primary"
          onClick={() => {
            useSimulationStore.getState().setTimeScale(yearScale)
            useSimulationStore.getState().setPlaying(true)
            getScene()?.startEarthYearWatch()
          }}
        >
          1 yılı başlat
        </button>
      ) : null}
      {step === 'result' ? (
        <ul className="tour-list">
          {rows.map((row) => (
            <li key={row.id}>
              <span>{row.name}</span>
              <strong>{row.tours.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} tur</strong>
              <i style={{ width: `${Math.min(row.tours * 22, 100)}%` }} />
            </li>
          ))}
        </ul>
      ) : null}
      {step === 'simulate' ? (
        <button type="button" className="text-link" onClick={() => setStep('result')}>
          Sonucu şimdi göster
        </button>
      ) : null}
    </div>
  )
}

const RACE_GUESSES = [
  { id: 'mercury', label: 'Merkür' },
  { id: 'earth', label: 'Dünya' },
  { id: 'same', label: 'Aynı anda' },
] as const

export function WhoFasterLab() {
  const step = useLabStore((s) => s.step)
  const prediction = useLabStore((s) => s.prediction)
  const setPrediction = useLabStore((s) => s.setPrediction)
  const correct = prediction === 'mercury'

  return (
    <div>
      {step === 'simulate' && !prediction ? (
        <div>
          <p className="muted">Önce tahmin et: kim önce tur atar?</p>
          <div className="choice-row">
            {RACE_GUESSES.map((item) => (
              <button key={item.id} type="button" className="chip" onClick={() => setPrediction(item.id)}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
      {step === 'simulate' && prediction ? (
        <div>
          <p className="muted">Tahminin kilitlendi. Yarışı izle.</p>
          <button
            type="button"
            className="btn primary"
            onClick={() => {
              useSimulationStore.getState().setCompare('mercury', 'earth')
              useSimulationStore.getState().selectBody('mercury')
              useSimulationStore.getState().setTimeScale(yearScale)
              useSimulationStore.getState().setPlaying(true)
              getScene()?.startOrbitRace('mercury', 'earth')
            }}
          >
            Yarışı başlat
          </button>
          <button
            type="button"
            className="text-link"
            onClick={() => {
              useLabStore.getState().setRaceWinner('mercury')
              useLabStore.getState().setStep('result')
              useSimulationStore.getState().setPlaying(false)
            }}
          >
            Sonucu şimdi göster
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <p>
          {correct ? <strong className="success">Doğru.</strong> : <strong>Yanlış.</strong>} Kazanan Merkür.
          {prediction ? ` Tahminin: ${RACE_GUESSES.find((item) => item.id === prediction)?.label}.` : ''} Merkür daha kısa yörüngede dolanır.
        </p>
      ) : null}
    </div>
  )
}

export function SpinOrbitLab() {
  const freezeR = useSimulationStore((s) => s.freezeRotation)
  const freezeO = useSimulationStore((s) => s.freezeRevolution)
  const setR = useSimulationStore((s) => s.setFreezeRotation)
  const setO = useSimulationStore((s) => s.setFreezeRevolution)
  const setStep = useLabStore((s) => s.setStep)
  const prediction = useLabStore((s) => s.prediction)
  const setPrediction = useLabStore((s) => s.setPrediction)
  const step = useLabStore((s) => s.step)
  const correct = prediction === 'spin'

  return (
    <div>
      {step === 'simulate' && !prediction ? (
        <div>
          <p className="muted">Gece-gündüz için hangisi gerekir?</p>
          <div className="choice-row">
            <button type="button" className="chip" onClick={() => setPrediction('spin')}>
              Kendi etrafında dönmesi
            </button>
            <button type="button" className="chip" onClick={() => setPrediction('orbit')}>
              Güneş etrafında dolanması
            </button>
            <button type="button" className="chip" onClick={() => setPrediction('both')}>
              İkisi birden
            </button>
          </div>
        </div>
      ) : null}
      {step === 'simulate' && prediction ? (
        <div className="toggle-grid">
          <button type="button" className={`big-toggle ${freezeR ? 'is-on' : ''}`} onClick={() => setR(!freezeR)}>
            {freezeR ? 'Dönme durdu' : 'Kendi etrafında dönmesini durdur'}
          </button>
          <button type="button" className={`big-toggle ${freezeO ? 'is-on' : ''}`} onClick={() => setO(!freezeO)}>
            {freezeO ? 'Dolanma durdu' : 'Güneş etrafındaki hareketini durdur'}
          </button>
          <button
            type="button"
            className="btn primary"
            onClick={() => {
              useSimulationStore.getState().setPlaying(true)
              useSimulationStore.getState().setTimeScale(dayScale)
              setStep('result')
            }}
          >
            Gözledim
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <p>
          {correct ? <strong className="success">Doğru.</strong> : <strong>Yanlış.</strong>} Gece ve gündüz dönmeden doğar; dolanma yılı yapar.
        </p>
      ) : null}
    </div>
  )
}

export function DayNightLab() {
  const setStep = useLabStore((s) => s.setStep)
  return (
    <div>
      <p className="muted">Camgöbeği İstanbul ve amber Diyarbakır pinlerini izle. Aynı ülkede batı ve doğu; geceye neredeyse birlikte girerler.</p>
      <button type="button" className="btn primary" onClick={() => setStep('result')}>
        Gördüm
      </button>
    </div>
  )
}

export function MassWeightLab() {
  const [kg, setKg] = useState(30)
  const setStep = useLabStore((s) => s.setStep)
  const prediction = useLabStore((s) => s.prediction)
  const setPrediction = useLabStore((s) => s.setPrediction)
  const step = useLabStore((s) => s.step)
  const earth = earthRelativeWeight(kg, 'earth')
  const moon = earthRelativeWeight(kg, 'moon')
  const mars = earthRelativeWeight(kg, 'mars')
  const correct = prediction === 'no'

  return (
    <div>
      {step === 'simulate' && !prediction ? (
        <div>
          <p className="muted">Ay’a gittiğinde kütlen değişir mi?</p>
          <div className="choice-row">
            <button type="button" className="chip" onClick={() => setPrediction('yes')}>
              Evet
            </button>
            <button type="button" className="chip" onClick={() => setPrediction('no')}>
              Hayır
            </button>
          </div>
        </div>
      ) : null}
      {step === 'simulate' && prediction ? (
        <div>
          <label>
            Kilon kaç?
            <input type="number" min={10} max={80} value={kg} onChange={(e) => setKg(Number(e.target.value))} />
            kg
          </label>
          <ul className="stats">
            <li>
              <span>Kütlem</span>
              <strong>{kg} kg (değişmez)</strong>
            </li>
            <li>
              <span>Dünya’da ağırlığın</span>
              <strong>{earth.kgf.toFixed(0)} kgf</strong>
            </li>
            <li>
              <span>Ay’da</span>
              <strong>{moon.kgf.toFixed(0)} kgf</strong>
            </li>
            <li>
              <span>Mars’ta</span>
              <strong>{mars.kgf.toFixed(0)} kgf</strong>
            </li>
          </ul>
          <button type="button" className="btn primary" onClick={() => setStep('result')}>
            Bunu gördüm
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <p>
          {correct ? <strong className="success">Doğru.</strong> : <strong>Yanlış.</strong>} Kütle aynı kalır; ağırlık yerçekimine göre değişir.
        </p>
      ) : null}
    </div>
  )
}

const DROP_GUESSES = [
  { id: 'moon', label: 'Ay' },
  { id: 'earth', label: 'Dünya' },
  { id: 'jupiter', label: 'Jüpiter' },
] as const

export function DropBallLab() {
  const [run, setRun] = useState(false)
  const setStep = useLabStore((s) => s.setStep)
  const prediction = useLabStore((s) => s.prediction)
  const setPrediction = useLabStore((s) => s.setPrediction)
  const step = useLabStore((s) => s.step)
  const correct = prediction === 'jupiter'

  return (
    <div>
      {step === 'simulate' && !prediction ? (
        <div>
          <p className="muted">Aynı yükseklikten bırakınca kim önce yere varır?</p>
          <div className="choice-row">
            {DROP_GUESSES.map((item) => (
              <button key={item.id} type="button" className="chip" onClick={() => setPrediction(item.id)}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
      {step === 'simulate' && prediction ? (
        <div>
          <p className="muted">Aynı yükseklikten bırakılan top; Ay’da yavaş, Dünya’da orta, Jüpiter’de hızla düşer.</p>
          <PhysicsCanvas mode="drop" running={run} />
          <div className="row-actions">
            <button
              type="button"
              className="btn primary"
              onClick={() => {
                setRun(false)
                requestAnimationFrame(() => setRun(true))
              }}
            >
              Topları bırak
            </button>
            <button type="button" className="btn" onClick={() => setStep('result')}>
              Sonucu gör
            </button>
          </div>
        </div>
      ) : null}
      {step === 'result' ? (
        <p>
          {correct ? <strong className="success">Doğru.</strong> : <strong>Yanlış.</strong>} Jüpiter’de yerçekimi en büyük; top önce orada düşer.
        </p>
      ) : null}
    </div>
  )
}

export function JumpLab() {
  const [body, setBody] = useState<BodyId>('earth')
  const [run, setRun] = useState(false)
  const setStep = useLabStore((s) => s.setStep)
  const prediction = useLabStore((s) => s.prediction)
  const setPrediction = useLabStore((s) => s.setPrediction)
  const step = useLabStore((s) => s.step)
  const correct = prediction === 'moon'

  return (
    <div>
      {step === 'simulate' && !prediction ? (
        <div>
          <p className="muted">Aynı zıplama ile nerede daha yükseğe çıkarsın?</p>
          <div className="choice-row">
            {(['moon', 'earth', 'jupiter'] as BodyId[]).map((id) => (
              <button key={id} type="button" className="chip" onClick={() => setPrediction(id)}>
                {getBody(id).name}
              </button>
            ))}
          </div>
        </div>
      ) : null}
      {step === 'simulate' && prediction ? (
        <div>
          <div className="choice-row">
            {(['moon', 'earth', 'jupiter'] as BodyId[]).map((id) => (
              <button key={id} type="button" className={`chip ${body === id ? 'is-active' : ''}`} onClick={() => setBody(id)}>
                {getBody(id).name}
              </button>
            ))}
          </div>
          <PhysicsCanvas mode="jump" running={run} bodyId={body} />
          <div className="row-actions">
            <button
              type="button"
              className="btn primary"
              onClick={() => {
                setRun(false)
                requestAnimationFrame(() => setRun(true))
              }}
            >
              Zıplat
            </button>
            <button type="button" className="btn" onClick={() => setStep('result')}>
              Sonucu gör
            </button>
          </div>
        </div>
      ) : null}
      {step === 'result' ? (
        <p>
          {correct ? <strong className="success">Doğru.</strong> : <strong>Yanlış.</strong>} Ay’da g küçük olduğu için aynı hızla daha yükseğe çıkarsın.
        </p>
      ) : null}
    </div>
  )
}

export function RealScaleLab() {
  const setStep = useLabStore((s) => s.setStep)
  const mode = useSimulationStore((s) => s.scaleMode)
  const prediction = useLabStore((s) => s.prediction)
  const setPrediction = useLabStore((s) => s.setPrediction)
  const step = useLabStore((s) => s.step)
  const correct = prediction === 'model'

  return (
    <div>
      {step === 'simulate' && !prediction ? (
        <div>
          <p className="muted">Neden modellerde gezegenler gerçektekinden büyük gösterilir?</p>
          <div className="choice-row">
            <button type="button" className="chip" onClick={() => setPrediction('wrong')}>
              Çünkü gerçekte de öyle büyükler
            </button>
            <button type="button" className="chip" onClick={() => setPrediction('model')}>
              Yoksa gezegenler görünmez olurdu
            </button>
          </div>
        </div>
      ) : null}
      {step === 'simulate' && prediction ? (
        <div className="choice-row">
          <button
            type="button"
            className={`big-toggle ${mode === 'educational' ? 'is-on' : ''}`}
            onClick={() => {
              useSimulationStore.getState().setScaleMode('educational')
              getScene()?.focusOverview()
            }}
          >
            Görsel ölçek
          </button>
          <button
            type="button"
            className={`big-toggle ${mode === 'trueScale' ? 'is-on' : ''}`}
            onClick={() => {
              useSimulationStore.getState().setScaleMode('trueScale')
              getScene()?.focusOverview()
            }}
          >
            Gerçek oran
          </button>
          <button type="button" className="btn primary" onClick={() => setStep('result')}>
            Bunu gördüm
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <p>
          {correct ? <strong className="success">Doğru.</strong> : <strong>Yanlış.</strong>} Gerçek oranlarda gezegenler nokta kadar kalır; bu bir modeldir.
        </p>
      ) : null}
    </div>
  )
}

const ORDER: BodyId[] = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune']
const RING_R = [18, 28, 38, 48, 58, 68, 78, 88]
const ORDER_LABEL = ORDER.map((id) => getBody(id).name).join(' → ')

function shuffleIds(): BodyId[] {
  return [...ORDER].sort(() => Math.random() - 0.5)
}

export function ArrangeOrbitsLab() {
  const [slots, setSlots] = useState<(BodyId | null)[]>(() => Array(8).fill(null))
  const [pool, setPool] = useState<BodyId[]>(shuffleIds)
  const [pick, setPick] = useState<BodyId | null>(null)
  const [shake, setShake] = useState<number | null>(null)
  const [lives, setLives] = useState(3)
  const [startedAt, setStartedAt] = useState<number | null>(null)
  const [elapsed, setElapsed] = useState<number | null>(null)
  const setStep = useLabStore((s) => s.setStep)
  const ready = slots.every((slot, index) => slot === ORDER[index])
  const placed = slots.filter(Boolean).length
  const dead = lives <= 0 && !ready

  function restart() {
    setSlots(Array(8).fill(null))
    setPool(shuffleIds())
    setPick(null)
    setShake(null)
    setLives(3)
    setStartedAt(null)
    setElapsed(null)
  }

  function dropOn(index: number) {
    if (!pick || dead || ready) return
    if (ORDER[index] !== pick || slots[index]) {
      setShake(index)
      window.setTimeout(() => setShake((current) => (current === index ? null : current)), 420)
      setLives((current) => Math.max(0, current - 1))
      return
    }
    const now = performance.now()
    const start = startedAt ?? now
    const nextSlots = [...slots]
    nextSlots[index] = pick
    const done = nextSlots.every((slot, i) => slot === ORDER[i])
    setSlots(nextSlots)
    setPool((current) => current.filter((id) => id !== pick))
    setPick(null)
    if (!startedAt) setStartedAt(now)
    if (done) setElapsed((now - start) / 1000)
  }

  return (
    <div className="orbit-lab">
      <p className="lives-row" aria-label={`${lives} can`}>
        {[0, 1, 2].map((index) => (
          <i key={index} className={`life-dot ${index >= lives ? 'is-gone' : ''}`} />
        ))}
        <span>{dead ? 'Can bitti' : `${lives} can`}</span>
      </p>
      <p className="muted">
        {dead
          ? 'Yanlış halkalar canını bitirdi. Yeniden dene.'
          : ready
            ? `Sıra: ${ORDER_LABEL}`
            : pick
              ? `${getBody(pick).name} için doğru halkaya dokun. Merkür içte, Neptün dışta.`
              : 'Karışık pullardan birini seç, sonra halkaya bırak.'}
      </p>
      <svg className="orbit-board" viewBox="0 0 260 240" aria-label="Yörünge tahtası">
        <circle cx="120" cy="120" r="11" fill="#F7C14A" />
        <text x="120" y="124" textAnchor="middle" className="orbit-sun-label">
          Güneş
        </text>
        {ORDER.map((id, index) => {
          const r = RING_R[index]
          const filled = slots[index]
          const body = filled ? getBody(filled) : null
          const ang = ((index * 45 - 18) * Math.PI) / 180
          const px = 120 + Math.cos(ang) * r
          const py = 120 + Math.sin(ang) * r
          const lx = px + Math.cos(ang) * 14
          const ly = py + Math.sin(ang) * 4
          return (
            <g key={id} className={shake === index ? 'ring-shake' : undefined}>
              <circle
                cx="120"
                cy="120"
                r={r}
                fill="none"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="10"
                className="orbit-hit"
                pointerEvents="stroke"
                onClick={() => dropOn(index)}
              />
              <circle
                cx="120"
                cy="120"
                r={r}
                fill="none"
                stroke={filled ? 'rgba(251, 191, 36, 0.9)' : 'rgba(255,255,255,0.32)'}
                strokeWidth={filled ? 2.4 : 1.5}
                strokeDasharray={filled ? undefined : '3 3'}
                pointerEvents="none"
              />
              {body ? (
                <>
                  <circle cx={px} cy={py} r="7" fill={body.color} />
                  <text x={lx} y={ly + 3} textAnchor="middle" className="orbit-token-label">
                    {body.name}
                  </text>
                </>
              ) : (
                <text x={px} y={py + 3} textAnchor="middle" className="orbit-index">
                  {index + 1}
                </text>
              )}
            </g>
          )
        })}
      </svg>
      {ready && elapsed !== null ? (
        <p className="success">
          8/8 · {elapsed.toLocaleString('tr-TR', { maximumFractionDigits: 1 })} sn
        </p>
      ) : (
        <p className="muted">{placed}/8 halka doldu</p>
      )}
      <div className="choice-row planet-pills">
        {pool.map((id) => {
          const body = getBody(id)
          return (
            <button
              key={id}
              type="button"
              className={`chip planet-pill ${pick === id ? 'is-active' : ''}`}
              style={{ '--pill': body.color } as CSSProperties}
              disabled={dead}
              onClick={() => setPick(id)}
            >
              {body.name}
            </button>
          )
        })}
      </div>
      {dead ? (
        <button type="button" className="btn primary" onClick={restart}>
          Yeniden dene
        </button>
      ) : (
        <button
          type="button"
          className="btn primary"
          disabled={!ready}
          onClick={() => {
            useLabStore.getState().resetActivityScene()
            useSimulationStore.getState().setPlaying(true)
            setStep('result')
          }}
        >
          3B’ye bak
        </button>
      )}
    </div>
  )
}

export function MoonPhasesLab() {
  const deg = useLabStore((s) => s.moonPhaseDeg)
  const setStep = useLabStore((s) => s.setStep)
  const prediction = useLabStore((s) => s.prediction)
  const setPrediction = useLabStore((s) => s.setPrediction)
  const step = useLabStore((s) => s.step)
  const full = isFullMoon(deg)
  const correct = prediction === 'light'

  return (
    <div className="activity-stage">
      {step === 'simulate' && !prediction ? (
        <div>
          <p className="muted">Ay gerçekten ezilip büyüyor mu?</p>
          <div className="choice-row">
            <button type="button" className="chip" onClick={() => setPrediction('shape')}>
              Evet, şekli değişiyor
            </button>
            <button type="button" className="chip" onClick={() => setPrediction('light')}>
              Hayır, aydınlık dilim değişiyor
            </button>
          </div>
        </div>
      ) : null}
      {step === 'simulate' && prediction ? (
        <div>
          <p>
            Şimdi Ay’ı <strong>Dünya’nın karanlık tarafına</strong> sürükle. Güneş–Dünya–Ay neredeyse bir çizgi olunca dolunay olur.
          </p>
          <p>
            Evre: <strong>{moonPhaseName(deg)}</strong>
          </p>
          {full ? <p className="success">Dolunay oldu. Devam et.</p> : <p className="muted">Henüz dolunay değil — Ay’ı çekmeye devam et.</p>}
          <button type="button" className="btn primary" disabled={!full} onClick={() => setStep('result')}>
            {full ? 'Devam et' : 'Önce dolunayı yakala'}
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <p>
          {correct ? <strong className="success">Doğru.</strong> : <strong>Yanlış.</strong>} Ay’ın şekli değişmez; gördüğümüz aydınlık dilim değişir.
        </p>
      ) : null}
    </div>
  )
}

export function StarsOrEarthLab() {
  const setStep = useLabStore((s) => s.setStep)
  const prediction = useLabStore((s) => s.prediction)
  const setPrediction = useLabStore((s) => s.setPrediction)
  const step = useLabStore((s) => s.step)
  const correct = prediction === 'earth'

  return (
    <div>
      {step === 'simulate' && !prediction ? (
        <div>
          <p className="muted">Yıldızlar mı kayıyor, Dünya mı dönüyor?</p>
          <div className="choice-row">
            <button type="button" className="chip" onClick={() => setPrediction('stars')}>
              Yıldızlar hareket ediyor
            </button>
            <button type="button" className="chip" onClick={() => setPrediction('earth')}>
              Dünya dönüyor
            </button>
          </div>
        </div>
      ) : null}
      {step === 'simulate' && prediction ? (
        <div className="choice-row">
          <button
            type="button"
            className="chip"
            onClick={() => {
              useSimulationStore.getState().setSkyCamera(true)
              useSimulationStore.getState().setTimeScale(3600 * 6)
              useSimulationStore.getState().setPlaying(true)
              getScene()?.enterSkyView()
            }}
          >
            Gökyüzünü hızlandır
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              useSimulationStore.getState().setSkyCamera(false)
              useSimulationStore.getState().selectBody('earth')
              getScene()?.focusEarthSurface()
              useSimulationStore.getState().setTimeScale(dayScale)
            }}
          >
            Dünya’nın dönüşünü göster
          </button>
          <button type="button" className="btn primary" onClick={() => setStep('result')}>
            Bunu gördüm
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <p>
          {correct ? <strong className="success">Doğru.</strong> : <strong>Yanlış.</strong>} Dünya döndüğü için gökyüzü kayıyor gibi görünür.
        </p>
      ) : null}
    </div>
  )
}

export function StarNamesLab() {
  const [quiz] = useState(() => [...NOTABLE_STARS].sort(() => Math.random() - 0.5).slice(0, 3))
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const setStep = useLabStore((s) => s.setStep)
  const step = useLabStore((s) => s.step)
  const prediction = useLabStore((s) => s.prediction)
  const current = quiz[index] ?? quiz[0]
  const options = useMemo(() => {
    if (!current) return []
    const decoys = NOTABLE_STARS.filter((star) => star.id !== current.id).sort(() => Math.random() - 0.5).slice(0, 2)
    return [current, ...decoys].sort(() => Math.random() - 0.5)
  }, [current])

  useEffect(() => {
    if (current) getScene()?.focusWonder(current.id)
  }, [current])

  function choose(id: string) {
    if (!current) return
    const nextScore = score + (id === current.id ? 1 : 0)
    setScore(nextScore)
    if (index >= quiz.length - 1) {
      useLabStore.setState({ prediction: String(nextScore) })
      setStep('result')
      return
    }
    setIndex(index + 1)
  }

  if (!current) return null

  return (
    <div>
      {step === 'simulate' ? (
        <div>
          <p className="muted">
            {index + 1}/{quiz.length} · Kameranın baktığı yıldızı seç.
          </p>
          <div className="choice-row">
            {options.map((star) => (
              <button key={star.id} type="button" className="chip" onClick={() => choose(star.id)}>
                {star.name}
              </button>
            ))}
          </div>
        </div>
      ) : null}
      {step === 'result' ? (
        <p>
          <strong className="success">{prediction ?? score}/3 doğru.</strong> Her yıldızın adı ve rengi farklıdır.
        </p>
      ) : null}
    </div>
  )
}

export function SpaceMissionLab() {
  const index = useLabStore((s) => s.missionIndex)
  const setIndex = useLabStore((s) => s.setMissionIndex)
  const start = useLabStore((s) => s.startActivity)
  const setStep = useLabStore((s) => s.setStep)
  const steps = [
    'Mars’ı seç ve yörüngesini aç.',
    'Mars’ın bir yılının neden daha uzun olduğunu düşün — sonra Dünya yılı simülasyonuna bak.',
    'Ay’a git ve dolunay hizasını dene.',
    'Ay’daki yerçekimini zıplama simülasyonunda gör.',
  ]

  return (
    <div>
      <p>
        Görev {index + 1} / {steps.length}
      </p>
      <p>{steps[index]}</p>
      <div className="row-actions">
        {index === 0 ? (
          <button
            type="button"
            className="btn primary"
            onClick={() => {
              useSimulationStore.getState().selectBody('mars')
              useSimulationStore.getState().setShowOrbits(true)
              getScene()?.focusBody('mars')
              setIndex(1)
            }}
          >
            Mars’a git
          </button>
        ) : null}
        {index === 1 ? (
          <button type="button" className="btn primary" onClick={() => start('earth-year')}>
            Dünya yılına git
          </button>
        ) : null}
        {index === 2 ? (
          <button type="button" className="btn primary" onClick={() => start('moon-phases')}>
            Ay evrelerine git
          </button>
        ) : null}
        {index === 3 ? (
          <button type="button" className="btn primary" onClick={() => start('jump')}>
            Zıplamayı aç
          </button>
        ) : null}
        {index < 3 ? (
          <button type="button" className="btn" onClick={() => setIndex(index + 1)}>
            Adımı tamamladım
          </button>
        ) : (
          <button type="button" className="btn primary" onClick={() => setStep('result')}>
            Görevi bitir
          </button>
        )}
      </div>
    </div>
  )
}

export function LightTravelLab() {
  const progress = useLabStore((s) => s.lightProgress)
  const seconds = useLabStore((s) => s.lightSeconds)
  const arrived = useLabStore((s) => s.lightArrived)
  const setStep = useLabStore((s) => s.setStep)
  const prediction = useLabStore((s) => s.prediction)
  const setPrediction = useLabStore((s) => s.setPrediction)
  const step = useLabStore((s) => s.step)
  const shown = Math.round(progress * seconds)
  const mm = Math.floor(shown / 60)
  const ss = shown % 60
  const correct = prediction === 'minutes'

  return (
    <div>
      {step === 'simulate' && !prediction ? (
        <div>
          <p className="muted">Güneş ışığı Dünya’ya anında mı ulaşır?</p>
          <div className="choice-row">
            <button type="button" className="chip" onClick={() => setPrediction('instant')}>
              Anında
            </button>
            <button type="button" className="chip" onClick={() => setPrediction('minutes')}>
              Birkaç dakikada
            </button>
          </div>
        </div>
      ) : null}
      {step === 'simulate' && prediction ? (
        <div>
          <p className="muted">
            {mm}:{String(ss).padStart(2, '0')} / {lightTravelLabel(seconds > 800 ? 'jupiter' : 'earth')}
          </p>
          {arrived ? <p className="success">Işık vardı.</p> : null}
          <div className="row-actions">
            <button type="button" className="btn primary" onClick={() => getScene()?.startLightPulse('earth')}>
              Dünya’ya gönder
            </button>
            <button type="button" className="btn" onClick={() => getScene()?.startLightPulse('jupiter')}>
              Jüpiter’e gönder
            </button>
            <button type="button" className="btn primary" onClick={() => setStep('result')}>
              Bunu gördüm
            </button>
          </div>
        </div>
      ) : null}
      {step === 'result' ? (
        <p>
          {correct ? <strong className="success">Doğru.</strong> : <strong>Yanlış.</strong>} Işık Dünya’ya yaklaşık 8 dakika 20 saniyede gelir.
        </p>
      ) : null}
    </div>
  )
}

export function SeasonsTiltLab() {
  const setStep = useLabStore((s) => s.setStep)
  const prediction = useLabStore((s) => s.prediction)
  const setPrediction = useLabStore((s) => s.setPrediction)
  const step = useLabStore((s) => s.step)
  const correct = prediction === 'tilt'

  return (
    <div>
      {step === 'simulate' && !prediction ? (
        <div>
          <p className="muted">Kuzey’de yaz, Dünya Güneş’e yaklaştığı için mi olur?</p>
          <div className="choice-row">
            <button type="button" className="chip" onClick={() => setPrediction('closer')}>
              Evet, daha yakınız
            </button>
            <button type="button" className="chip" onClick={() => setPrediction('tilt')}>
              Hayır, eksen eğikliği
            </button>
          </div>
        </div>
      ) : null}
      {step === 'simulate' && prediction ? (
        <div className="toggle-grid">
          <button type="button" className="big-toggle" onClick={() => getScene()?.setSeasonDemo(false, 'jan')}>
            Eğikliği kapat
          </button>
          <button type="button" className="big-toggle is-on" onClick={() => getScene()?.setSeasonDemo(true, 'jan')}>
            Ocak · Kuzey kış
          </button>
          <button type="button" className="big-toggle" onClick={() => getScene()?.setSeasonDemo(true, 'jul')}>
            Temmuz · Kuzey yaz
          </button>
          <button type="button" className="btn primary" onClick={() => setStep('result')}>
            Bunu gördüm
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <p>
          {correct ? <strong className="success">Doğru.</strong> : <strong>Yanlış.</strong>} Dünya ocakta biraz daha yakındır ama Kuzey’de kıştır; mevsimlerin nedeni eğikliktir.
        </p>
      ) : null}
    </div>
  )
}

const HEAT_GUESSES = [
  { id: 'mercury', label: 'Merkür' },
  { id: 'venus', label: 'Venüs' },
  { id: 'earth', label: 'Dünya' },
] as const

const HEAT_TEMP: Record<(typeof HEAT_GUESSES)[number]['id'], number> = {
  mercury: 167,
  venus: 464,
  earth: 15,
}

export function ClosestHottestLab() {
  const setStep = useLabStore((s) => s.setStep)
  const prediction = useLabStore((s) => s.prediction)
  const setPrediction = useLabStore((s) => s.setPrediction)
  const step = useLabStore((s) => s.step)
  const correct = prediction === 'venus'
  const [blanket, setBlanket] = useState(true)

  return (
    <div>
      {step === 'simulate' && !prediction ? (
        <div>
          <p className="muted">Hangisinin yüzeyi en sıcaktır? Birine dokun.</p>
          <div className="heat-cards">
            {HEAT_GUESSES.map((item) => (
              <button
                key={item.id}
                type="button"
                className="chip heat-card"
                onClick={() => {
                  setPrediction(item.id)
                  getScene()?.setHeatCompare(true)
                  getScene()?.setVenusBlanket(true)
                }}
              >
                <strong>{item.label}</strong>
                <em>Dokun ve seç</em>
              </button>
            ))}
          </div>
        </div>
      ) : null}
      {step === 'simulate' && prediction ? (
        <div>
          <div className="heat-cards">
            {HEAT_GUESSES.map((item) => (
              <div key={item.id} className={`heat-card ${prediction === item.id ? 'is-on' : ''}`}>
                <strong>{item.label}</strong>
                <span>Yüzey ≈ {HEAT_TEMP[item.id]}°C</span>
                <div className="heat-bar">
                  <i style={{ width: `${Math.max(8, (HEAT_TEMP[item.id] / 464) * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="muted">Venüs’ün kalın atmosferi ısıyı tutar. Güneş’e en yakın gezegen en sıcak olmak zorunda değildir.</p>
          <div className="row-actions">
            <button
              type="button"
              className={`btn ${blanket ? '' : 'primary'}`}
              onClick={() => {
                setBlanket(false)
                getScene()?.setVenusBlanket(false)
              }}
            >
              Atmosferi kaldır
            </button>
            <button
              type="button"
              className={`btn ${blanket ? 'primary' : ''}`}
              onClick={() => {
                setBlanket(true)
                getScene()?.setVenusBlanket(true)
              }}
            >
              Atmosferi geri koy
            </button>
            <button type="button" className="btn primary" onClick={() => setStep('result')}>
              Sonucu gör
            </button>
          </div>
        </div>
      ) : null}
      {step === 'result' ? (
        <p>
          {correct ? <strong className="success">Doğru.</strong> : <strong>Yanlış.</strong>} En yakın ≠ en sıcak. Merkür Güneş’e en yakındır ama en sıcak yüzey Venüs’tedir.
        </p>
      ) : null}
    </div>
  )
}

export function CometTailLab() {
  const setStep = useLabStore((s) => s.setStep)
  const prediction = useLabStore((s) => s.prediction)
  const setPrediction = useLabStore((s) => s.setPrediction)
  const step = useLabStore((s) => s.step)
  const correct = prediction === 'sun'

  return (
    <div>
      {step === 'simulate' && !prediction ? (
        <div>
          <p className="muted">Kuyruk her zaman hareketin arkasında mıdır?</p>
          <div className="choice-row">
            <button type="button" className="chip" onClick={() => setPrediction('behind')}>
              Evet, hep arkada
            </button>
            <button type="button" className="chip" onClick={() => setPrediction('sun')}>
              Hayır, Güneş’ten uzağa bakar
            </button>
          </div>
        </div>
      ) : null}
      {step === 'simulate' && prediction ? (
        <div>
          <p className="muted">Buz topunu Güneş’in etrafında sürükle. Kuyruk hep Güneş’ten uzağa bakar.</p>
          <button type="button" className="btn primary" onClick={() => setStep('result')}>
            Bunu gördüm
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <p>
          {correct ? <strong className="success">Doğru.</strong> : <strong>Yanlış.</strong>} Kuyruk Güneş rüzgârıyla Güneş’ten kaçar; hareketin arkasında durmaz.
        </p>
      ) : null}
    </div>
  )
}

export function MercuryLongDayLab() {
  const year = useLabStore((s) => s.mercuryYear)
  const day = useLabStore((s) => s.mercuryDay)
  return (
    <div>
      <p>
        Yıl <strong>{Math.round(year * 100)}%</strong> · Güneş günü <strong>{Math.round(day * 100)}%</strong>
      </p>
      <div className="bar-pair">
        <div className="bar-line">
          <div className="bar-track">
            <i style={{ width: `${Math.max(4, year * 100)}%` }} />
          </div>
          <em>1 yıl</em>
        </div>
        <div className="bar-line">
          <div className="bar-track">
            <i className="b" style={{ width: `${Math.max(4, day * 100)}%` }} />
          </div>
          <em>1 gün</em>
        </div>
      </div>
      <div className="row-actions">
        <button
          type="button"
          className="btn primary"
          onClick={() => {
            useSimulationStore.getState().setTimeScale(yearScale)
            useSimulationStore.getState().setPlaying(true)
            getScene()?.startMercuryWatch('mercury-year')
          }}
        >
          1 yılı izle
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => {
            useSimulationStore.getState().setTimeScale(yearScale)
            useSimulationStore.getState().setPlaying(true)
            getScene()?.startMercuryWatch('mercury-day')
          }}
        >
          Güneş gününü bitir
        </button>
        <button type="button" className="btn primary" onClick={() => useLabStore.getState().setStep('result')}>
          Bunu gördüm
        </button>
      </div>
    </div>
  )
}

export function ActivityBody() {
  const id = useLabStore((s) => s.activityId)
  if (id === 'earth-year') return <EarthYearLab />
  if (id === 'who-faster') return <WhoFasterLab />
  if (id === 'spin-vs-orbit') return <SpinOrbitLab />
  if (id === 'day-night') return <DayNightLab />
  if (id === 'mass-weight') return <MassWeightLab />
  if (id === 'drop-ball') return <DropBallLab />
  if (id === 'jump') return <JumpLab />
  if (id === 'real-scale') return <RealScaleLab />
  if (id === 'arrange-orbits') return <ArrangeOrbitsLab />
  if (id === 'moon-phases') return <MoonPhasesLab />
  if (id === 'stars-or-earth') return <StarsOrEarthLab />
  if (id === 'star-names') return <StarNamesLab />
  if (id === 'space-mission') return <SpaceMissionLab />
  if (id === 'light-travel') return <LightTravelLab />
  if (id === 'seasons-tilt') return <SeasonsTiltLab />
  if (id === 'closest-hottest') return <ClosestHottestLab />
  if (id === 'comet-tail') return <CometTailLab />
  if (id === 'mercury-long-day') return <MercuryLongDayLab />
  return null
}
