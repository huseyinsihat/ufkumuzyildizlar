import { getBody } from '../../astronomy/planetData'
import type { BodyId } from '../../types/planet'

export interface KidCompareRow {
  label: string
  aValue: number
  bValue: number
  aText: string
  bText: string
}

function fmt(value: number, digits = 0): string {
  return new Intl.NumberFormat('tr-TR', { maximumFractionDigits: digits }).format(value)
}

function yearText(days: number): string {
  if (days <= 0) return 'merkez'
  if (days >= 365) return `${fmt(days / 365.25, 1)} yıl`
  return `${fmt(days, 1)} gün`
}

export function kidCompare(aId: BodyId, bId: BodyId): KidCompareRow[] {
  const a = getBody(aId)
  const b = getBody(bId)
  return [
    {
      label: 'Çap',
      aValue: a.radiusKm * 2,
      bValue: b.radiusKm * 2,
      aText: `${fmt(a.radiusKm * 2)} km`,
      bText: `${fmt(b.radiusKm * 2)} km`,
    },
    {
      label: 'Bir yıl',
      aValue: Math.max(a.orbitalPeriodDays, 0.01),
      bValue: Math.max(b.orbitalPeriodDays, 0.01),
      aText: yearText(a.orbitalPeriodDays),
      bText: yearText(b.orbitalPeriodDays),
    },
    {
      label: 'Yerçekimi',
      aValue: a.gravityMs2,
      bValue: b.gravityMs2,
      aText: `${fmt(a.gravityMs2, 1)} m/s²`,
      bText: `${fmt(b.gravityMs2, 1)} m/s²`,
    },
    {
      label: 'Sıcaklık',
      aValue: a.meanTempC + 273,
      bValue: b.meanTempC + 273,
      aText: `${fmt(a.meanTempC)} °C`,
      bText: `${fmt(b.meanTempC)} °C`,
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
