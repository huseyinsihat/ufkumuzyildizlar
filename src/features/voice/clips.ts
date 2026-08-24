import type { LabActivityId, LabRoomId } from '../../types/lab'
import type { BodyId } from '../../types/planet'

export type VoiceLang = 'tr' | 'en'

export const VOICE_CLIP_IDS = [
  'intro-welcome',
  'intro-lead',
  'intro-lab',
  'intro-explore',
  'intro-team',
  'mode-explore',
  'mode-lab',
  'ui-planets',
  'ui-stars',
  'ui-facts',
  'ui-compare',
  'ui-team',
  'ui-overview',
  'body-sun',
  'body-mercury',
  'body-venus',
  'body-earth',
  'body-moon',
  'body-mars',
  'body-jupiter',
  'body-saturn',
  'body-uranus',
  'body-neptune',
  'body-pluto',
  'lab-predict',
  'lab-watch',
  'lab-why',
  'lab-done',
  'room-motion',
  'room-earth',
  'room-gravity',
  'room-scale',
  'room-build',
  'room-sky',
  'activity-arrange-orbits',
  'activity-moon-phases',
  'activity-closest-hottest',
  'activity-drop-ball',
  'activity-who-faster',
] as const

export type VoiceClipId = (typeof VOICE_CLIP_IDS)[number]

const BODY_CLIPS: Record<BodyId, VoiceClipId> = {
  sun: 'body-sun',
  mercury: 'body-mercury',
  venus: 'body-venus',
  earth: 'body-earth',
  moon: 'body-moon',
  mars: 'body-mars',
  phobos: 'body-mars',
  deimos: 'body-mars',
  jupiter: 'body-jupiter',
  io: 'body-jupiter',
  europa: 'body-jupiter',
  ganymede: 'body-jupiter',
  callisto: 'body-jupiter',
  saturn: 'body-saturn',
  titan: 'body-saturn',
  uranus: 'body-uranus',
  neptune: 'body-neptune',
  pluto: 'body-pluto',
}

const ROOM_CLIPS: Record<LabRoomId, VoiceClipId> = {
  motion: 'room-motion',
  earth: 'room-earth',
  gravity: 'room-gravity',
  scale: 'room-scale',
  build: 'room-build',
  sky: 'room-sky',
}

const ACTIVITY_CLIPS: Partial<Record<LabActivityId, VoiceClipId>> = {
  'arrange-orbits': 'activity-arrange-orbits',
  'moon-phases': 'activity-moon-phases',
  'closest-hottest': 'activity-closest-hottest',
  'drop-ball': 'activity-drop-ball',
  'who-faster': 'activity-who-faster',
}

export function clipUrl(lang: VoiceLang, id: VoiceClipId): string {
  return `${import.meta.env.BASE_URL}audio/${lang}-${id}.mp3`
}

export function bodyClip(id: BodyId): VoiceClipId {
  return BODY_CLIPS[id]
}

export function roomClip(id: LabRoomId): VoiceClipId {
  return ROOM_CLIPS[id]
}

export function activityClip(id: LabActivityId): VoiceClipId | undefined {
  return ACTIVITY_CLIPS[id]
}
