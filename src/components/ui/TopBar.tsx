import { TEAM } from '../../content/team'
import { useUiStore } from '../../store/uiStore'
import { useVoiceStore } from '../../store/voiceStore'
import { Icon } from './Icon'

const logoSrc = `${import.meta.env.BASE_URL}Teknofest_logo.png`

export function TopBar() {
  const setIntro = useUiStore((s) => s.setIntroVisible)
  const voiceOn = useVoiceStore((s) => s.enabled)
  const playing = useVoiceStore((s) => s.playing)

  function toggleVoice() {
    const store = useVoiceStore.getState()
    const next = !store.enabled
    store.setEnabled(next)
    store.unlock(next)
  }

  return (
    <header className="top-bar" role="banner">
      <button type="button" className="brand-btn" onClick={() => setIntro(true)} aria-label="Ana ekran">
        <img className="brand-logo" src={logoSrc} alt="" />
        <span className="brand-copy">
          <strong>{TEAM.project}</strong>
          <span className="brand-sub">
            {TEAM.teamName} · {TEAM.event}
          </span>
        </span>
      </button>
      <p className="category">{TEAM.category.replace(/, /g, ' · ')}</p>
      <div className="top-right-cluster">
        <button
          type="button"
          className={`icon-chip voice-toggle${voiceOn ? '' : ' is-muted'}${playing ? ' is-playing' : ''}`}
          data-voice-toggle=""
          aria-pressed={voiceOn}
          aria-label={voiceOn ? 'Sesli anlatımı kapat' : 'Sesli anlatımı aç'}
          onClick={toggleVoice}
        >
          <Icon name={voiceOn ? 'speaker' : 'speakerOff'} />
        </button>
      </div>
    </header>
  )
}
