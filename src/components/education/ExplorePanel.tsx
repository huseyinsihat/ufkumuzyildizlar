import { useState } from 'react'
import { EXPLORE_PROMPTS } from '../../content/explorePrompts'
import { applyExploreTarget } from '../../features/planetExplorer/focus'
import { useUiStore } from '../../store/uiStore'

export function ExplorePanel() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * EXPLORE_PROMPTS.length))
  const prompt = EXPLORE_PROMPTS[index] ?? EXPLORE_PROMPTS[0]
  const close = () => useUiStore.getState().setActivePanel('none')

  return (
    <aside className="side-panel" aria-label="Keşfet">
      <header className="panel-head">
        <h2>Keşfet</h2>
        <button type="button" className="icon-btn" onClick={close} aria-label="Kapat">
          ×
        </button>
      </header>
      <h3>{prompt.title}</h3>
      <p>{prompt.question}</p>
      <p className="muted">{prompt.answer}</p>
      <div className="row-actions">
        <button type="button" className="btn primary" onClick={() => applyExploreTarget(prompt.targetId)}>
          Konuma git
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => setIndex((value) => (value + 1) % EXPLORE_PROMPTS.length)}
        >
          Başka bir konu
        </button>
      </div>
    </aside>
  )
}
