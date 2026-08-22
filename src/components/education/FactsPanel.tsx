import { useEffect, useState } from 'react'
import { FACTS, FACT_STAGES, type FactStage } from '../../content/insights'
import { focusBody } from '../../features/planetExplorer/focus'
import { getScene } from '../../scene/sceneApi'
import { useUiStore } from '../../store/uiStore'

const PAGE_SIZE = 5

export function FactsPanel() {
  const [stage, setStage] = useState<FactStage>('planets')
  const [page, setPage] = useState(0)
  const close = () => useUiStore.getState().setActivePanel('none')
  const cards = FACTS.filter((item) => item.stage === stage)
  const pages = Math.max(1, Math.ceil(cards.length / PAGE_SIZE))
  const shown = cards.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  useEffect(() => {
    setPage(0)
  }, [stage])

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
        {shown.map((card) => (
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
      {pages > 1 ? (
        <button
          type="button"
          className="btn"
          onClick={() => setPage((current) => (current + 1) % pages)}
        >
          Sonraki bilgi
        </button>
      ) : null}
    </aside>
  )
}
