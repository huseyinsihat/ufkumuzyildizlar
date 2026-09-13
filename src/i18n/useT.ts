import { useVoiceStore } from '../store/voiceStore'
import { tx, type AppLang } from './types'
import { UI, type UiKey } from './ui'

export function useLang(): AppLang {
  return useVoiceStore((s) => s.lang)
}

export function useT(): (key: UiKey) => string {
  const lang = useLang()
  return (key) => tx(lang, UI[key])
}
