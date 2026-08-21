import { create } from 'zustand'
import type { BodyId } from '../types/planet'
import type { ScaleMode } from '../types/simulation'
import { TimeEngine } from '../astronomy/timeEngine'
import { normalizeScaleMode } from '../astronomy/visualScale'

const engine = new TimeEngine()

interface SimulationState {
  simulationTimeMs: number
  displayedTimeMs: number
  timeScale: number
  playing: boolean
  direction: 1 | -1
  scaleMode: ScaleMode
  showOrbits: boolean
  showConstellations: boolean
  showAxes: boolean
  showLabels: boolean
  selectedBodyId: BodyId | null
  selectedWonderId: string | null
  compareA: BodyId
  compareB: BodyId
  freezeRotation: boolean
  freezeRevolution: boolean
  skyCamera: boolean
  cityPinsVisible: boolean
  moonDragEnabled: boolean
  setPlaying: (playing: boolean) => void
  togglePlaying: () => void
  setTimeScale: (scale: number) => void
  setDirection: (direction: 1 | -1) => void
  setScaleMode: (mode: ScaleMode) => void
  setShowOrbits: (show: boolean) => void
  setShowConstellations: (show: boolean) => void
  setShowAxes: (show: boolean) => void
  setShowLabels: (show: boolean) => void
  selectBody: (id: BodyId | null) => void
  selectWonder: (id: string | null) => void
  setCompare: (a: BodyId, b: BodyId) => void
  setFreezeRotation: (value: boolean) => void
  setFreezeRevolution: (value: boolean) => void
  setSkyCamera: (value: boolean) => void
  setCityPinsVisible: (value: boolean) => void
  setMoonDragEnabled: (value: boolean) => void
  goNowRealtime: () => void
  setNow: () => void
  addYears: (years: number) => void
  addDays: (days: number) => void
  setDateParts: (parts: { year: number; month: number; day: number; hour: number; minute: number }) => void
  tickFromScene: (timeMs: number) => void
  pushDisplayedTime: (timeMs: number) => void
  getEngine: () => TimeEngine
}

export const useSimulationStore = create<SimulationState>((set) => ({
  simulationTimeMs: engine.simulationTimeMs,
  displayedTimeMs: engine.simulationTimeMs,
  timeScale: engine.scale,
  playing: engine.playing,
  direction: engine.direction,
  scaleMode: 'educational',
  showOrbits: true,
  showConstellations: false,
  showAxes: false,
  showLabels: true,
  selectedBodyId: null,
  selectedWonderId: null,
  compareA: 'earth',
  compareB: 'mars',
  freezeRotation: false,
  freezeRevolution: false,
  skyCamera: false,
  cityPinsVisible: false,
  moonDragEnabled: false,
  setPlaying: (playing) => {
    engine.playing = playing
    set({ playing })
  },
  togglePlaying: () => {
    engine.playing = !engine.playing
    set({ playing: engine.playing })
  },
  setTimeScale: (scale) => {
    engine.scale = scale
    set({ timeScale: scale })
  },
  setDirection: (direction) => {
    engine.direction = direction
    set({ direction })
  },
  setScaleMode: (mode) => set({ scaleMode: normalizeScaleMode(mode) }),
  setShowOrbits: (show) => set({ showOrbits: show }),
  setShowConstellations: (show) => set({ showConstellations: show }),
  setShowAxes: (show) => set({ showAxes: show }),
  setShowLabels: (show) => set({ showLabels: show }),
  selectBody: (id) => set({ selectedBodyId: id, selectedWonderId: null }),
  selectWonder: (id) => set({ selectedWonderId: id, selectedBodyId: null }),
  setCompare: (a, b) => set({ compareA: a, compareB: b }),
  setFreezeRotation: (value) => set({ freezeRotation: value }),
  setFreezeRevolution: (value) => set({ freezeRevolution: value }),
  setSkyCamera: (value) => set({ skyCamera: value }),
  setCityPinsVisible: (value) => set({ cityPinsVisible: value }),
  setMoonDragEnabled: (value) => set({ moonDragEnabled: value }),
  goNowRealtime: () => {
    engine.setNow()
    engine.scale = 1
    set({
      simulationTimeMs: engine.simulationTimeMs,
      displayedTimeMs: engine.simulationTimeMs,
      timeScale: 1,
    })
  },
  setNow: () => {
    engine.setNow()
    set({ simulationTimeMs: engine.simulationTimeMs, displayedTimeMs: engine.simulationTimeMs })
  },
  addYears: (years) => {
    engine.addYears(years)
    set({ simulationTimeMs: engine.simulationTimeMs, displayedTimeMs: engine.simulationTimeMs })
  },
  addDays: (days) => {
    engine.addDays(days)
    set({ simulationTimeMs: engine.simulationTimeMs, displayedTimeMs: engine.simulationTimeMs })
  },
  setDateParts: ({ year, month, day, hour, minute }) => {
    const date = new Date(year, month - 1, day, hour, minute, 0, 0)
    engine.setDate(date)
    set({ simulationTimeMs: engine.simulationTimeMs, displayedTimeMs: engine.simulationTimeMs })
  },
  tickFromScene: (timeMs) => {
    engine.simulationTimeMs = timeMs
    set({ simulationTimeMs: timeMs })
  },
  pushDisplayedTime: (timeMs) => set({ displayedTimeMs: timeMs }),
  getEngine: () => engine,
}))
