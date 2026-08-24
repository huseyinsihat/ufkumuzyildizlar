import { afterEach, describe, expect, it } from 'vitest'
import { DAY_SCALE, HOUR_SCALE, YEAR_SCALE } from '../../astronomy/timeEngine'
import { useSimulationStore } from '../../store/simulationStore'
import {
  beginEventTimeHold,
  releaseEventTimeHold,
  resetEventTimeHold,
  shouldHoldRevolution,
} from './eventTimeHold'

describe('eventTimeHold', () => {
  afterEach(() => {
    resetEventTimeHold()
    useSimulationStore.getState().setFreezeRevolution(false)
    useSimulationStore.getState().setTimeScale(DAY_SCALE)
  })

  it('holds only faster than one hour per second', () => {
    expect(shouldHoldRevolution(1)).toBe(false)
    expect(shouldHoldRevolution(HOUR_SCALE)).toBe(false)
    expect(shouldHoldRevolution(DAY_SCALE)).toBe(true)
    expect(shouldHoldRevolution(YEAR_SCALE)).toBe(true)
  })

  it('freezes revolution at year speed and restores when released', () => {
    useSimulationStore.getState().setTimeScale(YEAR_SCALE)
    useSimulationStore.getState().setFreezeRevolution(false)
    beginEventTimeHold()
    expect(useSimulationStore.getState().freezeRevolution).toBe(true)
    releaseEventTimeHold()
    expect(useSimulationStore.getState().freezeRevolution).toBe(false)
  })

  it('does not freeze at realtime', () => {
    useSimulationStore.getState().setTimeScale(1)
    beginEventTimeHold()
    expect(useSimulationStore.getState().freezeRevolution).toBe(false)
    releaseEventTimeHold()
    expect(useSimulationStore.getState().freezeRevolution).toBe(false)
  })

  it('leaves an already frozen tour frozen', () => {
    useSimulationStore.getState().setTimeScale(YEAR_SCALE)
    useSimulationStore.getState().setFreezeRevolution(true)
    beginEventTimeHold()
    releaseEventTimeHold()
    expect(useSimulationStore.getState().freezeRevolution).toBe(true)
  })
})
