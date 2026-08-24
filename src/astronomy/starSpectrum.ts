export type SpectralClass = 'O' | 'B' | 'A' | 'F' | 'G' | 'K' | 'M'

function clamp(value: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, value))
}

/** OBAFGKM from effective temperature (K). */
export function spectralClass(tempK: number): SpectralClass {
  if (tempK >= 30000) return 'O'
  if (tempK >= 10000) return 'B'
  if (tempK >= 7500) return 'A'
  if (tempK >= 6000) return 'F'
  if (tempK >= 5200) return 'G'
  if (tempK >= 3700) return 'K'
  return 'M'
}

/** Tanner Helland blackbody approximation, 0–1 sRGB. */
export function blackbodyRgb(tempK: number): { r: number; g: number; b: number } {
  const t = Math.min(40000, Math.max(1000, tempK)) / 100
  let r: number
  let g: number
  let b: number
  if (t <= 66) r = 255
  else r = 329.698727446 * (t - 60) ** -0.1332047592
  if (t <= 66) g = 99.4708025861 * Math.log(t) - 161.1195681661
  else g = 288.1221695283 * (t - 60) ** -0.0755148492
  if (t >= 66) b = 255
  else if (t <= 19) b = 0
  else b = 138.5177312231 * Math.log(t - 10) - 305.0447927787
  return { r: clamp(r / 255), g: clamp(g / 255), b: clamp(b / 255) }
}

export function rgbToHex(rgb: { r: number; g: number; b: number }): string {
  const r = Math.round(clamp(rgb.r) * 255)
  const g = Math.round(clamp(rgb.g) * 255)
  const b = Math.round(clamp(rgb.b) * 255)
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`
}

function saturateRgb(rgb: { r: number; g: number; b: number }, amount: number): { r: number; g: number; b: number } {
  const avg = (rgb.r + rgb.g + rgb.b) / 3
  return {
    r: clamp(avg + (rgb.r - avg) * amount),
    g: clamp(avg + (rgb.g - avg) * amount),
    b: clamp(avg + (rgb.b - avg) * amount),
  }
}

/** Educational star color: blackbody hue with a little extra saturation so classes read clearly. */
export function starHex(tempK: number): string {
  const sat = tempK < 4000 ? 1.38 : tempK < 5200 ? 1.24 : tempK > 10000 ? 1.2 : 1.12
  return rgbToHex(saturateRgb(blackbodyRgb(tempK), sat))
}

export function mixRgb(
  a: { r: number; g: number; b: number },
  b: { r: number; g: number; b: number },
  t: number,
): { r: number; g: number; b: number } {
  return {
    r: a.r + (b.r - a.r) * t,
    g: a.g + (b.g - a.g) * t,
    b: a.b + (b.b - a.b) * t,
  }
}
