import { TEAM } from '../../content/team'
import { useLabStore } from '../../store/labStore'
import { useUiStore } from '../../store/uiStore'
import { Icon } from './Icon'

export function IntroScreen() {
  const setIntro = useUiStore((s) => s.setIntroVisible)
  const setMode = useUiStore((s) => s.setAppMode)
  const setPanel = useUiStore((s) => s.setActivePanel)
  const openLab = useLabStore((s) => s.openLab)

  return (
    <div className="intro-screen" role="dialog" aria-labelledby="intro-title">
      <div className="intro-card">
        <p className="eyebrow">{TEAM.event}</p>
        <h1 id="intro-title">{TEAM.project}</h1>
        <p className="intro-team">{TEAM.teamName}</p>
        <p className="intro-lead">Güneş Sistemini canlı izle. Döndür, hızlandır, nedenini gör.</p>
        <div className="intro-grid">
          <button
            type="button"
            className="intro-tile primary"
            onClick={() => {
              setIntro(false)
              setMode('lab')
              openLab()
            }}
          >
            <Icon name="sun" />
            <strong>{TEAM.home}</strong>
            <span>{TEAM.teamName}’in projesi</span>
          </button>
          <button
            type="button"
            className="intro-tile"
            onClick={() => {
              setIntro(false)
              setMode('explore')
            }}
          >
            <Icon name="planet" />
            <strong>Güneş Sistemini gez</strong>
            <span>Serbest keşif</span>
          </button>
          <button
            type="button"
            className="intro-tile"
            onClick={() => {
              setIntro(false)
              setMode('explore')
              setPanel('team')
            }}
          >
            <Icon name="people" />
            <strong>Takım</strong>
            <span>{TEAM.teamName}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
