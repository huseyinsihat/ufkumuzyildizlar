import { create } from 'zustand'
import type { AppPanel } from '../types/simulation'

export type AppMode = 'explore' | 'lab'

interface UiState {
  introVisible: boolean
  appMode: AppMode
  activePanel: AppPanel
  webglSupported: boolean
  use2dFallback: boolean
  demoActive: boolean
  demoStep: number
  leftOpen: boolean
  planetDrawerOpen: boolean
  starDrawerOpen: boolean
  sunChatOpen: boolean
  setIntroVisible: (visible: boolean) => void
  setAppMode: (mode: AppMode) => void
  setActivePanel: (panel: AppPanel) => void
  togglePanel: (panel: AppPanel) => void
  setWebglSupported: (supported: boolean) => void
  setUse2dFallback: (use2d: boolean) => void
  startDemo: () => void
  nextDemoStep: () => void
  stopDemo: () => void
  setLeftOpen: (open: boolean) => void
  setPlanetDrawerOpen: (open: boolean) => void
  setStarDrawerOpen: (open: boolean) => void
  openSunChat: () => void
  closeSunChat: () => void
  largeText: boolean
  setLargeText: (on: boolean) => void
}

export const useUiStore = create<UiState>((set, get) => ({
  introVisible: true,
  appMode: 'explore',
  activePanel: 'none',
  webglSupported: true,
  use2dFallback: false,
  demoActive: false,
  demoStep: 0,
  leftOpen: true,
  planetDrawerOpen: false,
  starDrawerOpen: false,
  sunChatOpen: false,
  largeText: false,
  setIntroVisible: (visible) => set({ introVisible: visible }),
  setAppMode: (mode) => set({ appMode: mode }),
  setActivePanel: (panel) =>
    set({
      activePanel: panel,
      planetDrawerOpen: false,
      starDrawerOpen: false,
      sunChatOpen: panel === 'none' ? get().sunChatOpen : false,
    }),
  togglePanel: (panel) => {
    const current = get().activePanel
    const next = current === panel ? 'none' : panel
    set({
      activePanel: next,
      planetDrawerOpen: false,
      starDrawerOpen: false,
      sunChatOpen: next === 'none' ? get().sunChatOpen : false,
    })
  },
  setWebglSupported: (supported) => set({ webglSupported: supported }),
  setUse2dFallback: (use2d) => set({ use2dFallback: use2d }),
  startDemo: () =>
    set({ demoActive: true, demoStep: 0, introVisible: false, activePanel: 'none', appMode: 'explore', sunChatOpen: false }),
  nextDemoStep: () => set({ demoStep: get().demoStep + 1 }),
  stopDemo: () => set({ demoActive: false, demoStep: 0 }),
  setLeftOpen: (open) => set({ leftOpen: open }),
  setPlanetDrawerOpen: (open) =>
    set({
      planetDrawerOpen: open,
      starDrawerOpen: open ? false : get().starDrawerOpen,
      activePanel: open ? 'none' : get().activePanel,
      sunChatOpen: open ? false : get().sunChatOpen,
    }),
  setStarDrawerOpen: (open) =>
    set({
      starDrawerOpen: open,
      planetDrawerOpen: open ? false : get().planetDrawerOpen,
      activePanel: open ? 'none' : get().activePanel,
      sunChatOpen: open ? false : get().sunChatOpen,
    }),
  openSunChat: () =>
    set({ sunChatOpen: true, planetDrawerOpen: false, starDrawerOpen: false, activePanel: 'none' }),
  closeSunChat: () => set({ sunChatOpen: false }),
  setLargeText: (on) => set({ largeText: on }),
}))
