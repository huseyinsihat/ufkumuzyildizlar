import { HOUR_SCALE } from '../../astronomy/timeEngine'
import { useSimulationStore } from '../../store/simulationStore'

let hold: { weFroze: boolean } | null = null

export function shouldHoldRevolution(timeScale: number): boolean {
  return timeScale > HOUR_SCALE
}

export function beginEventTimeHold(): void {
  if (hold) return
  const sim = useSimulationStore.getState()
  if (!shouldHoldRevolution(sim.timeScale) || sim.freezeRevolution) {
    hold = { weFroze: false }
    return
  }
  sim.setFreezeRevolution(true)
  hold = { weFroze: true }
}

export function releaseEventTimeHold(): void {
  if (!hold) return
  const weFroze = hold.weFroze
  hold = null
  if (!weFroze) return
  const sim = useSimulationStore.getState()
  if (sim.freezeRevolution) sim.setFreezeRevolution(false)
}

export function resetEventTimeHold(): void {
  hold = null
}
