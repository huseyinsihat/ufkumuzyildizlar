import { describe, expect, it } from 'vitest'
import {
  compressDistance,
  educationalOrbitRadius,
  normalizeScaleMode,
  visualMoonOrbitRadius,
  visualRadius,
  visualSatelliteOrbitRadius,
} from './visualScale'

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

  it('shrinks the Moon orbit in true-scale mode', () => {
    expect(visualMoonOrbitRadius('trueScale')).toBeLessThan(visualMoonOrbitRadius('educational') / 20)
  })

  it('keeps rocky planets larger than before while ordered by real size', () => {
    expect(visualRadius('mercury', 'educational')).toBeGreaterThan(1)
    expect(visualRadius('mercury', 'educational')).toBeLessThan(visualRadius('venus', 'educational'))
    expect(visualRadius('venus', 'educational')).toBeLessThan(visualRadius('earth', 'educational'))
    expect(visualRadius('mars', 'educational')).toBeLessThan(visualRadius('earth', 'educational'))
    expect(visualRadius('jupiter', 'educational')).toBeGreaterThan(visualRadius('saturn', 'educational'))
  })

  it('keeps the Sun disk inside Mercury’s educational orbit', () => {
    const gap =
      educationalOrbitRadius(0.387) - visualRadius('sun', 'educational') - visualRadius('mercury', 'educational')
    expect(gap).toBeGreaterThan(4)
  })

  it('packs Galilean orbits outside Jupiter without stacking', () => {
    const io = visualSatelliteOrbitRadius('io', 'educational')
    const europa = visualSatelliteOrbitRadius('europa', 'educational')
    const ganymede = visualSatelliteOrbitRadius('ganymede', 'educational')
    const callisto = visualSatelliteOrbitRadius('callisto', 'educational')
    expect(io).toBeGreaterThan(visualRadius('jupiter', 'educational'))
    expect(io).toBeLessThan(europa)
    expect(europa).toBeLessThan(ganymede)
    expect(ganymede).toBeLessThan(callisto)
    expect(visualSatelliteOrbitRadius('titan', 'educational')).toBeGreaterThan(visualRadius('saturn', 'educational') * 2.28)
  })
})
