import { useState } from 'react'
import { FACTS, FACT_STAGES, type FactStage } from '../../content/insights'
import { focusBody } from '../../features/planetExplorer/focus'
import { getScene } from '../../scene/sceneApi'
import { useUiStore } from '../../store/uiStore'

export function FactsPanel() {
  const [stage, setStage] = useState<FactStage>('planets')
  const close = () => useUiStore.getState().setActivePanel('none')
  const cards = FACTS.filter((item) => item.stage === stage)

  return (
    <aside className="hud-sheet facts-sheet" aria-label="Bilgiler">
      <header className="panel-head">
        <div>
          <p className="eyebrow">Keşif</p>
          <h2>Bilgiler</h2>
        </div>
        <button type="button" className="icon-btn" onClick={close} aria-label="Kapat">
          ×
        </button>
      </header>
      <div className="room-row">
        {FACT_STAGES.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`room-chip ${stage === item.id ? 'is-active' : ''}`}
            onClick={() => setStage(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <ul className="fact-list">
        {cards.map((card) => (
          <li key={card.id}>
            <strong>{card.title}</strong>
            <p>{card.text}</p>
            <button
              type="button"
              className="text-link"
              onClick={() => {
                close()
                if (card.wonderId) getScene()?.focusWonder(card.wonderId)
                else if (card.bodyId) focusBody(card.bodyId)
              }}
            >
              Sahneye git
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
