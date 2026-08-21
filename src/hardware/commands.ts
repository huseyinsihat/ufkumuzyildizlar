import { TIME_PRESETS } from '../astronomy/timeEngine'
import { focusBody, lookAtSolarSystem } from '../features/planetExplorer/focus'
import { useSimulationStore } from '../store/simulationStore'
import type { BodyId } from '../types/planet'

const BODIES: BodyId[] = [
  'sun',
  'mercury',
  'venus',
  'earth',
  'moon',
  'mars',
  'jupiter',
  'saturn',
  'uranus',
  'neptune',
  'pluto',
]

export type HardwareCommand =
  | { kind: 'planet'; id: BodyId }
  | { kind: 'play' }
  | { kind: 'day' }
  | { kind: 'year' }
  | { kind: 'second' }
  | { kind: 'now' }
  | { kind: 'overview' }
  | { kind: 'orbits' }

export function parseHardwareLine(line: string): HardwareCommand | null {
  const token = line.trim().toUpperCase()
  if (!token) return null
  const value = token.includes(':') ? token.slice(token.indexOf(':') + 1) : token
  const planet = BODIES.find((id) => id.toUpperCase() === value)
  if (token.startsWith('P:') || planet) {
    return planet ? { kind: 'planet', id: planet } : null
  }
  if (value === 'PLAY' || value === 'PAUSE') return { kind: 'play' }
  if (value === 'DAY') return { kind: 'day' }
  if (value === 'YEAR') return { kind: 'year' }
  if (value === 'SECOND' || value === 'SEC' || value === 'SN') return { kind: 'second' }
  if (value === 'NOW') return { kind: 'now' }
  if (value === 'OVERVIEW' || value === 'HOME') return { kind: 'overview' }
  if (value === 'ORBITS' || value === 'ORBIT') return { kind: 'orbits' }
  return null
}

export function applyHardwareCommand(command: HardwareCommand): void {
  const sim = useSimulationStore.getState()
  const day = TIME_PRESETS.find((item) => item.id === 'day')?.scale ?? 86_400
  const year = TIME_PRESETS.find((item) => item.id === 'year')?.scale ?? 86_400 * 365
  const second = TIME_PRESETS.find((item) => item.id === '1')?.scale ?? 1

  if (command.kind === 'planet') {
    focusBody(command.id)
    return
  }
  if (command.kind === 'play') {
    sim.togglePlaying()
    return
  }
  if (command.kind === 'day') sim.setTimeScale(day)
  if (command.kind === 'year') sim.setTimeScale(year)
  if (command.kind === 'second') sim.setTimeScale(second)
  if (command.kind === 'now') sim.setNow()
  if (command.kind === 'overview') lookAtSolarSystem()
  if (command.kind === 'orbits') sim.setShowOrbits(!sim.showOrbits)
}
