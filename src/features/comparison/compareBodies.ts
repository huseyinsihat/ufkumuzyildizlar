import { AU_KM } from '../../astronomy/astronomyConstants'
import { getBody } from '../../astronomy/planetData'
import { L, localeTag, tx, type AppLang, type LocText } from '../../i18n/types'
import { UI } from '../../i18n/ui'
import type { BodyId } from '../../types/planet'

export interface ComparisonRow {
  label: string
  a: string
  b: string
}

const SPIN_DAY = L('Gün uzunluğu (dönme)', 'Day length (spin)')
const ORBIT_YEAR = L('Yıl uzunluğu (dolanma)', 'Year length (orbit)')
const MOON_COUNT = L('Uydu sayısı', 'Moon count')
const SUN_DIST = L('Güneş’e uzaklık', 'Distance from the Sun')
const SCALE_LINE = L(
  '1 cm = {cm} milyon km seçilirse Güneş–Dünya aralığı yaklaşık {span} cm ({meters} m) olur.',
  'If 1 cm = {cm} million km, the Sun–Earth gap is about {span} cm ({meters} m).',
)

function fmt(value: number, digits = 1, lang: AppLang = 'tr'): string {
  return new Intl.NumberFormat(localeTag(lang), { maximumFractionDigits: digits }).format(value)
}

function fill(template: LocText, lang: AppLang, vars: Record<string, string>): string {
  let text = tx(lang, template)
  for (const [key, value] of Object.entries(vars)) {
    text = text.replaceAll(`{${key}}`, value)
  }
  return text
}

export function compareBodies(aId: BodyId, bId: BodyId, lang: AppLang = 'tr'): ComparisonRow[] {
  const a = getBody(aId)
  const b = getBody(bId)
  return [
    { label: tx(lang, UI.diameter), a: `${fmt(a.radiusKm * 2, 0, lang)} km`, b: `${fmt(b.radiusKm * 2, 0, lang)} km` },
    { label: tx(lang, UI.mass), a: `${a.massKg.toExponential(2)} kg`, b: `${b.massKg.toExponential(2)} kg` },
    { label: tx(lang, UI.gravity), a: `${fmt(a.gravityMs2, 1, lang)} m/s²`, b: `${fmt(b.gravityMs2, 1, lang)} m/s²` },
    {
      label: tx(lang, SPIN_DAY),
      a: `${fmt(Math.abs(a.rotationPeriodHours), 1, lang)} ${tx(lang, UI.hours)}`,
      b: `${fmt(Math.abs(b.rotationPeriodHours), 1, lang)} ${tx(lang, UI.hours)}`,
    },
    {
      label: tx(lang, ORBIT_YEAR),
      a: a.orbitalPeriodDays > 0 ? `${fmt(a.orbitalPeriodDays, 1, lang)} ${tx(lang, UI.days)}` : '—',
      b: b.orbitalPeriodDays > 0 ? `${fmt(b.orbitalPeriodDays, 1, lang)} ${tx(lang, UI.days)}` : '—',
    },
    { label: tx(lang, UI.temperature), a: `${fmt(a.meanTempC, 0, lang)} °C`, b: `${fmt(b.meanTempC, 0, lang)} °C` },
    { label: tx(lang, MOON_COUNT), a: String(a.moons), b: String(b.moons) },
    {
      label: tx(lang, SUN_DIST),
      a: a.orbitalRadiusAu > 0 ? `${fmt(a.orbitalRadiusAu, 3, lang)} ${tx(lang, UI.au)}` : tx(lang, UI.center),
      b: b.orbitalRadiusAu > 0 ? `${fmt(b.orbitalRadiusAu, 3, lang)} ${tx(lang, UI.au)}` : tx(lang, UI.center),
    },
  ]
}

export function earthSunDistanceAtScale(
  cmPerMillionKm: number,
  lang: AppLang = 'tr',
): { cm: number; label: string } {
  const earthKm = getBody('earth').orbitalRadiusAu * AU_KM
  const millionKm = earthKm / 1_000_000
  const cm = millionKm * cmPerMillionKm
  return {
    cm,
    label: fill(SCALE_LINE, lang, {
      cm: String(cmPerMillionKm),
      span: fmt(cm, 0, lang),
      meters: fmt(cm / 100, 2, lang),
    }),
  }
}
