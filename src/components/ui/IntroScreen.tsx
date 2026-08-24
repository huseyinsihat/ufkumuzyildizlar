import { TEAM } from '../../content/team'
import { useLabStore } from '../../store/labStore'
import { useUiStore } from '../../store/uiStore'
import { useVoiceStore } from '../../store/voiceStore'
import { Icon } from './Icon'

export function IntroScreen() {
  const setIntro = useUiStore((s) => s.setIntroVisible)
  const setMode = useUiStore((s) => s.setAppMode)
  const setPanel = useUiStore((s) => s.setActivePanel)
  const openLab = useLabStore((s) => s.openLab)

  return (
    <div className="intro-screen" role="dialog" aria-labelledby="intro-title">
      <div className="intro-card">
        <p className="eyebrow section-kicker">{TEAM.event}</p>
        <h1 id="intro-title">{TEAM.project}</h1>
        <p className="intro-team">{TEAM.teamName}</p>
        <p className="intro-lead">Uzay Vatanda Millî Teknoloji Hamlesi</p>
        <div className="intro-grid">
          <button
            type="button"
            className="intro-tile primary"
            onClick={() => {
              useVoiceStore.getState().play('intro-lab')
              setPanel('none')
              setIntro(false)
              setMode('lab')
              openLab()
            }}
          >
            <span className="icon-well">
              <Icon name="flask" />
            </span>
            <strong>{TEAM.home}</strong>
            <span>Oyna ve Öğren</span>
          </button>
          <button
            type="button"
            className="intro-tile"
            onClick={() => {
              useVoiceStore.getState().play('intro-explore')
              setIntro(false)
              setMode('explore')
            }}
          >
            <span className="icon-well">
              <Icon name="planet" />
            </span>
            <strong>Güneş Sistemini Keşfet</strong>
            <span>Gezegenlere Bak</span>
          </button>
          <button
            type="button"
            className="intro-tile"
            onClick={() => {
              useVoiceStore.getState().play('intro-team')
              setIntro(false)
              setMode('explore')
              setPanel('team')
            }}
          >
            <span className="icon-well">
              <Icon name="people" />
            </span>
            <strong>Takım</strong>
            <span>{TEAM.teamName}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
