import { openCompare } from '../../features/planetExplorer/focus'
import { L, tx } from '../../i18n/types'
import { useLang, useT } from '../../i18n/useT'
import { useUiStore } from '../../store/uiStore'

const HUB = L('Eğitim', 'Learn')
const COMPARE_PLANETS = L('Gezegen karşılaştır', 'Compare planets')
const SCALE_LAB = L('Ölçek deneyi', 'Scale experiment')
const RANDOM = L('Rastgele keşif', 'Random discovery')

export function EducationHub() {
  const t = useT()
  const lang = useLang()
  const setPanel = useUiStore((s) => s.setActivePanel)
  const close = () => setPanel('none')

  return (
    <aside className="side-panel" aria-label={tx(lang, HUB)}>
      <header className="panel-head">
        <h2>{tx(lang, HUB)}</h2>
        <button type="button" className="icon-btn" onClick={close} aria-label={t('close')}>
          ×
        </button>
      </header>
      <p>{t('missionsLead')}</p>
      <button type="button" className="nav-btn" onClick={() => setPanel('missions')}>
        {t('missions')}
      </button>
      <button type="button" className="nav-btn" onClick={() => openCompare()}>
        {tx(lang, COMPARE_PLANETS)}
      </button>
      <button type="button" className="nav-btn" onClick={() => setPanel('scale')}>
        {tx(lang, SCALE_LAB)}
      </button>
      <button type="button" className="nav-btn" onClick={() => setPanel('quiz')}>
        {t('quiz')}
      </button>
      <button type="button" className="nav-btn" onClick={() => setPanel('explore')}>
        {tx(lang, RANDOM)}
      </button>
    </aside>
  )
}
