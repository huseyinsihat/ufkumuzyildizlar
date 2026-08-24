export interface StageVec {
  x: number
  y: number
  z: number
}

function length(v: StageVec): number {
  return Math.hypot(v.x, v.y, v.z)
}

function alongFromEarth(earth: StageVec, moonDist: number, towardSun: boolean): StageVec {
  const len = length(earth)
  if (len < 1e-8) {
    return towardSun ? { x: moonDist, y: 0, z: 0 } : { x: -moonDist, y: 0, z: 0 }
  }
  const s = (towardSun ? -moonDist : moonDist) / len
  return {
    x: earth.x + earth.x * s,
    y: earth.y + earth.y * s,
    z: earth.z + earth.z * s,
  }
}

/** Overlay Moon between the Sun (origin) and Earth. */
export function stageSolarMoon(earth: StageVec, moonDist: number): StageVec {
  return alongFromEarth(earth, moonDist, true)
}

/** Overlay Moon on the far side of Earth from the Sun. */
export function stageLunarMoon(earth: StageVec, moonDist: number): StageVec {
  return alongFromEarth(earth, moonDist, false)
}
