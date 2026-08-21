import { describe, expect, it } from 'vitest'
import { keplerRadius, sampleOrbit, trueAnomalyFromMean } from './orbitalCalculations'

describe('orbitalCalculations', () => {
  it('returns periapsis at true anomaly 0', () => {
    expect(keplerRadius(1, 0.2, 0)).toBeCloseTo(0.8)
  })

  it('solves circular orbits as identity', () => {
    expect(trueAnomalyFromMean(1.2, 0)).toBeCloseTo(1.2)
  })

  it('samples a closed orbit', () => {
    const points = sampleOrbit({
      semiMajorAxisAu: 1,
      eccentricity: 0.0167,
      inclinationDeg: 0,
      longitudeAscendingNodeDeg: 0,
      argumentPeriapsisDeg: 0,
    }, 36)
    expect(points.length).toBe(37)
    expect(points[0]?.x).toBeCloseTo(points[36]?.x ?? 0, 8)
  })
})
