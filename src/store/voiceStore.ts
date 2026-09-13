import { create } from 'zustand'
import type { SfxId, VoiceClipId, VoiceLang } from '../features/voice/clips'
import { playVoiceFile, setVoiceActivityHandler, setVoiceFollowUpHandler, stopVoice } from '../features/voice/player'
import { playSfxFile, setSfxActivityHandler, stopSfx } from '../features/voice/sfx'
import { applyLang } from '../i18n/applyLang'
import { useUiStore } from './uiStore'

interface VoiceState {
  enabled: boolean
  playing: boolean
  lang: VoiceLang
  unlocked: boolean
  pending: { id: VoiceClipId; next?: VoiceClipId } | null
  setEnabled: (enabled: boolean) => void
  setLang: (lang: VoiceLang) => void
  unlock: (playPending?: boolean) => void
  play: (id: VoiceClipId, next?: VoiceClipId) => void
  playSfx: (id: SfxId) => void
  request: (id: VoiceClipId, next?: VoiceClipId) => void
  stop: () => void
}

function emit(lang: VoiceLang, id: VoiceClipId, next?: VoiceClipId): void {
  playVoiceFile(lang, id, next)
}

export const useVoiceStore = create<VoiceState>((set, get) => {
  let voiceBusy = false
  let sfxBusy = false

  function syncPlaying(): void {
    set({ playing: voiceBusy || sfxBusy })
  }

  setVoiceFollowUpHandler((id) => {
    const { enabled, lang } = get()
    if (!enabled) return
    if (id === 'intro-lead' && !useUiStore.getState().introVisible) return
    emit(lang, id)
  })
  setVoiceActivityHandler((busy) => {
    voiceBusy = busy
    syncPlaying()
  })
  setSfxActivityHandler((busy) => {
    sfxBusy = busy
    syncPlaying()
  })

  return {
    enabled: true,
    playing: false,
    lang: 'tr',
    unlocked: false,
    pending: null,
    setEnabled: (enabled) => {
      if (!enabled) {
        stopVoice()
        stopSfx()
        voiceBusy = false
        sfxBusy = false
      }
      set({ enabled, playing: enabled ? voiceBusy || sfxBusy : false, pending: enabled ? get().pending : null })
    },
    setLang: (lang) => {
      set({ lang })
      applyLang(lang)
    },
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
    playSfx: (id) => {
      const { enabled, unlocked } = get()
      if (!enabled || !unlocked) return
      playSfxFile(id)
    },
    request: (id, next) => {
      get().play(id, next)
    },
    stop: () => {
      set({ pending: null, playing: false })
      voiceBusy = false
      sfxBusy = false
      stopVoice()
      stopSfx()
    },
  }
})
