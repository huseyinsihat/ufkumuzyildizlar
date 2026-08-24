import { DAY_MS } from '../astronomy/astronomyConstants'

interface Shower {
  /** Peak day of year (1 = Jan 1), UTC. */
  peak: number
  /** Days from peak to ~zero. */
  width: number
  strength: number
}

/** Major annual showers. Peaks are calendar-true; motion still follows sim time. */
const SHOWERS: Shower[] = [
  { peak: 3.5, width: 1.8, strength: 0.85 },
  { peak: 112, width: 3, strength: 0.45 },
  { peak: 224.5, width: 5, strength: 1 },
  { peak: 294, width: 4, strength: 0.5 },
  { peak: 321, width: 2.5, strength: 0.55 },
  { peak: 348, width: 4, strength: 0.95 },
]

const YEAR = 365.25
const SPORADIC = 0.08

function dayOfYearUtc(timeMs: number): number {
  const date = new Date(timeMs)
  const start = Date.UTC(date.getUTCFullYear(), 0, 1)
  return (timeMs - start) / DAY_MS + 1
}

function circularDelta(a: number, b: number, period = YEAR): number {
  let delta = Math.abs(a - b) % period
  if (delta > period / 2) delta = period - delta
  return delta
}

/** 0.08 on quiet nights, ~1 at Perseid/Geminid peak. */
export function meteorShowerIntensity(timeMs: number): number {
  const day = dayOfYearUtc(timeMs)
  let peak = 0
  for (const shower of SHOWERS) {
    const t = Math.max(0, 1 - circularDelta(day, shower.peak) / shower.width)
    peak = Math.max(peak, t * t * shower.strength)
  }
  return SPORADIC + peak * (1 - SPORADIC)
}
