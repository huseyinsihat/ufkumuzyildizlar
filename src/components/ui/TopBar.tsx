import { TEAM } from '../../content/team'
import { useUiStore } from '../../store/uiStore'
import { useVoiceStore } from '../../store/voiceStore'
import { Icon } from './Icon'

const logoSrc = `${import.meta.env.BASE_URL}Teknofest_logo.png`

export function TopBar() {
  const setIntro = useUiStore((s) => s.setIntroVisible)
  const setPanel = useUiStore((s) => s.setActivePanel)
  const panel = useUiStore((s) => s.activePanel)

  return (
    <header className="top-bar" role="banner">
      <button type="button" className="brand-btn" onClick={() => setIntro(true)} aria-label="Ana ekran">
        <img className="brand-logo" src={logoSrc} alt="" />
        <span className="brand-copy">
          <strong>{TEAM.project}</strong>
          <span className="brand-sub">
            {TEAM.teamName} · {TEAM.event}
          </span>
        </span>
      </button>
      <p className="category">{TEAM.category.replace(/, /g, ' · ')}</p>
      <div className="top-right-cluster">
        <div className="top-actions">
          <button
            type="button"
            className={`chip icon-chip${panel === 'team' ? ' is-on' : ''}`}
            aria-label="Takım"
            onClick={() => {
              useVoiceStore.getState().play('ui-team')
              setPanel(panel === 'team' ? 'none' : 'team')
            }}
          >
            <Icon name="people" />
            <span className="action-label">Takım</span>
          </button>
          <button
            type="button"
            className={`chip icon-chip${panel === 'hardware' ? ' is-on' : ''}`}
            aria-label="Kart"
            onClick={() => setPanel(panel === 'hardware' ? 'none' : 'hardware')}
          >
            <Icon name="chip" />
            <span className="action-label">Kart</span>
          </button>
          <button
            type="button"
            className={`chip icon-chip${panel === 'settings' ? ' is-on' : ''}`}
            aria-label="Ayarlar"
            onClick={() => setPanel(panel === 'settings' ? 'none' : 'settings')}
          >
            <Icon name="gear" />
            <span className="action-label">Ayarlar</span>
          </button>
        </div>
      </div>
    </header>
  )
}
