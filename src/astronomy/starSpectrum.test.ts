import { describe, expect, it } from 'vitest'
import { blackbodyRgb, spectralClass, starHex } from './starSpectrum'

describe('starSpectrum', () => {
  it('maps temperature onto OBAFGKM classes', () => {
    expect(spectralClass(32000)).toBe('O')
    expect(spectralClass(12100)).toBe('B')
    expect(spectralClass(9600)).toBe('A')
    expect(spectralClass(7550)).toBe('A')
    expect(spectralClass(7400)).toBe('F')
    expect(spectralClass(5790)).toBe('G')
    expect(spectralClass(4286)).toBe('K')
    expect(spectralClass(3600)).toBe('M')
  })

  it('makes hot stars bluer and cool stars redder', () => {
    const rigel = blackbodyRgb(12100)
    const sun = blackbodyRgb(5772)
    const betelgeuse = blackbodyRgb(3600)
    expect(rigel.b).toBeGreaterThan(rigel.r)
    expect(sun.r).toBeGreaterThan(sun.b)
    expect(betelgeuse.r).toBeGreaterThan(betelgeuse.g)
    expect(betelgeuse.g).toBeGreaterThan(betelgeuse.b)
  })

  it('prints educational hex from temperature', () => {
    expect(starHex(5772)).toMatch(/^#[0-9a-f]{6}$/)
    expect(starHex(3600)).not.toBe(starHex(12100))
  })
})
