import { getScene } from '../../scene/sceneApi'
import { useSimulationStore } from '../../store/simulationStore'
import { useUiStore } from '../../store/uiStore'
import { scaleExplanation } from '../../features/scaleMode'
import type { ScaleMode } from '../../types/simulation'

const MODES: { id: ScaleMode; label: string }[] = [
  { id: 'educational', label: 'Eğitimsel görünüm' },
  { id: 'trueScale', label: 'Gerçek ölçek' },
]

export function SettingsPanel() {
  const scaleMode = useSimulationStore((s) => s.scaleMode)
  const setScaleMode = useSimulationStore((s) => s.setScaleMode)
  const showLabels = useSimulationStore((s) => s.showLabels)
  const setShowLabels = useSimulationStore((s) => s.setShowLabels)
  const showAxes = useSimulationStore((s) => s.showAxes)
  const setShowAxes = useSimulationStore((s) => s.setShowAxes)
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
        <input type="checkbox" checked={showLabels} onChange={(e) => setShowLabels(e.target.checked)} />
        Gezegen etiketleri
      </label>
      <label className="check">
        <input type="checkbox" checked={showAxes} onChange={(e) => setShowAxes(e.target.checked)} />
        Eksenleri göster
      </label>
      <button type="button" className="nav-btn" onClick={() => getScene()?.focusOverview()}>
        Kamerayı sıfırla
      </button>
    </aside>
  )
}
