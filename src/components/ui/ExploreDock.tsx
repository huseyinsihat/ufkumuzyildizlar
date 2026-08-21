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
  const second = TIME_PRESETS.find((item) => item.id === '1')?.scale ?? 1
  const day = TIME_PRESETS.find((item) => item.id === 'day')?.scale ?? 86_400
  const year = TIME_PRESETS.find((item) => item.id === 'year')?.scale ?? 86_400 * 365

  return (
    <footer className="time-compact" aria-label="Zaman">
      <button type="button" className="btn primary" onClick={toggle} aria-label={playing ? 'Duraklat' : 'Oynat'}>
        {playing ? 'Duraklat' : 'Oynat'}
      </button>
      <p className="time-readout">{formatSimulationDate(displayed)}</p>
      <div className="time-segments" role="group" aria-label="Simülasyon hızı">
        <button type="button" className={scale === second ? 'is-active' : ''} onClick={() => setScale(second)}>
          1 sn
        </button>
        <button type="button" className={scale === day ? 'is-active' : ''} onClick={() => setScale(day)}>
          1 gün
        </button>
        <button type="button" className={scale === year ? 'is-active' : ''} onClick={() => setScale(year)}>
          1 yıl
        </button>
      </div>
      <button type="button" className="chip" onClick={setNow}>
        Şu an
      </button>
    </footer>
  )
}
