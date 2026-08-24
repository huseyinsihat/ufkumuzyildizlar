import { describe, expect, it } from 'vitest'
import {
  cappedVisualEccentricity,
  equalTimeSector,
  keplerRadius,
  keplerSpeedFactor,
  sampleOrbit,
  trueAnomalyFromMean,
  visualEccentricity,
} from './orbitalCalculations'
import { educationalOrbitRadius, visualRadius } from './visualScale'

describe('orbitalCalculations', () => {
  it('returns periapsis at true anomaly 0', () => {
    expect(keplerRadius(1, 0.2, 0)).toBeCloseTo(0.8)
  })

  it('solves circular orbits as identity', () => {
    expect(trueAnomalyFromMean(1.2, 0)).toBeCloseTo(1.2)
  })

  it('samples a closed orbit', () => {
    const points = sampleOrbit(
      {
        semiMajorAxisAu: 1,
        eccentricity: 0.0167,
        inclinationDeg: 0,
        longitudeAscendingNodeDeg: 0,
        argumentPeriapsisDeg: 0,
      },
      36,
    )
    expect(points.length).toBe(37)
    expect(points[0]?.x).toBeCloseTo(points[36]?.x ?? 0, 8)
  })

  it('exaggerates small eccentricity for kids', () => {
    expect(visualEccentricity(0.2056, true)).toBeGreaterThan(0.4)
    expect(visualEccentricity(0.2056, false)).toBeCloseTo(0.2056)
  })

  it('is faster at perihelion than aphelion', () => {
    expect(keplerSpeedFactor(0.5, 0)).toBeGreaterThan(keplerSpeedFactor(0.5, Math.PI))
  })

  it('builds equal-time fans from the focus', () => {
    const near = equalTimeSector(20, 0.5, 0, 0.4, 8)
    const far = equalTimeSector(20, 0.5, Math.PI, 0.4, 8)
    expect(near[0]).toEqual({ x: 0, z: 0 })
    expect(far.length).toBe(near.length)
    const nearSpan = Math.hypot(near[1]!.x - near.at(-1)!.x, near[1]!.z - near.at(-1)!.z)
    const farSpan = Math.hypot(far[1]!.x - far.at(-1)!.x, far[1]!.z - far.at(-1)!.z)
    expect(nearSpan).toBeGreaterThan(farSpan)
  })

  it('starts equal-time fans on the sun surface when given an inner radius', () => {
    const inner = 8.4
    const near = equalTimeSector(20, 0.5, 0, 0.4, 8, inner)
    expect(Math.hypot(near[0]!.x, near[0]!.z)).toBeCloseTo(inner)
  })

  it('keeps educational mercury perihelion outside the sun', () => {
    const a = educationalOrbitRadius(0.387)
    const minRadius = visualRadius('sun', 'educational') + visualRadius('mercury', 'educational') + 2
    const e = cappedVisualEccentricity(a, 0.2056, minRadius, true)
    const perihelion = a * (1 - e)
    expect(perihelion).toBeGreaterThanOrEqual(minRadius)
    expect(e).toBeLessThan(visualEccentricity(0.2056, true))
    expect(e).toBeLessThanOrEqual(1 - minRadius / a)
  })
})
