import { clipUrl, type VoiceClipId, type VoiceLang } from './clips'

let current: HTMLAudioElement | null = null
let followUp: VoiceClipId | null = null
let onFollowUp: ((id: VoiceClipId) => void) | null = null

export function stopVoice(): void {
  followUp = null
  if (!current) return
  current.pause()
  current.removeAttribute('src')
  current.load()
  current = null
}

export function playVoiceFile(lang: VoiceLang, id: VoiceClipId, next?: VoiceClipId): void {
  stopVoice()
  if (typeof Audio === 'undefined') return
  followUp = next ?? null
  const audio = new Audio(clipUrl(lang, id))
  current = audio

  const clearIfCurrent = () => {
    if (current === audio) current = null
  }

  audio.addEventListener('error', clearIfCurrent)
  audio.addEventListener('ended', () => {
    const queued = followUp
    followUp = null
    if (current === audio) current = null
    if (queued) onFollowUp?.(queued)
  })

  void audio.play().catch(clearIfCurrent)
}

export function setVoiceFollowUpHandler(handler: ((id: VoiceClipId) => void) | null): void {
  onFollowUp = handler
}
