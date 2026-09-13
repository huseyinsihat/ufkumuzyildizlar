import { L, tx, type AppLang, type LocText } from '../../i18n/types'

export interface CannedPrompt {
  id: string
  question: LocText
  answers: readonly [LocText, LocText, LocText]
  aliases?: readonly string[]
}

export const CANNED_PROMPTS: readonly CannedPrompt[] = [
  {
    id: 'sun-yellow',
    question: L('Neden sarı görünüyorsun?', 'Why do you look yellow?'),
    answers: [
      L('Aslında her rengi üretirim. Dünya’nın havası mavi ışığı dağıtır; gözüne daha çok sarı-beyaz gelir. Ben bir boya kutusu değilim, sıcak bir yıldızım.', 'I make every color. Earth’s air spreads blue light; more yellow-white reaches your eye. I am not a paint box. I am a hot star.'),
      L('Ben beyaza yakınım. Gökyüzü mavi ışığı dağıttığı için sen beni sarı gibi görürsün. Uzaydan baksan rengim daha açık durur.', 'I am close to white. The sky spreads blue light, so you see me as yellow. From space my color looks lighter.'),
      L('Rengim tek bir boya değil. Hava ve gözün, ışığımın sarı tarafını daha net seçer. Yıldızlar da böyle: renkleri sıcaklıklarını anlatır.', 'My color is not one paint. Air and your eye pick the yellow side of my light more clearly. Stars are like that: their colors tell their heat.'),
    ],
  },
  {
    id: 'light-travel',
    question: L('Işığın Dünya’ya ne kadar sürer?', 'How long does your light take to Earth?'),
    answers: [
      L('Işığım Dünya’ya yaklaşık 8 dakika 20 saniyede ulaşır. Şimdi gördüğün ışık, biraz önceki halimdir. Gökyüzündeki uzak yıldızların ışığı ise yıllarca yolda kalır.', 'My light reaches Earth in about 8 minutes 20 seconds. The light you see now is me from a little earlier. Light from far stars stays on the road for years.'),
      L('Yaklaşık 8 dakika 20 saniye. Uzak olsam da ışık çok hızlı gider. Sirius’un ışığı ise bize yaklaşık 8,6 yılda gelir.', 'About 8 minutes 20 seconds. I am far, but light goes very fast. Light from Sirius takes about 8.6 years to reach us.'),
      L('Sekiz dakika yirmi saniye kadar. Güneş doğunca aslında o ışık yolda biraz gecikmiştir. Bu yüzden “şimdi” sandığın Güneş, biraz önceki Güneş’tir.', 'About eight minutes twenty seconds. When the Sun rises, that light was already a bit late on the road. So the Sun you think is “now” is the Sun from a little earlier.'),
    ],
  },
  {
    id: 'mars-red',
    question: L('Mars neden kırmızı?', 'Why is Mars red?'),
    answers: [
      L('Yüzeyinde pas gibi demir oksit vardır. O toz gezegeni kırmızı gösterir. Ona bu yüzden Kızıl Gezegen denir.', 'There is iron oxide on its surface, like rust. That dust makes the planet look red. That is why it is called the Red Planet.'),
      L('Mars’ın toprağında paslı demir vardır. Işık o toza çarpınca kırmızımsı döner. Benim ışığım oraya da gider ama Mars kendi ışığını üretmez.', 'There is rusty iron in the soil of Mars. Light hits that dust and turns reddish. My light goes there too, but Mars does not make its own light.'),
      L('Kırmızı boya değil; demir oksit tozu ışığı kırmızımsı yansıtır. Gece göğünde de kırmızı duran yıldızlar vardır ama onlar sıcak gaz toplarıdır, Mars gibi gezegen değil.', 'It is not red paint; iron-oxide dust reflects light as reddish. There are red-looking stars in the night sky too, but they are hot balls of gas, not a planet like Mars.'),
    ],
  },
  {
    id: 'how-many-planets',
    question: L('Kaç gezegen var?', 'How many planets are there?'),
    aliases: ['kaç tane gezegen var', 'gezegen sayısı kaç', 'how many planets', 'how many planets are there'],
    answers: [
      L('Güneş Sistemi’nde 8 gezegen vardır: Merkür, Venüs, Dünya, Mars, Jüpiter, Satürn, Uranüs ve Neptün. Plüton cüce gezegendir. Samanyolu’nda ise milyarlarca gezegen saklanır.', 'There are 8 planets in the Solar System: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. Pluto is a dwarf planet. Billions of planets hide in the Milky Way.'),
      L('Sekiz tane. Plüton artık gezegen değil; yörüngesini paylaştığı için cüce gezegen sayılır. Benim etrafımda dolanan büyük aile bu sekizlidir.', 'Eight. Pluto is not a planet now; it shares its path, so it is counted as a dwarf planet. The big family going around me is these eight.'),
      L('Sekiz gezegen dolanır. Plüton küçük bir cüce gezegendir, sekizli listeye girmez. Yıldızların yanında başka gezegenler de vardır ama onlar başka güneşlerin ailesidir.', 'Eight planets go around. Pluto is a small dwarf planet; it is not on the list of eight. There are other planets by other stars, but they belong to other suns.'),
    ],
  },
  {
    id: 'closest-planet',
    question: L('Sana en yakın gezegen hangisi?', 'Which planet is closest to you?'),
    aliases: ['güneşe en yakın gezegen', 'en yakın gezegen', 'en yakın gezegen hangisi', 'closest planet', 'nearest planet to the sun'],
    answers: [
      L('Merkür bana en yakındır. Yılı da en kısadır: yaklaşık 88 gün. Venüs daha parlak görünür ama sıra olarak Merkür öndedir.', 'Mercury is closest to me. Its year is also the shortest: about 88 days. Venus looks brighter, but Mercury is first in line.'),
      L('En yakınım Merkür’dür. O yüzden Güneş’in yanında en hızlı dolanır. Yakın olduğu için günü de çok sıcaktır; havası neredeyse yoktur.', 'My closest is Mercury. That is why it goes around fastest next to the Sun. Because it is close, its day is very hot; it has almost no air.'),
      L('Merkür. Venüs daha parlak görünür ama sıra olarak Merkür daha yakındır. Parlaklık ile yakınlık aynı şey değildir.', 'Mercury. Venus looks brighter, but Mercury is closer in order. Brightness and closeness are not the same thing.'),
    ],
  },
  {
    id: 'farthest-planet',
    question: L('Güneş’e en uzak gezegen hangisi?', 'Which planet is farthest from the Sun?'),
    aliases: [
      'güneş e en uzak gezegen',
      'güneşe en uzak gezegen',
      'en uzak gezegen',
      'en uzak gezegen hangisi',
      'sana en uzak gezegen hangisi',
      'farthest planet',
      'which planet is farthest',
    ],
    answers: [
      L('Neptün’dür. Sekiz gezegen içinde bana en uzak olan odur. Bir Neptün yılı yaklaşık 165 Dünya yılı sürer; ışığım oraya zayıf ve soğuk ulaşır.', 'Neptune. Of the eight planets, it is farthest from me. A Neptune year takes about 165 Earth years; my light reaches there weak and cold.'),
      L('En uzağım Neptün. Uranüs’ten sonra gelir; turu yaklaşık 165 Dünya yılı sürer. O kadar uzaktır ki, orada bir yıl senin birkaç ömrün kadar uzundur.', 'My farthest is Neptune. It comes after Uranus; one trip takes about 165 Earth years. It is so far that one year there is as long as several of your lifetimes.'),
      L('Neptün. Bana en yakın Merkür, en uzak Neptün’dür. Işığım oraya da gider ama ısısı Dünya’dakinden çok daha azdır.', 'Neptune. Closest to me is Mercury, farthest is Neptune. My light goes there too, but the heat is much less than on Earth.'),
    ],
  },
  {
    id: 'hottest-planet',
    question: L('En sıcak gezegen hangisi?', 'Which planet is the hottest?'),
    answers: [
      L('Venüs’tür. Merkür daha yakın olsa da Venüs’ün kalın havası ısıyı hapseder. Kalın karbondioksit örtüsü, fırın kapağı gibi çalışır.', 'Venus. Mercury is closer, but Venus’s thick air traps heat. The thick carbon dioxide cover works like an oven lid.'),
      L('Venüs fırın gibidir. Sera etkisi yüzünden Merkür’den sıcaktır. Yakın olmak her zaman en sıcak olmak demek değildir.', 'Venus is like an oven. Because of the greenhouse effect it is hotter than Mercury. Being closer does not always mean being hottest.'),
      L('En sıcak Venüs. Kalın karbondioksit örtüsü Güneş ısısını kaçırmaz. Merkür bana daha yakın olsa da havası olmadığı için gece çok soğur.', 'Hottest is Venus. The thick carbon dioxide cover does not let the Sun’s heat escape. Mercury is closer to me, but with almost no air it gets very cold at night.'),
    ],
  },
  {
    id: 'biggest-planet',
    question: L('En büyük gezegen hangisi?', 'Which planet is the biggest?'),
    answers: [
      L('Jüpiter’dir. Gaz devidir; üzerinde yürünecek katı bir yer yoktur. O kadar büyüktür ki yerçekimi Dünya’dan daha güçlüdür.', 'Jupiter. It is a gas giant; there is no solid ground to walk on. It is so big that its gravity is stronger than Earth’s.'),
      L('Jüpiter hepsinden büyüktür. Çok hızlı döner; bir günü yaklaşık 10 saattir. Hızlı dönüş, kuşaklarını şerit şerit gösterir.', 'Jupiter is bigger than all of them. It spins very fast; one day is about 10 hours. The fast spin shows its belts in stripes.'),
      L('Jüpiter. Gaz topudur, yıldız değildir; kendi ışığını üretmez. Yine de Güneş Sistemi’nin en iri gezegenidir.', 'Jupiter. It is a ball of gas, not a star; it does not make its own light. Still, it is the biggest planet in the Solar System.'),
    ],
  },
  {
    id: 'saturn-rings',
    question: L('Satürn’ün halkası ne?', 'What are Saturn’s rings?'),
    answers: [
      L('Katı bir çember değil. Buz, kaya ve toz parçaları Satürn’ün etrafında dolanır. Uzaktan tek bir şerit gibi görünür.', 'Not a solid circle. Bits of ice, rock, and dust go around Saturn. From far away they look like one band.'),
      L('Halkalar milyonlarca küçük parçadır. Her biri Satürn’ün yanında kendi turunu atar. Jüpiter, Uranüs ve Neptün’ün de ince halkası vardır ama Satürn’ünkü daha belirgindir.', 'The rings are millions of tiny bits. Each one takes its own trip beside Saturn. Jupiter, Uranus, and Neptune have thin rings too, but Saturn’s are easier to see.'),
      L('Buz ve taş kırıntılarıdır. Bir tabak gibi sapasağlam durmazlar. Işığım o buzlara çarpınca halkalar parlaktır.', 'They are crumbs of ice and rock. They do not sit solid like a plate. When my light hits that ice, the rings look bright.'),
    ],
  },
  {
    id: 'why-night',
    question: L('Gece neden olur?', 'Why does night happen?'),
    answers: [
      L('Dünya kendi ekseni etrafında döner. Senin tarafın bana bakınca gündüz, öbür taraf gece olur. Gece olunca uzak yıldızlar daha kolay görünür.', 'Earth spins on its axis. When your side faces me it is day; the other side is night. At night, far stars are easier to see.'),
      L('Güneş batmaz. Dünya döner; sen karanlık tarafa geçersin. Işığım hep vardır; gezegenin bir yüzü gölgede kalır.', 'The Sun does not set. Earth spins; you move to the dark side. My light is always there; one face of the planet stays in shadow.'),
      L('Gece, Dünya’nın dönüşüyledir. Işığım hep vardır; gezegenin bir yüzü gölgede kalır. O karanlıkta Samanyolu’nun süt gibi bandını da görebilirsin.', 'Night comes from Earth’s spin. My light is always there; one face of the planet stays in shadow. In that dark you can also see the Milky Way’s milky band.'),
    ],
  },
  {
    id: 'why-seasons',
    question: L('Mevsimler neden değişir?', 'Why do seasons change?'),
    answers: [
      L('Dünya’nın ekseni biraz yatıktır. Yazın senin yarımküre bana daha dik bakar, kışın daha yatık. Yakınlık değil, bu eğiklik mevsimi değiştirir.', 'Earth’s axis tilts a little. In summer your half faces me more straight; in winter it faces more on a slant. Not closeness — this tilt changes the season.'),
      L('Yaz-kış Güneş’e yakınlıkla olmaz. Asıl neden eksen eğikliğidir. Dünya eğik durduğu için bir yer uzun süre daha çok ışık alır, sonra daha az.', 'Summer and winter are not from closeness to the Sun. The real reason is the tilt. Because Earth tilts, one place gets more light for a long time, then less.'),
      L('Dünya eğik durur. Bu yüzden bir yer uzun süre daha çok ışık alır, sonra daha az. Uranüs daha da yatıktır; onun mevsimleri çok daha uzundur.', 'Earth stands tilted. That is why one place gets more light for a long time, then less. Uranus tilts even more; its seasons last much longer.'),
    ],
  },
  {
    id: 'moon-light',
    question: L('Ay ışığını nereden alır?', 'Where does the Moon get its light?'),
    answers: [
      L('Ay kendi ışığını üretmez. Benim ışığımı yansıtır, sen de onu görürsün. Ay bir yıldız değildir; soğuk bir taş dünyadır.', 'The Moon does not make its own light. It reflects my light, and you see that. The Moon is not a star; it is a cold rocky world.'),
      L('Ay bir ayna gibidir. Parıltısı Güneş’ten gelir. Gecenin aydınlığı aslında benim gündüz ışığımdır.', 'The Moon is like a mirror. Its glow comes from the Sun. Night’s brightness is really my daytime light.'),
      L('Ay bir yıldız değildir. Gördüğün ay ışığı, yansıyan Güneş ışığıdır. Yıldızlar kendi ışığını yapar; Ay yapmaz.', 'The Moon is not a star. The moonlight you see is reflected sunlight. Stars make their own light; the Moon does not.'),
    ],
  },
  {
    id: 'moon-same-face',
    question: L('Ay’ın hep aynı yüzü mü görünür?', 'Do we always see the same face of the Moon?'),
    answers: [
      L('Evet. Ay’ın dönüşü ile Dünya etrafındaki dolanması neredeyse eşittir. Bu yüzden hep aynı yüzünü görürüz. Öbür yüzü de vardır; sadece buradan bakılmaz.', 'Yes. The Moon’s spin and its trip around Earth take almost the same time. That is why we always see the same face. The other face exists; we just cannot look from here.'),
      L('Dünya’dan hep aynı yüzü görünür. Öbür yüzü de vardır; sadece buradan bakılmaz. Ay dönmez sanılır ama döner; turu ile dönüşü aynı sürer.', 'From Earth we always see the same face. The other face exists; we just cannot look from here. People think the Moon does not spin, but it does; its trip and its spin take the same time.'),
      L('Ay dönmez sanılır ama döner. Turu ile dönüşü aynı sürdüğü için aynı yüz kalır. Uzay araçları o gizli yüzü de fotoğrafladı.', 'People think the Moon does not spin, but it does. Because its trip and spin take the same time, the same face stays. Spacecraft also photographed that hidden face.'),
    ],
  },
  {
    id: 'what-is-star',
    question: L('Yıldız nedir?', 'What is a star?'),
    answers: [
      L('Yıldız, kendi ışığını üreten çok sıcak bir gaz topudur. Ben de bir yıldızım. Gezegenler ise ışığını benden alır, kendileri üretmez.', 'A star is a very hot ball of gas that makes its own light. I am a star too. Planets take their light from me; they do not make it themselves.'),
      L('Gezegen ışığını benden alır. Yıldız ise kendi ışığını yapar. Gökyüzündeki o noktalar uzak güneşlerdir; ben size en yakın olanıyım.', 'A planet takes its light from me. A star makes its own light. Those dots in the sky are far suns; I am the closest one to you.'),
      L('Gökyüzündeki o noktalar uzak güneşlerdir. Ben size en yakın olanıyım. Işıklarını yıllarca yolda taşıdıkları için “şimdi” sandığın yıldız, aslında eski halidir.', 'Those dots in the sky are far suns. I am the closest one to you. Because their light travels for years, the star you think is “now” is really its old self.'),
    ],
  },
  {
    id: 'sun-not-planet',
    question: L('Sen gezegen misin?', 'Are you a planet?'),
    answers: [
      L('Hayır. Ben bir yıldızım. Gezegenler benim etrafımda dolanır ve ışık üretmez. Kendi ışığımı merkezimdeki sıcaklıkla üretirim.', 'No. I am a star. Planets go around me and do not make light. I make my own light with the heat in my center.'),
      L('Gezegen değilim. Kendi ışığımı üretirim; gezegenler onu yansıtır. Merkür’den Neptün’e hepsi bana bağlı dolanır.', 'I am not a planet. I make my own light; planets reflect it. From Mercury to Neptune, they all go around me.'),
      L('Ben Güneş Sistemi’nin yıldızıyım. Merkür’den Neptün’e hepsi bana bağlı dolanır. Samanyolu’nda benim gibi yüz milyarlarca yıldız daha vardır.', 'I am the star of the Solar System. From Mercury to Neptune, they all go around me. In the Milky Way there are hundreds of billions of stars like me.'),
    ],
  },
  {
    id: 'why-orbit',
    question: L('Gezegenler neden düşmez?', 'Why don’t planets fall?'),
    answers: [
      L('Yerçekimim onları çeker, hızları da yana götürür. İkisi birlikte yörüngeyi tutar. Bu denge olmasa ya bana düşerlerdi ya da uzaya kaçarlardı.', 'My gravity pulls them, and their speed takes them sideways. Together those two hold the orbit. Without that balance they would fall into me or fly off into space.'),
      L('İp ucundaki taş gibi: çekilirler ama yeterince hızlı gittikleri için üzerine düşmezler. Bu dengeye yörünge denir.', 'Like a stone on a string: they are pulled, but they go fast enough that they do not fall in. That balance is called an orbit.'),
      L('Düşmemelerinin nedeni yerçekimi ile hızın dengesidir. Bu dengeye yörünge denir. Aynı oyun, Dünya’nın etrafındaki Ay ve ISS için de geçerlidir.', 'They do not fall because gravity and speed balance. That balance is called an orbit. The same game works for the Moon and ISS around Earth.'),
    ],
  },
  {
    id: 'earth-year',
    question: L('Bir yıl ne demek?', 'What does one year mean?'),
    aliases: ['yıl nedir', 'bir yıl kaç gün', 'yıl ne demek', 'what is a year', 'how many days in a year'],
    answers: [
      L('Dünya’nın benim etrafımda bir tur atmasıdır. Bu yaklaşık 365 gün sürer. Gün ise Dünya’nın kendi etrafında bir dönüşüdür; ikisi farklı harekettir.', 'It is one trip of Earth around me. That takes about 365 days. A day is Earth spinning once; they are two different motions.'),
      L('Yıl, Dünya’nın Güneş turudur. Gün ise Dünya’nın kendi etrafında bir dönüşüdür. Merkür’ün yılı 88 gün, Neptün’ünkü yaklaşık 165 Dünya yılıdır.', 'A year is Earth’s trip around the Sun. A day is Earth spinning once. Mercury’s year is 88 days; Neptune’s is about 165 Earth years.'),
      L('Bir yıl dolanmak, bir gün dönmektir. İkisi farklı harekettir. Uzak yıldızların “yılı” ise bambaşka süreler tutar; her yıldızın ailesi kendinedir.', 'A year is going around; a day is spinning. They are two different motions. Far stars have “years” of very different lengths; each star’s family is its own.'),
    ],
  },
  {
    id: 'mercury-day',
    question: L('Merkür’de gün neden uzun?', 'Why is a day on Mercury long?'),
    answers: [
      L('Merkür yavaş döner, bana yakın olduğu için yılı kısadır. Bir günü, bir yılından uzundur. Yani orada Güneş’in doğup batması, tur atmaktan daha uzun sürer.', 'Mercury spins slowly, and because it is close to me its year is short. One day is longer than one year. So there, sunrise to sunset takes longer than one trip around.'),
      L('Merkür’de Güneş’in doğup batması çok sürer. Turu ise 88 günde biter. Yakın olduğu için çabuk dolanır ama kendi etrafında ağır döner.', 'On Mercury, sunrise to sunset takes a long time. One trip finishes in 88 days. Because it is close it goes around fast, but it spins slowly.'),
      L('Yakın olduğu için çabuk dolanır ama kendi etrafında ağır döner. O yüzden günü uzar. Hava neredeyse yoktur; gündüz çok ısınır, gece çok soğur.', 'Because it is close it goes around fast, but it spins slowly. That is why its day is long. There is almost no air; days get very hot, nights get very cold.'),
    ],
  },
  {
    id: 'venus-spin',
    question: L('Venüs neden ters döner?', 'Why does Venus spin backward?'),
    answers: [
      L('Venüs diğerlerinin tersine döner. Orada Güneş batıdan doğar gibi görünürdü. Hem çok yavaş hem ters döner; bir Venüs günü, bir Venüs yılından uzundur.', 'Venus spins the other way from the others. There the Sun would look like it rises in the west. It spins both very slowly and backward; one Venus day is longer than one Venus year.'),
      L('Dönüşü tersinedir. Nedeni eski bir çarpışma olabilir; kesin tek hikâye yok, emin konuşmam. Yıldızlar da bazen ters döner ama Venüs bir gezegendir.', 'Its spin is backward. An old crash may be why; there is no one sure story, so I will not pretend. Stars sometimes spin backward too, but Venus is a planet.'),
      L('Venüs hem çok yavaş hem ters döner. Bir Venüs günü, bir Venüs yılından uzundur. Kalın havası da ısıyı hapsedince en sıcak gezegen olur.', 'Venus spins both very slowly and backward. One Venus day is longer than one Venus year. Its thick air also traps heat, so it becomes the hottest planet.'),
    ],
  },
  {
    id: 'jupiter-day',
    question: L('Jüpiter neden çabuk döner?', 'Why does Jupiter spin fast?'),
    answers: [
      L('Jüpiter gaz devidir ve çok hızlı döner. Bir günü yaklaşık 10 saattir. Hızlı dönüş kuşaklarını da şerit şerit gösterir.', 'Jupiter is a gas giant and it spins very fast. One day is about 10 hours. The fast spin also shows its belts in stripes.'),
      L('Büyük olsa da günü kısadır. Hızlı dönüş kuşaklarını da şerit şerit gösterir. Dünya gününden çok daha kısa bir günü vardır: kabaca 10 saat.', 'Even though it is big, its day is short. The fast spin shows its belts in stripes. It has a day much shorter than Earth’s: about 10 hours.'),
      L('Dünya gününden çok daha kısa bir günü vardır: kabaca 10 saat. Gaz topu olduğu için katı bir yerde durulmaz ama fırtınaları kocaman durur.', 'It has a day much shorter than Earth’s: about 10 hours. Because it is a ball of gas you cannot stand on solid ground, but its storms stay huge.'),
    ],
  },
  {
    id: 'uranus-tilt',
    question: L('Uranüs neden yan durur?', 'Why does Uranus lie on its side?'),
    answers: [
      L('Ekseni neredeyse yana yatmıştır. Yine de döner ve benim etrafımda dolanır. Kutupları sırayla bana bakar; mevsimleri çok uzundur.', 'Its axis is almost on its side. It still spins and goes around me. Its poles take turns facing me; its seasons are very long.'),
      L('Uranüs yan yatarak gezer. Kutupları sırayla bana bakar; mevsimleri çok uzundur. Büyük bir çarpışmadan sonra böyle durduğu düşünülür.', 'Uranus travels lying on its side. Its poles take turns facing me; its seasons are very long. People think it ended up this way after a big crash.'),
      L('Yatık durması hareketi durdurmaz. Hem döner hem tur atar; ince halkaları da vardır. Dünya’nın eğikliği mevsim getirir; Uranüs’ünkü daha da abartılıdır.', 'Lying on its side does not stop its motion. It both spins and goes around; it has thin rings too. Earth’s tilt makes seasons; Uranus’s tilt is even more extreme.'),
    ],
  },
  {
    id: 'neptune-wind',
    question: L('Neptün neden mavi?', 'Why is Neptune blue?'),
    answers: [
      L('Havasındaki metan kırmızı ışığı yutar, mavi-yeşil kalır. En uzak gezegendir; buz devidir. Mavi boya değil, gazın ışığı değiştirmesidir.', 'Methane in its air swallows red light, so blue-green stays. It is the farthest planet; it is an ice giant. Not blue paint — the gas changes the light.'),
      L('Neptün buz devidir. Metan ona mavi rengi verir. Bana en uzak gezegen olduğu için ısısı da düşüktür; rüzgârları ise çok güçlüdür.', 'Neptune is an ice giant. Methane gives it the blue color. Because it is farthest from me its heat is low; its winds are very strong.'),
      L('Mavi boya değil. Metan gazı, gördüğün rengi değiştirir. Uzaktan bakınca sakin durur ama o mavi örtünün altında hızlı fırtınalar döner.', 'Not blue paint. Methane gas changes the color you see. From far away it looks calm, but under that blue cover fast storms spin.'),
    ],
  },
  {
    id: 'comet-tail',
    question: L('Kuyrukluyıldızın kuyruğu neden oluşur?', 'Why does a comet have a tail?'),
    answers: [
      L('Bana yaklaşınca buz ısınır, gaz ve toz uçar. Rüzgârım onları kuyruk gibi iter. Kuyruk her zaman arkada değil; çoğu zaman benden uzağa bakar.', 'When it comes near me the ice heats, and gas and dust fly off. My wind pushes them like a tail. The tail is not always behind; most of the time it points away from me.'),
      L('Kuyruk her zaman arkada değil; çoğu zaman benden uzağa bakar. Soğukken sönük durur. Yaklaşınca ısınır ve kuyruk çıkar.', 'The tail is not always behind; most of the time it points away from me. When it is cold it stays faint. When it comes near it heats and a tail comes out.'),
      L('Soğukken sönük durur. Yaklaşınca ısınır ve kuyruk çıkar. Bazen o toz Dünya’nın yoluna düşünce kayanyıldız yağmuru görürsün.', 'When it is cold it stays faint. When it comes near it heats and a tail comes out. Sometimes that dust falls on Earth’s path and you see a meteor shower.'),
    ],
  },
  {
    id: 'asteroid-belt',
    question: L('Asteroit kuşağı nedir?', 'What is the asteroid belt?'),
    answers: [
      L('Mars ile Jüpiter arasında kalan kaya ve metal parçalarıdır. Gezegen olamamış kırıntılardır. Filmdeki gibi sık bir duvar değildir; araları genelde çok boştur.', 'They are bits of rock and metal between Mars and Jupiter. They are crumbs that did not become a planet. It is not a tight wall like in a film; the gaps are usually very empty.'),
      L('Filmdeki gibi sık bir duvar değildir. Araları genelde çok boştur. Küçük cisimler orada dolanır; büyük bir gezegen değil, birçok küçük taş.', 'It is not a tight wall like in a film. The gaps are usually very empty. Small bodies go around there; not one big planet, many small rocks.'),
      L('Küçük cisimler orada dolanır. Büyük bir gezegen değil, birçok küçük taş. En irisi Ceres’tir; o da cüce gezegen sayılır.', 'Small bodies go around there. Not one big planet, many small rocks. The biggest is Ceres; it is counted as a dwarf planet too.'),
    ],
  },
  {
    id: 'how-many-stars',
    question: L('Gökyüzünde kaç yıldız var?', 'How many stars are in the sky?'),
    aliases: ['kaç yıldız vardı', 'kaç yıldız var', 'kaç tane yıldız var', 'yıldız sayısı kaç', 'how many stars', 'how many stars are there'],
    answers: [
      L('Samanyolu’nda yüz milyarlarca yıldız vardır; ben de onlardan biriyim. Çıplak gözle gece birkaç bin tanesini görürsün. Şehir ışığı yoksa daha çoğu çıkar.', 'There are hundreds of billions of stars in the Milky Way; I am one of them. With your eyes at night you see a few thousand. If city lights are gone, more come out.'),
      L('Gökada milyarlarca yıldız barındırır. Şehir ışığı yoksa binlercesini sayabilirsin; hepsini değil. Gözün gördüğü, çok küçük bir kısımdır.', 'The galaxy holds billions of stars. If city lights are gone you can count thousands; not all of them. What your eye sees is a very small part.'),
      L('Tek tek sayılmaz. Gökadamızda yüz milyarlarca yıldız vardır. Gözün gördüğü, çok küçük bir kısımdır; gerisi uzakta, sönük veya gündüz gizlidir.', 'They cannot be counted one by one. Our galaxy has hundreds of billions of stars. What your eye sees is a very small part; the rest are far, faint, or hidden by day.'),
    ],
  },
  {
    id: 'milky-way',
    question: L('Samanyolu nedir?', 'What is the Milky Way?'),
    aliases: ['samanyolu ne', 'samanyolu nedir', 'what is the milky way'],
    answers: [
      L('Samanyolu bizim gökadamızdır; içinde yüz milyarlarca yıldız vardır. Ben de o yıldızlardan biriyim. Gece süt gibi görünen bant, içeriden baktığın yıldız diskidir.', 'The Milky Way is our galaxy; it has hundreds of billions of stars inside. I am one of those stars. The milky band at night is the star disk seen from inside.'),
      L('Gece süt gibi görünen bant, içeriden baktığın yıldız diskidir. Güneş Sistemi o diskin bir kenarındadır. Gökyüzü tek bir çatı değil, kocaman bir şehir.', 'The milky band at night is the star disk seen from inside. The Solar System sits at one edge of that disk. The sky is not one roof; it is a huge city.'),
      L('Güneş Sistemi Samanyolu’nun bir kenarındadır. Gökyüzü tek bir çatı değil, kocaman bir şehir. Ben o şehirdeki lambalardan biriyim; en yakınınım.', 'The Solar System sits at one edge of the Milky Way. The sky is not one roof; it is a huge city. I am one of the lamps in that city; the closest one.'),
    ],
  },
  {
    id: 'milky-way-planets',
    question: L('Samanyolu’nda kaç gezegen vardır?', 'How many planets are in the Milky Way?'),
    aliases: [
      'samanyolunda kaç gezegen vardır',
      'samanyolunda kaç gezegen var',
      'samanyolu kaç gezegen',
      'samanyolu nda kaç gezegen',
      'how many planets in the milky way',
    ],
    answers: [
      L('Samanyolu’nda gezegen sayısı tek tek bilinmez. Yıldızların çoğunun yanında gezegen olabilir; milyarlarca olabilir. Güneş Sistemi’ndeki 8 gezegen, o büyük kalabalığın küçük bir parçasıdır.', 'The number of planets in the Milky Way is not known one by one. Most stars may have planets; there may be billions. The 8 planets in the Solar System are a small part of that big crowd.'),
      L('Güneş Sistemi’nde 8 gezegen vardır. Samanyolu ise kocaman bir gökada; içinde çok daha fazla gezegen saklanır. Kesin bir sayı yok; milyarlarca olması beklenir.', 'There are 8 planets in the Solar System. The Milky Way is a huge galaxy; many more planets hide inside. There is no exact number; billions are expected.'),
      L('Kesin bir sayı yok. Gökadamızda milyarlarca gezegen olması beklenir; hepsini sayamayız. Her yıldızın yanında Dünya gibi bir yer olmak zorunda da değildir.', 'There is no exact number. Billions of planets are expected in our galaxy; we cannot count them all. Not every star has to have a place like Earth beside it.'),
    ],
  },
  {
    id: 'constellation',
    question: L('Takımyıldız gerçek şekil mi?', 'Is a constellation a real shape?'),
    answers: [
      L('Hayır. Yıldızlar farklı uzaklıklardadır. Biz onları bir kâğıttaki resim gibi birleştiririz. Takımyıldız, gökyüzünü hatırlamak için çizilmiş bir haritadır.', 'No. The stars are at different distances. We join them like a drawing on paper. A constellation is a map drawn to remember the sky.'),
      L('Büyükayı bir tencere gibi durur ama yıldızları yan yana duran bir nesne değildir. Kimi yakındır, kimi çok uzaktır. Göz onları aynı düzleme yapıştırır.', 'Ursa Major looks like a pot, but its stars are not one object sitting side by side. Some are near, some are very far. The eye sticks them onto one plane.'),
      L('Takımyıldız, gökyüzünü hatırlamak için çizilmiş bir haritadır. Orion’daki Betelgeuse kırmızı ve büyüktür; Rigel ise mavi-beyaz parlaktır. Aynı resimde dururlar ama komşu evler değillerdir.', 'A constellation is a map drawn to remember the sky. Betelgeuse in Orion is red and big; Rigel is blue-white and bright. They sit in the same picture, but they are not neighbor houses.'),
    ],
  },
  {
    id: 'eclipse',
    question: L('Güneş tutulması nasıl olur?', 'How does a solar eclipse happen?'),
    answers: [
      L('Ay, Dünya ile benim arama girince gölgesi yere düşer. Kısa süre ışığım kesilir gibi olur. Tutulma sihir değil; üç cisim aynı hizaya gelince gölge oluşur.', 'When the Moon goes between Earth and me, its shadow falls on the ground. For a short time my light seems cut. An eclipse is not magic; when three bodies line up, a shadow forms.'),
      L('Ay benim önümü örter. Ay tutulmasında ise Dünya’nın gölgesi Ay’ın üstüne düşer. İkisi de hizalanma oyunudur; yıldızlar sönmez.', 'The Moon covers me in front. In a lunar eclipse, Earth’s shadow falls on the Moon. Both are a line-up game; stars do not go out.'),
      L('Tutulma sihir değil. Üç cisim aynı hizaya gelince gölge oluşur. Ay tam örtünce gündüz kısa süre geceye benzer; kuşlar bile şaşırabilir.', 'An eclipse is not magic. When three bodies line up, a shadow forms. When the Moon covers fully, day looks like night for a short time; even birds can be surprised.'),
    ],
  },
  {
    id: 'gravity-jump',
    question: L('Ay’da neden daha yükseğe zıplarız?', 'Why do we jump higher on the Moon?'),
    answers: [
      L('Ay’ın yerçekimi Dünya’dakinin yaklaşık altıda biridir. Aynı kasla daha yükseğe çıkarsın. Yerçekimi her yerde vardır ama güçleri farklıdır.', 'The Moon’s gravity is about one sixth of Earth’s. With the same muscles you go higher. Gravity is everywhere, but the strengths are different.'),
      L('Yerçekimi her yerde vardır ama güçleri farklıdır. Ay küçük olduğu için daha zayıf çeker. Jüpiter’de tam tersi olur: daha güçlü çeker, daha yükseğe zıplanmaz.', 'Gravity is everywhere, but the strengths are different. The Moon is small, so it pulls more weakly. On Jupiter it is the opposite: it pulls stronger, so you do not jump higher.'),
      L('Jüpiter’de tam tersi olur: daha güçlü çeker, daha yükseğe zıplanmaz. Ay’da ise adımların uzar. Bu, Ay’ın yıldız olmamasındandır; küçük bir taş dünyadır.', 'On Jupiter it is the opposite: it pulls stronger, so you do not jump higher. On the Moon your steps get longer. That is because the Moon is not a star; it is a small rocky world.'),
    ],
  },
  {
    id: 'atmosphere',
    question: L('Atmosfer neden önemli?', 'Why is an atmosphere important?'),
    answers: [
      L('Dünya’nın havası nefes almanı sağlar ve ısıyı tutar. Merkür’de hava neredeyse yoktur. Hava bir battaniye gibidir; olmazsa gündüz aşırı ısınır, gece aşırı soğur.', 'Earth’s air lets you breathe and holds heat. Mercury has almost no air. Air is like a blanket; without it, day gets too hot and night gets too cold.'),
      L('Hava bir battaniye gibidir. Olmazsa gündüz aşırı ısınır, gece aşırı soğur. Venüs’te hava çok kalındır ve çok ısı tutar; Dünya’daki denge canlılar için uygundur.', 'Air is like a blanket. Without it, day gets too hot and night gets too cold. On Venus the air is very thick and holds a lot of heat; Earth’s balance is good for living things.'),
      L('Venüs’te hava çok kalındır ve çok ısı tutar. Dünya’daki denge canlılar için uygundur. Kutup ışığı da o havanın, Güneş rüzgârımla konuşmasıdır.', 'On Venus the air is very thick and holds a lot of heat. Earth’s balance is good for living things. Aurora is that air talking with my solar wind.'),
    ],
  },
  {
    id: 'sun-size',
    question: L('Sen Dünya’dan ne kadar büyüksün?', 'How much bigger are you than Earth?'),
    answers: [
      L('Çapım Dünya’nın yaklaşık 109 katıdır. O yüzden gezegenler bana göre küçük kalır. Dünya’yı yan yana dizsen kabaca 109 tane gerekirdi.', 'My diameter is about 109 times Earth’s. That is why planets look small next to me. If you lined Earths up, you would need about 109.'),
      L('Dünya’yı yan yana dizsen kabaca 109 tane gerekirdi. Kütlem de çok daha büyüktür. Büyüklüğüm yüzünden hepsini çekerim; gezegenler benim etrafımda tur atar.', 'If you lined Earths up, you would need about 109. My mass is much bigger too. Because I am so big I pull them all; planets take trips around me.'),
      L('Büyüklüğüm yüzünden hepsini çekerim. Gezegenler benim etrafımda tur atar. Yine de Samanyolu’nda Betelgeuse gibi benden yüzlerce kat büyük yıldızlar da vardır.', 'Because I am so big I pull them all. Planets take trips around me. Still, in the Milky Way there are stars like Betelgeuse hundreds of times bigger than me.'),
    ],
  },
  {
    id: 'iss',
    question: L('ISS nedir?', 'What is ISS?'),
    aliases: ['uzay istasyonu nedir', 'iss ne', 'uluslararası uzay istasyonu', 'what is the iss', 'what is the space station', 'international space station'],
    answers: [
      L('ISS, Dünya’nın yakınında dolanan Uluslararası Uzay İstasyonu’dur. Astronotlar orada yaşar ve deney yapar. Yaklaşık 400 kilometre yüksektedir.', 'ISS is the International Space Station going around near Earth. Astronauts live and do experiments there. It is about 400 kilometers up.'),
      L('Yaklaşık 400 kilometre yüksektedir. Bir turu yaklaşık 90 dakika sürer; günde Dünya’yı birçok kez dolaşır. Birçok ülke birlikte kurdu.', 'It is about 400 kilometers up. One trip takes about 90 minutes; it goes around Earth many times a day. Many countries built it together.'),
      L('Birçok ülke birlikte kurdu. 2024’te Alper Gezeravcı da orada çalıştı. İstasyon bir yıldız değildir; Dünya’nın yanında dolanan bir laboratuvardır.', 'Many countries built it together. In 2024 Alper Gezeravcı also worked there. The station is not a star; it is a lab going around next to Earth.'),
    ],
  },
  {
    id: 'alper-gezeravci',
    question: L('Alper Gezeravcı kimdir?', 'Who is Alper Gezeravcı?'),
    aliases: [
      'alper gezeravcı',
      'alper gezeravci',
      'türkiyenin ilk astronotu',
      'ilk türk astronot',
      'crew dragon nedir',
      'who is alper gezeravci',
      'turkey first astronaut',
    ],
    answers: [
      L('Alper Gezeravcı, Türkiye’nin ilk astronotudur. 18 Ocak 2024’te Crew Dragon Freedom ile ISS’e gitti. Görevin adı Ax-3’tür.', 'Alper Gezeravcı is Turkey’s first astronaut. On 18 January 2024 he went to ISS on Crew Dragon Freedom. The mission name is Ax-3.'),
      L('Görevin adı Ax-3’tür. Yaklaşık 18 gün uzayda kaldı ve bilimsel deneyler yaptı. Aracı SpaceX’in Crew Dragon kapsülüdür.', 'The mission name is Ax-3. He stayed in space about 18 days and did science experiments. His craft is SpaceX’s Crew Dragon capsule.'),
      L('Aracı SpaceX’in Crew Dragon kapsülüdür. İstasyona gidip Dünya’ya döndü. Türkiye’nin uzay yolculuğunda ilk insanlı adımlardan biridir.', 'His craft is SpaceX’s Crew Dragon capsule. He went to the station and came back to Earth. It is one of the first crewed steps in Turkey’s space journey.'),
    ],
  },
  {
    id: 'turksat',
    question: L('Türksat uyduları nedir?', 'What are Türksat satellites?'),
    aliases: ['türksat nedir', 'turksat nedir', 'türksat 6a', 'türksat 5b', 'türkiye uydusu', 'what is turksat', 'what are turksat satellites'],
    answers: [
      L('Türksat uyduları Türkiye’nin haberleşme uydularıdır. Televizyon ve internet sinyalini taşırlar. Yüksek yörüngede Dünya ile birlikte durur gibi görünürler.', 'Türksat satellites are Turkey’s communications satellites. They carry TV and internet signals. In high orbit they look like they sit still with Earth.'),
      L('Türksat 6A, Türkiye’de tasarlanıp üretilen ilk haberleşme uydusudur. 8 Temmuz 2024’te uzaya gitti. Yıldız değildir; Dünya’nın yanında çalışan bir makinedir.', 'Türksat 6A is the first communications satellite designed and built in Turkey. It went to space on 8 July 2024. It is not a star; it is a machine working next to Earth.'),
      L('Türksat 5A ve 5B de güncel ailedendir. Yüksek yörüngede Dünya ile birlikte durur gibi görünürler. Gökyüzünde sabit duran bir lamba gibi iş görürler.', 'Türksat 5A and 5B are in the current family too. In high orbit they look like they sit still with Earth. They work like a lamp that stays still in the sky.'),
    ],
  },
  {
    id: 'star-twinkle',
    question: L('Yıldızlar neden kırpışır?', 'Why do stars twinkle?'),
    aliases: ['yıldızlar neden yanıp söner', 'yıldızlar neden titrer', 'neden kırpışır yıldızlar', 'why do stars twinkle', 'why do stars flicker'],
    answers: [
      L('Yıldızlar aslında sönmez. Işıkları Dünya’nın havasından geçerken burulur; gözüne kırpışır gibi gelir. Ay ve gezegenler daha yakın durduğu için genelde daha az titrer.', 'Stars do not really go out. Their light twists as it goes through Earth’s air; it looks like a twinkle to your eye. The Moon and planets sit closer, so they usually shimmer less.'),
      L('Kırpışma, yıldızın yanıp sönmesi değildir. Hava, ışığı küçük küçük saptırır. Dağda, şehir ışığı yokken yıldızlar daha net durur.', 'Twinkling is not a star turning on and off. Air bends the light in tiny bits. On a mountain, with no city lights, stars look clearer.'),
      L('Ben de bir yıldızım ama gündüz hava ve parlaklığım yüzünden kırpışmamı görmezsin. Gece uzak yıldızların ince ışığı, havanın içinden geçince dans eder gibi durur.', 'I am a star too, but by day you do not see me twinkle because of the air and my brightness. At night the thin light of far stars looks like it dances as it goes through the air.'),
    ],
  },
  {
    id: 'brightest-night-star',
    question: L('Gece en parlak yıldız hangisi?', 'Which is the brightest star at night?'),
    aliases: ['en parlak yıldız hangisi', 'sirius nedir', 'en parlak yıldız', 'gecenin en parlak yıldızı', 'brightest star', 'what is sirius', 'brightest night star'],
    answers: [
      L('Gece göğünün en parlak yıldızı Sirius’tur. Işığı bize yaklaşık 8,6 yılda gelir. Ben daha yakınım ama gece göğünde durmam; gündüz ışığım her şeyi bastırır.', 'The brightest star in the night sky is Sirius. Its light takes about 8.6 years to reach us. I am closer, but I do not sit in the night sky; my daytime light covers everything.'),
      L('Sirius, gece en parlak görünen yıldızdır. Canopus ondan sonra gelir; güneyden daha kolay görülür. Parlak görünmek, en yakın olmak demek değildir.', 'Sirius is the star that looks brightest at night. Canopus comes after it; it is easier to see from the south. Looking bright does not mean being closest.'),
      L('Sirius’tur. Köpek Yıldızı da denir; kış göğünde kolay seçilir. Işığı yıllarca yolda kalır; sen “şimdi” sanırsın, oysa eski halini görürsün.', 'Sirius. It is also called the Dog Star; it is easy to pick out in the winter sky. Its light stays on the road for years; you think it is “now,” but you see its old self.'),
    ],
  },
  {
    id: 'polaris',
    question: L('Kutup Yıldızı nedir?', 'What is the North Star?'),
    aliases: ['kutup yıldızı nedir', 'polaris nedir', 'kuzey yıldızı nedir', 'kuzey yıldızı', 'what is polaris', 'what is the north star', 'pole star'],
    answers: [
      L('Kutup Yıldızı Polaristir. Kuzey yönünü gösterir; gökyüzünde neredeyse yerinde durur. Dünya dönerken diğer yıldızlar onun etrafında dolanır gibi görünür.', 'The North Star is Polaris. It points north; it almost stays in place in the sky. As Earth spins, the other stars look like they go around it.'),
      L('Polaris, kuzeyi bulmak için kullanılır. En parlak yıldız değildir; Sirius ondan parlaktır. İşe yarayan tarafı, yerinde durur gibi görünmesidir.', 'Polaris is used to find north. It is not the brightest star; Sirius is brighter. The useful part is that it looks like it stays in place.'),
      L('Kuzey Yıldızı Polaristir. Küçükayı’nın ucundadır. Güney yarımkürede bu işaret işe yaramaz; orada başka yıldızlar kuzeyi değil güneyi anlatır.', 'The North Star is Polaris. It is at the tip of Ursa Minor. This sign does not work in the southern hemisphere; there other stars tell south, not north.'),
    ],
  },
  {
    id: 'proxima',
    question: L('Bana en yakın başka yıldız hangisi?', 'Which other star is closest to me?'),
    aliases: [
      'en yakın yıldız hangisi',
      'en yakın yıldız',
      'proxima nedir',
      'proxima centauri nedir',
      'güneşten sonra en yakın yıldız',
      'closest star',
      'nearest star after the sun',
      'what is proxima',
    ],
    answers: [
      L('Benden sonra size en yakın yıldız Proxima Centauri’dir. Işığı yaklaşık 4 yıl 3 ayda gelir. Gece göğünde parlak durmaz; çok sönük kırmızı bir yıldızdır.', 'After me, the closest star to you is Proxima Centauri. Its light takes about 4 years 3 months. It does not look bright in the night sky; it is a very faint red star.'),
      L('Proxima Centauri, Güneş’ten sonra en yakınımızdır. Yine de ışığı yıllarca yolda kalır. Yakın olmak, parlak görünmek demek değildir.', 'Proxima Centauri is the closest after the Sun. Still, its light stays on the road for years. Being close does not mean looking bright.'),
      L('Proxima Centauri’dir. Ben Dünya’ya 8 dakika 20 saniyede ulaşırım; o ise yıllarca gelir. Samanyolu’nda komşu sayılırız ama aramız hâlâ kocaman boşluktur.', 'Proxima Centauri. I reach Earth in 8 minutes 20 seconds; it takes years. In the Milky Way we count as neighbors, but the gap between us is still huge empty space.'),
    ],
  },
  {
    id: 'star-birth',
    question: L('Yıldızlar nasıl doğar?', 'How are stars born?'),
    aliases: ['yıldız nasıl oluşur', 'yıldızlar nasıl oluşur', 'yıldız nasıl doğar', 'how are stars born', 'how do stars form'],
    answers: [
      L('Soğuk gaz ve toz bulutları kendi ağırlığıyla çöker. Ortası ısınınca nükleer ateş yanar; yıldız doğar. Ben de çok uzun zaman önce böyle tutuştum.', 'Cold clouds of gas and dust collapse under their own weight. When the middle heats, nuclear fire starts; a star is born. I lit up this way a very long time ago too.'),
      L('Yıldız, karanlık bir buluttan çıkar. Gaz sıkışır, ısınır, kendi ışığını üretmeye başlar. Etrafında kalan toz bazen gezegen olur.', 'A star comes out of a dark cloud. Gas squeezes, heats, and starts making its own light. Dust left around it sometimes becomes planets.'),
      L('Doğum yeri, yıldız fabrikası gibi bulutsulardır. Çöken gaz topu yeterince ısınınca ışık üretir. Güneş Sistemi de böyle bir buluttan artakalanlardan kuruldu.', 'The birth place is nebulas, like star factories. When the collapsing gas ball gets hot enough, it makes light. The Solar System was also built from leftovers of a cloud like that.'),
    ],
  },
  {
    id: 'supernova',
    question: L('Süpernova nedir?', 'What is a supernova?'),
    aliases: ['supernova nedir', 'süpernova ne', 'yıldız patlaması nedir', 'what is a supernova', 'what is a star explosion'],
    answers: [
      L('Süpernova, büyük bir yıldızın yaşamının sonundaki kocaman patlamadır. Demir ve oksijen gibi elementler uzaya savrulur. Güneş bu kadar büyük olmadığı için böyle patlamayacaktır.', 'A supernova is the huge explosion at the end of a big star’s life. Elements like iron and oxygen fly into space. The Sun is not that big, so it will not explode this way.'),
      L('Büyük yıldız yakıtı bitince çekirdeği çöker, dış katmanlar savrulur. Kısa süre bir gökadadaki tüm yıldızları geçecek kadar parlayabilir. Vücudundaki bazı elementler de eski süpernovalardan gelir.', 'When a big star runs out of fuel its core collapses, and the outer layers fly out. For a short time it can shine brighter than all the stars in a galaxy. Some elements in your body also come from old supernovas.'),
      L('Yıldız patlamasıdır ama her yıldız yapmaz. Ben kırmızı deve dönüp sakin sakin şişeceğim; süpernova olmayacağım. Yakında böyle bir olay yok; korkulacak bir haber değildir.', 'It is a star explosion, but not every star does it. I will become a red giant and puff up calmly; I will not be a supernova. There is no such event nearby; it is not news to fear.'),
    ],
  },
  {
    id: 'shooting-star',
    question: L('Kayanyıldız nedir?', 'What is a shooting star?'),
    aliases: ['kayan yıldız nedir', 'kayanyıldız ne', 'meteor nedir', 'yıldız kayması nedir', 'what is a shooting star', 'what is a meteor'],
    answers: [
      L('Kayanyıldız bir yıldız değildir. Uzay tozu Dünya havasına girince ısınır ve kısa bir çizgi gibi yanar. Ağustos’ta Perseid yağmuru gibi gecelerde daha çok görünür.', 'A shooting star is not a star. Space dust heats up when it enters Earth’s air and burns as a short line. You see more on nights like the August Perseid shower.'),
      L('Gökyüzünde kayan o çizgi, sönen bir yıldız değildir. Küçük bir taş veya tozdur; hava onu yakar. Asıl yıldızlar yerlerinde durur, kırpışır.', 'That sliding line in the sky is not a star going out. It is a tiny rock or dust; the air burns it. Real stars stay in place and twinkle.'),
      L('Meteor denebilir. Kuyrukluyıldızların bıraktığı tozun içinden Dünya geçince yağmur gibi çoğalır. Dilek tutulsa da fizik aynıdır: toz, hava, ışık.', 'You can call it a meteor. When Earth goes through dust left by comets, they multiply like a shower. Even if you make a wish, the physics is the same: dust, air, light.'),
    ],
  },
  {
    id: 'star-color',
    question: L('Mavi yıldız mı kırmızı yıldız mı daha sıcak?', 'Is a blue star or a red star hotter?'),
    aliases: [
      'mavi yıldız mı daha sıcak',
      'kırmızı yıldız mı daha sıcak',
      'yıldız rengi ne anlatır',
      'yıldızlar neden farklı renk',
      'which star is hotter blue or red',
      'are blue stars hotter',
    ],
    answers: [
      L('Mavi yıldız daha sıcaktır. Kırmızı yıldız daha serindir. Ben sarı-beyaza yakınım; Rigel gibi mavi devler benden harlı, Betelgeuse gibi kırmızı devler daha yumuşak durur.', 'A blue star is hotter. A red star is cooler. I am close to yellow-white; blue giants like Rigel are fiercer than me, and red giants like Betelgeuse look softer.'),
      L('Renk, yıldızın sıcaklığını anlatır. Mavi harlı, kırmızı daha yumuşaktır. Boya seçmek değil; ateşin rengi gibi düşün.', 'Color tells a star’s heat. Blue is fierce, red is softer. It is not picking paint; think of the color of a fire.'),
      L('Mavi daha sıcaktır. Kırmızı büyük görünen yıldızlar bazen şişmiş yaşlı yıldızlardır; yüzeyleri daha serindir. Parlaklık ile sıcaklık da her zaman aynı şey değildir.', 'Blue is hotter. Big-looking red stars are sometimes puffed old stars; their surfaces are cooler. Brightness and heat are not always the same thing either.'),
    ],
  },
  {
    id: 'aurora',
    question: L('Kutup ışığı nasıl oluşur?', 'How does an aurora form?'),
    aliases: ['kutup ışığı nedir', 'aurora nedir', 'kuzey ışıkları nedir', 'kuzey ışığı nedir', 'what is an aurora', 'what are the northern lights'],
    answers: [
      L('Güneş’ten kopan yüklü parçacıklar Dünya’nın manyetik alanıyla karşılaşınca kutuplar ışır. Yeşil çoğu zaman oksijendir. Son yıllarda Güneş daha hareketli olduğu için kutup ışığı daha sık konuşulur.', 'When charged particles from the Sun meet Earth’s magnetic field, the poles glow. Green is often oxygen. In recent years the Sun has been more active, so aurora is talked about more.'),
      L('Aurora, Güneş ile Dünya’nın bağlantısını gösterir. Kuzeyde kutup ışığı, güneyde de benzer bir ışık olur. Güçlü fırtınada daha alçak enlemlerde de görülebilir.', 'Aurora shows the link between the Sun and Earth. There is aurora in the north, and a similar light in the south. In a strong storm it can also be seen at lower latitudes.'),
      L('Rüzgârımdaki parçacıklar atmosferdeki gazları ışıldatır. Bu, Güneş’in yok olması değildir; küçük bir selamlaşmadır. Işık 8 dakikada gelir; parçacıklar daha yavaştır.', 'Particles in my wind make gases in the air glow. This is not the Sun dying; it is a small hello. Light takes 8 minutes; the particles are slower.'),
    ],
  },
  {
    id: 'solar-flare',
    question: L('Güneş patlaması nedir?', 'What is a solar flare?'),
    aliases: ['güneş patlaması ne', 'solar flare nedir', 'güneş patlar mı', 'what is a solar flare', 'does the sun explode'],
    answers: [
      L('Güneş patlaması, manyetik alanımda ani bir enerji boşalmasıdır. Küçük bir bölgede parlak bir ışıma olur; ben yok olmam. Aynı enerji bazen kutup ışıklarını da tetikler.', 'A solar flare is a sudden energy burst in my magnetic field. A small region glows brightly; I do not vanish. The same energy sometimes also triggers auroras.'),
      L('Patlama, Güneş’in parçalanması değildir. Lekelerimin yakınında daha sık görülür. Işık Dünya’ya yaklaşık 8 dakikada gelir; radyo ve uyduları etkileyebilir.', 'A flare is not the Sun breaking apart. It is seen more often near my spots. The light reaches Earth in about 8 minutes; it can affect radio and satellites.'),
      L('Manyetik çizgiler kopup yeniden bağlanınca enerji ışık olarak çıkar. Bu, süpernova değildir. Ben böyle küçük parlamalar yapabilirim; yıldız olarak yerimde dururum.', 'When magnetic lines snap and join again, the energy comes out as light. This is not a supernova. I can make small flashes like this; as a star I stay in place.'),
    ],
  },
]

export function pickChipCount(): 2 {
  return 2
}

export function normalizeQuestion(text: string): string {
  return text
    .toLocaleLowerCase('tr-TR')
    .replace(/[?!.,;:'’“”]/g, '')
    .replace(/güneş\s+e\s+/g, 'güneşe ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function matchCanned(text: string): CannedPrompt | undefined {
  const needle = normalizeQuestion(text)
  if (!needle) return undefined
  const exact = CANNED_PROMPTS.find((item) => {
    if (normalizeQuestion(item.question.tr) === needle) return true
    if (normalizeQuestion(item.question.en) === needle) return true
    return Boolean(item.aliases?.some((alias) => normalizeQuestion(alias) === needle))
  })
  if (exact) return exact
  if ((needle.includes('samanyol') || needle.includes('milky way')) && (needle.includes('gezegen') || needle.includes('planet'))) {
    return CANNED_PROMPTS.find((item) => item.id === 'milky-way-planets')
  }
  if ((needle.includes('en uzak') || needle.includes('farthest')) && (needle.includes('gezegen') || needle.includes('planet'))) {
    return CANNED_PROMPTS.find((item) => item.id === 'farthest-planet')
  }
  if ((needle.includes('en yakın') || needle.includes('closest') || needle.includes('nearest')) && (needle.includes('gezegen') || needle.includes('planet'))) {
    return CANNED_PROMPTS.find((item) => item.id === 'closest-planet')
  }
  if ((needle.includes('en yakın') || needle.includes('closest') || needle.includes('nearest')) && (needle.includes('yıldız') || needle.includes('star'))) {
    return CANNED_PROMPTS.find((item) => item.id === 'proxima')
  }
  if ((needle.includes('en parlak') || needle.includes('brightest')) && (needle.includes('yıldız') || needle.includes('star'))) {
    return CANNED_PROMPTS.find((item) => item.id === 'brightest-night-star')
  }
  if (
    needle.includes('kutup yıldızı') ||
    needle.includes('polaris') ||
    needle.includes('kuzey yıldızı') ||
    needle.includes('north star') ||
    needle.includes('pole star')
  ) {
    return CANNED_PROMPTS.find((item) => item.id === 'polaris')
  }
  if (needle.includes('kutup ışığı') || needle.includes('aurora') || needle.includes('kuzey ışık') || needle.includes('northern light')) {
    return CANNED_PROMPTS.find((item) => item.id === 'aurora')
  }
  if (needle.includes('süpernova') || needle.includes('supernova')) {
    return CANNED_PROMPTS.find((item) => item.id === 'supernova')
  }
  if (
    needle.includes('kayanyıldız') ||
    needle.includes('kayan yıldız') ||
    needle.includes('yıldız kayması') ||
    needle.includes('shooting star')
  ) {
    return CANNED_PROMPTS.find((item) => item.id === 'shooting-star')
  }
  if (needle.includes('güneş patlama') || needle.includes('solar flare')) {
    return CANNED_PROMPTS.find((item) => item.id === 'solar-flare')
  }
  if (needle.includes('kırpış') || needle.includes('yanıp söner') || needle.includes('twinkle')) {
    return CANNED_PROMPTS.find((item) => item.id === 'star-twinkle')
  }
  if (needle.includes('iss') || needle.includes('uzay istasyonu') || needle.includes('space station')) {
    return CANNED_PROMPTS.find((item) => item.id === 'iss')
  }
  if (needle.includes('alper') || needle.includes('gezeravcı') || needle.includes('gezeravci')) {
    return CANNED_PROMPTS.find((item) => item.id === 'alper-gezeravci')
  }
  if (needle.includes('türksat') || needle.includes('turksat')) {
    return CANNED_PROMPTS.find((item) => item.id === 'turksat')
  }
  return undefined
}

function shufflePrompts(items: CannedPrompt[], random: () => number): CannedPrompt[] {
  const shuffled = [...items]
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    const a = shuffled[i]
    const b = shuffled[j]
    if (!a || !b) continue
    shuffled[i] = b
    shuffled[j] = a
  }
  return shuffled
}

function isAskedPrompt(item: CannedPrompt, askedQuestions: ReadonlySet<string>, askedNorm: Set<string>): boolean {
  if (askedQuestions.has(item.id)) return true
  if (askedNorm.has(normalizeQuestion(item.question.tr))) return true
  if (askedNorm.has(normalizeQuestion(item.question.en))) return true
  return false
}

export function pickChipQuestions(
  askedQuestions: ReadonlySet<string>,
  random = Math.random,
  count = pickChipCount(),
): CannedPrompt[] {
  const askedNorm = new Set([...askedQuestions].map(normalizeQuestion))
  const unused = CANNED_PROMPTS.filter((item) => !isAskedPrompt(item, askedQuestions, askedNorm))
  const picked = shufflePrompts(unused, random).slice(0, count)
  if (picked.length >= count) return picked
  const used = CANNED_PROMPTS.filter((item) => isAskedPrompt(item, askedQuestions, askedNorm))
  for (const item of shufflePrompts(used, random)) {
    if (picked.length >= count) break
    if (picked.some((chip) => chip.id === item.id)) continue
    picked.push(item)
  }
  return picked.slice(0, Math.min(count, picked.length))
}

export function pickCannedAnswer(question: string, random = Math.random, lang?: AppLang): string | null {
  const item = matchCanned(question)
  if (!item) return null
  const index = Math.min(item.answers.length - 1, Math.floor(random() * item.answers.length))
  const loc = item.answers[index] ?? item.answers[0]
  return loc ? tx(lang ?? 'tr', loc) : null
}

export function findCanned(question: string): CannedPrompt | undefined {
  return matchCanned(question)
}
