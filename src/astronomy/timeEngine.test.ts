import { describe, expect, it } from 'vitest'
import { DAY_SCALE, HOUR_SCALE, TIME_LADDER, TimeEngine, YEAR_SCALE, labWatchScale, timeScaleFromLadder } from './timeEngine'

describe('TimeEngine', () => {
  it('advances simulation time while playing', () => {
    const engine = new TimeEngine(0)
    engine.scale = 86_400
    engine.playing = true
    engine.step(1)
    expect(engine.simulationTimeMs).toBe(86_400_000)
  })

  it('can reverse', () => {
    const engine = new TimeEngine(1_000_000)
    engine.direction = -1
    engine.scale = 1
    engine.step(1)
    expect(engine.simulationTimeMs).toBe(999_000)
  })

  it('pauses without drift', () => {
    const engine = new TimeEngine(42)
    engine.playing = false
    engine.step(10)
    expect(engine.simulationTimeMs).toBe(42)
  })
})

describe('TIME_LADDER', () => {
  it('has four rungs from one second up to one year', () => {
    expect(TIME_LADDER.map((item) => item.id)).toEqual(['1', 'hour', 'day', 'year'])
    expect(TIME_LADDER.map((item) => item.scale)).toEqual([1, HOUR_SCALE, DAY_SCALE, YEAR_SCALE])
  })

  it('maps the pot evenly across the four rungs', () => {
    expect(timeScaleFromLadder(0)).toBeCloseTo(1)
    expect(timeScaleFromLadder(1 / 3)).toBeCloseTo(HOUR_SCALE)
    expect(timeScaleFromLadder(2 / 3)).toBeCloseTo(DAY_SCALE)
    expect(timeScaleFromLadder(1)).toBeCloseTo(YEAR_SCALE)
  })
})

describe('labWatchScale', () => {
  it('slows an Earth year to about ten real seconds', () => {
    expect(labWatchScale('earthYear')).toBeCloseTo(YEAR_SCALE / 10)
    expect(labWatchScale('dayNight')).toBe(HOUR_SCALE)
    expect(labWatchScale('skySpin')).toBeCloseTo(DAY_SCALE / 10)
  })
})
