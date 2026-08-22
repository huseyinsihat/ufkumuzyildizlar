import { describe, expect, it } from 'vitest'
import { FACT_STAGES, FACTS, insightFor } from '../../content/insights'
import { kidCompare } from './kidCompare'

describe('insightFor', () => {
  it('picks closest-vs-hottest for Mercury and Venus', () => {
    expect(insightFor(['mercury', 'venus']).id).toBe('venus-hot')
  })

  it('picks a day-night fact for Earth alone', () => {
    expect(insightFor(['earth']).id).toBe('day-night')
  })
})

describe('FACTS', () => {
  it('has three stages and go-to targets', () => {
    expect(new Set(FACTS.map((item) => item.stage)).size).toBe(3)
    expect(FACTS.length).toBeGreaterThanOrEqual(30)
    expect(FACT_STAGES.map((item) => item.id).sort().join()).toBe('earth,planets,stars')
    expect(FACTS.every((item) => item.bodyId || item.wonderId)).toBe(true)
    expect(FACTS.every((item) => item.title && item.text)).toBe(true)
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

  it('shows gravity as Earth multiples, not m/s²', () => {
    const rows = kidCompare('moon', 'earth')
    const gravity = rows.find((row) => row.label === 'Yerçekimi')
    expect(gravity?.aText).toContain('× Dünya')
    expect(gravity?.bText).toBe('1 × Dünya')
    expect(gravity?.aText).not.toContain('m/s')
  })
})
