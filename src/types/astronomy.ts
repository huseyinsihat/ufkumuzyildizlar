import type { BodyId } from './planet'
import type { Vec3 } from './simulation'

export interface EclipticAuPosition {
  bodyId: BodyId
  au: Vec3
  distanceAu: number
}

export interface KeplerianElements {
  semiMajorAxisAu: number
  eccentricity: number
  inclinationDeg: number
  longitudeAscendingNodeDeg: number
  argumentPeriapsisDeg: number
}
