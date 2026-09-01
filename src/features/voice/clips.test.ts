import { describe, expect, it } from 'vitest'
import type { LabActivityId } from '../../types/lab'
import type { BodyId } from '../../types/planet'
import { BODIES } from '../../astronomy/planetData'
import { CHALLENGE_IDS, isCorrectLabChoice } from '../../content/labActivities'
import { useVoiceStore } from '../../store/voiceStore'
import {
  activityClip,
  bodyClip,
  clipUrl,
  roomClip,
  sfxUrl,
  SFX_IDS,
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

  it('names sfx files without a language prefix', () => {
    expect(sfxUrl('correct')).toMatch(/audio\/sfx-correct\.mp3$/)
    expect(sfxUrl('wrong')).toMatch(/audio\/sfx-wrong\.mp3$/)
    expect(SFX_IDS).toEqual(['correct', 'wrong'])
  })

  it('maps lab guesses to sfx without spoiling activities that have no answer id', () => {
    expect(isCorrectLabChoice('who-faster', 'mercury')).toBe(true)
    expect(isCorrectLabChoice('who-faster', 'earth')).toBe(false)
    expect(isCorrectLabChoice('closest-hottest', 'venus')).toBe(true)
    expect(isCorrectLabChoice('arrange-orbits', 'earth')).toBeUndefined()
  })

  it('starts with narration on and the speaker idle', () => {
    expect(useVoiceStore.getState().enabled).toBe(true)
    expect(useVoiceStore.getState().playing).toBe(false)
  })
})
