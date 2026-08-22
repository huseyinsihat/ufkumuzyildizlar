import { describe, expect, it } from 'vitest'
import {
  CAMERA_TRAVEL_MAX_DIST,
  CAMERA_TRAVEL_MAX_SEC,
  CAMERA_TRAVEL_MIN_SEC,
  cameraTravelArcAmount,
  cameraTravelArcOffset,
  cameraTravelDuration,
} from './cameraTravel'

describe('cameraTravelDuration', () => {
  it('keeps the current short-hop duration at zero distance', () => {
    expect(cameraTravelDuration(0)).toBe(CAMERA_TRAVEL_MIN_SEC)
  })

  it('reaches eight seconds at the farthest scene hop', () => {
    expect(cameraTravelDuration(CAMERA_TRAVEL_MAX_DIST)).toBe(CAMERA_TRAVEL_MAX_SEC)
    expect(cameraTravelDuration(CAMERA_TRAVEL_MAX_DIST * 2)).toBe(CAMERA_TRAVEL_MAX_SEC)
  })

  it('scales nearby hops only a little, star hops much more', () => {
    const moonHop = cameraTravelDuration(14)
    const marsHop = cameraTravelDuration(42)
    const vegaHop = cameraTravelDuration(260)
    expect(moonHop).toBeGreaterThanOrEqual(CAMERA_TRAVEL_MIN_SEC)
    expect(moonHop).toBeLessThan(1.4)
    expect(marsHop).toBeGreaterThan(moonHop)
    expect(marsHop).toBeLessThan(2)
    expect(vegaHop).toBeGreaterThan(4)
    expect(vegaHop).toBeLessThan(CAMERA_TRAVEL_MAX_SEC)
  })
})

describe('cameraTravelArc', () => {
  it('does not arc short planet hops', () => {
    expect(cameraTravelArcAmount(12)).toBe(0)
    expect(cameraTravelArcOffset({ x: 0, y: 0, z: 0 }, { x: 12, y: 0, z: 0 })).toEqual({
      x: 0,
      y: 0,
      z: 0,
    })
  })

  it('lifts long hops and swings away from the Sun', () => {
    expect(cameraTravelArcAmount(260)).toBeGreaterThan(0.9)
    const offset = cameraTravelArcOffset({ x: -180, y: 8, z: 0 }, { x: 180, y: 8, z: 0 })
    expect(Math.hypot(offset.x, offset.y, offset.z)).toBeGreaterThan(20)
    expect(Math.abs(offset.z)).toBeGreaterThan(10)
  })
})
