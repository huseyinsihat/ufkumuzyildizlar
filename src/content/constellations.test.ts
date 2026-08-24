import { describe, expect, it } from 'vitest'
import {
  CONSTELLATIONS,
  findConstellation,
  projectConstellationFigure,
  type Constellation,
} from './constellations'

function hasLine(item: Constellation, a: string, b: string): boolean {
  return item.lines.some(([from, to]) => (from === a && to === b) || (from === b && to === a))
}

describe('constellations', () => {
  it('covers a full-sky educational set with Turkish names', () => {
    expect(CONSTELLATIONS.length).toBeGreaterThanOrEqual(25)
    const ids = CONSTELLATIONS.map((item) => item.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(ids).toEqual(expect.arrayContaining(['ursa-major', 'orion', 'crux', 'leo', 'cygnus']))
    for (const item of CONSTELLATIONS) {
      expect(item.name.trim().length).toBeGreaterThan(0)
      expect(item.description.trim().length).toBeGreaterThan(10)
      expect(item.stars.length).toBeGreaterThanOrEqual(3)
    }
  })

  it('resolves every stick-figure line to a star in the same constellation', () => {
    for (const item of CONSTELLATIONS) {
      const starIds = new Set(item.stars.map((star) => star.id))
      expect(starIds.size).toBe(item.stars.length)
      for (const [fromId, toId] of item.lines) {
        expect(starIds.has(fromId)).toBe(true)
        expect(starIds.has(toId)).toBe(true)
      }
    }
  })

  it('finds a constellation by id', () => {
    expect(findConstellation('ursa-major')?.name).toBe('Büyükayı')
    expect(findConstellation('orion')?.name).toBe('Avcı')
    expect(findConstellation('cassiopeia')?.name).toBe('Kraliçe')
    expect(findConstellation('missing')).toBeUndefined()
    expect(findConstellation(null)).toBeUndefined()
  })

  it('gives every figure classroom fields', () => {
    for (const item of CONSTELLATIONS) {
      expect(item.shape.trim().length).toBeGreaterThan(2)
      expect(item.season.trim().length).toBeGreaterThan(2)
      expect(item.brightest.trim().length).toBeGreaterThan(2)
      expect(item.see.trim().length).toBeGreaterThan(10)
      expect(item.facts.length).toBeGreaterThanOrEqual(2)
    }
  })

  it('draws Pisces as a circlet, cord and northern fish', () => {
    const pisces = findConstellation('pisces')
    expect(pisces).toBeDefined()
    expect(hasLine(pisces!, 'gamma-psc', 'theta-psc')).toBe(true)
    expect(hasLine(pisces!, 'theta-psc', 'iota-psc')).toBe(true)
    expect(hasLine(pisces!, 'iota-psc', 'lambda-psc')).toBe(true)
    expect(hasLine(pisces!, 'lambda-psc', 'kappa-psc')).toBe(true)
    expect(hasLine(pisces!, 'kappa-psc', 'gamma-psc')).toBe(true)
    expect(hasLine(pisces!, 'alrescha', 'o-psc')).toBe(true)
    expect(hasLine(pisces!, 'o-psc', 'eta-psc')).toBe(true)
    expect(hasLine(pisces!, 'eta-psc', 'alrescha')).toBe(true)
  })

  it('closes Auriga on Elnath and draws Andromeda’s galaxy branch', () => {
    const auriga = findConstellation('auriga')
    expect(auriga?.stars.some((star) => star.id === 'elnath-aur')).toBe(true)
    expect(hasLine(auriga!, 'mahasim', 'elnath-aur')).toBe(true)
    expect(hasLine(auriga!, 'elnath-aur', 'hassaleh')).toBe(true)

    const andromeda = findConstellation('andromeda')
    expect(hasLine(andromeda!, 'mirach', 'mu-and')).toBe(true)
    expect(hasLine(andromeda!, 'mu-and', 'nu-and')).toBe(true)
  })

  it('keeps Orion’s belt and Cassiopeia’s W', () => {
    const orion = findConstellation('orion')
    expect(hasLine(orion!, 'mintaka', 'alnilam')).toBe(true)
    expect(hasLine(orion!, 'alnilam', 'alnitak')).toBe(true)
    expect(orion?.stars.some((star) => star.id === 'meissa')).toBe(true)

    const cassiopeia = findConstellation('cassiopeia')
    expect(cassiopeia?.stars).toHaveLength(5)
    expect(cassiopeia?.lines).toHaveLength(4)
  })

  it('projects a finite silhouette inside the viewBox', () => {
    for (const item of CONSTELLATIONS) {
      const figure = projectConstellationFigure(item, 120, 72, 8)
      expect(figure.points.length).toBe(item.stars.length)
      for (const point of figure.points) {
        expect(Number.isFinite(point.x)).toBe(true)
        expect(Number.isFinite(point.y)).toBe(true)
        expect(point.x).toBeGreaterThanOrEqual(0)
        expect(point.y).toBeGreaterThanOrEqual(0)
        expect(point.x).toBeLessThanOrEqual(figure.width)
        expect(point.y).toBeLessThanOrEqual(figure.height)
      }
    }
  })
})
