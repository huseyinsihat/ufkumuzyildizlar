import { describe, expect, it } from 'vitest'
import { CRAFT_KIND_LABEL, EARTH_CRAFTS, findEarthCraft } from './earthCrafts'

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
})
