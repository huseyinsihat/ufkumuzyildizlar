import { describe, expect, it } from 'vitest'
import { parseHardwareLine } from './commands'

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
  })

  it('ignores empty and unknown lines', () => {
    expect(parseHardwareLine('')).toBeNull()
    expect(parseHardwareLine('F:dance')).toBeNull()
  })
})
