import type { BodyId } from '../types/planet'
import { L, tx, type AppLang, type LocText } from './types'

export const BODY_COPY: Record<BodyId, { atmosphere: LocText; description: LocText; facts: readonly LocText[] }> = {
  sun: {
    atmosphere: L(
      'Çoğunlukla hidrojen ve helyum. Güneş katı bir yüzey değil, sıcak bir plazma topudur.',
      'Mostly hydrogen and helium. The Sun is not a solid surface. It is a hot ball of plasma.',
    ),
    description: L('Güneş bir yıldızdır. Gezegenler onun etrafında döner.', 'The Sun is a star. Planets go around it.'),
    facts: [
      L('Güneş bir gezegen değil, bir yıldızdır. Kendi ışığını yapar.', 'The Sun is not a planet. It is a star. It makes its own light.'),
      L('Güneş ateş değil, çok sıcak gazdır.', 'The Sun is not fire. It is very hot gas.'),
      L('Güneş’in ışığı Dünya’ya yaklaşık 8 dakika 20 saniyede gelir.', 'Sunlight reaches Earth in about 8 minutes 20 seconds.'),
    ],
  },
  mercury: {
    atmosphere: L('Neredeyse yok. Gündüz çok ısınır, gece çok soğur.', 'Almost none. Days get very hot. Nights get very cold.'),
    description: L('Merkür Güneş’e en yakın gezegendir. Küçüktür. Uydusu yoktur.', 'Mercury is the closest planet to the Sun. It is small. It has no moon.'),
    facts: [
      L('Güneş’e en yakın gezegen Merkür’dür.', 'Mercury is the closest planet to the Sun.'),
      L('Merkür’de bir gün, bir yıldan daha uzundur.', 'On Mercury, one day is longer than one year.'),
      L('Havası yok denecek kadar incedir. Isıyı tutamaz.', 'Its air is almost gone. It cannot hold heat.'),
    ],
  },
  venus: {
    atmosphere: L('Çok kalın karbondioksit. Isıyı tutar.', 'Very thick carbon dioxide. It holds heat.'),
    description: L('Venüs en sıcak gezegendir. Dünya’ya benzer büyüklüktedir. Ters yönde döner.', 'Venus is the hottest planet. It is about Earth’s size. It spins the other way.'),
    facts: [
      L('Güneş’e Merkür’den uzak olsa da Merkür’den sıcaktır.', 'It is farther from the Sun than Mercury, but it is hotter than Mercury.'),
      L('Kalın havası Güneş ısısını tutar.', 'Its thick air holds the Sun’s heat.'),
      L('Ters döner; Güneş batıdan doğar gibi görünürdü.', 'It spins backward; the Sun would look like it rises in the west.'),
    ],
  },
  earth: {
    atmosphere: L('Azot ve oksijen. Canlıların nefes almasını sağlar.', 'Nitrogen and oxygen. Living things can breathe it.'),
    description: L('Dünya bizim evimizdir. Mavidir. Bir uydusu vardır: Ay.', 'Earth is our home. It is blue. It has one moon: the Moon.'),
    facts: [
      L('Gece ve gündüz, Dünya kendi etrafında döndüğü için olur.', 'Night and day happen because Earth spins.'),
      L('Yaz ve kış, Dünya biraz yana yatık durduğu için olur.', 'Summer and winter happen because Earth tilts a little.'),
      L('Bir yılı Güneş etrafında 1 turdur (yaklaşık 365,25 gün).', 'One year is 1 trip around the Sun (about 365.25 days).'),
    ],
  },
  moon: {
    atmosphere: L('Neredeyse yok.', 'Almost none.'),
    description: L('Ay, Dünya’nın uydusudur. Güneş ışığını yansıtır.', 'The Moon is Earth’s moon. It reflects sunlight.'),
    facts: [
      L('Ay kendi ışığını yapmaz; Güneş ışığını yansıtır.', 'The Moon does not make its own light; it reflects sunlight.'),
      L('Dünya’dan hep aynı yüzü görünür. Dönmesi ile turu neredeyse aynı sürer.', 'From Earth we always see the same face. Its spin and its trip take almost the same time.'),
      L('Ay’da çekim vardır; Dünya’dakinin yaklaşık altıda biridir.', 'The Moon has gravity; it is about one sixth of Earth’s.'),
    ],
  },
  mars: {
    atmosphere: L('İnce karbondioksit. Dünya’daki gibi rahat nefes alınamaz.', 'Thin carbon dioxide. You cannot breathe easily like on Earth.'),
    description: L('Mars kırmızı gezegendir. Orada da mevsim vardır.', 'Mars is the red planet. It has seasons too.'),
    facts: [
      L('Kırmızı rengi yüzeyindeki pastan gelir.', 'Its red color comes from rust on the surface.'),
      L('İki küçük uydusu vardır: Phobos ve Deimos.', 'It has two small moons: Phobos and Deimos.'),
      L('Bir Mars günü Dünya gününe yakındır (yaklaşık 24,6 saat).', 'A Mars day is close to an Earth day (about 24.6 hours).'),
    ],
  },
  phobos: {
    atmosphere: L('Neredeyse yok.', 'Almost none.'),
    description: L('Phobos, Mars’ın iç uydusudur. Küçüktür ve gezegene çok yakındır.', 'Phobos is the inner moon of Mars. It is small and very close to the planet.'),
    facts: [
      L('Phobos Mars’ın etrafında bir günden kısa tur atar.', 'Phobos goes around Mars in less than one day.'),
      L('Yüzeyi engebeli ve karanlıktır; bir patates gibi şekilsizdir.', 'Its surface is rough and dark; it is lumpy like a potato.'),
      L('Çekimi çok zayıftır; üzerinde durmak zordur.', 'Its gravity is very weak; it is hard to stand on it.'),
    ],
  },
  deimos: {
    atmosphere: L('Neredeyse yok.', 'Almost none.'),
    description: L('Deimos, Mars’ın dış uydusudur. Phobos’tan daha küçük ve daha uzaktır.', 'Deimos is the outer moon of Mars. It is smaller and farther than Phobos.'),
    facts: [
      L('Deimos, Mars’ın iki küçük uydusundan daha yavaş dolanır.', 'Deimos goes around Mars more slowly than the other small moon.'),
      L('Yüzeyi tozlu ve kraterlidir.', 'Its surface is dusty and full of craters.'),
      L('İkisi de Dünya’nın Ay’ı kadar yuvarlak ve büyük değildir.', 'Neither is as round or as big as Earth’s Moon.'),
    ],
  },
  jupiter: {
    atmosphere: L('Hidrojen ve helyum. Katı bir yere ayak basılmaz.', 'Hydrogen and helium. There is no solid ground to stand on.'),
    description: L('Jüpiter en kocaman gezegendir. Çok hızlı döner. Çok uydusu vardır.', 'Jupiter is the biggest planet. It spins very fast. It has many moons.'),
    facts: [
      L('Jüpiter bir gaz devidir; üzerinde yürünecek katı yer yoktur.', 'Jupiter is a gas giant; there is no solid ground to walk on.'),
      L('Büyük olduğu için daha yükseğe zıplanmaz; çekimi Dünya’dan daha güçlüdür.', 'Being big does not mean you jump higher; its gravity is stronger than Earth’s.'),
      L('Bir günü yaklaşık 10 saattir; çok hızlı döner.', 'One day is about 10 hours; it spins very fast.'),
    ],
  },
  io: {
    atmosphere: L('Çok ince; volkan gazları.', 'Very thin; volcano gases.'),
    description: L('Io, Jüpiter’in volkanik uydusudur. Yüzeyi sarı-turuncu kükürtle kaplıdır.', 'Io is Jupiter’s volcanic moon. Its surface is covered with yellow-orange sulfur.'),
    facts: [
      L('Güneş Sistemi’nin en volkanik dünyalarındandır.', 'It is one of the most volcanic worlds in the Solar System.'),
      L('Jüpiter’in çekimi içini gerer; bu yüzden ısınır.', 'Jupiter’s pull stretches its inside; that is why it heats up.'),
      L('Galile uydularının Jüpiter’e en yakın olanıdır.', 'It is the closest of the Galilean moons to Jupiter.'),
    ],
  },
  europa: {
    atmosphere: L('Neredeyse yok.', 'Almost none.'),
    description: L('Europa buzla kaplıdır. Buzun altında okyanus olabileceği düşünülür.', 'Europa is covered with ice. There may be an ocean under the ice.'),
    facts: [
      L('Yüzeyi pürüzsüz buzdur; çizikler gibi çatlaklar vardır.', 'Its surface is smooth ice; it has cracks like scratches.'),
      L('Buzun altında tuzlu bir okyanus olabilir.', 'There may be a salty ocean under the ice.'),
      L('Jüpiter’in dört büyük Galile uydusundan biridir.', 'It is one of Jupiter’s four big Galilean moons.'),
    ],
  },
  ganymede: {
    atmosphere: L('Neredeyse yok.', 'Almost none.'),
    description: L('Ganimed, Güneş Sistemi’nin en büyük uydusudur. Merkür’den bile büyüktür.', 'Ganymede is the biggest moon in the Solar System. It is even bigger than Mercury.'),
    facts: [
      L('En büyük uydudur; bir gezegen kadar geniştir.', 'It is the biggest moon; it is as wide as a planet.'),
      L('Kendi manyetik alanı vardır.', 'It has its own magnetic field.'),
      L('Jüpiter’in etrafında yaklaşık bir haftada tur atar.', 'It goes around Jupiter in about one week.'),
    ],
  },
  callisto: {
    atmosphere: L('Neredeyse yok.', 'Almost none.'),
    description: L('Callisto, Galile uydularının en dışta olanıdır. Yüzeyi eski kraterlerle doludur.', 'Callisto is the outermost Galilean moon. Its surface is full of old craters.'),
    facts: [
      L('Dört büyük uydunun Jüpiter’den en uzağıdır.', 'Of the four big moons, it is farthest from Jupiter.'),
      L('Yüzeyi Güneş Sistemi’ndeki en kraterli yerlerdendir.', 'Its surface is one of the most cratered places in the Solar System.'),
      L('İçi Europa kadar ısınmaz; daha sakin durur.', 'Its inside does not heat like Europa; it stays calmer.'),
    ],
  },
  saturn: {
    atmosphere: L('Hidrojen ve helyum.', 'Hydrogen and helium.'),
    description: L('Satürn’ün halkaları vardır. Halkalar buz ve kaya parçalarıdır.', 'Saturn has rings. The rings are bits of ice and rock.'),
    facts: [
      L('Halkalar bir tabak değil; buz, kaya ve toz parçalarıdır.', 'The rings are not a plate; they are bits of ice, rock, and dust.'),
      L('Başka gezegenlerin de ince halkası vardır. Satürn’ünkü daha kolay görülür.', 'Other planets have thin rings too. Saturn’s rings are easier to see.'),
      L('En büyük uydusu Titan’dır.', 'Its biggest moon is Titan.'),
    ],
  },
  titan: {
    atmosphere: L('Kalın azot. Turuncu bir pus yüzeyi örter.', 'Thick nitrogen. An orange haze covers the surface.'),
    description: L('Titan, Satürn’ün en büyük uydusudur. Kalın havası ve gölleri vardır.', 'Titan is Saturn’s biggest moon. It has thick air and lakes.'),
    facts: [
      L('Güneş Sistemi’nde kalın havası olan tek uydudur.', 'It is the only moon in the Solar System with thick air.'),
      L('Yüzeyinde sıvı metan gölleri bulunur.', 'It has lakes of liquid methane on the surface.'),
      L('Satürn’ün halkalarının dışında dolanır.', 'It goes around outside Saturn’s rings.'),
    ],
  },
  uranus: {
    atmosphere: L('Hidrojen, helyum ve metan. Metan ona mavi-yeşil rengi verir.', 'Hydrogen, helium, and methane. Methane gives it a blue-green color.'),
    description: L('Uranüs neredeyse yan yatarak döner. Bu yüzden mevsimleri gariptir.', 'Uranus almost spins on its side. That is why its seasons are strange.'),
    facts: [
      L('Uranüs neredeyse yan yatar. Yine de döner ve Güneş’in etrafında tur atar.', 'Uranus almost lies on its side. It still spins and goes around the Sun.'),
      L('Bu yüzden kutupları sırayla Güneş’e bakar.', 'That is why its poles take turns facing the Sun.'),
      L('İnce halkaları da vardır.', 'It has thin rings too.'),
    ],
  },
  neptune: {
    atmosphere: L('Hidrojen, helyum ve metan. Güçlü rüzgârları vardır.', 'Hydrogen, helium, and methane. It has strong winds.'),
    description: L('Neptün Güneş’ten en uzak gezegendir. Rüzgârları çok güçlüdür.', 'Neptune is the farthest planet from the Sun. Its winds are very strong.'),
    facts: [
      L('Güneş Sistemi’nin en uzak gezegenidir.', 'It is the farthest planet in the Solar System.'),
      L('Rüzgârları çok hızlıdır.', 'Its winds are very fast.'),
      L('En büyük uydusu Triton’dur.', 'Its biggest moon is Triton.'),
      L('İnce, soluk halkaları da vardır.', 'It has thin, faint rings too.'),
    ],
  },
  pluto: {
    atmosphere: L('Çok ince; çoğu zaman donmuş azot ve metan.', 'Very thin; often frozen nitrogen and methane.'),
    description: L('Plüton çok küçük ve çok soğuktur. En büyük uydusu Kharon’dur.', 'Pluto is very small and very cold. Its biggest moon is Charon.'),
    facts: [
      L('Plüton çok küçüktür. Güneş Sistemi’ni anlamamıza yardımcı olur.', 'Pluto is very small. It helps us understand the Solar System.'),
      L('Güneş Sistemi Plüton’da bitmez. Daha ötede de gök cisimleri vardır.', 'The Solar System does not end at Pluto. There are bodies farther out too.'),
      L('Yolu o kadar eğridir ki bazen Neptün’den Güneş’e daha yakın geçer.', 'Its path is so oval that it sometimes goes closer to the Sun than Neptune.'),
    ],
  },
}

export function bodyAtmosphere(id: BodyId, lang: AppLang): string {
  return tx(lang, BODY_COPY[id].atmosphere)
}

export function bodyDescription(id: BodyId, lang: AppLang): string {
  return tx(lang, BODY_COPY[id].description)
}

export function bodyFacts(id: BodyId, lang: AppLang): string[] {
  return BODY_COPY[id].facts.map((fact) => tx(lang, fact))
}
