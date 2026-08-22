import { describe, expect, it } from 'vitest'
import { useUiStore } from './uiStore'

describe('ui overlays', () => {
  it('keeps one overlay family open at a time', () => {
    useUiStore.setState({
      activePanel: 'none',
      planetDrawerOpen: false,
      starDrawerOpen: false,
      sunChatOpen: false,
    })

    useUiStore.getState().openSunChat()
    expect(useUiStore.getState().sunChatOpen).toBe(true)

    useUiStore.getState().setPlanetDrawerOpen(true)
    expect(useUiStore.getState().planetDrawerOpen).toBe(true)
    expect(useUiStore.getState().sunChatOpen).toBe(false)

    useUiStore.getState().setActivePanel('facts')
    expect(useUiStore.getState().activePanel).toBe('facts')
    expect(useUiStore.getState().planetDrawerOpen).toBe(false)
    expect(useUiStore.getState().sunChatOpen).toBe(false)
  })
})
