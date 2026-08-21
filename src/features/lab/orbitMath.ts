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
  if (a < 20 || a > 340) return 'Yeniay'
  if (a < 70) return 'İlk dördün yakını'
  if (a < 110) return 'İlk dördün'
  if (a < 160) return 'Şişkin ay'
  if (a < 200) return 'Dolunay'
  if (a < 250) return 'Sondördün yakını'
  if (a < 290) return 'Sondördün'
  return 'İnce hilal'
}

export function isFullMoon(angleDeg: number): boolean {
  const a = ((angleDeg % 360) + 360) % 360
  return Math.abs(a - 180) < 18
}
