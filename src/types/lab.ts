import type { LocText } from '../i18n/types'

export type LabRoomId = 'motion' | 'earth' | 'gravity' | 'scale' | 'build' | 'sky'

export type LabActivityId =
  | 'earth-year'
  | 'who-faster'
  | 'spin-vs-orbit'
  | 'day-night'
  | 'mass-weight'
  | 'drop-ball'
  | 'jump'
  | 'real-scale'
  | 'arrange-orbits'
  | 'moon-phases'
  | 'stars-or-earth'
  | 'star-names'
  | 'space-mission'
  | 'light-travel'
  | 'seasons-tilt'
  | 'closest-hottest'
  | 'comet-tail'
  | 'mercury-long-day'
  | 'kepler-pizza'
  | 'eclipse-align'
  | 'ursa-hunt'
  | 'light-diary'

export type LabStep = 'predict' | 'simulate' | 'result' | 'explain'

export interface LabChoice {
  id: string
  label: LocText
}

export interface LabActivity {
  id: LabActivityId
  room: LabRoomId
  title: LocText
  question: LocText
  watchHint: LocText
  choices?: LabChoice[]
  simulateLabel: LocText
  resultTitle: LocText
  explain: LocText
  uses3d: boolean
}
