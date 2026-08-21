import { FEATURED_ACTIVITIES, LAB_ROOMS, activitiesInRoom } from '../../content/labActivities'
import { LAB_TIPS } from '../../content/insights'
import { TEAM } from '../../content/team'
import { useLabStore } from '../../store/labStore'
import { useUiStore } from '../../store/uiStore'
import type { LabActivityId } from '../../types/lab'
import { Icon } from '../ui/Icon'

export function LabHome() {
  const room = useLabStore((s) => s.room)
  const setRoom = useLabStore((s) => s.setRoom)
  const start = useLabStore((s) => s.startActivity)
  const closeLab = useLabStore((s) => s.closeLab)
  const completed = useLabStore((s) => s.completed)
  const setMode = useUiStore((s) => s.setAppMode)

  const list = room ? activitiesInRoom(room) : FEATURED_ACTIVITIES
  const done = completed.length

  return (
    <section className="lab-home" aria-label={TEAM.project}>
      <header className="panel-head">
        <div>
          <p className="eyebrow">
            <Icon name="sun" />
            {TEAM.project}
          </p>
          <h2>{room ? LAB_ROOMS.find((item) => item.id === room)?.title : 'Ne izlemek istersin?'}</h2>
          <p className="muted">
            {TEAM.teamName} · {TEAM.event}
            {done ? ` · ${done} tanesini gördün` : ' · İzle, dokun, nedenini gör.'}
          </p>
        </div>
        <button
          type="button"
          className="icon-btn"
          aria-label="Kapat"
          onClick={() => {
            closeLab()
            setMode('explore')
          }}
        >
          ×
        </button>
      </header>
      <div className="room-row">
        {LAB_ROOMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`room-chip ${room === item.id ? 'is-active' : ''}`}
            onClick={() => setRoom(room === item.id ? null : item.id)}
          >
            {item.title}
          </button>
        ))}
      </div>
      {!room ? <p className="insight">{LAB_TIPS[done % LAB_TIPS.length]}</p> : null}
      <div className="activity-grid">
        {list.map((activity) => (
          <button
            key={activity.id}
            type="button"
            className="activity-card"
            onClick={() => start(activity.id as LabActivityId)}
          >
            <strong>{activity.title}</strong>
            <span>{activity.question}</span>
            <em>{completed.includes(activity.id) ? 'Gördün' : 'İzle'}</em>
          </button>
        ))}
      </div>
    </section>
  )
}
