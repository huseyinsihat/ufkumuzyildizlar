import { describe, expect, it } from 'vitest'
import { EDU_RADIUS } from '../astronomy/visualScale'
import { photosphereKey, STAR_LABEL_LOCAL_Y, starCoreRadius, starGlowRadius, starHasSpikes, starLook } from './starVisual'

describe('starVisual', () => {
  it('anchors educational cores to the Sun so giants read larger than Sirius', () => {
    const sun = EDU_RADIUS.sun
    const vycma = starCoreRadius(1420, 6.5)
    const betelgeuse = starCoreRadius(764, 0.42)
    const rigel = starCoreRadius(78.9, 0.13)
    const sirius = starCoreRadius(1.71, -1.46)
    const proxima = starCoreRadius(0.154, 11.13)
    expect(starCoreRadius(1, 4.8)).toBeCloseTo(sun, 5)
    expect(sirius).toBeGreaterThan(sun)
    expect(rigel).toBeGreaterThan(sirius)
    expect(betelgeuse).toBeGreaterThan(rigel)
    expect(vycma).toBeGreaterThan(betelgeuse)
    expect(proxima).toBe(3.4)
    expect(vycma).toBeLessThanOrEqual(28)
  })

  it('gives bright stars extra educational glow even when they are not the largest', () => {
    expect(starGlowRadius(1.71, -1.46)).toBeGreaterThan(starGlowRadius(1.71, 2))
    expect(starGlowRadius(18, 1.6, 'cluster')).toBeGreaterThan(starGlowRadius(18, 1.6, 'star'))
    expect(starGlowRadius(40, 4, 'nebula')).toBeGreaterThan(starGlowRadius(40, 4, 'star'))
  })

  it('adds diffraction spikes only to the brightest stars', () => {
    expect(starHasSpikes(-1.46)).toBe(true)
    expect(starHasSpikes(-0.74)).toBe(true)
    expect(starHasSpikes(0.03)).toBe(false)
    expect(starHasSpikes(-0.3, 'cluster')).toBe(false)
  })

  it('keeps extremely distant targets small despite huge physical size', () => {
    expect(starCoreRadius(50, 27)).toBeLessThan(starCoreRadius(25, -0.05))
  })

  it('shrinks true-scale cores and lets magnitude drive glow', () => {
    const siriusCore = starCoreRadius(1.71, -1.46, 'trueScale')
    const betelgeuseCore = starCoreRadius(764, 0.42, 'trueScale')
    const proximaCore = starCoreRadius(0.154, 11.13, 'trueScale')
    expect(siriusCore).toBeLessThan(2.4)
    expect(betelgeuseCore).toBeLessThanOrEqual(2.4)
    expect(proximaCore).toBeGreaterThanOrEqual(0.5)
    expect(proximaCore).toBeLessThan(siriusCore)
    expect(starGlowRadius(1.71, -1.46, 'star', 'trueScale')).toBeGreaterThan(
      starGlowRadius(0.154, 11.13, 'star', 'trueScale'),
    )
    expect(starGlowRadius(78.9, 0.13, 'star', 'trueScale')).toBeGreaterThan(
      starGlowRadius(0.154, 11.13, 'star', 'trueScale'),
    )
  })

  it('gives cool giants more granulation and a wider atmosphere than hot dwarfs', () => {
    const betelgeuse = starLook(3600, 764, 0.42)
    const sirius = starLook(9940, 1.71, -1.46)
    expect(betelgeuse.granulation).toBeGreaterThan(sirius.granulation)
    expect(betelgeuse.chromosphereScale).toBeGreaterThan(sirius.chromosphereScale)
    expect(photosphereKey(3600, 764)).toBe('Mg')
    expect(photosphereKey(9940, 1.71)).toBe('A')
  })

  it('keeps star name tags just above the unit core so zoom does not fling them off-screen', () => {
    expect(STAR_LABEL_LOCAL_Y).toBeGreaterThan(1)
    expect(STAR_LABEL_LOCAL_Y).toBeLessThan(1.5)
  })
})
