import { describe, expect, it } from 'vitest'
import { HARDWARE_BUTTONS, HARDWARE_EXTRAS } from './bindings'
import { parseHardwareLine, timeScaleFromPot } from './commands'

describe('parseHardwareLine', () => {
  it('reads planet buttons', () => {
    expect(parseHardwareLine('P:earth')).toEqual({ kind: 'planet', id: 'earth' })
    expect(parseHardwareLine('p:jupiter')).toEqual({ kind: 'planet', id: 'jupiter' })
    expect(parseHardwareLine('P:moon')).toEqual({ kind: 'planet', id: 'moon' })
  })

  it('reads function buttons', () => {
    expect(parseHardwareLine('F:play')).toEqual({ kind: 'play' })
    expect(parseHardwareLine('F:day')).toEqual({ kind: 'day' })
    expect(parseHardwareLine('F:year')).toEqual({ kind: 'year' })
    expect(parseHardwareLine('F:hour')).toEqual({ kind: 'hour' })
    expect(parseHardwareLine('F:saat')).toEqual({ kind: 'hour' })
    expect(parseHardwareLine('F:now')).toEqual({ kind: 'now' })
    expect(parseHardwareLine('F:overview')).toEqual({ kind: 'overview' })
    expect(parseHardwareLine('F:orbits')).toEqual({ kind: 'orbits' })
    expect(parseHardwareLine('F:axes')).toEqual({ kind: 'axes' })
    expect(parseHardwareLine('F:lab')).toEqual({ kind: 'lab' })
    expect(parseHardwareLine('F:compare')).toEqual({ kind: 'compare' })
    expect(parseHardwareLine('F:planets')).toEqual({ kind: 'planets' })
    expect(parseHardwareLine('F:stars')).toEqual({ kind: 'stars' })
    expect(parseHardwareLine('F:facts')).toEqual({ kind: 'facts' })
    expect(parseHardwareLine('S:sirius')).toEqual({ kind: 'star', id: 'sirius' })
  })

  it('reads analog time and gyro', () => {
    expect(parseHardwareLine('T:0.5')).toEqual({ kind: 'time', t: 0.5 })
    expect(parseHardwareLine('G:0.12,-0.2')).toEqual({ kind: 'gyro', yaw: 0.12, pitch: -0.2 })
    expect(parseHardwareLine('R:earth')).toEqual({ kind: 'planet', id: 'earth' })
  })

  it('maps the pot across second, hour, day, and year', () => {
    expect(timeScaleFromPot(0)).toBeCloseTo(1)
    expect(timeScaleFromPot(1 / 3)).toBeCloseTo(3_600)
    expect(timeScaleFromPot(2 / 3)).toBeCloseTo(86_400)
  })

  it('parses every wired classroom button line', () => {
    for (const item of HARDWARE_BUTTONS) {
      expect(parseHardwareLine(item.line)).toBeTruthy()
    }
    for (const item of HARDWARE_EXTRAS) {
      expect(parseHardwareLine(item.line)).toBeTruthy()
    }
  })

  it('ignores empty and unknown lines', () => {
    expect(parseHardwareLine('')).toBeNull()
    expect(parseHardwareLine('F:dance')).toBeNull()
    expect(parseHardwareLine('hello world!!!')).toBeNull()
  })
})
