import { create } from 'zustand'
import type { LabActivityId, LabRoomId, LabStep } from '../types/lab'
import { useSimulationStore } from './simulationStore'
import { getScene } from '../scene/sceneApi'
import { TIME_PRESETS } from '../astronomy/timeEngine'

interface LabState {
  labOpen: boolean
  room: LabRoomId | null
  activityId: LabActivityId | null
  step: LabStep
  prediction: string | null
  completed: LabActivityId[]
  missionIndex: number
  yearTours: { id: string; name: string; tours: number }[]
  raceWinner: string | null
  moonPhaseDeg: number
  lightProgress: number
  lightSeconds: number
  lightArrived: boolean
  mercuryYear: number
  mercuryDay: number
  openLab: () => void
  closeLab: () => void
  setRoom: (room: LabRoomId | null) => void
  startActivity: (id: LabActivityId) => void
  setStep: (step: LabStep) => void
  setPrediction: (id: string) => void
  completeActivity: () => void
  setYearTours: (rows: { id: string; name: string; tours: number }[]) => void
  setRaceWinner: (id: string | null) => void
  setMoonPhaseDeg: (deg: number) => void
  setMissionIndex: (index: number) => void
  setLightProgress: (progress: number, seconds: number) => void
  setLightArrived: (arrived: boolean) => void
  setMercuryBars: (year: number, day: number) => void
  resetActivityScene: () => void
}

function applyActivityScene(id: LabActivityId): void {
  const sim = useSimulationStore.getState()
  const scene = getScene()
  sim.setFreezeRotation(false)
  sim.setFreezeRevolution(false)
  sim.setSkyCamera(false)
  sim.setCityPinsVisible(false)
  sim.setMoonDragEnabled(false)
  sim.setScaleMode('educational')
  sim.setPlaying(false)
  scene?.clearWatches()

  if (id === 'earth-year' || id === 'who-faster') {
    sim.setShowOrbits(true)
    scene?.focusOverview()
  }
  if (id === 'spin-vs-orbit' || id === 'day-night') {
    sim.selectBody('earth')
    scene?.focusBody('earth')
    if (id === 'day-night') {
      sim.setCityPinsVisible(true)
      scene?.focusEarthSurface()
    }
  }
  if (id === 'real-scale') {
    scene?.focusOverview()
  }
  if (id === 'moon-phases') {
    sim.setMoonDragEnabled(true)
    sim.selectBody('moon')
    scene?.focusBody('earth')
  }
  if (id === 'stars-or-earth') {
    sim.setSkyCamera(true)
    scene?.enterSkyView()
  }
  if (id === 'light-travel') {
    sim.setShowOrbits(true)
    scene?.focusOverview()
  }
  if (id === 'seasons-tilt') {
    sim.selectBody('earth')
    sim.setShowAxes(true)
    scene?.setSeasonDemo(true, 'jan')
  }
  if (id === 'closest-hottest') {
    sim.selectBody('venus')
    scene?.setHeatCompare(true)
  }
  if (id === 'comet-tail') {
    sim.setShowOrbits(true)
    scene?.setCometDemo(true)
  }
  if (id === 'mercury-long-day') {
    sim.selectBody('mercury')
    sim.setShowOrbits(true)
    scene?.focusBody('mercury')
  }
}

export const useLabStore = create<LabState>((set, get) => ({
  labOpen: false,
  room: null,
  activityId: null,
  step: 'predict',
  prediction: null,
  completed: [],
  missionIndex: 0,
  yearTours: [],
  raceWinner: null,
  moonPhaseDeg: 0,
  lightProgress: 0,
  lightSeconds: 499,
  lightArrived: false,
  mercuryYear: 0,
  mercuryDay: 0,
  openLab: () => set({ labOpen: true, activityId: null, room: null, step: 'predict' }),
  closeLab: () => {
    get().resetActivityScene()
    set({ labOpen: false, activityId: null, room: null, step: 'predict', prediction: null })
  },
  setRoom: (room) => set({ room, activityId: null, step: 'predict', prediction: null }),
  startActivity: (id) => {
    applyActivityScene(id)
    set({
      activityId: id,
      step: 'simulate',
      prediction: null,
      raceWinner: null,
      lightProgress: 0,
      lightArrived: false,
      mercuryYear: 0,
      mercuryDay: 0,
    })
  },
  setStep: (step) => set({ step }),
  setPrediction: (id) => set({ prediction: id }),
  completeActivity: () => {
    const { activityId, completed } = get()
    if (!activityId) return
    const already = completed.includes(activityId)
    set({
      step: 'explain',
      completed: already ? completed : [...completed, activityId],
    })
  },
  setYearTours: (rows) => set({ yearTours: rows }),
  setRaceWinner: (id) => set({ raceWinner: id }),
  setMoonPhaseDeg: (deg) => set({ moonPhaseDeg: deg }),
  setMissionIndex: (index) => set({ missionIndex: index }),
  setLightProgress: (progress, seconds) => set({ lightProgress: progress, lightSeconds: seconds }),
  setLightArrived: (arrived) => set({ lightArrived: arrived }),
  setMercuryBars: (year, day) => set({ mercuryYear: year, mercuryDay: day }),
  resetActivityScene: () => {
    const sim = useSimulationStore.getState()
    sim.setFreezeRotation(false)
    sim.setFreezeRevolution(false)
    sim.setSkyCamera(false)
    sim.setCityPinsVisible(false)
    sim.setMoonDragEnabled(false)
    sim.setShowAxes(false)
    sim.setScaleMode('educational')
    sim.setTimeScale(TIME_PRESETS[5]?.scale ?? 86_400)
    sim.setPlaying(true)
    getScene()?.clearWatches()
    getScene()?.focusOverview()
  },
}))
