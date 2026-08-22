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
import type { BodyId } from '../../types/planet'
import { NOTABLE_STARS } from '../../content/skyWonders'

const yearScale = TIME_PRESETS.find((item) => item.id === 'year')?.scale ?? 86_400 * 365
const dayScale = TIME_PRESETS.find((item) => item.id === 'day')?.scale ?? 86_400

export function EarthYearLab() {
  const tours = useLabStore((s) => s.yearTours)
  const step = useLabStore((s) => s.step)
  const prediction = useLabStore((s) => s.prediction)
  const rows = tours.length ? tours : earthYearTours()
  const correct = prediction === 'inner'

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
        <div>
          <p>
            {correct ? <strong className="success">Doğru.</strong> : <strong>Yanlış.</strong>} Yakın gezegenler daha çok tur atar.
          </p>
          <ul className="tour-list">
            {rows.map((row) => (
              <li key={row.id}>
                <span>{row.name}</span>
                <strong>{row.tours.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} tur</strong>
                <i style={{ width: `${Math.min(row.tours * 22, 100)}%` }} />
              </li>
            ))}
          </ul>
        </div>
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
  const correct = prediction === 'mercury'

  return (
    <div>
      {step === 'simulate' ? (
        <div className="lab-controls">
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
  const step = useLabStore((s) => s.step)
  const correct = prediction === 'spin'

  return (
    <div>
      {step === 'simulate' ? (
        <div className="lab-controls">
          <div className="choice-row">
            <button type="button" className={`chip ${freezeR ? 'is-active' : ''}`} onClick={() => setR(!freezeR)}>
              {freezeR ? 'Dönme durdu' : 'Dönmeyi durdur'}
            </button>
            <button type="button" className={`chip ${freezeO ? 'is-active' : ''}`} onClick={() => setO(!freezeO)}>
              {freezeO ? 'Dolanma durdu' : 'Dolanmayı durdur'}
            </button>
          </div>
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
  const prediction = useLabStore((s) => s.prediction)
  const correct = prediction === 'same'
  const step = useLabStore((s) => s.step)
  return (
    <div>
      {step === 'simulate' ? (
        <button type="button" className="btn primary" onClick={() => setStep('result')}>
          Gördüm
        </button>
      ) : null}
      {step === 'result' ? (
        <p>
          {correct ? <strong className="success">Doğru.</strong> : <strong>Yanlış.</strong>} Aynı ülkede batı ve doğu neredeyse birlikte geceye girer.
        </p>
      ) : null}
    </div>
  )
}

export function MassWeightLab() {
  const kg = useLabStore((s) => s.kidMassKg)
  const setKg = useLabStore((s) => s.setKidMassKg)
  const setStep = useLabStore((s) => s.setStep)
  const prediction = useLabStore((s) => s.prediction)
  const step = useLabStore((s) => s.step)
  const earth = earthRelativeWeight(kg, 'earth')
  const moon = earthRelativeWeight(kg, 'moon')
  const jupiter = earthRelativeWeight(kg, 'jupiter')
  const correct = prediction === 'no'

  return (
    <div>
      {step === 'simulate' ? (
        <div>
          <label>
            Kilon kaç?
            <input type="range" min={15} max={55} value={kg} onChange={(e) => setKg(Number(e.target.value))} />
            <strong>{kg} kg</strong>
          </label>
          <ul className="stats">
            <li>
              <span>Dünya’da his</span>
              <strong>{earth.kgf.toFixed(0)} kilo gibi</strong>
            </li>
            <li>
              <span>Ay’da his</span>
              <strong>{moon.kgf.toFixed(0)} kilo gibi</strong>
            </li>
            <li>
              <span>Jüpiter’de his</span>
              <strong>{jupiter.kgf.toFixed(0)} kilo gibi</strong>
            </li>
          </ul>
          <button type="button" className="btn" onClick={() => getScene()?.playSurfaceLab()}>
            Zıplamayı izle
          </button>
          <button type="button" className="btn primary" onClick={() => setStep('result')}>
            Bunu gördüm
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <p>
          {correct ? <strong className="success">Doğru.</strong> : <span>Tekrar bak:</span>} Kütlen aynı kalır; Ay’da daha hafif hissedersin.
        </p>
      ) : null}
    </div>
  )
}

export function DropBallLab() {
  const setStep = useLabStore((s) => s.setStep)
  const prediction = useLabStore((s) => s.prediction)
  const step = useLabStore((s) => s.step)
  const correct = prediction === 'jupiter'

  return (
    <div>
      {step === 'simulate' ? (
        <div className="lab-controls">
          <div className="row-actions">
            <button
              type="button"
              className="btn primary"
              onClick={() => getScene()?.playSurfaceLab()}
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
          {correct ? <strong className="success">Doğru.</strong> : <span>Tekrar bak:</span>} Jüpiter’de yerçekimi en büyük; top önce orada düşer.
        </p>
      ) : null}
    </div>
  )
}

export function JumpLab() {
  const [body, setBody] = useState<BodyId>('earth')
  const setStep = useLabStore((s) => s.setStep)
  const prediction = useLabStore((s) => s.prediction)
  const step = useLabStore((s) => s.step)
  const correct = prediction === 'moon'

  return (
    <div>
      {step === 'simulate' ? (
        <div>
          <div className="choice-row">
            {(['moon', 'earth', 'jupiter'] as BodyId[]).map((id) => (
              <button
                key={id}
                type="button"
                className={`chip ${body === id ? 'is-active' : ''}`}
                onClick={() => {
                  setBody(id)
                  getScene()?.setSurfaceJumpBody(id)
                }}
              >
                {getBody(id).name}
              </button>
            ))}
          </div>
          <div className="row-actions">
            <button type="button" className="btn primary" onClick={() => getScene()?.playSurfaceLab()}>
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
          {correct ? <strong className="success">Doğru.</strong> : <span>Tekrar bak:</span>} Ay’da g küçük olduğu için aynı hızla daha yükseğe çıkarsın.
        </p>
      ) : null}
    </div>
  )
}

export function RealScaleLab() {
  const setStep = useLabStore((s) => s.setStep)
  const mode = useSimulationStore((s) => s.scaleMode)
  const prediction = useLabStore((s) => s.prediction)
  const step = useLabStore((s) => s.step)
  const correct = prediction === 'model'

  return (
    <div>
      {step === 'simulate' ? (
        <div className="lab-controls">
          <div className="choice-row">
            <button
              type="button"
              className={`chip ${mode === 'educational' ? 'is-active' : ''}`}
              onClick={() => {
                useSimulationStore.getState().setScaleMode('educational')
                getScene()?.focusOverview()
              }}
            >
              Görsel ölçek
            </button>
            <button
              type="button"
              className={`chip ${mode === 'trueScale' ? 'is-active' : ''}`}
              onClick={() => {
                useSimulationStore.getState().setScaleMode('trueScale')
                getScene()?.focusOverview()
              }}
            >
              Gerçek oran
            </button>
          </div>
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
const ORDER_LABEL = ORDER.map((id) => getBody(id).name).join(' → ')

function shuffleIds(): BodyId[] {
  return [...ORDER].sort(() => Math.random() - 0.5)
}

const ARRANGE_LIVES = 7

export function ArrangeOrbitsLab() {
  const [slots, setSlots] = useState<(BodyId | null)[]>(() => Array(8).fill(null))
  const [pool, setPool] = useState<BodyId[]>(shuffleIds)
  const [pick, setPick] = useState<BodyId | null>(null)
  const [lives, setLives] = useState(ARRANGE_LIVES)
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
    setLives(ARRANGE_LIVES)
    setStartedAt(null)
    setElapsed(null)
  }

  function dropOn(index: number) {
    if (!pick || dead || ready) return
    if (ORDER[index] !== pick || slots[index]) {
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

  useEffect(() => {
    getScene()?.setArrangeHandler((index) => dropOn(index))
    return () => getScene()?.setArrangeHandler(null)
  })

  return (
    <div className="orbit-lab">
      <p className="lives-row">
        <strong>{placed}/8</strong>
        <span>{dead ? 'Can bitti' : `${lives} can`}</span>
      </p>
      <p className="muted">
        {dead
          ? 'Yanlış halka can götürür. Yeniden dene.'
          : ready
            ? ORDER_LABEL
            : pick
              ? `${getBody(pick).name}: doğru halkaya dokun.`
              : 'Önce bir gezegen seç.'}
      </p>
      {ready && elapsed !== null ? (
        <p className="success">
          Tamam · {elapsed.toLocaleString('tr-TR', { maximumFractionDigits: 1 })} sn
        </p>
      ) : null}
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
      ) : ready ? (
        <button
          type="button"
          className="btn primary"
          onClick={() => {
            useLabStore.getState().resetActivityScene()
            useSimulationStore.getState().setPlaying(true)
            setStep('result')
          }}
        >
          Sırayı gördüm
        </button>
      ) : null}
    </div>
  )
}

export function MoonPhasesLab() {
  const deg = useLabStore((s) => s.moonPhaseDeg)
  const setStep = useLabStore((s) => s.setStep)
  const prediction = useLabStore((s) => s.prediction)
  const step = useLabStore((s) => s.step)
  const full = isFullMoon(deg)
  const correct = prediction === 'light'

  return (
    <div className="activity-stage">
      {step === 'simulate' ? (
        <div className="lab-controls">
          <p>
            Evre: <strong>{moonPhaseName(deg)}</strong>
          </p>
          {full ? <p className="success">Dolunay oldu.</p> : null}
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
  const step = useLabStore((s) => s.step)
  const correct = prediction === 'earth'

  return (
    <div>
      {step === 'simulate' ? (
        <div className="lab-controls">
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
              className="chip"
              onClick={() => {
                useSimulationStore.getState().setSkyCamera(false)
                useSimulationStore.getState().selectBody('earth')
                getScene()?.focusEarthSurface()
                useSimulationStore.getState().setTimeScale(dayScale)
              }}
            >
              Dünya’nın dönüşü
            </button>
          </div>
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
  const completed = useLabStore((s) => s.completed)
  const moonDeg = useLabStore((s) => s.moonPhaseDeg)
  const selected = useSimulationStore((s) => s.selectedBodyId)
  const orbits = useSimulationStore((s) => s.showOrbits)
  const steps = [
    'Mars’ı seç. Yılı Dünya’dan uzundur.',
    'Dünya’nın bir yılını izle.',
    'Ay’da dolunay hizasını dene.',
    'Ay’da nasıl zıplanır, gör.',
  ]
  const ready =
    (index === 0 && selected === 'mars' && orbits) ||
    (index === 1 && completed.includes('earth-year')) ||
    (index === 2 && (completed.includes('moon-phases') || isFullMoon(moonDeg))) ||
    (index === 3 && completed.includes('jump'))

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
          <button type="button" className="btn" disabled={!ready} onClick={() => setIndex(index + 1)}>
            {ready ? 'Adım görüldü' : 'Önce sahnede gör'}
          </button>
        ) : (
          <button type="button" className="btn primary" disabled={!ready} onClick={() => setStep('result')}>
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
  const step = useLabStore((s) => s.step)
  const shown = Math.round(progress * seconds)
  const mm = Math.floor(shown / 60)
  const ss = shown % 60
  const correct = prediction === 'minutes'

  return (
    <div>
      {step === 'simulate' ? (
        <div className="lab-controls">
          <p className="muted">
            {mm}:{String(ss).padStart(2, '0')} / {lightTravelLabel(seconds > 800 ? 'jupiter' : 'earth')}
            {arrived ? ' · Işık vardı.' : ''}
          </p>
          <div className="choice-row">
            <button type="button" className="chip" onClick={() => getScene()?.startLightPulse('earth')}>
              Dünya’ya gönder
            </button>
            <button type="button" className="chip" onClick={() => getScene()?.startLightPulse('jupiter')}>
              Jüpiter’e gönder
            </button>
          </div>
          <button type="button" className="btn primary" onClick={() => setStep('result')}>
            Bunu gördüm
          </button>
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
  const step = useLabStore((s) => s.step)
  const correct = prediction === 'tilt'
  const [tiltOn, setTiltOn] = useState(true)
  const [month, setMonth] = useState<'jan' | 'jul'>('jan')

  function apply(nextTilt: boolean, nextMonth: 'jan' | 'jul') {
    setTiltOn(nextTilt)
    setMonth(nextMonth)
    getScene()?.setSeasonDemo(nextTilt, nextMonth)
  }

  return (
    <div>
      {step === 'simulate' ? (
        <div className="lab-controls season-panel">
          <div className="choice-row">
            <button type="button" className={`chip ${tiltOn ? 'is-active' : ''}`} onClick={() => apply(true, month)}>
              Eğiklik açık
            </button>
            <button type="button" className={`chip ${!tiltOn ? 'is-active' : ''}`} onClick={() => apply(false, month)}>
              Eğiklik kapalı
            </button>
          </div>
          <div className="choice-row">
            <button type="button" className={`chip ${month === 'jan' ? 'is-active' : ''}`} onClick={() => apply(tiltOn, 'jan')}>
              Ocak · Kuzey kış
            </button>
            <button type="button" className={`chip ${month === 'jul' ? 'is-active' : ''}`} onClick={() => apply(tiltOn, 'jul')}>
              Temmuz · Kuzey yaz
            </button>
          </div>
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

const HEAT_TEMP = {
  mercury: getBody('mercury').meanTempC,
  venus: getBody('venus').meanTempC,
  earth: getBody('earth').meanTempC,
} as const

export function ClosestHottestLab() {
  const setStep = useLabStore((s) => s.setStep)
  const prediction = useLabStore((s) => s.prediction)
  const step = useLabStore((s) => s.step)
  const correct = prediction === 'venus'
  const [blanket, setBlanket] = useState(true)

  useEffect(() => {
    if (step !== 'simulate') return
    getScene()?.setHeatCompare(true)
    getScene()?.setVenusBlanket(true)
  }, [step])

  return (
    <div>
      {step === 'simulate' ? (
        <div className="lab-controls">
          <p className="muted">
            Venüs ≈ {HEAT_TEMP.venus}°C · Merkür ≈ {HEAT_TEMP.mercury}°C
          </p>
          <div className="choice-row">
            <button
              type="button"
              className={`chip ${blanket ? '' : 'is-active'}`}
              onClick={() => {
                setBlanket(false)
                getScene()?.setVenusBlanket(false)
              }}
            >
              Atmosferi kaldır
            </button>
            <button
              type="button"
              className={`chip ${blanket ? 'is-active' : ''}`}
              onClick={() => {
                setBlanket(true)
                getScene()?.setVenusBlanket(true)
              }}
            >
              Atmosferi koy
            </button>
          </div>
          <button type="button" className="btn primary" onClick={() => setStep('result')}>
            Sonucu gör
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <p>
          {correct ? <strong className="success">Doğru.</strong> : <strong>Yanlış.</strong>} En yakın ≠ en sıcak. En sıcak yüzey Venüs’tedir.
        </p>
      ) : null}
    </div>
  )
}

export function CometTailLab() {
  const setStep = useLabStore((s) => s.setStep)
  const prediction = useLabStore((s) => s.prediction)
  const step = useLabStore((s) => s.step)
  const correct = prediction === 'sun'

  return (
    <div>
      {step === 'simulate' ? (
        <button type="button" className="btn primary" onClick={() => setStep('result')}>
          Bunu gördüm
        </button>
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
  const prediction = useLabStore((s) => s.prediction)
  const step = useLabStore((s) => s.step)
  const correct = prediction === 'long'
  return (
    <div>
      {step === 'simulate' ? (
        <div className="lab-controls">
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
          <div className="choice-row">
            <button
              type="button"
              className="chip"
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
              className="chip"
              onClick={() => {
                useSimulationStore.getState().setTimeScale(yearScale)
                useSimulationStore.getState().setPlaying(true)
                getScene()?.startMercuryWatch('mercury-day')
              }}
            >
              Güneş günü
            </button>
          </div>
          <button type="button" className="btn primary" onClick={() => useLabStore.getState().setStep('result')}>
            Bunu gördüm
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <p>
          {correct ? <strong className="success">Doğru.</strong> : <strong>Yanlış.</strong>} Yıl biter, gün bitmez.
        </p>
      ) : null}
    </div>
  )
}

export function KeplerPizzaLab() {
  const step = useLabStore((s) => s.step)
  const prediction = useLabStore((s) => s.prediction)
  const setStep = useLabStore((s) => s.setStep)
  const correct = prediction === 'faster'
  return (
    <div>
      {step === 'simulate' ? (
        <button type="button" className="btn primary" onClick={() => setStep('result')}>
          Dilimleri gördüm
        </button>
      ) : null}
      {step === 'result' ? (
        <p>
          {correct ? <strong className="success">Doğru.</strong> : <span>Tekrar bak:</span>} Merkür Güneş’e yaklaşınca hızlanır.
        </p>
      ) : null}
    </div>
  )
}

export function EclipseAlignLab() {
  const kind = useLabStore((s) => s.eclipseKind)
  const deg = useLabStore((s) => s.moonPhaseDeg)
  const prediction = useLabStore((s) => s.prediction)
  const setStep = useLabStore((s) => s.setStep)
  const step = useLabStore((s) => s.step)
  const correct = prediction === 'align'
  return (
    <div>
      {step === 'simulate' ? (
        <div className="lab-controls">
          <p>
            Evre: <strong>{moonPhaseName(deg)}</strong>
            {kind === 'lunar' ? ' · Ay tutulması' : kind === 'solar' ? ' · Güneş tutulması' : ''}
          </p>
          <button type="button" className="btn primary" disabled={kind === 'none'} onClick={() => setStep('result')}>
            {kind === 'none' ? 'Önce hizala' : 'Hizayı gördüm'}
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <p>
          {correct ? <strong className="success">Doğru.</strong> : <span>Tekrar bak:</span>} Her dolunay tutulma değildir; gölgeye girmek gerekir.
        </p>
      ) : null}
    </div>
  )
}

const URSA = ['dubhe', 'merak', 'phecda', 'megrez', 'alioth', 'mizar', 'alcaid'] as const
const URSA_NAME: Record<(typeof URSA)[number], string> = {
  dubhe: 'Kepçe ucu',
  merak: 'Kepçe kenarı',
  phecda: 'Kepçe dibi',
  megrez: 'Sap başı',
  alioth: 'Sap 1',
  mizar: 'Sap 2',
  alcaid: 'Sap ucu',
}

export function UrsaHuntLab() {
  const found = useLabStore((s) => s.huntStars)
  const setStep = useLabStore((s) => s.setStep)
  const step = useLabStore((s) => s.step)
  const done = URSA.every((id) => found.includes(id))
  return (
    <div>
      {step === 'simulate' ? (
        <div className="lab-controls">
          <p>
            <strong>{found.length}/7</strong>
          </p>
          <ul className="stats">
            {URSA.map((id) => (
              <li key={id}>
                <span>{URSA_NAME[id]}</span>
                <strong>{found.includes(id) ? 'Bulundu' : '…'}</strong>
              </li>
            ))}
          </ul>
          <button type="button" className="btn primary" disabled={!done} onClick={() => setStep('result')}>
            {done ? 'Takımyıldızı tamam' : 'Yıldızlara dokun'}
          </button>
        </div>
      ) : null}
      {step === 'result' ? <p className="success">Büyükayı bir gezegen değil, yedi yıldızın çizdiği şekildir.</p> : null}
    </div>
  )
}

export function LightDiaryLab() {
  const setStep = useLabStore((s) => s.setStep)
  const prediction = useLabStore((s) => s.prediction)
  const step = useLabStore((s) => s.step)
  const arrived = useLabStore((s) => s.lightArrived)
  const correct = prediction === 'far'
  return (
    <div>
      {step === 'simulate' ? (
        <div className="lab-controls">
          <div className="choice-row">
            <button
              type="button"
              className="chip"
              onClick={() => getScene()?.startLightPulse('earth')}
            >
              Dünya’ya gönder
            </button>
            <button type="button" className="chip" onClick={() => getScene()?.focusWonder('proxima')}>
              Proxima’ya bak
            </button>
          </div>
          <button type="button" className="btn" disabled={!arrived} onClick={() => setStep('result')}>
            {arrived ? 'Karşılaştırdım' : 'Önce ışığı izle'}
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <p>
          {correct ? <strong className="success">Doğru.</strong> : <span>Tekrar bak:</span>} 10 yaşındaysan Proxima’ya giden ışık sen 14 olmadan hâlâ yoldadır.
        </p>
      ) : null}
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
  if (id === 'kepler-pizza') return <KeplerPizzaLab />
  if (id === 'eclipse-align') return <EclipseAlignLab />
  if (id === 'ursa-hunt') return <UrsaHuntLab />
  if (id === 'light-diary') return <LightDiaryLab />
  return null
}
