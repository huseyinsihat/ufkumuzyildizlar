export type BodyId =
  | 'sun'
  | 'mercury'
  | 'venus'
  | 'earth'
  | 'moon'
  | 'mars'
  | 'jupiter'
  | 'saturn'
  | 'uranus'
  | 'neptune'
  | 'pluto'

export type BodyCategory =
  | 'star'
  | 'terrestrial'
  | 'gasGiant'
  | 'iceGiant'
  | 'dwarf'
  | 'moon'

export interface PlanetDefinition {
  id: BodyId
  name: string
  englishName: string
  category: BodyCategory
  parentId?: BodyId
  radiusKm: number
  massKg: number
  gravityMs2: number
  orbitalRadiusAu: number
  eccentricity: number
  inclinationDeg: number
  longitudeAscendingNodeDeg: number
  argumentPeriapsisDeg: number
  orbitalPeriodDays: number
  rotationPeriodHours: number
  axialTiltDeg: number
  moons: number
  meanTempC: number
  atmosphere: string
  color: string
  facts: string[]
  description: string
  hasRings?: boolean
  ringInnerScale?: number
  ringOuterScale?: number
}
