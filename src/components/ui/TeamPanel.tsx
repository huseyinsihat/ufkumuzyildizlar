import { TEAM } from '../../content/team'
import { loc } from '../../i18n/types'
import { useLang, useT } from '../../i18n/useT'
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
  const t = useT()
  const lang = useLang()
  const close = () => useUiStore.getState().setActivePanel('none')

  return (
    <aside className="hud-sheet team-sheet" aria-label={t('team')}>
      <header className="panel-head">
        <div>
          <h2>{TEAM.project}</h2>
          <p className="muted">
            {TEAM.teamName} · {TEAM.event}
          </p>
        </div>
        <button type="button" className="icon-btn" onClick={close} aria-label={t('close')}>
          ×
        </button>
      </header>
      <div className="advisor-banner">
        <span className="team-initial" aria-hidden="true">
          HS
        </span>
        <div>
          <strong>{TEAM.advisor.name}</strong>
          <span>{loc(lang, TEAM.advisor.role)}</span>
        </div>
      </div>
      <ul className="team-badges">
        {TEAM.members.map((member) => (
          <Badge key={member.name} name={member.name} role={loc(lang, member.role)} />
        ))}
      </ul>
    </aside>
  )
}
