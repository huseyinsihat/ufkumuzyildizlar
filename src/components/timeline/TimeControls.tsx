import { TIME_PRESETS } from '../../astronomy/timeEngine'
import { tx } from '../../i18n/types'
import { useLang, useT } from '../../i18n/useT'
import { formatSimulationDate } from '../../utils/formatting'
import { useEducationStore } from '../../store/educationStore'
import { useSimulationStore } from '../../store/simulationStore'

export function TimeControls() {
  const t = useT()
  const lang = useLang()
  const playing = useSimulationStore((s) => s.playing)
  const toggle = useSimulationStore((s) => s.togglePlaying)
  const scale = useSimulationStore((s) => s.timeScale)
  const setScale = useSimulationStore((s) => s.setTimeScale)
  const direction = useSimulationStore((s) => s.direction)
  const setDirection = useSimulationStore((s) => s.setDirection)
  const displayed = useSimulationStore((s) => s.displayedTimeMs)
  const setNow = useSimulationStore((s) => s.setNow)
  const addYears = useSimulationStore((s) => s.addYears)
  const addDays = useSimulationStore((s) => s.addDays)
  const setDateParts = useSimulationStore((s) => s.setDateParts)
  const notifyYear = useEducationStore((s) => s.notifyTimeAdvanceDays)

  const date = new Date(displayed)

  function jumpYears(years: number) {
    addYears(years)
    notifyYear(Math.abs(years) * 365)
  }

  return (
    <footer className="time-bar" aria-label={t('time')}>
      <div className="time-main">
        <button type="button" className="btn" onClick={() => setDirection(-1)} aria-label={t('rewind')} aria-pressed={direction < 0}>
          ◀ {t('back')}
        </button>
        <button type="button" className="btn primary" onClick={toggle} aria-label={playing ? t('pause') : t('play')}>
          {playing ? t('pause') : t('play')}
        </button>
        <button type="button" className="btn" onClick={() => setDirection(1)} aria-label={t('fastForward')} aria-pressed={direction > 0}>
          {t('next')} ▶
        </button>
        <p className="time-readout" aria-live="polite">
          {formatSimulationDate(displayed, lang)}
        </p>
      </div>
      <div className="time-speeds" role="group" aria-label="Zaman hızı">
        {TIME_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            className={scale === preset.scale ? 'chip is-active' : 'chip'}
            onClick={() => setScale(preset.scale)}
          >
            {tx(lang, preset.label)}
          </button>
        ))}
        <label className="custom-speed">
          Özel
          <input
            type="number"
            min={1}
            aria-label="Özel hız çarpanı"
            placeholder="hız"
            onBlur={(e) => {
              const value = Number(e.target.value)
              if (Number.isFinite(value) && value > 0) setScale(value)
            }}
          />
        </label>
      </div>
      <div className="time-jumps">
        <button type="button" className="chip" onClick={setNow}>
          {t('now')}
        </button>
        <button type="button" className="chip" onClick={() => jumpYears(1)}>
          {t('skipYear')}
        </button>
        <button type="button" className="chip" onClick={() => jumpYears(10)}>
          10 yıl sonra
        </button>
        <button type="button" className="chip" onClick={() => jumpYears(100)}>
          100 yıl sonra
        </button>
        <button type="button" className="chip" onClick={() => jumpYears(-1)}>
          Geçmişe git (1 yıl)
        </button>
        <button type="button" className="chip" onClick={() => jumpYears(1)}>
          Geleceğe git (1 yıl)
        </button>
      </div>
      <form
        className="time-form"
        onSubmit={(e) => {
          e.preventDefault()
          const form = new FormData(e.currentTarget)
          setDateParts({
            year: Number(form.get('year')),
            month: Number(form.get('month')),
            day: Number(form.get('day')),
            hour: Number(form.get('hour')),
            minute: Number(form.get('minute')),
          })
        }}
      >
        <label>
          Gün
          <input name="day" type="number" min={1} max={31} defaultValue={date.getDate()} />
        </label>
        <label>
          Ay
          <input name="month" type="number" min={1} max={12} defaultValue={date.getMonth() + 1} />
        </label>
        <label>
          Yıl
          <input name="year" type="number" defaultValue={date.getFullYear()} />
        </label>
        <label>
          Saat
          <input name="hour" type="number" min={0} max={23} defaultValue={date.getHours()} />
        </label>
        <label>
          Dakika
          <input name="minute" type="number" min={0} max={59} defaultValue={date.getMinutes()} />
        </label>
        <button type="submit" className="btn">
          Tarihi uygula
        </button>
        <button type="button" className="chip" onClick={() => addDays(1)}>
          +1 gün
        </button>
      </form>
    </footer>
  )
}
