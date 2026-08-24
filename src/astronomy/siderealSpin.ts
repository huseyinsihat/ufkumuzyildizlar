/** Sidereal spin angle from simulation epoch time. Negative period = retrograde. */
export function siderealAngleRad(simTimeMs: number, rotationPeriodHours: number): number {
  const periodSec = Math.abs(rotationPeriodHours) * 3600
  if (periodSec < 1e-9) return 0
  const sign = rotationPeriodHours < 0 ? -1 : 1
  return sign * ((simTimeMs / 1000) / periodSec) * Math.PI * 2
}
