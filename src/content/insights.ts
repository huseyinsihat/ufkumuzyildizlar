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

export type FactStage = 'planets' | 'earth' | 'stars'

export interface FactCard {
  id: string
  stage: FactStage
  title: string
  text: string
  bodyId?: BodyId
  wonderId?: string
}

export const FACT_STAGES: { id: FactStage; label: string }[] = [
  { id: 'planets', label: 'Güneş ve gezegenler' },
  { id: 'earth', label: 'Dünya ve Ay' },
  { id: 'stars', label: 'Yıldızlar' },
]

export const FACTS: FactCard[] = [
  {
    id: 'sun-star',
    stage: 'planets',
    title: 'Güneş bir yıldızdır',
    text: 'Güneş bir gezegen değil, bir yıldızdır. Kendi ışığını ve ısısını üretir.',
    bodyId: 'sun',
  },
  {
    id: 'sun-light',
    stage: 'planets',
    title: 'Güneş ışığı 8 dakikada gelir',
    text: 'Işık çok hızlıdır ama Güneş uzaktır. Dünya’ya yaklaşık 8 dakika 20 saniyede ulaşır.',
    bodyId: 'sun',
  },
  {
    id: 'mercury-closest',
    stage: 'planets',
    title: 'Merkür Güneş’e en yakındır',
    text: 'Sekiz gezegen içinde Güneş’e en yakın olan Merkür’dür. Yılı Dünya’dan kısadır.',
    bodyId: 'mercury',
  },
  {
    id: 'mercury-day',
    stage: 'planets',
    title: 'Merkür’ün günü yıldan uzundur',
    text: 'Merkür kendi etrafında çok yavaş döner. Bir günü, bir yılından uzundur.',
    bodyId: 'mercury',
  },
  {
    id: 'venus-hot',
    stage: 'planets',
    title: 'Venüs en sıcak gezegendir',
    text: 'Merkür Güneş’e daha yakındır. Ama Venüs’ün kalın atmosferi ısıyı tutar; yüzey orada daha sıcaktır.',
    bodyId: 'venus',
  },
  {
    id: 'mars-red',
    stage: 'planets',
    title: 'Mars neden kırmızıdır?',
    text: 'Mars’ın rengi yüzeyindeki demir oksitten gelir. Atmosferi incedir ve Dünya’dan daha soğuktur.',
    bodyId: 'mars',
  },
  {
    id: 'mars-year',
    stage: 'planets',
    title: 'Mars’ın yılı daha uzundur',
    text: 'Mars Güneş’ten biraz daha uzaktır. Bir Mars yılı, bir Dünya yılından uzundur.',
    bodyId: 'mars',
  },
  {
    id: 'jupiter-gas',
    stage: 'planets',
    title: 'Jüpiter gaz devidir',
    text: 'Jüpiter’in Dünya gibi yürünecek katı bir yüzeyi yoktur. Büyük olduğu için yerçekimi daha güçlüdür.',
    bodyId: 'jupiter',
  },
  {
    id: 'saturn-rings',
    stage: 'planets',
    title: 'Satürn’ün halkaları',
    text: 'Halkalar tek parça değildir. Buz, kaya ve tozdan oluşur. Diğer gaz devlerinin de ince halkaları vardır.',
    bodyId: 'saturn',
  },
  {
    id: 'uranus-tilt',
    stage: 'planets',
    title: 'Uranüs’ün ekseni çok eğiktir',
    text: 'Uranüs yana yatmış gibi durur. Yine de döner ve Güneş’in etrafında dolanır.',
    bodyId: 'uranus',
  },
  {
    id: 'neptune-far',
    stage: 'planets',
    title: 'Neptün en uzak gezegendir',
    text: 'Sekiz gezegen içinde Güneş’ten en uzakta olan Neptün’dür. Yılı çok uzundur.',
    bodyId: 'neptune',
  },
  {
    id: 'pluto-dwarf',
    stage: 'planets',
    title: 'Plüton cüce gezegendir',
    text: 'Plüton bir cüce gezegendir. Güneş Sistemi orada bitmez; daha uzakta da gök cisimleri vardır.',
    bodyId: 'pluto',
  },
  {
    id: 'year-near',
    stage: 'planets',
    title: 'Yakın gezegenlerin yılı kısadır',
    text: 'Güneş’e yakın gezegenler daha kısa yörüngede dolanır. Bu yüzden bir turları daha kısa sürer.',
    bodyId: 'mercury',
  },
  {
    id: 'day-year',
    stage: 'earth',
    title: 'Gün ve yıl farklıdır',
    text: 'Bir gün, Dünya’nın kendi etrafında dönmesidir. Bir yıl, Güneş etrafında bir tur atmasıdır.',
    bodyId: 'earth',
  },
  {
    id: 'day-night',
    stage: 'earth',
    title: 'Gece ve gündüz nasıl oluşur?',
    text: 'Gece ve gündüz, Güneş etrafında dolanmadan değil Dünya’nın kendi ekseni etrafında dönmesinden oluşur.',
    bodyId: 'earth',
  },
  {
    id: 'seasons',
    stage: 'earth',
    title: 'Mevsimler neden olur?',
    text: 'Yaz, Dünya Güneş’e yaklaştığı için olmaz. Asıl neden Dünya’nın eksen eğikliğidir.',
    bodyId: 'earth',
  },
  {
    id: 'moon-light',
    stage: 'earth',
    title: 'Ay kendi ışığını üretmez',
    text: 'Ay Güneş ışığını yansıtır. Şekli değişmez; Dünya’dan gördüğümüz aydınlık dilim değişir.',
    bodyId: 'moon',
  },
  {
    id: 'moon-face',
    stage: 'earth',
    title: 'Ay hep aynı yüzü gösterir',
    text: 'Ay’ı hep aynı yüzünden görürüz. Dönme süresi ile Dünya etrafındaki dolanma süresi neredeyse eşittir.',
    bodyId: 'moon',
  },
  {
    id: 'mass-weight',
    stage: 'earth',
    title: 'Kütle ve ağırlık',
    text: 'Ay’da daha hafif hissedersin ama kütlen aynı kalır. Değişen şey yerçekiminin çekmesidir.',
    bodyId: 'moon',
  },
  {
    id: 'full-moon',
    stage: 'earth',
    title: 'Dolunay bir hizadır',
    text: 'Dolunayda Ay, Dünya’nın Güneş’e göre arkasındadır. Her dolunayda tutulma olmaz; Ay’ın yörüngesi biraz eğiktir.',
    bodyId: 'moon',
  },
  {
    id: 'earth-water',
    stage: 'earth',
    title: 'Dünya mavi görünür',
    text: 'Dünya’nın yüzeyinin çoğu suyla kaplıdır. Atmosferi yaşama elverişlidir.',
    bodyId: 'earth',
  },
  {
    id: 'sirius',
    stage: 'stars',
    title: 'Sirius',
    text: 'Gece gökyüzünde çıplak gözle görülen en parlak yıldızdır. Işığı bize yaklaşık 8,6 yılda gelir.',
    wonderId: 'sirius',
  },
  {
    id: 'proxima',
    stage: 'stars',
    title: 'Proxima Centauri',
    text: 'Güneş’ten sonra bize en yakın yıldızdır. Çok sönük olduğu için çıplak gözle zor görülür.',
    wonderId: 'proxima',
  },
  {
    id: 'polaris',
    stage: 'stars',
    title: 'Polaris',
    text: 'Kutup Yıldızı kuzey yönünü gösterir. Dünya’nın ekseni ona doğru baktığı için gökyüzünde pek yer değiştirmez.',
    wonderId: 'polaris',
  },
  {
    id: 'rigel',
    stage: 'stars',
    title: 'Rigel',
    text: 'Orion’daki mavi-beyaz devdir. Güneş’ten çok daha sıcaktır ve çok parlaktır.',
    wonderId: 'rigel',
  },
  {
    id: 'betelgeuse',
    stage: 'stars',
    title: 'Betelgeuse',
    text: 'Orion’daki kırmızı üstdevdir. Güneş’ten yüzlerce kat büyüktür.',
    wonderId: 'betelgeuse',
  },
  {
    id: 'vega',
    stage: 'stars',
    title: 'Vega',
    text: 'Yaz gökyüzünün parlak yıldızlarından biridir. Güneş’ten daha sıcak ve daha parlaktır.',
    wonderId: 'vega',
  },
  {
    id: 'arcturus',
    stage: 'stars',
    title: 'Arcturus',
    text: 'Turuncu bir dev yıldızdır. Güneş’ten daha soğuk görünür ama çok büyüktür.',
    wonderId: 'arcturus',
  },
  {
    id: 'antares',
    stage: 'stars',
    title: 'Antares',
    text: 'Kırmızı bir üstdevdir. Adı “Mars’ın rakibi” anlamına gelir; rengi Mars’a benzer.',
    wonderId: 'antares',
  },
  {
    id: 'canopus',
    stage: 'stars',
    title: 'Canopus',
    text: 'Sirius’tan sonra gökyüzünün en parlak ikinci yıldızıdır. Güney gökküresinde durur.',
    wonderId: 'canopus',
  },
  {
    id: 'deneb',
    stage: 'stars',
    title: 'Deneb',
    text: 'Çok uzak ve çok parlak bir yıldızdır. Işığı bize binlerce yılda gelir.',
    wonderId: 'deneb',
  },
  {
    id: 'altair',
    stage: 'stars',
    title: 'Altair',
    text: 'Yaz üçgeninin bir köşesidir. Güneş’e yakın parlak yıldızlardan biridir.',
    wonderId: 'altair',
  },
  {
    id: 'vycma',
    stage: 'stars',
    title: 'VY Canis Majoris',
    text: 'Bilinen en büyük yıldızlardan biridir. Güneş’in yerine konsaydı yörüngesi Jüpiter’i geçerdi.',
    wonderId: 'vycma',
  },
  {
    id: 'earendel',
    stage: 'stars',
    title: 'Earendel',
    text: 'Şimdiye kadar görülen en uzak tek yıldızlardan biridir. Işığı bize milyarlarca yılda gelir.',
    wonderId: 'earendel',
  },
]
