import { describe, expect, it } from 'vitest'
import {
  CRAFT_KIND_LABEL,
  EARTH_CRAFT_RINGS,
  EARTH_CRAFTS,
  earthCraftLocalPosition,
  findEarthCraft,
} from './earthCrafts'

describe('earth crafts', () => {
  it('keeps four clickable Earth-orbit crafts with classroom facts', () => {
    expect(EARTH_CRAFTS).toHaveLength(4)
    const ids = EARTH_CRAFTS.map((item) => item.id)
    expect(new Set(ids).size).toBe(4)
    expect(ids).toEqual(expect.arrayContaining(['iss', 'crew-dragon', 'turksat-6a', 'turksat-5b']))
    for (const craft of EARTH_CRAFTS) {
      expect(craft.fact.length).toBeGreaterThan(24)
      expect(craft.facts).toHaveLength(3)
      expect(CRAFT_KIND_LABEL[craft.kind]).toBeTruthy()
    }
    expect(findEarthCraft('crew-dragon')?.name).toBe('Crew Dragon')
    expect(findEarthCraft('turksat-6a')?.tag).toContain('Türkiye')
  })

  it('places ISS and Türksat on the drawn classroom rings', () => {
    const iss = findEarthCraft('iss')
    const dragon = findEarthCraft('crew-dragon')
    const geoA = findEarthCraft('turksat-6a')
    const geoB = findEarthCraft('turksat-5b')
    expect(iss?.orbit).toBe(EARTH_CRAFT_RINGS.leo.orbit)
    expect(iss?.tilt).toBe(EARTH_CRAFT_RINGS.leo.tilt)
    expect(dragon?.orbit).toBe(EARTH_CRAFT_RINGS.leo.orbit)
    expect(geoA?.orbit).toBe(EARTH_CRAFT_RINGS.geo.orbit)
    expect(geoB?.tilt).toBe(EARTH_CRAFT_RINGS.geo.tilt)
    const ring = earthCraftLocalPosition(EARTH_CRAFT_RINGS.leo.orbit, EARTH_CRAFT_RINGS.leo.tilt, 0.4, 1.52)
    const craft = earthCraftLocalPosition(iss!.orbit, iss!.tilt, 0.4, 1.52)
    expect(craft.x).toBeCloseTo(ring.x)
    expect(craft.y).toBeCloseTo(ring.y)
    expect(craft.z).toBeCloseTo(ring.z)
  })
})
