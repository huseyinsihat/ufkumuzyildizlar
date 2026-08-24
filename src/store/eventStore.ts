import { create } from 'zustand'
import { getSelectableEvent, type AstroEventId } from '../content/astroEvents'
import { releaseEventTimeHold } from '../features/astroEvents/eventTimeHold'

interface EventState {
  activeEventId: AstroEventId | null
  selectedEventId: string | null
  startedAt: number
  selectEvent: (id: string | null) => void
  beginEvent: (id: AstroEventId, now: number) => void
  endActiveEvent: () => void
}

export function isInspectingEvent(selectedEventId: string | null, activeEventId: AstroEventId | null): boolean {
  if (!selectedEventId || !activeEventId) return false
  return getSelectableEvent(selectedEventId)?.visualId === activeEventId
}

export const useEventStore = create<EventState>((set) => ({
  activeEventId: null,
  selectedEventId: null,
  startedAt: 0,
  selectEvent: (id) => {
    if (id == null) releaseEventTimeHold()
    set({ selectedEventId: id })
  },
  beginEvent: (id, now) => set({ activeEventId: id, startedAt: now }),
  endActiveEvent: () => {
    releaseEventTimeHold()
    set({ activeEventId: null })
  },
}))
