export type EarthCraftKind = 'station' | 'satellite' | 'crew'
export type EarthCraftModel = 'iss' | 'sat' | 'dragon'

export interface EarthCraft {
  id: string
  name: string
  tag: string
  kind: EarthCraftKind
  fact: string
  description: string
  facts: string[]
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
    tag: 'Uzay istasyonu',
    kind: 'station',
    fact: 'Uluslararası Uzay İstasyonu Dünya’nın yakınında dolanır. Astronotlar orada yaşar ve çalışır.',
    description:
      'ISS, birçok ülkenin birlikte kurduğu bir laboratuvardır. Yaklaşık 400 km yüksektedir. Bir turu yaklaşık 90 dakika sürer.',
    facts: [
      'İlk parçası 1998’de gönderildi.',
      'Günde Dünya’yı yaklaşık 16 kez dolaşır.',
      'Alper Gezeravcı da 2024’te burada bilimsel deneyler yaptı.',
    ],
    color: '#dce7f5',
    orbit: 1.34,
    speed: 0.22,
    phase: 0.4,
    tilt: 0.9,
    model: 'iss',
  },
  {
    id: 'crew-dragon',
    name: 'Crew Dragon',
    tag: 'Alper Gezeravcı',
    kind: 'crew',
    fact: 'Türkiye’nin ilk astronotu Alper Gezeravcı, 2024’te Crew Dragon ile ISS’e gitti.',
    description:
      'Crew Dragon, SpaceX’in insanlı kapsülüdür. Alper Gezeravcı Ax-3 görevinde Freedom kapsülüyle gitti. Yaklaşık 18 gün uzayda kaldı.',
    facts: [
      'Görev adı Ax-3’tür; kalkış 18 Ocak 2024’tedir.',
      'Kapsülün adı Freedom’dır.',
      'TÜBİTAK destekli deneyler ISS’te yapıldı.',
    ],
    color: '#f4f1ea',
    orbit: 1.4,
    speed: 0.2,
    phase: 1.15,
    tilt: 0.88,
    model: 'dragon',
  },
  {
    id: 'turksat-6a',
    name: 'Türksat 6A',
    tag: 'Türkiye uydusu',
    kind: 'satellite',
    fact: 'Türksat 6A, Türkiye’de tasarlanıp üretilen ilk haberleşme uydusudur. 2024’te uzaya gitti.',
    description:
      'Haberleşme uyduları televizyon ve internet sinyalini taşır. Türksat 6A yer sabit yörüngede durur; Dünya ile birlikte döner gibi görünür.',
    facts: [
      '8 Temmuz 2024’te fırlatıldı.',
      'Türkiye’nin yerli haberleşme uydusudur.',
      'Yüksek yörünge burada eğitim için biraz yakına çekilmiştir.',
    ],
    color: '#e11d48',
    orbit: 2.12,
    speed: 0.046,
    phase: 0.2,
    tilt: 0.05,
    model: 'sat',
  },
  {
    id: 'turksat-5b',
    name: 'Türksat 5B',
    tag: 'Türkiye uydusu',
    kind: 'satellite',
    fact: 'Türksat 5B, Türkiye’nin güncel haberleşme uydularındandır. TV ve internet için çalışır.',
    description:
      'Türksat 5B 2021’de uzaya gitti. Ka-bant internet ve yayın hizmeti verir. Türksat 5A ile birlikte Türkiye’nin güncel uydu ailesindendir.',
    facts: [
      '19 Aralık 2021’de fırlatıldı.',
      'Türksat 5A da aynı ailedendir.',
      'Dünya’dan bakınca gökyüzünde neredeyse yerinde durur.',
    ],
    color: '#f59e0b',
    orbit: 2.22,
    speed: 0.04,
    phase: 2.4,
    tilt: 0.04,
    model: 'sat',
  },
]

export function findEarthCraft(id: string | null): EarthCraft | undefined {
  if (!id) return undefined
  return EARTH_CRAFTS.find((item) => item.id === id)
}

export const CRAFT_KIND_LABEL: Record<EarthCraftKind, string> = {
  station: 'Uzay istasyonu',
  satellite: 'Uydu',
  crew: 'Uzay aracı',
}
