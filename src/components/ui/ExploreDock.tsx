import { SECOND_SCALE, TIME_LADDER } from '../../astronomy/timeEngine'
import { formatSimulationDate } from '../../utils/formatting'
import { MISSIONS } from '../../content/missions'
import { useEducationStore } from '../../store/educationStore'
import { useSimulationStore } from '../../store/simulationStore'
import { useUiStore } from '../../store/uiStore'
import { Icon } from './Icon'

const NOW_SLACK_MS = 2000

export function CompactTimeBar() {
  const playing = useSimulationStore((s) => s.playing)
  const toggle = useSimulationStore((s) => s.togglePlaying)
  const displayed = useSimulationStore((s) => s.displayedTimeMs)
  const scale = useSimulationStore((s) => s.timeScale)
  const setScale = useSimulationStore((s) => s.setTimeScale)
  const goNow = useSimulationStore((s) => s.goNowRealtime)
  const addYears = useSimulationStore((s) => s.addYears)
  const direction = useSimulationStore((s) => s.direction)
  const setDirection = useSimulationStore((s) => s.setDirection)
  const missionId = useEducationStore((s) => s.activeMissionId)
  const mission = MISSIONS.find((item) => item.id === missionId)
  const panel = useUiStore((s) => s.activePanel)
  const atNow = scale === SECOND_SCALE && Math.abs(displayed - Date.now()) < NOW_SLACK_MS

  return (
    <div className="explore-cluster">
      {mission && panel === 'none' ? (
        <p className="mission-banner" title={`${mission.title} — ${mission.instruction}`}>
          {mission.title}
        </p>
      ) : null}
      <footer className="time-compact" aria-label="Zaman">
        <button
          type="button"
          className={`btn icon-only${direction < 0 ? ' is-on' : ''}`}
          onClick={() => setDirection(-1)}
          aria-label="Geri sar"
          aria-pressed={direction < 0}
        >
          <Icon name="back" />
        </button>
        <button type="button" className="btn primary" onClick={toggle} aria-label={playing ? 'Duraklat' : 'Oynat'}>
          <Icon name={playing ? 'pause' : 'play'} />
          <span className="time-label">{playing ? 'Duraklat' : 'Oynat'}</span>
        </button>
        <p className="time-readout">{formatSimulationDate(displayed)}</p>
        <div className="time-segments" role="group" aria-label="Bir gerçek saniyede geçen süre">
          {TIME_LADDER.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className={scale === preset.scale ? 'is-active' : ''}
              onClick={() => setScale(preset.scale)}
            >
              {preset.label}
            </button>
          ))}
        </div>
        <button type="button" className={`chip${atNow ? ' is-on' : ''}`} onClick={goNow}>
          Şu An
        </button>
        <button
          type="button"
          className="chip"
          onClick={() => {
            addYears(1)
            useEducationStore.getState().notifyTimeAdvanceDays(365)
          }}
        >
          1 Yıl Atla
        </button>
        <button
          type="button"
          className={`btn icon-only${direction > 0 ? ' is-on' : ''}`}
          onClick={() => setDirection(1)}
          aria-label="İleri sar"
          aria-pressed={direction > 0}
        >
          <Icon name="forward" />
        </button>
      </footer>
    </div>
  )
}
