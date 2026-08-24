import { describe, expect, it } from 'vitest'
import { stageLunarMoon, stageSolarMoon } from './eclipseStage'

function len(v: { x: number; y: number; z: number }): number {
  return Math.hypot(v.x, v.y, v.z)
}

function dot(a: { x: number; y: number; z: number }, b: { x: number; y: number; z: number }): number {
  return a.x * b.x + a.y * b.y + a.z * b.z
}

describe('eclipseStage', () => {
  const earth = { x: 20, y: 4, z: -2 }
  const dist = 3.2

  it('puts the solar-eclipse Moon between the Sun and Earth', () => {
    const moon = stageSolarMoon(earth, dist)
    expect(len(moon)).toBeLessThan(len(earth))
    expect(dot(moon, earth)).toBeGreaterThan(0)
    expect(len(earth) - len(moon)).toBeCloseTo(dist, 5)
  })

  it('puts Earth between the Sun and the lunar-eclipse Moon', () => {
    const moon = stageLunarMoon(earth, dist)
    expect(len(moon)).toBeGreaterThan(len(earth))
    expect(dot(moon, earth)).toBeGreaterThan(0)
    expect(len(moon) - len(earth)).toBeCloseTo(dist, 5)
  })
})
