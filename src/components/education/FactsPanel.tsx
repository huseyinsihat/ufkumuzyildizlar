import { useState } from 'react'
import { FACTS, FACT_STAGES, type FactStage } from '../../content/insights'
import { focusBody } from '../../features/planetExplorer/focus'
import { loc } from '../../i18n/types'
import { useLang, useT } from '../../i18n/useT'
import { getScene } from '../../scene/sceneApi'
import { useUiStore } from '../../store/uiStore'

export function FactsPanel() {
  const t = useT()
  const lang = useLang()
  const [stage, setStage] = useState<FactStage>('general')
  const close = () => useUiStore.getState().setActivePanel('none')
  const cards = FACTS.filter((item) => item.stage === stage)

  return (
    <aside className="hud-sheet facts-sheet" aria-label={t('facts')}>
      <header className="panel-head">
        <div>
          <p className="eyebrow">{t('discovery')}</p>
          <h2>{t('facts')}</h2>
        </div>
        <button type="button" className="icon-btn" onClick={close} aria-label={t('close')}>
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
            {loc(lang, item.label)}
          </button>
        ))}
      </div>
      <ul className="fact-list">
        {cards.map((card) => (
          <li key={card.id}>
            <strong>{loc(lang, card.title)}</strong>
            <p>{loc(lang, card.text)}</p>
            <button
              type="button"
              className="text-link"
              onClick={() => {
                close()
                if (card.wonderId) getScene()?.focusWonder(card.wonderId)
                else if (card.bodyId) focusBody(card.bodyId)
              }}
            >
              {t('goThere')}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
