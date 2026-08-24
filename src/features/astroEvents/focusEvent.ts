import { getSelectableEvent } from '../../content/astroEvents'
import { getScene } from '../../scene/sceneApi'
import { useEventStore } from '../../store/eventStore'
import { useSimulationStore } from '../../store/simulationStore'
import { useUiStore } from '../../store/uiStore'
import { beginEventTimeHold } from './eventTimeHold'

export function shouldJumpToEvent(targetMs: number | undefined, simMs: number, nowMs: number): boolean {
  if (targetMs == null) return false
  if (targetMs <= nowMs) return false
  return simMs < targetMs
}

export function focusEvent(id: string): void {
  const event = getSelectableEvent(id)
  if (!event) return
  const ui = useUiStore.getState()
  ui.setActivePanel('none')
  ui.setEventDrawerOpen(false)
  const events = useEventStore.getState()
  events.selectEvent(id)
  events.beginEvent(event.visualId, performance.now())
  beginEventTimeHold()

  const sim = useSimulationStore.getState()
  if (shouldJumpToEvent(event.targetMs, sim.simulationTimeMs, Date.now()) && event.targetMs != null) {
    sim.setTimeMs(event.targetMs)
  }

  const scene = getScene()
  if (event.hostBodyId) scene?.focusBody(event.hostBodyId)
  else scene?.focusEventSky(event.visualId)
}
