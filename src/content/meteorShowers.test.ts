import { describe, expect, it } from 'vitest'
import { meteorShowerIntensity } from './meteorShowers'

describe('meteorShowerIntensity', () => {
  it('peaks near the Perseids in mid-August, not in June', () => {
    const perseids = meteorShowerIntensity(Date.UTC(2026, 7, 12, 12))
    const june = meteorShowerIntensity(Date.UTC(2026, 5, 10, 12))
    const geminids = meteorShowerIntensity(Date.UTC(2026, 11, 14, 12))
    expect(perseids).toBeGreaterThan(0.8)
    expect(geminids).toBeGreaterThan(0.7)
    expect(june).toBeLessThan(0.2)
    expect(perseids).toBeGreaterThan(june)
  })

  it('keeps a quiet sporadic floor so the sky is never empty', () => {
    expect(meteorShowerIntensity(Date.UTC(2026, 5, 10, 12))).toBeGreaterThanOrEqual(0.08)
  })
})
