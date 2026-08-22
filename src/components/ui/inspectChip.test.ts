import { describe, expect, it } from 'vitest'
import { getBody } from '../../astronomy/planetData'
import { atmosphereChip } from '../../components/ui/LeftNav'

describe('classroom inspect atmosphere chip', () => {
  it('keeps a short kid label without dropping the science source', () => {
    expect(atmosphereChip(getBody('sun'))).toBe('Plazma')
    expect(atmosphereChip(getBody('venus'))).toBe('Kalın')
    expect(atmosphereChip(getBody('mercury'))).toBe('Yok')
    expect(atmosphereChip(getBody('mars'))).toBe('İnce')
    expect(atmosphereChip(getBody('earth'))).toBe('Var')
    expect(getBody('venus').atmosphere).toMatch(/karbondioksit/i)
  })
})
