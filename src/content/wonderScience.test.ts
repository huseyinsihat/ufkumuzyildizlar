import { describe, expect, it } from 'vitest'
import { findWonder, isNotableStar, NOTABLE_STARS } from './skyWonders'
import {
  formatLightYears,
  formatSkyDrift,
  starScienceLine,
  wonderDetailStats,
  wonderPreviewStats,
} from './wonderScience'

describe('wonderScience', () => {
  it('gives Barnard’s Star a measured distance and the fastest sky drift', () => {
    const barnard = findWonder('barnard')
    expect(barnard).toBeDefined()
    expect(isNotableStar(barnard!)).toBe(true)
    if (!isNotableStar(barnard!)) return
    expect(barnard.distLy).toBeCloseTo(5.96, 2)
    expect(barnard.pmArcsecYr).toBeCloseTo(10.3, 1)
    expect(barnard.spectral).toBe('M4 V')
    const preview = wonderPreviewStats(barnard)
    expect(preview.map((row) => row.label)).toEqual(['Tür', 'Özellik', 'Uzaklık', 'Gökyüzünde kayış'])
    expect(preview.find((row) => row.label === 'Uzaklık')?.value).toBe('5,96 ışık yılı')
    expect(preview.find((row) => row.label === 'Gökyüzünde kayış')?.value).toBe('10,3 ″/yıl')
    expect(barnard.facts.length).toBeGreaterThanOrEqual(3)
    expect(starScienceLine(barnard)).toContain('5,96 ışık yılı')
  })

  it('keeps slow stars’ drift for the detailed panel only', () => {
    const polaris = findWonder('polaris')
    expect(isNotableStar(polaris!)).toBe(true)
    if (!isNotableStar(polaris!)) return
    expect(wonderPreviewStats(polaris).some((row) => row.label === 'Gökyüzünde kayış')).toBe(false)
    expect(wonderDetailStats(polaris).some((row) => row.label === 'Gökyüzünde kayış')).toBe(true)
  })

  it('gives every notable sky object a distance and classroom facts', () => {
    for (const star of NOTABLE_STARS) {
      expect(star.distLy).toBeGreaterThan(0)
      expect(star.facts.length).toBeGreaterThanOrEqual(3)
    }
    expect(formatLightYears(12_900_000_000)).toBe('12,9 milyar ışık yılı')
    expect(formatSkyDrift(0.35)).toBe('0,35 ″/yıl')
  })
})
