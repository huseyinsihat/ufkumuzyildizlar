import type { PlanetDefinition } from '../types/planet'
import type { Vec3 } from '../types/simulation'
import { getSatelliteRelativeEclipticAu } from './coordinateSystems'

/** Map an ecliptic AU delta into Y-up scene direction (same remap as auToScene). */
export function eclipticDeltaToSceneDir(delta: Vec3): Vec3 {
  return { x: delta.x, y: delta.z, z: -delta.y }
}

/** Place a satellite beside its parent: true direction, forced visual orbit radius. */
export function placeBesideParent(parent: Vec3, relativeEcliptic: Vec3, orbitRadius: number): Vec3 {
  const dir = eclipticDeltaToSceneDir(relativeEcliptic)
  const length = Math.hypot(dir.x, dir.y, dir.z) || 1
  const scale = orbitRadius / length
  return {
    x: parent.x + dir.x * scale,
    y: parent.y + dir.y * scale,
    z: parent.z + dir.z * scale,
  }
}

/**
 * Local scene-space ring matching placeBesideParent.
 * Samples the same parent-relative ephemeris the satellite rides, so the body stays on the line.
 */
export function sampleSatelliteOrbitLocal(
  body: PlanetDefinition,
  orbitRadius: number,
  samples = 96,
  date: Date = new Date(),
): Vec3[] {
  const origin = { x: 0, y: 0, z: 0 }
  const periodMs = Math.max(body.orbitalPeriodDays, 1) * 86_400_000
  const points: Vec3[] = []
  for (let i = 0; i <= samples; i += 1) {
    const relative = getSatelliteRelativeEclipticAu(body.id, new Date(date.getTime() + (i / samples) * periodMs))
    points.push(placeBesideParent(origin, relative, orbitRadius))
  }
  return points
}
