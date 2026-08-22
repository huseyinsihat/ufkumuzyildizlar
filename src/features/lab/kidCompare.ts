import { getBody } from '../../astronomy/planetData'
import { earthRelativeWeight } from './gravityMath'
import type { BodyId } from '../../types/planet'

export interface KidCompareRow {
  label: string
  aValue: number
  bValue: number
  aText: string
  bText: string
  story: string
}

function fmt(value: number, digits = 0): string {
  return new Intl.NumberFormat('tr-TR', { maximumFractionDigits: digits }).format(value)
}

function yearText(days: number): string {
  if (days <= 0) return 'merkez'
  if (days >= 365) return `${fmt(days / 365.25, 1)} yıl`
  return `${fmt(days, 1)} gün`
}

function gravityText(bodyId: BodyId): string {
  if (bodyId === 'earth') return '1 × Dünya'
  return `${fmt(earthRelativeWeight(1, bodyId).vsEarth, 2)} × Dünya`
}

function relativeStory(kind: 'size' | 'year' | 'gravity' | 'heat', aName: string, bName: string, a: number, b: number): string {
  const span = Math.max(Math.abs(a), Math.abs(b), 0.01)
  if (Math.abs(a - b) / span < 0.08) return `${aName} ve ${bName} burada birbirine yakın.`
  const lead = a > b ? aName : bName
  if (kind === 'size') return `${lead} daha geniştir.`
  if (kind === 'year') return `${lead} bir turunu daha uzun sürer.`
  if (kind === 'gravity') return `${lead} daha güçlü çeker.`
  return `${lead} daha sıcaktır.`
}

export function kidCompare(aId: BodyId, bId: BodyId): KidCompareRow[] {
  const a = getBody(aId)
  const b = getBody(bId)
  const aG = earthRelativeWeight(1, aId).vsEarth
  const bG = earthRelativeWeight(1, bId).vsEarth
  return [
    {
      label: 'Çap',
      aValue: a.radiusKm * 2,
      bValue: b.radiusKm * 2,
      aText: `${fmt(a.radiusKm * 2)} km`,
      bText: `${fmt(b.radiusKm * 2)} km`,
      story: relativeStory('size', a.name, b.name, a.radiusKm, b.radiusKm),
    },
    {
      label: 'Bir yıl',
      aValue: Math.max(a.orbitalPeriodDays, 0.01),
      bValue: Math.max(b.orbitalPeriodDays, 0.01),
      aText: yearText(a.orbitalPeriodDays),
      bText: yearText(b.orbitalPeriodDays),
      story: relativeStory('year', a.name, b.name, a.orbitalPeriodDays, b.orbitalPeriodDays),
    },
    {
      label: 'Yerçekimi',
      aValue: aG,
      bValue: bG,
      aText: gravityText(aId),
      bText: gravityText(bId),
      story: relativeStory('gravity', a.name, b.name, aG, bG),
    },
    {
      label: 'Sıcaklık',
      aValue: a.meanTempC + 273,
      bValue: b.meanTempC + 273,
      aText: `${fmt(a.meanTempC)} °C`,
      bText: `${fmt(b.meanTempC)} °C`,
      story: relativeStory('heat', a.name, b.name, a.meanTempC + 273, b.meanTempC + 273),
    },
  ]
}

export function massInKidWords(bodyId: BodyId): string {
  const ratio = getBody(bodyId).massKg / getBody('earth').massKg
  if (ratio > 50) return 'Dünya’dan çok daha ağır'
  if (ratio > 1.2) return 'Dünya’dan daha ağır'
  if (ratio > 0.85) return 'Dünya’ya yakın kütlede'
  if (ratio > 0.1) return 'Dünya’dan daha hafif'
  return 'Dünya’dan çok daha hafif'
}
