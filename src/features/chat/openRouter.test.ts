import { describe, expect, it } from 'vitest'
import { requestMessages, toApiMessages, trimTurns, visibleMessages, type StoredChatMessage } from './messages'
import { extractAssistantContent, cleanAssistantReply, friendlyChatError, OPENROUTER_MODEL, openRouterChatUrl, openRouterChatUrls, passReasoningDetails, buildCompletionBody } from './openRouter'
import { buildSceneSummary, CANNED_PROMPTS, nextWaitingLine, systemPrompt, WAITING_LINES, WELCOME_TEXT } from './prompt'

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

  it('rotates plain waiting lines while the sun thinks', () => {
    expect(WAITING_LINES.length).toBeGreaterThanOrEqual(6)
    expect(WAITING_LINES.join(' ')).not.toMatch(/[\u{1F300}-\u{1FAFF}]/u)
    const first = nextWaitingLine(undefined, () => 0)
    const next = nextWaitingLine(first, () => 0)
    expect(WAITING_LINES).toContain(first)
    expect(next).not.toBe(first)
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

  it('grounds Earth crafts such as Crew Dragon when selected', () => {
    const summary = buildSceneSummary({ bodyId: null, wonderId: 'crew-dragon', scaleMode: 'educational' })
    expect(summary).toContain('Crew Dragon')
    expect(summary).toContain('Alper Gezeravcı')
    expect(summary).toContain('Ax-3')
  })

  it('offers a canned pool for chips', () => {
    expect(CANNED_PROMPTS.length).toBeGreaterThanOrEqual(30)
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

  it('calls OpenRouter directly and keeps a local proxy as backup in development', () => {
    expect(openRouterChatUrl()).toBe('https://openrouter.ai/api/v1/chat/completions')
    expect(openRouterChatUrls()[0]).toBe('https://openrouter.ai/api/v1/chat/completions')
  })

  it('enables capped reasoning so the final answer still arrives', () => {
    const body = buildCompletionBody([{ role: 'user', content: 'Merhaba' }])
    expect(body.model).toBe(OPENROUTER_MODEL)
    expect(body.reasoning).toEqual({ enabled: true, max_tokens: 200 })
    expect(body.max_tokens).toBe(1200)
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
