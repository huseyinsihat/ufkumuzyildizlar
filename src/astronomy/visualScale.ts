import type { BodyId } from '../types/planet'
import type { ScaleMode, Vec3 } from '../types/simulation'
import { tx, type AppLang } from '../i18n/types'
import { UI } from '../i18n/ui'
import { getBody } from './planetData'

/**
 * Maps real astronomical sizes/distances onto Three.js scene units.
 * Visual scale is never written back into planetData.
 */
export const EDU_RADIUS: Record<BodyId, number> = {
  sun: 8,
  mercury: 1.05,
  venus: 1.45,
  earth: 1.52,
  moon: 0.42,
  mars: 1.22,
  phobos: 0.14,
  deimos: 0.1,
  jupiter: 4.55,
  io: 0.32,
  europa: 0.28,
  ganymede: 0.42,
  callisto: 0.38,
  saturn: 3.9,
  titan: 0.44,
  uranus: 2.5,
  neptune: 2.42,
  pluto: 0.78,
}

/** Educational moon-orbit radii: outside the parent disk, siblings unstacked. */
const EDU_SAT_ORBIT: Partial<Record<BodyId, number>> = {
  moon: EDU_RADIUS.earth * 3.35,
  phobos: 1.25,
  deimos: 1.85,
  io: 5.6,
  europa: 7.2,
  ganymede: 9.2,
  callisto: 11.6,
  titan: 10.2,
}

const EDU_ORBIT_MIN = 16
const EDU_ORBIT_SPAN = 88
const LOG_AU_MIN = Math.log(0.387)
const LOG_AU_MAX = Math.log(39.5)

/** Scene units per AU in true-scale mode (planets become tiny). */
export const TRUE_SCALE_AU_UNITS = 7

export function normalizeScaleMode(mode: string): ScaleMode {
  if (mode === 'trueScale' || mode === 'proportional' || mode === 'astronomical') return 'trueScale'
  return 'educational'
}

export function isTrueScale(mode: ScaleMode): boolean {
  return mode === 'trueScale'
}

export function educationalOrbitRadius(au: number): number {
  const clamped = Math.max(au, 1e-6)
  const t = (Math.log(clamped) - LOG_AU_MIN) / (LOG_AU_MAX - LOG_AU_MIN)
  return EDU_ORBIT_MIN + Math.max(0, Math.min(1, t)) * EDU_ORBIT_SPAN
}

export function visualRadius(bodyId: BodyId, mode: ScaleMode): number {
  const body = getBody(bodyId)
  if (isTrueScale(mode)) {
    return (body.radiusKm / 149_597_870.7) * TRUE_SCALE_AU_UNITS
  }
  return EDU_RADIUS[bodyId]
}

export function visualMoonOrbitRadius(mode: ScaleMode = 'educational'): number {
  return visualSatelliteOrbitRadius('moon', mode)
}

export function visualSatelliteOrbitRadius(satelliteId: BodyId, mode: ScaleMode = 'educational'): number {
  const body = getBody(satelliteId)
  if (isTrueScale(mode)) return body.orbitalRadiusAu * TRUE_SCALE_AU_UNITS
  const packed = EDU_SAT_ORBIT[satelliteId]
  if (packed != null) return packed
  const parentId = body.parentId
  if (!parentId) return EDU_RADIUS.earth * 3.35
  return EDU_RADIUS[parentId] * 2.4
}

export function compressDistance(distanceAu: number, mode: ScaleMode): number {
  if (isTrueScale(mode)) {
    return distanceAu * TRUE_SCALE_AU_UNITS
  }
  return educationalOrbitRadius(distanceAu)
}

/** Convert heliocentric ecliptic AU into Y-up scene coordinates. */
export function auToScene(au: Vec3, mode: ScaleMode): Vec3 {
  const distance = Math.hypot(au.x, au.y, au.z)
  if (distance < 1e-12) {
    return { x: 0, y: 0, z: 0 }
  }
  const sceneDistance = compressDistance(distance, mode)
  const scale = sceneDistance / distance
  return {
    x: au.x * scale,
    y: au.z * scale,
    z: -au.y * scale,
  }
}

export function scaleExplanation(mode: ScaleMode, lang: AppLang = 'tr'): string {
  if (isTrueScale(mode)) return tx(lang, UI.trueScaleNote)
  return tx(lang, UI.eduScaleNote)
}
