import { describe, expect, it } from 'vitest'
import { siderealAngleRad } from './siderealSpin'

describe('siderealAngleRad', () => {
  it('completes one turn after one rotation period', () => {
    const hours = 24
    const periodMs = hours * 3600 * 1000
    expect(siderealAngleRad(periodMs, hours)).toBeCloseTo(Math.PI * 2, 8)
  })

  it('spins backward when the period is negative', () => {
    expect(siderealAngleRad(3600_000, -1)).toBeCloseTo(-Math.PI * 2, 8)
  })
})
