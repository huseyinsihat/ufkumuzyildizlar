import { useState } from 'react'
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

export function WhoFasterLab() {
  const winner = useLabStore((s) => s.raceWinner)
  const step = useLabStore((s) => s.step)
  const prediction = useLabStore((s) => s.prediction)

  return (
    <div>
      {step === 'simulate' ? (
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
          Merkür vs Dünya
        </button>
      ) : null}
      {step === 'simulate' ? (
        <button type="button" className="text-link" onClick={() => {
          useLabStore.getState().setRaceWinner('mercury')
          useLabStore.getState().setStep('result')
          useSimulationStore.getState().setPlaying(false)
        }}>
          Sonucu şimdi göster
        </button>
      ) : null}
      {step === 'result' ? (
        <p>
          Kazanan: <strong>{winner === 'earth' ? 'Dünya' : 'Merkür'}</strong>
          {prediction ? ` · Tahminin: ${prediction === 'mercury' ? 'Merkür' : prediction === 'earth' ? 'Dünya' : 'aynı'}` : null}
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

  return (
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
  )
}

export function DayNightLab() {
  const setStep = useLabStore((s) => s.setStep)
  return (
    <div>
      <p className="muted">İzmir, İstanbul, Ankara, Şanlıurfa, Diyarbakır ve Van pinlerini izle. Aynı ülkede oldukları için geceye neredeyse birlikte girerler.</p>
      <button
        type="button"
        className="btn primary"
        onClick={() => {
          useSimulationStore.getState().setFreezeRevolution(true)
          useSimulationStore.getState().setFreezeRotation(false)
          useSimulationStore.getState().setTimeScale(dayScale)
          useSimulationStore.getState().setPlaying(true)
          getScene()?.focusEarthSurface()
        }}
      >
        24 saati hızlandır
      </button>
      <button type="button" className="btn" onClick={() => setStep('result')}>
        Sonuca geç
      </button>
    </div>
  )
}

export function MassWeightLab() {
  const [kg, setKg] = useState(30)
  const setStep = useLabStore((s) => s.setStep)
  const earth = earthRelativeWeight(kg, 'earth')
  const moon = earthRelativeWeight(kg, 'moon')
  const mars = earthRelativeWeight(kg, 'mars')

  return (
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
  )
}

export function DropBallLab() {
  const [run, setRun] = useState(false)
  const setStep = useLabStore((s) => s.setStep)
  return (
    <div>
      <p className="muted">Aynı yükseklikten bırakılan gerçekçi top; Ay’da yavaş, Dünya’da orta, Jüpiter’de hızla düşer. Jüpiter’de katı yer yoktur.</p>
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
  )
}

export function JumpLab() {
  const [body, setBody] = useState<BodyId>('earth')
  const [run, setRun] = useState(false)
  const setStep = useLabStore((s) => s.setStep)
  return (
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
  )
}

export function RealScaleLab() {
  const setStep = useLabStore((s) => s.setStep)
  const mode = useSimulationStore((s) => s.scaleMode)
  return (
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
  )
}

const ORDER: BodyId[] = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune']

export function ArrangeOrbitsLab() {
  const [slots, setSlots] = useState<(BodyId | null)[]>(() => Array(8).fill(null))
  const [pool, setPool] = useState<BodyId[]>(() => [...ORDER].sort(() => Math.random() - 0.5))
  const [drag, setDrag] = useState<BodyId | null>(null)
  const setStep = useLabStore((s) => s.setStep)
  const ready = slots.every((slot, index) => slot === ORDER[index])

  function dropOn(index: number) {
    if (!drag) return
    if (ORDER[index] !== drag) return
    setSlots((current) => {
      const next = [...current]
      next[index] = drag
      return next
    })
    setPool((current) => current.filter((id) => id !== drag))
    setDrag(null)
  }

  return (
    <div>
      <p className="muted">{ready ? 'Doğru sıra! Simülasyonu başlat.' : 'Gezegeni doğru yörünge yuvasına bırak.'}</p>
      <div className="orbit-slots">
        {slots.map((slot, index) => (
          <button
            key={ORDER[index]}
            type="button"
            className={`slot ${slot ? 'filled' : ''}`}
            onClick={() => dropOn(index)}
          >
            {index + 1}. {slot ? getBody(slot).name : 'boş'}
          </button>
        ))}
      </div>
      <div className="choice-row">
        {pool.map((id) => (
          <button key={id} type="button" className={`chip ${drag === id ? 'is-active' : ''}`} onClick={() => setDrag(id)}>
            {getBody(id).name}
          </button>
        ))}
      </div>
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
        Simülasyonu başlat
      </button>
    </div>
  )
}

export function MoonPhasesLab() {
  const deg = useLabStore((s) => s.moonPhaseDeg)
  const setStep = useLabStore((s) => s.setStep)
  const full = isFullMoon(deg)
  return (
    <div>
      <p>
        Evre: <strong>{moonPhaseName(deg)}</strong> ({deg.toFixed(0)}°)
      </p>
      <p className="muted">Ay’ı 3B sahnede sürükle. Dolunay için Dünya’nın Güneş’e göre arkasında olsun.</p>
      {full ? <p className="success">DOLUNAY OLUŞTU</p> : null}
      <button type="button" className="btn primary" onClick={() => setStep('result')}>
        {full ? 'Nedenini gör' : 'Bu evreyi kaydet'}
      </button>
    </div>
  )
}

export function StarsOrEarthLab() {
  const setStep = useLabStore((s) => s.setStep)
  return (
    <div className="choice-row">
      <button
        type="button"
        className="chip"
        onClick={() => {
          useSimulationStore.getState().setSkyCamera(true)
          useSimulationStore.getState().setTimeScale(3600)
          useSimulationStore.getState().setPlaying(true)
          getScene()?.enterSkyView()
        }}
      >
        1 saat
      </button>
      <button
        type="button"
        className="chip"
        onClick={() => {
          useSimulationStore.getState().setSkyCamera(true)
          useSimulationStore.getState().setTimeScale(3600 * 6)
          useSimulationStore.getState().setPlaying(true)
        }}
      >
        6 saat
      </button>
      <button
        type="button"
        className="chip"
        onClick={() => {
          useSimulationStore.getState().setSkyCamera(true)
          useSimulationStore.getState().setTimeScale(3600 * 12)
          useSimulationStore.getState().setPlaying(true)
        }}
      >
        12 saat
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
  const shown = Math.round(progress * seconds)
  const mm = Math.floor(shown / 60)
  const ss = shown % 60

  return (
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
      </div>
    </div>
  )
}

export function SeasonsTiltLab() {
  const setStep = useLabStore((s) => s.setStep)
  return (
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
  )
}

export function ClosestHottestLab() {
  const setStep = useLabStore((s) => s.setStep)
  return (
    <div>
      <p className="muted">Kırmızı halka daha sıcak. Venüs’ün battaniyesi atmosferidir.</p>
      <div className="row-actions">
        <button type="button" className="btn" onClick={() => getScene()?.setVenusBlanket(false)}>
          Battaniyeyi çıkar
        </button>
        <button type="button" className="btn primary" onClick={() => getScene()?.setVenusBlanket(true)}>
          Battaniyeyi giydir
        </button>
        <button type="button" className="btn" onClick={() => setStep('result')}>
          Bunu gördüm
        </button>
      </div>
    </div>
  )
}

export function CometTailLab() {
  const setStep = useLabStore((s) => s.setStep)
  return (
    <div>
      <p className="muted">Buz topunu Güneş’in etrafında sürükle. Kuyruk hep Güneş’ten uzağa bakar.</p>
      <button type="button" className="btn primary" onClick={() => setStep('result')}>
        Bunu gördüm
      </button>
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
  if (id === 'space-mission') return <SpaceMissionLab />
  if (id === 'light-travel') return <LightTravelLab />
  if (id === 'seasons-tilt') return <SeasonsTiltLab />
  if (id === 'closest-hottest') return <ClosestHottestLab />
  if (id === 'comet-tail') return <CometTailLab />
  if (id === 'mercury-long-day') return <MercuryLongDayLab />
  return null
}
