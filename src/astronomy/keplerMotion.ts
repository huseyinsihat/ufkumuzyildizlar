import { SIDEREAL_YEAR_DAYS } from './astronomyConstants'

/** Mean motion (rad / day) from Kepler’s third law: P² ∝ a³, P in sidereal years. */
export function keplerMeanMotionRadPerDay(au: number): number {
  const a = Math.max(au, 1e-6)
  return (Math.PI * 2) / (SIDEREAL_YEAR_DAYS * a ** 1.5)
}
