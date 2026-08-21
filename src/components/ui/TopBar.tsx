import { TEAM } from '../../content/team'
import { useUiStore } from '../../store/uiStore'

const logoSrc = `${import.meta.env.BASE_URL}Teknofest_logo.png`

export function TopBar() {
  const setIntro = useUiStore((s) => s.setIntroVisible)
  const setPanel = useUiStore((s) => s.setActivePanel)

  return (
    <header className="top-bar" role="banner">
      <button type="button" className="brand-btn" onClick={() => setIntro(true)} aria-label="Ana ekran">
        <span className="brand-copy">
          <strong>{TEAM.project}</strong>
          <span className="brand-sub">
            {TEAM.teamName} · {TEAM.event}
          </span>
        </span>
        <img className="brand-logo" src={logoSrc} alt="TEKNOFEST" />
      </button>
      <p className="category">{TEAM.category.replace(/, /g, ' · ')}</p>
      <button type="button" className="text-link" onClick={() => setPanel('team')}>
        Takım
      </button>
    </header>
  )
}
