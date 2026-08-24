import { useEffect } from 'react'
import { CanvasHost } from './components/3d/CanvasHost'
import { SolarSystem2D } from './components/3d/SolarSystem2D'
import { WebGLFallback } from './components/3d/WebGLFallback'
import { ComparePanel } from './components/education/ComparePanel'
import { FactsPanel } from './components/education/FactsPanel'
import { DemoTour } from './components/education/DemoTour'
import { SunChatPanel } from './components/chat/SunChatPanel'
import { ActivityBody } from './components/lab/ActivityBody'
import { ActivityShell } from './components/lab/ActivityShell'
import { LabHome } from './components/lab/LabHome'
import { InspectRail } from './components/ui/LeftNav'
import { CompactTimeBar } from './components/ui/ExploreDock'
import { IntroScreen } from './components/ui/IntroScreen'
import { VoiceHost } from './components/ui/VoiceHost'
import { ExploreDock, ExploreListStrip } from './components/ui/PlanetDrawer'
import { ExploreSideTools } from './components/ui/SunMascot'
import { HardwarePanel } from './components/ui/HardwarePanel'
import { SettingsPanel } from './components/ui/SettingsPanel'
import { TeamPanel } from './components/ui/TeamPanel'
import { TopBar } from './components/ui/TopBar'
import { useLabStore } from './store/labStore'
import { useSimulationStore } from './store/simulationStore'
import { useUiStore } from './store/uiStore'
import { useAstroEventScheduler } from './features/astroEvents/useAstroEventScheduler'
import { hasAnyWebGL } from './utils/webgl'
import { watchHardwarePorts } from './hardware/hardwareStore'

export default function App() {
  const intro = useUiStore((s) => s.introVisible)
  const mode = useUiStore((s) => s.appMode)
  const panel = useUiStore((s) => s.activePanel)
  const webgl = useUiStore((s) => s.webglSupported)
  const use2d = useUiStore((s) => s.use2dFallback)
  const demo = useUiStore((s) => s.demoActive)
  const scaleMode = useSimulationStore((s) => s.scaleMode)
  const labOpen = useLabStore((s) => s.labOpen)
  const activityId = useLabStore((s) => s.activityId)
  const largeText = useUiStore((s) => s.largeText)
  const drawerOpen = useUiStore((s) => s.planetDrawerOpen || s.starDrawerOpen || s.eventDrawerOpen)
  const eventDrawerOpen = useUiStore((s) => s.eventDrawerOpen)
  const chatOpen = useUiStore((s) => s.sunChatOpen)
  const setWebgl = useUiStore((s) => s.setWebglSupported)
  const set2d = useUiStore((s) => s.setUse2dFallback)
  useAstroEventScheduler()

  useEffect(() => {
    const ok = hasAnyWebGL()
    setWebgl(ok)
    if (!ok) set2d(true)
  }, [setWebgl, set2d])

  useEffect(() => watchHardwarePorts(), [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        useUiStore.getState().setActivePanel('none')
        useUiStore.getState().setIntroVisible(false)
        useUiStore.getState().closeSunChat()
        useUiStore.getState().setPlanetDrawerOpen(false)
        useUiStore.getState().setStarDrawerOpen(false)
        useUiStore.getState().setEventDrawerOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const explore = mode === 'explore' && !activityId
  const showActivity = Boolean(activityId)
  const showLabHome = mode === 'lab' && labOpen && !activityId && panel === 'none'

  return (
    <div
      className={`app-shell${largeText ? ' large-text' : ''}${activityId === 'arrange-orbits' ? ' hide-scene-labels' : ''}${explore ? ' has-explore' : ''}${drawerOpen ? ' has-drawer' : ''}${eventDrawerOpen ? ' has-event-drawer' : ''}${chatOpen ? ' has-chat' : ''}${panel !== 'none' ? ' has-panel' : ''}${activityId ? ' has-activity' : ''}`}
    >
      <div className="space-glow" />
      {webgl && !use2d ? <CanvasHost /> : <SolarSystem2D />}
      <TopBar />
      {explore ? (
        <div className="explore-chrome">
          <ExploreDock />
          <ExploreListStrip />
          <CompactTimeBar />
          {!intro ? <ExploreSideTools /> : null}
        </div>
      ) : null}
      {explore && scaleMode === 'trueScale' ? (
        <p className="scale-banner">Gezegenler gerçek boyutta — uzay çok boş.</p>
      ) : null}
      {explore ? <InspectRail /> : null}
      {explore && !intro ? <SunChatPanel /> : null}
      {showLabHome ? <LabHome /> : null}
      {showActivity ? (
        <ActivityShell>
          <ActivityBody />
        </ActivityShell>
      ) : null}
      {panel === 'compare' ? <ComparePanel /> : null}
      {panel === 'facts' ? <FactsPanel /> : null}
      {panel === 'settings' ? <SettingsPanel /> : null}
      {panel === 'team' ? <TeamPanel /> : null}
      {panel === 'hardware' ? <HardwarePanel /> : null}
      {demo ? <DemoTour /> : null}
      <VoiceHost />
      {intro ? <IntroScreen /> : null}
      {!webgl ? <WebGLFallback /> : null}
    </div>
  )
}
