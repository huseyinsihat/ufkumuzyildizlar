import { describe, expect, it } from 'vitest'
import { insightFor } from '../../content/insights'
import { kidCompare } from './kidCompare'

describe('insightFor', () => {
  it('picks closest-vs-hottest for Mercury and Venus', () => {
    expect(insightFor(['mercury', 'venus']).id).toBe('venus-hot')
  })

  it('picks a day-night fact for Earth alone', () => {
    expect(insightFor(['earth']).id).toBe('day-night')
  })
})

describe('kidCompare', () => {
  it('shows long years in years, not huge day counts', () => {
    const rows = kidCompare('uranus', 'mercury')
    const year = rows.find((row) => row.label === 'Bir yıl')
    expect(year?.aText).toContain('yıl')
    expect(year?.bText).toContain('gün')
  })

  it('uses kelvin for temperature bar length so warmer planets look longer', () => {
    const rows = kidCompare('uranus', 'mars')
    const temp = rows.find((row) => row.label === 'Sıcaklık')
    expect(temp?.bValue).toBeGreaterThan(temp?.aValue ?? 0)
    expect(temp?.aText).toContain('°C')
  })
})
