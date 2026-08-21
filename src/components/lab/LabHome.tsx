import {
  CHALLENGE_ACTIVITIES,
  CHALLENGE_BLURB,
  CHALLENGE_ICON,
  CHALLENGE_VERB,
  LAB_ROOMS,
  activitiesInRoom,
  type ChallengeId,
} from '../../content/labActivities'
import { TEAM } from '../../content/team'
import { useLabStore } from '../../store/labStore'
import { useUiStore } from '../../store/uiStore'
import type { LabActivityId, LabRoomId } from '../../types/lab'
import { Icon, type IconName } from '../ui/Icon'

const ROOM_ICON: Record<LabRoomId, IconName> = {
  motion: 'orbit',
  earth: 'planet',
  gravity: 'weight',
  scale: 'ruler',
  build: 'sun',
  sky: 'spark',
}

export function LabHome() {
  const room = useLabStore((s) => s.room)
  const setRoom = useLabStore((s) => s.setRoom)
  const start = useLabStore((s) => s.startActivity)
  const closeLab = useLabStore((s) => s.closeLab)
  const completed = useLabStore((s) => s.completed)
  const setMode = useUiStore((s) => s.setAppMode)
  const list = room ? activitiesInRoom(room) : null
  const currentRoom = LAB_ROOMS.find((item) => item.id === room)

  return (
    <section className="lab-home lab-catalog" aria-label={TEAM.home}>
      <header className="panel-head catalog-head">
        <div>
          <p className="eyebrow">
            <Icon name="flask" />
            {TEAM.home}
          </p>
          <h2>{currentRoom ? currentRoom.title : TEAM.home}</h2>
          <p className="muted">{currentRoom ? currentRoom.blurb : 'Tahmin et, izle, nedenini gör.'}</p>
        </div>
        <div className="row-actions">
          {room ? (
            <button type="button" className="btn" onClick={() => setRoom(null)}>
              Tümüne dön
            </button>
          ) : null}
          <button type="button" className="btn" onClick={() => useLabStore.getState().resetProgress()}>
            <Icon name="reset" />
            Sıfırla
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              closeLab()
              setMode('explore')
            }}
          >
            Keşfe dön
          </button>
        </div>
      </header>

      {!room ? (
        <>
          <p className="challenge-kicker">Hızlı başla</p>
          <div className="catalog-challenges">
            {CHALLENGE_ACTIVITIES.map((activity, index) => {
              const id = activity.id as ChallengeId
              const verb = CHALLENGE_VERB[id]
              return (
                <button key={activity.id} type="button" className={`catalog-card ${index === 0 ? 'is-hero' : ''}`} onClick={() => start(activity.id)}>
                  <Icon name={CHALLENGE_ICON[id]} />
                  <strong>{activity.title}</strong>
                  <span>{CHALLENGE_BLURB[id]}</span>
                  <em>{completed.includes(activity.id) ? 'Gördün' : verb}</em>
                </button>
              )
            })}
          </div>
          <p className="challenge-kicker">Odalar</p>
          <div className="catalog-rooms">
            {LAB_ROOMS.map((item, index) => (
              <button key={item.id} type="button" className="catalog-room" onClick={() => setRoom(item.id)}>
                <b>{index + 1}</b>
                <Icon name={ROOM_ICON[item.id]} />
                <strong>{item.title}</strong>
                <span>{item.blurb}</span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="catalog-activities">
          {list?.map((activity) => (
            <button key={activity.id} type="button" className="catalog-card" onClick={() => start(activity.id as LabActivityId)}>
              <Icon name={ROOM_ICON[activity.room]} />
              <strong>{activity.title}</strong>
              <span>{activity.question}</span>
              <em>{completed.includes(activity.id) ? 'Gördün' : 'İzle'}</em>
            </button>
          ))}
        </div>
      )}
    </section>
  )
}
