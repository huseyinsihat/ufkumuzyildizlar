import { findWonder, starDisplayName } from '../../content/skyWonders'
import { loc } from '../../i18n/types'
import { useLang, useT } from '../../i18n/useT'
import { useSimulationStore } from '../../store/simulationStore'

export function WonderStrip() {
  const t = useT()
  const lang = useLang()
  const id = useSimulationStore((s) => s.selectedWonderId)
  const wonder = findWonder(id)
  if (!wonder) return null
  const name = starDisplayName(wonder, lang)

  return (
    <aside className="planet-strip" aria-label={name}>
      <div>
        <p className="eyebrow">{loc(lang, wonder.tag)}</p>
        <h2>{name}</h2>
        <p>{loc(lang, wonder.fact)}</p>
      </div>
      <div className="row-actions">
        <button type="button" className="icon-btn" onClick={() => useSimulationStore.getState().selectWonder(null)} aria-label={t('close')}>
          ×
        </button>
      </div>
    </aside>
  )
}
