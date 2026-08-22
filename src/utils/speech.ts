export function speak(text: string): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return
  const clean = text.replace(/\s+/g, ' ').trim()
  if (!clean) return
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(clean)
  utter.lang = 'tr-TR'
  utter.rate = 0.92
  const voice = window.speechSynthesis.getVoices().find((item) => item.lang.startsWith('tr'))
  if (voice) utter.voice = voice
  window.speechSynthesis.speak(utter)
}

export function stopSpeech(): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return
  window.speechSynthesis.cancel()
}
