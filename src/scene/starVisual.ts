import { blackbodyRgb, mixRgb, rgbToHex, spectralClass, starHex } from '../astronomy/starSpectrum'
import { EDU_RADIUS } from '../astronomy/visualScale'
import type { ScaleMode } from '../types/simulation'

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export type StarVisualKind = 'star' | 'rock' | 'cluster' | 'nebula'

const EDU_SUN = EDU_RADIUS.sun
const EDU_CORE_MIN = 3.4
const EDU_CORE_MAX = 28
const EDU_LOG_K = 6.2

/** Local Y on the unit core mesh; world offset stays just above the disk after scale. */
export const STAR_LABEL_LOCAL_Y = 1.22

/** Educational: 1 R☉ matches the Sun disk. True scale: tiny cores, mag-driven glow. */
export function starCoreRadius(
  radiusSolar: number,
  mag: number,
  mode: ScaleMode = 'educational',
): number {
  const logR = Math.log10(Math.max(radiusSolar, 0.05))
  const faint = mag > 6 ? (mag - 6) * 0.18 : 0
  if (mode === 'trueScale') {
    return clamp(0.6 + logR * 0.35 - faint, 0.5, 2.4)
  }
  return clamp(EDU_SUN + logR * EDU_LOG_K - faint, EDU_CORE_MIN, EDU_CORE_MAX)
}

export function starGlowRadius(
  radiusSolar: number,
  mag: number,
  kind: StarVisualKind = 'star',
  mode: ScaleMode = 'educational',
): number {
  const kindBoost = kind === 'nebula' ? 1.9 : kind === 'cluster' ? 1.5 : 1
  if (mode === 'trueScale') {
    const magGlow = Math.max(0, 4 - mag)
    return clamp((1.2 + magGlow * 1.8) * kindBoost, 1.2, 12)
  }
  const core = starCoreRadius(radiusSolar, mag, mode)
  const bright = Math.max(0, 1.5 - mag)
  return clamp((core * 2.2 + bright * 2.4) * kindBoost, 8, 64)
}

export function starHasSpikes(mag: number, kind: StarVisualKind = 'star'): boolean {
  return kind === 'star' && mag <= 0
}

export function starSelectedScale(selected: boolean): number {
  return selected ? 1.22 : 1
}

export interface StarLook {
  coreHex: string
  haloHex: string
  coronaHex: string
  chromosphereHex: string
  limbPower: number
  granulation: number
  chromosphereScale: number
  coronaScale: number
  haloOpacity: number
  coronaOpacity: number
  chromosphereOpacity: number
  twinkle: number
  spin: number
}

export function photosphereKey(tempK: number, radiusSolar: number): string {
  const cls = spectralClass(tempK)
  const giant = radiusSolar >= 20 && (cls === 'G' || cls === 'K' || cls === 'M')
  return giant ? `${cls}g` : cls
}

/** Layered photosphere / chromosphere / corona look from temperature and size. */
export function starLook(
  tempK: number,
  radiusSolar: number,
  mag: number,
  kind: StarVisualKind = 'star',
): StarLook {
  if (kind === 'nebula') {
    return {
      coreHex: '#ffe6f4',
      haloHex: '#ff9ad4',
      coronaHex: '#7ee0c8',
      chromosphereHex: '#ffb8e8',
      limbPower: 0.35,
      granulation: 0.15,
      chromosphereScale: 1.55,
      coronaScale: 2.4,
      haloOpacity: 0.55,
      coronaOpacity: 0.32,
      chromosphereOpacity: 0.2,
      twinkle: 0.04,
      spin: 0.015,
    }
  }
  if (kind === 'cluster') {
    return {
      coreHex: '#f4f8ff',
      haloHex: '#c8dcff',
      coronaHex: '#9ec5ff',
      chromosphereHex: '#dce6ff',
      limbPower: 0.45,
      granulation: 0.12,
      chromosphereScale: 1.2,
      coronaScale: 1.85,
      haloOpacity: 0.72,
      coronaOpacity: 0.28,
      chromosphereOpacity: 0.16,
      twinkle: 0.08,
      spin: 0.04,
    }
  }

  const cool = tempK < 4500
  const hot = tempK > 8500
  const giant = radiusSolar >= 20
  const bright = Math.max(0, 1.2 - mag)
  const core = mixRgb(blackbodyRgb(tempK * 1.12), { r: 1, g: 1, b: 1 }, hot ? 0.55 : cool ? 0.22 : 0.4)
  const corona = blackbodyRgb(cool ? tempK * 0.82 : tempK * 1.28)
  return {
    coreHex: rgbToHex(core),
    haloHex: starHex(tempK),
    coronaHex: rgbToHex(corona),
    chromosphereHex: rgbToHex(mixRgb(blackbodyRgb(tempK), cool ? { r: 1, g: 0.35, b: 0.15 } : { r: 1, g: 0.85, b: 0.7 }, 0.22)),
    limbPower: cool ? 0.78 : hot ? 0.42 : 0.58,
    granulation: cool ? (giant ? 0.85 : 0.55) : hot ? 0.12 : 0.32,
    chromosphereScale: giant ? 1.38 : 1.18,
    coronaScale: giant ? 1.95 : hot ? 1.72 : 1.55,
    haloOpacity: 0.58 + bright * 0.16,
    coronaOpacity: (giant ? 0.2 : 0.12) + bright * 0.08,
    chromosphereOpacity: giant ? 0.2 : 0.14,
    twinkle: mag > 2 ? 0.16 : mag > 0 ? 0.1 : 0.05,
    spin: giant ? 0.035 : hot ? 0.14 : 0.07,
  }
}
