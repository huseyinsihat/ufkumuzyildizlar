import { ASTRO_EVENTS, type AstroEventId } from '../../content/astroEvents'

export interface SchedulerOptions {
  firstDelayMinMs: number
  firstDelayMaxMs: number
  cooldownMinMs: number
  cooldownMaxMs: number
  random: () => number
}

export const DEFAULT_SCHEDULER_OPTIONS: SchedulerOptions = {
  firstDelayMinMs: 2_500,
  firstDelayMaxMs: 4_500,
  cooldownMinMs: 3_500,
  cooldownMaxMs: 7_000,
  random: Math.random,
}

const RECENT_LIMIT = 6

export function pickWeightedEvent(recent: readonly string[], random: () => number): AstroEventId {
  const blocked = new Set(recent.slice(-RECENT_LIMIT))
  const last = ASTRO_EVENTS.find((event) => event.id === recent[recent.length - 1])
  const lastKind = last?.kind
  const lastHost = last?.hostBodyId

  const notRecent = ASTRO_EVENTS.filter((event) => !blocked.has(event.id))
  const notKind = notRecent.filter((event) => event.kind !== lastKind)
  const notHost = notKind.filter((event) => event.hostBodyId !== lastHost)
  const choices =
    notHost.length > 0 ? notHost : notKind.length > 0 ? notKind : notRecent.length > 0 ? notRecent : [...ASTRO_EVENTS]

  const total = choices.reduce((sum, event) => sum + event.weight, 0)
  let ticket = random() * total
  for (const event of choices) {
    ticket -= event.weight
    if (ticket <= 0) return event.id
  }
  return choices[choices.length - 1].id
}

function between(min: number, max: number, random: () => number): number {
  return min + random() * (max - min)
}

export interface SchedulerSink {
  activeEventId?: AstroEventId | null
  selectedEventId?: string | null
  startedAt?: number
  beginEvent: (id: AstroEventId, now: number) => void
  endActiveEvent: () => void
}

export function createAstroEventScheduler(options: Partial<SchedulerOptions> = {}) {
  const opts = { ...DEFAULT_SCHEDULER_OPTIONS, ...options }
  let recent: AstroEventId[] = []
  let nextAt: number | null = null
  let first = true
  let current: { id: AstroEventId; endsAt: number } | null = null

  return {
    get activeId() {
      return current?.id ?? null
    },
    tick(now: number, enabled: boolean, sink: SchedulerSink): void {
      if (!enabled) {
        if (current) {
          sink.endActiveEvent()
          current = null
        }
        nextAt = null
        first = true
        return
      }

      if (sink.activeEventId && sink.activeEventId !== current?.id) {
        const event = ASTRO_EVENTS.find((item) => item.id === sink.activeEventId)
        if (event) {
          current = { id: event.id, endsAt: (sink.startedAt ?? now) + event.durationMs }
          nextAt = null
        }
      }

      if (current) {
        if (now >= current.endsAt) {
          sink.endActiveEvent()
          current = null
          nextAt = now + between(opts.cooldownMinMs, opts.cooldownMaxMs, opts.random)
        }
        return
      }

      if (sink.selectedEventId) return

      if (nextAt === null) {
        nextAt = now + between(
          first ? opts.firstDelayMinMs : opts.cooldownMinMs,
          first ? opts.firstDelayMaxMs : opts.cooldownMaxMs,
          opts.random,
        )
        first = false
        return
      }

      if (now < nextAt) return

      const id = pickWeightedEvent(recent, opts.random)
      const event = ASTRO_EVENTS.find((item) => item.id === id)
      if (!event) return
      sink.beginEvent(id, now)
      current = { id, endsAt: now + event.durationMs }
      recent = [...recent, id].slice(-RECENT_LIMIT)
      nextAt = null
    },
  }
}
