import { describe, expect, it } from 'vitest'
import { findWonder } from './skyWonders'

describe('skyWonders', () => {
  it('finds notable stars and named rocks', () => {
    expect(findWonder('vega')?.tag).toBe('Yaz üçgeni')
    expect(findWonder('altair')?.kind).toBe('star')
    expect(findWonder('proxima')?.tag).toBe('En yakın')
    expect(findWonder('ceres')?.kind).toBe('rock')
    expect(findWonder('missing')).toBeUndefined()
  })
})
