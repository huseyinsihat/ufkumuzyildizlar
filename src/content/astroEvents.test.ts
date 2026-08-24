import { describe, expect, it } from 'vitest'
import {
  ASTRO_EVENTS,
  DATED_ECLIPSES,
  astroEventIds,
  eventHasMore,
  eventsForDrawer,
  getAstroEvent,
  getSelectableEvent,
  statusAt,
  utcNoonMs,
} from './astroEvents'

describe('astroEvents', () => {
  it('keeps twenty unique classroom events', () => {
    expect(ASTRO_EVENTS).toHaveLength(20)
    expect(new Set(astroEventIds()).size).toBe(20)
    for (const event of ASTRO_EVENTS) {
      expect(event.lead.length).toBeGreaterThan(24)
      expect(event.why.length).toBeGreaterThan(20)
      expect(event.shortName.length).toBeGreaterThan(2)
      expect(event.shortName.length).toBeLessThan(14)
      expect(event.see.length).toBeGreaterThan(20)
      expect(event.facts.length).toBeGreaterThanOrEqual(5)
      expect(event.durationMs).toBeGreaterThanOrEqual(10_000)
      expect(event.durationMs).toBeLessThanOrEqual(20_000)
      expect(event.weight).toBeGreaterThanOrEqual(3)
      expect(event.weight).toBeLessThanOrEqual(5)
      expect(eventHasMore(event)).toBe(true)
    }
  })

  it('lists dated future eclipses without driving the clock', () => {
    const eclipse = getAstroEvent('solar-eclipse')
    expect(eclipse?.upcoming?.some((row) => row.date.includes('2030') && row.text.includes('Türkiye'))).toBe(true)
    expect(eclipse?.upcoming).toHaveLength(10)
  })

  it('marks eclipses Oldu or Yakında relative to 24 Ağustos 2026', () => {
    const now = utcNoonMs(2026, 8, 24)
    const past = DATED_ECLIPSES.find((item) => item.id === 'eclipse-2026-aug-12')
    const turkey = DATED_ECLIPSES.find((item) => item.id === 'eclipse-2030-jun-01')
    expect(past).toBeTruthy()
    expect(turkey).toBeTruthy()
    expect(statusAt(past!, now)).toBe('happened')
    expect(statusAt(turkey!, now)).toBe('upcoming')
    expect(statusAt({}, now)).toBe('now')

    const drawer = eventsForDrawer(now)
    expect(drawer.happened.map((item) => item.id)).toContain('eclipse-2026-aug-12')
    expect(drawer.upcoming[0]?.id).toBe('eclipse-2030-jun-01')
    expect(drawer.upcoming).toHaveLength(10)
    expect(getSelectableEvent('eclipse-2030-jun-01')?.dateLabel).toContain('2030')
  })

  it('hides Daha fazla when there is nothing extra to show', () => {
    expect(
      eventHasMore({
        facts: ['a', 'b'],
        why: '',
        relatedBodyIds: [],
      }),
    ).toBe(false)
  })
})
