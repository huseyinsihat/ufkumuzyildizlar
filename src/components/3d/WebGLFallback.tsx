import { useUiStore } from '../../store/uiStore'
import { L, tx } from '../../i18n/types'
import { useLang, useT } from '../../i18n/useT'

const OPEN_FLAT = L('Düz haritayı aç', 'Open the flat map')
const FLAT_ON = L('2B şema açık. Gezegenlere tıklayarak bilgi alabilirsin.', 'The 2D map is on. Tap planets to learn about them.')

export function WebGLFallback() {
  const t = useT()
  const lang = useLang()
  const setUse2d = useUiStore((s) => s.setUse2dFallback)
  const use2d = useUiStore((s) => s.use2dFallback)

  return (
    <div className="fallback-banner" role="alert">
      <p>{t('fallback')}</p>
      <button type="button" className="btn" onClick={() => setUse2d(true)} aria-label={tx(lang, OPEN_FLAT)}>
        {tx(lang, OPEN_FLAT)}
      </button>
      {use2d ? <p className="muted">{tx(lang, FLAT_ON)}</p> : null}
    </div>
  )
}
