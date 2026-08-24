import { formatAu, formatNumberTr } from '../utils/formatting'
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

export function formatLightYears(ly: number): string {
  if (ly >= 1_000_000_000) return `${formatNumberTr(ly / 1_000_000_000, 1)} milyar ışık yılı`
  if (ly >= 1_000_000) return `${formatNumberTr(ly / 1_000_000, 1)} milyon ışık yılı`
  if (ly >= 100) return `${formatNumberTr(ly, 0)} ışık yılı`
  if (ly >= 8) return `${formatNumberTr(ly, 1)} ışık yılı`
  return `${formatNumberTr(ly, 2)} ışık yılı`
}

export function formatSkyDrift(arcsecPerYear: number): string {
  return `${formatNumberTr(arcsecPerYear, arcsecPerYear >= 2 ? 1 : 2)} ″/yıl`
}

function isNamedRock(wonder: SkyWonder): wonder is NamedRock {
  return 'au' in wonder
}

export function wonderHasDetail(wonder: SkyWonder): boolean {
  if (isNotableStar(wonder)) return wonder.facts.length > 0
  return Boolean(wonder.facts && wonder.facts.length > 0)
}

export function wonderPreviewStats(wonder: SkyWonder): WonderStat[] {
  const rows: WonderStat[] = [
    { label: 'Tür', value: wonderKindLabel(wonder.kind) },
    { label: 'Özellik', value: wonder.tag },
  ]
  if (isNotableStar(wonder)) {
    rows.push({ label: 'Uzaklık', value: formatLightYears(wonder.distLy) })
    if (wonder.pmArcsecYr != null && wonder.pmArcsecYr >= DRIFT_PREVIEW_MIN) {
      rows.push({ label: 'Gökyüzünde kayış', value: formatSkyDrift(wonder.pmArcsecYr) })
    }
  } else if (isNamedRock(wonder)) {
    rows.push({ label: 'Güneş’e uzaklık', value: formatAu(wonder.au) })
  }
  return rows
}

export function wonderDetailStats(wonder: SkyWonder): WonderStat[] {
  if (!isNotableStar(wonder)) return []
  const rows: WonderStat[] = []
  if (wonder.spectral) rows.push({ label: 'Spektrum', value: wonder.spectral })
  if (wonder.kind === 'star') {
    rows.push({ label: 'Sıcaklık', value: `${formatNumberTr(wonder.tempK, 0)} K` })
    rows.push({
      label: 'Yarıçap',
      value: `${formatNumberTr(wonder.radiusSolar, wonder.radiusSolar < 2 ? 2 : 0)} × Güneş`,
    })
  }
  rows.push({ label: 'Parlaklık', value: `${formatNumberTr(wonder.mag, 2)} mag` })
  if (wonder.pmArcsecYr != null && wonder.pmArcsecYr < DRIFT_PREVIEW_MIN) {
    rows.push({ label: 'Gökyüzünde kayış', value: formatSkyDrift(wonder.pmArcsecYr) })
  }
  return rows
}

export function wonderFactList(wonder: SkyWonder, more: boolean): string[] {
  const facts = wonder.facts ?? []
  if (!more) return []
  return facts
}

export function starScienceLine(star: NotableStar): string {
  const bits = [`Uzaklık ${formatLightYears(star.distLy)}`]
  if (star.pmArcsecYr != null && star.pmArcsecYr >= DRIFT_PREVIEW_MIN) {
    bits.push(`gökyüzünde kayış ${formatSkyDrift(star.pmArcsecYr)}`)
  }
  if (star.spectral) bits.push(`spektrum ${star.spectral}`)
  return `${bits.join('. ')}.`
}
