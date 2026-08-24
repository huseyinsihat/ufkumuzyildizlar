import { TEAM } from '../../content/team'
import { useUiStore } from '../../store/uiStore'

const logoSrc = `${import.meta.env.BASE_URL}Teknofest_logo.png`

export function TopBar() {
  const setIntro = useUiStore((s) => s.setIntroVisible)

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
      <div className="top-right-cluster" aria-hidden="true" />
    </header>
  )
}
