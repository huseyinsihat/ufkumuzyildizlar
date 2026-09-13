import { BADGES, MISSIONS } from '../../content/missions'
import { L, loc, tx } from '../../i18n/types'
import { useLang, useT } from '../../i18n/useT'
import { useEducationStore } from '../../store/educationStore'
import { useUiStore } from '../../store/uiStore'

const DONE = L('Tamamlandı', 'Done')
const POINTS = L('{n} puan', '{n} points')
const STARS_SCORE = L('{stars} yıldız · {score} puan', '{stars} stars · {score} points')

export function MissionPanel() {
  const t = useT()
  const lang = useLang()
  const active = useEducationStore((s) => s.activeMissionId)
  const completed = useEducationStore((s) => s.completedMissions)
  const score = useEducationStore((s) => s.score)
  const stars = useEducationStore((s) => s.stars)
  const badges = useEducationStore((s) => s.unlockedBadges)
  const start = useEducationStore((s) => s.startMission)
  const close = () => useUiStore.getState().setActivePanel('none')

  return (
    <aside className="side-panel" aria-label={t('missions')}>
      <header className="panel-head">
        <div>
          <h2>{t('missions')}</h2>
          <p className="muted">
            {tx(lang, STARS_SCORE).replace('{stars}', String(stars)).replace('{score}', String(score))}
          </p>
        </div>
        <button type="button" className="icon-btn" onClick={close} aria-label={t('close')}>
          ×
        </button>
      </header>
      <ul className="mission-list">
        {MISSIONS.map((mission) => {
          const done = completed.includes(mission.id)
          return (
            <li key={mission.id} className={mission.id === active ? 'is-active' : ''}>
              <button type="button" onClick={() => start(mission.id)}>
                <strong>{loc(lang, mission.title)}</strong>
                <span>{done ? tx(lang, DONE) : loc(lang, mission.instruction)}</span>
                {!done ? <em>{loc(lang, mission.hint)}</em> : <em>+{tx(lang, POINTS).replace('{n}', String(mission.points))}</em>}
              </button>
            </li>
          )
        })}
      </ul>
      <p className="nav-label">{t('badge')}</p>
      <ul className="badge-list">
        {BADGES.map((badge) => (
          <li key={badge.id} className={badges.includes(badge.id) ? 'is-on' : ''}>
            <strong>{loc(lang, badge.name)}</strong>
            <span>{loc(lang, badge.description)}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}
