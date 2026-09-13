import { L, type LocText } from '../i18n/types'
import type { BodyId } from '../types/planet'

export interface Insight {
  id: string
  text: LocText
  bodies: BodyId[]
}

/** Çocuk dilinde, doğru bilgi. “Yanlış / doğru” listesi değil. */
export const INSIGHTS: Insight[] = [
  {
    id: 'venus-hot',
    bodies: ['venus', 'mercury'],
    text: L(
      'Güneş’e en yakın gezegen Merkür’dür. Ama en sıcak gezegen Venüs’tür; kalın havası ısıyı tutar.',
      'Mercury is the closest planet to the Sun. But Venus is the hottest; its thick air holds heat.',
    ),
  },
  {
    id: 'years-differ',
    bodies: ['earth', 'mars'],
    text: L(
      'Her gezegenin yılı farklıdır. Bir yıl, o gezegenin Güneş etrafında 1 tur atmasıdır.',
      'Each planet has a different year. A year is 1 trip of that planet around the Sun.',
    ),
  },
  {
    id: 'moon-face',
    bodies: ['moon', 'earth'],
    text: L(
      'Ay’ı hep aynı yüzünden görürüz. Dönmesi ile Dünya etrafındaki turu neredeyse aynı sürer.',
      'We always see the same face of the Moon. Its spin and its trip around Earth take almost the same time.',
    ),
  },
  {
    id: 'sun-star',
    bodies: ['sun'],
    text: L(
      'Güneş bir gezegen değil, bir yıldızdır. Kendi ışığını ve ısısını üretir.',
      'The Sun is not a planet. It is a star. It makes its own light and heat.',
    ),
  },
  {
    id: 'sun-light',
    bodies: ['sun', 'earth'],
    text: L(
      'Güneş ışığı Dünya’ya anında gelmez; yaklaşık 8 dakika 20 saniye sürer.',
      'Sunlight does not reach Earth at once; it takes about 8 minutes 20 seconds.',
    ),
  },
  {
    id: 'day-night',
    bodies: ['earth'],
    text: L(
      'Gece ve gündüz, Dünya kendi etrafında döndüğü için olur. Güneş etrafında tur atmak yılı yapar.',
      'Night and day happen because Earth spins. Going around the Sun makes a year.',
    ),
  },
  {
    id: 'seasons',
    bodies: ['earth'],
    text: L(
      'Yaz, Dünya Güneş’e daha yakın olduğu için olmaz. Dünya biraz yana yatıktır.',
      'Summer does not happen because Earth is closer to the Sun. Earth tilts a little.',
    ),
  },
  {
    id: 'moon-light',
    bodies: ['moon'],
    text: L(
      'Ay kendi ışığını üretmez; Güneş’ten gelen ışığı yansıtır. Şekli değişmez, gördüğümüz aydınlık dilim değişir.',
      'The Moon does not make its own light; it reflects light from the Sun. Its shape does not change; the bright slice we see changes.',
    ),
  },
  {
    id: 'mass-weight',
    bodies: ['moon'],
    text: L(
      'Ay’da daha hafif hissedersin ama sen aynı çocuksun. Değişen şey çekimin gücüdür.',
      'You feel lighter on the Moon, but you are the same child. What changes is the pull of gravity.',
    ),
  },
  {
    id: 'mercury-day',
    bodies: ['mercury'],
    text: L(
      'Merkür’de bir gün, bir yılından uzundur. Kendi etrafında çok yavaş döner.',
      'On Mercury, one day is longer than one year. It spins very slowly.',
    ),
  },
  {
    id: 'jupiter-gas',
    bodies: ['jupiter'],
    text: L(
      'Jüpiter bir gaz devidir. Üzerinde yürünecek katı yer yoktur. Çekimi Dünya’dan daha güçlüdür.',
      'Jupiter is a gas giant. There is no solid ground to walk on. Its gravity is stronger than Earth’s.',
    ),
  },
  {
    id: 'saturn-rings',
    bodies: ['saturn'],
    text: L(
      'Satürn’ün halkaları tek parça değildir; buz, kaya ve tozdan oluşur. Başka büyük gezegenlerin de ince halkası vardır.',
      'Saturn’s rings are not one piece; they are ice, rock, and dust. Other big planets have thin rings too.',
    ),
  },
  {
    id: 'uranus-tilt',
    bodies: ['uranus'],
    text: L(
      'Uranüs yana yatmış gibi durur. Yine de döner ve Güneş’in etrafında tur atar.',
      'Uranus looks like it lies on its side. It still spins and goes around the Sun.',
    ),
  },
  {
    id: 'mars-cold',
    bodies: ['mars'],
    text: L(
      'Mars’ın kırmızı rengi yüzeyindeki pastan gelir. Havası incedir ve Dünya’dan çok daha soğuktur.',
      'The red color of Mars comes from rust on the surface. Its air is thin, and it is much colder than Earth.',
    ),
  },
  {
    id: 'pluto',
    bodies: ['pluto'],
    text: L(
      'Plüton çok küçüktür. Güneş Sistemi Plüton’da bitmez; daha uzakta da gök cisimleri vardır.',
      'Pluto is very small. The Solar System does not end at Pluto; there are bodies farther out too.',
    ),
  },
  {
    id: 'neptune-edge',
    bodies: ['neptune'],
    text: L(
      'Neptün en uzak gezegendir. Ama Güneş Sistemi orada bitmez; Plüton ve Kuiper Kuşağı daha ötede durur.',
      'Neptune is the farthest planet. But the Solar System does not end there; Pluto and the Kuiper Belt lie farther out.',
    ),
  },
  {
    id: 'io-hot',
    bodies: ['io', 'jupiter'],
    text: L(
      'Io, Jüpiter’in çekimiyle ısınır. Bu yüzden Güneş Sistemi’nin en volkanik dünyalarındandır.',
      'Io heats up from Jupiter’s pull. That is why it is one of the most volcanic worlds in the Solar System.',
    ),
  },
  {
    id: 'europa-ice',
    bodies: ['europa'],
    text: L(
      'Europa buzla kaplıdır. Buzun altında okyanus olabileceği düşünülür.',
      'Europa is covered with ice. There may be an ocean under the ice.',
    ),
  },
  {
    id: 'ganymede-big',
    bodies: ['ganymede'],
    text: L(
      'Ganimed, Güneş Sistemi’nin en büyük uydusudur. Merkür’den bile büyüktür.',
      'Ganymede is the biggest moon in the Solar System. It is even bigger than Mercury.',
    ),
  },
  {
    id: 'titan-air',
    bodies: ['titan', 'saturn'],
    text: L(
      'Titan’ın kalın havası vardır. Yüzeyinde sıvı metan gölleri bulunur.',
      'Titan has thick air. It has lakes of liquid methane on the surface.',
    ),
  },
  {
    id: 'mars-moons',
    bodies: ['phobos', 'deimos', 'mars'],
    text: L(
      'Mars’ın iki küçük uydusu vardır: Phobos ve Deimos. İkisi de Ay kadar büyük değildir.',
      'Mars has two small moons: Phobos and Deimos. Neither is as big as the Moon.',
    ),
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
  title: LocText
  text: LocText
  bodyId?: BodyId
  wonderId?: string
}

export const FACT_STAGES: { id: FactStage; label: LocText }[] = [
  { id: 'general', label: L('Genel', 'General') },
  { id: 'planets', label: L('Güneş ve gezegenler', 'Sun and planets') },
  { id: 'earth', label: L('Dünya ve Ay', 'Earth and Moon') },
  { id: 'stars', label: L('Yıldızlar', 'Stars') },
]

export const FACTS: FactCard[] = [
  {
    id: 'general-eight',
    stage: 'general',
    title: L('Sekiz gezegen vardır', 'There are eight planets'),
    text: L('Güneş Sistemi’nde sekiz gezegen döner. Merkür en yakın, Neptün en uzaktır.', 'Eight planets go around in the Solar System. Mercury is closest, Neptune is farthest.'),
    bodyId: 'neptune',
  },
  {
    id: 'general-day-year',
    stage: 'general',
    title: L('Gün ve yıl farklıdır', 'Day and year are different'),
    text: L('Bir gün, Dünya’nın kendi etrafında dönmesidir. Bir yıl, Güneş etrafında bir tur atmasıdır.', 'A day is Earth spinning. A year is one trip around the Sun.'),
    bodyId: 'earth',
  },
  {
    id: 'general-star',
    stage: 'general',
    title: L('Güneş bir yıldızdır', 'The Sun is a star'),
    text: L('Güneş gezegen değildir. Kendi ışığını üretir; gezegenler onun çevresinde döner.', 'The Sun is not a planet. It makes its own light; planets go around it.'),
    bodyId: 'sun',
  },
  {
    id: 'general-empty',
    stage: 'general',
    title: L('Uzay çok boştur', 'Space is very empty'),
    text: L('Gerçek boyutta gezegenler nokta kadar kalır. Eğitim modelinde onları büyüterek sırayı görürüz.', 'At true size the planets look like dots. In the classroom model we enlarge them so we can see the order.'),
    bodyId: 'sun',
  },
  {
    id: 'general-light',
    stage: 'general',
    title: L('Işık hemen gelmez', 'Light does not arrive at once'),
    text: L('Güneş ışığı Dünya’ya yaklaşık 8 dakika 20 saniyede ulaşır.', 'Sunlight reaches Earth in about 8 minutes 20 seconds.'),
    bodyId: 'sun',
  },
  {
    id: 'general-weight',
    stage: 'general',
    title: L('Kütle ve ağırlık', 'Mass and weight'),
    text: L('Ay’da daha hafif hissedersin ama sen aynı çocuksun. Değişen çekimdir.', 'You feel lighter on the Moon, but you are the same child. Gravity is what changes.'),
    bodyId: 'moon',
  },
  {
    id: 'general-moon-light',
    stage: 'general',
    title: L('Ay ışık üretmez', 'The Moon does not make light'),
    text: L('Ay Güneş ışığını yansıtır. Şekli değişmez; gördüğümüz aydınlık dilim değişir.', 'The Moon reflects sunlight. Its shape does not change; the bright slice we see changes.'),
    bodyId: 'moon',
  },
  {
    id: 'general-seasons',
    stage: 'general',
    title: L('Mevsimler eğiklikten gelir', 'Seasons come from the tilt'),
    text: L('Yaz, Dünya Güneş’e yaklaştığı için olmaz. Dünya biraz yana yatıktır.', 'Summer does not happen because Earth gets closer to the Sun. Earth tilts a little.'),
    bodyId: 'earth',
  },
  {
    id: 'sun-star',
    stage: 'planets',
    title: L('Güneş bir yıldızdır', 'The Sun is a star'),
    text: L('Güneş bir gezegen değil, bir yıldızdır. Kendi ışığını ve ısısını üretir.', 'The Sun is not a planet. It is a star. It makes its own light and heat.'),
    bodyId: 'sun',
  },
  {
    id: 'sun-light',
    stage: 'planets',
    title: L('Güneş ışığı 8 dakikada gelir', 'Sunlight takes 8 minutes'),
    text: L('Işık çok hızlıdır ama Güneş uzaktır. Dünya’ya yaklaşık 8 dakika 20 saniyede ulaşır.', 'Light is very fast, but the Sun is far. It reaches Earth in about 8 minutes 20 seconds.'),
    bodyId: 'sun',
  },
  {
    id: 'mercury-closest',
    stage: 'planets',
    title: L('Merkür Güneş’e en yakındır', 'Mercury is closest to the Sun'),
    text: L('Sekiz gezegen içinde Güneş’e en yakın olan Merkür’dür. Yılı Dünya’dan kısadır.', 'Of the eight planets, Mercury is closest to the Sun. Its year is shorter than Earth’s.'),
    bodyId: 'mercury',
  },
  {
    id: 'mercury-day',
    stage: 'planets',
    title: L('Merkür’ün günü yıldan uzundur', 'Mercury’s day is longer than its year'),
    text: L('Merkür kendi etrafında çok yavaş döner. Bir günü, bir yılından uzundur.', 'Mercury spins very slowly. One day is longer than one year.'),
    bodyId: 'mercury',
  },
  {
    id: 'venus-hot',
    stage: 'planets',
    title: L('Venüs en sıcak gezegendir', 'Venus is the hottest planet'),
    text: L('Merkür Güneş’e daha yakındır. Ama Venüs’ün kalın havası ısıyı tutar; yüzey orada daha sıcaktır.', 'Mercury is closer to the Sun. But Venus’s thick air holds heat; the surface there is hotter.'),
    bodyId: 'venus',
  },
  {
    id: 'mars-red',
    stage: 'planets',
    title: L('Mars neden kırmızıdır?', 'Why is Mars red?'),
    text: L('Mars’ın rengi yüzeyindeki demir oksitten gelir. Atmosferi incedir ve Dünya’dan daha soğuktur.', 'The color of Mars comes from iron oxide on the surface. Its air is thin, and it is colder than Earth.'),
    bodyId: 'mars',
  },
  {
    id: 'mars-year',
    stage: 'planets',
    title: L('Mars’ın yılı daha uzundur', 'A Mars year is longer'),
    text: L('Mars Güneş’ten biraz daha uzaktır. Bir Mars yılı, bir Dünya yılından uzundur.', 'Mars is a bit farther from the Sun. A Mars year is longer than an Earth year.'),
    bodyId: 'mars',
  },
  {
    id: 'jupiter-gas',
    stage: 'planets',
    title: L('Jüpiter gaz devidir', 'Jupiter is a gas giant'),
    text: L('Jüpiter’in Dünya gibi yürünecek katı bir yüzeyi yoktur. Büyük olduğu için yerçekimi daha güçlüdür.', 'Jupiter has no solid ground to walk on like Earth. Because it is big, its gravity is stronger.'),
    bodyId: 'jupiter',
  },
  {
    id: 'saturn-rings',
    stage: 'planets',
    title: L('Satürn’ün halkaları', 'Saturn’s rings'),
    text: L('Halkalar tek parça değildir. Buz, kaya ve tozdan oluşur. Başka büyük gezegenlerin de ince halkası vardır.', 'The rings are not one piece. They are ice, rock, and dust. Other big planets have thin rings too.'),
    bodyId: 'saturn',
  },
  {
    id: 'uranus-tilt',
    stage: 'planets',
    title: L('Uranüs yana yatıktır', 'Uranus tilts on its side'),
    text: L('Uranüs yana yatmış gibi durur. Yine de döner ve Güneş’in etrafında tur atar.', 'Uranus looks like it lies on its side. It still spins and goes around the Sun.'),
    bodyId: 'uranus',
  },
  {
    id: 'neptune-far',
    stage: 'planets',
    title: L('Neptün en uzak gezegendir', 'Neptune is the farthest planet'),
    text: L('Sekiz gezegen içinde Güneş’ten en uzakta olan Neptün’dür. Yılı çok uzundur.', 'Of the eight planets, Neptune is farthest from the Sun. Its year is very long.'),
    bodyId: 'neptune',
  },
  {
    id: 'pluto-dwarf',
    stage: 'planets',
    title: L('Plüton çok küçüktür', 'Pluto is very small'),
    text: L('Plüton çok küçüktür. Güneş Sistemi orada bitmez; daha uzakta da gök cisimleri vardır.', 'Pluto is very small. The Solar System does not end there; there are bodies farther out too.'),
    bodyId: 'pluto',
  },
  {
    id: 'year-near',
    stage: 'planets',
    title: L('Yakın gezegenlerin yılı kısadır', 'Closer planets have shorter years'),
    text: L('Güneş’e yakın gezegenler daha kısa yolda döner. Bu yüzden bir turları daha kısa sürer.', 'Planets close to the Sun travel a shorter path. So one trip takes less time.'),
    bodyId: 'mercury',
  },
  {
    id: 'day-year',
    stage: 'earth',
    title: L('Gün ve yıl farklıdır', 'Day and year are different'),
    text: L('Bir gün, Dünya’nın kendi etrafında dönmesidir. Bir yıl, Güneş etrafında bir tur atmasıdır.', 'A day is Earth spinning. A year is one trip around the Sun.'),
    bodyId: 'earth',
  },
  {
    id: 'day-night',
    stage: 'earth',
    title: L('Gece ve gündüz nasıl oluşur?', 'How do night and day happen?'),
    text: L('Gece ve gündüz, Dünya kendi etrafında döndüğü için olur. Güneş etrafında tur atmak yılı yapar.', 'Night and day happen because Earth spins. Going around the Sun makes a year.'),
    bodyId: 'earth',
  },
  {
    id: 'seasons',
    stage: 'earth',
    title: L('Mevsimler neden olur?', 'Why do seasons happen?'),
    text: L('Yaz, Dünya Güneş’e yaklaştığı için olmaz. Dünya biraz yana yatıktır.', 'Summer does not happen because Earth gets closer to the Sun. Earth tilts a little.'),
    bodyId: 'earth',
  },
  {
    id: 'moon-light',
    stage: 'earth',
    title: L('Ay kendi ışığını üretmez', 'The Moon does not make its own light'),
    text: L('Ay Güneş ışığını yansıtır. Şekli değişmez; Dünya’dan gördüğümüz aydınlık dilim değişir.', 'The Moon reflects sunlight. Its shape does not change; the bright slice we see from Earth changes.'),
    bodyId: 'moon',
  },
  {
    id: 'moon-face',
    stage: 'earth',
    title: L('Ay hep aynı yüzü gösterir', 'The Moon always shows the same face'),
    text: L('Ay’ı hep aynı yüzünden görürüz. Dönmesi ile Dünya etrafındaki turu neredeyse aynı sürer.', 'We always see the same face of the Moon. Its spin and its trip around Earth take almost the same time.'),
    bodyId: 'moon',
  },
  {
    id: 'mass-weight',
    stage: 'earth',
    title: L('Sen ve ağırlığın', 'You and your weight'),
    text: L('Ay’da daha hafif hissedersin ama sen aynı çocuksun. Değişen şey çekimin gücüdür.', 'You feel lighter on the Moon, but you are the same child. What changes is the pull of gravity.'),
    bodyId: 'moon',
  },
  {
    id: 'full-moon',
    stage: 'earth',
    title: L('Dolunay bir hizadır', 'A full Moon is a line-up'),
    text: L('Dolunayda Ay, Dünya’nın Güneş’e göre arkasındadır. Her dolunayda tutulma olmaz; Ay’ın yörüngesi biraz eğiktir.', 'At full Moon the Moon is behind Earth from the Sun. Not every full Moon is an eclipse; the Moon’s path tilts a little.'),
    bodyId: 'moon',
  },
  {
    id: 'earth-water',
    stage: 'earth',
    title: L('Dünya mavi görünür', 'Earth looks blue'),
    text: L('Dünya’nın yüzeyinin çoğu suyla kaplıdır. Atmosferi yaşama elverişlidir.', 'Most of Earth’s surface is covered with water. Its air is good for living things.'),
    bodyId: 'earth',
  },
  {
    id: 'sirius',
    stage: 'stars',
    title: L('Sirius (Akyıldız)', 'Sirius'),
    text: L('Gece gökyüzünde çıplak gözle görülen en parlak yıldızdır. Işığı bize yaklaşık 8,6 yılda gelir.', 'It is the brightest star you can see at night with your eyes. Its light takes about 8.6 years to reach us.'),
    wonderId: 'sirius',
  },
  {
    id: 'proxima',
    stage: 'stars',
    title: L('Proxima Centauri', 'Proxima Centauri'),
    text: L('Güneş’ten sonra bize en yakın yıldızdır. Çok sönük olduğu için çıplak gözle zor görülür.', 'After the Sun, it is the closest star to us. It is so faint that it is hard to see with your eyes.'),
    wonderId: 'proxima',
  },
  {
    id: 'polaris',
    stage: 'stars',
    title: L('Kutup Yıldızı (Kutup)', 'Polaris'),
    text: L('Kutup Yıldızı kuzey yönünü gösterir. Gökyüzünde pek yer değiştirmez.', 'Polaris points north. It barely moves in the sky.'),
    wonderId: 'polaris',
  },
  {
    id: 'rigel',
    stage: 'stars',
    title: L('Rigel', 'Rigel'),
    text: L('Orion’daki mavi-beyaz devdir. Güneş’ten çok daha sıcaktır ve çok parlaktır.', 'It is the blue-white giant in Orion. It is much hotter than the Sun and very bright.'),
    wonderId: 'rigel',
  },
  {
    id: 'betelgeuse',
    stage: 'stars',
    title: L('Betelgeuse', 'Betelgeuse'),
    text: L('Orion’daki kırmızı süperdevdir. Güneş’ten yüzlerce kat büyüktür.', 'It is the red supergiant in Orion. It is hundreds of times bigger than the Sun.'),
    wonderId: 'betelgeuse',
  },
  {
    id: 'vega',
    stage: 'stars',
    title: L('Vega', 'Vega'),
    text: L('Yaz gökyüzünün parlak yıldızlarından biridir. Güneş’ten daha sıcak ve daha parlaktır.', 'It is one of the bright stars of the summer sky. It is hotter and brighter than the Sun.'),
    wonderId: 'vega',
  },
  {
    id: 'arcturus',
    stage: 'stars',
    title: L('Arcturus (Çoban)', 'Arcturus'),
    text: L('Turuncu bir dev yıldızdır. Güneş’ten daha soğuk görünür ama çok büyüktür.', 'It is an orange giant star. It looks cooler than the Sun, but it is very big.'),
    wonderId: 'arcturus',
  },
  {
    id: 'antares',
    stage: 'stars',
    title: L('Antares (Akrep)', 'Antares'),
    text: L('Kırmızı bir süperdevdir. Adı “Mars’ın rakibi” anlamına gelir; rengi Mars’a benzer.', 'It is a red supergiant. Its name means “rival of Mars”; its color looks like Mars.'),
    wonderId: 'antares',
  },
  {
    id: 'canopus',
    stage: 'stars',
    title: L('Canopus (Süheyl)', 'Canopus'),
    text: L('Sirius’tan sonra gökyüzünün en parlak ikinci yıldızıdır. Güney gökküresinde durur.', 'After Sirius, it is the second brightest star in the sky. It sits in the southern sky.'),
    wonderId: 'canopus',
  },
  {
    id: 'deneb',
    stage: 'stars',
    title: L('Deneb (Kuğu)', 'Deneb'),
    text: L('Çok uzak ve çok parlak bir yıldızdır. Işığı bize binlerce yılda gelir.', 'It is a very far and very bright star. Its light takes thousands of years to reach us.'),
    wonderId: 'deneb',
  },
  {
    id: 'altair',
    stage: 'stars',
    title: L('Altair (Kartal)', 'Altair'),
    text: L('Yaz üçgeninin bir köşesidir. Güneş’e yakın parlak yıldızlardan biridir.', 'It is one corner of the Summer Triangle. It is one of the bright stars close to the Sun.'),
    wonderId: 'altair',
  },
  {
    id: 'vycma',
    stage: 'stars',
    title: L('VY Canis Majoris', 'VY Canis Majoris'),
    text: L('Bilinen en büyük yıldızlardan biridir. Güneş’in yerine konsaydı yörüngesi Jüpiter’i geçerdi.', 'It is one of the biggest known stars. If it sat in the Sun’s place, it would reach past Jupiter’s path.'),
    wonderId: 'vycma',
  },
  {
    id: 'earendel',
    stage: 'stars',
    title: L('Earendel', 'Earendel'),
    text: L('Şimdiye kadar görülen en uzak tek yıldızlardan biridir. Işığı milyarlarca yıldır yoldadır.', 'It is one of the farthest single stars ever seen. Its light has been traveling for billions of years.'),
    wonderId: 'earendel',
  },
  {
    id: 'capella',
    stage: 'stars',
    title: L('Capella (Keçi)', 'Capella'),
    text: L('Arabacı’daki parlak keçi yıldızıdır. Aslında birbirine yakın iki sarı devden oluşur.', 'It is the bright goat star in Auriga. It is really two yellow giants close together.'),
    wonderId: 'capella',
  },
  {
    id: 'aldebaran',
    stage: 'stars',
    title: L('Aldebaran (Boğa)', 'Aldebaran'),
    text: L('Boğa’nın kızıl gözüdür. Turuncu bir dev yıldızdır; Ülker kümesine yakın görünür.', 'It is the red eye of Taurus. It is an orange giant; it looks near the Pleiades cluster.'),
    wonderId: 'aldebaran',
  },
  {
    id: 'spica',
    stage: 'stars',
    title: L('Spica (Başak)', 'Spica'),
    text: L('Başak’ın en parlak yıldızıdır. Mavi-beyaz ve çok sıcaktır.', 'It is the brightest star in Virgo. It is blue-white and very hot.'),
    wonderId: 'spica',
  },
  {
    id: 'fomalhaut',
    stage: 'stars',
    title: L('Fomalhaut', 'Fomalhaut'),
    text: L('Güney Balığı’nın parlak yıldızıdır. Etrafında toz diski vardır.', 'It is the bright star of Piscis Austrinus. It has a dust disk around it.'),
    wonderId: 'fomalhaut',
  },
  {
    id: 'alphacen',
    stage: 'stars',
    title: L('Alpha Centauri', 'Alpha Centauri'),
    text: L('Güneş’e en yakın parlak yıldız sistemidir. Proxima onun küçük kırmızı komşusudur.', 'It is the closest bright star system to the Sun. Proxima is its small red neighbor.'),
    wonderId: 'alphacen',
  },
  {
    id: 'barnard',
    stage: 'stars',
    title: L('Barnard Yıldızı', 'Barnard’s Star'),
    text: L(
      'Barnard Yıldızı Güneş’ten sonra en yakın yıldızlardan biridir. Işığı 6 yılda gelir. Gökyüzünde yılda 10,3 açı saniyesi kayar; bilinen en hızlı kayış budur.',
      'Barnard’s Star is one of the closest stars after the Sun. Its light takes 6 years. It drifts 10.3 arcseconds a year in the sky; that is the fastest known drift.',
    ),
    wonderId: 'barnard',
  },
  {
    id: 'pollux',
    stage: 'stars',
    title: L('Pollux', 'Pollux'),
    text: L('İkizler’in turuncu kardeşidir. Castor’dan daha parlaktır.', 'It is the orange sibling in Gemini. It is brighter than Castor.'),
    wonderId: 'pollux',
  },
  {
    id: 'algol',
    stage: 'stars',
    title: L('Algol (Şeytan)', 'Algol'),
    text: L('Perseus’taki değişen yıldızdır. Eşi önünden geçince parlaklığı kısa süre solar.', 'It is the changing star in Perseus. When its partner passes in front, it briefly gets fainter.'),
    wonderId: 'algol',
  },
  {
    id: 'pleiades',
    stage: 'stars',
    title: L('Ülker', 'Pleiades'),
    text: L('Ülker, genç mavi yıldızlardan oluşan açık bir kümedir. Çıplak gözle küçük bir bulut gibi görünür.', 'The Pleiades is an open cluster of young blue stars. With your eyes it looks like a small cloud.'),
    wonderId: 'pleiades',
  },
  {
    id: 'm42',
    stage: 'stars',
    title: L('Orion Bulutsusu', 'Orion Nebula'),
    text: L('Orion’un kılıcındaki pembe bulutsudur. Yeni yıldızlar burada doğar.', 'It is the pink nebula in Orion’s sword. New stars are born there.'),
    wonderId: 'm42',
  },
]
