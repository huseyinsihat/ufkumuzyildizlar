import { SECOND_SCALE, TIME_LADDER } from '../../astronomy/timeEngine'
import { loc, tx } from '../../i18n/types'
import { useLang, useT } from '../../i18n/useT'
import { formatSimulationDateParts } from '../../utils/formatting'
import { MISSIONS } from '../../content/missions'
import { useEducationStore } from '../../store/educationStore'
import { useSimulationStore } from '../../store/simulationStore'
import { useUiStore } from '../../store/uiStore'
import { Icon } from './Icon'

const NOW_SLACK_MS = 2000

export function CompactTimeBar() {
  const t = useT()
  const lang = useLang()
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
  const { date, time } = formatSimulationDateParts(displayed, lang)
  const missionTitle = mission ? loc(lang, mission.title) : ''
  const missionHint = mission ? `${missionTitle} — ${loc(lang, mission.instruction)}` : ''

  return (
    <div className="explore-cluster">
      {mission && panel === 'none' ? (
        <p className="mission-banner" title={missionHint}>
          {missionTitle}
        </p>
      ) : null}
      <footer className="time-compact" aria-label={t('time')}>
        <div className="time-row time-row-play">
          <div className="time-transport" role="group" aria-label={t('playback')}>
            <button
              type="button"
              className={`btn icon-only${direction < 0 ? ' is-on' : ''}`}
              onClick={() => setDirection(-1)}
              aria-label={t('rewind')}
              aria-pressed={direction < 0}
            >
              <Icon name="back" />
            </button>
            <button
              type="button"
              className="btn time-play"
              onClick={toggle}
              aria-label={playing ? t('pause') : t('play')}
            >
              <Icon name={playing ? 'pause' : 'play'} />
              <span className="time-label">{playing ? t('pause') : t('play')}</span>
            </button>
            <button
              type="button"
              className={`btn icon-only${direction > 0 ? ' is-on' : ''}`}
              onClick={() => setDirection(1)}
              aria-label={t('fastForward')}
              aria-pressed={direction > 0}
            >
              <Icon name="forward" />
            </button>
          </div>
          <p className="time-readout">
            <span className="time-date">{date}</span>
            <span className="time-clock">{time}</span>
          </p>
        </div>
        <div className="time-row time-row-speed">
          <div className="time-segments" role="group" aria-label={t('speed')}>
            {TIME_LADDER.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className={scale === preset.scale ? 'is-active' : ''}
                onClick={() => setScale(preset.scale)}
              >
                <span className="time-seg-full">{tx(lang, preset.label)}</span>
                <span className="time-seg-short">{tx(lang, preset.shortLabel)}</span>
              </button>
            ))}
          </div>
          <div className="time-now" role="group" aria-label={t('timeSkip')}>
            <button type="button" className={`chip${atNow ? ' is-on' : ''}`} onClick={goNow}>
              {t('now')}
            </button>
            <button
              type="button"
              className="chip time-skip"
              title={t('skipYear')}
              onClick={() => {
                addYears(1)
                useEducationStore.getState().notifyTimeAdvanceDays(365)
              }}
            >
              {t('skip')}
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
