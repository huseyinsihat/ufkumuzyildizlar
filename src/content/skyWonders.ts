import { equatorialToSceneDir } from '../astronomy/skyCoordinates'
import { starHex } from '../astronomy/starSpectrum'
import type { Vec3 } from '../types/simulation'

export type SkyWonderKind = 'star' | 'rock' | 'cluster' | 'nebula'

export interface SkyWonder {
  id: string
  name: string
  tag: string
  fact: string
  kind: SkyWonderKind
  /** Short well-known Turkish name, shown in parentheses in lists. */
  nickname?: string
  /** Extra classroom facts, shown after “Daha fazla”. */
  facts?: string[]
}

export interface NotableStar extends SkyWonder {
  x: number
  y: number
  z: number
  color: string
  raHours: number
  decDeg: number
  /** Physical radius in Sun radii — used for educational visual scale, not true distance. */
  radiusSolar: number
  /** Apparent magnitude; lower is brighter. */
  mag: number
  /** Effective temperature in kelvin — drives spectral color and photosphere look. */
  tempK: number
  /** Distance from the Sun / Earth, light-years. Gaia / SIMBAD educational values. */
  distLy: number
  /** Total proper motion, arcseconds per year. */
  pmArcsecYr?: number
  /** Morgan–Keenan spectral type. */
  spectral?: string
  facts: string[]
}

export type NamedRock = SkyWonder & {
  au: number
  size: number
  tilt: number
  facts: string[]
}

interface StarExtra {
  distLy: number
  pmArcsecYr?: number
  spectral?: string
  facts: string[]
  kind?: SkyWonderKind
  nickname?: string
}

function starDir(raHours: number, decDeg: number): Vec3 {
  return equatorialToSceneDir(raHours, decDeg)
}

function notable(
  id: string,
  name: string,
  tag: string,
  fact: string,
  raHours: number,
  decDeg: number,
  tempK: number,
  radiusSolar: number,
  mag: number,
  extra: StarExtra,
): NotableStar {
  const kind = extra.kind ?? 'star'
  return {
    id,
    name,
    tag,
    fact,
    kind,
    raHours,
    decDeg,
    ...starDir(raHours, decDeg),
    color: kind === 'nebula' ? '#ffb8e8' : starHex(tempK),
    radiusSolar,
    mag,
    tempK,
    nickname: extra.nickname,
    distLy: extra.distLy,
    pmArcsecYr: extra.pmArcsecYr,
    spectral: extra.spectral,
    facts: extra.facts,
  }
}

export const NOTABLE_STARS: NotableStar[] = [
  notable(
    'sirius',
    'Sirius',
    'En parlak',
    'Gece göğünün en parlak yıldızıdır. Işığı bize yaklaşık 8,6 yılda gelir.',
    6.7525,
    -16.7161,
    9940,
    1.71,
    -1.46,
    {
      nickname: 'Akyıldız',
      distLy: 8.6,
      pmArcsecYr: 1.34,
      spectral: 'A1V',
      facts: [
        'Işığı Dünya’ya yaklaşık 8,6 yılda ulaşır.',
        'Gökyüzünde yılda 1,34 açı saniyesi kayar; yakındaki yıldızlar için bu hızlıdır.',
        'Aslında iki yıldızdır: parlak Sirius A ve cüce Sirius B.',
        'Spektrumu A1V’dir; Güneş’ten daha sıcak ve beyazdır.',
      ],
    },
  ),
  notable(
    'proxima',
    'Proxima Centauri',
    'En yakın',
    'Güneş’ten sonra bize en yakın yıldızdır. Işığı yaklaşık 4 yıl 3 ayda gelir.',
    14.6601,
    -62.6794,
    3042,
    0.154,
    11.13,
    {
      distLy: 4.24,
      pmArcsecYr: 3.86,
      spectral: 'M5.5V',
      facts: [
        'Uzaklığı 4,24 ışık yılıdır; Güneş’ten sonra en yakın yıldızdır.',
        'Gökyüzünde yılda 3,86 açı saniyesi kayar.',
        'Kırmızı cücedir. Çıplak gözle görülmez; parlaklığı 11,1 kadirdir.',
        'Yanında Proxima b adlı bir gezegen bulunur.',
      ],
    },
  ),
  notable(
    'polaris',
    'Kutup Yıldızı',
    'Polaris',
    'Kuzey yönünü gösterir. Gökyüzünde neredeyse yerinde durur.',
    2.5303,
    89.2641,
    6015,
    37.5,
    1.98,
    {
      nickname: 'Kutup',
      distLy: 430,
      pmArcsecYr: 0.046,
      spectral: 'F7Ib',
      facts: [
        'Uzaklığı yaklaşık 430 ışık yılıdır.',
        'Kuzey göğünün dönüş eksenine çok yakındır; bu yüzden yerinde durur gibi görünür.',
        'Gökyüzünde kayışı çok küçüktür: yılda 0,05 açı saniyesi.',
        'Sefe değişenidir; parlaklığı yavaşça iner çıkar.',
      ],
    },
  ),
  notable(
    'betelgeuse',
    'Betelgeuse',
    'Kırmızı büyük',
    'Orion’daki kırmızı büyük yıldızdır. Güneş’ten yüzlerce kat büyüktür.',
    5.9195,
    7.407,
    3600,
    764,
    0.42,
    {
      distLy: 550,
      pmArcsecYr: 0.03,
      spectral: 'M1–M2 Ia',
      facts: [
        'Uzaklığı yaklaşık 550 ışık yılıdır (ölçüm biraz tartışmalıdır).',
        'Kırmızı süperdevdir. Güneş’in yerinde olsa Jüpiter yörüngesine yaklaşırdı.',
        'Yüzeyi soğuktur, yaklaşık 3600 K; bu yüzden turuncu-kırmızı görünür.',
        'Bir gün süpernova olabilir; bu milyonlarca yıl sürebilir, yarın olmaz.',
      ],
    },
  ),
  notable(
    'rigel',
    'Rigel',
    'Mavi dev',
    'Orion’un ayağındaki mavi-beyaz büyük yıldızdır. Çok parlaktır.',
    5.2423,
    -8.2016,
    12100,
    78.9,
    0.13,
    {
      distLy: 860,
      pmArcsecYr: 0.002,
      spectral: 'B8 Ia',
      facts: [
        'Uzaklığı yaklaşık 860 ışık yılıdır.',
        'Mavi süperdevdir. Sıcaklığı 12 100 K civarındadır.',
        'Güneş’ten on binlerce kat fazla ışık üretir.',
        'Yakınında daha sönük yoldaş yıldızlar da vardır.',
      ],
    },
  ),
  notable(
    'vycma',
    'VY Canis Majoris',
    'Dev yıldız',
    'Bilinen en büyük yıldızlardan biridir. Güneş’in yerinde olsa Jüpiter’e kadar uzanırdı.',
    7.3849,
    -25.7675,
    3490,
    1420,
    6.5,
    {
      distLy: 3900,
      pmArcsecYr: 0.006,
      spectral: 'M5 Iae',
      facts: [
        'Uzaklığı yaklaşık 3900 ışık yılıdır.',
        'Kırmızı hiperdevdir. Yarıçapı Güneş’in binden katıdır.',
        'Etrafına bol toz ve gaz üfler; bu yüzden kırmızı ve şişkindir.',
        'Çıplak gözle zor görülür; küçük bir teleskopla seçilir.',
      ],
    },
  ),
  notable(
    'earendel',
    'Earendel',
    'En uzaklardan',
    'Bilinen en uzak yıldızlardan biridir. Işığı çok uzun yolda gelmiştir.',
    1.625,
    -8.454,
    20000,
    50,
    27,
    {
      distLy: 12_900_000_000,
      spectral: 'B',
      facts: [
        'Işığı yaklaşık 13 milyar yıldır yoldadır. Evren henüz çok gençken çıkmıştır.',
        'WHL0137-LS katalog adıdır. Hubble bir mercek gökadasının arkasında yakaladı.',
        'Bu kadar uzakta tek yıldız normalde görünmez; öndeki küme ışığını büyütür.',
        'Gökyüzünde kayışını ölçemeyiz; çok soluk ve çok uzaktır.',
      ],
    },
  ),
  notable(
    'vega',
    'Vega',
    'Yaz üçgeni',
    'Kuzey göğünün en parlak yıldızlarındandır. Yaz üçgeninin bir köşesidir; ışığı yaklaşık 25 yılda gelir.',
    18.6156,
    38.7838,
    9602,
    2.36,
    0.03,
    {
      distLy: 25.0,
      pmArcsecYr: 0.35,
      spectral: 'A0V',
      facts: [
        'Uzaklığı 25 ışık yılıdır.',
        'Yaz üçgeninin bir köşesidir. Spektrumu A0V’dir; beyaz ve sıcaktır.',
        'Yaklaşık 12 000 yıl önce kuzey kutup yıldızıydı; ileride yine olacak.',
        'Etrafında toz diski vardır; gezegen oluşumu izi taşır.',
      ],
    },
  ),
  notable(
    'arcturus',
    'Arcturus',
    'Turuncu dev',
    'Kuzey göğünün en parlak yıldızıdır. Güneş’ten daha yaşlı, turuncu bir devdir.',
    14.261,
    19.1824,
    4286,
    25.4,
    -0.05,
    {
      nickname: 'Çoban',
      distLy: 36.7,
      pmArcsecYr: 2.28,
      spectral: 'K1.5 III',
      facts: [
        'Uzaklığı 36,7 ışık yılıdır.',
        'Gökyüzünde yılda 2,28 açı saniyesi kayar; yakın parlak yıldızlar arasında çok hızlıdır.',
        'Turuncu bir devdir. Güneş’ten daha yaşlıdır.',
        'Samanyolu’nun kalın diskinden geçen bir yıldızdır; yolculuğu Güneş’ten farklıdır.',
      ],
    },
  ),
  notable(
    'antares',
    'Antares',
    'Akrep’in kalbi',
    'Akrep’teki kırmızı büyük yıldızdır. Rengi Mars’a benzer.',
    16.4901,
    -26.432,
    3660,
    680,
    0.96,
    {
      nickname: 'Akrep',
      distLy: 550,
      pmArcsecYr: 0.026,
      spectral: 'M1.5 Iab',
      facts: [
        'Uzaklığı yaklaşık 550 ışık yılıdır.',
        'Adı “Mars’ın rakibi” anlamına gelir; rengi kızıldır.',
        'Kırmızı süperdevdir. Yanında daha mavi bir yoldaş yıldız vardır.',
        'Akrep takımyıldızının kalbi gibi durur.',
      ],
    },
  ),
  notable(
    'canopus',
    'Canopus',
    'Güneyin parlakı',
    'Sirius’tan sonra göğün en parlak ikinci yıldızıdır. Güney yarımküreden daha kolay görülür.',
    6.3992,
    -52.6957,
    7400,
    71,
    -0.74,
    {
      nickname: 'Süheyl',
      distLy: 310,
      pmArcsecYr: 0.031,
      spectral: 'A9 II',
      facts: [
        'Uzaklığı yaklaşık 310 ışık yılıdır.',
        'Görünür parlaklıkta Sirius’tan sonra ikinci sıradadır.',
        'Parlak bir devdir. Spektrumu A9 II’dir.',
        'Türkiye’den kışın güney ufkunda, açık havada zor seçilir.',
      ],
    },
  ),
  notable(
    'deneb',
    'Deneb',
    'Kuğu’nun kuyruğu',
    'Kuğu takımyıldızının kuyruğudur. Çok uzaktır; ışığı binlerce yılda gelir ama yine de parlak görünür.',
    20.6905,
    45.2803,
    8525,
    203,
    1.25,
    {
      nickname: 'Kuğu',
      distLy: 2600,
      pmArcsecYr: 0.002,
      spectral: 'A2 Ia',
      facts: [
        'Uzaklığı yaklaşık 2600 ışık yılıdır. Yaz üçgenindeki en uzak köşedir.',
        'Bu kadar uzakta hâlâ parlak görünmesi, çok güçlü bir süperdev olduğunu gösterir.',
        'Işığı yola çıktığında Dünya’da henüz demir çağı vardı.',
        'Spektrumu A2 Ia’dır; sıcak ve beyazdır.',
      ],
    },
  ),
  notable(
    'altair',
    'Altair',
    'Kartal',
    'Yaz üçgeninin bir diğer köşesidir. Güneş’e Vega’dan daha yakındır; ışığı yaklaşık 17 yılda gelir.',
    19.8464,
    8.8683,
    7550,
    1.63,
    0.76,
    {
      nickname: 'Kartal',
      distLy: 16.7,
      pmArcsecYr: 0.66,
      spectral: 'A7 V',
      facts: [
        'Uzaklığı 16,7 ışık yılıdır; Yaz üçgeninin en yakın köşesidir.',
        'Gökyüzünde yılda 0,66 açı saniyesi kayar.',
        'Çok hızlı döner. Bu yüzden kutupları basık, ekvatoru şişkindir.',
        'Spektrumu A7 V’dir; beyaz bir anakol yıldızıdır.',
      ],
    },
  ),
  notable(
    'capella',
    'Capella',
    'Keçi yıldızı',
    'Arabacı takımyıldızının parlak keçi yıldızıdır. Aslında birbirine yakın iki sarı devden oluşur.',
    5.2782,
    45.998,
    4970,
    12,
    0.08,
    {
      nickname: 'Keçi',
      distLy: 42.9,
      pmArcsecYr: 0.44,
      spectral: 'G3 III + G0 III',
      facts: [
        'Uzaklığı 42,9 ışık yılıdır.',
        'Tek yıldız gibi görünür; aslında iki sarı dev birbirinin etrafında döner.',
        'Gökyüzünde yılda 0,44 açı saniyesi kayar.',
        'Kış göğünün en parlak yıldızlarındandır.',
      ],
    },
  ),
  notable(
    'aldebaran',
    'Aldebaran',
    'Boğa’nın gözü',
    'Boğa takımyıldızının kızıl gözüdür. Turuncu bir devdir; Ülker kümesine yakın görünür.',
    4.5987,
    16.5093,
    3910,
    45,
    0.85,
    {
      nickname: 'Boğa',
      distLy: 65.3,
      pmArcsecYr: 0.20,
      spectral: 'K5 III',
      facts: [
        'Uzaklığı 65 ışık yılıdır.',
        'Ülker kümesinin önünde durur; onlarla aynı aile değildir, daha yakındır.',
        'Turuncu bir devdir. Spektrumu K5 III’tür.',
        'Gökyüzünde yılda 0,20 açı saniyesi kayar.',
      ],
    },
  ),
  notable(
    'spica',
    'Spica',
    'Başak’ın başağı',
    'Başak takımyıldızının en parlak yıldızıdır. Mavi-beyaz ve çok sıcaktır.',
    13.4199,
    -11.1613,
    25400,
    7.5,
    0.97,
    {
      nickname: 'Başak',
      distLy: 250,
      pmArcsecYr: 0.053,
      spectral: 'B1 V',
      facts: [
        'Uzaklığı yaklaşık 250 ışık yılıdır.',
        'İki sıcak mavi yıldızdan oluşur. Spektrumu B1 V’dir.',
        'Yüzey sıcaklığı 25 000 K civarındadır; Güneş’ten çok daha sıcaktır.',
        'Başak takımyıldızının başağı gibi durur.',
      ],
    },
  ),
  notable(
    'fomalhaut',
    'Fomalhaut',
    'Güney balığı',
    'Güney Balığı’nın ağzındaki parlak yıldızdır. Etrafında toz diski vardır.',
    22.9608,
    -29.6222,
    8590,
    1.84,
    1.16,
    {
      distLy: 25.1,
      pmArcsecYr: 0.37,
      spectral: 'A4 V',
      facts: [
        'Uzaklığı 25 ışık yılıdır.',
        'Etrafında geniş bir toz diski vardır; genç bir gezegen sistemi izi taşır.',
        'Gökyüzünde yılda 0,37 açı saniyesi kayar.',
        'Sonbahar göğünün güneyinde, tek başına parlak durur.',
      ],
    },
  ),
  notable(
    'alphacen',
    'Alpha Centauri',
    'Komşu güneş',
    'Güneş’e en yakın parlak yıldız sistemidir. Proxima onun küçük, kırmızı komşusudur.',
    14.6607,
    -60.8354,
    5790,
    1.22,
    -0.27,
    {
      distLy: 4.37,
      pmArcsecYr: 3.72,
      spectral: 'G2 V',
      facts: [
        'Uzaklığı 4,37 ışık yılıdır; Güneş’e en yakın parlak yıldız çiftidir.',
        'Gökyüzünde yılda 3,72 açı saniyesi kayar.',
        'Alpha Centauri A, Güneş’e çok benzer (G2 V). B biraz daha küçük ve turuncudur.',
        'Proxima aynı sistemin üçüncü, sönük üyesidir.',
      ],
    },
  ),
  notable(
    'barnard',
    'Barnard Yıldızı',
    'Hızlı yıldız',
    'Gökyüzünde en hızlı kayan yıldızlardan biridir. Çok yakındır ama çıplak gözle zor görülür.',
    17.9635,
    4.6934,
    3134,
    0.2,
    9.51,
    {
      distLy: 5.96,
      pmArcsecYr: 10.3,
      spectral: 'M4 V',
      facts: [
        'Uzaklığı 5,96 ışık yılıdır. Alpha Centauri ailesinden sonra bize en yakın yıldızdır.',
        'Gökyüzünde bilinen en hızlı kayışa sahiptir: yılda 10,3 açı saniyesi. Bir insan ömründe yerini fark edilir değiştirir.',
        'Bize doğru da yaklaşık 110 km/s yaklaşır.',
        'Kırmızı cücedir (M4 V). Görünür parlaklığı 9,5 kadirdir; çıplak gözle görülmez.',
      ],
    },
  ),
  notable(
    'pollux',
    'Pollux',
    'İkizler',
    'İkizler’in turuncu kardeşidir. Castor’dan daha parlaktır.',
    7.7553,
    28.0262,
    4666,
    8.8,
    1.14,
    {
      distLy: 33.8,
      pmArcsecYr: 0.63,
      spectral: 'K0 III',
      facts: [
        'Uzaklığı 33,8 ışık yılıdır.',
        'İkizler’in daha parlak kardeşidir. Castor aslında birkaç yıldızdan oluşur.',
        'Turuncu bir devdir. Spektrumu K0 III’tür.',
        'Yanında Pollux b adlı bir gezegen bulunur.',
      ],
    },
  ),
  notable(
    'algol',
    'Algol',
    'Değişen yıldız',
    'Perseus’taki “şeytan yıldızı”dır. Eşinin önünden geçince parlaklığı birkaç saatte solar.',
    3.1361,
    40.9556,
    13000,
    2.9,
    2.12,
    {
      nickname: 'Şeytan',
      distLy: 90,
      pmArcsecYr: 0.003,
      spectral: 'B8 V',
      facts: [
        'Uzaklığı yaklaşık 90 ışık yılıdır.',
        'Örten çiftyıldızdır. Yaklaşık 2 gün 21 saatte bir eşi önden geçer, ışığı solar.',
        'Eski gökbilimciler bu inip çıkmayı “göz kırpan şeytan” sandı.',
        'Ana yıldız B8 V spektrumundadır; sıcaktır.',
      ],
    },
  ),
  notable(
    'pleiades',
    'Ülker',
    'Yedi kız kardeş',
    'Ülker, genç mavi yıldızlardan oluşan açık bir kümedir. Çıplak gözle küçük bir bulut gibi görünür.',
    3.791,
    24.105,
    12500,
    18,
    1.6,
    {
      kind: 'cluster',
      distLy: 444,
      pmArcsecYr: 0.05,
      spectral: 'B',
      facts: [
        'Uzaklığı yaklaşık 444 ışık yılıdır.',
        'Yüzlerce genç, sıcak yıldızdan oluşur. Çıplak gözle 6–7 tanesi seçilir.',
        'Yaşı yaklaşık 100 milyon yıldır; Güneş’ten çok daha gençtir.',
        'Mavi ışıkları, etraflarındaki tozu da aydınlatır.',
      ],
    },
  ),
  notable(
    'm42',
    'Orion Bulutsusu',
    'Yıldız fabrikası',
    'Orion’un kılıcındaki pembe bulutsudur. Yeni yıldızlar burada doğar.',
    5.588,
    -5.391,
    7500,
    40,
    4,
    {
      kind: 'nebula',
      distLy: 1340,
      facts: [
        'Uzaklığı yaklaşık 1340 ışık yılıdır.',
        'Yeni yıldızların doğduğu bir gaz ve toz bulutudur.',
        'Ortadaki Trapezium yıldızları bulutu ısıtır; bu yüzden parlar.',
        'Kışın, karanlık bir gökte çıplak gözle küçük bir leke gibi durur.',
      ],
    },
  ),
]

export function isNotableStar(wonder: SkyWonder): wonder is NotableStar {
  return 'distLy' in wonder && 'tempK' in wonder
}

export function starDisplayName(star: Pick<NotableStar, 'name' | 'nickname'>): string {
  return star.nickname ? `${star.name} (${star.nickname})` : star.name
}

export function starsAlphabetical(): NotableStar[] {
  return [...NOTABLE_STARS].sort((a, b) =>
    starDisplayName(a).localeCompare(starDisplayName(b), 'tr', { sensitivity: 'base' }),
  )
}

export const NAMED_ROCKS: NamedRock[] = [
  {
    id: 'ceres',
    name: 'Ceres',
    tag: 'Çok küçük',
    fact: 'Taş kuşağının en iri cisimidir. Çok küçüktür. Üzerinde buz izleri vardır.',
    kind: 'rock',
    au: 2.77,
    size: 0.28,
    tilt: 0.12,
    facts: [
      'Güneş’e uzaklığı ortalama 2,77 astronomi birimidir.',
      'Cüce gezegen sayılır. Taş kuşağındaki en iri cisimdir.',
      'Dawn uzay aracı 2015’te etrafında dolandı; yüzeyinde parlak tuz izleri gördü.',
    ],
  },
  {
    id: 'vesta',
    name: 'Vesta',
    tag: 'Parlak asteroit',
    fact: 'Kuşaktaki en parlak asteroitlerden biridir. Bazen çıplak gözle görülebilir.',
    kind: 'rock',
    au: 2.36,
    size: 0.18,
    tilt: -0.08,
    facts: [
      'Güneş’e uzaklığı ortalama 2,36 astronomi birimidir.',
      'Taş kuşağının en parlak üyelerindendir; bazen çıplak gözle seçilir.',
      'Dawn aracı 2011’de Vesta’yı da ziyaret etti.',
    ],
  },
  {
    id: 'pallas',
    name: 'Pallas',
    tag: 'Eğik yörünge',
    fact: 'Keşfedilen ikinci asteroittir. Yörüngesi diğerlerine göre daha eğiktir.',
    kind: 'rock',
    au: 2.77,
    size: 0.16,
    tilt: 0.34,
    facts: [
      'Güneş’e uzaklığı ortalama 2,77 astronomi birimidir.',
      '1802’de keşfedildi; ikinci bulunan asteroittir.',
      'Yörüngesi taş kuşağına göre daha eğiktir; bu yüzden yolu farklı görünür.',
    ],
  },
]

export function findWonder(id: string | null): SkyWonder | undefined {
  if (!id) return undefined
  return NOTABLE_STARS.find((item) => item.id === id) ?? NAMED_ROCKS.find((item) => item.id === id)
}

export function wonderKindLabel(kind: SkyWonderKind): string {
  if (kind === 'star') return 'Yıldız'
  if (kind === 'cluster') return 'Yıldız kümesi'
  if (kind === 'nebula') return 'Bulutsu'
  return 'Küçük cisim'
}
