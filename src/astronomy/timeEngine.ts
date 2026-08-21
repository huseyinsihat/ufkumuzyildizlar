import { DAY_MS, TROPICAL_YEAR_DAYS } from './astronomyConstants'

export const TIME_PRESETS = [
  { id: '1', label: '1×', scale: 1 },
  { id: '10', label: '10×', scale: 10 },
  { id: '100', label: '100×', scale: 100 },
  { id: '1000', label: '1.000×', scale: 1_000 },
  { id: '10000', label: '10.000×', scale: 10_000 },
  { id: 'day', label: '1 gün/sn', scale: 86_400 },
  { id: 'year', label: '1 yıl/sn', scale: 86_400 * TROPICAL_YEAR_DAYS },
] as const

export class TimeEngine {
  simulationTimeMs: number
  scale: number
  playing: boolean
  direction: 1 | -1

  constructor(startMs = Date.now()) {
    this.simulationTimeMs = startMs
    this.scale = 86_400
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
