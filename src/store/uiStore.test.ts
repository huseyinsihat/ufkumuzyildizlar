import { describe, expect, it } from 'vitest'
import { useLabStore } from './labStore'
import { useUiStore } from './uiStore'

describe('ui overlays', () => {
  it('keeps one overlay family open at a time', () => {
    useUiStore.setState({
      activePanel: 'none',
      planetDrawerOpen: false,
      starDrawerOpen: false,
      eventDrawerOpen: false,
      dockMoreOpen: false,
      sunChatOpen: false,
    })

    useUiStore.getState().openSunChat()
    expect(useUiStore.getState().sunChatOpen).toBe(true)

    useUiStore.getState().setPlanetDrawerOpen(true)
    expect(useUiStore.getState().planetDrawerOpen).toBe(true)
    expect(useUiStore.getState().sunChatOpen).toBe(false)

    useUiStore.getState().setEventDrawerOpen(true)
    expect(useUiStore.getState().eventDrawerOpen).toBe(true)
    expect(useUiStore.getState().planetDrawerOpen).toBe(false)
    expect(useUiStore.getState().starDrawerOpen).toBe(false)

    useUiStore.getState().setStarDrawerOpen(true)
    expect(useUiStore.getState().starDrawerOpen).toBe(true)
    expect(useUiStore.getState().eventDrawerOpen).toBe(false)

    useUiStore.getState().setActivePanel('facts')
    expect(useUiStore.getState().activePanel).toBe('facts')
    expect(useUiStore.getState().planetDrawerOpen).toBe(false)
    expect(useUiStore.getState().sunChatOpen).toBe(false)
    expect(useUiStore.getState().eventDrawerOpen).toBe(false)
    expect(useUiStore.getState().dockMoreOpen).toBe(false)
  })

  it('closes other overlays when the more sheet opens', () => {
    useUiStore.setState({
      activePanel: 'facts',
      planetDrawerOpen: true,
      dockMoreOpen: false,
      sunChatOpen: false,
    })
    useUiStore.getState().setDockMoreOpen(true)
    expect(useUiStore.getState().dockMoreOpen).toBe(true)
    expect(useUiStore.getState().planetDrawerOpen).toBe(false)
    expect(useUiStore.getState().activePanel).toBe('none')
  })
})

describe('lab and compare exclusivity', () => {
  it('closes compare when lab opens', () => {
    useUiStore.setState({ activePanel: 'compare' })
    useLabStore.getState().openLab()
    expect(useUiStore.getState().activePanel).toBe('none')
    expect(useLabStore.getState().labOpen).toBe(true)
  })

  it('closes compare when an activity starts', () => {
    useUiStore.setState({ activePanel: 'compare' })
    useLabStore.getState().startActivity('who-faster')
    expect(useUiStore.getState().activePanel).toBe('none')
  })
})
