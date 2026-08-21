/**
 * Solar System physical and orbital data.
 *
 * Primary source: NASA Planetary Fact Sheet (metric),
 * NSSDC / NASA Goddard — https://nssdc.gsfc.nasa.gov/planetary/factsheet/
 *
 * Additional:
 * - Solar radius: IAU 2015 nominal solar radius (695 700 km)
 * - Solar mass: IAU 2015 GM_sun / G (1.9885e30 kg, rounded)
 * - Moon: NASA Moon Fact Sheet
 * - Moon counts change as new satellites are confirmed; values below
 *   follow the NASA fact sheets as commonly cited for education (2024).
 *
 * Do not duplicate these numbers elsewhere — import from this module.
 */
import type { BodyId, PlanetDefinition } from '../types/planet'

export const BODIES: readonly PlanetDefinition[] = [
  {
    id: 'sun',
    name: 'Güneş',
    englishName: 'Sun',
    category: 'star',
    radiusKm: 695_700,
    massKg: 1.9885e30,
    gravityMs2: 274,
    orbitalRadiusAu: 0,
    eccentricity: 0,
    inclinationDeg: 0,
    longitudeAscendingNodeDeg: 0,
    argumentPeriapsisDeg: 0,
    orbitalPeriodDays: 0,
    rotationPeriodHours: 609.12,
    axialTiltDeg: 7.25,
    moons: 0,
    meanTempC: 5500,
    atmosphere: 'Çoğunlukla hidrojen ve helyum. Güneş katı bir yüzey değil, sıcak bir plazma topudur.',
    color: '#F7C14A',
    description:
      'Güneş, Güneş Sistemi’nin merkezindeki yıldızdır. Gezegenler onun çevresinde dolanır. Işığı Dünya’ya yaklaşık 8 dakikada ulaşır.',
    facts: [
      'Güneş bir gezegen değil, bir yıldızdır. Kendi ışığını üretir.',
      'Güneş ateşten değil, çok sıcak plazmadan oluşur.',
      'Güneş’in ışığı Dünya’ya yaklaşık 8 dakika 20 saniyede gelir.',
    ],
  },
  {
    id: 'mercury',
    name: 'Merkür',
    englishName: 'Mercury',
    category: 'terrestrial',
    radiusKm: 2439.7,
    massKg: 3.301e23,
    gravityMs2: 3.7,
    orbitalRadiusAu: 0.387,
    eccentricity: 0.2056,
    inclinationDeg: 7.0,
    longitudeAscendingNodeDeg: 48.331,
    argumentPeriapsisDeg: 29.124,
    orbitalPeriodDays: 87.969,
    rotationPeriodHours: 1407.6,
    axialTiltDeg: 0.034,
    moons: 0,
    meanTempC: 167,
    atmosphere: 'Neredeyse yok. Gündüz çok ısınır, gece çok soğur.',
    color: '#A8A29E',
    description:
      'Merkür Güneş’e en yakın gezegendir. Küçüktür ve uydusu yoktur. Bir Merkür günü, bir Merkür yılından daha uzundur.',
    facts: [
      'Güneş’e en yakın gezegen Merkür’dür.',
      'Bir Merkür günü, bir Merkür yılından daha uzundur.',
      'Atmosferi çok incedir; bu yüzden ısıyı tutamaz.',
    ],
  },
  {
    id: 'venus',
    name: 'Venüs',
    englishName: 'Venus',
    category: 'terrestrial',
    radiusKm: 6051.8,
    massKg: 4.867e24,
    gravityMs2: 8.87,
    orbitalRadiusAu: 0.723,
    eccentricity: 0.0068,
    inclinationDeg: 3.39,
    longitudeAscendingNodeDeg: 76.68,
    argumentPeriapsisDeg: 54.884,
    orbitalPeriodDays: 224.701,
    rotationPeriodHours: -5832.5,
    axialTiltDeg: 177.36,
    moons: 0,
    meanTempC: 464,
    atmosphere: 'Çok kalın karbondioksit. Güçlü sera etkisi gezegeni fırın gibi ısıtır.',
    color: '#E8C07A',
    description:
      'Venüs Dünya’ya benzer büyüklüktedir ama Güneş Sistemi’nin en sıcak gezegenidir. Ters yönde döner.',
    facts: [
      'Güneş’e Merkür’den daha uzak olsa da Merkür’den sıcaktır.',
      'Kalın atmosferi Güneş ısısını hapseder (sera etkisi).',
      'Dönüşü tersinedir; Güneş batıdan doğar gibi görünürdü.',
    ],
  },
  {
    id: 'earth',
    name: 'Dünya',
    englishName: 'Earth',
    category: 'terrestrial',
    radiusKm: 6371,
    massKg: 5.972e24,
    gravityMs2: 9.8,
    orbitalRadiusAu: 1.0,
    eccentricity: 0.0167,
    inclinationDeg: 0.00005,
    longitudeAscendingNodeDeg: 0,
    argumentPeriapsisDeg: 114.207,
    orbitalPeriodDays: 365.256,
    rotationPeriodHours: 23.934,
    axialTiltDeg: 23.44,
    moons: 1,
    meanTempC: 15,
    atmosphere: 'Azot ve oksijen. Canlıların nefes almasını sağlar.',
    color: '#3B82C4',
    description:
      'Dünya, şu ana kadar yaşam bildiğimiz tek gezegendir. Eksen eğikliği mevsimleri oluşturur. Bir uydusu vardır: Ay.',
    facts: [
      'Gece ve gündüz, Dünya’nın kendi ekseni etrafında dönmesiyle oluşur.',
      'Mevsimlerin asıl nedeni Güneş’e yakınlık değil, eksen eğikliğidir.',
      'Bir yılı Güneş etrafındaki dolanımıdır (yaklaşık 365,25 gün).',
    ],
  },
  {
    id: 'moon',
    name: 'Ay',
    englishName: 'Moon',
    category: 'moon',
    parentId: 'earth',
    radiusKm: 1737.4,
    massKg: 7.342e22,
    gravityMs2: 1.62,
    orbitalRadiusAu: 0.00257,
    eccentricity: 0.0549,
    inclinationDeg: 5.145,
    longitudeAscendingNodeDeg: 125.08,
    argumentPeriapsisDeg: 318.15,
    orbitalPeriodDays: 27.322,
    rotationPeriodHours: 655.73,
    axialTiltDeg: 6.68,
    moons: 0,
    meanTempC: -20,
    atmosphere: 'Neredeyse yok.',
    color: '#C8C8CC',
    description:
      'Ay, Dünya’nın tek doğal uydusudur. Gelgit kilidi yüzünden Dünya’dan hep aynı yüzü görünür.',
    facts: [
      'Ay kendi ışığını üretmez; Güneş’ten gelen ışığı yansıtır.',
      'Dünya’dan hep aynı yüzü görünür çünkü dönmesi ile dolanması neredeyse eşittir.',
      'Ay’da yerçekimi vardır; Dünya’dakinin yaklaşık altıda biridir.',
    ],
  },
  {
    id: 'mars',
    name: 'Mars',
    englishName: 'Mars',
    category: 'terrestrial',
    radiusKm: 3389.5,
    massKg: 6.417e23,
    gravityMs2: 3.71,
    orbitalRadiusAu: 1.524,
    eccentricity: 0.0934,
    inclinationDeg: 1.85,
    longitudeAscendingNodeDeg: 49.558,
    argumentPeriapsisDeg: 286.502,
    orbitalPeriodDays: 686.98,
    rotationPeriodHours: 24.623,
    axialTiltDeg: 25.19,
    moons: 2,
    meanTempC: -65,
    atmosphere: 'İnce karbondioksit. Dünya’daki gibi rahat nefes alınamaz.',
    color: '#C1440E',
    description:
      'Mars “Kızıl Gezegen” olarak bilinir. Eksen eğikliği Dünya’ya benzer; bu yüzden Mars’ta da mevsimler vardır.',
    facts: [
      'Kırmızı rengi yüzeyindeki demir oksitten gelir.',
      'İki küçük uydusu vardır: Phobos ve Deimos.',
      'Bir Mars günü Dünya gününe yakındır (yaklaşık 24,6 saat).',
    ],
  },
  {
    id: 'jupiter',
    name: 'Jüpiter',
    englishName: 'Jupiter',
    category: 'gasGiant',
    radiusKm: 69_911,
    massKg: 1.898e27,
    gravityMs2: 24.79,
    orbitalRadiusAu: 5.203,
    eccentricity: 0.0489,
    inclinationDeg: 1.3,
    longitudeAscendingNodeDeg: 100.464,
    argumentPeriapsisDeg: 273.867,
    orbitalPeriodDays: 4332.59,
    rotationPeriodHours: 9.925,
    axialTiltDeg: 3.13,
    moons: 95,
    meanTempC: -110,
    atmosphere: 'Hidrojen ve helyum. Katı bir yere ayak basılmaz.',
    color: '#D4A574',
    description:
      'Jüpiter Güneş Sistemi’nin en büyük gezegenidir. Çok hızlı döner ve onlarca uydusu vardır.',
    facts: [
      'Jüpiter gaz devidir; üzerinde yürünecek katı bir yüzeyi yoktur.',
      'Büyük olduğu için daha yükseğe zıplanmaz; yerçekimi Dünya’dan daha güçlüdür.',
      'Bir günü yaklaşık 10 saattir; çok hızlı döner.',
    ],
  },
  {
    id: 'saturn',
    name: 'Satürn',
    englishName: 'Saturn',
    category: 'gasGiant',
    radiusKm: 58_232,
    massKg: 5.683e26,
    gravityMs2: 10.44,
    orbitalRadiusAu: 9.537,
    eccentricity: 0.0565,
    inclinationDeg: 2.49,
    longitudeAscendingNodeDeg: 113.665,
    argumentPeriapsisDeg: 339.392,
    orbitalPeriodDays: 10_759.22,
    rotationPeriodHours: 10.656,
    axialTiltDeg: 26.73,
    moons: 146,
    meanTempC: -140,
    atmosphere: 'Hidrojen ve helyum.',
    color: '#E6D5A8',
    description:
      'Satürn, buz ve kaya parçalarından oluşan görkemli halkalarıyla tanınır. Halkalar gezegenin ekvator düzlemindedir.',
    facts: [
      'Halkalar katı bir halka değil; buz, kaya ve toz parçalarından oluşur.',
      'Jüpiter, Uranüs ve Neptün’ün de ince halkaları vardır; Satürn’ünküler daha belirgindir.',
      'En büyük uydusu Titan’dır.',
    ],
    hasRings: true,
    ringInnerScale: 1.22,
    ringOuterScale: 2.28,
  },
  {
    id: 'uranus',
    name: 'Uranüs',
    englishName: 'Uranus',
    category: 'iceGiant',
    radiusKm: 25_362,
    massKg: 8.681e25,
    gravityMs2: 8.69,
    orbitalRadiusAu: 19.191,
    eccentricity: 0.0457,
    inclinationDeg: 0.77,
    longitudeAscendingNodeDeg: 74.006,
    argumentPeriapsisDeg: 96.998,
    orbitalPeriodDays: 30_688.5,
    rotationPeriodHours: -17.24,
    axialTiltDeg: 97.77,
    moons: 28,
    meanTempC: -195,
    atmosphere: 'Hidrojen, helyum ve metan. Metan ona mavi-yeşil rengi verir.',
    color: '#7FDBDA',
    description:
      'Uranüs neredeyse yan yatarak döner. Eksen eğikliği yaklaşık 98° olduğu için mevsimleri çok gariptir. İnce halkaları vardır.',
    facts: [
      'Ekseni neredeyse yana yatmıştır ama Uranüs yine de döner ve Güneş’in etrafında dolanır.',
      'Bu yüzden kutupları sırayla Güneş’e bakar.',
      'İnce halkaları da vardır.',
    ],
    hasRings: true,
    ringInnerScale: 1.55,
    ringOuterScale: 2.05,
  },
  {
    id: 'neptune',
    name: 'Neptün',
    englishName: 'Neptune',
    category: 'iceGiant',
    radiusKm: 24_622,
    massKg: 1.024e26,
    gravityMs2: 11.15,
    orbitalRadiusAu: 30.07,
    eccentricity: 0.0113,
    inclinationDeg: 1.77,
    longitudeAscendingNodeDeg: 131.784,
    argumentPeriapsisDeg: 276.336,
    orbitalPeriodDays: 60_182,
    rotationPeriodHours: 16.11,
    axialTiltDeg: 28.32,
    moons: 16,
    meanTempC: -200,
    atmosphere: 'Hidrojen, helyum ve metan. Güçlü rüzgârları vardır.',
    color: '#4166F5',
    description:
      'Neptün Güneş’ten en uzak gezegendir. Keşfi, matematikle yörüngenin hesaplanmasıyla mümkün olmuştur.',
    facts: [
      'Güneş Sistemi’nin en uzak gezegenidir.',
      'Rüzgârları Güneş Sistemi’ndeki en hızlılar arasındadır.',
      'En büyük uydusu Triton’dur.',
    ],
  },
  {
    id: 'pluto',
    name: 'Plüton',
    englishName: 'Pluto',
    category: 'dwarf',
    radiusKm: 1188.3,
    massKg: 1.303e22,
    gravityMs2: 0.62,
    orbitalRadiusAu: 39.482,
    eccentricity: 0.2488,
    inclinationDeg: 17.16,
    longitudeAscendingNodeDeg: 110.299,
    argumentPeriapsisDeg: 113.834,
    orbitalPeriodDays: 90_560,
    rotationPeriodHours: -153.29,
    axialTiltDeg: 122.53,
    moons: 5,
    meanTempC: -229,
    atmosphere: 'Çok ince; çoğu zaman donmuş azot ve metan.',
    color: '#C4A484',
    description:
      'Plüton 2006’da cüce gezegen olarak sınıflandırıldı. Yörüngesi oldukça basık ve eğiktir. En büyük uydusu Kharon’dur.',
    facts: [
      'Plüton bir cüce gezegendir; Güneş Sistemi’ni anlamamıza yardımcı olur.',
      'Güneş Sistemi Plüton’da bitmez; daha ötede Kuiper Kuşağı vardır.',
      'Yörüngesi o kadar basıktır ki bazen Neptün’den Güneş’e daha yakın geçer.',
    ],
  },
]

const BY_ID = new Map(BODIES.map((body) => [body.id, body]))

export function getBody(id: BodyId): PlanetDefinition {
  const body = BY_ID.get(id)
  if (!body) {
    throw new Error(`Bilinmeyen gök cismi: ${id}`)
  }
  return body
}

export function getPlanets(): PlanetDefinition[] {
  return BODIES.filter((body) => body.category !== 'moon' && body.id !== 'sun')
}

export function getSelectableBodies(): PlanetDefinition[] {
  return [...BODIES]
}

export function getMoonsOf(parentId: BodyId): PlanetDefinition[] {
  return BODIES.filter((body) => body.parentId === parentId)
}
