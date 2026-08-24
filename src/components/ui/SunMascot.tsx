import { useId } from 'react'
import { askTheSun } from '../../features/planetExplorer/focus'
import { useUiStore } from '../../store/uiStore'

export function SunMascot({ size = 'md' }: { size?: 'md' | 'lg' }) {
  const rawId = useId().replace(/:/g, '')
  const glowId = `sun-glow-${rawId}`

  return (
    <span className={`sun-mascot sun-mascot-${size}`} aria-hidden="true">
      <svg className="sun-mascot-face" viewBox="0 0 64 64">
        <defs>
          <radialGradient id={glowId} cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#ffe08a" />
            <stop offset="70%" stopColor="#f5a524" />
            <stop offset="100%" stopColor="#c2410c" />
          </radialGradient>
        </defs>
        <g className="sun-mascot-rays" fill="#fde68a">
          <rect x="30" y="2" width="4" height="10" rx="2" />
          <rect x="30" y="52" width="4" height="10" rx="2" />
          <rect x="2" y="30" width="10" height="4" rx="2" />
          <rect x="52" y="30" width="10" height="4" rx="2" />
          <rect x="10" y="10" width="4" height="10" rx="2" transform="rotate(-45 12 15)" />
          <rect x="50" y="10" width="4" height="10" rx="2" transform="rotate(45 52 15)" />
          <rect x="10" y="44" width="4" height="10" rx="2" transform="rotate(45 12 49)" />
          <rect x="50" y="44" width="4" height="10" rx="2" transform="rotate(-45 52 49)" />
        </g>
        <circle cx="32" cy="32" r="18" fill={`url(#${glowId})`} />
        <circle cx="26" cy="29" r="2.4" fill="#3b1d0a" />
        <circle cx="38" cy="29" r="2.4" fill="#3b1d0a" />
        <circle cx="25.2" cy="28.2" r="0.7" fill="#fff8e1" />
        <circle cx="37.2" cy="28.2" r="0.7" fill="#fff8e1" />
        <path d="M25 37c2.4 3.2 11.6 3.2 14 0" fill="none" stroke="#3b1d0a" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    </span>
  )
}

export function ExploreSideTools() {
  const chatOpen = useUiStore((s) => s.sunChatOpen)
  if (chatOpen) return null

  return (
    <div className="explore-side">
      <button type="button" className="sun-ask-fab" onClick={() => askTheSun()}>
        <SunMascot size="lg" />
        <span className="sun-ask-fab-label">Güneş’e Sor</span>
      </button>
    </div>
  )
}
