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
