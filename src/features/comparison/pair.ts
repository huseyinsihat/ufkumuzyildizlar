import type { BodyId } from '../../types/planet'

const PAIR: Record<BodyId, BodyId> = {
  sun: 'earth',
  mercury: 'earth',
  venus: 'earth',
  earth: 'mars',
  moon: 'earth',
  mars: 'earth',
  jupiter: 'saturn',
  saturn: 'jupiter',
  uranus: 'neptune',
  neptune: 'uranus',
  pluto: 'neptune',
}

export function comparePairFor(selected: BodyId | null | undefined): { a: BodyId; b: BodyId } {
  const a = selected ?? 'earth'
  const b = PAIR[a]
  return { a, b: b === a ? 'mars' : b }
}
