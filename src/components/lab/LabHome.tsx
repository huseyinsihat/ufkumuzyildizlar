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
import { loc } from '../../i18n/types'
import { useLang, useT } from '../../i18n/useT'
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
  const t = useT()
  const lang = useLang()
  const room = useLabStore((s) => s.room)
  const setRoom = useLabStore((s) => s.setRoom)
  const start = useLabStore((s) => s.startActivity)
  const closeLab = useLabStore((s) => s.closeLab)
  const completed = useLabStore((s) => s.completed)
  const badges = useEducationStore((s) => s.unlockedBadges)
  const setMode = useUiStore((s) => s.setAppMode)
  const list = room ? activitiesInRoom(room) : null
  const currentRoom = LAB_ROOMS.find((item) => item.id === room)
  const homeLabel = loc(lang, TEAM.home)

  return (
    <section className="lab-home lab-catalog" aria-label={homeLabel}>
      <header className="panel-head catalog-head">
        <div>
          <p className="eyebrow">
            <span className="icon-well">
              <Icon name="flask" />
            </span>
            {homeLabel}
            <button
              type="button"
              className="icon-btn catalog-reset"
              onClick={() => useLabStore.getState().resetProgress()}
              aria-label={t('reset')}
              title={t('reset')}
            >
              <Icon name="reset" />
            </button>
          </p>
          <h2>{currentRoom ? loc(lang, currentRoom.title) : homeLabel}</h2>
          <p className="muted">{currentRoom ? loc(lang, currentRoom.blurb) : t('thinkThenLook')}</p>
        </div>
        <div className="row-actions">
          {room ? (
            <button type="button" className="btn" onClick={() => setRoom(null)}>
              {t('allRooms')}
            </button>
          ) : null}
          <button
            type="button"
            className="btn"
            onClick={() => {
              useVoiceStore.getState().play('mode-explore')
              closeLab()
              setMode('explore')
            }}
          >
            {t('backExplore')}
          </button>
        </div>
      </header>
      {badges.length ? (
        <p className="badge-row">
          {BADGES.filter((item) => badges.includes(item.id)).map((item) => (
            <span key={item.id} className="badge-chip">
              {loc(lang, item.name)}
            </span>
          ))}
        </p>
      ) : null}

      {!room ? (
        <>
          <p className="challenge-kicker section-kicker">{t('challenges')}</p>
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
                  <span className="catalog-card-top">
                    <span className="icon-well">
                      <Icon name={CHALLENGE_ICON[id]} />
                    </span>
                    <em>
                      {seen ? <i className="done-dot" aria-hidden="true" /> : null}
                      {seen ? t('seen') : loc(lang, verb)}
                    </em>
                  </span>
                  <strong>{loc(lang, activity.title)}</strong>
                  <span>{loc(lang, CHALLENGE_BLURB[id])}</span>
                </button>
              )
            })}
          </div>
          <p className="challenge-kicker section-kicker">{t('rooms')}</p>
          <div className="catalog-rooms">
            {LAB_ROOMS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className="catalog-room"
                style={{ '--room-tone': item.tone } as CSSProperties}
                onClick={() => setRoom(item.id)}
              >
                <span className="catalog-room-top">
                  <b>{index + 1}</b>
                  <span className="icon-well">
                    <Icon name={ROOM_ICON[item.id]} />
                  </span>
                </span>
                <strong>{loc(lang, item.title)}</strong>
                <span>{loc(lang, item.blurb)}</span>
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
                <span className="catalog-card-top">
                  <span className="icon-well">
                    <Icon name={ROOM_ICON[activity.room]} />
                  </span>
                  <em>
                    {seen ? <i className="done-dot" aria-hidden="true" /> : null}
                    {seen ? t('seen') : t('watch')}
                  </em>
                </span>
                <strong>{loc(lang, activity.title)}</strong>
                <span>{loc(lang, activity.question)}</span>
              </button>
            )
          })}
        </div>
      )}
    </section>
  )
}
