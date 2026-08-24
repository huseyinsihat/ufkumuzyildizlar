import { describe, expect, it } from 'vitest'
import { SIDEREAL_YEAR_DAYS } from './astronomyConstants'
import { keplerMeanMotionRadPerDay } from './keplerMotion'

describe('keplerMeanMotionRadPerDay', () => {
  it('gives Earth about one turn per sidereal year', () => {
    const year = (Math.PI * 2) / keplerMeanMotionRadPerDay(1)
    expect(year).toBeCloseTo(SIDEREAL_YEAR_DAYS, 6)
  })

  it('makes closer rocks faster, matching Ceres’ ~4.6 year belt tour', () => {
    const ceres = keplerMeanMotionRadPerDay(2.77)
    const vesta = keplerMeanMotionRadPerDay(2.36)
    expect(vesta).toBeGreaterThan(ceres)
    const ceresYears = (Math.PI * 2) / ceres / SIDEREAL_YEAR_DAYS
    expect(ceresYears).toBeCloseTo(2.77 ** 1.5, 5)
    expect(ceresYears).toBeGreaterThan(4.5)
    expect(ceresYears).toBeLessThan(4.7)
  })
})
