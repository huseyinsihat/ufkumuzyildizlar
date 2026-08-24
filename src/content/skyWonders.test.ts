import { describe, expect, it } from 'vitest'
import { findWonder, starDisplayName, starsAlphabetical } from './skyWonders'

describe('skyWonders', () => {
  it('finds notable stars and named rocks', () => {
    expect(findWonder('vega')?.tag).toBe('Yaz üçgeni')
    expect(findWonder('altair')?.kind).toBe('star')
    expect(findWonder('proxima')?.tag).toBe('En yakın')
    expect(findWonder('ceres')?.kind).toBe('rock')
    expect(findWonder('missing')).toBeUndefined()
    expect(findWonder('capella')?.kind).toBe('star')
    expect(findWonder('pleiades')?.kind).toBe('cluster')
    expect(findWonder('m42')?.kind).toBe('nebula')
    expect(findWonder('alphacen')?.tag).toBe('Komşu güneş')
    expect(findWonder('sirius')).toMatchObject({ tempK: 9940 })
    expect(findWonder('betelgeuse')).toMatchObject({ tempK: 3600 })
  })

  it('puts well-known Turkish names in parentheses and sorts the star list alphabetically', () => {
    expect(starDisplayName({ name: 'Kutup Yıldızı', nickname: 'Kutup' })).toBe('Kutup Yıldızı (Kutup)')
    expect(starDisplayName({ name: 'Sirius', nickname: 'Akyıldız' })).toBe('Sirius (Akyıldız)')
    expect(starDisplayName({ name: 'Rigel' })).toBe('Rigel')
    expect(findWonder('polaris')).toMatchObject({ name: 'Kutup Yıldızı', nickname: 'Kutup' })
    const names = starsAlphabetical().map((star) => starDisplayName(star))
    expect(names[0]).toBe('Aldebaran (Boğa)')
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b, 'tr', { sensitivity: 'base' })))
    expect(names.indexOf('Kutup Yıldızı (Kutup)')).toBeGreaterThan(names.indexOf('Capella (Keçi)'))
  })
})
