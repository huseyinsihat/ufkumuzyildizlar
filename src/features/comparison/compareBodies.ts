import { AU_KM } from '../../astronomy/astronomyConstants'
import { getBody } from '../../astronomy/planetData'
import type { BodyId } from '../../types/planet'

export interface ComparisonRow {
  label: string
  a: string
  b: string
}

function fmt(value: number, digits = 1): string {
  return new Intl.NumberFormat('tr-TR', { maximumFractionDigits: digits }).format(value)
}

export function compareBodies(aId: BodyId, bId: BodyId): ComparisonRow[] {
  const a = getBody(aId)
  const b = getBody(bId)
  return [
    { label: 'Çap', a: `${fmt(a.radiusKm * 2, 0)} km`, b: `${fmt(b.radiusKm * 2, 0)} km` },
    { label: 'Kütle', a: `${a.massKg.toExponential(2)} kg`, b: `${b.massKg.toExponential(2)} kg` },
    { label: 'Yerçekimi', a: `${fmt(a.gravityMs2, 1)} m/s²`, b: `${fmt(b.gravityMs2, 1)} m/s²` },
    {
      label: 'Gün uzunluğu (dönme)',
      a: `${fmt(Math.abs(a.rotationPeriodHours), 1)} saat`,
      b: `${fmt(Math.abs(b.rotationPeriodHours), 1)} saat`,
    },
    {
      label: 'Yıl uzunluğu (dolanma)',
      a: a.orbitalPeriodDays > 0 ? `${fmt(a.orbitalPeriodDays, 1)} gün` : '—',
      b: b.orbitalPeriodDays > 0 ? `${fmt(b.orbitalPeriodDays, 1)} gün` : '—',
    },
    { label: 'Ortalama sıcaklık', a: `${fmt(a.meanTempC, 0)} °C`, b: `${fmt(b.meanTempC, 0)} °C` },
    { label: 'Uydu sayısı', a: String(a.moons), b: String(b.moons) },
    {
      label: 'Güneş’e uzaklık',
      a: a.orbitalRadiusAu > 0 ? `${fmt(a.orbitalRadiusAu, 3)} AB` : 'merkez',
      b: b.orbitalRadiusAu > 0 ? `${fmt(b.orbitalRadiusAu, 3)} AB` : 'merkez',
    },
  ]
}

export function earthSunDistanceAtScale(cmPerMillionKm: number): { cm: number; label: string } {
  const earthKm = getBody('earth').orbitalRadiusAu * AU_KM
  const millionKm = earthKm / 1_000_000
  const cm = millionKm * cmPerMillionKm
  return {
    cm,
    label: `1 cm = ${cmPerMillionKm} milyon km seçilirse Güneş–Dünya aralığı yaklaşık ${fmt(cm, 0)} cm (${fmt(cm / 100, 2)} m) olur.`,
  }
}
