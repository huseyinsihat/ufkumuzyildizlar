import type { BodyId } from '../../types/planet'

const PAIR: Record<BodyId, BodyId> = {
  sun: 'earth',
  mercury: 'earth',
  venus: 'earth',
  earth: 'mars',
  moon: 'earth',
  mars: 'earth',
  phobos: 'mars',
  deimos: 'mars',
  jupiter: 'saturn',
  io: 'jupiter',
  europa: 'jupiter',
  ganymede: 'jupiter',
  callisto: 'jupiter',
  saturn: 'jupiter',
  titan: 'saturn',
  uranus: 'neptune',
  neptune: 'uranus',
  pluto: 'neptune',
}

export function comparePairFor(selected: BodyId | null | undefined): { a: BodyId; b: BodyId } {
  const a = selected ?? 'earth'
  const b = PAIR[a]
  return { a, b: b === a ? 'mars' : b }
}
