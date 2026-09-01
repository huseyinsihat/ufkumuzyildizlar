import { sfxUrl, type SfxId } from './clips'

let current: HTMLAudioElement | null = null
let onActivity: ((busy: boolean) => void) | null = null

export function stopSfx(): void {
  if (!current) {
    onActivity?.(false)
    return
  }
  current.pause()
  current.removeAttribute('src')
  current.load()
  current = null
  onActivity?.(false)
}

export function playSfxFile(id: SfxId): void {
  if (current) {
    current.pause()
    current.removeAttribute('src')
    current.load()
    current = null
  }
  if (typeof Audio === 'undefined') {
    onActivity?.(false)
    return
  }
  const audio = new Audio(sfxUrl(id))
  current = audio

  const clearIfCurrent = () => {
    if (current === audio) current = null
  }

  audio.addEventListener('error', () => {
    clearIfCurrent()
    onActivity?.(false)
  })
  audio.addEventListener('ended', () => {
    clearIfCurrent()
    onActivity?.(false)
  })
  void audio.play().then(() => {
    if (current === audio) onActivity?.(true)
  }).catch(() => {
    clearIfCurrent()
    onActivity?.(false)
  })
}

export function setSfxActivityHandler(handler: ((busy: boolean) => void) | null): void {
  onActivity = handler
}
