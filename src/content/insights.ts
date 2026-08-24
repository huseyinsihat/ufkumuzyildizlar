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
    text: 'Güneş’e en yakın gezegen Merkür’dür. Ama en sıcak gezegen Venüs’tür; kalın havası ısıyı tutar.',
  },
  {
    id: 'years-differ',
    bodies: ['earth', 'mars'],
    text: 'Her gezegenin yılı farklıdır. Bir yıl, o gezegenin Güneş etrafında 1 tur atmasıdır.',
  },
  {
    id: 'moon-face',
    bodies: ['moon', 'earth'],
    text: 'Ay’ı hep aynı yüzünden görürüz. Dönmesi ile Dünya etrafındaki turu neredeyse aynı sürer.',
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
    text: 'Gece ve gündüz, Dünya kendi etrafında döndüğü için olur. Güneş etrafında tur atmak yılı yapar.',
  },
  {
    id: 'seasons',
    bodies: ['earth'],
    text: 'Yaz, Dünya Güneş’e daha yakın olduğu için olmaz. Dünya biraz yana yatıktır.',
  },
  {
    id: 'moon-light',
    bodies: ['moon'],
    text: 'Ay kendi ışığını üretmez; Güneş’ten gelen ışığı yansıtır. Şekli değişmez, gördüğümüz aydınlık dilim değişir.',
  },
  {
    id: 'mass-weight',
    bodies: ['moon'],
    text: 'Ay’da daha hafif hissedersin ama sen aynı çocuksun. Değişen şey çekimin gücüdür.',
  },
  {
    id: 'mercury-day',
    bodies: ['mercury'],
    text: 'Merkür’de bir gün, bir yılından uzundur. Kendi etrafında çok yavaş döner.',
  },
  {
    id: 'jupiter-gas',
    bodies: ['jupiter'],
    text: 'Jüpiter bir gaz devidir. Üzerinde yürünecek katı yer yoktur. Çekimi Dünya’dan daha güçlüdür.',
  },
  {
    id: 'saturn-rings',
    bodies: ['saturn'],
    text: 'Satürn’ün halkaları tek parça değildir; buz, kaya ve tozdan oluşur. Başka büyük gezegenlerin de ince halkası vardır.',
  },
  {
    id: 'uranus-tilt',
    bodies: ['uranus'],
    text: 'Uranüs yana yatmış gibi durur. Yine de döner ve Güneş’in etrafında tur atar.',
  },
  {
    id: 'mars-cold',
    bodies: ['mars'],
    text: 'Mars’ın kırmızı rengi yüzeyindeki pastan gelir. Havası incedir ve Dünya’dan çok daha soğuktur.',
  },
  {
    id: 'pluto',
    bodies: ['pluto'],
    text: 'Plüton çok küçüktür. Güneş Sistemi Plüton’da bitmez; daha uzakta da gök cisimleri vardır.',
  },
  {
    id: 'neptune-edge',
    bodies: ['neptune'],
    text: 'Neptün en uzak gezegendir. Ama Güneş Sistemi orada bitmez; Plüton ve Kuiper Kuşağı daha ötede durur.',
  },
  {
    id: 'io-hot',
    bodies: ['io', 'jupiter'],
    text: 'Io, Jüpiter’in çekimiyle ısınır. Bu yüzden Güneş Sistemi’nin en volkanik dünyalarındandır.',
  },
  {
    id: 'europa-ice',
    bodies: ['europa'],
    text: 'Europa buzla kaplıdır. Buzun altında okyanus olabileceği düşünülür.',
  },
  {
    id: 'ganymede-big',
    bodies: ['ganymede'],
    text: 'Ganimed, Güneş Sistemi’nin en büyük uydusudur. Merkür’den bile büyüktür.',
  },
  {
    id: 'titan-air',
    bodies: ['titan', 'saturn'],
    text: 'Titan’ın kalın havası vardır. Yüzeyinde sıvı metan gölleri bulunur.',
  },
  {
    id: 'mars-moons',
    bodies: ['phobos', 'deimos', 'mars'],
    text: 'Mars’ın iki küçük uydusu vardır: Phobos ve Deimos. İkisi de Ay kadar büyük değildir.',
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
  'Bir gün dönmedir, bir yıl tur atmadır. İkisi farklı hareketlerdir.',
  'Güneş bir yıldızdır; gezegenler onun çevresinde döner.',
  'Mevsimler Güneş’e yakınlıktan değil, Dünya’nın yana yatık durmasından doğar.',
  'Ay’ın şekli değişmez; gördüğümüz aydınlık dilim değişir.',
]

export type FactStage = 'general' | 'planets' | 'earth' | 'stars'

export interface FactCard {
  id: string
  stage: FactStage
  title: string
  text: string
  bodyId?: BodyId
  wonderId?: string
}

export const FACT_STAGES: { id: FactStage; label: string }[] = [
  { id: 'general', label: 'Genel' },
  { id: 'planets', label: 'Güneş ve gezegenler' },
  { id: 'earth', label: 'Dünya ve Ay' },
  { id: 'stars', label: 'Yıldızlar' },
]

export const FACTS: FactCard[] = [
  {
    id: 'general-eight',
    stage: 'general',
    title: 'Sekiz gezegen vardır',
    text: 'Güneş Sistemi’nde sekiz gezegen döner. Merkür en yakın, Neptün en uzaktır.',
    bodyId: 'neptune',
  },
  {
    id: 'general-day-year',
    stage: 'general',
    title: 'Gün ve yıl farklıdır',
    text: 'Bir gün, Dünya’nın kendi etrafında dönmesidir. Bir yıl, Güneş etrafında bir tur atmasıdır.',
    bodyId: 'earth',
  },
  {
    id: 'general-star',
    stage: 'general',
    title: 'Güneş bir yıldızdır',
    text: 'Güneş gezegen değildir. Kendi ışığını üretir; gezegenler onun çevresinde döner.',
    bodyId: 'sun',
  },
  {
    id: 'general-empty',
    stage: 'general',
    title: 'Uzay çok boştur',
    text: 'Gerçek boyutta gezegenler nokta kadar kalır. Eğitim modelinde onları büyüterek sırayı görürüz.',
    bodyId: 'sun',
  },
  {
    id: 'general-light',
    stage: 'general',
    title: 'Işık hemen gelmez',
    text: 'Güneş ışığı Dünya’ya yaklaşık 8 dakika 20 saniyede ulaşır.',
    bodyId: 'sun',
  },
  {
    id: 'general-weight',
    stage: 'general',
    title: 'Kütle ve ağırlık',
    text: 'Ay’da daha hafif hissedersin ama sen aynı çocuksun. Değişen çekimdir.',
    bodyId: 'moon',
  },
  {
    id: 'general-moon-light',
    stage: 'general',
    title: 'Ay ışık üretmez',
    text: 'Ay Güneş ışığını yansıtır. Şekli değişmez; gördüğümüz aydınlık dilim değişir.',
    bodyId: 'moon',
  },
  {
    id: 'general-seasons',
    stage: 'general',
    title: 'Mevsimler eğiklikten gelir',
    text: 'Yaz, Dünya Güneş’e yaklaştığı için olmaz. Dünya biraz yana yatıktır.',
    bodyId: 'earth',
  },
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
    text: 'Merkür Güneş’e daha yakındır. Ama Venüs’ün kalın havası ısıyı tutar; yüzey orada daha sıcaktır.',
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
    text: 'Halkalar tek parça değildir. Buz, kaya ve tozdan oluşur. Başka büyük gezegenlerin de ince halkası vardır.',
    bodyId: 'saturn',
  },
  {
    id: 'uranus-tilt',
    stage: 'planets',
    title: 'Uranüs yana yatıktır',
    text: 'Uranüs yana yatmış gibi durur. Yine de döner ve Güneş’in etrafında tur atar.',
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
    title: 'Plüton çok küçüktür',
    text: 'Plüton çok küçüktür. Güneş Sistemi orada bitmez; daha uzakta da gök cisimleri vardır.',
    bodyId: 'pluto',
  },
  {
    id: 'year-near',
    stage: 'planets',
    title: 'Yakın gezegenlerin yılı kısadır',
    text: 'Güneş’e yakın gezegenler daha kısa yolda döner. Bu yüzden bir turları daha kısa sürer.',
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
    text: 'Gece ve gündüz, Dünya kendi etrafında döndüğü için olur. Güneş etrafında tur atmak yılı yapar.',
    bodyId: 'earth',
  },
  {
    id: 'seasons',
    stage: 'earth',
    title: 'Mevsimler neden olur?',
    text: 'Yaz, Dünya Güneş’e yaklaştığı için olmaz. Dünya biraz yana yatıktır.',
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
    text: 'Ay’ı hep aynı yüzünden görürüz. Dönmesi ile Dünya etrafındaki turu neredeyse aynı sürer.',
    bodyId: 'moon',
  },
  {
    id: 'mass-weight',
    stage: 'earth',
    title: 'Sen ve ağırlığın',
    text: 'Ay’da daha hafif hissedersin ama sen aynı çocuksun. Değişen şey çekimin gücüdür.',
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
    title: 'Sirius (Akyıldız)',
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
    title: 'Kutup Yıldızı (Kutup)',
    text: 'Kutup Yıldızı kuzey yönünü gösterir. Gökyüzünde pek yer değiştirmez.',
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
    text: 'Orion’daki kırmızı süperdevdir. Güneş’ten yüzlerce kat büyüktür.',
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
    title: 'Arcturus (Çoban)',
    text: 'Turuncu bir dev yıldızdır. Güneş’ten daha soğuk görünür ama çok büyüktür.',
    wonderId: 'arcturus',
  },
  {
    id: 'antares',
    stage: 'stars',
    title: 'Antares (Akrep)',
    text: 'Kırmızı bir süperdevdir. Adı “Mars’ın rakibi” anlamına gelir; rengi Mars’a benzer.',
    wonderId: 'antares',
  },
  {
    id: 'canopus',
    stage: 'stars',
    title: 'Canopus (Süheyl)',
    text: 'Sirius’tan sonra gökyüzünün en parlak ikinci yıldızıdır. Güney gökküresinde durur.',
    wonderId: 'canopus',
  },
  {
    id: 'deneb',
    stage: 'stars',
    title: 'Deneb (Kuğu)',
    text: 'Çok uzak ve çok parlak bir yıldızdır. Işığı bize binlerce yılda gelir.',
    wonderId: 'deneb',
  },
  {
    id: 'altair',
    stage: 'stars',
    title: 'Altair (Kartal)',
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
    text: 'Şimdiye kadar görülen en uzak tek yıldızlardan biridir. Işığı milyarlarca yıldır yoldadır.',
    wonderId: 'earendel',
  },
  {
    id: 'capella',
    stage: 'stars',
    title: 'Capella (Keçi)',
    text: 'Arabacı’daki parlak keçi yıldızıdır. Aslında birbirine yakın iki sarı devden oluşur.',
    wonderId: 'capella',
  },
  {
    id: 'aldebaran',
    stage: 'stars',
    title: 'Aldebaran (Boğa)',
    text: 'Boğa’nın kızıl gözüdür. Turuncu bir dev yıldızdır; Ülker kümesine yakın görünür.',
    wonderId: 'aldebaran',
  },
  {
    id: 'spica',
    stage: 'stars',
    title: 'Spica (Başak)',
    text: 'Başak’ın en parlak yıldızıdır. Mavi-beyaz ve çok sıcaktır.',
    wonderId: 'spica',
  },
  {
    id: 'fomalhaut',
    stage: 'stars',
    title: 'Fomalhaut',
    text: 'Güney Balığı’nın parlak yıldızıdır. Etrafında toz diski vardır.',
    wonderId: 'fomalhaut',
  },
  {
    id: 'alphacen',
    stage: 'stars',
    title: 'Alpha Centauri',
    text: 'Güneş’e en yakın parlak yıldız sistemidir. Proxima onun küçük kırmızı komşusudur.',
    wonderId: 'alphacen',
  },
  {
    id: 'barnard',
    stage: 'stars',
    title: 'Barnard Yıldızı',
    text: 'Barnard Yıldızı Güneş’ten sonra en yakın yıldızlardan biridir. Işığı 6 yılda gelir. Gökyüzünde yılda 10,3 açı saniyesi kayar; bilinen en hızlı kayış budur.',
    wonderId: 'barnard',
  },
  {
    id: 'pollux',
    stage: 'stars',
    title: 'Pollux',
    text: 'İkizler’in turuncu kardeşidir. Castor’dan daha parlaktır.',
    wonderId: 'pollux',
  },
  {
    id: 'algol',
    stage: 'stars',
    title: 'Algol (Şeytan)',
    text: 'Perseus’taki değişen yıldızdır. Eşi önünden geçince parlaklığı kısa süre solar.',
    wonderId: 'algol',
  },
  {
    id: 'pleiades',
    stage: 'stars',
    title: 'Ülker',
    text: 'Ülker, genç mavi yıldızlardan oluşan açık bir kümedir. Çıplak gözle küçük bir bulut gibi görünür.',
    wonderId: 'pleiades',
  },
  {
    id: 'm42',
    stage: 'stars',
    title: 'Orion Bulutsusu',
    text: 'Orion’un kılıcındaki pembe bulutsudur. Yeni yıldızlar burada doğar.',
    wonderId: 'm42',
  },
]
