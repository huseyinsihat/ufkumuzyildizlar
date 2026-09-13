import { useEffect, useRef, useState, type FormEvent } from 'react'
import { hasOpenRouterKey } from '../../features/chat/openRouter'
import { nextWaitingLine } from '../../features/chat/prompt'
import { TEAM } from '../../content/team'
import { tx } from '../../i18n/types'
import { useLang, useT } from '../../i18n/useT'
import { useChatStore } from '../../store/chatStore'
import { useUiStore } from '../../store/uiStore'
import { SunMascot } from '../ui/SunMascot'

export function SunChatPanel() {
  const lang = useLang()
  const t = useT()
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
  const [waiting, setWaiting] = useState(() => nextWaitingLine(undefined, Math.random, lang))
  const listRef = useRef<HTMLDivElement>(null)
  const ready = hasOpenRouterKey()

  useEffect(() => {
    if (open) refreshChips()
  }, [open, lang, refreshChips])

  useEffect(() => {
    const node = listRef.current
    if (node) node.scrollTop = node.scrollHeight
  }, [messages, busy, open, waiting])

  useEffect(() => {
    if (!busy) return
    setWaiting(nextWaitingLine(undefined, Math.random, lang))
    const timer = window.setInterval(() => {
      setWaiting((current) => nextWaitingLine(current, Math.random, lang))
    }, 2600)
    return () => window.clearInterval(timer)
  }, [busy, lang])

  if (!open) return null

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return
    setDraft('')
    void send(text)
  }

  return (
    <aside className="sun-chat" aria-label={t('askSun')}>
      <header className="panel-head">
        <div className="sun-chat-title">
          <SunMascot />
          <div>
            <h2>{t('askSun')}</h2>
            <p className="eyebrow">
              {TEAM.teamName} · {TEAM.event}
            </p>
          </div>
        </div>
        <button type="button" className="icon-btn" onClick={close} aria-label={t('close')} title={t('close')}>
          ×
        </button>
      </header>
      <div className="sun-chat-log" ref={listRef}>
        {messages.map((item) => (
          <p key={item.id} className={`sun-chat-bubble is-${item.role}`}>
            <span className="sun-chat-who">{item.role === 'user' ? t('you') : t('sun')}</span>
            {item.content}
          </p>
        ))}
        {busy ? (
          <p className="sun-chat-bubble is-pending" aria-live="polite">
            <span className="sun-chat-who">{t('sun')}</span>
            {waiting}
          </p>
        ) : null}
      </div>
      {chips.length ? (
        <div className="sun-chat-chips" aria-label={t('chipsMore')}>
          {chips.map((item) => (
            <button
              key={item.id}
              type="button"
              className="chip"
              disabled={busy}
              onClick={() => askChip(tx(lang, item.question))}
            >
              {tx(lang, item.question)}
            </button>
          ))}
        </div>
      ) : null}
      {!ready ? <p className="sun-chat-error">{t('chatClosed')}</p> : null}
      {error ? <p className="sun-chat-error">{error}</p> : null}
      <form className="sun-chat-form" onSubmit={submit}>
        <label className="sr-only" htmlFor="sun-chat-input">
          {t('askSun')}
        </label>
        <input
          id="sun-chat-input"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={t('askPlaceholder')}
          disabled={!ready || busy}
          autoComplete="off"
        />
        <button type="submit" className="btn primary" disabled={!ready || busy || !draft.trim()}>
          {t('send')}
        </button>
      </form>
    </aside>
  )
}
