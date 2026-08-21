import { useUiStore } from '../../store/uiStore'

export function EducationHub() {
  const setPanel = useUiStore((s) => s.setActivePanel)
  const close = () => setPanel('none')

  return (
    <aside className="side-panel" aria-label="Eğitim">
      <header className="panel-head">
        <h2>Eğitim</h2>
        <button type="button" className="icon-btn" onClick={close} aria-label="Kapat">
          ×
        </button>
      </header>
      <p>Görevlerle keşfet, karşılaştır ve ölçeği dene. Her adım bir astronomik fikri yaşatır.</p>
      <button type="button" className="nav-btn" onClick={() => setPanel('missions')}>
        Görevler ve rozetler
      </button>
      <button type="button" className="nav-btn" onClick={() => setPanel('compare')}>
        Gezegen karşılaştır
      </button>
      <button type="button" className="nav-btn" onClick={() => setPanel('scale')}>
        Ölçek deneyi
      </button>
      <button type="button" className="nav-btn" onClick={() => setPanel('quiz')}>
        Kısa sınav
      </button>
      <button type="button" className="nav-btn" onClick={() => setPanel('explore')}>
        Rastgele keşif
      </button>
    </aside>
  )
}
