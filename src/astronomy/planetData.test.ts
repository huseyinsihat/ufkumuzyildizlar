import { describe, expect, it } from 'vitest'
import { compareBodies } from '../features/comparison/compareBodies'
import { comparePairFor } from '../features/comparison/pair'
import { getBody } from './planetData'

describe('planetData', () => {
  it('uses NASA-scale Earth values', () => {
    const earth = getBody('earth')
    expect(earth.radiusKm).toBe(6371)
    expect(earth.axialTiltDeg).toBeCloseTo(23.44)
    expect(earth.moons).toBe(1)
  })
})

describe('comparison', () => {
  it('compares Earth and Mars with expected rows', () => {
    const rows = compareBodies('earth', 'mars')
    expect(rows.some((row) => row.label === 'Yerçekimi')).toBe(true)
    expect(rows[0]?.a).not.toBe(rows[0]?.b)
  })

  it('puts the selected body first with a classroom pair', () => {
    expect(comparePairFor('jupiter')).toEqual({ a: 'jupiter', b: 'saturn' })
    expect(comparePairFor('mars')).toEqual({ a: 'mars', b: 'earth' })
    expect(comparePairFor('earth')).toEqual({ a: 'earth', b: 'mars' })
    expect(comparePairFor(null)).toEqual({ a: 'earth', b: 'mars' })
  })
})
