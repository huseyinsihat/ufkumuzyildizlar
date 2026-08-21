import { describe, expect, it } from 'vitest'
import { compressDistance, educationalOrbitRadius, normalizeScaleMode, visualRadius } from './visualScale'

describe('visualScale', () => {
  it('keeps planet order in educational orbits', () => {
    const mercury = educationalOrbitRadius(0.387)
    const earth = educationalOrbitRadius(1)
    const mars = educationalOrbitRadius(1.524)
    const jupiter = educationalOrbitRadius(5.203)
    expect(mercury).toBeLessThan(earth)
    expect(earth).toBeLessThan(mars)
    expect(mars).toBeLessThan(jupiter)
  })

  it('makes true-scale planets much smaller than educational ones', () => {
    expect(visualRadius('earth', 'trueScale')).toBeLessThan(visualRadius('earth', 'educational') / 10)
  })

  it('does not mix raw AU into educational scene units', () => {
    expect(compressDistance(1, 'educational')).not.toBe(1)
  })

  it('maps old scale names onto the two real modes', () => {
    expect(normalizeScaleMode('proportional')).toBe('trueScale')
    expect(normalizeScaleMode('astronomical')).toBe('trueScale')
    expect(normalizeScaleMode('educational')).toBe('educational')
  })
})
