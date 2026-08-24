import { TEAM } from '../../content/team'
import { useUiStore } from '../../store/uiStore'

function Badge({ name, role }: { name: string; role: string }) {
  return (
    <li>
      <span className="team-initial" aria-hidden="true">
        {name
          .split(' ')
          .map((part) => part[0])
          .slice(0, 2)
          .join('')}
      </span>
      <strong>{name}</strong>
      <span>{role}</span>
    </li>
  )
}

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
      <div className="advisor-banner">
        <span className="team-initial" aria-hidden="true">
          HS
        </span>
        <div>
          <strong>{TEAM.advisor.name}</strong>
          <span>{TEAM.advisor.role}</span>
        </div>
      </div>
      <ul className="team-badges">
        {TEAM.members.map((member) => (
          <Badge key={member.name} name={member.name} role={member.role} />
        ))}
      </ul>
    </aside>
  )
}
