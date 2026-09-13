import { displayName, getBody } from '../../astronomy/planetData'
import { localeTag, tx, type AppLang } from '../../i18n/types'
import { UI } from '../../i18n/ui'
import { earthRelativeWeight } from './gravityMath'
import type { BodyId } from '../../types/planet'

export type KidCompareId = 'size' | 'year' | 'gravity' | 'heat'

export interface KidCompareRow {
  id: KidCompareId
  label: string
  aValue: number
  bValue: number
  aText: string
  bText: string
  story: string
}

function fmt(value: number, digits = 0, lang: AppLang): string {
  return new Intl.NumberFormat(localeTag(lang), { maximumFractionDigits: digits }).format(value)
}

function yearText(days: number, lang: AppLang): string {
  if (days <= 0) return tx(lang, UI.center)
  if (days >= 365) return `${fmt(days / 365.25, 1, lang)} ${tx(lang, UI.years)}`
  return `${fmt(days, 1, lang)} ${tx(lang, UI.days)}`
}

function gravityText(bodyId: BodyId, lang: AppLang): string {
  if (bodyId === 'earth') return `1 ${tx(lang, UI.earthTimes)}`
  return `${fmt(earthRelativeWeight(1, bodyId).vsEarth, 2, lang)} ${tx(lang, UI.earthTimes)}`
}

function relativeStory(
  kind: KidCompareId,
  aName: string,
  bName: string,
  a: number,
  b: number,
  lang: AppLang,
): string {
  const span = Math.max(Math.abs(a), Math.abs(b), 0.01)
  if (Math.abs(a - b) / span < 0.08) {
    return lang === 'en' ? `${aName} and ${bName} are close here.` : `${aName} ve ${bName} burada birbirine yakın.`
  }
  const lead = a > b ? aName : bName
  if (kind === 'size') return lang === 'en' ? `${lead} is wider.` : `${lead} daha geniştir.`
  if (kind === 'year') return lang === 'en' ? `${lead} takes longer for one trip.` : `${lead} bir turunu daha uzun sürer.`
  if (kind === 'gravity') return lang === 'en' ? `${lead} pulls more strongly.` : `${lead} daha güçlü çeker.`
  return lang === 'en' ? `${lead} is hotter.` : `${lead} daha sıcaktır.`
}

export function kidCompare(aId: BodyId, bId: BodyId, lang: AppLang = 'tr'): KidCompareRow[] {
  const a = getBody(aId)
  const b = getBody(bId)
  const aName = displayName(a, lang)
  const bName = displayName(b, lang)
  const aG = earthRelativeWeight(1, aId).vsEarth
  const bG = earthRelativeWeight(1, bId).vsEarth
  return [
    {
      id: 'size',
      label: tx(lang, UI.diameter),
      aValue: a.radiusKm * 2,
      bValue: b.radiusKm * 2,
      aText: `${fmt(a.radiusKm * 2, 0, lang)} km`,
      bText: `${fmt(b.radiusKm * 2, 0, lang)} km`,
      story: relativeStory('size', aName, bName, a.radiusKm, b.radiusKm, lang),
    },
    {
      id: 'year',
      label: tx(lang, UI.year),
      aValue: Math.max(a.orbitalPeriodDays, 0.01),
      bValue: Math.max(b.orbitalPeriodDays, 0.01),
      aText: yearText(a.orbitalPeriodDays, lang),
      bText: yearText(b.orbitalPeriodDays, lang),
      story: relativeStory('year', aName, bName, a.orbitalPeriodDays, b.orbitalPeriodDays, lang),
    },
    {
      id: 'gravity',
      label: tx(lang, UI.gravity),
      aValue: aG,
      bValue: bG,
      aText: gravityText(aId, lang),
      bText: gravityText(bId, lang),
      story: relativeStory('gravity', aName, bName, aG, bG, lang),
    },
    {
      id: 'heat',
      label: tx(lang, UI.temperature),
      aValue: a.meanTempC + 273,
      bValue: b.meanTempC + 273,
      aText: `${fmt(a.meanTempC, 0, lang)} °C`,
      bText: `${fmt(b.meanTempC, 0, lang)} °C`,
      story: relativeStory('heat', aName, bName, a.meanTempC + 273, b.meanTempC + 273, lang),
    },
  ]
}

export function massInKidWords(bodyId: BodyId, lang: AppLang = 'tr'): string {
  const ratio = getBody(bodyId).massKg / getBody('earth').massKg
  if (lang === 'en') {
    if (ratio > 50) return 'Much heavier than Earth'
    if (ratio > 1.2) return 'Heavier than Earth'
    if (ratio > 0.85) return 'About Earth’s mass'
    if (ratio > 0.1) return 'Lighter than Earth'
    return 'Much lighter than Earth'
  }
  if (ratio > 50) return 'Dünya’dan çok daha ağır'
  if (ratio > 1.2) return 'Dünya’dan daha ağır'
  if (ratio > 0.85) return 'Dünya’ya yakın kütlede'
  if (ratio > 0.1) return 'Dünya’dan daha hafif'
  return 'Dünya’dan çok daha hafif'
}
