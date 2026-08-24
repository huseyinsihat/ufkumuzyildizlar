import type { BodyId } from './planet'

export type ScaleMode = 'educational' | 'trueScale'

export type AppPanel =
  | 'none'
  | 'info'
  | 'education'
  | 'explore'
  | 'compare'
  | 'settings'
  | 'team'
  | 'hardware'
  | 'facts'
  | 'scale'
  | 'missions'
  | 'quiz'

export interface SimulationSnapshot {
  simulationTimeMs: number
  timeScale: number
  playing: boolean
  scaleMode: ScaleMode
  showOrbits: boolean
  showConstellations: boolean
  showAxes: boolean
  selectedBodyId: BodyId | null
}

export interface Vec3 {
  x: number
  y: number
  z: number
}
