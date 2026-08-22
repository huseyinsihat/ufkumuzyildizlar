import { describe, expect, it } from 'vitest'
import { requestMessages, toApiMessages, trimTurns, visibleMessages, type StoredChatMessage } from './messages'
import { extractAssistantContent, cleanAssistantReply, friendlyChatError, OPENROUTER_MODEL, openRouterChatUrl, passReasoningDetails } from './openRouter'
import { buildSceneSummary, CANNED_PROMPTS, systemPrompt, WELCOME_TEXT } from './prompt'

function msg(
  role: StoredChatMessage['role'],
  content: string,
  extra?: Partial<StoredChatMessage>,
): StoredChatMessage {
  return { id: content, role, content, ...extra }
}

describe('sun chat prompt', () => {
  it('grounds the mascot in Minik Dahiler and TEKNOFEST 2026', () => {
    const text = systemPrompt()
    expect(text).toContain('Minik Dahiler')
    expect(text).toContain('TEKNOFEST 2026')
    expect(text).toContain('Güneş')
    expect(text).toContain('Soruyu tekrar yazma')
    expect(text).toContain('2 ile 4 kısa cümle')
    expect(text).not.toMatch(/[\u{1F300}-\u{1FAFF}]/u)
  })

  it('keeps the welcome in plain Turkish without emoji', () => {
    expect(WELCOME_TEXT).toContain('Minik Dahiler')
    expect(WELCOME_TEXT).toContain('TEKNOFEST 2026')
    expect(WELCOME_TEXT).not.toMatch(/[\u{1F300}-\u{1FAFF}]/u)
  })

  it('summarizes the selected body with NASA facts from planet data', () => {
    const summary = buildSceneSummary({ bodyId: 'mars', wonderId: null, scaleMode: 'educational' })
    expect(summary).toContain('Mars')
    expect(summary).toContain('Kırmızı')
    expect(summary).toContain('eğitim ölçeği')
  })

  it('mentions a marked sky wonder when present', () => {
    const summary = buildSceneSummary({ bodyId: null, wonderId: 'sirius', scaleMode: 'trueScale' })
    expect(summary).toContain('Sirius')
    expect(summary).toContain('gerçek ölçek')
  })

  it('offers a thirty-question canned pool for chips', () => {
    expect(CANNED_PROMPTS).toHaveLength(30)
  })
})

describe('sun chat history', () => {
  it('hides reasoning_details from the visible transcript', () => {
    const hidden = { type: 'reasoning.encrypted', data: 'secret' }
    const shown = visibleMessages([
      msg('user', 'Mars neden kırmızı?'),
      msg('assistant', 'Yüzeyinde pas vardır.', { reasoning_details: hidden }),
    ])
    expect(shown).toEqual([
      { id: 'Mars neden kırmızı?', role: 'user', content: 'Mars neden kırmızı?' },
      { id: 'Yüzeyinde pas vardır.', role: 'assistant', content: 'Yüzeyinde pas vardır.' },
    ])
    expect(JSON.stringify(shown)).not.toContain('secret')
    expect(JSON.stringify(shown)).not.toContain('reasoning')
  })

  it('passes reasoning_details back unmodified on the next request', () => {
    const details = [{ type: 'reasoning.encrypted', id: 'r1', data: 'opaque' }]
    const api = toApiMessages([
      msg('user', 'Kaç tane r var?'),
      msg('assistant', 'Üç tane r var.', { reasoning_details: details }),
      msg('user', 'Emin misin?'),
    ])
    expect(api[1]?.reasoning_details).toBe(details)
    expect(passReasoningDetails(details)).toBe(details)
  })

  it('drops the local welcome from the API payload', () => {
    const api = toApiMessages([
      msg('assistant', WELCOME_TEXT, { local: true }),
      msg('user', 'Neden sarı görünüyorsun?'),
    ])
    expect(api).toEqual([{ role: 'user', content: 'Neden sarı görünüyorsun?' }])
  })

  it('keeps only the last eight turns', () => {
    const history: StoredChatMessage[] = []
    for (let i = 1; i <= 10; i += 1) {
      history.push(msg('user', `u${i}`), msg('assistant', `a${i}`))
    }
    const kept = trimTurns(history)
    expect(kept[0]?.content).toBe('u3')
    expect(kept.at(-1)?.content).toBe('a10')
    expect(kept).toHaveLength(16)
  })

  it('puts system prompt and scene summary in one system message', () => {
    const packed = requestMessages('sistem', 'sahne', [msg('user', 'Merhaba')])
    expect(packed[0]).toEqual({ role: 'system', content: 'sistem\n\nsahne' })
    expect(packed[1]).toEqual({ role: 'user', content: 'Merhaba' })
    expect(packed).toHaveLength(2)
  })

  it('uses the requested OpenRouter model id', () => {
    expect(OPENROUTER_MODEL).toBe('deepseek/deepseek-v4-flash-0731')
  })

  it('talks to OpenRouter through a same-origin proxy in development', () => {
    expect(openRouterChatUrl()).toBe('/api/openrouter')
  })

  it('strips markdown so kids see plain Turkish', () => {
    expect(cleanAssistantReply('**Mars** kırmızıdır.\n\n\n- Pas vardır.')).toBe('Mars kırmızıdır.\n\nPas vardır.')
  })

  it('reads either a string or text-part array as the visible answer', () => {
    expect(extractAssistantContent({ content: '  Mars kırmızıdır.  ' })).toBe('Mars kırmızıdır.')
    expect(extractAssistantContent({ content: [{ type: 'text', text: 'Venüs sıcaktır.' }] })).toBe('Venüs sıcaktır.')
    expect(extractAssistantContent({ content: '', reasoning: 'gizli düşünce' })).toBe('')
  })

  it('explains empty replies without the wait-later copy', () => {
    expect(friendlyChatError(new Error('empty-reply'))).toBe('Cevap gelmedi. Soruyu bir kez daha yaz.')
    expect(friendlyChatError(new Error('openrouter-http'))).toBe('Cevabı alamadım. Bir kez daha dene.')
    expect(friendlyChatError(new Error('429 rate limit'))).toBe('Biraz bekleyelim. Sonra yine sor.')
  })
})
