import type { IconName } from '../../components/ui/Icon'
import type { AstroEventId } from '../../content/astroEvents'

const BY_ID: Partial<Record<AstroEventId, IconName>> = {
  'solar-eclipse': 'eclipse',
  'lunar-eclipse': 'moon',
  'jupiter-moon-shadow': 'shadow',
  'io-volcano': 'volcano',
  'enceladus-geyser': 'geyser',
  'titan-methane': 'rain',
  'europa-ocean': 'ocean',
  'solar-flare': 'flare',
  'cme-aurora': 'aurora',
  'jupiter-grs': 'spot',
  'mars-dust': 'dust',
  'saturn-rings': 'rings',
  'meteor-shower': 'meteor',
  'venus-haze': 'haze',
  'uranus-tilt': 'tilt',
  'neptune-spot': 'spot',
  'comet-tail': 'comet',
  supernova: 'supernova',
  'ns-merger': 'merge',
  'black-hole': 'blackhole',
}

/** Icon for classroom events and dated eclipses (visualId or id). */
export function eventIconName(id: string | null | undefined): IconName {
  if (!id) return 'orbit'
  if (id.startsWith('eclipse-')) return 'eclipse'
  return BY_ID[id as AstroEventId] ?? 'orbit'
}
