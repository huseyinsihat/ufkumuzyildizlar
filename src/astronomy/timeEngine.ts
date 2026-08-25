import { DAY_MS, HOUR_S, TROPICAL_YEAR_DAYS } from './astronomyConstants'

export const SECOND_SCALE = 1
export const HOUR_SCALE = HOUR_S
export const DAY_SCALE = 86_400
export const YEAR_SCALE = DAY_SCALE * TROPICAL_YEAR_DAYS

/** Kid-facing speeds: 1 real second equals 1 second, hour, day, then year. */
export const TIME_LADDER = [
  { id: '1', label: '1 Sn', shortLabel: '1s', fullLabel: '1 sn/sn', scale: SECOND_SCALE },
  { id: 'hour', label: '1 Saat', shortLabel: '1sa', fullLabel: '1 saat/sn', scale: HOUR_SCALE },
  { id: 'day', label: '1 Gün', shortLabel: '1g', fullLabel: '1 gün/sn', scale: DAY_SCALE },
  { id: 'year', label: '1 Yıl', shortLabel: '1y', fullLabel: '1 yıl/sn', scale: YEAR_SCALE },
] as const

export const TIME_PRESETS = [
  { id: '1', label: '1 sn/sn', scale: SECOND_SCALE },
  { id: '10', label: '10×', scale: 10 },
  { id: '100', label: '100×', scale: 100 },
  { id: '1000', label: '1.000×', scale: 1_000 },
  { id: 'hour', label: '1 saat/sn', scale: HOUR_SCALE },
  { id: '10000', label: '10.000×', scale: 10_000 },
  { id: 'day', label: '1 gün/sn', scale: DAY_SCALE },
  { id: 'year', label: '1 yıl/sn', scale: YEAR_SCALE },
] as const

export type LabWatchKind =
  | 'earthYear'
  | 'mercuryRace'
  | 'mercuryYear'
  | 'mercuryDay'
  | 'dayNight'
  | 'skySpin'
  | 'kepler'

const MERCURY_YEAR_DAYS = 87.969
const MERCURY_SOLAR_DAY_DAYS = 175.94

/** Simulation seconds per real second so kids can actually watch the motion. */
export function labWatchScale(kind: LabWatchKind): number {
  if (kind === 'earthYear') return YEAR_SCALE / 10
  if (kind === 'mercuryRace') return (MERCURY_YEAR_DAYS * DAY_SCALE) / 8
  if (kind === 'mercuryYear') return (MERCURY_YEAR_DAYS * DAY_SCALE) / 10
  if (kind === 'mercuryDay') return (MERCURY_SOLAR_DAY_DAYS * DAY_SCALE) / 16
  if (kind === 'dayNight') return HOUR_SCALE
  if (kind === 'skySpin') return DAY_SCALE / 10
  return (MERCURY_YEAR_DAYS * DAY_SCALE) / 20
}

export function timeScaleFromLadder(t: number): number {
  const u = Math.min(1, Math.max(0, t))
  const last = TIME_LADDER.length - 1
  const x = u * last
  const i = Math.min(last - 1, Math.floor(x))
  const f = x - i
  const a = TIME_LADDER[i].scale
  const b = TIME_LADDER[i + 1].scale
  return a * (b / a) ** f
}

export class TimeEngine {
  simulationTimeMs: number
  scale: number
  playing: boolean
  direction: 1 | -1

  constructor(startMs = Date.now()) {
    this.simulationTimeMs = startMs
    this.scale = DAY_SCALE
    this.playing = true
    this.direction = 1
  }

  step(dtSec: number): number {
    if (this.playing) {
      this.simulationTimeMs += dtSec * this.scale * this.direction * 1000
    }
    return this.simulationTimeMs
  }

  setNow(): void {
    this.simulationTimeMs = Date.now()
  }

  setDate(date: Date): void {
    this.simulationTimeMs = date.getTime()
  }

  addDays(days: number): void {
    this.simulationTimeMs += days * DAY_MS
  }

  addYears(years: number): void {
    this.simulationTimeMs += years * TROPICAL_YEAR_DAYS * DAY_MS
  }
}
