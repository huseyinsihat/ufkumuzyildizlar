import { BADGES, MISSIONS } from '../../content/missions'
import { useEducationStore } from '../../store/educationStore'
import { useUiStore } from '../../store/uiStore'

export function MissionPanel() {
  const active = useEducationStore((s) => s.activeMissionId)
  const completed = useEducationStore((s) => s.completedMissions)
  const score = useEducationStore((s) => s.score)
  const stars = useEducationStore((s) => s.stars)
  const badges = useEducationStore((s) => s.unlockedBadges)
  const start = useEducationStore((s) => s.startMission)
  const close = () => useUiStore.getState().setActivePanel('none')

  return (
    <aside className="side-panel" aria-label="Eğitim görevleri">
      <header className="panel-head">
        <div>
          <h2>Eğitim modu</h2>
          <p className="muted">
            {stars} yıldız · {score} puan
          </p>
        </div>
        <button type="button" className="icon-btn" onClick={close} aria-label="Kapat">
          ×
        </button>
      </header>
      <ul className="mission-list">
        {MISSIONS.map((mission) => {
          const done = completed.includes(mission.id)
          return (
            <li key={mission.id} className={mission.id === active ? 'is-active' : ''}>
              <button type="button" onClick={() => start(mission.id)}>
                <strong>{mission.title}</strong>
                <span>{done ? 'Tamamlandı' : mission.instruction}</span>
                {!done ? <em>{mission.hint}</em> : <em>+{mission.points} puan</em>}
              </button>
            </li>
          )
        })}
      </ul>
      <p className="nav-label">Rozetler</p>
      <ul className="badge-list">
        {BADGES.map((badge) => (
          <li key={badge.id} className={badges.includes(badge.id) ? 'is-on' : ''}>
            <strong>{badge.name}</strong>
            <span>{badge.description}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}
