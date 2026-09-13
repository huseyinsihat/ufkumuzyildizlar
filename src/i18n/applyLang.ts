import type { AppLang } from './types'
import { getScene } from '../scene/sceneApi'

export function applyDocumentLang(lang: AppLang): void {
  if (typeof document === 'undefined') return
  document.documentElement.lang = lang
}

export function applyLang(lang: AppLang): void {
  applyDocumentLang(lang)
  getScene()?.setLabelLang(lang)
}
