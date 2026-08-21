import { describe, expect, it } from 'vitest'
import { compressDistance, educationalOrbitRadius, visualRadius } from './visualScale'

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

  it('makes proportional planets much smaller than educational ones', () => {
    expect(visualRadius('earth', 'proportional')).toBeLessThan(visualRadius('earth', 'educational') / 10)
  })

  it('does not mix raw AU into educational scene units', () => {
    expect(compressDistance(1, 'educational')).not.toBe(1)
  })
})
