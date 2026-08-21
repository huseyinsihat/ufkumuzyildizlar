import { formatSimulationDate } from '../../utils/formatting'
import { TIME_PRESETS } from '../../astronomy/timeEngine'
import { useSimulationStore } from '../../store/simulationStore'

export function CompactTimeBar() {
  const playing = useSimulationStore((s) => s.playing)
  const toggle = useSimulationStore((s) => s.togglePlaying)
  const displayed = useSimulationStore((s) => s.displayedTimeMs)
  const scale = useSimulationStore((s) => s.timeScale)
  const setScale = useSimulationStore((s) => s.setTimeScale)
  const setNow = useSimulationStore((s) => s.setNow)
  const day = TIME_PRESETS.find((item) => item.id === 'day')?.scale ?? 86_400
  const year = TIME_PRESETS.find((item) => item.id === 'year')?.scale ?? 86_400 * 365

  return (
    <footer className="time-compact" aria-label="Zaman">
      <button type="button" className="btn primary" onClick={toggle} aria-label={playing ? 'Duraklat' : 'Oynat'}>
        {playing ? 'Duraklat' : 'Oynat'}
      </button>
      <p className="time-readout">{formatSimulationDate(displayed)}</p>
      <button type="button" className={scale === day ? 'chip is-active' : 'chip'} onClick={() => setScale(day)}>
        1 gün/sn
      </button>
      <button type="button" className={scale === year ? 'chip is-active' : 'chip'} onClick={() => setScale(year)}>
        1 yıl/sn
      </button>
      <button type="button" className="chip" onClick={setNow}>
        Şu an
      </button>
    </footer>
  )
}
