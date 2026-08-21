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

export function julianDateFromMs(ms: number): number {
  return ms / 86_400_000 + 2_440_587.5
}

export function daysSinceJ2000(ms: number): number {
  return julianDateFromMs(ms) - 2_451_545.0
}
