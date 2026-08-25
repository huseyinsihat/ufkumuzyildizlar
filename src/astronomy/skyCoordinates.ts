import type { Vec3 } from '../types/simulation'

/** Celestial sphere radius in scene units — beyond true-scale Pluto (~276). */
export const SKY_SPHERE_RADIUS = 520

/**
 * Equatorial RA/Dec → scene direction.
 * Treats equatorial coords with the same remap as auToScene (x, z→y, −y→z)
 * so Polaris sits near +Y (educational “north is up”).
 */
export function equatorialToSceneDir(raHours: number, decDeg: number): Vec3 {
  const ra = raHours * (Math.PI / 12)
  const dec = decDeg * (Math.PI / 180)
  const cosDec = Math.cos(dec)
  const x = cosDec * Math.cos(ra)
  const yEq = cosDec * Math.sin(ra)
  const z = Math.sin(dec)
  const length = Math.hypot(x, z, yEq) || 1
  return { x: x / length, y: z / length, z: -yEq / length }
}

export function equatorialToSkyPosition(raHours: number, decDeg: number, radius = SKY_SPHERE_RADIUS): Vec3 {
  const dir = equatorialToSceneDir(raHours, decDeg)
  return { x: dir.x * radius, y: dir.y * radius, z: dir.z * radius }
}

/**
 * Classroom blend: keep relative sky order but pull stars onto a more even
 * showcase ring so large empty wedges are less jarring for kids.
 * 0 = pure RA/Dec, 1 = fully even ring.
 */
export const EDU_SKY_BLEND = 0.58

export function eduSkyDirection(real: Vec3, index: number, total: number, blend = EDU_SKY_BLEND): Vec3 {
  const realLen = Math.hypot(real.x, real.y, real.z) || 1
  const rx = real.x / realLen
  const ry = real.y / realLen
  const rz = real.z / realLen
  const t = total > 1 ? index / total : 0
  const az = t * Math.PI * 2
  const elev = Math.max(-0.72, Math.min(0.72, ry * 0.55 + Math.sin(az * 2.17 + index * 0.31) * 0.14))
  const cosE = Math.cos(Math.asin(elev))
  const sx = Math.cos(az) * cosE
  const sy = elev
  const sz = Math.sin(az) * cosE
  const x = rx * (1 - blend) + sx * blend
  const y = ry * (1 - blend) + sy * blend
  const z = rz * (1 - blend) + sz * blend
  const len = Math.hypot(x, y, z) || 1
  return { x: x / len, y: y / len, z: z / len }
}
