import { describe, expect, it } from 'vitest'
import { getMoonsOf, getPlanets } from '../astronomy/planetData'
import { OrbitRenderer, ORBIT_LINE_PX, orbitLineWidthPx } from './OrbitRenderer'

describe('orbitLineWidthPx', () => {
  it('keeps the visible stroke thin and the pick band much wider', () => {
    expect(orbitLineWidthPx('visual')).toBeLessThanOrEqual(1.4)
    expect(orbitLineWidthPx('visual', 'satellite')).toBeLessThanOrEqual(1.2)
    expect(orbitLineWidthPx('pick')).toBeGreaterThan(orbitLineWidthPx('visual') * 8)
    expect(orbitLineWidthPx('pick', 'satellite')).toBeGreaterThan(orbitLineWidthPx('visual', 'satellite') * 8)
  })

  it('uses a stable screen-space pick width', () => {
    expect(ORBIT_LINE_PX.pick).toBeGreaterThanOrEqual(16)
    expect(ORBIT_LINE_PX.pickSatellite).toBeGreaterThanOrEqual(12)
    expect(ORBIT_LINE_PX.visualSelected).toBeLessThan(ORBIT_LINE_PX.pick / 4)
  })
})

describe('OrbitRenderer', () => {
  it('exposes a pick mesh for every planet and moon orbit', () => {
    const orbits = new OrbitRenderer()
    orbits.rebuild('educational')
    const ids = new Set(orbits.pickMeshes.map((mesh) => mesh.userData.bodyId))
    for (const planet of getPlanets()) {
      expect(ids.has(planet.id)).toBe(true)
      for (const moon of getMoonsOf(planet.id)) {
        expect(ids.has(moon.id)).toBe(true)
      }
    }
    orbits.dispose()
  })

  it('drops hidden satellite orbits from the pick list', () => {
    const orbits = new OrbitRenderer()
    orbits.rebuild('educational')
    orbits.setSatelliteVisible('titan', false)
    const ids = new Set(orbits.visiblePickMeshes().map((mesh) => mesh.userData.bodyId))
    expect(ids.has('titan')).toBe(false)
    expect(ids.has('saturn')).toBe(true)
    orbits.setSatelliteVisible('titan', true)
    const shown = new Set(orbits.visiblePickMeshes().map((mesh) => mesh.userData.bodyId))
    expect(shown.has('titan')).toBe(true)
    orbits.dispose()
  })
})
