import { SECOND_SCALE, TIME_LADDER } from '../../astronomy/timeEngine'
import { formatSimulationDate } from '../../utils/formatting'
import { MISSIONS } from '../../content/missions'
import { lookAtSolarSystem } from '../../features/planetExplorer/focus'
import { useEducationStore } from '../../store/educationStore'
import { useEventStore } from '../../store/eventStore'
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
  const bodyId = useSimulationStore((s) => s.selectedBodyId)
  const wonderId = useSimulationStore((s) => s.selectedWonderId)
  const eventId = useEventStore((s) => s.selectedEventId)
  const missionId = useEducationStore((s) => s.activeMissionId)
  const mission = MISSIONS.find((item) => item.id === missionId)
  const panel = useUiStore((s) => s.activePanel)
  const overview = !bodyId && !wonderId && !eventId
  const atNow = scale === SECOND_SCALE && Math.abs(displayed - Date.now()) < NOW_SLACK_MS

  return (
    <div className="explore-cluster">
      {mission && panel === 'none' ? (
        <p className="mission-banner" title={`${mission.title} — ${mission.instruction}`}>
          {mission.title}
        </p>
      ) : null}
      <footer className="time-compact" aria-label="Zaman">
        <button type="button" className={`btn${overview ? ' emergency' : ''}`} onClick={lookAtSolarSystem}>
          <Icon name="sun" />
          <span className="time-label">Güneş’e dön</span>
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
      </footer>
    </div>
  )
}
