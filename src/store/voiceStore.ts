import { create } from 'zustand'
import type { VoiceClipId, VoiceLang } from '../features/voice/clips'
import { playVoiceFile, setVoiceFollowUpHandler, stopVoice } from '../features/voice/player'
import { useUiStore } from './uiStore'

interface VoiceState {
  enabled: boolean
  lang: VoiceLang
  unlocked: boolean
  pending: { id: VoiceClipId; next?: VoiceClipId } | null
  setEnabled: (enabled: boolean) => void
  setLang: (lang: VoiceLang) => void
  unlock: (playPending?: boolean) => void
  play: (id: VoiceClipId, next?: VoiceClipId) => void
  request: (id: VoiceClipId, next?: VoiceClipId) => void
  stop: () => void
}

function emit(lang: VoiceLang, id: VoiceClipId, next?: VoiceClipId): void {
  playVoiceFile(lang, id, next)
}

export const useVoiceStore = create<VoiceState>((set, get) => {
  setVoiceFollowUpHandler((id) => {
    const { enabled, lang } = get()
    if (!enabled) return
    if (id === 'intro-lead' && !useUiStore.getState().introVisible) return
    emit(lang, id)
  })

  return {
    enabled: true,
    lang: 'tr',
    unlocked: false,
    pending: null,
    setEnabled: (enabled) => {
      if (!enabled) stopVoice()
      set({ enabled, pending: enabled ? get().pending : null })
    },
    setLang: (lang) => set({ lang }),
    unlock: (playPending = true) => {
      if (get().unlocked) return
      const pending = get().pending
      set({ unlocked: true, pending: null })
      if (!get().enabled) return
      if (playPending && pending) emit(get().lang, pending.id, pending.next)
    },
    play: (id, next) => {
      const { enabled, unlocked, lang } = get()
      if (!enabled) return
      if (!unlocked) {
        set({ pending: { id, next } })
        return
      }
      set({ pending: null })
      emit(lang, id, next)
    },
    request: (id, next) => {
      get().play(id, next)
    },
    stop: () => {
      set({ pending: null })
      stopVoice()
    },
  }
})
