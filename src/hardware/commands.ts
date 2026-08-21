import { TIME_PRESETS } from '../astronomy/timeEngine'
import { NOTABLE_STARS, NAMED_ROCKS } from '../content/skyWonders'
import { focusBody, lookAtSolarSystem } from '../features/planetExplorer/focus'
import { getScene } from '../scene/sceneApi'
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

const WONDER_IDS = [...NOTABLE_STARS, ...NAMED_ROCKS].map((item) => item.id)

export type HardwareCommand =
  | { kind: 'planet'; id: BodyId }
  | { kind: 'star'; id: string }
  | { kind: 'play' }
  | { kind: 'day' }
  | { kind: 'year' }
  | { kind: 'second' }
  | { kind: 'now' }
  | { kind: 'overview' }
  | { kind: 'orbits' }
  | { kind: 'axes' }
  | { kind: 'labels' }

export function parseHardwareLine(line: string): HardwareCommand | null {
  const raw = line.trim()
  if (!raw || raw.length > 48) return null
  if (/[^A-Za-z0-9:_-]/.test(raw)) return null
  const token = raw.toUpperCase()
  const prefix = token.includes(':') ? token.slice(0, token.indexOf(':')) : ''
  const value = token.includes(':') ? token.slice(token.indexOf(':') + 1) : token
  const planet = BODIES.find((id) => id.toUpperCase() === value)
  if (prefix === 'P' || (!prefix && planet)) {
    return planet ? { kind: 'planet', id: planet } : null
  }
  if (prefix === 'S') {
    const id = value.toLowerCase()
    return WONDER_IDS.includes(id) ? { kind: 'star', id } : null
  }
  if (value === 'PLAY' || value === 'PAUSE') return { kind: 'play' }
  if (value === 'DAY') return { kind: 'day' }
  if (value === 'YEAR') return { kind: 'year' }
  if (value === 'SECOND' || value === 'SEC' || value === 'SN') return { kind: 'second' }
  if (value === 'NOW') return { kind: 'now' }
  if (value === 'OVERVIEW' || value === 'HOME') return { kind: 'overview' }
  if (value === 'ORBITS' || value === 'ORBIT') return { kind: 'orbits' }
  if (value === 'AXES' || value === 'AXIS') return { kind: 'axes' }
  if (value === 'LABELS' || value === 'LABEL') return { kind: 'labels' }
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
  if (command.kind === 'star') {
    getScene()?.focusWonder(command.id)
    return
  }
  if (command.kind === 'play') {
    sim.togglePlaying()
    return
  }
  if (command.kind === 'day') sim.setTimeScale(day)
  if (command.kind === 'year') sim.setTimeScale(year)
  if (command.kind === 'second') sim.setTimeScale(second)
  if (command.kind === 'now') {
    sim.goNowRealtime()
    return
  }
  if (command.kind === 'overview') lookAtSolarSystem()
  if (command.kind === 'orbits') sim.setShowOrbits(!sim.showOrbits)
  if (command.kind === 'axes') sim.setShowAxes(!sim.showAxes)
  if (command.kind === 'labels') sim.setShowLabels(!sim.showLabels)
}
