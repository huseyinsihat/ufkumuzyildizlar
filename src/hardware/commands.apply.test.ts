import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { ASTRO_EVENTS } from '../content/astroEvents'
import { starsAlphabetical } from '../content/skyWonders'
import { resetEventTimeHold } from '../features/astroEvents/eventTimeHold'
import { eventListIds } from '../features/planetExplorer/chrome'
import { useEventStore } from '../store/eventStore'
import { useLabStore } from '../store/labStore'
import { useSimulationStore } from '../store/simulationStore'
import { useUiStore } from '../store/uiStore'
import { applyHardwareCommand } from './commands'

function resetChrome(): void {
  resetEventTimeHold()
  useUiStore.setState({
    introVisible: false,
    appMode: 'explore',
    activePanel: 'none',
    planetDrawerOpen: false,
    starDrawerOpen: false,
    eventDrawerOpen: false,
    sunChatOpen: false,
    demoActive: false,
  })
  useLabStore.setState({ labOpen: false, activityId: null, room: null, step: 'predict', prediction: null })
  useEventStore.setState({ activeEventId: null, selectedEventId: null, startedAt: 0 })
  useSimulationStore.getState().selectBody(null)
  useSimulationStore.getState().selectWonder(null)
  useSimulationStore.getState().setGalaxyView(false)
}

describe('applyHardwareCommand', () => {
  beforeEach(() => {
    resetChrome()
  })

  afterEach(() => {
    resetChrome()
  })

  it('opens and closes team and settings', () => {
    applyHardwareCommand({ kind: 'team' })
    expect(useUiStore.getState().activePanel).toBe('team')
    applyHardwareCommand({ kind: 'team' })
    expect(useUiStore.getState().activePanel).toBe('none')

    applyHardwareCommand({ kind: 'settings' })
    expect(useUiStore.getState().activePanel).toBe('settings')
    applyHardwareCommand({ kind: 'settings' })
    expect(useUiStore.getState().activePanel).toBe('none')
  })

  it('closes a panel with back, then returns to overview when idle', () => {
    applyHardwareCommand({ kind: 'settings' })
    applyHardwareCommand({ kind: 'back' })
    expect(useUiStore.getState().activePanel).toBe('none')

    useSimulationStore.getState().selectBody('earth')
    useSimulationStore.getState().setGalaxyView(true)
    applyHardwareCommand({ kind: 'back' })
    expect(useSimulationStore.getState().selectedBodyId).toBeNull()
    expect(useSimulationStore.getState().galaxyView).toBe(false)
  })

  it('opens events then cycles to the next event on repeat', () => {
    const ids = eventListIds()
    expect(ids[0]).toBe(ASTRO_EVENTS[0].id)
    expect(ids[1]).toBe(ASTRO_EVENTS[1].id)

    applyHardwareCommand({ kind: 'events' })
    expect(useUiStore.getState().eventDrawerOpen).toBe(true)
    expect(useEventStore.getState().selectedEventId).toBeNull()

    applyHardwareCommand({ kind: 'events' })
    expect(useEventStore.getState().selectedEventId).toBe(ids[0])
    expect(useUiStore.getState().eventDrawerOpen).toBe(true)

    applyHardwareCommand({ kind: 'events' })
    expect(useEventStore.getState().selectedEventId).toBe(ids[1])
  })

  it('opens stars then cycles to the next star on repeat', () => {
    const stars = starsAlphabetical()
    applyHardwareCommand({ kind: 'stars' })
    expect(useUiStore.getState().starDrawerOpen).toBe(true)

    applyHardwareCommand({ kind: 'stars' })
    expect(useSimulationStore.getState().selectedWonderId).toBe(stars[0]?.id)

    applyHardwareCommand({ kind: 'stars' })
    expect(useSimulationStore.getState().selectedWonderId).toBe(stars[1]?.id)
  })

  it('toggles lab mode', () => {
    applyHardwareCommand({ kind: 'lab' })
    expect(useUiStore.getState().appMode).toBe('lab')
    expect(useLabStore.getState().labOpen).toBe(true)

    applyHardwareCommand({ kind: 'lab' })
    expect(useUiStore.getState().appMode).toBe('explore')
    expect(useLabStore.getState().labOpen).toBe(false)
  })

  it('opens and closes sun chat', () => {
    applyHardwareCommand({ kind: 'chat' })
    expect(useUiStore.getState().sunChatOpen).toBe(true)
    applyHardwareCommand({ kind: 'chat' })
    expect(useUiStore.getState().sunChatOpen).toBe(false)
  })

  it('leaves an activity to lab home, then leaves lab', () => {
    useUiStore.setState({ appMode: 'lab' })
    useLabStore.getState().openLab()
    useLabStore.getState().startActivity('who-faster')
    expect(useLabStore.getState().activityId).toBe('who-faster')

    applyHardwareCommand({ kind: 'back' })
    expect(useLabStore.getState().activityId).toBeNull()
    expect(useLabStore.getState().labOpen).toBe(true)
    expect(useUiStore.getState().appMode).toBe('lab')

    applyHardwareCommand({ kind: 'back' })
    expect(useLabStore.getState().labOpen).toBe(false)
    expect(useUiStore.getState().appMode).toBe('explore')
  })
})
