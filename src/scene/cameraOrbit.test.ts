import { describe, expect, it } from 'vitest'
import { lookAnglesDeg, orbitOffset, sphericalFromOffset, dollyOffset } from './cameraOrbit'

describe('orbitOffset', () => {
  it('keeps camera distance while yawing around the target', () => {
    const from = { x: 0, y: 8, z: 40 }
    const radius = Math.hypot(from.x, from.y, from.z)
    const next = orbitOffset(from, Math.PI / 2, 0)
    expect(Math.hypot(next.x, next.y, next.z)).toBeCloseTo(radius, 6)
    expect(next.y).toBeCloseTo(from.y, 6)
    expect(next.x).toBeGreaterThan(20)
  })

  it('clamps polar pitch so the camera does not flip over the pole', () => {
    const from = { x: 0, y: 40, z: 4 }
    const next = orbitOffset(from, 0, -2)
    const phi = sphericalFromOffset(next).phi
    expect(phi).toBeGreaterThanOrEqual(0.12)
  })
})

describe('lookAnglesDeg', () => {
  it('reads a level look along +Z as zero pitch', () => {
    const angles = lookAnglesDeg({ x: 0, y: 0, z: 40 })
    expect(angles.yaw).toBeCloseTo(0, 5)
    expect(angles.pitch).toBeCloseTo(0, 5)
  })
})

describe('dollyOffset', () => {
  it('shortens distance when zooming in and never goes below min', () => {
    const from = { x: 0, y: 8, z: 40 }
    const closer = dollyOffset(from, 0.82, 4, 360)
    expect(Math.hypot(closer.x, closer.y, closer.z)).toBeLessThan(Math.hypot(from.x, from.y, from.z))
    const floor = dollyOffset({ x: 0, y: 0, z: 4.2 }, 0.5, 4, 360)
    expect(Math.hypot(floor.x, floor.y, floor.z)).toBeCloseTo(4, 6)
  })
})
