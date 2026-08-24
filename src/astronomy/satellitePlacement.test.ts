import { describe, expect, it } from 'vitest'
import { getSatelliteRelativeEclipticAu } from './coordinateSystems'
import { getBody } from './planetData'
import { eclipticDeltaToSceneDir, placeBesideParent, sampleSatelliteOrbitLocal } from './satellitePlacement'

describe('satellitePlacement', () => {
  it('keeps the satellite on the parent-relative side at the visual radius', () => {
    const parent = { x: 20, y: 1, z: -4 }
    const relative = { x: 0.01, y: 0, z: 0 }
    const pos = placeBesideParent(parent, relative, 5)
    const dist = Math.hypot(pos.x - parent.x, pos.y - parent.y, pos.z - parent.z)
    expect(dist).toBeCloseTo(5)
    expect(pos.x).toBeGreaterThan(parent.x)
  })

  it('remaps ecliptic Z into scene Y', () => {
    const dir = eclipticDeltaToSceneDir({ x: 0, y: 0, z: 2 })
    expect(dir.x).toBeCloseTo(0)
    expect(dir.y).toBeCloseTo(2)
    expect(dir.z).toBeCloseTo(0)
  })

  it('tilts the Moon ring off the parent equatorial plane', () => {
    const moon = getBody('moon')
    const ring = sampleSatelliteOrbitLocal(moon, 5, 48, new Date('2026-08-24T12:00:00Z'))
    const maxY = Math.max(...ring.map((point) => Math.abs(point.y)))
    expect(maxY).toBeGreaterThan(0.3)
    expect(Math.hypot(ring[0]!.x, ring[0]!.y, ring[0]!.z)).toBeCloseTo(5)
  })

  it('puts the live Moon on the sampled ring', () => {
    const date = new Date('2026-08-24T12:00:00Z')
    const moon = getBody('moon')
    const origin = { x: 0, y: 0, z: 0 }
    const relative = getSatelliteRelativeEclipticAu('moon', date)
    const pos = placeBesideParent(origin, relative, 5)
    const ring = sampleSatelliteOrbitLocal(moon, 5, 48, date)
    expect(ring[0]!.x).toBeCloseTo(pos.x, 6)
    expect(ring[0]!.y).toBeCloseTo(pos.y, 6)
    expect(ring[0]!.z).toBeCloseTo(pos.z, 6)
  })
})
