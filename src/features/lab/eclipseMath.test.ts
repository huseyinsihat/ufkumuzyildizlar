import { describe, expect, it } from 'vitest'
import { eclipseKindFromPositions, moonInUmbraCone } from './eclipseMath'

describe('eclipseMath', () => {
  it('counts a lunar eclipse only inside the umbra, not at any full moon', () => {
    const earth = { x: 20, y: 0, z: 0 }
    const inShadow = { x: 24, y: 0, z: 0 }
    const fullButMiss = { x: 24, y: 3.2, z: 0 }
    expect(moonInUmbraCone(earth, inShadow, 0.34, 10)).toBe(true)
    expect(moonInUmbraCone(earth, fullButMiss, 0.34, 10)).toBe(false)
    expect(eclipseKindFromPositions(earth, inShadow, 0.34, 10)).toBe('lunar')
    expect(eclipseKindFromPositions(earth, fullButMiss, 0.34, 10)).toBe('none')
  })

  it('counts a solar eclipse only when the Moon sits between Sun and Earth', () => {
    const earth = { x: 20, y: 0, z: 0 }
    const newMoon = { x: 16, y: 0, z: 0 }
    const beside = { x: 16, y: 4, z: 0 }
    expect(eclipseKindFromPositions(earth, newMoon, 0.34, 10)).toBe('solar')
    expect(eclipseKindFromPositions(earth, beside, 0.34, 10)).toBe('none')
  })
})
