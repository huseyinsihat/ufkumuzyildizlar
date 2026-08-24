import { describe, expect, it } from 'vitest'
import { useEducationStore } from './educationStore'
import { useSimulationStore } from './simulationStore'

describe('education missions', () => {
  it('completes the earth-year mission after a 1-year jump notify', () => {
    useEducationStore.setState({
      activeMissionId: 'earth-year',
      completedMissions: [],
      score: 0,
      stars: 0,
    })
    useEducationStore.getState().notifyTimeAdvanceDays(365)
    expect(useEducationStore.getState().completedMissions).toContain('earth-year')
  })

  it('completes the mars-orbit mission when Mars is selected while orbits are visible', () => {
    useSimulationStore.setState({ selectedBodyId: null, showOrbits: true })
    useEducationStore.setState({
      activeMissionId: 'find-mars-orbit',
      completedMissions: [],
      score: 0,
      stars: 0,
    })
    useEducationStore.getState().notifySelection('mars')
    expect(useEducationStore.getState().completedMissions).toContain('find-mars-orbit')
  })

  it('completes the mars-orbit mission when orbits turn on with Mars selected', () => {
    useSimulationStore.setState({ selectedBodyId: 'mars', showOrbits: true })
    useEducationStore.setState({
      activeMissionId: 'find-mars-orbit',
      completedMissions: [],
      score: 0,
      stars: 0,
    })
    useEducationStore.getState().notifyOrbitsVisible(true, 'mars')
    expect(useEducationStore.getState().completedMissions).toContain('find-mars-orbit')
  })

  it('hides labels and shows orbits when advancing to the mars-orbit mission', () => {
    useSimulationStore.setState({ showLabels: true, showOrbits: false, selectedBodyId: 'earth' })
    useEducationStore.setState({
      activeMissionId: 'find-earth',
      completedMissions: [],
      score: 0,
      stars: 0,
    })
    useEducationStore.getState().notifySelection('earth')
    expect(useEducationStore.getState().activeMissionId).toBe('find-mars-orbit')
    expect(useSimulationStore.getState().showLabels).toBe(false)
    expect(useSimulationStore.getState().showOrbits).toBe(true)
  })
})
