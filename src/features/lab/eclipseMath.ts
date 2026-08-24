export type Vec3 = { x: number; y: number; z: number }

/** Visual umbra radii matching UmbraMesh (wide at Earth, tip away from the Sun). */
export const UMBRA_BASE_RADIUS = 2.4
export const UMBRA_TIP_RADIUS = 0.2

function hypot(v: Vec3): number {
  return Math.hypot(v.x, v.y, v.z)
}

function sub(a: Vec3, b: Vec3): Vec3 {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z }
}

function scale(v: Vec3, s: number): Vec3 {
  return { x: v.x * s, y: v.y * s, z: v.z * s }
}

function dot(a: Vec3, b: Vec3): number {
  return a.x * b.x + a.y * b.y + a.z * b.z
}


export function moonInUmbraCone(
  earth: Vec3,
  moon: Vec3,
  moonRadius: number,
  umbraLength: number,
  baseRadius = UMBRA_BASE_RADIUS,
  tipRadius = UMBRA_TIP_RADIUS,
): boolean {
  const earthDist = hypot(earth) || 1
  const antiSun = scale(earth, 1 / earthDist)
  const rel = sub(moon, earth)
  const along = dot(rel, antiSun)
  if (along <= 0 || along >= umbraLength) return false
  const radial = hypot(sub(rel, scale(antiSun, along)))
  const t = along / umbraLength
  const radius = baseRadius + (tipRadius - baseRadius) * t
  return radial <= radius + moonRadius
}

export function isSolarAlignment(earth: Vec3, moon: Vec3, moonRadius: number): boolean {
  const earthDist = hypot(earth) || 1
  const moonDist = hypot(moon) || 1
  if (moonDist >= earthDist) return false
  const sunDir = scale(earth, -1 / earthDist)
  const rel = sub(moon, earth)
  const towardSun = dot(rel, sunDir)
  if (towardSun <= 0) return false
  const off = hypot(sub(rel, scale(sunDir, towardSun)))
  const align = dot(earth, moon) / (earthDist * moonDist)
  return align > 0.995 && off < moonRadius * 3.2
}

export function eclipseKindFromPositions(
  earth: Vec3,
  moon: Vec3,
  moonRadius: number,
  umbraLength: number,
): 'none' | 'solar' | 'lunar' {
  if (moonInUmbraCone(earth, moon, moonRadius, umbraLength)) return 'lunar'
  if (isSolarAlignment(earth, moon, moonRadius)) return 'solar'
  return 'none'
}
