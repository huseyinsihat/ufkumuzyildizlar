import { describe, expect, it } from 'vitest'
import { eduSkyDirection } from '../astronomy/skyCoordinates'
import { eventIconName } from '../features/astroEvents/eventIcons'

describe('eduSkyDirection', () => {
  it('returns a unit vector', () => {
    const dir = eduSkyDirection({ x: 1, y: 0, z: 0 }, 0, 10)
    const len = Math.hypot(dir.x, dir.y, dir.z)
    expect(len).toBeCloseTo(1, 5)
  })

  it('spreads opposite slots on the showcase ring', () => {
    const a = eduSkyDirection({ x: 0, y: 1, z: 0 }, 0, 8, 1)
    const b = eduSkyDirection({ x: 0, y: 1, z: 0 }, 4, 8, 1)
    const dot = a.x * b.x + a.y * b.y + a.z * b.z
    expect(dot).toBeLessThan(0.2)
  })
})

describe('eventIconName', () => {
  it('maps classroom events to specific icons', () => {
    expect(eventIconName('uranus-tilt')).toBe('tilt')
    expect(eventIconName('io-volcano')).toBe('volcano')
    expect(eventIconName('solar-eclipse')).toBe('eclipse')
  })

  it('maps dated eclipses to eclipse icon', () => {
    expect(eventIconName('eclipse-2030-jun-01')).toBe('eclipse')
  })
})
