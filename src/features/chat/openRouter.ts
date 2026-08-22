export const OPENROUTER_MODEL = 'deepseek/deepseek-v4-flash-0731'
const OPENROUTER_HOST = 'https://openrouter.ai/api/v1/chat/completions'
const REFERER = 'https://huseyinsihat.github.io/ufkumuzyildizlar/'
const TITLE = 'Ufkumuz Yıldızlar'

export interface AssistantReply {
  content: string
  reasoning_details?: unknown
}

export function openRouterChatUrl(): string {
  return import.meta.env.DEV ? '/api/openrouter' : OPENROUTER_HOST
}

export function hasOpenRouterKey(): boolean {
  return Boolean(readApiKey())
}

function readApiKey(): string {
  return (import.meta.env.VITE_OPENROUTER_API_KEY ?? '').trim()
}

export function missingKeyMessage(): string {
  return 'Sohbet şimdilik kapalı.'
}

export function cleanAssistantReply(raw: string): string {
  return raw
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/^[*-]\s+/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+\n/g, '\n')
    .trim()
}

export function extractAssistantContent(message: {
  content?: unknown
  reasoning?: unknown
} | undefined): string {
  if (!message) return ''
  const fromContent = normalizeContent(message.content)
  if (fromContent) return cleanAssistantReply(fromContent)
  return ''
}

function normalizeContent(content: unknown): string {
  if (typeof content === 'string') return content
  if (!Array.isArray(content)) return ''
  return content
    .map((part) => {
      if (typeof part === 'string') return part
      if (part && typeof part === 'object' && 'text' in part && typeof part.text === 'string') {
        return part.text
      }
      return ''
    })
    .join('')
}

export function friendlyChatError(error: unknown): string {
  if (error instanceof DOMException && error.name === 'AbortError') {
    return 'Soru durdu. İstersen yeniden yaz.'
  }
  if (error instanceof TypeError) {
    return 'Ağa ulaşılamadı. Bir kez daha dene.'
  }
  if (error instanceof Error && error.message === 'missing-key') {
    return missingKeyMessage()
  }
  if (error instanceof Error && error.message === 'empty-reply') {
    return 'Cevap gelmedi. Soruyu bir kez daha yaz.'
  }
  if (error instanceof Error && /401|unauthorized|invalid.*key|user not found/i.test(error.message)) {
    return 'Sohbet anahtarı geçersiz. Biraz sonra yine dene.'
  }
  if (error instanceof Error && /402|credit|payment/i.test(error.message)) {
    return 'Sohbet kredisi bitmiş. Sonra yine sor.'
  }
  if (error instanceof Error && /429|rate|too many|limit/i.test(error.message)) {
    return 'Biraz bekleyelim. Sonra yine sor.'
  }
  return 'Cevabı alamadım. Bir kez daha dene.'
}

interface OpenRouterResponse {
  choices?: Array<{
    message?: {
      content?: unknown
      reasoning?: unknown
      reasoning_details?: unknown
    }
  }>
  error?: { message?: string; code?: number | string; metadata?: unknown }
}

export type ChatTurn = { role: string; content: string; reasoning_details?: unknown }

export function toOpenRouterMessages(messages: ChatTurn[]): ChatTurn[] {
  return messages.map((item) => {
    const next: ChatTurn = { role: item.role, content: item.content }
    if (item.role === 'assistant' && item.reasoning_details !== undefined) {
      next.reasoning_details = item.reasoning_details
    }
    return next
  })
}

export function buildCompletionBody(messages: ChatTurn[], reasoningEnabled = true): Record<string, unknown> {
  const body: Record<string, unknown> = {
    model: OPENROUTER_MODEL,
    messages: toOpenRouterMessages(messages),
    max_tokens: 1200,
  }
  if (reasoningEnabled) {
    body.reasoning = { enabled: true, max_tokens: 200 }
  }
  return body
}

async function postChat(
  apiKey: string,
  body: Record<string, unknown>,
  signal?: AbortSignal,
): Promise<AssistantReply> {
  const response = await fetch(openRouterChatUrl(), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': REFERER,
      'X-Title': TITLE,
    },
    body: JSON.stringify(body),
    signal,
  })

  const raw = await response.text()
  let result: OpenRouterResponse
  try {
    result = JSON.parse(raw) as OpenRouterResponse
  } catch {
    throw new Error(response.ok ? 'empty-reply' : `openrouter-http-${response.status}`)
  }

  if (!response.ok) {
    throw new Error(result.error?.message || `openrouter-http-${response.status}`)
  }

  const message = result.choices?.[0]?.message
  const content = extractAssistantContent(message)
  if (!content) {
    throw new Error('empty-reply')
  }

  const reply: AssistantReply = { content }
  if (message?.reasoning_details !== undefined) {
    reply.reasoning_details = message.reasoning_details
  }
  return reply
}

export async function completeChat(
  messages: ChatTurn[],
  signal?: AbortSignal,
): Promise<AssistantReply> {
  const apiKey = readApiKey()
  if (!apiKey) {
    throw new Error('missing-key')
  }

  try {
    return await postChat(apiKey, buildCompletionBody(messages, true), signal)
  } catch (error) {
    if (signal?.aborted) throw error
    if (error instanceof Error && error.message === 'empty-reply') {
      return postChat(apiKey, buildCompletionBody(messages, false), signal)
    }
    throw error
  }
}

export function passReasoningDetails(details: unknown): unknown {
  return details
}
