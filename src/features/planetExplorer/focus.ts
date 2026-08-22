import { getBody } from '../../astronomy/planetData'
import { useHardwareStore } from '../../hardware/hardwareStore'
import { getScene } from '../../scene/sceneApi'
import { useEducationStore } from '../../store/educationStore'
import { useLabStore } from '../../store/labStore'
import { useSimulationStore } from '../../store/simulationStore'
import { useUiStore } from '../../store/uiStore'
import { useVoiceStore } from '../../store/voiceStore'
import { DEMO_STEPS } from '../../content/team'
import type { BodyId } from '../../types/planet'

export function onSunSelected(): void {
  if (useUiStore.getState().demoActive) return
  useVoiceStore.getState().play('body-sun')
}

export function askTheSun(): void {
  useUiStore.getState().openSunChat()
}

export function focusBody(id: BodyId): void {
  useSimulationStore.getState().selectBody(id)
  useEducationStore.getState().notifySelection(id)
  useUiStore.getState().setActivePanel('none')
  getScene()?.focusBody(id)
  const hex = getBody(id).color.replace('#', '')
  void useHardwareStore.getState().writeLine(`L:${hex}`)
  if (id === 'sun') onSunSelected()
}

export function lookAtSolarSystem(): void {
  useSimulationStore.getState().selectBody(null)
  getScene()?.focusOverview()
  if (useUiStore.getState().demoActive) return
  if (useLabStore.getState().activityId) return
  useVoiceStore.getState().play('ui-overview')
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
