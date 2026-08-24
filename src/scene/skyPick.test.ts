import { describe, expect, it } from 'vitest'
import {
  MIN_STAR_PICK_PX,
  closestScreenHit,
  isAncestorVisible,
  ndcToPixels,
  pickClosestScreenTarget,
  resolveStarVsBody,
  worldRadiusToPixels,
  type ScreenPickTarget,
} from './skyPick'

const VIEW = { width: 800, height: 600 }

describe('skyPick', () => {
  it('maps NDC center to the viewport midpoint', () => {
    expect(ndcToPixels({ x: 0, y: 0 }, VIEW)).toEqual({ x: 400, y: 300 })
  })

  it('picks a star when the pointer sits inside its glow', () => {
    const targets: ScreenPickTarget[] = [
      { id: 'sirius', ndcX: 0.4, ndcY: 0.1, radiusPx: 48 },
      { id: 'vega', ndcX: -0.8, ndcY: 0.7, radiusPx: 20 },
    ]
    expect(pickClosestScreenTarget({ x: 0.42, y: 0.08 }, VIEW, targets)).toBe('sirius')
  })

  it('misses when the pointer is outside both the glow and the minimum pick radius', () => {
    const targets: ScreenPickTarget[] = [{ id: 'sirius', ndcX: 0.5, ndcY: 0.5, radiusPx: 10 }]
    expect(pickClosestScreenTarget({ x: -0.9, y: -0.9 }, VIEW, targets)).toBeUndefined()
  })

  it('still picks a tiny star within the minimum screen radius', () => {
    const targets: ScreenPickTarget[] = [{ id: 'proxima', ndcX: 0, ndcY: 0, radiusPx: 8 }]
    const pixelShift = ((MIN_STAR_PICK_PX - 4) / VIEW.width) * 2
    expect(pickClosestScreenTarget({ x: pixelShift, y: 0 }, VIEW, targets)).toBe('proxima')
  })

  it('chooses the closer of two overlapping stars', () => {
    const targets: ScreenPickTarget[] = [
      { id: 'far', ndcX: 0.12, ndcY: 0, radiusPx: 80 },
      { id: 'near', ndcX: 0.02, ndcY: 0, radiusPx: 80 },
    ]
    expect(pickClosestScreenTarget({ x: 0, y: 0 }, VIEW, targets)).toBe('near')
  })

  it('ignores stars behind the camera so a moon orbit can still be picked', () => {
    const targets: ScreenPickTarget[] = [{ id: 'sirius', ndcX: 0, ndcY: 0, radiusPx: 80, behindCamera: true }]
    expect(pickClosestScreenTarget({ x: 0, y: 0 }, VIEW, targets)).toBeUndefined()
  })

  it('gives a larger pixel radius when the camera is closer', () => {
    const far = worldRadiusToPixels(10, 400, 48, 1080)
    const near = worldRadiusToPixels(10, 80, 48, 1080)
    expect(near).toBeGreaterThan(far * 3)
  })

  it('treats an invisible ancestor as not pickable', () => {
    const holder = { visible: false, parent: { visible: true, parent: null } }
    const pick = { visible: true, parent: holder }
    expect(isAncestorVisible(pick)).toBe(false)
    holder.visible = true
    expect(isAncestorVisible(pick)).toBe(true)
  })

  it('picks a star over a nearby orbit-sized miss when the pointer is in the glow', () => {
    const star = closestScreenHit({ x: 0.4, y: 0.1 }, VIEW, [
      { id: 'sirius', ndcX: 0.4, ndcY: 0.1, radiusPx: 48 },
    ])
    expect(resolveStarVsBody(star, undefined)).toBe('star')
  })

  it('keeps the moon when the pointer is on its disk and more than 32px from the star', () => {
    const star = closestScreenHit({ x: 0, y: 0 }, VIEW, [
      { id: 'sirius', ndcX: 0.12, ndcY: 0, radiusPx: 80 },
    ])
    const moon = closestScreenHit(
      { x: 0, y: 0 },
      VIEW,
      [{ id: 'moon', ndcX: 0, ndcY: 0, radiusPx: 90 }],
      0,
    )
    expect(star?.dist).toBeGreaterThan(MIN_STAR_PICK_PX)
    expect(resolveStarVsBody(star, moon)).toBe('body')
  })

  it('picks the star when the pointer is closer to the star than to the moon disk center', () => {
    const star = closestScreenHit({ x: 0.08, y: 0 }, VIEW, [
      { id: 'sirius', ndcX: 0.08, ndcY: 0, radiusPx: 40 },
    ])
    const moon = closestScreenHit(
      { x: 0.08, y: 0 },
      VIEW,
      [{ id: 'moon', ndcX: -0.05, ndcY: 0, radiusPx: 90 }],
      0,
    )
    expect(resolveStarVsBody(star, moon)).toBe('star')
  })
})
