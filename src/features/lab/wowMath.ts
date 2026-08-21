import type { BodyId } from '../../types/planet'

/** Güneş ışığının ortalama ulaşma süresi (saniye). */
export const LIGHT_TRAVEL_SEC: Record<'earth' | 'jupiter', number> = {
  earth: 499,
  jupiter: 2_620,
}

export function lightTravelLabel(body: 'earth' | 'jupiter'): string {
  const sec = LIGHT_TRAVEL_SEC[body]
  const minutes = Math.floor(sec / 60)
  const seconds = Math.round(sec % 60)
  return `${minutes} dk ${seconds} sn`
}

export const MERCURY_YEAR_DAYS = 87.969
export const MERCURY_SOLAR_DAY_DAYS = 175.94

export function mercuryDayProgress(yearTours: number): { year: number; day: number } {
  return {
    year: Math.min(1, yearTours),
    day: Math.min(1, yearTours / 2),
  }
}

export function cometTailAwayFromSun(
  sun: { x: number; y: number; z: number },
  comet: { x: number; y: number; z: number },
): { x: number; y: number; z: number; length: number } {
  const x = comet.x - sun.x
  const y = comet.y - sun.y
  const z = comet.z - sun.z
  const length = Math.hypot(x, y, z) || 1
  return { x: x / length, y: y / length, z: z / length, length }
}

export function isNorthernWinterMonth(month: 'jan' | 'jul'): boolean {
  return month === 'jan'
}

export function heatRank(bodyId: BodyId): number {
  if (bodyId === 'venus') return 1
  if (bodyId === 'mercury') return 0.42
  if (bodyId === 'earth') return 0.28
  return 0.1
}
