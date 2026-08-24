import { describe, expect, it } from 'vitest'
import { compareBodies } from '../features/comparison/compareBodies'
import { comparePairFor } from '../features/comparison/pair'
import { bodiesInFamilyOrder, compareOptionLabel, getBody, getMoonsOf } from './planetData'

describe('planetData', () => {
  it('uses NASA-scale Earth values', () => {
    const earth = getBody('earth')
    expect(earth.radiusKm).toBe(6371)
    expect(earth.axialTiltDeg).toBeCloseTo(23.44)
    expect(earth.moons).toBe(1)
  })

  it('lists the classroom moons around Earth, Mars, Jupiter and Saturn', () => {
    expect(getMoonsOf('earth').map((item) => item.id)).toEqual(['moon'])
    expect(getMoonsOf('mars').map((item) => item.id)).toEqual(['phobos', 'deimos'])
    expect(getMoonsOf('jupiter').map((item) => item.id)).toEqual(['io', 'europa', 'ganymede', 'callisto'])
    expect(getMoonsOf('saturn').map((item) => item.id)).toEqual(['titan'])
  })

  it('nests moons under their planets for the compare picker', () => {
    expect(bodiesInFamilyOrder().map((item) => item.id)).toEqual([
      'sun',
      'mercury',
      'venus',
      'earth',
      'moon',
      'mars',
      'phobos',
      'deimos',
      'jupiter',
      'io',
      'europa',
      'ganymede',
      'callisto',
      'saturn',
      'titan',
      'uranus',
      'neptune',
      'pluto',
    ])
    expect(compareOptionLabel(getBody('earth'))).toBe('Dünya')
    expect(compareOptionLabel(getBody('moon'))).toBe('- Ay')
    expect(compareOptionLabel(getBody('phobos'))).toBe('- Phobos')
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
    expect(comparePairFor('io')).toEqual({ a: 'io', b: 'jupiter' })
    expect(comparePairFor('titan')).toEqual({ a: 'titan', b: 'saturn' })
    expect(comparePairFor('phobos')).toEqual({ a: 'phobos', b: 'mars' })
  })
})
