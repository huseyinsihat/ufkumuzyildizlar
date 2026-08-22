import type { CSSProperties } from 'react'
import {
  CHALLENGE_ACTIVITIES,
  CHALLENGE_BLURB,
  CHALLENGE_ICON,
  CHALLENGE_VERB,
  LAB_ROOMS,
  activitiesInRoom,
  type ChallengeId,
} from '../../content/labActivities'
import { BADGES } from '../../content/missions'
import { TEAM } from '../../content/team'
import { useEducationStore } from '../../store/educationStore'
import { useLabStore } from '../../store/labStore'
import { useUiStore } from '../../store/uiStore'
import { useVoiceStore } from '../../store/voiceStore'
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
  const badges = useEducationStore((s) => s.unlockedBadges)
  const setMode = useUiStore((s) => s.setAppMode)
  const list = room ? activitiesInRoom(room) : null
  const currentRoom = LAB_ROOMS.find((item) => item.id === room)

  return (
    <section className="lab-home lab-catalog" aria-label={TEAM.home}>
      <header className="panel-head catalog-head">
        <div>
          <p className="eyebrow">
            <span className="icon-well">
              <Icon name="flask" />
            </span>
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
              useVoiceStore.getState().play('mode-explore')
              closeLab()
              setMode('explore')
            }}
          >
            Keşfe dön
          </button>
        </div>
      </header>
      {badges.length ? (
        <p className="badge-row">
          {BADGES.filter((item) => badges.includes(item.id)).map((item) => (
            <span key={item.id} className="badge-chip">
              {item.name}
            </span>
          ))}
        </p>
      ) : null}

      {!room ? (
        <>
          <p className="challenge-kicker section-kicker">Hızlı başla</p>
          <div className="catalog-challenges">
            {CHALLENGE_ACTIVITIES.map((activity, index) => {
              const id = activity.id as ChallengeId
              const verb = CHALLENGE_VERB[id]
              const seen = completed.includes(activity.id)
              return (
                <button
                  key={activity.id}
                  type="button"
                  className={`catalog-card ${index === 0 ? 'is-hero' : ''} ${seen ? 'is-done' : ''}`}
                  onClick={() => start(activity.id)}
                >
                  <span className="icon-well">
                    <Icon name={CHALLENGE_ICON[id]} />
                  </span>
                  <strong>{activity.title}</strong>
                  <span>{CHALLENGE_BLURB[id]}</span>
                  <em>
                    {seen ? <i className="done-dot" aria-hidden="true" /> : null}
                    {seen ? 'Gördün' : verb}
                  </em>
                </button>
              )
            })}
          </div>
          <p className="challenge-kicker section-kicker">Odalar</p>
          <div className="catalog-rooms">
            {LAB_ROOMS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className="catalog-room"
                style={{ '--room-tone': item.tone } as CSSProperties}
                onClick={() => setRoom(item.id)}
              >
                <b>{index + 1}</b>
                <span className="icon-well">
                  <Icon name={ROOM_ICON[item.id]} />
                </span>
                <strong>{item.title}</strong>
                <span>{item.blurb}</span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="catalog-activities">
          {list?.map((activity) => {
            const seen = completed.includes(activity.id)
            return (
              <button
                key={activity.id}
                type="button"
                className={`catalog-card ${seen ? 'is-done' : ''}`}
                style={currentRoom ? ({ '--room-tone': currentRoom.tone } as CSSProperties) : undefined}
                onClick={() => start(activity.id as LabActivityId)}
              >
                <span className="icon-well">
                  <Icon name={ROOM_ICON[activity.room]} />
                </span>
                <strong>{activity.title}</strong>
                <span>{activity.question}</span>
                <em>
                  {seen ? <i className="done-dot" aria-hidden="true" /> : null}
                  {seen ? 'Gördün' : 'İzle'}
                </em>
              </button>
            )
          })}
        </div>
      )}
    </section>
  )
}
