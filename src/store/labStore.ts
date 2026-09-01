import { create } from 'zustand'
import type { LabActivityId, LabRoomId, LabStep } from '../types/lab'
import { useSimulationStore } from './simulationStore'
import { TIME_PRESETS, labWatchScale } from '../astronomy/timeEngine'
import { getScene } from '../scene/sceneApi'
import { useEducationStore } from './educationStore'
import { useUiStore } from './uiStore'
import { getActivity, isCorrectLabChoice } from '../content/labActivities'
import { activityClip, roomClip } from '../features/voice/clips'
import { useVoiceStore } from './voiceStore'
import type { BodyId } from '../types/planet'

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
  kidMassKg: number
  huntStars: string[]
  arrangePick: BodyId | null
  eclipseKind: 'none' | 'solar' | 'lunar'
  cometMoved: boolean
  openLab: () => void
  closeLab: () => void
  leaveLab: () => void
  setRoom: (room: LabRoomId | null) => void
  startActivity: (id: LabActivityId) => void
  setStep: (step: LabStep) => void
  setPrediction: (id: string) => void
  completeActivity: () => void
  resetProgress: () => void
  setYearTours: (rows: { id: string; name: string; tours: number }[]) => void
  setRaceWinner: (id: string | null) => void
  setMoonPhaseDeg: (deg: number) => void
  setMissionIndex: (index: number) => void
  setLightProgress: (progress: number, seconds: number) => void
  setLightArrived: (arrived: boolean) => void
  setMercuryBars: (year: number, day: number) => void
  setKidMassKg: (kg: number) => void
  addHuntStar: (id: string) => void
  setArrangePick: (id: BodyId | null) => void
  setEclipseKind: (kind: 'none' | 'solar' | 'lunar') => void
  setCometMoved: (moved: boolean) => void
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
  if (id === 'kepler-pizza') {
    sim.setShowOrbits(true)
    sim.selectBody('mercury')
    scene?.setKeplerOverlay('mercury', true)
    scene?.focusBody('mercury')
    sim.setTimeScale(labWatchScale('kepler'))
    sim.setPlaying(true)
  }
  if (id === 'spin-vs-orbit' || id === 'day-night') {
    sim.selectBody('earth')
    scene?.focusBody('earth')
    if (id === 'spin-vs-orbit') {
      scene?.focusEarthSurface()
      sim.setTimeScale(labWatchScale('dayNight'))
      sim.setPlaying(true)
    }
    if (id === 'day-night') {
      sim.setCityPinsVisible(true)
      sim.setFreezeRevolution(true)
      sim.setFreezeRotation(false)
      sim.setTimeScale(labWatchScale('dayNight'))
      sim.setPlaying(true)
      scene?.focusEarthSurface()
    }
  }
  if (id === 'real-scale') {
    scene?.focusOverview()
  }
  if (id === 'moon-phases' || id === 'eclipse-align') {
    sim.setMoonDragEnabled(true)
    sim.selectBody('moon')
    scene?.focusBody('earth')
    if (id === 'eclipse-align') scene?.setUmbra(true)
  }
  if (id === 'stars-or-earth') {
    sim.setSkyCamera(true)
    scene?.enterSkyView()
    sim.setTimeScale(labWatchScale('skySpin'))
    sim.setPlaying(false)
  }
  if (id === 'star-names') {
    sim.setSkyCamera(false)
    scene?.focusWonder('sirius')
  }
  if (id === 'light-travel' || id === 'light-diary') {
    sim.setShowOrbits(true)
    scene?.focusOverview()
  }
  if (id === 'seasons-tilt') {
    sim.selectBody('earth')
    sim.setShowAxes(true)
    sim.setFreezeRevolution(true)
    sim.setPlaying(false)
    scene?.setSeasonDemo(true, 'jan')
  }
  if (id === 'closest-hottest') {
    sim.selectBody('venus')
    scene?.focusOverview()
  }
  if (id === 'space-mission') {
    sim.selectBody('mars')
    sim.setShowOrbits(true)
    scene?.focusBody('mars')
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
  if (id === 'drop-ball' || id === 'jump' || id === 'mass-weight') {
    scene?.startSurfaceLab(id === 'drop-ball' ? 'drop' : id === 'jump' ? 'jump' : 'weight')
  }
  if (id === 'arrange-orbits') {
    sim.setShowOrbits(true)
    scene?.focusOverview()
    scene?.setArrangeMode(true)
  }
  if (id === 'ursa-hunt') {
    sim.setShowConstellations(true)
    sim.setSkyCamera(true)
    scene?.enterSkyView()
    scene?.selectConstellation('ursa-major')
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
  kidMassKg: 30,
  huntStars: [],
  arrangePick: null,
  eclipseKind: 'none',
  cometMoved: false,
  openLab: () => {
    useUiStore.getState().setActivePanel('none')
    set({ labOpen: true, activityId: null, room: null, step: 'predict' })
  },
  closeLab: () => {
    get().resetActivityScene()
    get().leaveLab()
  },
  leaveLab: () => {
    getScene()?.clearWow()
    getScene()?.clearWatches()
    set({ labOpen: false, activityId: null, room: null, step: 'predict', prediction: null })
  },
  setRoom: (room) => {
    set({ room, activityId: null, step: 'predict', prediction: null })
    if (room) useVoiceStore.getState().play(roomClip(room))
  },
  startActivity: (id) => {
    useUiStore.getState().setActivePanel('none')
    const activity = getActivity(id)
    set({
      activityId: id,
      step: activity.choices ? 'predict' : 'simulate',
      prediction: null,
      raceWinner: null,
      lightProgress: 0,
      lightArrived: false,
      mercuryYear: 0,
      mercuryDay: 0,
      moonPhaseDeg: 0,
      huntStars: [],
      arrangePick: null,
      eclipseKind: 'none',
      cometMoved: false,
      missionIndex: 0,
    })
    applyActivityScene(id)
    const hint = activityClip(id)
    if (hint) useVoiceStore.getState().play(hint)
    else if (activity.choices) useVoiceStore.getState().play('lab-predict')
    else useVoiceStore.getState().play('lab-watch')
  },
  setStep: (step) => set({ step }),
  setPrediction: (id) => {
    const activityId = get().activityId
    set({ prediction: id, step: 'simulate' })
    if (activityId) {
      const correct = isCorrectLabChoice(activityId, id)
      if (correct !== undefined) useVoiceStore.getState().playSfx(correct ? 'correct' : 'wrong')
    }
    useVoiceStore.getState().play('lab-watch')
  },
  completeActivity: () => {
    const { activityId, completed } = get()
    if (!activityId) return
    const already = completed.includes(activityId)
    set({
      step: 'explain',
      completed: already ? completed : [...completed, activityId],
    })
    useEducationStore.getState().unlockForLab(activityId)
    useVoiceStore.getState().play('lab-why')
  },
  resetProgress: () => {
    get().resetActivityScene()
    set({
      completed: [],
      activityId: null,
      room: null,
      step: 'predict',
      prediction: null,
      missionIndex: 0,
      yearTours: [],
      raceWinner: null,
      moonPhaseDeg: 0,
      lightProgress: 0,
      lightArrived: false,
      mercuryYear: 0,
      mercuryDay: 0,
      huntStars: [],
      arrangePick: null,
      eclipseKind: 'none',
      cometMoved: false,
    })
  },
  setYearTours: (rows) => set({ yearTours: rows }),
  setRaceWinner: (id) => set({ raceWinner: id }),
  setMoonPhaseDeg: (deg) => set({ moonPhaseDeg: deg }),
  setMissionIndex: (index) => set({ missionIndex: index }),
  setLightProgress: (progress, seconds) => set({ lightProgress: progress, lightSeconds: seconds }),
  setLightArrived: (arrived) => set({ lightArrived: arrived }),
  setMercuryBars: (year, day) => set({ mercuryYear: year, mercuryDay: day }),
  setKidMassKg: (kg) => {
    const next = Math.min(80, Math.max(10, kg))
    set({ kidMassKg: next })
    getScene()?.setSurfaceKidMass(next)
  },
  addHuntStar: (id) =>
    set((state) => ({ huntStars: state.huntStars.includes(id) ? state.huntStars : [...state.huntStars, id] })),
  setArrangePick: (id) => set({ arrangePick: id }),
  setEclipseKind: (kind) => set({ eclipseKind: kind }),
  setCometMoved: (moved) => set({ cometMoved: moved }),
  resetActivityScene: () => {
    const sim = useSimulationStore.getState()
    sim.setFreezeRotation(false)
    sim.setFreezeRevolution(false)
    sim.setSkyCamera(false)
    sim.setCityPinsVisible(false)
    sim.setMoonDragEnabled(false)
    sim.setShowAxes(false)
    sim.setScaleMode('educational')
    sim.setTimeScale(TIME_PRESETS.find((item) => item.id === 'day')?.scale ?? 86_400)
    sim.setPlaying(true)
    getScene()?.clearWatches()
    getScene()?.selectConstellation(null)
    getScene()?.focusOverview()
    set({
      kidMassKg: 30,
      raceWinner: null,
      lightProgress: 0,
      lightArrived: false,
      mercuryYear: 0,
      mercuryDay: 0,
      cometMoved: false,
      eclipseKind: 'none',
    })
  },
}))
