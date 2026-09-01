import { useEffect, useRef } from 'react'
import { bodyClip } from '../../features/voice/clips'
import { useLabStore } from '../../store/labStore'
import { useSimulationStore } from '../../store/simulationStore'
import { useUiStore } from '../../store/uiStore'
import { useVoiceStore } from '../../store/voiceStore'
import type { BodyId } from '../../types/planet'

export function VoiceHost() {
  const intro = useUiStore((s) => s.introVisible)
  const bodyId = useSimulationStore((s) => s.selectedBodyId)
  const prevBody = useRef<BodyId | null>(null)
  const introAsked = useRef(false)

  useEffect(() => {
    const unlock = (event: Event) => {
      const target = event.target instanceof Element ? event.target : null
      if (target?.closest('[data-voice-toggle]')) return
      const fromControl = Boolean(target?.closest('button, a, input, label'))
      useVoiceStore.getState().unlock(!fromControl)
    }
    window.addEventListener('pointerdown', unlock, true)
    window.addEventListener('keydown', unlock)
    return () => {
      window.removeEventListener('pointerdown', unlock, true)
      window.removeEventListener('keydown', unlock)
    }
  }, [])

  useEffect(() => {
    if (intro && !introAsked.current) {
      introAsked.current = true
      useVoiceStore.getState().request('intro-welcome', 'intro-lead')
    }
    if (!intro) introAsked.current = false
  }, [intro])

  useEffect(() => {
    if (
      bodyId &&
      bodyId !== prevBody.current &&
      !useLabStore.getState().activityId &&
      !useUiStore.getState().demoActive
    ) {
      useVoiceStore.getState().play(bodyClip(bodyId))
    }
    prevBody.current = bodyId
  }, [bodyId])

  return null
}
