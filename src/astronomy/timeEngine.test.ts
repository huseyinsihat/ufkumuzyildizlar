import { describe, expect, it } from 'vitest'
import { TimeEngine } from './timeEngine'

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
