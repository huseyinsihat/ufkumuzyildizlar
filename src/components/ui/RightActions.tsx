import { useUiStore } from '../../store/uiStore'
import { lookAtSolarSystem, focusBody } from '../../features/planetExplorer/focus'

export function RightActions() {
  const togglePanel = useUiStore((s) => s.togglePanel)
  const startDemo = useUiStore((s) => s.startDemo)

  return (
    <div className="right-actions">
      <button type="button" className="nav-btn" onClick={() => togglePanel('education')} aria-label="Eğitim modu">
        Eğitim
      </button>
      <button type="button" className="nav-btn" onClick={() => togglePanel('explore')} aria-label="Keşfet">
        Keşfet
      </button>
      <button type="button" className="nav-btn" onClick={() => togglePanel('settings')} aria-label="Ayarlar">
        Ayarlar
      </button>
      <button type="button" className="nav-btn" onClick={lookAtSolarSystem} aria-label="Güneş Sistemine bak">
        Güneş Sistemine bak
      </button>
      <button type="button" className="nav-btn" onClick={() => focusBody('earth')} aria-label="Dünya’ya git">
        Dünya’ya git
      </button>
      <button type="button" className="nav-btn" onClick={() => focusBody('mars')} aria-label="Mars’a git">
        Mars’a git
      </button>
      <button type="button" className="nav-btn" onClick={startDemo} aria-label="Kısa turu başlat">
        Kısa tur
      </button>
    </div>
  )
}
