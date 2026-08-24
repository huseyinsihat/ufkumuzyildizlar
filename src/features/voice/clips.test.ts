import { describe, expect, it } from 'vitest'
import type { LabActivityId } from '../../types/lab'
import type { BodyId } from '../../types/planet'
import { BODIES } from '../../astronomy/planetData'
import { CHALLENGE_IDS } from '../../content/labActivities'
import {
  activityClip,
  bodyClip,
  clipUrl,
  roomClip,
  VOICE_CLIP_IDS,
} from './clips'

describe('voice clips', () => {
  it('names files as lang-code.mp3 under audio/', () => {
    expect(clipUrl('tr', 'body-earth')).toMatch(/audio\/tr-body-earth\.mp3$/)
    expect(clipUrl('en', 'intro-welcome')).toMatch(/audio\/en-intro-welcome\.mp3$/)
  })

  it('covers every selectable body', () => {
    for (const body of BODIES) {
      const clip = bodyClip(body.id as BodyId)
      expect(VOICE_CLIP_IDS).toContain(clip)
      if (body.category === 'moon' && body.parentId && body.id !== 'moon') {
        expect(clip).toBe(`body-${body.parentId}`)
      } else {
        expect(clip).toBe(`body-${body.id}`)
      }
    }
    expect(VOICE_CLIP_IDS.filter((id) => id.startsWith('body-'))).toHaveLength(11)
  })

  it('maps lab rooms and the five quick-start activities', () => {
    expect(roomClip('motion')).toBe('room-motion')
    expect(roomClip('sky')).toBe('room-sky')
    for (const id of CHALLENGE_IDS) {
      expect(activityClip(id as LabActivityId)).toBe(`activity-${id}`)
    }
    expect(activityClip('earth-year')).toBeUndefined()
  })

  it('keeps a small pack: intro, ui, bodies, lab flow, rooms, challenges', () => {
    expect(VOICE_CLIP_IDS).toHaveLength(39)
    expect(new Set(VOICE_CLIP_IDS).size).toBe(39)
  })
})
