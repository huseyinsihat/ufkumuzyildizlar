import { useState } from 'react'
import { EXPLORE_PROMPTS } from '../../content/explorePrompts'
import { applyExploreTarget } from '../../features/planetExplorer/focus'
import { L, loc, tx } from '../../i18n/types'
import { useLang, useT } from '../../i18n/useT'
import { useUiStore } from '../../store/uiStore'

const OTHER = L('Başka bir konu', 'Another topic')

export function ExplorePanel() {
  const t = useT()
  const lang = useLang()
  const [index, setIndex] = useState(() => Math.floor(Math.random() * EXPLORE_PROMPTS.length))
  const prompt = EXPLORE_PROMPTS[index] ?? EXPLORE_PROMPTS[0]
  const close = () => useUiStore.getState().setActivePanel('none')

  return (
    <aside className="side-panel" aria-label={t('discovery')}>
      <header className="panel-head">
        <h2>{t('discovery')}</h2>
        <button type="button" className="icon-btn" onClick={close} aria-label={t('close')}>
          ×
        </button>
      </header>
      <h3>{prompt ? loc(lang, prompt.title) : ''}</h3>
      <p>{prompt ? loc(lang, prompt.question) : ''}</p>
      <p className="muted">{prompt ? loc(lang, prompt.answer) : ''}</p>
      <div className="row-actions">
        <button type="button" className="btn primary" onClick={() => applyExploreTarget(prompt?.targetId)}>
          {t('goThere')}
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => setIndex((value) => (value + 1) % EXPLORE_PROMPTS.length)}
        >
          {tx(lang, OTHER)}
        </button>
      </div>
    </aside>
  )
}
