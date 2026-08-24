import { useEffect } from 'react'
import { useEventStore } from '../../store/eventStore'
import { useLabStore } from '../../store/labStore'
import { useUiStore } from '../../store/uiStore'
import { createAstroEventScheduler } from './scheduler'

export function useAstroEventScheduler(): void {
  useEffect(() => {
    const scheduler = createAstroEventScheduler()
    let frame = 0

    const loop = (now: number) => {
      const ui = useUiStore.getState()
      const lab = useLabStore.getState()
      const enabled =
        ui.appMode === 'explore' &&
        !ui.introVisible &&
        !ui.demoActive &&
        !lab.activityId &&
        !lab.labOpen
      scheduler.tick(now, enabled, useEventStore.getState())
      frame = requestAnimationFrame(loop)
    }

    frame = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(frame)
      useEventStore.getState().endActiveEvent()
    }
  }, [])
}
