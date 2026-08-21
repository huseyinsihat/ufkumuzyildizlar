import { getScene } from '../../scene/sceneApi'
import { useEducationStore } from '../../store/educationStore'
import { useSimulationStore } from '../../store/simulationStore'
import { useUiStore } from '../../store/uiStore'
import { DEMO_STEPS } from '../../content/team'
import type { BodyId } from '../../types/planet'

export function focusBody(id: BodyId): void {
  useSimulationStore.getState().selectBody(id)
  useEducationStore.getState().notifySelection(id)
  useUiStore.getState().setActivePanel('info')
  getScene()?.focusBody(id)
}

export function lookAtSolarSystem(): void {
  useSimulationStore.getState().selectBody(null)
  getScene()?.focusOverview()
}

export function runDemoAction(step: number): void {
  const action = DEMO_STEPS[step]?.action
  const sim = useSimulationStore.getState()
  if (action === 'overview') lookAtSolarSystem()
  if (action === 'earth') focusBody('earth')
  if (action === 'tilt') {
    sim.setShowAxes(true)
    focusBody('earth')
    useEducationStore.getState().notifyAxesVisible(true, 'earth')
  }
  if (action === 'year') {
    sim.addYears(1)
    useEducationStore.getState().notifyTimeAdvanceDays(365)
  }
  if (action === 'compare') {
    sim.setCompare('earth', 'mars')
    useUiStore.getState().setActivePanel('compare')
  }
  if (action === 'saturn') focusBody('saturn')
}

export function applyExploreTarget(id: BodyId | undefined): void {
  if (id) focusBody(id)
}
