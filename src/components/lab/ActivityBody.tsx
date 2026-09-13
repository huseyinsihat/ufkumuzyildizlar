import { useCallback, useEffect, useMemo, useState, type CSSProperties } from 'react'
import { labWatchScale } from '../../astronomy/timeEngine'
import { displayName, getBody } from '../../astronomy/planetData'
import { getActivity } from '../../content/labActivities'
import { earthRelativeWeight } from '../../features/lab/gravityMath'
import { earthYearTours, isFullMoon, kidTourLabel, moonPhaseName } from '../../features/lab/orbitMath'
import { LIGHT_SCENE_SEC, lightTravelLabel } from '../../features/lab/wowMath'
import { L, loc, type AppLang } from '../../i18n/types'
import { useLang, useT } from '../../i18n/useT'
import { getScene } from '../../scene/sceneApi'
import { useLabStore } from '../../store/labStore'
import { useSimulationStore } from '../../store/simulationStore'
import { useUiStore } from '../../store/uiStore'
import type { LabActivityId } from '../../types/lab'
import type { BodyId } from '../../types/planet'
import { NOTABLE_STARS, starDisplayName } from '../../content/skyWonders'
import { PhysicsCanvas } from './PhysicsCanvas'

function useActivityI18n(id: LabActivityId) {
  return { activity: getActivity(id), lang: useLang(), t: useT() }
}

function text(lang: AppLang, tr: string, en: string): string {
  return loc(lang, L(tr, en))
}

function localizedTourLabel(tours: number, lang: AppLang): string {
  if (lang === 'tr') return kidTourLabel(tours)
  if (tours >= 1.5) return `${Math.round(tours)} trips`
  if (tours >= 0.85) return '1 trip'
  return 'cannot finish'
}

function localizedMoonPhase(angleDeg: number, lang: AppLang): string {
  const phase = moonPhaseName(angleDeg)
  if (lang === 'tr') return phase
  return { Yeniay: 'New Moon', Dolunay: 'Full Moon', Hilal: 'Crescent', Yarım: 'Half Moon' }[phase] ?? phase
}

function ResultCopy({ id, correct }: { id: LabActivityId; correct: boolean }) {
  const { activity, lang, t } = useActivityI18n(id)
  return (
    <p>
      <strong className={correct ? 'success' : undefined}>{correct ? t('correct') : t('lookAgain')}</strong>{' '}
      {loc(lang, activity.resultTitle)}
    </p>
  )
}

export function EarthYearLab() {
  const { activity, lang } = useActivityI18n('earth-year')
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
          {loc(lang, activity.simulateLabel)}
        </button>
      ) : null}
      {step === 'result' ? (
        <div>
          <ResultCopy id="earth-year" correct={correct} />
          <ul className="tour-list">
            {rows.map((row) => (
              <li key={row.id}>
                <span>{displayName(getBody(row.id as BodyId), lang)}</span>
                <strong>{localizedTourLabel(row.tours, lang)}</strong>
                <i style={{ width: `${Math.min((row.tours / maxTours) * 100, 100)}%` }} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export function WhoFasterLab() {
  const { activity, lang, t } = useActivityI18n('who-faster')
  const step = useLabStore((s) => s.step)
  const prediction = useLabStore((s) => s.prediction)
  const winnerId = useLabStore((s) => s.raceWinner) ?? 'mercury'
  const winner = displayName(getBody(winnerId as BodyId), lang)
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
            {loc(lang, activity.simulateLabel)}
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <p>
          <strong className={correct ? 'success' : undefined}>{correct ? t('correct') : t('lookAgain')}</strong>{' '}
          {t('winner')}: {winner}.{' '}
          {prediction ? `${t('guessOf')} ${loc(lang, activity.choices?.find((item) => item.id === prediction)?.label ?? '')}. ` : ''}
          {loc(lang, activity.resultTitle)}
        </p>
      ) : null}
    </div>
  )
}

export function SpinOrbitLab() {
  const { activity, lang, t } = useActivityI18n('spin-vs-orbit')
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
              {freezeR ? t('spinStopped') : t('stopSpin')}
            </button>
            <button
              type="button"
              className={`chip ${freezeO ? 'is-active' : ''}`}
              onClick={() => {
                setO(!freezeO)
                setTriedOrbit(true)
              }}
            >
              {freezeO ? t('orbitStopped') : t('stopOrbit')}
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
            {ready ? loc(lang, activity.simulateLabel) : t('tryBoth')}
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <ResultCopy id="spin-vs-orbit" correct={correct} />
      ) : null}
    </div>
  )
}

export function DayNightLab() {
  const { activity, lang, t } = useActivityI18n('day-night')
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
          {watched ? loc(lang, activity.simulateLabel) : t('watchDayNight')}
        </button>
      ) : null}
      {step === 'result' ? (
        <ResultCopy id="day-night" correct={correct} />
      ) : null}
    </div>
  )
}

export function MassWeightLab() {
  const { activity, lang } = useActivityI18n('mass-weight')
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
            {text(lang, 'Kilon kaç?', 'How much do you weigh?')}
            <input type="range" min={15} max={55} value={kg} onChange={(e) => setKg(Number(e.target.value))} />
            <strong>{kg} kg</strong>
          </label>
          {fallback2d ? <PhysicsCanvas mode="weight" running bodyId="earth" massKg={kg} /> : null}
          <ul className="stats">
            <li>
              <span>{text(lang, 'Dünya’da his', 'Feels like on Earth')}</span>
              <strong>{earth.kgf.toFixed(0)} {text(lang, 'kilo gibi', 'kg')}</strong>
            </li>
            <li>
              <span>{text(lang, 'Ay’da his', 'Feels like on the Moon')}</span>
              <strong>{moon.kgf.toFixed(0)} {text(lang, 'kilo gibi', 'kg')}</strong>
            </li>
            <li>
              <span>{text(lang, 'Jüpiter’de his', 'Feels like on Jupiter')}</span>
              <strong>{jupiter.kgf.toFixed(0)} {text(lang, 'kilo gibi', 'kg')}</strong>
            </li>
          </ul>
          <button type="button" className="btn primary" onClick={() => setStep('result')}>
            {loc(lang, activity.simulateLabel)}
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <ResultCopy id="mass-weight" correct={correct} />
      ) : null}
    </div>
  )
}

export function DropBallLab() {
  const { activity, lang, t } = useActivityI18n('drop-ball')
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
              {loc(lang, activity.simulateLabel)}
            </button>
            <button type="button" className="btn" disabled={!landed} onClick={() => setStep('result')}>
              {landed ? t('seeResult') : t('dropFirst')}
            </button>
          </div>
          {fallback2d ? <PhysicsCanvas mode="drop" running={landed} /> : null}
        </div>
      ) : null}
      {step === 'result' ? (
        <ResultCopy id="drop-ball" correct={correct} />
      ) : null}
    </div>
  )
}

export function JumpLab() {
  const { activity, lang, t } = useActivityI18n('jump')
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
                {displayName(getBody(id), lang)}
              </button>
            ))}
          </div>
          <p className="muted">{loc(lang, activity.watchHint)}</p>
          <div className="row-actions">
            <button
              type="button"
              className="btn primary"
              onClick={() => {
                setJumped(true)
                getScene()?.playSurfaceLab()
              }}
            >
              {loc(lang, activity.simulateLabel)}
            </button>
            <button type="button" className="btn" disabled={!jumped} onClick={() => setStep('result')}>
              {jumped ? t('seeResult') : t('jumpFirst')}
            </button>
          </div>
          {fallback2d ? <PhysicsCanvas mode="jump" running={jumped} bodyId={body} /> : null}
        </div>
      ) : null}
      {step === 'result' ? (
        <ResultCopy id="jump" correct={correct} />
      ) : null}
    </div>
  )
}

export function RealScaleLab() {
  const { activity, lang } = useActivityI18n('real-scale')
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
              {text(lang, 'Büyütülmüş model', 'Enlarged model')}
            </button>
            <button
              type="button"
              className={`chip ${mode === 'trueScale' ? 'is-active' : ''}`}
              onClick={() => {
                useSimulationStore.getState().setScaleMode('trueScale')
                getScene()?.focusOverview()
              }}
            >
              {text(lang, 'Gerçek boşluk', 'True empty space')}
            </button>
          </div>
          <p className="muted">{loc(lang, activity.resultTitle)}</p>
          <button type="button" className="btn primary" onClick={() => setStep('result')}>
            {loc(lang, activity.simulateLabel)}
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <ResultCopy id="real-scale" correct={correct} />
      ) : null}
    </div>
  )
}

const ORDER: BodyId[] = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune']
function shuffleIds(): BodyId[] {
  return [...ORDER].sort(() => Math.random() - 0.5)
}

const ARRANGE_LIVES = 7

export function ArrangeOrbitsLab() {
  const { activity, lang } = useActivityI18n('arrange-orbits')
  const orderLabel = ORDER.map((id) => displayName(getBody(id), lang)).join(' → ')
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
        <span>{dead ? text(lang, 'Can bitti', 'No lives left') : `${lives} ${text(lang, 'can', 'lives')}`}</span>
      </p>
      <p className="muted">
        {dead
          ? text(lang, 'Yanlış halka can götürür. Yeniden dene.', 'A wrong ring costs a life. Try again.')
          : ready
            ? orderLabel
            : pick
              ? `${displayName(getBody(pick), lang)}: ${lang === 'en' ? 'tap the correct ring.' : 'doğru halkaya dokun.'}`
              : loc(lang, activity.watchHint)}
      </p>
      {ready && elapsed !== null ? (
        <p className="success">
          {text(lang, 'Tamam', 'Done')} · {elapsed.toLocaleString(lang === 'en' ? 'en-US' : 'tr-TR', { maximumFractionDigits: 1 })} {text(lang, 'sn', 'sec')}
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
              {displayName(body, lang)}
            </button>
          )
        })}
      </div>
      {dead ? (
        <button type="button" className="btn primary" onClick={restart}>
          {text(lang, 'Yeniden dene', 'Try again')}
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
          {loc(lang, activity.simulateLabel)}
        </button>
      ) : null}
    </div>
  )
}

export function MoonPhasesLab() {
  const { activity, lang } = useActivityI18n('moon-phases')
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
            {text(lang, 'Evre:', 'Phase:')} <strong>{localizedMoonPhase(deg, lang)}</strong>
          </p>
          {full ? <p className="success">{text(lang, 'Dolunay oldu.', 'It is a full Moon.')}</p> : null}
          <button type="button" className="btn primary" disabled={!full} onClick={() => setStep('result')}>
            {full ? loc(lang, activity.simulateLabel) : (lang === 'en' ? 'Catch the full Moon first' : 'Önce dolunayı yakala')}
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <ResultCopy id="moon-phases" correct={correct} />
      ) : null}
    </div>
  )
}

export function StarsOrEarthLab() {
  const { activity, lang } = useActivityI18n('stars-or-earth')
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
              {text(lang, 'Gökyüzü kayıyor gibi', 'The sky seems to drift')}
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
              {text(lang, 'Dünya dönüyor', 'Earth is spinning')}
            </button>
          </div>
          <p className="muted">{loc(lang, activity.watchHint)}</p>
          <button type="button" className="btn primary" disabled={!ready} onClick={() => setStep('result')}>
            {ready ? loc(lang, activity.simulateLabel) : (lang === 'en' ? 'Sky first, then Earth' : 'Önce gökyüzü, sonra Dünya')}
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <ResultCopy id="stars-or-earth" correct={correct} />
      ) : null}
    </div>
  )
}

export function StarNamesLab() {
  const { activity, lang } = useActivityI18n('star-names')
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
            {index + 1}/{quiz.length} · {loc(lang, current.tag)}. {text(lang, 'Rengine bak, adını seç.', 'Look at its color and choose its name.')}
          </p>
          <div className="choice-row">
            {options.map((star) => (
              <button key={star.id} type="button" className="chip" onClick={() => choose(star.id)}>
                {starDisplayName(star, lang)}
              </button>
            ))}
          </div>
        </div>
      ) : null}
      {step === 'result' ? (
        <p>
          <strong className="success">{prediction ?? score}/3 {text(lang, 'doğru.', 'correct.')}</strong>{' '}
          {loc(lang, activity.resultTitle)}
        </p>
      ) : null}
    </div>
  )
}

export function SpaceMissionLab() {
  const { activity, lang } = useActivityI18n('space-mission')
  const index = useLabStore((s) => s.missionIndex)
  const setIndex = useLabStore((s) => s.setMissionIndex)
  const setStep = useLabStore((s) => s.setStep)
  const step = useLabStore((s) => s.step)
  const moonDeg = useLabStore((s) => s.moonPhaseDeg)
  const steps = [
    { title: text(lang, 'Mars’a bak', 'Look at Mars'), body: text(lang, 'Mars’ın yılı daha uzun sürer.', 'A Mars year takes longer.') },
    { title: text(lang, 'Dolunayı hizala', 'Line up the full Moon'), body: text(lang, 'Ay’ı Dünya’nın gece tarafına sürükle.', 'Drag the Moon to Earth’s night side.') },
    { title: text(lang, 'Ay’da zıpla', 'Jump on the Moon'), body: text(lang, 'Ay’da zıplama daha yüksektir.', 'A jump is higher on the Moon.') },
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

  if (step === 'result') return <p>{loc(lang, activity.resultTitle)}</p>

  return (
    <div>
      <p>
        {text(lang, 'Bakış', 'View')} {index + 1} / {steps.length}
      </p>
      <p>
        <strong>{current.title}</strong> {current.body}
      </p>
      {index === 1 && isFullMoon(moonDeg) ? <p className="success">{text(lang, 'Dolunay oldu.', 'It is a full Moon.')}</p> : null}
      <div className="row-actions">
        {index === 2 ? (
          <button type="button" className="btn" onClick={() => getScene()?.playSurfaceLab()}>
            {text(lang, 'Zıplat', 'Jump')}
          </button>
        ) : null}
        {index < 2 ? (
          <button type="button" className="btn primary" disabled={!ready} onClick={() => setIndex(index + 1)}>
            {ready ? loc(lang, activity.simulateLabel) : (lang === 'en' ? 'Catch the full Moon first' : 'Önce dolunayı yakala')}
          </button>
        ) : (
          <button type="button" className="btn primary" onClick={() => setStep('result')}>
            {loc(lang, activity.simulateLabel)}
          </button>
        )}
      </div>
    </div>
  )
}

export function LightTravelLab() {
  const { activity, lang } = useActivityI18n('light-travel')
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
            {text(lang, 'Görüntüde', 'In the view')} {LIGHT_SCENE_SEC[seconds > 800 ? 'jupiter' : 'earth']} {text(lang, 'sn', 'sec')}
            {arrived ? ` · ${text(lang, 'Işık ulaştı.', 'The light arrived.')}` : ''}
          </p>
          <p className="muted">
            {text(lang, 'Gerçekte', 'In reality')} {lightTravelLabel(seconds > 800 ? 'jupiter' : 'earth')}
            {' '}({displayName(getBody('earth'), lang)} ≈ 8 {text(lang, 'dk', 'min')} 20 {text(lang, 'sn', 'sec')} · {displayName(getBody('jupiter'), lang)} ≈ 43 {text(lang, 'dk', 'min')})
          </p>
          <div className="choice-row">
            <button
              type="button"
              className={`chip ${sawEarth ? 'is-active' : ''}`}
              onClick={() => getScene()?.startLightPulse('earth')}
            >
              {text(lang, 'Dünya’ya gönder', 'Send to Earth')}
            </button>
            <button
              type="button"
              className={`chip ${sawJupiter ? 'is-active' : ''}`}
              disabled={!sawEarth}
              onClick={() => getScene()?.startLightPulse('jupiter')}
            >
              {text(lang, 'Jüpiter’e gönder', 'Send to Jupiter')}
            </button>
          </div>
          <button type="button" className="btn primary" disabled={!ready} onClick={() => setStep('result')}>
            {ready ? loc(lang, activity.simulateLabel) : (lang === 'en' ? 'Earth first, then Jupiter' : 'Önce Dünya, sonra Jüpiter')}
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <ResultCopy id="light-travel" correct={correct} />
      ) : null}
    </div>
  )
}

export function SeasonsTiltLab() {
  const { activity, lang } = useActivityI18n('seasons-tilt')
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
              {text(lang, 'Dünya biraz yan dursun', 'Tilt Earth a little')}
            </button>
            <button type="button" className={`chip ${!tiltOn ? 'is-active' : ''}`} onClick={() => apply(false, month)}>
              {text(lang, 'Dünya dik dursun', 'Keep Earth upright')}
            </button>
          </div>
          <div className="choice-row">
            <button type="button" className={`chip ${month === 'jan' ? 'is-active' : ''}`} onClick={() => apply(tiltOn, 'jan')}>
              {text(lang, 'Ocak', 'January')}
            </button>
            <button type="button" className={`chip ${month === 'jul' ? 'is-active' : ''}`} onClick={() => apply(tiltOn, 'jul')}>
              {text(lang, 'Temmuz', 'July')}
            </button>
          </div>
          <p className="muted">{loc(lang, activity.explain)}</p>
          <button type="button" className="btn primary" onClick={() => setStep('result')}>
            {loc(lang, activity.simulateLabel)}
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <ResultCopy id="seasons-tilt" correct={correct} />
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
  const { activity, lang } = useActivityI18n('closest-hottest')
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
              ? `${displayName(getBody('venus'), lang)} ≈ ${HEAT_TEMP.venus}°C · ${displayName(getBody('mercury'), lang)} ≈ ${HEAT_TEMP.mercury}°C · ${displayName(getBody('earth'), lang)} ≈ ${HEAT_TEMP.earth}°C`
              : loc(lang, activity.watchHint)}
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
              {text(lang, 'Venüs’ün kalın havasını kaldır', 'Remove Venus’s thick air')}
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
              {text(lang, 'Kalın havayı geri koy', 'Put the thick air back')}
            </button>
          </div>
          <button type="button" className="btn primary" disabled={!tried} onClick={() => setStep('result')}>
            {tried ? loc(lang, activity.simulateLabel) : (lang === 'en' ? 'Try the air first' : 'Önce havayı dene')}
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <ResultCopy id="closest-hottest" correct={correct} />
      ) : null}
    </div>
  )
}

export function CometTailLab() {
  const { activity, lang } = useActivityI18n('comet-tail')
  const setStep = useLabStore((s) => s.setStep)
  const prediction = useLabStore((s) => s.prediction)
  const step = useLabStore((s) => s.step)
  const moved = useLabStore((s) => s.cometMoved)
  const correct = prediction === 'sun'

  return (
    <div>
      {step === 'simulate' ? (
        <div className="lab-controls">
          <p className="muted">{loc(lang, activity.watchHint)}</p>
          <div className="choice-row">
            <button type="button" className="chip" onClick={() => getScene()?.nudgeComet(true)}>
              {text(lang, 'Güneş’e yaklaştır', 'Move closer to the Sun')}
            </button>
            <button type="button" className="chip" onClick={() => getScene()?.nudgeComet(false)}>
              {text(lang, 'Güneş’ten uzaklaştır', 'Move away from the Sun')}
            </button>
          </div>
          <button type="button" className="btn primary" disabled={!moved} onClick={() => setStep('result')}>
            {moved ? loc(lang, activity.simulateLabel) : (lang === 'en' ? 'Move the comet first' : 'Önce kuyrukluyu oynat')}
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <ResultCopy id="comet-tail" correct={correct} />
      ) : null}
    </div>
  )
}

export function MercuryLongDayLab() {
  const { activity, lang } = useActivityI18n('mercury-long-day')
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
            {text(lang, 'Tur', 'Trip')} <strong>{Math.round(year * 100)}%</strong> · {text(lang, 'Gün', 'Day')} <strong>{Math.round(day * 100)}%</strong>
          </p>
          <div className="bar-pair">
            <div className="bar-line">
              <div className="bar-track">
                <i style={{ width: `${Math.max(4, year * 100)}%` }} />
              </div>
              <em>{text(lang, 'Güneş etrafında tur (yıl)', 'Trip around the Sun (year)')}</em>
            </div>
            <div className="bar-line">
              <div className="bar-track">
                <i className="b" style={{ width: `${Math.max(4, day * 100)}%` }} />
              </div>
              <em>{text(lang, 'Güneş’in bir kez doğup batması (gün)', 'One sunrise and sunset (day)')}</em>
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
              {loc(lang, activity.simulateLabel)}
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
              {text(lang, 'Bir günü izle', 'Watch one day')}
            </button>
          </div>
          <button
            type="button"
            className="btn primary"
            disabled={year < 0.9 && day < 0.45}
            onClick={() => useLabStore.getState().setStep('result')}
          >
            {year >= 0.9 || day >= 0.45 ? loc(lang, activity.simulateLabel) : (lang === 'en' ? 'Watch the year or day first' : 'Önce yılı veya günü izle')}
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <ResultCopy id="mercury-long-day" correct={correct} />
      ) : null}
    </div>
  )
}

export function KeplerPizzaLab() {
  const { activity, lang } = useActivityI18n('kepler-pizza')
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
          <p className="muted">{loc(lang, activity.watchHint)}</p>
          <button type="button" className="btn primary" disabled={!ready} onClick={() => setStep('result')}>
            {ready ? loc(lang, activity.simulateLabel) : (lang === 'en' ? 'Wait for the near and far slices' : 'Yakın ve uzak dilimi bekle')}
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <ResultCopy id="kepler-pizza" correct={correct} />
      ) : null}
    </div>
  )
}

export function EclipseAlignLab() {
  const { activity, lang } = useActivityI18n('eclipse-align')
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
            {text(lang, 'Evre:', 'Phase:')} <strong>{localizedMoonPhase(deg, lang)}</strong>
            {kind === 'lunar'
              ? ` · ${text(lang, 'Ay tutulması', 'Lunar eclipse')}`
              : kind === 'solar'
                ? ` · ${text(lang, 'Güneş tutulması', 'Solar eclipse')}`
                : ''}
          </p>
          <p className="muted">{loc(lang, activity.watchHint)}</p>
          <button type="button" className="btn primary" disabled={kind === 'none'} onClick={() => setStep('result')}>
            {kind === 'none' ? (lang === 'en' ? 'Enter the shadow first' : 'Önce gölgeye gir') : loc(lang, activity.simulateLabel)}
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <ResultCopy id="eclipse-align" correct={correct} />
      ) : null}
    </div>
  )
}

const URSA = ['dubhe', 'merak', 'phecda', 'megrez', 'alioth', 'mizar', 'alcaid'] as const
const URSA_NAME = {
  dubhe: L('Kepçe ucu', 'Bowl tip'),
  merak: L('Kepçe kenarı', 'Bowl edge'),
  phecda: L('Kepçe dibi', 'Bowl base'),
  megrez: L('Sap başı', 'Handle start'),
  alioth: L('Sap ortası', 'Handle middle'),
  mizar: L('Sap çifti', 'Handle pair'),
  alcaid: L('Sap ucu', 'Handle tip'),
}

export function UrsaHuntLab() {
  const { activity, lang } = useActivityI18n('ursa-hunt')
  const found = useLabStore((s) => s.huntStars)
  const setStep = useLabStore((s) => s.setStep)
  const step = useLabStore((s) => s.step)
  const done = URSA.every((id) => found.includes(id))
  return (
    <div>
      {step === 'simulate' ? (
        <div className="lab-controls">
          <p className="muted">{loc(lang, activity.watchHint)}</p>
          <p>
            <strong>{found.length}/7</strong>
          </p>
          <ul className="stats">
            {URSA.map((id) => (
              <li key={id}>
                <span>{loc(lang, URSA_NAME[id])}</span>
                <strong>{found.includes(id) ? text(lang, 'Bulundu', 'Found') : '…'}</strong>
              </li>
            ))}
          </ul>
          <button type="button" className="btn primary" disabled={!done} onClick={() => setStep('result')}>
            {done ? text(lang, 'Takımyıldızı tamam', 'Constellation complete') : loc(lang, activity.simulateLabel)}
          </button>
        </div>
      ) : null}
      {step === 'result' ? <p className="success">{loc(lang, activity.resultTitle)}</p> : null}
    </div>
  )
}

export function LightDiaryLab() {
  const { activity, lang } = useActivityI18n('light-diary')
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
              {text(lang, 'Dünya’ya gönder', 'Send to Earth')}
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
              {text(lang, 'Proxima yolunu izle', 'Watch the path to Proxima')}
            </button>
          </div>
          {starRun ? (
            <p className="muted">{text(lang, 'Proxima ~4,24 ışık yılı — ışık yaklaşık 4 yıl 3 ay. Görüntüde foton gitmez; bu gerçek süredir.', 'Proxima is ~4.24 light-years away—the light takes about 4 years 3 months. No photon moves in the view; this is the real duration.')}</p>
          ) : null}
          <button type="button" className="btn" disabled={!ready} onClick={() => setStep('result')}>
            {ready ? loc(lang, activity.simulateLabel) : (lang === 'en' ? 'Earth first, then Proxima' : 'Önce Dünya, sonra Proxima')}
          </button>
        </div>
      ) : null}
      {step === 'result' ? (
        <ResultCopy id="light-diary" correct={correct} />
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
