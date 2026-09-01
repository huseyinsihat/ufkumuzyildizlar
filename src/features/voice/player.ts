import { clipUrl, type VoiceClipId, type VoiceLang } from './clips'

let current: HTMLAudioElement | null = null
let followUp: VoiceClipId | null = null
let onFollowUp: ((id: VoiceClipId) => void) | null = null
let onActivity: ((busy: boolean) => void) | null = null

function releaseCurrent(): void {
  if (!current) return
  current.pause()
  current.removeAttribute('src')
  current.load()
  current = null
}

export function stopVoice(): void {
  followUp = null
  releaseCurrent()
  onActivity?.(false)
}

export function playVoiceFile(lang: VoiceLang, id: VoiceClipId, next?: VoiceClipId): void {
  followUp = next ?? null
  releaseCurrent()
  if (typeof Audio === 'undefined') {
    onActivity?.(false)
    return
  }
  const audio = new Audio(clipUrl(lang, id))
  current = audio

  const clearIfCurrent = () => {
    if (current === audio) current = null
  }

  audio.addEventListener('error', () => {
    clearIfCurrent()
    if (!followUp) onActivity?.(false)
  })
  audio.addEventListener('ended', () => {
    const queued = followUp
    followUp = null
    clearIfCurrent()
    if (queued) onFollowUp?.(queued)
    else onActivity?.(false)
  })

  void audio.play().then(() => {
    if (current === audio) onActivity?.(true)
  }).catch(() => {
    clearIfCurrent()
    onActivity?.(false)
  })
}

export function setVoiceFollowUpHandler(handler: ((id: VoiceClipId) => void) | null): void {
  onFollowUp = handler
}

export function setVoiceActivityHandler(handler: ((busy: boolean) => void) | null): void {
  onActivity = handler
}
