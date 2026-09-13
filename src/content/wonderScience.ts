import { localeTag, tx, type AppLang } from '../i18n/types'
import { UI } from '../i18n/ui'
import { formatAu } from '../utils/formatting'
import {
  isNotableStar,
  wonderKindLabel,
  type NamedRock,
  type NotableStar,
  type SkyWonder,
} from './skyWonders'

export interface WonderStat {
  label: string
  value: string
}

const DRIFT_PREVIEW_MIN = 0.2

function formatNumber(value: number, digits: number, lang: AppLang): string {
  return new Intl.NumberFormat(localeTag(lang), {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value)
}

export function formatLightYears(ly: number, lang: AppLang = 'tr'): string {
  const unit = tx(lang, UI.lightYear)
  if (ly >= 1_000_000_000) {
    const scale = lang === 'en' ? 'billion' : 'milyar'
    return `${formatNumber(ly / 1_000_000_000, 1, lang)} ${scale} ${unit}`
  }
  if (ly >= 1_000_000) {
    const scale = lang === 'en' ? 'million' : 'milyon'
    return `${formatNumber(ly / 1_000_000, 1, lang)} ${scale} ${unit}`
  }
  if (ly >= 100) return `${formatNumber(ly, 0, lang)} ${unit}`
  if (ly >= 8) return `${formatNumber(ly, 1, lang)} ${unit}`
  return `${formatNumber(ly, 2, lang)} ${unit}`
}

export function formatSkyDrift(arcsecPerYear: number, lang: AppLang = 'tr'): string {
  const digits = arcsecPerYear >= 2 ? 1 : 2
  const unit = lang === 'en' ? '″/year' : '″/yıl'
  return `${formatNumber(arcsecPerYear, digits, lang)} ${unit}`
}

function isNamedRock(wonder: SkyWonder): wonder is NamedRock {
  return 'au' in wonder
}

export function wonderHasDetail(wonder: SkyWonder): boolean {
  if (isNotableStar(wonder)) return wonder.facts.length > 0
  return Boolean(wonder.facts && wonder.facts.length > 0)
}

export function wonderPreviewStats(wonder: SkyWonder, lang: AppLang = 'tr'): WonderStat[] {
  const rows: WonderStat[] = [
    { label: tx(lang, UI.kind), value: wonderKindLabel(wonder.kind, lang) },
    { label: tx(lang, UI.trait), value: tx(lang, wonder.tag) },
  ]
  if (isNotableStar(wonder)) {
    rows.push({ label: tx(lang, UI.distance), value: formatLightYears(wonder.distLy, lang) })
    if (wonder.pmArcsecYr != null && wonder.pmArcsecYr >= DRIFT_PREVIEW_MIN) {
      rows.push({ label: tx(lang, UI.skyDrift), value: formatSkyDrift(wonder.pmArcsecYr, lang) })
    }
  } else if (isNamedRock(wonder)) {
    const sunDist = lang === 'en' ? 'Distance from the Sun' : 'Güneş’e uzaklık'
    rows.push({ label: sunDist, value: formatAu(wonder.au) })
  }
  return rows
}

export function wonderDetailStats(wonder: SkyWonder, lang: AppLang = 'tr'): WonderStat[] {
  if (!isNotableStar(wonder)) return []
  const rows: WonderStat[] = []
  if (wonder.spectral) {
    rows.push({ label: lang === 'en' ? 'Spectrum' : 'Spektrum', value: wonder.spectral })
  }
  if (wonder.kind === 'star') {
    rows.push({ label: tx(lang, UI.temperature), value: `${formatNumber(wonder.tempK, 0, lang)} K` })
    const sunTimes = lang === 'en' ? '× Sun' : '× Güneş'
    rows.push({
      label: lang === 'en' ? 'Radius' : 'Yarıçap',
      value: `${formatNumber(wonder.radiusSolar, wonder.radiusSolar < 2 ? 2 : 0, lang)} ${sunTimes}`,
    })
  }
  rows.push({
    label: lang === 'en' ? 'Brightness' : 'Parlaklık',
    value: `${formatNumber(wonder.mag, 2, lang)} mag`,
  })
  if (wonder.pmArcsecYr != null && wonder.pmArcsecYr < DRIFT_PREVIEW_MIN) {
    rows.push({ label: tx(lang, UI.skyDrift), value: formatSkyDrift(wonder.pmArcsecYr, lang) })
  }
  return rows
}

export function wonderFactList(wonder: SkyWonder, more: boolean, lang: AppLang = 'tr'): string[] {
  const facts = wonder.facts ?? []
  if (!more) return []
  return facts.map((fact) => tx(lang, fact))
}

export function starScienceLine(star: NotableStar, lang: AppLang = 'tr'): string {
  const distWord = lang === 'en' ? 'Distance' : 'Uzaklık'
  const bits = [`${distWord} ${formatLightYears(star.distLy, lang)}`]
  if (star.pmArcsecYr != null && star.pmArcsecYr >= DRIFT_PREVIEW_MIN) {
    const driftWord = lang === 'en' ? 'sky drift' : 'gökyüzünde kayış'
    bits.push(`${driftWord} ${formatSkyDrift(star.pmArcsecYr, lang)}`)
  }
  if (star.spectral) {
    const specWord = lang === 'en' ? 'spectrum' : 'spektrum'
    bits.push(`${specWord} ${star.spectral}`)
  }
  return `${bits.join('. ')}.`
}
