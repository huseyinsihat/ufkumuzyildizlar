import { getScene } from '../../scene/sceneApi'
import { useHardwareStore } from '../../hardware/hardwareStore'
import { useEducationStore } from '../../store/educationStore'
import { useSimulationStore } from '../../store/simulationStore'
import { useUiStore } from '../../store/uiStore'
import { useVoiceStore } from '../../store/voiceStore'
import type { VoiceLang } from '../../features/voice/clips'
import { scaleExplanation } from '../../features/scaleMode'
import { useLang, useT } from '../../i18n/useT'
import { Icon, type IconName } from './Icon'
import type { ScaleMode } from '../../types/simulation'

const VOICE_LANGS: { id: VoiceLang; label: string }[] = [
  { id: 'tr', label: 'Türkçe' },
  { id: 'en', label: 'EN' },
]

function Chip({
  on,
  label,
  icon,
  onToggle,
}: {
  on: boolean
  label: string
  icon: IconName
  onToggle: (value: boolean) => void
}) {
  return (
    <button type="button" className={`settings-chip${on ? ' is-on' : ''}`} aria-pressed={on} onClick={() => onToggle(!on)}>
      <Icon name={icon} />
      {label}
    </button>
  )
}

export function SettingsPanel() {
  const t = useT()
  const lang = useLang()
  const scaleMode = useSimulationStore((s) => s.scaleMode)
  const setScaleMode = useSimulationStore((s) => s.setScaleMode)
  const showOrbits = useSimulationStore((s) => s.showOrbits)
  const setShowOrbits = useSimulationStore((s) => s.setShowOrbits)
  const showLabels = useSimulationStore((s) => s.showLabels)
  const setShowLabels = useSimulationStore((s) => s.setShowLabels)
  const showAxes = useSimulationStore((s) => s.showAxes)
  const setShowAxes = useSimulationStore((s) => s.setShowAxes)
  const showConstellations = useSimulationStore((s) => s.showConstellations)
  const setShowConstellations = useSimulationStore((s) => s.setShowConstellations)
  const largeText = useUiStore((s) => s.largeText)
  const setLargeText = useUiStore((s) => s.setLargeText)
  const leftOpen = useUiStore((s) => s.leftOpen)
  const setLeftOpen = useUiStore((s) => s.setLeftOpen)
  const voiceOn = useVoiceStore((s) => s.enabled)
  const setVoiceOn = useVoiceStore((s) => s.setEnabled)
  const voiceLang = useVoiceStore((s) => s.lang)
  const setVoiceLang = useVoiceStore((s) => s.setLang)
  const hardwareStatus = useHardwareStore((s) => s.status)
  const close = () => useUiStore.getState().setActivePanel('none')
  const hardwareLabel = hardwareStatus === 'connected' ? t('hardwareConnected') : t('hardware')
  const modes: { id: ScaleMode; label: string }[] = [
    { id: 'educational', label: t('eduScale') },
    { id: 'trueScale', label: t('trueScale') },
  ]

  return (
    <aside className="hud-sheet settings-sheet" aria-label={t('settings')}>
      <header className="panel-head">
        <h2>{t('settings')}</h2>
        <button type="button" className="icon-btn" onClick={close} aria-label={t('close')}>
          ×
        </button>
      </header>

      <p className="nav-label">{t('scale')}</p>
      <div className="settings-seg" role="group" aria-label={t('scale')}>
        {modes.map((mode) => (
          <button
            key={mode.id}
            type="button"
            className={`settings-seg-btn${scaleMode === mode.id ? ' is-on' : ''}`}
            onClick={() => setScaleMode(mode.id)}
          >
            {mode.label}
          </button>
        ))}
      </div>
      <p className="settings-note">{scaleExplanation(scaleMode, lang)}</p>

      <p className="nav-label">{t('appearance')}</p>
      <div className="settings-toggles">
        <Chip on={leftOpen} label={t('planetCard')} icon="planet" onToggle={setLeftOpen} />
        <Chip
          on={showOrbits}
          label={t('orbits')}
          icon="orbit"
          onToggle={(value) => {
            setShowOrbits(value)
            useEducationStore.getState().notifyOrbitsVisible(value, useSimulationStore.getState().selectedBodyId)
          }}
        />
        <Chip on={showLabels} label={t('names')} icon="book" onToggle={setShowLabels} />
        <Chip
          on={showAxes}
          label={t('axes')}
          icon="ruler"
          onToggle={(value) => {
            setShowAxes(value)
            useEducationStore.getState().notifyAxesVisible(value, useSimulationStore.getState().selectedBodyId)
          }}
        />
        <Chip on={showConstellations} label={t('constellations')} icon="spark" onToggle={setShowConstellations} />
        <Chip on={largeText} label={t('largeText')} icon="people" onToggle={setLargeText} />
      </div>

      <p className="nav-label">{t('sound')}</p>
      <div className="settings-voice">
        <Chip on={voiceOn} label={t('voice')} icon="speaker" onToggle={setVoiceOn} />
        <div className="settings-seg is-slim" role="group" aria-label={t('language')}>
          {VOICE_LANGS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`settings-seg-btn${voiceLang === item.id ? ' is-on' : ''}`}
              onClick={() => setVoiceLang(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="settings-foot">
        <div className="settings-hw">
          <button type="button" className="settings-chip" onClick={() => useUiStore.getState().setActivePanel('hardware')}>
            <Icon name="chip" />
            {hardwareLabel}
          </button>
          <p className="settings-note">{hardwareStatus === 'connected' ? t('hwNoteOn') : t('hwNoteOff')}</p>
        </div>
        <button type="button" className="settings-chip" onClick={() => getScene()?.focusOverview()}>
          <Icon name="reset" />
          {t('overviewReturn')}
        </button>
        <button type="button" className="settings-chip" onClick={() => useUiStore.getState().startDemo()}>
          <Icon name="play" />
          {t('shortTour')}
        </button>
      </div>
    </aside>
  )
}
