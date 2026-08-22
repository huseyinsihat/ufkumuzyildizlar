import { describe, expect, it } from 'vitest'
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
    expect(parseHardwareLine('F:now')).toEqual({ kind: 'now' })
    expect(parseHardwareLine('F:overview')).toEqual({ kind: 'overview' })
    expect(parseHardwareLine('F:orbits')).toEqual({ kind: 'orbits' })
    expect(parseHardwareLine('F:axes')).toEqual({ kind: 'axes' })
    expect(parseHardwareLine('S:sirius')).toEqual({ kind: 'star', id: 'sirius' })
  })

  it('reads analog time and gyro', () => {
    expect(parseHardwareLine('T:0.5')).toEqual({ kind: 'time', t: 0.5 })
    expect(parseHardwareLine('G:0.12,-0.2')).toEqual({ kind: 'gyro', yaw: 0.12, pitch: -0.2 })
    expect(parseHardwareLine('R:earth')).toEqual({ kind: 'planet', id: 'earth' })
  })

  it('maps the pot to day around the midpoint', () => {
    expect(timeScaleFromPot(0)).toBeCloseTo(1)
    expect(timeScaleFromPot(0.5)).toBeCloseTo(86_400)
  })

  it('ignores empty and unknown lines', () => {
    expect(parseHardwareLine('')).toBeNull()
    expect(parseHardwareLine('F:dance')).toBeNull()
    expect(parseHardwareLine('hello world!!!')).toBeNull()
  })
})
