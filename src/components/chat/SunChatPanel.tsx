import { useEffect, useRef, useState, type FormEvent } from 'react'
import { hasOpenRouterKey } from '../../features/chat/openRouter'
import { nextWaitingLine } from '../../features/chat/prompt'
import { TEAM } from '../../content/team'
import { useChatStore } from '../../store/chatStore'
import { useUiStore } from '../../store/uiStore'
import { SunMascot } from '../ui/SunMascot'

export function SunChatPanel() {
  const open = useUiStore((s) => s.sunChatOpen)
  const close = useUiStore((s) => s.closeSunChat)
  const messages = useChatStore((s) => s.messages)
  const chips = useChatStore((s) => s.chips)
  const busy = useChatStore((s) => s.busy)
  const error = useChatStore((s) => s.error)
  const send = useChatStore((s) => s.send)
  const askChip = useChatStore((s) => s.askChip)
  const refreshChips = useChatStore((s) => s.refreshChips)
  const [draft, setDraft] = useState('')
  const [waiting, setWaiting] = useState(() => nextWaitingLine())
  const listRef = useRef<HTMLDivElement>(null)
  const ready = hasOpenRouterKey()

  useEffect(() => {
    if (open) refreshChips()
  }, [open, refreshChips])

  useEffect(() => {
    const node = listRef.current
    if (node) node.scrollTop = node.scrollHeight
  }, [messages, busy, open, waiting])

  useEffect(() => {
    if (!busy) return
    setWaiting(nextWaitingLine())
    const timer = window.setInterval(() => {
      setWaiting((current) => nextWaitingLine(current))
    }, 2600)
    return () => window.clearInterval(timer)
  }, [busy])

  if (!open) return null

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return
    setDraft('')
    void send(text)
  }

  return (
    <aside className="sun-chat" aria-label="Güneş’e sor">
      <header className="panel-head">
        <div className="sun-chat-title">
          <SunMascot />
          <div>
            <h2>Güneş’e sor</h2>
            <p className="eyebrow">
              {TEAM.teamName} · {TEAM.event}
            </p>
          </div>
        </div>
        <button type="button" className="icon-btn" onClick={close} aria-label="Kapat">
          ×
        </button>
      </header>
      <div className="sun-chat-log" ref={listRef}>
        {messages.map((item) => (
          <p key={item.id} className={`sun-chat-bubble is-${item.role}`}>
            <span className="sun-chat-who">{item.role === 'user' ? 'Sen' : 'Güneş'}</span>
            {item.content}
          </p>
        ))}
        {busy ? (
          <p className="sun-chat-bubble is-pending" aria-live="polite">
            <span className="sun-chat-who">Güneş</span>
            {waiting}
          </p>
        ) : null}
      </div>
      {chips.length ? (
        <div className="sun-chat-chips">
          <p className="sun-chat-chips-label">Örnek sorular</p>
          {chips.map((item) => (
            <button
              key={item.id}
              type="button"
              className="chip"
              disabled={busy}
              onClick={() => askChip(item.question)}
            >
              {item.question}
            </button>
          ))}
        </div>
      ) : null}
      {!ready ? <p className="sun-chat-error">Yazılı soru şimdilik kapalı. Örneklerden birine dokunabilirsin.</p> : null}
      {error ? <p className="sun-chat-error">{error}</p> : null}
      <form className="sun-chat-form" onSubmit={submit}>
        <label className="sr-only" htmlFor="sun-chat-input">
          Güneş’e soru yaz
        </label>
        <input
          id="sun-chat-input"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={ready ? 'Kendi sorununu yaz…' : 'Yazmak kapalı'}
          disabled={!ready || busy}
          autoComplete="off"
        />
        <button type="submit" className="btn primary" disabled={!ready || busy || !draft.trim()}>
          Sor
        </button>
      </form>
    </aside>
  )
}
