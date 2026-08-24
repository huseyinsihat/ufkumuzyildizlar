import { describe, expect, it } from 'vitest'
import { ASTRO_EVENTS } from '../../content/astroEvents'
import { createAstroEventScheduler, DEFAULT_SCHEDULER_OPTIONS, pickWeightedEvent } from './scheduler'
import type { AstroEventId } from '../../content/astroEvents'

function sequence(values: number[]): () => number {
  let index = 0
  return () => {
    const value = values[Math.min(index, values.length - 1)]
    index += 1
    return value
  }
}

describe('astro event scheduler', () => {
  it('fires often enough to watch in exploration', () => {
    expect(DEFAULT_SCHEDULER_OPTIONS.firstDelayMaxMs).toBeLessThanOrEqual(5_000)
    expect(DEFAULT_SCHEDULER_OPTIONS.cooldownMaxMs).toBeLessThanOrEqual(8_000)
  })
  it('skips the last six events and the previous kind or host', () => {
    const recent = ['solar-flare', 'meteor-shower', 'jupiter-grs', 'io-volcano', 'enceladus-geyser', 'mars-dust']
    const last = ASTRO_EVENTS.find((event) => event.id === 'mars-dust')
    const id = pickWeightedEvent(recent, () => 0)
    expect(recent).not.toContain(id)
    const picked = ASTRO_EVENTS.find((event) => event.id === id)
    expect(picked?.kind).not.toBe(last?.kind)
    expect(picked?.hostBodyId).not.toBe(last?.hostBodyId)
    expect(ASTRO_EVENTS.some((event) => event.id === id)).toBe(true)
  })

  it('waits, plays one event, then cools down without overlapping', () => {
    const started: AstroEventId[] = []
    const ended: number[] = []
    const sink = {
      beginEvent: (id: AstroEventId) => started.push(id),
      endActiveEvent: () => ended.push(1),
    }
    const scheduler = createAstroEventScheduler({
      firstDelayMinMs: 1000,
      firstDelayMaxMs: 1000,
      cooldownMinMs: 5000,
      cooldownMaxMs: 5000,
      random: sequence([0, 0, 0, 0]),
    })

    scheduler.tick(0, true, sink)
    expect(started).toEqual([])
    scheduler.tick(999, true, sink)
    expect(started).toEqual([])
    scheduler.tick(1000, true, sink)
    expect(started).toHaveLength(1)
    expect(scheduler.activeId).toBe(started[0])

    const event = ASTRO_EVENTS.find((item) => item.id === started[0])
    const mid = 1000 + (event?.durationMs ?? 0) - 1
    scheduler.tick(mid, true, sink)
    expect(ended).toHaveLength(0)
    scheduler.tick(mid + 1, true, sink)
    expect(ended).toHaveLength(1)
    expect(scheduler.activeId).toBeNull()

    scheduler.tick(mid + 4000, true, sink)
    expect(started).toHaveLength(1)
  })

  it('stops the active event when exploration is disabled', () => {
    const sink = {
      beginEvent: () => undefined,
      endActiveEvent: () => undefined,
    }
    let ended = 0
    const counting = {
      beginEvent: sink.beginEvent,
      endActiveEvent: () => {
        ended += 1
      },
    }
    const scheduler = createAstroEventScheduler({
      firstDelayMinMs: 0,
      firstDelayMaxMs: 0,
      cooldownMinMs: 1000,
      cooldownMaxMs: 1000,
      random: () => 0,
    })
    scheduler.tick(0, true, counting)
    scheduler.tick(0, true, counting)
    expect(scheduler.activeId).toBeTruthy()
    scheduler.tick(10, false, counting)
    expect(scheduler.activeId).toBeNull()
    expect(ended).toBe(1)
  })

  it('adopts an event started by a click so the old timer cannot cut it short', () => {
    const dust = ASTRO_EVENTS.find((item) => item.id === 'mars-dust')
    const sink = {
      activeEventId: null as AstroEventId | null,
      startedAt: 0,
      beginEvent(id: AstroEventId, now: number) {
        this.activeEventId = id
        this.startedAt = now
      },
      endActiveEvent() {
        this.activeEventId = null
      },
    }
    const scheduler = createAstroEventScheduler({
      firstDelayMinMs: 1000,
      firstDelayMaxMs: 1000,
      cooldownMinMs: 5000,
      cooldownMaxMs: 5000,
      random: () => 0,
    })
    scheduler.tick(0, true, sink)
    scheduler.tick(1000, true, sink)
    const first = scheduler.activeId
    expect(first).toBeTruthy()
    expect(first).not.toBe('mars-dust')

    sink.beginEvent('mars-dust', 1200)
    scheduler.tick(1200, true, sink)
    expect(scheduler.activeId).toBe('mars-dust')

    const firstEvent = ASTRO_EVENTS.find((item) => item.id === first)
    scheduler.tick(1000 + (firstEvent?.durationMs ?? 0), true, sink)
    expect(scheduler.activeId).toBe('mars-dust')
    expect(sink.activeEventId).toBe('mars-dust')

    scheduler.tick(1200 + (dust?.durationMs ?? 0), true, sink)
    expect(scheduler.activeId).toBeNull()
    expect(sink.activeEventId).toBeNull()
  })

  it('does not start a new event while the inspect card is still open', () => {
    const started: AstroEventId[] = []
    const sink = {
      selectedEventId: 'solar-eclipse' as string | null,
      activeEventId: null as AstroEventId | null,
      startedAt: 0,
      beginEvent(id: AstroEventId, now: number) {
        started.push(id)
        this.activeEventId = id
        this.startedAt = now
      },
      endActiveEvent() {
        this.activeEventId = null
      },
    }
    const scheduler = createAstroEventScheduler({
      firstDelayMinMs: 0,
      firstDelayMaxMs: 0,
      cooldownMinMs: 0,
      cooldownMaxMs: 0,
      random: () => 0,
    })
    scheduler.tick(0, true, sink)
    scheduler.tick(1, true, sink)
    expect(started).toEqual([])

    sink.selectedEventId = null
    scheduler.tick(2, true, sink)
    scheduler.tick(2, true, sink)
    expect(started).toHaveLength(1)

    sink.selectedEventId = started[0] ?? 'solar-eclipse'
    const playing = ASTRO_EVENTS.find((item) => item.id === started[0])
    scheduler.tick(2 + (playing?.durationMs ?? 0), true, sink)
    expect(sink.activeEventId).toBeNull()
    expect(started).toHaveLength(1)

    scheduler.tick(2 + (playing?.durationMs ?? 0) + 1, true, sink)
    scheduler.tick(2 + (playing?.durationMs ?? 0) + 2, true, sink)
    expect(started).toHaveLength(1)

    sink.selectedEventId = null
    scheduler.tick(2 + (playing?.durationMs ?? 0) + 3, true, sink)
    scheduler.tick(2 + (playing?.durationMs ?? 0) + 3, true, sink)
    expect(started).toHaveLength(2)
  })
})
