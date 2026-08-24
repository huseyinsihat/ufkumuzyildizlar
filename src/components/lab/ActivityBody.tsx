import { useCallback, useEffect, useMemo, useState, type CSSProperties } from 'react'
import { labWatchScale } from '../../astronomy/timeEngine'
import { getBody } from '../../astronomy/planetData'
import { earthRelativeWeight } from '../../features/lab/gravityMath'
import { earthYearTours, isFullMoon, kidTourLabel, moonPhaseName } from '../../features/lab/orbitMath'
import { LIGHT_SCENE_SEC, lightTravelLabel } from '../../features/lab/wowMath'
import { getScene } from '../../scene/sceneApi'
import { useLabStore } from '../../store/labStore'
import { useSimulationStore } from '../../store/simulationStore'
import { useUiStore } from '../../store/uiStore'
import type { BodyId } from '../../types/planet'
import { NOTABLE_STARS } from '../../content/skyWonders'
import { PhysicsCanvas } from './PhysicsCanvas'

export function EarthYearLab() {
  const tours = useLabStore((s) => s.yearTours)
  const step = useLabStore((s) => s.step)
  const prediction = useLabStore((s) => s.prediction)
  const rows = (tours.length ? tours : earthYearTours()).filter(
    (row) => row.id === 'mercury' || row.id === 'earth' || row.id === 'jupiter',
  )
  const correct = prediction === 'inner'
  const maxTours = Math.max(...rows.map((row) => row.tours), 1)

  return (
    <div>
      {step === 'simulate' ? (
        <button
          type="button"
          className="btn primary"
          onClick={() => {
            useSimulationStore.getState().setTimeScale(labWatchScale('earthYear'))
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
            {correct ? <strong className="success">Doğru.</strong> : <strong>Tekrar bak.</strong>} Merkür birkaç tur, Dünya 1 tur, Jüpiter turunu bitiremez.
          </p>
          <ul className="tour-list">
            {rows.map((row) => (
              <li key={row.id}>
                <span>{row.name}</span>
                <strong>{kidTourLabel(row.tours)}</strong>
                <i style={{ width: `${Math.min((row.tours / maxTours) * 100, 100)}%` }} />
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
  const winnerId = useLabStore((s) => s.raceWinner) ?? 'mercury'
  const winner = getBody(winnerId as BodyId)?.name ?? 'Merkür'
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
              useSimulationStore.getState().setTimeScale(labWatchScale('mercuryRace'))
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
          {correct ? <strong className="success">Doğru.</strong> : <strong>Tekrar bak.</strong>} Kazanan {winner}.
          {prediction ? ` Tahminin: ${RACE_GUESSES.find((item) => item.id === prediction)?.label}.` : ''} Merkür daha kısa yolda tur atar.
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
  const [triedSpin, setTriedSpin] = useState(false)
  const [triedOrbit, setTriedOrbit] = useState(false)
  const ready = triedSpin && triedOrbit

  return (
    <div>
      {step === 'simulate' ? (
        <div className="lab-controls">
          <div className="choice-row">
            <button
              type="button"
              className={`chip ${freezeR ? 'is-active' : ''}`}
              onClick={() => {
                setR(!freezeR)
                setTriedSpin(true)
              }}
            >
              {freezeR ? 'Dönme durdu' : 'Dönmeyi durdur'}
            </button>
            <button
              type="button"
              className={`chip ${freezeO ? 'is-active' : ''}`}
              onClick={() => {
                setO(!freezeO)
                setTriedOrbit(true)
              }}
            >
              {freezeO ? 'Tur durdu' : 'Turu durdur'}
            </button>
          </div>
          <button
            type="button"
            className="btn primary"
            disabled={!ready}
            onClick={() => {
              useSimulationStore.getState().setPlaying(true)
              useSimulationStore.getState().setTimeScale(labWatchScale('dayNight'))
              setStep('result')
            }}
          >
            {ready ? 'Gördüm' : 'İkisini de dene'}
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <p>
          {correct ? <strong className="success">Doğru.</strong> : <strong>Tekrar bak.</strong>} Gece ve gündüz dönmeden olur; tur yıl yapar.
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
  const [watched, setWatched] = useState(false)

  useEffect(() => {
    if (step !== 'simulate') return
    const timer = window.setTimeout(() => setWatched(true), 6000)
    return () => window.clearTimeout(timer)
  }, [step])

  return (
    <div>
      {step === 'simulate' ? (
        <button type="button" className="btn primary" disabled={!watched} onClick={() => setStep('result')}>
          {watched ? 'Gördüm' : 'Gece-gündüzü izle'}
        </button>
      ) : null}
      {step === 'result' ? (
        <p>
          {correct ? <strong className="success">Doğru.</strong> : <strong>Tekrar bak.</strong>} Aynı ülkede batı ve doğu neredeyse birlikte geceye girer.
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
  const fallback2d = useUiStore((s) => s.use2dFallback)
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
          {fallback2d ? <PhysicsCanvas mode="weight" running bodyId="earth" massKg={kg} /> : null}
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
          <button type="button" className="btn primary" onClick={() => setStep('result')}>
            Bunu gördüm
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <p>
          {correct ? <strong className="success">Doğru.</strong> : <span>Tekrar bak:</span>} Sen aynı çocuksun; Ay’da daha hafif hissedersin.
        </p>
      ) : null}
    </div>
  )
}

export function DropBallLab() {
  const setStep = useLabStore((s) => s.setStep)
  const prediction = useLabStore((s) => s.prediction)
  const step = useLabStore((s) => s.step)
  const fallback2d = useUiStore((s) => s.use2dFallback)
  const correct = prediction === 'jupiter'
  const [landed, setLanded] = useState(false)

  useEffect(() => {
    getScene()?.setDropDoneHandler(() => {
      setLanded(true)
      window.setTimeout(() => {
        if (useLabStore.getState().step === 'simulate') useLabStore.getState().setStep('result')
      }, 700)
    })
    return () => getScene()?.setDropDoneHandler(null)
  }, [])

  return (
    <div>
      {step === 'simulate' ? (
        <div className="lab-controls">
          <div className="row-actions">
            <button
              type="button"
              className="btn primary"
              onClick={() => {
                setLanded(false)
                getScene()?.playSurfaceLab()
              }}
            >
              Topları bırak
            </button>
            <button type="button" className="btn" disabled={!landed} onClick={() => setStep('result')}>
              {landed ? 'Sonucu gör' : 'Önce bırak'}
            </button>
          </div>
          {fallback2d ? <PhysicsCanvas mode="drop" running={landed} /> : null}
        </div>
      ) : null}
      {step === 'result' ? (
        <p>
          {correct ? <strong className="success">Doğru.</strong> : <span>Tekrar bak:</span>} Jüpiter’de çekim en büyük; top önce orada düşer.
        </p>
      ) : null}
    </div>
  )
}

export function JumpLab() {
  const [body, setBody] = useState<BodyId>('earth')
  const [jumped, setJumped] = useState(false)
  const setStep = useLabStore((s) => s.setStep)
  const prediction = useLabStore((s) => s.prediction)
  const step = useLabStore((s) => s.step)
  const fallback2d = useUiStore((s) => s.use2dFallback)
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
          <p className="muted">Ay’da yüksek, Jüpiter’de alçak. Mavi çizgi tepeyi gösterir.</p>
          <div className="row-actions">
            <button
              type="button"
              className="btn primary"
              onClick={() => {
                setJumped(true)
                getScene()?.playSurfaceLab()
              }}
            >
              Zıplat
            </button>
            <button type="button" className="btn" disabled={!jumped} onClick={() => setStep('result')}>
              {jumped ? 'Sonucu gör' : 'Önce zıplat'}
            </button>
          </div>
          {fallback2d ? <PhysicsCanvas mode="jump" running={jumped} bodyId={body} /> : null}
        </div>
      ) : null}
      {step === 'result' ? (
        <p>
          {correct ? <strong className="success">Doğru.</strong> : <span>Tekrar bak:</span>} Ay’da çekim zayıf olduğu için aynı zıplama daha yükseğe çıkar.
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
              Anlamak için büyük
            </button>
            <button
              type="button"
              className={`chip ${mode === 'trueScale' ? 'is-active' : ''}`}
              onClick={() => {
                useSimulationStore.getState().setScaleMode('trueScale')
                getScene()?.focusOverview()
              }}
            >
              Gerçek boşluk
            </button>
          </div>
          <p className="muted">Uzay çok boş. Küçük noktaları görelim diye büyütürüz.</p>
          <button type="button" className="btn primary" onClick={() => setStep('result')}>
            Bunu gördüm
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <p>
          {correct ? <strong className="success">Doğru.</strong> : <strong>Tekrar bak.</strong>} Gerçekte gezegenler nokta kadar kalır; bu bir modeldir.
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

  const dropOn = useCallback((index: number) => {
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
  }, [pick, dead, ready, slots, startedAt])

  useEffect(() => {
    getScene()?.setArrangeHandler((index) => dropOn(index))
    return () => getScene()?.setArrangeHandler(null)
  }, [dropOn])

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
              : 'Önce adı seç. Sonra doğru halkaya dokun.'}
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
  const correct = prediction === 'night'

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
          {correct ? <strong className="success">Doğru.</strong> : <strong>Tekrar bak.</strong>} Dolunayda Ay, Dünya’nın gece tarafındadır.
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
  const [sawSky, setSawSky] = useState(false)
  const [sawEarth, setSawEarth] = useState(false)
  const ready = sawSky && sawEarth

  return (
    <div>
      {step === 'simulate' ? (
        <div className="lab-controls">
          <div className="choice-row">
            <button
              type="button"
              className={`chip ${sawSky ? 'is-active' : ''}`}
              onClick={() => {
                useSimulationStore.getState().setSkyCamera(true)
                useSimulationStore.getState().setTimeScale(labWatchScale('skySpin'))
                useSimulationStore.getState().setPlaying(true)
                getScene()?.enterSkyView()
                setSawSky(true)
              }}
            >
              Gökyüzü kayıyor gibi
            </button>
            <button
              type="button"
              className={`chip ${sawEarth ? 'is-active' : ''}`}
              disabled={!sawSky}
              onClick={() => {
                useSimulationStore.getState().setSkyCamera(false)
                useSimulationStore.getState().selectBody('earth')
                getScene()?.focusEarthSurface()
                useSimulationStore.getState().setTimeScale(labWatchScale('dayNight'))
                useSimulationStore.getState().setPlaying(true)
                setSawEarth(true)
              }}
            >
              Dünya dönüyor
            </button>
          </div>
          <p className="muted">Gösteri gökyüzü, dürbün haritası değil. Yıldızlar yerinde; Dünya döndüğü için gökyüzü kayıyor gibi durur.</p>
          <button type="button" className="btn primary" disabled={!ready} onClick={() => setStep('result')}>
            {ready ? 'Gördüm' : 'Önce gökyüzü, sonra Dünya'}
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <p>
          {correct ? <strong className="success">Doğru.</strong> : <strong>Tekrar bak.</strong>} Dünya döndüğü için gökyüzü kayıyor gibi görünür.
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
            {index + 1}/{quiz.length} · {current.tag}. Rengine bak, adını seç.
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
          <strong className="success">{prediction ?? score}/3 doğru.</strong> Her yıldızın adı ve rengi ayrıdır.
        </p>
      ) : null}
    </div>
  )
}

export function SpaceMissionLab() {
  const index = useLabStore((s) => s.missionIndex)
  const setIndex = useLabStore((s) => s.setMissionIndex)
  const setStep = useLabStore((s) => s.setStep)
  const step = useLabStore((s) => s.step)
  const moonDeg = useLabStore((s) => s.moonPhaseDeg)
  const steps = [
    { title: 'Mars’a bak', body: 'Mars’ın yılı daha uzun durur.' },
    { title: 'Dolunayı hizala', body: 'Ay’ı Dünya’nın gece tarafına sürükle.' },
    { title: 'Ay’da zıpla', body: 'Ay’da zıplama daha yüksektir.' },
  ]
  const current = steps[index] ?? steps[0]
  const ready = index !== 1 || isFullMoon(moonDeg)

  useEffect(() => {
    if (index === 1) {
      useSimulationStore.getState().setMoonDragEnabled(true)
      useSimulationStore.getState().selectBody('moon')
      getScene()?.focusBody('earth')
    }
    if (index === 2) {
      useSimulationStore.getState().setMoonDragEnabled(false)
      getScene()?.startSurfaceLab('jump')
      getScene()?.setSurfaceJumpBody('moon')
    }
  }, [index])

  if (step === 'result') {
    return <p>Mars’ın yılı uzun. Dolunay bir çizgidir. Ay’da zıplama yüksektir.</p>
  }

  return (
    <div>
      <p>
        Bakış {index + 1} / {steps.length}
      </p>
      <p>
        <strong>{current.title}</strong> {current.body}
      </p>
      {index === 1 && isFullMoon(moonDeg) ? <p className="success">Dolunay oldu.</p> : null}
      <div className="row-actions">
        {index === 2 ? (
          <button type="button" className="btn" onClick={() => getScene()?.playSurfaceLab()}>
            Zıplat
          </button>
        ) : null}
        {index < 2 ? (
          <button type="button" className="btn primary" disabled={!ready} onClick={() => setIndex(index + 1)}>
            {ready ? 'Gördüm' : 'Önce dolunayı yakala'}
          </button>
        ) : (
          <button type="button" className="btn primary" onClick={() => setStep('result')}>
            Gördüm
          </button>
        )}
      </div>
    </div>
  )
}

export function LightTravelLab() {
  const seconds = useLabStore((s) => s.lightSeconds)
  const arrived = useLabStore((s) => s.lightArrived)
  const setStep = useLabStore((s) => s.setStep)
  const prediction = useLabStore((s) => s.prediction)
  const step = useLabStore((s) => s.step)
  const correct = prediction === 'minutes'
  const [sawEarth, setSawEarth] = useState(false)
  const [sawJupiter, setSawJupiter] = useState(false)
  const ready = sawEarth && sawJupiter

  useEffect(() => {
    if (!arrived) return
    if (seconds > 800) setSawJupiter(true)
    else setSawEarth(true)
  }, [arrived, seconds])

  return (
    <div>
      {step === 'simulate' ? (
        <div className="lab-controls">
          <p className="muted">
            Sahnede {LIGHT_SCENE_SEC[seconds > 800 ? 'jupiter' : 'earth']} sn
            {arrived ? ' · Işık vardı.' : ''}
          </p>
          <p className="muted">Gerçekte {lightTravelLabel(seconds > 800 ? 'jupiter' : 'earth')} (Dünya ≈ 8 dk 20 sn · Jüpiter ≈ 43 dk)</p>
          <div className="choice-row">
            <button
              type="button"
              className={`chip ${sawEarth ? 'is-active' : ''}`}
              onClick={() => getScene()?.startLightPulse('earth')}
            >
              Dünya’ya gönder
            </button>
            <button
              type="button"
              className={`chip ${sawJupiter ? 'is-active' : ''}`}
              disabled={!sawEarth}
              onClick={() => getScene()?.startLightPulse('jupiter')}
            >
              Jüpiter’e gönder
            </button>
          </div>
          <button type="button" className="btn primary" disabled={!ready} onClick={() => setStep('result')}>
            {ready ? 'Gördüm' : 'Önce Dünya, sonra Jüpiter'}
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <p>
          {correct ? <strong className="success">Doğru.</strong> : <strong>Tekrar bak.</strong>} Işık Dünya’ya yaklaşık 8 dakika 20 saniyede gelir.
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
              Dünya biraz yan dursun
            </button>
            <button type="button" className={`chip ${!tiltOn ? 'is-active' : ''}`} onClick={() => apply(false, month)}>
              Dünya dik dursun
            </button>
          </div>
          <div className="choice-row">
            <button type="button" className={`chip ${month === 'jan' ? 'is-active' : ''}`} onClick={() => apply(tiltOn, 'jan')}>
              Ocak
            </button>
            <button type="button" className={`chip ${month === 'jul' ? 'is-active' : ''}`} onClick={() => apply(tiltOn, 'jul')}>
              Temmuz
            </button>
          </div>
          <p className="muted">Ocak’ta Güneş’e biraz daha yakınız ama Türkiye’de kış.</p>
          <button type="button" className="btn primary" onClick={() => setStep('result')}>
            Bunu gördüm
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <p>
          {correct ? <strong className="success">Doğru.</strong> : <strong>Tekrar bak.</strong>} Yaz, Dünya’nın biraz yan durmasından olur.
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
  const [tried, setTried] = useState(false)

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
            {tried
              ? `Venüs ≈ ${HEAT_TEMP.venus}°C · Merkür ≈ ${HEAT_TEMP.mercury}°C · Dünya ≈ ${HEAT_TEMP.earth}°C`
              : 'Hava yokken Merkür önde gibi durur. Hava gelince Venüs daha sıcak.'}
          </p>
          <div className="choice-row">
            <button
              type="button"
              className={`chip ${blanket ? '' : 'is-active'}`}
              onClick={() => {
                setTried(true)
                setBlanket(false)
                getScene()?.setVenusBlanket(false)
              }}
            >
              Venüs’ün kalın havasını kaldır
            </button>
            <button
              type="button"
              className={`chip ${blanket ? 'is-active' : ''}`}
              onClick={() => {
                setTried(true)
                setBlanket(true)
                getScene()?.setVenusBlanket(true)
              }}
            >
              Kalın havayı geri koy
            </button>
          </div>
          <button type="button" className="btn primary" disabled={!tried} onClick={() => setStep('result')}>
            {tried ? 'Sonucu gör' : 'Önce havayı dene'}
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <p>
          {correct ? <strong className="success">Doğru.</strong> : <strong>Tekrar bak.</strong>} En yakın, en sıcak demek değildir. En sıcak yüzey Venüs’tür.
        </p>
      ) : null}
    </div>
  )
}

export function CometTailLab() {
  const setStep = useLabStore((s) => s.setStep)
  const prediction = useLabStore((s) => s.prediction)
  const step = useLabStore((s) => s.step)
  const moved = useLabStore((s) => s.cometMoved)
  const correct = prediction === 'sun'

  return (
    <div>
      {step === 'simulate' ? (
        <div className="lab-controls">
          <p className="muted">Bu bir model kuyrukluyıldız. Sürükle: kuyruk Güneş’ten uzağa bakar.</p>
          <div className="choice-row">
            <button type="button" className="chip" onClick={() => getScene()?.nudgeComet(true)}>
              Güneş’e yaklaştır
            </button>
            <button type="button" className="chip" onClick={() => getScene()?.nudgeComet(false)}>
              Güneş’ten uzaklaştır
            </button>
          </div>
          <button type="button" className="btn primary" disabled={!moved} onClick={() => setStep('result')}>
            {moved ? 'Gördüm' : 'Önce kuyrukluyu oynat'}
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <p>
          {correct ? <strong className="success">Doğru.</strong> : <strong>Tekrar bak.</strong>} Kuyruk gidişin arkasında durmaz. Güneş onu kendinden uzağa iter.
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
            Tur <strong>{Math.round(year * 100)}%</strong> · Gün <strong>{Math.round(day * 100)}%</strong>
          </p>
          <div className="bar-pair">
            <div className="bar-line">
              <div className="bar-track">
                <i style={{ width: `${Math.max(4, year * 100)}%` }} />
              </div>
              <em>Güneş etrafında tur (yıl)</em>
            </div>
            <div className="bar-line">
              <div className="bar-track">
                <i className="b" style={{ width: `${Math.max(4, day * 100)}%` }} />
              </div>
              <em>Güneş’in bir kez doğup batması (gün)</em>
            </div>
          </div>
          <div className="choice-row">
            <button
              type="button"
              className="chip"
              onClick={() => {
                useSimulationStore.getState().setTimeScale(labWatchScale('mercuryYear'))
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
                useSimulationStore.getState().setTimeScale(labWatchScale('mercuryDay'))
                useSimulationStore.getState().setPlaying(true)
                getScene()?.startMercuryWatch('mercury-day')
              }}
            >
              Bir günü izle
            </button>
          </div>
          <button
            type="button"
            className="btn primary"
            disabled={year < 0.9 && day < 0.45}
            onClick={() => useLabStore.getState().setStep('result')}
          >
            {year >= 0.9 || day >= 0.45 ? 'Gördüm' : 'Önce yılı veya günü izle'}
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <p>
          {correct ? <strong className="success">Doğru.</strong> : <strong>Tekrar bak.</strong>} Yıl biter, gün bitmez.
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
  const [sawNear, setSawNear] = useState(false)
  const [sawFar, setSawFar] = useState(false)
  const ready = sawNear && sawFar

  useEffect(() => {
    if (step !== 'simulate') return
    const timer = window.setInterval(() => {
      const zone = getScene()?.keplerZone()
      if (zone === 'near') setSawNear(true)
      if (zone === 'far') setSawFar(true)
    }, 280)
    return () => window.clearInterval(timer)
  }, [step])

  return (
    <div>
      {step === 'simulate' ? (
        <div className="lab-controls">
          <p className="muted">Elips ders için şişirildi; gerçek Merkür bu kadar yassı değil. Güneş’e yaklaşınca sarı dilimde hızlanır.</p>
          <button type="button" className="btn primary" disabled={!ready} onClick={() => setStep('result')}>
            {ready ? 'Gördüm' : 'Yakın ve uzak dilimi bekle'}
          </button>
        </div>
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
          <p className="muted">Koyu koni Dünya’nın gölgesi. Ay o gölgeye girsin.</p>
          <button type="button" className="btn primary" disabled={kind === 'none'} onClick={() => setStep('result')}>
            {kind === 'none' ? 'Önce gölgeye gir' : 'Hizayı gördüm'}
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <p>
          {correct ? <strong className="success">Doğru.</strong> : <span>Tekrar bak:</span>} Dolunay yetmez; gölgeye girmek gerekir.
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
  alioth: 'Sap ortası',
  mizar: 'Sap çifti',
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
          <p className="muted">Gösteri gökyüzü, dürbün haritası değil.</p>
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
      {step === 'result' ? <p className="success">Büyükayı bir gezegen değil. Yedi parlak yıldızın çizdiği kepçedir.</p> : null}
    </div>
  )
}

export function LightDiaryLab() {
  const setStep = useLabStore((s) => s.setStep)
  const prediction = useLabStore((s) => s.prediction)
  const step = useLabStore((s) => s.step)
  const arrived = useLabStore((s) => s.lightArrived)
  const correct = prediction === 'far'
  const [starRun, setStarRun] = useState(false)
  const ready = arrived && starRun

  return (
    <div>
      {step === 'simulate' ? (
        <div className="lab-controls">
          <div className="choice-row">
            <button type="button" className={`chip ${arrived ? 'is-active' : ''}`} onClick={() => getScene()?.startLightPulse('earth')}>
              Dünya’ya gönder
            </button>
            <button
              type="button"
              className={`chip ${starRun ? 'is-active' : ''}`}
              disabled={!arrived}
              onClick={() => {
                getScene()?.focusWonder('proxima')
                setStarRun(true)
              }}
            >
              Proxima yolunu izle
            </button>
          </div>
          {starRun ? (
            <p className="muted">Proxima ~4,24 ışık yılı — ışık yaklaşık 4 yıl 3 ay. Sahnede foton gitmez; bu gerçek süredir.</p>
          ) : null}
          <button type="button" className="btn" disabled={!ready} onClick={() => setStep('result')}>
            {ready ? 'Karşılaştırdım' : 'Önce Dünya, sonra Proxima'}
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <p>
          {correct ? <strong className="success">Doğru.</strong> : <span>Tekrar bak:</span>} Işık Dünya’ya dakikalar, Proxima’ya yıllar sürer.
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
