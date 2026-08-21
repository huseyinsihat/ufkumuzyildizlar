import { TEAM } from '../../content/team'
import { useUiStore } from '../../store/uiStore'

export function TeamPanel() {
  const close = () => useUiStore.getState().setActivePanel('none')
  return (
    <aside className="hud-sheet team-sheet" aria-label="Takım">
      <header className="panel-head">
        <div>
          <h2>{TEAM.project}</h2>
          <p className="muted">
            {TEAM.teamName} · {TEAM.event}
          </p>
        </div>
        <button type="button" className="icon-btn" onClick={close} aria-label="Kapat">
          ×
        </button>
      </header>
      <p className="team-lead">{TEAM.category}</p>
      <ul className="team-list">
        {TEAM.members.map((member) => (
          <li key={member.name}>
            <span className="team-initial" aria-hidden="true">
              {member.name.slice(0, 1)}
            </span>
            <div>
              <strong>{member.name}</strong>
              <span>{member.role}</span>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  )
}
