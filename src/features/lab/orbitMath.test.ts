import { describe, expect, it } from 'vitest'
import { earthYearTours, isFullMoon, moonPhaseName, wrapDelta } from './orbitMath'
import { fallTimeSeconds, jumpHeightMeters, weightNewtons } from './gravityMath'

describe('orbitMath', () => {
  it('counts more Mercury tours than Earth in one Earth year', () => {
    const tours = earthYearTours()
    const mercury = tours.find((row) => row.id === 'mercury')?.tours ?? 0
    const earth = tours.find((row) => row.id === 'earth')?.tours ?? 0
    const jupiter = tours.find((row) => row.id === 'jupiter')?.tours ?? 0
    expect(mercury).toBeGreaterThan(3)
    expect(earth).toBeCloseTo(1, 5)
    expect(jupiter).toBeLessThan(0.2)
  })

  it('detects full moon near 180 degrees', () => {
    expect(isFullMoon(180)).toBe(true)
    expect(isFullMoon(350)).toBe(false)
    expect(moonPhaseName(185)).toBe('Dolunay')
    expect(isFullMoon(10)).toBe(false)
    expect(moonPhaseName(180)).toBe('Dolunay')
  })

  it('wraps angle deltas across the branch cut', () => {
    expect(wrapDelta(3, -3)).toBeCloseTo(-6 + Math.PI * 2, 8)
  })
})

describe('gravityMath', () => {
  it('keeps mass out of weight formula except as m*g', () => {
    expect(weightNewtons(30, 9.8)).toBeCloseTo(294)
  })

  it('makes the Moon slower to fall and higher to jump', () => {
    expect(fallTimeSeconds(10, 1.62)).toBeGreaterThan(fallTimeSeconds(10, 9.8))
    expect(jumpHeightMeters(4, 1.62)).toBeGreaterThan(jumpHeightMeters(4, 9.8))
  })
})
