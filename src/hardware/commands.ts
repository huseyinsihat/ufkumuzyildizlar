import { TIME_LADDER, timeScaleFromLadder } from '../astronomy/timeEngine'
import { NOTABLE_STARS, NAMED_ROCKS } from '../content/skyWonders'
import { focusBody, lookAtSolarSystem, openCompare } from '../features/planetExplorer/focus'
import { getScene } from '../scene/sceneApi'
import { useLabStore } from '../store/labStore'
import { useSimulationStore } from '../store/simulationStore'
import { useUiStore } from '../store/uiStore'
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
  | { kind: 'hour' }
  | { kind: 'second' }
  | { kind: 'now' }
  | { kind: 'overview' }
  | { kind: 'orbits' }
  | { kind: 'axes' }
  | { kind: 'labels' }
  | { kind: 'lab' }
  | { kind: 'compare' }
  | { kind: 'planets' }
  | { kind: 'stars' }
  | { kind: 'facts' }
  | { kind: 'time'; t: number }
  | { kind: 'gyro'; yaw: number; pitch: number }

const FUNCTIONS: Record<string, Exclude<HardwareCommand['kind'], 'planet' | 'star' | 'time' | 'gyro'>> = {
  PLAY: 'play',
  PAUSE: 'play',
  DAY: 'day',
  YEAR: 'year',
  HOUR: 'hour',
  SAAT: 'hour',
  SECOND: 'second',
  SEC: 'second',
  SN: 'second',
  NOW: 'now',
  OVERVIEW: 'overview',
  HOME: 'overview',
  ORBITS: 'orbits',
  ORBIT: 'orbits',
  AXES: 'axes',
  AXIS: 'axes',
  LABELS: 'labels',
  LABEL: 'labels',
  LAB: 'lab',
  COMPARE: 'compare',
  PLANETS: 'planets',
  STARS: 'stars',
  FACTS: 'facts',
}

export function timeScaleFromPot(t: number): number {
  return timeScaleFromLadder(t)
}

export function parseHardwareLine(line: string): HardwareCommand | null {
  const raw = line.trim()
  if (!raw || raw.length > 72) return null
  if (/[^A-Za-z0-9:_.,-]/.test(raw)) return null
  const token = raw.toUpperCase()
  const colon = token.indexOf(':')
  const prefix = colon >= 0 ? token.slice(0, colon) : ''
  const value = colon >= 0 ? token.slice(colon + 1) : token
  if (prefix === 'T') {
    const t = Number(value)
    if (!Number.isFinite(t)) return null
    return { kind: 'time', t: Math.min(1, Math.max(0, t)) }
  }
  if (prefix === 'G') {
    const [yawRaw, pitchRaw] = value.split(',')
    const yaw = Number(yawRaw)
    const pitch = Number(pitchRaw)
    if (!Number.isFinite(yaw) || !Number.isFinite(pitch)) return null
    return { kind: 'gyro', yaw, pitch }
  }
  if (prefix === 'R') {
    const planet = BODIES.find((id) => id.toUpperCase() === value)
    return planet ? { kind: 'planet', id: planet } : null
  }
  const planet = BODIES.find((id) => id.toUpperCase() === value)
  if (prefix === 'P' || (!prefix && planet)) {
    return planet ? { kind: 'planet', id: planet } : null
  }
  if (prefix === 'S') {
    const id = value.toLowerCase()
    return WONDER_IDS.includes(id) ? { kind: 'star', id } : null
  }
  const fn = FUNCTIONS[value]
  if (fn) return { kind: fn }
  return null
}

function enterExplore(): void {
  const ui = useUiStore.getState()
  const lab = useLabStore.getState()
  ui.setIntroVisible(false)
  ui.setAppMode('explore')
  if (lab.labOpen || lab.activityId) lab.leaveLab()
}

export function applyHardwareCommand(command: HardwareCommand): void {
  const sim = useSimulationStore.getState()
  const ui = useUiStore.getState()
  const lab = useLabStore.getState()
  const second = TIME_LADDER.find((item) => item.id === '1')?.scale ?? 1
  const hour = TIME_LADDER.find((item) => item.id === 'hour')?.scale ?? 3_600
  const day = TIME_LADDER.find((item) => item.id === 'day')?.scale ?? 86_400
  const year = TIME_LADDER.find((item) => item.id === 'year')?.scale ?? 86_400 * 365

  if (command.kind === 'planet') {
    enterExplore()
    focusBody(command.id)
    return
  }
  if (command.kind === 'star') {
    enterExplore()
    getScene()?.focusWonder(command.id)
    return
  }
  if (command.kind === 'play') {
    sim.togglePlaying()
    return
  }
  if (command.kind === 'day') sim.setTimeScale(day)
  if (command.kind === 'year') sim.setTimeScale(year)
  if (command.kind === 'hour') sim.setTimeScale(hour)
  if (command.kind === 'second') sim.setTimeScale(second)
  if (command.kind === 'now') {
    sim.goNowRealtime()
    return
  }
  if (command.kind === 'overview') {
    enterExplore()
    lookAtSolarSystem()
    return
  }
  if (command.kind === 'orbits') sim.setShowOrbits(!sim.showOrbits)
  if (command.kind === 'axes') sim.setShowAxes(!sim.showAxes)
  if (command.kind === 'labels') sim.setShowLabels(!sim.showLabels)
  if (command.kind === 'lab') {
    ui.setIntroVisible(false)
    if (ui.appMode === 'lab' || lab.labOpen || lab.activityId) {
      lab.closeLab()
      ui.setAppMode('explore')
    } else {
      ui.setActivePanel('none')
      ui.setPlanetDrawerOpen(false)
      ui.setStarDrawerOpen(false)
      ui.setEventDrawerOpen(false)
      ui.setAppMode('lab')
      lab.openLab()
    }
    return
  }
  if (command.kind === 'compare') {
    enterExplore()
    if (ui.activePanel === 'compare') ui.setActivePanel('none')
    else openCompare()
    return
  }
  if (command.kind === 'planets') {
    enterExplore()
    ui.setStarDrawerOpen(false)
    ui.setPlanetDrawerOpen(!ui.planetDrawerOpen)
    return
  }
  if (command.kind === 'stars') {
    enterExplore()
    ui.setPlanetDrawerOpen(false)
    ui.setStarDrawerOpen(!ui.starDrawerOpen)
    return
  }
  if (command.kind === 'facts') {
    enterExplore()
    ui.setActivePanel(ui.activePanel === 'facts' ? 'none' : 'facts')
    return
  }
  if (command.kind === 'time') sim.setTimeScale(timeScaleFromPot(command.t))
  if (command.kind === 'gyro') getScene()?.applyGyro(command.yaw, command.pitch)
}
