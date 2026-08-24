import type { PlanetDefinition } from '../types/planet'
import type { Vec3 } from '../types/simulation'
import { sampleOrbit } from './orbitalCalculations'

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

/** Local scene-space ring matching placeBesideParent (inclined, parent-centered). */
export function sampleSatelliteOrbitLocal(body: PlanetDefinition, orbitRadius: number, samples = 96): Vec3[] {
  const points = sampleOrbit(
    {
      semiMajorAxisAu: 1,
      eccentricity: 0,
      inclinationDeg: body.inclinationDeg,
      longitudeAscendingNodeDeg: body.longitudeAscendingNodeDeg,
      argumentPeriapsisDeg: body.argumentPeriapsisDeg,
    },
    samples,
  )
  return points.map((point) => {
    const dir = eclipticDeltaToSceneDir(point)
    const length = Math.hypot(dir.x, dir.y, dir.z) || 1
    const scale = orbitRadius / length
    return { x: dir.x * scale, y: dir.y * scale, z: dir.z * scale }
  })
}
