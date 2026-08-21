import type { BodyId } from '../types/planet'

export interface Insight {
  id: string
  text: string
  bodies: BodyId[]
}

/** Çocuk dilinde, doğru bilgi. “Yanlış / doğru” listesi değil. */
export const INSIGHTS: Insight[] = [
  {
    id: 'venus-hot',
    bodies: ['venus', 'mercury'],
    text: 'Güneş’e en yakın gezegen Merkür’dür. Ama en sıcak gezegen Venüs’tür; kalın atmosferi ısıyı tutar.',
  },
  {
    id: 'years-differ',
    bodies: ['earth', 'mars'],
    text: 'Her gezegenin yılı farklıdır. Bir yıl, o gezegenin Güneş etrafında 1 tur atmasıdır.',
  },
  {
    id: 'moon-face',
    bodies: ['moon', 'earth'],
    text: 'Ay’ı hep aynı yüzünden görürüz çünkü dönme süresi ile Dünya etrafındaki dolanma süresi neredeyse eşittir.',
  },
  {
    id: 'sun-star',
    bodies: ['sun'],
    text: 'Güneş bir gezegen değil, bir yıldızdır. Kendi ışığını ve ısısını üretir.',
  },
  {
    id: 'sun-light',
    bodies: ['sun', 'earth'],
    text: 'Güneş ışığı Dünya’ya anında gelmez; yaklaşık 8 dakika 20 saniye sürer.',
  },
  {
    id: 'day-night',
    bodies: ['earth'],
    text: 'Gece ve gündüz, Dünya’nın Güneş etrafında dolanmasından değil kendi ekseni etrafında dönmesinden oluşur.',
  },
  {
    id: 'seasons',
    bodies: ['earth'],
    text: 'Yazın Dünya Güneş’e daha yakın olduğu için yaz olmaz. Mevsimlerin asıl nedeni eksen eğikliğidir.',
  },
  {
    id: 'moon-light',
    bodies: ['moon'],
    text: 'Ay kendi ışığını üretmez; Güneş’ten gelen ışığı yansıtır. Şekli değişmez, gördüğümüz aydınlık dilim değişir.',
  },
  {
    id: 'mass-weight',
    bodies: ['moon'],
    text: 'Ay’da daha hafif hissedersin ama kütlen aynı kalır. Değişen şey yerçekiminin çekmesidir.',
  },
  {
    id: 'mercury-day',
    bodies: ['mercury'],
    text: 'Merkür’de bir gün, bir yılından uzundur. Kendi etrafında çok yavaş döner.',
  },
  {
    id: 'jupiter-gas',
    bodies: ['jupiter'],
    text: 'Jüpiter gaz devidir. Dünya gibi üzerinde yürünecek katı bir yüzeyi yoktur. Büyük olduğu için daha yükseğe zıplanmaz; yerçekimi daha güçlüdür.',
  },
  {
    id: 'saturn-rings',
    bodies: ['saturn'],
    text: 'Satürn’ün halkaları tek parça değildir; buz, kaya ve tozdan oluşur. Diğer gaz devlerinin de ince halkaları vardır.',
  },
  {
    id: 'uranus-tilt',
    bodies: ['uranus'],
    text: 'Uranüs yana yatmış gibi durur çünkü ekseni çok eğiktir. Yine de döner ve Güneş’in etrafında dolanır.',
  },
  {
    id: 'mars-cold',
    bodies: ['mars'],
    text: 'Mars’ın kırmızı rengi yüzeyindeki demir oksitten gelir. Atmosferi incedir ve Dünya’dan çok daha soğuktur.',
  },
  {
    id: 'pluto',
    bodies: ['pluto'],
    text: 'Plüton bir cüce gezegendir. Güneş Sistemi Plüton’da bitmez; daha uzakta da gök cisimleri vardır.',
  },
  {
    id: 'neptune-edge',
    bodies: ['neptune'],
    text: 'Neptün en uzak gezegendir. Ama Güneş Sistemi orada bitmez; Plüton ve Kuiper Kuşağı daha ötede durur.',
  },
]

export function insightFor(ids: BodyId[]): Insight {
  let best = INSIGHTS[0]
  let bestScore = Number.NEGATIVE_INFINITY
  for (const item of INSIGHTS) {
    const matched = item.bodies.filter((body) => ids.includes(body)).length
    if (!matched) continue
    const extra = item.bodies.length - matched
    const score = matched * 10 - extra
    if (score > bestScore) {
      best = item
      bestScore = score
    }
  }
  return bestScore > Number.NEGATIVE_INFINITY ? best : INSIGHTS[0]
}

export const LAB_TIPS = [
  'Bir gün dönmedir, bir yıl dolanımdır. İkisi farklı hareketlerdir.',
  'Güneş bir yıldızdır; gezegenler onun çevresinde dolanır.',
  'Mevsimler Güneş’e yakınlıktan değil, Dünya’nın eksen eğikliğinden doğar.',
  'Ay’ın şekli değişmez; gördüğümüz aydınlık dilim değişir.',
]
