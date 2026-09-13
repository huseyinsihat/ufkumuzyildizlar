import { equatorialToSceneDir } from '../astronomy/skyCoordinates'
import { starHex } from '../astronomy/starSpectrum'
import { L, tx, type AppLang, type LocText } from '../i18n/types'
import { UI } from '../i18n/ui'
import type { Vec3 } from '../types/simulation'

export type SkyWonderKind = 'star' | 'rock' | 'cluster' | 'nebula'

export interface SkyWonder {
  id: string
  name: string
  tag: LocText
  fact: LocText
  kind: SkyWonderKind
  /** Short well-known Turkish name, shown in parentheses in lists. */
  nickname?: string
  /** Extra classroom facts, shown after “Daha fazla”. */
  facts?: LocText[]
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
  facts: LocText[]
}

export type NamedRock = SkyWonder & {
  au: number
  size: number
  tilt: number
  facts: LocText[]
}

interface StarExtra {
  distLy: number
  pmArcsecYr?: number
  spectral?: string
  facts: LocText[]
  kind?: SkyWonderKind
  nickname?: string
}

function starDir(raHours: number, decDeg: number): Vec3 {
  return equatorialToSceneDir(raHours, decDeg)
}

function notable(
  id: string,
  name: string,
  tag: LocText,
  fact: LocText,
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
    L('En parlak', 'Brightest'),
    L('Gece göğünün en parlak yıldızıdır. Işığı bize yaklaşık 8,6 yılda gelir.', 'It is the brightest star in the night sky. Its light takes about 8.6 years to reach us.'),
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
        L('Işığı Dünya’ya yaklaşık 8,6 yılda ulaşır.', 'Its light reaches Earth in about 8.6 years.'),
        L('Gökyüzünde yılda 1,34 açı saniyesi kayar; yakındaki yıldızlar için bu hızlıdır.', 'It drifts 1.34 arcseconds a year in the sky; that is fast for a nearby star.'),
        L('Aslında iki yıldızdır: parlak Sirius A ve cüce Sirius B.', 'It is really two stars: bright Sirius A and dwarf Sirius B.'),
        L('Spektrumu A1V’dir; Güneş’ten daha sıcak ve beyazdır.', 'Its spectrum is A1V; it is hotter and whiter than the Sun.'),
      ],
    },
  ),
  notable(
    'proxima',
    'Proxima Centauri',
    L('En yakın', 'Nearest'),
    L('Güneş’ten sonra bize en yakın yıldızdır. Işığı yaklaşık 4 yıl 3 ayda gelir.', 'After the Sun, it is the closest star to us. Its light takes about 4 years 3 months.'),
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
        L('Uzaklığı 4,24 ışık yılıdır; Güneş’ten sonra en yakın yıldızdır.', 'Its distance is 4.24 light years; it is the closest star after the Sun.'),
        L('Gökyüzünde yılda 3,86 açı saniyesi kayar.', 'It drifts 3.86 arcseconds a year in the sky.'),
        L('Kırmızı cücedir. Çıplak gözle görülmez; parlaklığı 11,1 kadirdir.', 'It is a red dwarf. You cannot see it with your eyes; its brightness is magnitude 11.1.'),
        L('Yanında Proxima b adlı bir gezegen bulunur.', 'It has a planet called Proxima b.'),
      ],
    },
  ),
  notable(
    'polaris',
    'Kutup Yıldızı',
    L('Polaris', 'Polaris'),
    L('Kuzey yönünü gösterir. Gökyüzünde neredeyse yerinde durur.', 'It points north. It almost stays in place in the sky.'),
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
        L('Uzaklığı yaklaşık 430 ışık yılıdır.', 'Its distance is about 430 light years.'),
        L('Kuzey göğünün dönüş eksenine çok yakındır; bu yüzden yerinde durur gibi görünür.', 'It is very close to the north sky’s spin axis; that is why it looks still.'),
        L('Gökyüzünde kayışı çok küçüktür: yılda 0,05 açı saniyesi.', 'Its sky drift is very small: 0.05 arcseconds a year.'),
        L('Sefe değişenidir; parlaklığı yavaşça iner çıkar.', 'It is a Cepheid variable; its brightness slowly goes up and down.'),
      ],
    },
  ),
  notable(
    'betelgeuse',
    'Betelgeuse',
    L('Kırmızı büyük', 'Red giant'),
    L('Orion’daki kırmızı büyük yıldızdır. Güneş’ten yüzlerce kat büyüktür.', 'It is the red giant star in Orion. It is hundreds of times bigger than the Sun.'),
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
        L('Uzaklığı yaklaşık 550 ışık yılıdır (ölçüm biraz tartışmalıdır).', 'Its distance is about 550 light years (the measure is a bit debated).'),
        L('Kırmızı süperdevdir. Güneş’in yerinde olsa Jüpiter yörüngesine yaklaşırdı.', 'It is a red supergiant. If it sat in the Sun’s place, it would reach near Jupiter’s path.'),
        L('Yüzeyi soğuktur, yaklaşık 3600 K; bu yüzden turuncu-kırmızı görünür.', 'Its surface is cool, about 3600 K; that is why it looks orange-red.'),
        L('Bir gün süpernova olabilir; bu milyonlarca yıl sürebilir, yarın olmaz.', 'One day it may become a supernova; that can take millions of years, not tomorrow.'),
      ],
    },
  ),
  notable(
    'rigel',
    'Rigel',
    L('Mavi dev', 'Blue giant'),
    L('Orion’un ayağındaki mavi-beyaz büyük yıldızdır. Çok parlaktır.', 'It is the blue-white giant at Orion’s foot. It is very bright.'),
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
        L('Uzaklığı yaklaşık 860 ışık yılıdır.', 'Its distance is about 860 light years.'),
        L('Mavi süperdevdir. Sıcaklığı 12 100 K civarındadır.', 'It is a blue supergiant. Its temperature is about 12,100 K.'),
        L('Güneş’ten on binlerce kat fazla ışık üretir.', 'It makes tens of thousands of times more light than the Sun.'),
        L('Yakınında daha sönük yoldaş yıldızlar da vardır.', 'It also has fainter companion stars nearby.'),
      ],
    },
  ),
  notable(
    'vycma',
    'VY Canis Majoris',
    L('Dev yıldız', 'Giant star'),
    L('Bilinen en büyük yıldızlardan biridir. Güneş’in yerinde olsa Jüpiter’e kadar uzanırdı.', 'It is one of the biggest known stars. If it sat in the Sun’s place, it would reach Jupiter.'),
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
        L('Uzaklığı yaklaşık 3900 ışık yılıdır.', 'Its distance is about 3900 light years.'),
        L('Kırmızı hiperdevdir. Yarıçapı Güneş’in binden katıdır.', 'It is a red hypergiant. Its radius is more than a thousand Suns.'),
        L('Etrafına bol toz ve gaz üfler; bu yüzden kırmızı ve şişkindir.', 'It blows lots of dust and gas around it; that is why it looks red and puffed.'),
        L('Çıplak gözle zor görülür; küçük bir teleskopla seçilir.', 'It is hard to see with your eyes; a small telescope can pick it out.'),
      ],
    },
  ),
  notable(
    'earendel',
    'Earendel',
    L('En uzaklardan', 'Among the farthest'),
    L('Bilinen en uzak yıldızlardan biridir. Işığı çok uzun yolda gelmiştir.', 'It is one of the farthest known stars. Its light has traveled a very long way.'),
    1.625,
    -8.454,
    20000,
    50,
    27,
    {
      distLy: 12_900_000_000,
      spectral: 'B',
      facts: [
        L('Işığı yaklaşık 13 milyar yıldır yoldadır. Evren henüz çok gençken çıkmıştır.', 'Its light has been traveling about 13 billion years. It left when the universe was still very young.'),
        L('WHL0137-LS katalog adıdır. Hubble bir mercek gökadasının arkasında yakaladı.', 'WHL0137-LS is its catalog name. Hubble caught it behind a lens galaxy.'),
        L('Bu kadar uzakta tek yıldız normalde görünmez; öndeki küme ışığını büyütür.', 'A single star this far is not normally seen; the cluster in front magnifies its light.'),
        L('Gökyüzünde kayışını ölçemeyiz; çok soluk ve çok uzaktır.', 'We cannot measure its sky drift; it is too faint and too far.'),
      ],
    },
  ),
  notable(
    'vega',
    'Vega',
    L('Yaz üçgeni', 'Summer Triangle'),
    L('Kuzey göğünün en parlak yıldızlarındandır. Yaz üçgeninin bir köşesidir; ışığı yaklaşık 25 yılda gelir.', 'It is one of the brightest stars in the northern sky. It is one corner of the Summer Triangle; its light takes about 25 years.'),
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
        L('Uzaklığı 25 ışık yılıdır.', 'Its distance is 25 light years.'),
        L('Yaz üçgeninin bir köşesidir. Spektrumu A0V’dir; beyaz ve sıcaktır.', 'It is one corner of the Summer Triangle. Its spectrum is A0V; it is white and hot.'),
        L('Yaklaşık 12 000 yıl önce kuzey kutup yıldızıydı; ileride yine olacak.', 'About 12,000 years ago it was the north pole star; it will be again later.'),
        L('Etrafında toz diski vardır; gezegen oluşumu izi taşır.', 'It has a dust disk around it; that is a trace of planet making.'),
      ],
    },
  ),
  notable(
    'arcturus',
    'Arcturus',
    L('Turuncu dev', 'Orange giant'),
    L('Kuzey göğünün en parlak yıldızıdır. Güneş’ten daha yaşlı, turuncu bir devdir.', 'It is the brightest star in the northern sky. It is an orange giant, older than the Sun.'),
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
        L('Uzaklığı 36,7 ışık yılıdır.', 'Its distance is 36.7 light years.'),
        L('Gökyüzünde yılda 2,28 açı saniyesi kayar; yakın parlak yıldızlar arasında çok hızlıdır.', 'It drifts 2.28 arcseconds a year; among nearby bright stars that is very fast.'),
        L('Turuncu bir devdir. Güneş’ten daha yaşlıdır.', 'It is an orange giant. It is older than the Sun.'),
        L('Samanyolu’nun kalın diskinden geçen bir yıldızdır; yolculuğu Güneş’ten farklıdır.', 'It is a star passing through the Milky Way’s thick disk; its path is different from the Sun’s.'),
      ],
    },
  ),
  notable(
    'antares',
    'Antares',
    L('Akrep’in kalbi', 'Heart of Scorpius'),
    L('Akrep’teki kırmızı büyük yıldızdır. Rengi Mars’a benzer.', 'It is the red giant star in Scorpius. Its color looks like Mars.'),
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
        L('Uzaklığı yaklaşık 550 ışık yılıdır.', 'Its distance is about 550 light years.'),
        L('Adı “Mars’ın rakibi” anlamına gelir; rengi kızıldır.', 'Its name means “rival of Mars”; its color is red.'),
        L('Kırmızı süperdevdir. Yanında daha mavi bir yoldaş yıldız vardır.', 'It is a red supergiant. It has a bluer companion star beside it.'),
        L('Akrep takımyıldızının kalbi gibi durur.', 'It sits like the heart of the Scorpius constellation.'),
      ],
    },
  ),
  notable(
    'canopus',
    'Canopus',
    L('Güneyin parlakı', 'Southern bright star'),
    L('Sirius’tan sonra göğün en parlak ikinci yıldızıdır. Güney yarımküreden daha kolay görülür.', 'After Sirius, it is the second brightest star in the sky. It is easier to see from the southern hemisphere.'),
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
        L('Uzaklığı yaklaşık 310 ışık yılıdır.', 'Its distance is about 310 light years.'),
        L('Görünür parlaklıkta Sirius’tan sonra ikinci sıradadır.', 'In apparent brightness it is second after Sirius.'),
        L('Parlak bir devdir. Spektrumu A9 II’dir.', 'It is a bright giant. Its spectrum is A9 II.'),
        L('Türkiye’den kışın güney ufkunda, açık havada zor seçilir.', 'From Turkey in winter it is hard to pick out on the southern horizon, in clear weather.'),
      ],
    },
  ),
  notable(
    'deneb',
    'Deneb',
    L('Kuğu’nun kuyruğu', 'Tail of Cygnus'),
    L('Kuğu takımyıldızının kuyruğudur. Çok uzaktır; ışığı binlerce yılda gelir ama yine de parlak görünür.', 'It is the tail of Cygnus. It is very far; its light takes thousands of years, but it still looks bright.'),
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
        L('Uzaklığı yaklaşık 2600 ışık yılıdır. Yaz üçgenindeki en uzak köşedir.', 'Its distance is about 2600 light years. It is the farthest corner of the Summer Triangle.'),
        L('Bu kadar uzakta hâlâ parlak görünmesi, çok güçlü bir süperdev olduğunu gösterir.', 'Looking bright from this far shows it is a very strong supergiant.'),
        L('Işığı yola çıktığında Dünya’da henüz demir çağı vardı.', 'When its light left, Earth was still in the Iron Age.'),
        L('Spektrumu A2 Ia’dır; sıcak ve beyazdır.', 'Its spectrum is A2 Ia; it is hot and white.'),
      ],
    },
  ),
  notable(
    'altair',
    'Altair',
    L('Kartal', 'Eagle'),
    L('Yaz üçgeninin bir diğer köşesidir. Güneş’e Vega’dan daha yakındır; ışığı yaklaşık 17 yılda gelir.', 'It is another corner of the Summer Triangle. It is closer to the Sun than Vega; its light takes about 17 years.'),
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
        L('Uzaklığı 16,7 ışık yılıdır; Yaz üçgeninin en yakın köşesidir.', 'Its distance is 16.7 light years; it is the nearest corner of the Summer Triangle.'),
        L('Gökyüzünde yılda 0,66 açı saniyesi kayar.', 'It drifts 0.66 arcseconds a year in the sky.'),
        L('Çok hızlı döner. Bu yüzden kutupları basık, ekvatoru şişkindir.', 'It spins very fast. That is why its poles are flattened and its equator is puffed.'),
        L('Spektrumu A7 V’dir; beyaz bir anakol yıldızıdır.', 'Its spectrum is A7 V; it is a white main-sequence star.'),
      ],
    },
  ),
  notable(
    'capella',
    'Capella',
    L('Keçi yıldızı', 'Goat star'),
    L('Arabacı takımyıldızının parlak keçi yıldızıdır. Aslında birbirine yakın iki sarı devden oluşur.', 'It is the bright goat star of Auriga. It is really two yellow giants close together.'),
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
        L('Uzaklığı 42,9 ışık yılıdır.', 'Its distance is 42.9 light years.'),
        L('Tek yıldız gibi görünür; aslında iki sarı dev birbirinin etrafında döner.', 'It looks like one star; it is really two yellow giants going around each other.'),
        L('Gökyüzünde yılda 0,44 açı saniyesi kayar.', 'It drifts 0.44 arcseconds a year in the sky.'),
        L('Kış göğünün en parlak yıldızlarındandır.', 'It is one of the brightest stars of the winter sky.'),
      ],
    },
  ),
  notable(
    'aldebaran',
    'Aldebaran',
    L('Boğa’nın gözü', 'Eye of Taurus'),
    L('Boğa takımyıldızının kızıl gözüdür. Turuncu bir devdir; Ülker kümesine yakın görünür.', 'It is the red eye of Taurus. It is an orange giant; it looks near the Pleiades cluster.'),
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
        L('Uzaklığı 65 ışık yılıdır.', 'Its distance is 65 light years.'),
        L('Ülker kümesinin önünde durur; onlarla aynı aile değildir, daha yakındır.', 'It sits in front of the Pleiades cluster; it is not in that family, it is closer.'),
        L('Turuncu bir devdir. Spektrumu K5 III’tür.', 'It is an orange giant. Its spectrum is K5 III.'),
        L('Gökyüzünde yılda 0,20 açı saniyesi kayar.', 'It drifts 0.20 arcseconds a year in the sky.'),
      ],
    },
  ),
  notable(
    'spica',
    'Spica',
    L('Başak’ın başağı', 'Ear of Virgo'),
    L('Başak takımyıldızının en parlak yıldızıdır. Mavi-beyaz ve çok sıcaktır.', 'It is the brightest star in Virgo. It is blue-white and very hot.'),
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
        L('Uzaklığı yaklaşık 250 ışık yılıdır.', 'Its distance is about 250 light years.'),
        L('İki sıcak mavi yıldızdan oluşur. Spektrumu B1 V’dir.', 'It is two hot blue stars. Its spectrum is B1 V.'),
        L('Yüzey sıcaklığı 25 000 K civarındadır; Güneş’ten çok daha sıcaktır.', 'Its surface is about 25,000 K; it is much hotter than the Sun.'),
        L('Başak takımyıldızının başağı gibi durur.', 'It sits like the ear of grain of Virgo.'),
      ],
    },
  ),
  notable(
    'fomalhaut',
    'Fomalhaut',
    L('Güney balığı', 'Southern fish'),
    L('Güney Balığı’nın ağzındaki parlak yıldızdır. Etrafında toz diski vardır.', 'It is the bright star in the mouth of Piscis Austrinus. It has a dust disk around it.'),
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
        L('Uzaklığı 25 ışık yılıdır.', 'Its distance is 25 light years.'),
        L('Etrafında geniş bir toz diski vardır; genç bir gezegen sistemi izi taşır.', 'It has a wide dust disk around it; that is a trace of a young planet system.'),
        L('Gökyüzünde yılda 0,37 açı saniyesi kayar.', 'It drifts 0.37 arcseconds a year in the sky.'),
        L('Sonbahar göğünün güneyinde, tek başına parlak durur.', 'In the southern autumn sky it stands bright on its own.'),
      ],
    },
  ),
  notable(
    'alphacen',
    'Alpha Centauri',
    L('Komşu güneş', 'Neighbor sun'),
    L('Güneş’e en yakın parlak yıldız sistemidir. Proxima onun küçük, kırmızı komşusudur.', 'It is the closest bright star system to the Sun. Proxima is its small red neighbor.'),
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
        L('Uzaklığı 4,37 ışık yılıdır; Güneş’e en yakın parlak yıldız çiftidir.', 'Its distance is 4.37 light years; it is the closest bright star pair to the Sun.'),
        L('Gökyüzünde yılda 3,72 açı saniyesi kayar.', 'It drifts 3.72 arcseconds a year in the sky.'),
        L('Alpha Centauri A, Güneş’e çok benzer (G2 V). B biraz daha küçük ve turuncudur.', 'Alpha Centauri A is a lot like the Sun (G2 V). B is a bit smaller and more orange.'),
        L('Proxima aynı sistemin üçüncü, sönük üyesidir.', 'Proxima is the third, faint member of the same system.'),
      ],
    },
  ),
  notable(
    'barnard',
    'Barnard Yıldızı',
    L('Hızlı yıldız', 'Fast star'),
    L('Gökyüzünde en hızlı kayan yıldızlardan biridir. Çok yakındır ama çıplak gözle zor görülür.', 'It is one of the fastest drifting stars in the sky. It is very close, but hard to see with your eyes.'),
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
        L('Uzaklığı 5,96 ışık yılıdır. Alpha Centauri ailesinden sonra bize en yakın yıldızdır.', 'Its distance is 5.96 light years. After the Alpha Centauri family it is the closest star to us.'),
        L('Gökyüzünde bilinen en hızlı kayışa sahiptir: yılda 10,3 açı saniyesi. Bir insan ömründe yerini fark edilir değiştirir.', 'It has the fastest known sky drift: 10.3 arcseconds a year. In one human lifetime its place changes enough to notice.'),
        L('Bize doğru da yaklaşık 110 km/s yaklaşır.', 'It is also coming toward us at about 110 km/s.'),
        L('Kırmızı cücedir (M4 V). Görünür parlaklığı 9,5 kadirdir; çıplak gözle görülmez.', 'It is a red dwarf (M4 V). Its apparent brightness is magnitude 9.5; you cannot see it with your eyes.'),
      ],
    },
  ),
  notable(
    'pollux',
    'Pollux',
    L('İkizler', 'Gemini'),
    L('İkizler’in turuncu kardeşidir. Castor’dan daha parlaktır.', 'It is the orange sibling in Gemini. It is brighter than Castor.'),
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
        L('Uzaklığı 33,8 ışık yılıdır.', 'Its distance is 33.8 light years.'),
        L('İkizler’in daha parlak kardeşidir. Castor aslında birkaç yıldızdan oluşur.', 'It is the brighter sibling in Gemini. Castor is really several stars.'),
        L('Turuncu bir devdir. Spektrumu K0 III’tür.', 'It is an orange giant. Its spectrum is K0 III.'),
        L('Yanında Pollux b adlı bir gezegen bulunur.', 'It has a planet called Pollux b.'),
      ],
    },
  ),
  notable(
    'algol',
    'Algol',
    L('Değişen yıldız', 'Changing star'),
    L('Perseus’taki “şeytan yıldızı”dır. Eşinin önünden geçince parlaklığı birkaç saatte solar.', 'It is the “demon star” in Perseus. When its partner passes in front, it gets fainter in a few hours.'),
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
        L('Uzaklığı yaklaşık 90 ışık yılıdır.', 'Its distance is about 90 light years.'),
        L('Örten çiftyıldızdır. Yaklaşık 2 gün 21 saatte bir eşi önden geçer, ışığı solar.', 'It is an eclipsing binary. About every 2 days 21 hours its partner passes in front and the light fades.'),
        L('Eski gökbilimciler bu inip çıkmayı “göz kırpan şeytan” sandı.', 'Old astronomers thought this up-and-down was a “winking demon”.'),
        L('Ana yıldız B8 V spektrumundadır; sıcaktır.', 'The main star has a B8 V spectrum; it is hot.'),
      ],
    },
  ),
  notable(
    'pleiades',
    'Ülker',
    L('Yedi kız kardeş', 'Seven sisters'),
    L('Ülker, genç mavi yıldızlardan oluşan açık bir kümedir. Çıplak gözle küçük bir bulut gibi görünür.', 'The Pleiades is an open cluster of young blue stars. With your eyes it looks like a small cloud.'),
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
        L('Uzaklığı yaklaşık 444 ışık yılıdır.', 'Its distance is about 444 light years.'),
        L('Yüzlerce genç, sıcak yıldızdan oluşur. Çıplak gözle 6–7 tanesi seçilir.', 'It is hundreds of young, hot stars. With your eyes you can pick out 6–7 of them.'),
        L('Yaşı yaklaşık 100 milyon yıldır; Güneş’ten çok daha gençtir.', 'Its age is about 100 million years; it is much younger than the Sun.'),
        L('Mavi ışıkları, etraflarındaki tozu da aydınlatır.', 'Their blue light also lights the dust around them.'),
      ],
    },
  ),
  notable(
    'm42',
    'Orion Bulutsusu',
    L('Yıldız fabrikası', 'Star factory'),
    L('Orion’un kılıcındaki pembe bulutsudur. Yeni yıldızlar burada doğar.', 'It is the pink nebula in Orion’s sword. New stars are born there.'),
    5.588,
    -5.391,
    7500,
    40,
    4,
    {
      kind: 'nebula',
      distLy: 1340,
      facts: [
        L('Uzaklığı yaklaşık 1340 ışık yılıdır.', 'Its distance is about 1340 light years.'),
        L('Yeni yıldızların doğduğu bir gaz ve toz bulutudur.', 'It is a cloud of gas and dust where new stars are born.'),
        L('Ortadaki Trapezium yıldızları bulutu ısıtır; bu yüzden parlar.', 'The Trapezium stars in the middle heat the cloud; that is why it glows.'),
        L('Kışın, karanlık bir gökte çıplak gözle küçük bir leke gibi durur.', 'In winter, in a dark sky, it looks like a small smudge with your eyes.'),
      ],
    },
  ),
]

export function isNotableStar(wonder: SkyWonder): wonder is NotableStar {
  return 'distLy' in wonder && 'tempK' in wonder
}

export function starDisplayName(star: Pick<NotableStar, 'name' | 'nickname'>, lang: AppLang = 'tr'): string {
  if (lang === 'en' || !star.nickname) return star.name
  return `${star.name} (${star.nickname})`
}

export function starsAlphabetical(lang: AppLang = 'tr'): NotableStar[] {
  return [...NOTABLE_STARS].sort((a, b) =>
    starDisplayName(a, lang).localeCompare(starDisplayName(b, lang), lang, { sensitivity: 'base' }),
  )
}

export const NAMED_ROCKS: NamedRock[] = [
  {
    id: 'ceres',
    name: 'Ceres',
    tag: L('Çok küçük', 'Very small'),
    fact: L('Taş kuşağının en iri cisimidir. Çok küçüktür. Üzerinde buz izleri vardır.', 'It is the biggest body in the rock belt. It is very small. It has traces of ice on it.'),
    kind: 'rock',
    au: 2.77,
    size: 0.28,
    tilt: 0.12,
    facts: [
      L('Güneş’e uzaklığı ortalama 2,77 astronomi birimidir.', 'Its average distance from the Sun is 2.77 astronomical units.'),
      L('Cüce gezegen sayılır. Taş kuşağındaki en iri cisimdir.', 'It is counted as a dwarf planet. It is the biggest body in the rock belt.'),
      L('Dawn uzay aracı 2015’te etrafında dolandı; yüzeyinde parlak tuz izleri gördü.', 'The Dawn spacecraft went around it in 2015; it saw bright salt traces on the surface.'),
    ],
  },
  {
    id: 'vesta',
    name: 'Vesta',
    tag: L('Parlak asteroit', 'Bright asteroid'),
    fact: L('Kuşaktaki en parlak asteroitlerden biridir. Bazen çıplak gözle görülebilir.', 'It is one of the brightest asteroids in the belt. Sometimes you can see it with your eyes.'),
    kind: 'rock',
    au: 2.36,
    size: 0.18,
    tilt: -0.08,
    facts: [
      L('Güneş’e uzaklığı ortalama 2,36 astronomi birimidir.', 'Its average distance from the Sun is 2.36 astronomical units.'),
      L('Taş kuşağının en parlak üyelerindendir; bazen çıplak gözle seçilir.', 'It is one of the brightest members of the rock belt; sometimes you can pick it out with your eyes.'),
      L('Dawn aracı 2011’de Vesta’yı da ziyaret etti.', 'The Dawn craft also visited Vesta in 2011.'),
    ],
  },
  {
    id: 'pallas',
    name: 'Pallas',
    tag: L('Eğik yörünge', 'Tilted orbit'),
    fact: L('Keşfedilen ikinci asteroittir. Yörüngesi diğerlerine göre daha eğiktir.', 'It is the second asteroid discovered. Its path is more tilted than the others.'),
    kind: 'rock',
    au: 2.77,
    size: 0.16,
    tilt: 0.34,
    facts: [
      L('Güneş’e uzaklığı ortalama 2,77 astronomi birimidir.', 'Its average distance from the Sun is 2.77 astronomical units.'),
      L('1802’de keşfedildi; ikinci bulunan asteroittir.', 'It was discovered in 1802; it is the second asteroid found.'),
      L('Yörüngesi taş kuşağına göre daha eğiktir; bu yüzden yolu farklı görünür.', 'Its path is more tilted than the rock belt; that is why its road looks different.'),
    ],
  },
]

export function findWonder(id: string | null): SkyWonder | undefined {
  if (!id) return undefined
  return NOTABLE_STARS.find((item) => item.id === id) ?? NAMED_ROCKS.find((item) => item.id === id)
}

export function wonderKindLabel(kind: SkyWonderKind, lang: AppLang = 'tr'): string {
  if (kind === 'star') return tx(lang, UI.kindStar)
  if (kind === 'cluster') return tx(lang, UI.cluster)
  if (kind === 'nebula') return tx(lang, UI.kindNebula)
  return tx(lang, UI.smallBody)
}
