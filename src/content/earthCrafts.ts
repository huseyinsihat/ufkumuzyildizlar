import { L, type LocText } from '../i18n/types'

export type EarthCraftKind = 'station' | 'satellite' | 'crew'
export type EarthCraftModel = 'iss' | 'sat' | 'dragon'

/** Shared classroom rings: crafts sit on these exact paths. */
export const EARTH_CRAFT_RINGS = {
  leo: { orbit: 1.37, tilt: 0.88, color: '#8ec5ff' },
  geo: { orbit: 2.17, tilt: 0.05, color: '#f4b942' },
} as const

export function earthCraftLocalPosition(
  orbitMul: number,
  tilt: number,
  angle: number,
  earthRadius: number,
): { x: number; y: number; z: number } {
  const r = earthRadius * orbitMul
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  return {
    x: c * r,
    y: s * r * Math.sin(tilt),
    z: s * r * Math.cos(tilt),
  }
}

export interface EarthCraft {
  id: string
  name: string
  tag: LocText
  kind: EarthCraftKind
  fact: LocText
  description: LocText
  facts: LocText[]
  color: string
  orbit: number
  speed: number
  phase: number
  tilt: number
  model: EarthCraftModel
}

export const EARTH_CRAFTS: EarthCraft[] = [
  {
    id: 'iss',
    name: 'ISS',
    tag: L('Uzay istasyonu', 'Space station'),
    kind: 'station',
    fact: L(
      'Uluslararası Uzay İstasyonu Dünya’nın yakınında döner. Astronotlar orada yaşar.',
      'The International Space Station goes around near Earth. Astronauts live there.',
    ),
    description: L(
      'ISS, birçok ülkenin birlikte kurduğu bir laboratuvardır. Yaklaşık 400 km yüksektedir. Bir turu yaklaşık 90 dakika sürer.',
      'ISS is a lab many countries built together. It is about 400 km up. One trip takes about 90 minutes.',
    ),
    facts: [
      L('İlk parçası 1998’de gönderildi.', 'The first piece was sent in 1998.'),
      L('Günde Dünya’yı yaklaşık 16 kez dolaşır.', 'It goes around Earth about 16 times a day.'),
      L('Alper Gezeravcı da 2024’te burada bilimsel deneyler yaptı.', 'Alper Gezeravcı also did science experiments here in 2024.'),
    ],
    color: '#dce7f5',
    orbit: EARTH_CRAFT_RINGS.leo.orbit,
    speed: 0.22,
    phase: 0.4,
    tilt: EARTH_CRAFT_RINGS.leo.tilt,
    model: 'iss',
  },
  {
    id: 'crew-dragon',
    name: 'Crew Dragon',
    tag: L('Alper Gezeravcı', 'Alper Gezeravcı'),
    kind: 'crew',
    fact: L(
      'Türkiye’nin ilk astronotu Alper Gezeravcı 2024’te bu araçla uzaya gitti.',
      'Turkey’s first astronaut Alper Gezeravcı went to space in this craft in 2024.',
    ),
    description: L(
      'Crew Dragon, SpaceX’in insanlı kapsülüdür. Alper Gezeravcı Ax-3 görevinde Freedom kapsülüyle gitti. Yaklaşık 18 gün uzayda kaldı.',
      'Crew Dragon is SpaceX’s crew capsule. Alper Gezeravcı went on the Ax-3 mission in the Freedom capsule. He stayed in space about 18 days.',
    ),
    facts: [
      L('Görev adı Ax-3’tür; kalkış 18 Ocak 2024’tedir.', 'The mission name is Ax-3; launch was 18 January 2024.'),
      L('Kapsülün adı Freedom’dır.', 'The capsule’s name is Freedom.'),
      L('TÜBİTAK destekli deneyler ISS’te yapıldı.', 'TÜBİTAK-supported experiments were done on ISS.'),
    ],
    color: '#f4f1ea',
    orbit: EARTH_CRAFT_RINGS.leo.orbit,
    speed: 0.2,
    phase: 1.15,
    tilt: EARTH_CRAFT_RINGS.leo.tilt,
    model: 'dragon',
  },
  {
    id: 'turksat-6a',
    name: 'Türksat 6A',
    tag: L('Türkiye uydusu', 'Turkey satellite'),
    kind: 'satellite',
    fact: L(
      'Türksat 6A, Türkiye’de yapılan ilk haberleşme uydusudur. 2024’te uzaya gitti.',
      'Türksat 6A is the first communications satellite made in Turkey. It went to space in 2024.',
    ),
    description: L(
      'Haberleşme uyduları televizyon ve internet sinyalini taşır. Türksat 6A yer sabit yörüngede durur; Dünya ile birlikte döner gibi görünür.',
      'Communications satellites carry TV and internet signals. Türksat 6A sits in geostationary orbit; it looks like it turns with Earth.',
    ),
    facts: [
      L('8 Temmuz 2024’te fırlatıldı.', 'It launched on 8 July 2024.'),
      L('Türkiye’nin yerli haberleşme uydusudur.', 'It is Turkey’s home-built communications satellite.'),
      L('Yüksek yörünge burada eğitim için biraz yakına çekilmiştir.', 'The high orbit is drawn a bit closer here for class.'),
    ],
    color: '#e11d48',
    orbit: EARTH_CRAFT_RINGS.geo.orbit,
    speed: 0.046,
    phase: 0.2,
    tilt: EARTH_CRAFT_RINGS.geo.tilt,
    model: 'sat',
  },
  {
    id: 'turksat-5b',
    name: 'Türksat 5B',
    tag: L('Türkiye uydusu', 'Turkey satellite'),
    kind: 'satellite',
    fact: L(
      'Türksat 5B, Türkiye’nin haberleşme uydusudur. TV ve internet için çalışır.',
      'Türksat 5B is Turkey’s communications satellite. It works for TV and internet.',
    ),
    description: L(
      'Türksat 5B 2021’de uzaya gitti. Ka-bant internet ve yayın hizmeti verir. Türksat 5A ile birlikte Türkiye’nin güncel uydu ailesindendir.',
      'Türksat 5B went to space in 2021. It gives Ka-band internet and broadcast service. Together with Türksat 5A it is part of Turkey’s current satellite family.',
    ),
    facts: [
      L('19 Aralık 2021’de fırlatıldı.', 'It launched on 19 December 2021.'),
      L('Türksat 5A da aynı ailedendir.', 'Türksat 5A is in the same family.'),
      L('Dünya’dan bakınca gökyüzünde neredeyse yerinde durur.', 'From Earth it almost looks still in the sky.'),
    ],
    color: '#f59e0b',
    orbit: EARTH_CRAFT_RINGS.geo.orbit,
    speed: 0.04,
    phase: 2.4,
    tilt: EARTH_CRAFT_RINGS.geo.tilt,
    model: 'sat',
  },
]

export function findEarthCraft(id: string | null): EarthCraft | undefined {
  if (!id) return undefined
  return EARTH_CRAFTS.find((item) => item.id === id)
}

export const CRAFT_KIND_LABEL: Record<EarthCraftKind, LocText> = {
  station: L('Uzay istasyonu', 'Space station'),
  satellite: L('Uydu', 'Satellite'),
  crew: L('Uzay aracı', 'Spacecraft'),
}
