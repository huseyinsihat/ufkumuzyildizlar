import { afterEach, describe, expect, it, vi } from 'vitest'
import { utcNoonMs } from '../../content/astroEvents'
import { DAY_SCALE, YEAR_SCALE } from '../../astronomy/timeEngine'
import { useEventStore } from '../../store/eventStore'
import { useSimulationStore } from '../../store/simulationStore'
import { useUiStore } from '../../store/uiStore'
import { resetEventTimeHold } from './eventTimeHold'
import { focusEvent, shouldJumpToEvent } from './focusEvent'

const NOW = utcNoonMs(2026, 8, 24)

describe('focusEvent', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    resetEventTimeHold()
    useEventStore.setState({ activeEventId: null, selectedEventId: null, startedAt: 0 })
    useUiStore.setState({ eventDrawerOpen: false, planetDrawerOpen: false, starDrawerOpen: false, activePanel: 'none' })
    useSimulationStore.getState().setFreezeRevolution(false)
    useSimulationStore.getState().setTimeScale(DAY_SCALE)
    useSimulationStore.getState().setNow()
  })

  it('jumps sim time only for a future dated event', () => {
    expect(shouldJumpToEvent(utcNoonMs(2027, 8, 2), NOW, NOW)).toBe(true)
    expect(shouldJumpToEvent(utcNoonMs(2026, 8, 12), NOW, NOW)).toBe(false)
    expect(shouldJumpToEvent(undefined, NOW, NOW)).toBe(false)
    expect(shouldJumpToEvent(utcNoonMs(2027, 8, 2), utcNoonMs(2028, 1, 1), NOW)).toBe(false)
  })

  it('advances the clock for a future eclipse and does not rewind a past one', () => {
    vi.spyOn(Date, 'now').mockReturnValue(NOW)
    useSimulationStore.getState().setTimeMs(NOW)

    focusEvent('eclipse-2030-jun-01')
    expect(useEventStore.getState().selectedEventId).toBe('eclipse-2030-jun-01')
    expect(useEventStore.getState().activeEventId).toBe('solar-eclipse')
    expect(useSimulationStore.getState().simulationTimeMs).toBe(utcNoonMs(2030, 6, 1))

    focusEvent('eclipse-2026-aug-12')
    expect(useSimulationStore.getState().simulationTimeMs).toBe(utcNoonMs(2030, 6, 1))
    expect(useEventStore.getState().selectedEventId).toBe('eclipse-2026-aug-12')
  })

  it('does not change the clock for an undated phenomenon', () => {
    vi.spyOn(Date, 'now').mockReturnValue(NOW)
    useSimulationStore.getState().setTimeMs(NOW)
    focusEvent('mars-dust')
    expect(useSimulationStore.getState().simulationTimeMs).toBe(NOW)
    expect(useEventStore.getState().activeEventId).toBe('mars-dust')
  })

  it('freezes the tour at year speed until the chip ends', () => {
    useSimulationStore.getState().setTimeScale(YEAR_SCALE)
    useSimulationStore.getState().setFreezeRevolution(false)
    focusEvent('solar-eclipse')
    expect(useSimulationStore.getState().freezeRevolution).toBe(true)
    useEventStore.getState().endActiveEvent()
    expect(useSimulationStore.getState().freezeRevolution).toBe(false)
  })

  it('does not freeze the tour at realtime', () => {
    useSimulationStore.getState().setTimeScale(1)
    useSimulationStore.getState().setFreezeRevolution(false)
    focusEvent('mars-dust')
    expect(useSimulationStore.getState().freezeRevolution).toBe(false)
  })

  it('releases the hold when the inspect card is closed', () => {
    useSimulationStore.getState().setTimeScale(YEAR_SCALE)
    useSimulationStore.getState().setFreezeRevolution(false)
    focusEvent('lunar-eclipse')
    expect(useSimulationStore.getState().freezeRevolution).toBe(true)
    useEventStore.getState().selectEvent(null)
    expect(useSimulationStore.getState().freezeRevolution).toBe(false)
    expect(useEventStore.getState().activeEventId).toBe('lunar-eclipse')
  })
})
