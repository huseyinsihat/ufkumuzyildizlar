import { describe, expect, it } from 'vitest'
import {
  CANNED_PROMPTS,
  pickCannedAnswer,
  pickChipCount,
  pickChipQuestions,
} from './canned'

describe('canned sun questions', () => {
  it('keeps a pool of thirty kid questions with three answers each', () => {
    expect(CANNED_PROMPTS).toHaveLength(30)
    const questions = new Set(CANNED_PROMPTS.map((item) => item.question))
    expect(questions.size).toBe(30)
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
