import { describe, expect, it } from 'vitest'
import { earthRelativeWeight, fallTimeSeconds, jumpHeightMeters } from './gravityMath'

describe('gravityMath', () => {
  it('keeps mass while weight changes', () => {
    const earth = earthRelativeWeight(30, 'earth')
    const moon = earthRelativeWeight(30, 'moon')
    expect(earth.kgf).toBeCloseTo(30, 0)
    expect(moon.kgf).toBeLessThan(earth.kgf)
  })

  it('falls faster where g is larger', () => {
    expect(fallTimeSeconds(12, 24.79)).toBeLessThan(fallTimeSeconds(12, 9.8))
    expect(fallTimeSeconds(12, 1.62)).toBeGreaterThan(fallTimeSeconds(12, 9.8))
  })

  it('jumps higher where g is smaller', () => {
    expect(jumpHeightMeters(4.2, 1.62)).toBeGreaterThan(jumpHeightMeters(4.2, 9.8))
  })
})
