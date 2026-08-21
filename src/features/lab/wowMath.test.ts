import { describe, expect, it } from 'vitest'
import { cometTailAwayFromSun, lightTravelLabel, LIGHT_TRAVEL_SEC, mercuryDayProgress } from './wowMath'

describe('wowMath', () => {
  it('keeps Earth light travel near eight minutes', () => {
    expect(LIGHT_TRAVEL_SEC.earth).toBeGreaterThan(480)
    expect(LIGHT_TRAVEL_SEC.earth).toBeLessThan(520)
    expect(lightTravelLabel('earth')).toContain('dk')
  })

  it('fills Mercury year before a solar day', () => {
    const mid = mercuryDayProgress(1)
    expect(mid.year).toBe(1)
    expect(mid.day).toBeCloseTo(0.5)
    expect(mercuryDayProgress(2).day).toBe(1)
  })

  it('points the comet tail away from the Sun', () => {
    const tail = cometTailAwayFromSun({ x: 0, y: 0, z: 0 }, { x: 10, y: 0, z: 0 })
    expect(tail.x).toBeGreaterThan(0.9)
    expect(tail.y).toBeCloseTo(0)
  })
})
