import { TIME_PRESETS } from '../../astronomy/timeEngine'
import { formatSimulationDate } from '../../utils/formatting'
import { lookAtSolarSystem } from '../../features/planetExplorer/focus'
import { useSimulationStore } from '../../store/simulationStore'
import { Icon } from './Icon'

export function CompactTimeBar() {
  const playing = useSimulationStore((s) => s.playing)
  const toggle = useSimulationStore((s) => s.togglePlaying)
  const displayed = useSimulationStore((s) => s.displayedTimeMs)
  const scale = useSimulationStore((s) => s.timeScale)
  const setScale = useSimulationStore((s) => s.setTimeScale)
  const goNow = useSimulationStore((s) => s.goNowRealtime)
  const second = TIME_PRESETS.find((item) => item.id === '1')?.scale ?? 1
  const day = TIME_PRESETS.find((item) => item.id === 'day')?.scale ?? 86_400
  const year = TIME_PRESETS.find((item) => item.id === 'year')?.scale ?? 86_400 * 365

  return (
    <footer className="time-compact" aria-label="Zaman">
      <button type="button" className="btn emergency" onClick={lookAtSolarSystem}>
        <Icon name="sun" />
        Güneşe Dön
      </button>
      <button type="button" className="btn primary" onClick={toggle} aria-label={playing ? 'Duraklat' : 'Oynat'}>
        <Icon name={playing ? 'pause' : 'play'} />
        {playing ? 'Duraklat' : 'Oynat'}
      </button>
      <p className="time-readout">{formatSimulationDate(displayed)}</p>
      <div className="time-speed">
        <p className="time-speed-label">1 saniyede</p>
        <div className="time-segments" role="group" aria-label="Bir gerçek saniyede geçen simülasyon süresi">
          <button type="button" className={scale === second ? 'is-active' : ''} onClick={() => setScale(second)}>
            1 Sn
          </button>
          <button type="button" className={scale === day ? 'is-active' : ''} onClick={() => setScale(day)}>
            1 Gün
          </button>
          <button type="button" className={scale === year ? 'is-active' : ''} onClick={() => setScale(year)}>
            1 Yıl
          </button>
        </div>
      </div>
      <button type="button" className="chip" onClick={goNow}>
        Şu an
      </button>
    </footer>
  )
}
