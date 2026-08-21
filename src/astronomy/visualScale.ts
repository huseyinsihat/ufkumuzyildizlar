import type { BodyId } from '../types/planet'
import type { ScaleMode, Vec3 } from '../types/simulation'
import { getBody } from './planetData'

/**
 * Maps real astronomical sizes/distances onto Three.js scene units.
 * Visual scale is never written back into planetData.
 */
export const EDU_RADIUS: Record<BodyId, number> = {
  sun: 8,
  mercury: 0.72,
  venus: 1.12,
  earth: 1.18,
  moon: 0.34,
  mars: 0.86,
  jupiter: 4.15,
  saturn: 3.55,
  uranus: 2.15,
  neptune: 2.08,
  pluto: 0.48,
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

export function visualMoonOrbitRadius(): number {
  return EDU_RADIUS.earth * 3.35
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

export function scaleExplanation(mode: ScaleMode): string {
  if (isTrueScale(mode)) {
    return 'Gerçek ölçekte çaplar ve mesafeler gerçek oranlara yaklaşır. Gezegenler neredeyse kaybolur; uzayın ne kadar boş olduğunu bu yüzden anlarız.'
  }
  return 'Eğitimsel görünümde gezegenler görünür büyüklüktedir. Sıra ve göreli uzaklık korunur; gerçek çap-mesafe oranı kullanılmaz. Aksi halde Dünya bir nokta olurdu.'
}
