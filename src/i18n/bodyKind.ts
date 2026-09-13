import type { BodyCategory } from '../types/planet'
import { tx, type AppLang } from './types'
import { UI } from './ui'

export function bodyKindLabel(category: BodyCategory, lang: AppLang): string {
  if (category === 'star') return tx(lang, UI.kindStar)
  if (category === 'terrestrial') return tx(lang, UI.kindRock)
  if (category === 'gasGiant') return tx(lang, UI.kindGas)
  if (category === 'iceGiant') return tx(lang, UI.kindIce)
  if (category === 'dwarf') return tx(lang, UI.kindDwarf)
  return tx(lang, UI.kindMoon)
}
