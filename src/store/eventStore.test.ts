import { afterEach, describe, expect, it } from 'vitest'
import { isInspectingEvent, useEventStore } from './eventStore'
import { useSimulationStore } from './simulationStore'
import { resetEventTimeHold } from '../features/astroEvents/eventTimeHold'

describe('eventStore', () => {
  afterEach(() => {
    resetEventTimeHold()
    useEventStore.setState({ activeEventId: null, selectedEventId: null, startedAt: 0 })
  })
  it('selects an event without clearing a planet or wonder', () => {
    useSimulationStore.setState({ selectedBodyId: 'mars', selectedWonderId: null })
    useEventStore.setState({ activeEventId: 'mars-dust', selectedEventId: null, startedAt: 1 })

    useEventStore.getState().selectEvent('mars-dust')
    expect(useEventStore.getState().selectedEventId).toBe('mars-dust')
    expect(useSimulationStore.getState().selectedBodyId).toBe('mars')

    useSimulationStore.getState().selectWonder('sirius')
    expect(useSimulationStore.getState().selectedWonderId).toBe('sirius')
    expect(useEventStore.getState().selectedEventId).toBe('mars-dust')

    useEventStore.getState().endActiveEvent()
    expect(useEventStore.getState().activeEventId).toBeNull()
    expect(useEventStore.getState().selectedEventId).toBe('mars-dust')
  })

  it('treats inspect as selected matching the playing visual', () => {
    expect(isInspectingEvent(null, 'solar-eclipse')).toBe(false)
    expect(isInspectingEvent('solar-eclipse', null)).toBe(false)
    expect(isInspectingEvent('solar-eclipse', 'solar-eclipse')).toBe(true)
    expect(isInspectingEvent('eclipse-2030-jun-01', 'solar-eclipse')).toBe(true)
    expect(isInspectingEvent('mars-dust', 'solar-eclipse')).toBe(false)
  })
})
