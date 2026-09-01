import { eventsForDrawer } from '../../content/astroEvents'
import { starsAlphabetical } from '../../content/skyWonders'
import { focusEvent } from '../astroEvents/focusEvent'
import { getScene } from '../../scene/sceneApi'
import { useEventStore } from '../../store/eventStore'
import { useLabStore } from '../../store/labStore'
import { useSimulationStore } from '../../store/simulationStore'
import { useUiStore } from '../../store/uiStore'
import { useVoiceStore } from '../../store/voiceStore'
import { askTheSun, lookAtSolarSystem, openCompare } from './focus'

export function enterExplore(): void {
  const ui = useUiStore.getState()
  const lab = useLabStore.getState()
  ui.setIntroVisible(false)
  ui.setAppMode('explore')
  if (lab.labOpen || lab.activityId) lab.leaveLab()
}

export function openLabHome(): void {
  const ui = useUiStore.getState()
  ui.setIntroVisible(false)
  ui.setActivePanel('none')
  ui.setPlanetDrawerOpen(false)
  ui.setStarDrawerOpen(false)
  ui.setEventDrawerOpen(false)
  ui.closeSunChat()
  ui.setAppMode('lab')
  useVoiceStore.getState().play('mode-lab')
  useLabStore.getState().openLab()
}

export function toggleLab(): void {
  const ui = useUiStore.getState()
  const lab = useLabStore.getState()
  ui.setIntroVisible(false)
  if (ui.appMode === 'lab' || lab.labOpen || lab.activityId) {
    lab.closeLab()
    ui.setAppMode('explore')
    return
  }
  openLabHome()
}

export function toggleEvents(options?: { cycle?: boolean }): void {
  const cycle = options?.cycle ?? true
  const ui = useUiStore.getState()
  enterExplore()
  if (!ui.eventDrawerOpen) {
    ui.setEventDrawerOpen(true)
    return
  }
  if (!cycle) {
    ui.setEventDrawerOpen(false)
    return
  }
  const ids = eventListIds()
  if (!ids.length) return
  const current = useEventStore.getState().selectedEventId
  const index = current ? ids.indexOf(current) : -1
  const next = ids[(index + 1) % ids.length]
  if (!next) return
  focusEvent(next)
  useUiStore.getState().setEventDrawerOpen(true)
}

export function toggleStars(options?: { cycle?: boolean }): void {
  const cycle = options?.cycle ?? true
  const ui = useUiStore.getState()
  enterExplore()
  if (!ui.starDrawerOpen) {
    useVoiceStore.getState().play('ui-stars')
    ui.setStarDrawerOpen(true)
    return
  }
  if (!cycle) {
    ui.setStarDrawerOpen(false)
    return
  }
  const stars = starsAlphabetical()
  if (!stars.length) return
  const current = useSimulationStore.getState().selectedWonderId
  const index = current ? stars.findIndex((star) => star.id === current) : -1
  const next = stars[(index + 1) % stars.length]
  if (!next) return
  useSimulationStore.getState().selectWonder(next.id)
  getScene()?.focusWonder(next.id)
}

export function togglePlanets(): void {
  const ui = useUiStore.getState()
  enterExplore()
  if (!ui.planetDrawerOpen) useVoiceStore.getState().play('ui-planets')
  ui.setPlanetDrawerOpen(!ui.planetDrawerOpen)
}

export function toggleTeam(): void {
  const ui = useUiStore.getState()
  enterExplore()
  if (ui.activePanel === 'team') {
    ui.setActivePanel('none')
    return
  }
  useVoiceStore.getState().play('ui-team')
  ui.setActivePanel('team')
}

export function toggleSettings(): void {
  const ui = useUiStore.getState()
  enterExplore()
  ui.setActivePanel(ui.activePanel === 'settings' ? 'none' : 'settings')
}

export function toggleCompare(): void {
  const ui = useUiStore.getState()
  enterExplore()
  if (ui.activePanel === 'compare') {
    ui.setActivePanel('none')
    return
  }
  useVoiceStore.getState().play('ui-compare')
  openCompare()
}

export function toggleFacts(): void {
  const ui = useUiStore.getState()
  enterExplore()
  if (ui.activePanel === 'facts') {
    ui.setActivePanel('none')
    return
  }
  useVoiceStore.getState().play('ui-facts')
  ui.setActivePanel('facts')
}

export function toggleSunChat(): void {
  const ui = useUiStore.getState()
  if (ui.sunChatOpen) {
    ui.closeSunChat()
    return
  }
  enterExplore()
  askTheSun()
}

export function goBack(): void {
  const ui = useUiStore.getState()
  const lab = useLabStore.getState()
  ui.setIntroVisible(false)

  if (lab.activityId) {
    lab.resetActivityScene()
    useLabStore.setState({ activityId: null, room: null, step: 'predict', prediction: null })
    ui.setAppMode('lab')
    ui.setActivePanel('none')
    return
  }

  if (ui.appMode === 'lab' || lab.labOpen) {
    lab.closeLab()
    ui.setAppMode('explore')
    return
  }

  if (ui.activePanel !== 'none') {
    ui.setActivePanel('none')
    return
  }

  if (ui.dockMoreOpen) {
    ui.setDockMoreOpen(false)
    return
  }

  if (ui.planetDrawerOpen || ui.starDrawerOpen || ui.eventDrawerOpen) {
    ui.setPlanetDrawerOpen(false)
    ui.setStarDrawerOpen(false)
    ui.setEventDrawerOpen(false)
    return
  }

  if (ui.sunChatOpen) {
    ui.closeSunChat()
    return
  }

  lookAtSolarSystem()
}

export function eventListIds(atMs = Date.now()): string[] {
  const lists = eventsForDrawer(atMs)
  return [...lists.now.map((event) => event.id), ...lists.upcoming.map((event) => event.id), ...lists.happened.map((event) => event.id)]
}
