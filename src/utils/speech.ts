import { localeTag, type AppLang } from '../i18n/types'

export function speak(text: string, lang: AppLang = 'tr'): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return
  const clean = text.replace(/\s+/g, ' ').trim()
  if (!clean) return
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(clean)
  utter.lang = localeTag(lang)
  utter.rate = 0.92
  const prefix = lang === 'en' ? 'en' : 'tr'
  const voice = window.speechSynthesis.getVoices().find((item) => item.lang.toLowerCase().startsWith(prefix))
  if (voice) utter.voice = voice
  window.speechSynthesis.speak(utter)
}

export function stopSpeech(): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return
  window.speechSynthesis.cancel()
}
