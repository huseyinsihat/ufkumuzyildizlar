import { describe, expect, it } from 'vitest'
import { auToScene } from './visualScale'
import { getHeliocentricEclipticAu, sampleHeliocentricOrbitAu } from './coordinateSystems'

describe('sampleHeliocentricOrbitAu', () => {
  it('starts on the planet’s current ephemeris point', () => {
    const date = new Date('2026-08-24T12:00:00Z')
    const now = getHeliocentricEclipticAu('earth', date)
    const samples = sampleHeliocentricOrbitAu('earth', date, 48)
    expect(samples[0]?.x).toBeCloseTo(now.x, 8)
    expect(samples[0]?.y).toBeCloseTo(now.y, 8)
    expect(samples[0]?.z).toBeCloseTo(now.z, 8)
    const sceneNow = auToScene(now, 'educational')
    const sceneFirst = auToScene(samples[0]!, 'educational')
    expect(sceneFirst.x).toBeCloseTo(sceneNow.x, 6)
    expect(sceneFirst.y).toBeCloseTo(sceneNow.y, 6)
  })
})
