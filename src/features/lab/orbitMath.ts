import { getBody } from '../../astronomy/planetData'
import type { BodyId } from '../../types/planet'
import type { Vec3 } from '../../types/simulation'

export function eclipticLongitude(au: Vec3): number {
  return Math.atan2(au.y, au.x)
}

export function wrapDelta(from: number, to: number): number {
  let delta = to - from
  const tau = Math.PI * 2
  if (delta > Math.PI) delta -= tau
  if (delta < -Math.PI) delta += tau
  return delta
}

export function earthYearTours(): { id: BodyId; name: string; tours: number }[] {
  const year = getBody('earth').orbitalPeriodDays
  const ids: BodyId[] = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn']
  return ids.map((id) => {
    const body = getBody(id)
    return {
      id,
      name: body.name,
      tours: year / body.orbitalPeriodDays,
    }
  })
}

export function moonPhaseName(angleDeg: number): string {
  const a = ((angleDeg % 360) + 360) % 360
  if (a < 18 || a > 342) return 'Yeniay'
  if (Math.abs(a - 180) < 18) return 'Dolunay'
  if (a < 90 || a > 270) return 'Hilal'
  return 'Yarım'
}

export function isFullMoon(angleDeg: number): boolean {
  const a = ((angleDeg % 360) + 360) % 360
  return Math.abs(a - 180) < 18
}

export function kidTourLabel(tours: number): string {
  if (tours >= 1.5) return `${Math.round(tours)} tur`
  if (tours >= 0.85) return '1 tur'
  return 'bitmedi'
}
