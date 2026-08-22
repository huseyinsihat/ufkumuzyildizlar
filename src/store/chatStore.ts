import { create } from 'zustand'
import { matchCanned, pickCannedAnswer, pickChipQuestions, type CannedPrompt } from '../features/chat/canned'
import { requestMessages, type StoredChatMessage } from '../features/chat/messages'
import { completeChat, friendlyChatError, hasOpenRouterKey } from '../features/chat/openRouter'
import { buildSceneSummary, systemPrompt, WELCOME_TEXT } from '../features/chat/prompt'
import { useSimulationStore } from './simulationStore'

interface ChatState {
  messages: StoredChatMessage[]
  chips: CannedPrompt[]
  busy: boolean
  error: string | null
  refreshChips: () => void
  askChip: (question: string) => void
  send: (text: string) => Promise<void>
  reset: () => void
}

let nextId = 1
let inflight: AbortController | null = null

function welcomeMessage(): StoredChatMessage {
  return { id: 'welcome', role: 'assistant', content: WELCOME_TEXT, local: true }
}

function uid(): string {
  nextId += 1
  return `chat-${nextId}`
}

function askedQuestions(messages: StoredChatMessage[]): Set<string> {
  return new Set(messages.filter((item) => item.role === 'user').map((item) => item.content))
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [welcomeMessage()],
  chips: pickChipQuestions(new Set()),
  busy: false,
  error: null,
  refreshChips: () => {
    set({ chips: pickChipQuestions(askedQuestions(get().messages)) })
  },
  reset: () => {
    inflight?.abort()
    inflight = null
    set({ messages: [welcomeMessage()], chips: pickChipQuestions(new Set()), busy: false, error: null })
  },
  askChip: (question) => {
    const content = question.trim()
    if (!content || get().busy) return
    const answer = pickCannedAnswer(content)
    if (!answer) return
    const userMessage: StoredChatMessage = { id: uid(), role: 'user', content }
    const assistant: StoredChatMessage = { id: uid(), role: 'assistant', content: answer }
    const messages = [...get().messages, userMessage, assistant]
    set({
      messages,
      error: null,
      chips: get().chips.filter((item) => item.question !== content),
    })
  },
  send: async (text) => {
    const content = text.trim()
    if (!content || get().busy) return
    if (matchCanned(content)) {
      get().askChip(content)
      return
    }
    if (!hasOpenRouterKey()) {
      set({ error: 'Sohbet şimdilik kapalı.' })
      return
    }

    inflight?.abort()
    const controller = new AbortController()
    inflight = controller

    const userMessage: StoredChatMessage = { id: uid(), role: 'user', content }
    set({
      messages: [...get().messages, userMessage],
      busy: true,
      error: null,
      chips: get().chips.filter((item) => item.question !== content),
    })

    const sim = useSimulationStore.getState()
    const payload = requestMessages(
      systemPrompt(),
      buildSceneSummary({
        bodyId: sim.selectedBodyId,
        wonderId: sim.selectedWonderId,
        scaleMode: sim.scaleMode,
      }),
      get().messages,
    )

    try {
      const reply = await completeChat(payload, controller.signal)
      if (inflight !== controller) return
      const assistant: StoredChatMessage = {
        id: uid(),
        role: 'assistant',
        content: reply.content,
      }
      if (reply.reasoning_details !== undefined) {
        assistant.reasoning_details = reply.reasoning_details
      }
      set({ messages: [...get().messages, assistant], busy: false })
    } catch (error) {
      if (controller.signal.aborted) {
        if (inflight === controller) set({ busy: false })
        return
      }
      console.warn('sun-chat', error)
      set({ busy: false, error: friendlyChatError(error) })
    } finally {
      if (inflight === controller) inflight = null
    }
  },
}))
