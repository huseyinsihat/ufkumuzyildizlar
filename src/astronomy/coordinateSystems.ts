import { Body, Ecliptic, HelioVector } from 'astronomy-engine'
import type { BodyId } from '../types/planet'
import type { Vec3 } from '../types/simulation'
import { daysSinceJ2000, keplerPosition, trueAnomalyFromMean } from './orbitalCalculations'
import { getBody } from './planetData'

const BODY_MAP: Partial<Record<BodyId, Body>> = {
  sun: Body.Sun,
  mercury: Body.Mercury,
  venus: Body.Venus,
  earth: Body.Earth,
  moon: Body.Moon,
  mars: Body.Mars,
  jupiter: Body.Jupiter,
  saturn: Body.Saturn,
  uranus: Body.Uranus,
  neptune: Body.Neptune,
  pluto: Body.Pluto,
}

export function getHeliocentricEclipticAu(bodyId: BodyId, date: Date): Vec3 {
  if (bodyId === 'sun') {
    return { x: 0, y: 0, z: 0 }
  }

  const engineBody = BODY_MAP[bodyId]
  if (engineBody) {
    const equatorial = HelioVector(engineBody, date)
    const ecliptic = Ecliptic(equatorial)
    return { x: ecliptic.vec.x, y: ecliptic.vec.y, z: ecliptic.vec.z }
  }

  return keplerFallback(bodyId, date.getTime())
}

function keplerFallback(bodyId: BodyId, timeMs: number): Vec3 {
  const body = getBody(bodyId)
  if (body.orbitalPeriodDays <= 0) {
    return { x: 0, y: 0, z: 0 }
  }
  const mean = ((daysSinceJ2000(timeMs) / body.orbitalPeriodDays) * Math.PI * 2) % (Math.PI * 2)
  const nu = trueAnomalyFromMean(mean, body.eccentricity)
  return keplerPosition(
    {
      semiMajorAxisAu: body.orbitalRadiusAu,
      eccentricity: body.eccentricity,
      inclinationDeg: body.inclinationDeg,
      longitudeAscendingNodeDeg: body.longitudeAscendingNodeDeg,
      argumentPeriapsisDeg: body.argumentPeriapsisDeg,
    },
    nu,
  )
}
