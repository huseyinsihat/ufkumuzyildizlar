import { getScene } from '../../scene/sceneApi'
import { useEducationStore } from '../../store/educationStore'
import { useSimulationStore } from '../../store/simulationStore'
import { useUiStore } from '../../store/uiStore'
import { useVoiceStore } from '../../store/voiceStore'
import type { VoiceLang } from '../../features/voice/clips'
import { scaleExplanation } from '../../features/scaleMode'
import { Icon, type IconName } from './Icon'
import type { ScaleMode } from '../../types/simulation'

const MODES: { id: ScaleMode; label: string }[] = [
  { id: 'educational', label: 'Eğitim ölçeği' },
  { id: 'trueScale', label: 'Gerçek ölçek' },
]

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
  const close = () => useUiStore.getState().setActivePanel('none')

  return (
    <aside className="hud-sheet settings-sheet" aria-label="Ayarlar">
      <header className="panel-head">
        <h2>Ayarlar</h2>
        <button type="button" className="icon-btn" onClick={close} aria-label="Kapat">
          ×
        </button>
      </header>

      <p className="nav-label">Ölçek</p>
      <div className="settings-seg" role="group" aria-label="Ölçek">
        {MODES.map((mode) => (
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
      <p className="settings-note">{scaleExplanation(scaleMode)}</p>

      <p className="nav-label">Görünüm</p>
      <div className="settings-toggles">
        <Chip on={leftOpen} label="Gezegen kartı" icon="planet" onToggle={setLeftOpen} />
        <Chip
          on={showOrbits}
          label="Yörüngeler"
          icon="orbit"
          onToggle={(value) => {
            setShowOrbits(value)
            useEducationStore.getState().notifyOrbitsVisible(value, useSimulationStore.getState().selectedBodyId)
          }}
        />
        <Chip on={showLabels} label="İsimler" icon="book" onToggle={setShowLabels} />
        <Chip
          on={showAxes}
          label="Eksenler"
          icon="ruler"
          onToggle={(value) => {
            setShowAxes(value)
            useEducationStore.getState().notifyAxesVisible(value, useSimulationStore.getState().selectedBodyId)
          }}
        />
        <Chip on={showConstellations} label="Takımyıldız" icon="spark" onToggle={setShowConstellations} />
        <Chip on={largeText} label="Büyük yazı" icon="people" onToggle={setLargeText} />
      </div>

      <p className="nav-label">Ses</p>
      <div className="settings-voice">
        <Chip on={voiceOn} label="Sesli anlatım" icon="play" onToggle={setVoiceOn} />
        <div className="settings-seg is-slim" role="group" aria-label="Anlatım dili">
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
        <button type="button" className="settings-chip" onClick={() => useUiStore.getState().setActivePanel('hardware')}>
          <Icon name="chip" />
          Deneyap Kart
        </button>
        <button type="button" className="settings-chip" onClick={() => getScene()?.focusOverview()}>
          <Icon name="reset" />
          Genel bakışa dön
        </button>
        <button type="button" className="settings-chip" onClick={() => useUiStore.getState().startDemo()}>
          <Icon name="play" />
          Kısa tur
        </button>
      </div>
    </aside>
  )
}
