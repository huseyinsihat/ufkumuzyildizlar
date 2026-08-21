import { create } from 'zustand'
import type { BodyId } from '../types/planet'
import { MISSIONS } from '../content/missions'
import { useSimulationStore } from './simulationStore'

interface EducationState {
  score: number
  stars: number
  completedMissions: string[]
  unlockedBadges: string[]
  activeMissionId: string | null
  quizIndex: number
  quizScore: number
  startMission: (id: string) => void
  completeMission: (id: string) => void
  notifySelection: (bodyId: BodyId) => void
  notifyOrbitsVisible: (visible: boolean, selected: BodyId | null) => void
  notifyAxesVisible: (visible: boolean, selected: BodyId | null) => void
  notifyTimeAdvanceDays: (days: number) => void
  answerQuiz: (correct: boolean) => void
  resetQuiz: () => void
}

function unlockForMission(missionId: string, badges: string[]): string[] {
  const next = new Set(badges)
  if (missionId === 'find-earth') next.add('first-discovery')
  if (missionId === 'find-mars-orbit') next.add('orbit-master')
  if (missionId === 'find-jupiter') next.add('planet-expert')
  if (missionId === 'saturn-rings') next.add('planet-expert')
  if (missionId === 'earth-tilt') next.add('planet-expert')
  if (missionId === 'earth-year') next.add('solar-sage')
  if (missionId === 'find-mars') next.add('mars-explorer')
  return [...next]
}

export const useEducationStore = create<EducationState>((set, get) => ({
  score: 0,
  stars: 0,
  completedMissions: [],
  unlockedBadges: [],
  activeMissionId: MISSIONS[0]?.id ?? null,
  quizIndex: 0,
  quizScore: 0,
  startMission: (id) => set({ activeMissionId: id }),
  completeMission: (id) => {
    const state = get()
    if (state.completedMissions.includes(id)) {
      return
    }
    const mission = MISSIONS.find((item) => item.id === id)
    const points = mission?.points ?? 50
    const completed = [...state.completedMissions, id]
    const unlockedBadges = unlockForMission(id, state.unlockedBadges)
    if (completed.length >= MISSIONS.length) {
      unlockedBadges.push('solar-sage')
    }
    set({
      completedMissions: completed,
      score: state.score + points,
      stars: state.stars + 1,
      unlockedBadges: [...new Set(unlockedBadges)],
      activeMissionId: MISSIONS.find((item) => !completed.includes(item.id))?.id ?? id,
    })
  },
  notifySelection: (bodyId) => {
    const { activeMissionId, completeMission } = get()
    const sim = useSimulationStore.getState()
    if (activeMissionId === 'find-earth' && bodyId === 'earth') completeMission('find-earth')
    if (activeMissionId === 'find-jupiter' && bodyId === 'jupiter') completeMission('find-jupiter')
    if (activeMissionId === 'saturn-rings' && bodyId === 'saturn') completeMission('saturn-rings')
    if (activeMissionId === 'find-mars' && bodyId === 'mars') completeMission('find-mars')
    if (activeMissionId === 'find-mars-orbit' && bodyId === 'mars' && sim.showOrbits) {
      completeMission('find-mars-orbit')
    }
    if (activeMissionId === 'earth-tilt' && bodyId === 'earth' && sim.showAxes) {
      completeMission('earth-tilt')
    }
  },
  notifyOrbitsVisible: (visible, selected) => {
    const { activeMissionId, completeMission } = get()
    if (activeMissionId === 'find-mars-orbit' && visible && selected === 'mars') {
      completeMission('find-mars-orbit')
    }
  },
  notifyAxesVisible: (visible, selected) => {
    const { activeMissionId, completeMission } = get()
    if (activeMissionId === 'earth-tilt' && visible && selected === 'earth') {
      completeMission('earth-tilt')
    }
  },
  notifyTimeAdvanceDays: (days) => {
    const { activeMissionId, completeMission } = get()
    if (activeMissionId === 'earth-year' && days >= 360) {
      completeMission('earth-year')
    }
  },
  answerQuiz: (correct) => {
    set({
      quizIndex: get().quizIndex + 1,
      quizScore: get().quizScore + (correct ? 1 : 0),
      score: get().score + (correct ? 20 : 0),
    })
  },
  resetQuiz: () => set({ quizIndex: 0, quizScore: 0 }),
}))

