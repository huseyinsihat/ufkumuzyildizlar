import { TEAM } from '../../content/team'
import { loc } from '../../i18n/types'
import { useLang, useT } from '../../i18n/useT'
import { useLabStore } from '../../store/labStore'
import { useUiStore } from '../../store/uiStore'
import { useVoiceStore } from '../../store/voiceStore'
import { Icon } from './Icon'

const logoSrc = `${import.meta.env.BASE_URL}Teknofest_logo.png`

export function IntroScreen() {
  const t = useT()
  const lang = useLang()
  const setIntro = useUiStore((s) => s.setIntroVisible)
  const setMode = useUiStore((s) => s.setAppMode)
  const setPanel = useUiStore((s) => s.setActivePanel)
  const openLab = useLabStore((s) => s.openLab)

  return (
    <div className="intro-screen" role="dialog" aria-labelledby="intro-title">
      <div className="intro-card">
        <img className="intro-logo" src={logoSrc} alt="TEKNOFEST" />
        <p className="eyebrow section-kicker">{TEAM.event}</p>
        <h1 id="intro-title">{TEAM.project}</h1>
        <p className="intro-team">{TEAM.teamName}</p>
        <p className="intro-lead">{loc(lang, TEAM.category)}</p>
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
            <strong>{loc(lang, TEAM.home)}</strong>
            <span>{t('playLearn')}</span>
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
            <strong>{t('explore')}</strong>
            <span>{t('exploreHint')}</span>
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
            <strong>{t('team')}</strong>
            <span>{TEAM.teamName}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
