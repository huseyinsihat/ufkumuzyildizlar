import { getBody } from '../../astronomy/planetData'
import type { BodyId } from '../../types/planet'

export function weightNewtons(massKg: number, gravityMs2: number): number {
  return massKg * gravityMs2
}

export function fallTimeSeconds(heightM: number, gravityMs2: number): number {
  return Math.sqrt((2 * heightM) / Math.max(gravityMs2, 0.01))
}

export function jumpHeightMeters(launchSpeedMs: number, gravityMs2: number): number {
  return (launchSpeedMs * launchSpeedMs) / (2 * Math.max(gravityMs2, 0.01))
}

export function earthRelativeWeight(massKg: number, bodyId: BodyId): { newtons: number; kgf: number; vsEarth: number } {
  const g = getBody(bodyId).gravityMs2
  const earthG = getBody('earth').gravityMs2
  const newtons = weightNewtons(massKg, g)
  return {
    newtons,
    kgf: newtons / earthG,
    vsEarth: g / earthG,
  }
}
