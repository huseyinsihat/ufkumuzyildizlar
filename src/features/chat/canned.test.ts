import { describe, expect, it } from 'vitest'
import {
  CANNED_PROMPTS,
  matchCanned,
  pickCannedAnswer,
  pickChipCount,
  pickChipQuestions,
} from './canned'

describe('canned sun questions', () => {
  it('keeps a kid question pool with three answers each', () => {
    expect(CANNED_PROMPTS).toHaveLength(35)
    const questions = new Set(CANNED_PROMPTS.map((item) => item.question))
    expect(questions.size).toBe(35)
    for (const item of CANNED_PROMPTS) {
      expect(item.answers).toHaveLength(3)
      expect(item.question.endsWith('?')).toBe(true)
      for (const answer of item.answers) {
        expect(answer.length).toBeGreaterThan(20)
        expect(answer).not.toMatch(/[\u{1F300}-\u{1FAFF}]/u)
      }
    }
  })

  it('always offers at least two unused chips', () => {
    expect(pickChipCount()).toBe(2)
    const asked = new Set([CANNED_PROMPTS[0]!.question])
    const chips = pickChipQuestions(asked, () => 0.2)
    expect(chips).toHaveLength(2)
    expect(chips.some((item) => item.id === 'sun-yellow')).toBe(false)
  })

  it('keeps two chips cycling after the pool is exhausted', () => {
    const asked = new Set(CANNED_PROMPTS.map((item) => item.question))
    const chips = pickChipQuestions(asked, () => 0.35)
    expect(chips).toHaveLength(2)
    expect(new Set(chips.map((item) => item.id)).size).toBe(2)
  })

  it('matches kid phrasing like kaç yıldız vardı', () => {
    expect(matchCanned('kaç yıldız vardı')?.id).toBe('how-many-stars')
    expect(pickCannedAnswer('Kaç gezegen var?', () => 0)).toContain('8')
    expect(matchCanned('güneş e en uzak gezegen')?.id).toBe('farthest-planet')
    expect(matchCanned('samanyolunda kaç gezegen vardır')?.id).toBe('milky-way-planets')
    expect(pickCannedAnswer('samanyolunda kaç gezegen vardır', () => 0)).toContain('milyar')
    expect(matchCanned('ISS nedir?')?.id).toBe('iss')
    expect(matchCanned('Alper Gezeravcı kimdir?')?.id).toBe('alper-gezeravci')
    expect(matchCanned('türksat 6a')?.id).toBe('turksat')
  })

  it('returns one of the three same-fact answers for a chip', () => {
    const first = pickCannedAnswer('Mars neden kırmızı?', () => 0)
    const last = pickCannedAnswer('Mars neden kırmızı?', () => 0.99)
    const mars = CANNED_PROMPTS.find((item) => item.id === 'mars-red')
    expect(mars?.answers).toContain(first)
    expect(mars?.answers).toContain(last)
    expect(first).not.toBe(last)
    expect(pickCannedAnswer('Bilinmeyen soru?')).toBeNull()
  })
})
