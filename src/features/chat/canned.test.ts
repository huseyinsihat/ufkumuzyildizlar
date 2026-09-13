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
    expect(CANNED_PROMPTS).toHaveLength(45)
    const questions = new Set(CANNED_PROMPTS.map((item) => item.question.tr))
    expect(questions.size).toBe(45)
    for (const item of CANNED_PROMPTS) {
      expect(item.answers).toHaveLength(3)
      expect(item.question.tr.endsWith('?')).toBe(true)
      expect(item.question.en.endsWith('?')).toBe(true)
      expect(item.answers[0]!.tr.length).toBeGreaterThan(20)
      for (const answer of item.answers) {
        expect(answer.tr.length).toBeGreaterThan(20)
        expect(answer.en.length).toBeGreaterThan(20)
        expect(answer.tr).not.toMatch(/[\u{1F300}-\u{1FAFF}]/u)
        expect(answer.en).not.toMatch(/[\u{1F300}-\u{1FAFF}]/u)
      }
    }
  })

  it('always offers at least two unused chips', () => {
    expect(pickChipCount()).toBe(2)
    const asked = new Set([CANNED_PROMPTS[0]!.question.tr])
    const chips = pickChipQuestions(asked, () => 0.2)
    expect(chips).toHaveLength(2)
    expect(chips.some((item) => item.id === 'sun-yellow')).toBe(false)
  })

  it('keeps two chips cycling after the pool is exhausted', () => {
    const asked = new Set(CANNED_PROMPTS.map((item) => item.question.tr))
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
    expect(matchCanned('en parlak yıldız hangisi')?.id).toBe('brightest-night-star')
    expect(matchCanned('Kutup Yıldızı nedir?')?.id).toBe('polaris')
    expect(matchCanned('süpernova nedir')?.id).toBe('supernova')
    expect(matchCanned('kutup ışığı nasıl oluşur')?.id).toBe('aurora')
    expect(matchCanned('Sirius nedir?')?.id).toBe('brightest-night-star')
  })

  it('matches English canned questions', () => {
    expect(matchCanned('How many planets are there?')?.id).toBe('how-many-planets')
    expect(pickCannedAnswer('How many planets are there?', () => 0, 'en')).toMatch(/8/)
  })

  it('picks different chip pairs for different random seeds', () => {
    const empty = new Set<string>()
    const first = pickChipQuestions(empty, () => 0.12)
      .map((item) => item.id)
      .join(',')
    const second = pickChipQuestions(empty, () => 0.81)
      .map((item) => item.id)
      .join(',')
    expect(first).not.toBe(second)
    expect(first.split(',')).toHaveLength(2)
    expect(second.split(',')).toHaveLength(2)
  })

  it('returns one of the three same-fact answers for a chip', () => {
    const first = pickCannedAnswer('Mars neden kırmızı?', () => 0)
    const last = pickCannedAnswer('Mars neden kırmızı?', () => 0.99)
    const mars = CANNED_PROMPTS.find((item) => item.id === 'mars-red')
    expect(mars?.answers.map((answer) => answer.tr)).toContain(first)
    expect(mars?.answers.map((answer) => answer.tr)).toContain(last)
    expect(first).not.toBe(last)
    expect(pickCannedAnswer('Bilinmeyen soru?')).toBeNull()
  })
})
