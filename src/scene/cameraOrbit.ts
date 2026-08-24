import { clamp } from '../utils/math'

export type OrbitVec3 = { x: number; y: number; z: number }

/** Match OrbitControls polar clamps on the main camera. */
export const ORBIT_MIN_POLAR = 0.12
export const ORBIT_MAX_POLAR = Math.PI * 0.92

export function sphericalFromOffset(offset: OrbitVec3): { radius: number; theta: number; phi: number } {
  const radius = Math.hypot(offset.x, offset.y, offset.z) || 1
  return {
    radius,
    theta: Math.atan2(offset.x, offset.z),
    phi: Math.acos(clamp(offset.y / radius, -1, 1)),
  }
}

export function offsetFromSpherical(radius: number, theta: number, phi: number): OrbitVec3 {
  const sinPhi = Math.sin(phi)
  return {
    x: radius * sinPhi * Math.sin(theta),
    y: radius * Math.cos(phi),
    z: radius * sinPhi * Math.cos(theta),
  }
}

/** Rotate an offset around the look target; distance stays the same. */
export function orbitOffset(
  offset: OrbitVec3,
  deltaYaw: number,
  deltaPitch: number,
  minPolar = ORBIT_MIN_POLAR,
  maxPolar = ORBIT_MAX_POLAR,
): OrbitVec3 {
  const spherical = sphericalFromOffset(offset)
  return offsetFromSpherical(
    spherical.radius,
    spherical.theta + deltaYaw,
    clamp(spherical.phi + deltaPitch, minPolar, maxPolar),
  )
}

export function lookAnglesDeg(offset: OrbitVec3): { yaw: number; pitch: number } {
  const spherical = sphericalFromOffset(offset)
  return {
    yaw: (spherical.theta * 180) / Math.PI,
    pitch: ((spherical.phi - Math.PI / 2) * 180) / Math.PI,
  }
}

/** Scale camera distance to the target; direction stays the same. */
export function dollyOffset(offset: OrbitVec3, factor: number, minDist: number, maxDist: number): OrbitVec3 {
  const radius = Math.hypot(offset.x, offset.y, offset.z) || 1
  const next = clamp(radius * factor, minDist, maxDist)
  const scale = next / radius
  return { x: offset.x * scale, y: offset.y * scale, z: offset.z * scale }
}
