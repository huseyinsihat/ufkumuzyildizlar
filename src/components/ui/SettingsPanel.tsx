import { getScene } from '../../scene/sceneApi'
import { useHardwareStore } from '../../hardware/hardwareStore'
import { useSimulationStore } from '../../store/simulationStore'
import { useUiStore } from '../../store/uiStore'
import { useVoiceStore } from '../../store/voiceStore'
import type { VoiceLang } from '../../features/voice/clips'
import { scaleExplanation } from '../../features/scaleMode'
import type { ScaleMode } from '../../types/simulation'

const MODES: { id: ScaleMode; label: string }[] = [
  { id: 'educational', label: 'Eğitimsel görünüm' },
  { id: 'trueScale', label: 'Gerçek ölçek' },
]

const VOICE_LANGS: { id: VoiceLang; label: string }[] = [
  { id: 'tr', label: 'Türkçe' },
  { id: 'en', label: 'English' },
]

export function SettingsPanel() {
  const scaleMode = useSimulationStore((s) => s.scaleMode)
  const setScaleMode = useSimulationStore((s) => s.setScaleMode)
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
  const hwStatus = useHardwareStore((s) => s.status)
  const hwMessage = useHardwareStore((s) => s.message)
  const connect = useHardwareStore((s) => s.connect)
  const disconnect = useHardwareStore((s) => s.disconnect)
  const voiceOn = useVoiceStore((s) => s.enabled)
  const setVoiceOn = useVoiceStore((s) => s.setEnabled)
  const voiceLang = useVoiceStore((s) => s.lang)
  const setVoiceLang = useVoiceStore((s) => s.setLang)
  const close = () => useUiStore.getState().setActivePanel('none')

  return (
    <aside className="hud-sheet" aria-label="Ayarlar">
      <header className="panel-head">
        <h2>Ayarlar</h2>
        <button type="button" className="icon-btn" onClick={close} aria-label="Kapat">
          ×
        </button>
      </header>
      <p className="nav-label">Görüntüleme ölçeği</p>
      {MODES.map((mode) => (
        <button
          key={mode.id}
          type="button"
          className={`nav-btn ${scaleMode === mode.id ? 'is-active' : ''}`}
          onClick={() => setScaleMode(mode.id)}
        >
          {mode.label}
        </button>
      ))}
      <p className="muted">{scaleExplanation(scaleMode)}</p>
      <label className="check">
        <input type="checkbox" checked={leftOpen} onChange={(e) => setLeftOpen(e.target.checked)} />
        Seçim kartı
      </label>
      <label className="check">
        <input type="checkbox" checked={showLabels} onChange={(e) => setShowLabels(e.target.checked)} />
        Etiketler
      </label>
      <label className="check">
        <input type="checkbox" checked={showAxes} onChange={(e) => setShowAxes(e.target.checked)} />
        Eksenleri göster
      </label>
      <label className="check">
        <input type="checkbox" checked={showConstellations} onChange={(e) => setShowConstellations(e.target.checked)} />
        Takımyıldız çizgileri
      </label>
      <label className="check">
        <input type="checkbox" checked={largeText} onChange={(e) => setLargeText(e.target.checked)} />
        Büyük yazı
      </label>
      <p className="nav-label">Seslendirme</p>
      <label className="check">
        <input
          type="checkbox"
          checked={voiceOn}
          onChange={(e) => setVoiceOn(e.target.checked)}
        />
        Sesli anlatım
      </label>
      <p className="muted">Okumayı kolaylaştırmak için kısa cümleler. İlk dokunuştan sonra çalar.</p>
      {VOICE_LANGS.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`nav-btn ${voiceLang === item.id ? 'is-active' : ''}`}
          onClick={() => setVoiceLang(item.id)}
        >
          Anlatım dili: {item.label}
        </button>
      ))}
      <button type="button" className="nav-btn" onClick={() => getScene()?.focusOverview()}>
        Kamerayı sıfırla
      </button>
      <p className="nav-label">DeneyapKart</p>
      {hwStatus === 'unsupported' ? (
        <p className="muted">USB için Chrome veya Edge kullan.</p>
      ) : (
        <div className="row-actions">
          {hwStatus === 'connected' ? (
            <button type="button" className="btn" onClick={() => void disconnect()}>
              Bağlantıyı kes
            </button>
          ) : (
            <button type="button" className="btn primary" onClick={() => void connect()}>
              {hwStatus === 'error' ? 'Yeniden bağla' : 'DeneyapKart bağla'}
            </button>
          )}
          <span className="muted">{hwStatus === 'connected' ? 'Bağlı' : 'Bağlı değil'}</span>
        </div>
      )}
      {hwMessage ? <p className="muted">{hwMessage}</p> : null}
    </aside>
  )
}
