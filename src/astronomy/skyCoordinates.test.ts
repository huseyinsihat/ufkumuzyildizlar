import { describe, expect, it } from 'vitest'
import { educationalOrbitRadius } from './visualScale'
import { equatorialToSceneDir, SKY_SPHERE_RADIUS } from './skyCoordinates'

describe('equatorialToSceneDir', () => {
  it('puts Polaris near +Y', () => {
    const dir = equatorialToSceneDir(2.5303, 89.2641)
    expect(dir.y).toBeGreaterThan(0.95)
    expect(Math.hypot(dir.x, dir.z)).toBeLessThan(0.3)
  })

  it('puts Antares in the southern sky', () => {
    const dir = equatorialToSceneDir(16.4901, -26.432)
    expect(dir.y).toBeLessThan(0)
  })

  it('keeps the sky sphere outside educational Pluto', () => {
    expect(SKY_SPHERE_RADIUS).toBeGreaterThan(educationalOrbitRadius(39.5) * 3)
  })
})
