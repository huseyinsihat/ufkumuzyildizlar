import type { KeplerianElements } from '../types/astronomy'
import type { Vec3 } from '../types/simulation'
import { DEG2RAD } from './astronomyConstants'

export function trueAnomalyFromMean(meanAnomalyRad: number, eccentricity: number): number {
  let E = meanAnomalyRad
  for (let i = 0; i < 12; i += 1) {
    E = meanAnomalyRad + eccentricity * Math.sin(E)
  }
  const sqrtOnePlusE = Math.sqrt(1 + eccentricity)
  const sqrtOneMinusE = Math.sqrt(1 - eccentricity)
  return 2 * Math.atan2(sqrtOnePlusE * Math.sin(E / 2), sqrtOneMinusE * Math.cos(E / 2))
}

export function keplerRadius(semiMajorAxis: number, eccentricity: number, trueAnomalyRad: number): number {
  return (semiMajorAxis * (1 - eccentricity * eccentricity)) / (1 + eccentricity * Math.cos(trueAnomalyRad))
}

/** Ecliptic J2000-style position from Keplerian elements (AU if a is AU). */
export function keplerPosition(elements: KeplerianElements, trueAnomalyRad: number): Vec3 {
  const r = keplerRadius(elements.semiMajorAxisAu, elements.eccentricity, trueAnomalyRad)
  const xOrb = r * Math.cos(trueAnomalyRad)
  const yOrb = r * Math.sin(trueAnomalyRad)

  const i = elements.inclinationDeg * DEG2RAD
  const omega = elements.argumentPeriapsisDeg * DEG2RAD
  const Omega = elements.longitudeAscendingNodeDeg * DEG2RAD

  const cosO = Math.cos(Omega)
  const sinO = Math.sin(Omega)
  const cosI = Math.cos(i)
  const sinI = Math.sin(i)
  const cosW = Math.cos(omega)
  const sinW = Math.sin(omega)

  const x =
    (cosO * cosW - sinO * sinW * cosI) * xOrb + (-cosO * sinW - sinO * cosW * cosI) * yOrb
  const y =
    (sinO * cosW + cosO * sinW * cosI) * xOrb + (-sinO * sinW + cosO * cosW * cosI) * yOrb
  const z = sinW * sinI * xOrb + cosW * sinI * yOrb

  return { x, y, z }
}

export function sampleOrbit(elements: KeplerianElements, samples = 180): Vec3[] {
  const points: Vec3[] = []
  for (let n = 0; n <= samples; n += 1) {
    const nu = (n / samples) * Math.PI * 2
    points.push(keplerPosition(elements, nu))
  }
  return points
}

/** Educational overlay: stretch a small eccentricity so kids can see the ellipse. */
export function visualEccentricity(e: number, exaggerate: boolean): number {
  if (!exaggerate) return Math.max(0, Math.min(0.9, e))
  return Math.min(0.72, e * 2.35 + 0.1)
}

/** Relative orbital speed from the vis-viva shape (perihelion is fastest). */
export function keplerSpeedFactor(eccentricity: number, trueAnomalyRad: number): number {
  const e = Math.max(0, Math.min(0.9, eccentricity))
  return Math.sqrt((1 + e * Math.cos(trueAnomalyRad)) / Math.max(1e-6, 1 - e * e))
}

export function orbitPointFlat(semiMajor: number, eccentricity: number, trueAnomalyRad: number): { x: number; z: number } {
  const r = keplerRadius(semiMajor, eccentricity, trueAnomalyRad)
  return { x: r * Math.cos(trueAnomalyRad), z: r * Math.sin(trueAnomalyRad) }
}

/** Equal mean-anomaly span = equal time. Returns fan points including the focus at the origin. */
export function equalTimeSector(
  semiMajor: number,
  eccentricity: number,
  meanCenterRad: number,
  halfWidthRad: number,
  samples = 18,
): { x: number; z: number }[] {
  const points: { x: number; z: number }[] = [{ x: 0, z: 0 }]
  for (let n = 0; n <= samples; n += 1) {
    const mean = meanCenterRad - halfWidthRad + (n / samples) * halfWidthRad * 2
    const nu = trueAnomalyFromMean(mean, eccentricity)
    points.push(orbitPointFlat(semiMajor, eccentricity, nu))
  }
  return points
}

export function julianDateFromMs(ms: number): number {
  return ms / 86_400_000 + 2_440_587.5
}

export function daysSinceJ2000(ms: number): number {
  return julianDateFromMs(ms) - 2_451_545.0
}
