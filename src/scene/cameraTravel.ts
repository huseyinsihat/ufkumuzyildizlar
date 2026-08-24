import { clamp, lerp } from '../utils/math'

/** Current short-hop camera tween. Nearby planets keep this feel. */
export const CAMERA_TRAVEL_MIN_SEC = 1.15
/** Ceiling for the longest hop the scene can make (opposite sky points). */
export const CAMERA_TRAVEL_MAX_SEC = 8
/** Scene-unit distance that maps to the 8s ceiling. Stars sit on a ~520 radius sphere. */
export const CAMERA_TRAVEL_MAX_DIST = 1040

export type Vec3Like = { x: number; y: number; z: number }

export function cameraTravelDuration(distance: number): number {
  const t = clamp(distance / CAMERA_TRAVEL_MAX_DIST, 0, 1)
  return lerp(CAMERA_TRAVEL_MIN_SEC, CAMERA_TRAVEL_MAX_SEC, t)
}

/** Straight path below this; only longer hops lift into an arc. */
const ARC_START_DIST = 24

export function cameraTravelArcAmount(distance: number): number {
  return clamp((distance - ARC_START_DIST) / 200, 0, 1)
}

export function cameraTravelArcOffset(from: Vec3Like, to: Vec3Like): Vec3Like {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const dz = to.z - from.z
  const distance = Math.hypot(dx, dy, dz)
  const amount = cameraTravelArcAmount(distance)
  if (amount <= 0 || distance < 1e-6) return { x: 0, y: 0, z: 0 }

  const height = distance * 0.18 * amount
  let ox = 0
  let oy = height
  let oz = 0

  if (Math.abs(dy) > distance * 0.82) {
    const len = Math.hypot(-dz, dx) || 1
    ox = (-dz / len) * height
    oy = 0
    oz = (dx / len) * height
  }

  const midLen = Math.hypot((from.x + to.x) * 0.5, (from.y + to.y) * 0.5, (from.z + to.z) * 0.5)
  if (midLen < distance * 0.22) {
    const side = Math.hypot(dz, dx) || 1
    ox += (dz / side) * distance * 0.16 * amount
    oz += (-dx / side) * distance * 0.16 * amount
  }

  return { x: ox, y: oy, z: oz }
}
