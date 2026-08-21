import { useUiStore } from '../../store/uiStore'

export function WebGLFallback() {
  const setUse2d = useUiStore((s) => s.setUse2dFallback)
  const use2d = useUiStore((s) => s.use2dFallback)

  return (
    <div className="fallback-banner" role="alert">
      <p>Bu cihaz 3B görüntülemeyi desteklemiyor.</p>
      <button type="button" className="btn" onClick={() => setUse2d(true)} aria-label="2B Astronomi Modunu Aç">
        2B Astronomi Modunu Aç
      </button>
      {use2d ? <p className="muted">2B şema açık. Gezegenlere tıklayarak bilgi alabilirsin.</p> : null}
    </div>
  )
}
