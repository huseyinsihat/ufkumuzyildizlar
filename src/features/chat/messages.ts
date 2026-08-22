export type ChatRole = 'user' | 'assistant'

export interface VisibleChatMessage {
  id: string
  role: ChatRole
  content: string
  local?: boolean
}

export interface StoredChatMessage extends VisibleChatMessage {
  reasoning_details?: unknown
}

export interface OpenRouterChatMessage {
  role: ChatRole
  content: string
  reasoning_details?: unknown
}

export const MAX_TURNS = 8

export function visibleMessages(messages: StoredChatMessage[]): VisibleChatMessage[] {
  return messages.map(({ id, role, content, local }) => ({ id, role, content, local }))
}

export function trimTurns(messages: StoredChatMessage[], maxTurns = MAX_TURNS): StoredChatMessage[] {
  const conversational = messages.filter((item) => !item.local)
  const turns: StoredChatMessage[][] = []
  let current: StoredChatMessage[] = []
  for (const item of conversational) {
    if (item.role === 'user' && current.length) {
      turns.push(current)
      current = [item]
    } else {
      current.push(item)
    }
  }
  if (current.length) turns.push(current)
  return turns.slice(-maxTurns).flat()
}

export function toApiMessages(messages: StoredChatMessage[]): OpenRouterChatMessage[] {
  return trimTurns(messages).map((item) => {
    const next: OpenRouterChatMessage = { role: item.role, content: item.content }
    if (item.role === 'assistant' && item.reasoning_details !== undefined) {
      next.reasoning_details = item.reasoning_details
    }
    return next
  })
}

export function requestMessages(
  system: string,
  scene: string,
  history: StoredChatMessage[],
): Array<{ role: 'system' | ChatRole; content: string; reasoning_details?: unknown }> {
  return [{ role: 'system', content: `${system}\n\n${scene}` }, ...toApiMessages(history)]
}
