import { L, type LocText } from '../i18n/types'
import type { BodyId } from '../types/planet'

export type AstroEventId =
  | 'solar-eclipse'
  | 'lunar-eclipse'
  | 'jupiter-moon-shadow'
  | 'io-volcano'
  | 'enceladus-geyser'
  | 'titan-methane'
  | 'europa-ocean'
  | 'solar-flare'
  | 'cme-aurora'
  | 'jupiter-grs'
  | 'mars-dust'
  | 'saturn-rings'
  | 'meteor-shower'
  | 'venus-haze'
  | 'uranus-tilt'
  | 'neptune-spot'
  | 'comet-tail'
  | 'supernova'
  | 'ns-merger'
  | 'black-hole'

export type AstroEventKind =
  | 'eclipse'
  | 'moon'
  | 'atmosphere'
  | 'solar'
  | 'sky'

export interface UpcomingSkyDate {
  date: LocText
  text: LocText
}

export type EventStatus = 'now' | 'upcoming' | 'happened'

export const EVENT_STATUS_LABEL: Record<EventStatus, LocText> = {
  now: L('Şimdi', 'Now'),
  upcoming: L('Yakında', 'Soon'),
  happened: L('Oldu', 'Past'),
}

export interface AstroEvent {
  id: AstroEventId
  title: LocText
  shortName: LocText
  lead: LocText
  see: LocText
  why: LocText
  facts: LocText[]
  wrong?: LocText
  hostBodyId: BodyId | null
  relatedBodyIds: BodyId[]
  durationMs: number
  weight: number
  kind: AstroEventKind
  upcoming?: UpcomingSkyDate[]
}

export const ASTRO_EVENTS: readonly AstroEvent[] = [
  {
    id: 'solar-eclipse',
    title: L('Tam Güneş tutulması', 'Total solar eclipse'),
    shortName: L('Tutulma', 'Eclipse'),
    lead: L('Ay, Güneş ile Dünya’nın arasına girer. Ay’ın gölgesi Dünya’nın üzerine düşer.', 'The Moon goes between the Sun and Earth. The Moon’s shadow falls on Earth.'),
    see: L('Dünya’nın Güneş’e bakan yüzünde koyu bir leke. İnce bir çizgi Güneş, Ay ve Dünya’yı bağlar. Gezegen tamamen karanlık olmaz.', 'A dark patch on the Sun-facing side of Earth. A thin line joins the Sun, Moon, and Earth. The planet does not go fully dark.'),
    why: L('Üç cisim aynı hizaya gelince Ay, Güneş ışığının bir kısmını keser.', 'When the three bodies line up, the Moon cuts some of the sunlight.'),
    facts: [
      L('Hiza: Güneş – Ay – Dünya.', 'Line-up: Sun – Moon – Earth.'),
      L('Güneş tamamen kapanınca korona görünür: Güneş’in dış atmosferi.', 'When the Sun is fully covered, the corona shows: the Sun’s outer atmosphere.'),
      L('Tutulmalar rastgele değil; yörüngeler hesaplanabildiği için tarihleri önceden bilinir.', 'Eclipses are not random; because the paths can be calculated, the dates are known ahead.'),
      L('Ay’ın gölgesi Dünya üzerinde dar bir şerit çizer; her yerde tam tutulma görülmez.', 'The Moon’s shadow draws a thin strip on Earth; a total eclipse is not seen everywhere.'),
      L('Halkalı tutulmada Ay Güneş’i tam kapatamaz; kenarda parlak bir halka kalır.', 'In an annular eclipse the Moon cannot cover the Sun fully; a bright ring stays at the edge.'),
    ],
    wrong: L('Tutulma Güneş’in sönmesi değildir. Ay yalnızca Güneş’i bir süre örter; sonra Güneş yine oradadır.', 'An eclipse is not the Sun going out. The Moon only covers the Sun for a while; then the Sun is still there.'),
    hostBodyId: 'earth',
    relatedBodyIds: ['sun', 'earth', 'moon'],
    durationMs: 16_000,
    weight: 5,
    kind: 'eclipse',
    upcoming: [
      { date: L('2 Ağustos 2027', '2 August 2027'), text: L('Tam tutulma — İspanya, Kuzey Afrika, Mısır', 'Total eclipse — Spain, North Africa, Egypt') },
      { date: L('26 Ocak 2028', '26 January 2028'), text: L('Halkalı tutulma — Ay Güneş’i tam kapatamaz', 'Annular eclipse — the Moon cannot cover the Sun fully') },
      { date: L('22 Temmuz 2028', '22 July 2028'), text: L('Tam tutulma — Avustralya ve Yeni Zelanda', 'Total eclipse — Australia and New Zealand') },
      { date: L('1 Haziran 2030', '1 June 2030'), text: L('Halkalı tutulma — hat Türkiye’den de geçer', 'Annular eclipse — the path also crosses Turkey') },
      { date: L('25 Kasım 2030', '25 November 2030'), text: L('Tam tutulma — güney Afrika ve Avustralya', 'Total eclipse — southern Africa and Australia') },
      { date: L('30 Mart 2033', '30 March 2033'), text: L('Tam tutulma — yaklaşık 2 dk 37 sn', 'Total eclipse — about 2 min 37 s') },
      { date: L('20 Mart 2034', '20 March 2034'), text: L('Tam tutulma — yaklaşık 4 dk 09 sn', 'Total eclipse — about 4 min 09 s') },
      { date: L('2 Eylül 2035', '2 September 2035'), text: L('Tam tutulma — yaklaşık 2 dk 54 sn', 'Total eclipse — about 2 min 54 s') },
      { date: L('13 Temmuz 2037', '13 July 2037'), text: L('Tam tutulma — yaklaşık 3 dk 58 sn', 'Total eclipse — about 3 min 58 s') },
      { date: L('23 Ağustos 2044', '23 August 2044'), text: L('Tam tutulma — Kuzey Amerika (Montana, Kuzey Dakota)', 'Total eclipse — North America (Montana, North Dakota)') },
    ],
  },
  {
    id: 'lunar-eclipse',
    title: L('Ay tutulması', 'Lunar eclipse'),
    shortName: L('Ay tutulması', 'Moon eclipse'),
    lead: L('Dünya, Güneş ile Ay’ın arasına girince Ay’ın üzerine gölge düşer.', 'When Earth goes between the Sun and the Moon, a shadow falls on the Moon.'),
    see: L('Ay’ın Güneş’e bakan yüzünde kırmızımsı koyu bir leke. Ay kaybolmaz; kızarır.', 'A reddish dark patch on the Sun-facing side of the Moon. The Moon does not vanish; it turns red.'),
    why: L('Hiza bu kez Güneş – Dünya – Ay’dır. Dünya’nın gölgesi Ay’ı örter.', 'This time the line-up is Sun – Earth – Moon. Earth’s shadow covers the Moon.'),
    facts: [
      L('Güneş tutulmasının ters hizasıdır.', 'It is the reverse line-up of a solar eclipse.'),
      L('Ay bazen bakır kırmızısı görünür; buna “kanlı Ay” denir.', 'The Moon sometimes looks copper red; that is called a “blood Moon”.'),
      L('Kırmızı, Dünya atmosferinden geçen Güneş ışığının kırılmasından gelir.', 'The red comes from sunlight bending through Earth’s air.'),
      L('Ay tutulması, gece Dünya’nın büyük kısmından görülebilir.', 'A lunar eclipse can be seen from much of Earth at night.'),
      L('Ay yörüngesi biraz eğik olduğu için her dolunayda tutulma olmaz.', 'The Moon’s path tilts a little, so not every full Moon is an eclipse.'),
    ],
    wrong: L('Ay tutulunca Ay yok olmaz. Dünya’nın gölgesi üzerine düşer; sonra çıkar.', 'The Moon does not vanish in a lunar eclipse. Earth’s shadow falls on it; then it comes out.'),
    hostBodyId: 'moon',
    relatedBodyIds: ['sun', 'earth', 'moon'],
    durationMs: 16_000,
    weight: 5,
    kind: 'eclipse',
  },
  {
    id: 'jupiter-moon-shadow',
    title: L('Jüpiter’de uydu gölgesi', 'Moon shadow on Jupiter'),
    shortName: L('Gölge', 'Shadow'),
    lead: L('Bir uydu Jüpiter’in önünden geçince gölgesi gezegenin üzerine düşer.', 'When a moon passes in front of Jupiter, its shadow falls on the planet.'),
    see: L('Jüpiter’in ekvatorunda küçük bir uydu ve gezegen üzerinde yürüyen koyu oval.', 'A small moon at Jupiter’s equator and a dark oval walking on the planet.'),
    why: L('Güneş – uydu – Jüpiter aynı hizaya gelince gölge düşer. Tutulma yalnızca Dünya’da olmaz.', 'When Sun – moon – Jupiter line up, a shadow falls. Eclipses do not happen only on Earth.'),
    facts: [
      L('Jüpiter’in büyük uyduları gezegenin üzerinde karanlık bir leke gezdirir.', 'Jupiter’s big moons walk a dark patch across the planet.'),
      L('Bu, Güneş – uydu – Jüpiter hizasının sonucudur.', 'This is the result of a Sun – moon – Jupiter line-up.'),
      L('Uydu ekvator düzleminde dolanır; gölge de o hatta yürür.', 'The moon goes in the equator plane; the shadow walks that line too.'),
      L('Teleskopla bakınca leke, uydunun kendisinden önce fark edilebilir.', 'With a telescope the patch can be noticed before the moon itself.'),
      L('Aynı fikir Dünya’daki Güneş tutulmasıyla aynıdır: öndeki cisim ışığı keser.', 'The idea is the same as a solar eclipse on Earth: the body in front cuts the light.'),
    ],
    hostBodyId: 'jupiter',
    relatedBodyIds: ['jupiter', 'sun'],
    durationMs: 14_000,
    weight: 4,
    kind: 'moon',
  },
  {
    id: 'io-volcano',
    title: L('Io’da volkan', 'Volcano on Io'),
    shortName: L('Volkan', 'Volcano'),
    lead: L('Jüpiter’in uydusu Io, Güneş Sistemi’nin en volkanik dünyalarındandır.', 'Jupiter’s moon Io is one of the most volcanic worlds in the Solar System.'),
    see: L('Jüpiter’in ekvatorunda sarımsı Io; yüzeyinden yavaş yükselen sıcak bir püskürme.', 'Yellowish Io at Jupiter’s equator; a hot burst slowly rising from the surface.'),
    why: L('Jüpiter’in çekimi Io’nun içini gerer; içerisi ısınır ve volkan çıkar.', 'Jupiter’s pull stretches Io’s inside; the inside heats up and a volcano comes out.'),
    facts: [
      L('Bağlantı: çekim → iç ısınma → volkanizma.', 'Link: gravity → inner heat → volcanoes.'),
      L('Io’nun yüzeyi kükürtten sarı-turuncu görünür.', 'Io’s surface looks yellow-orange from sulfur.'),
      L('Püskürmeler uzaya kadar yükselebilir.', 'Bursts can rise all the way into space.'),
      L('Io, Dünya’dan daha fazla aktif volkana sahiptir.', 'Io has more active volcanoes than Earth.'),
      L('Çekimle ısınır: cisim sıkışır, gevşer, ısınır.', 'It heats from the pull: the body squeezes, eases, and heats.'),
    ],
    hostBodyId: 'jupiter',
    relatedBodyIds: ['jupiter'],
    durationMs: 16_000,
    weight: 4,
    kind: 'moon',
  },
  {
    id: 'enceladus-geyser',
    title: L('Enceladus gayzerleri', 'Enceladus geysers'),
    shortName: L('Gayzer', 'Geyser'),
    lead: L('Satürn’ün buzlu uydusu Enceladus, çatlaklarından su buharı fışkırtır.', 'Saturn’s icy moon Enceladus sprays water vapor from its cracks.'),
    see: L('Satürn’ün ekvatorunda küçük buz uydusu; güneyinden ince su jeti çıkar.', 'A small ice moon at Saturn’s equator; a thin water jet comes from its south.'),
    why: L('Buzun altında sıvı su olabilir; çatlaklardan dışarı fışkırır.', 'There may be liquid water under the ice; it sprays out through the cracks.'),
    facts: [
      L('Buzlu bir dünya dışarıdan sakin görünür; içerisi hareketli olabilir.', 'An icy world can look calm outside; the inside can still move.'),
      L('Jetler Satürn’ün halkalarına da madde taşır.', 'The jets also carry stuff into Saturn’s rings.'),
      L('Su buharı donarak ince buz taneleri olur.', 'Water vapor freezes into tiny ice grains.'),
      L('Bu, yaşam arayışında önemli bir ipucudur: sıvı su.', 'This is an important clue in the search for life: liquid water.'),
      L('Gayzerler uydunun güney kutbuna yakındır.', 'The geysers are near the moon’s south pole.'),
    ],
    hostBodyId: 'saturn',
    relatedBodyIds: ['saturn'],
    durationMs: 14_000,
    weight: 4,
    kind: 'moon',
  },
  {
    id: 'titan-methane',
    title: L('Titan’da metan yağmuru', 'Methane rain on Titan'),
    shortName: L('Yağmur', 'Rain'),
    lead: L('Satürn’ün büyük uydusu Titan’da yağmur su değil, çoğunlukla metandır.', 'On Saturn’s big moon Titan, rain is not water; it is mostly methane.'),
    see: L('Turuncu puslu Titan, düşen yağmur çizgileri ve yüzeyde koyu göl parıltısı.', 'Orange hazy Titan, falling rain lines, and a dark lake shine on the surface.'),
    why: L('Titan’da metan buharlaşır, bulut olur, yağar, göllere akar: soğuk bir döngü.', 'On Titan methane evaporates, makes clouds, rains, and flows into lakes: a cold cycle.'),
    facts: [
      L('Bu, Dünya’daki su döngüsüne benzer ama çok daha soğuktur.', 'This is like Earth’s water cycle, but much colder.'),
      L('Göller su değil, ağırlıklı olarak sıvı hidrokarbondur.', 'The lakes are not water; they are mostly liquid hydrocarbon.'),
      L('Kalın turuncu pus, Titan’ın atmosferidir.', 'The thick orange haze is Titan’s atmosphere.'),
      L('Titan, kalın atmosfere sahip tek uydudur.', 'Titan is the only moon with a thick atmosphere.'),
      L('Yüzeyde nehir yatakları ve kıyılar görülmüştür.', 'River beds and shores have been seen on the surface.'),
    ],
    hostBodyId: 'saturn',
    relatedBodyIds: ['saturn'],
    durationMs: 18_000,
    weight: 4,
    kind: 'moon',
  },
  {
    id: 'europa-ocean',
    title: L('Europa’nın gizli okyanusu', 'Europa’s hidden ocean'),
    shortName: L('Okyanus', 'Ocean'),
    lead: L('Europa buzla kaplıdır; buzun altında büyük bir sıvı su okyanusu olması beklenir.', 'Europa is covered with ice; a big liquid-water ocean is expected under the ice.'),
    see: L('Buz kabuğu biraz saydamlaşır; içeride mavi bir okyanus ışıması görünür. Kesit yok.', 'The ice shell looks a bit see-through; a blue ocean glow shows inside. No cutaway.'),
    why: L('Jüpiter’in çekimi Europa’nın içini de sıcak tutmaya yardım eder.', 'Jupiter’s pull also helps keep Europa’s inside warm.'),
    facts: [
      L('Dışarıdan buz dünyası gibi görünür, içeride okyanus olabilir.', 'From outside it looks like an ice world; inside there may be an ocean.'),
      L('Bir gökcismi, yüzeyinden tamamen farklı bir iç yapıya sahip olabilir.', 'A body can have an inside that is fully different from its surface.'),
      L('Buz kabuğu onlarca kilometre kalın olabilir.', 'The ice shell can be tens of kilometers thick.'),
      L('Okyanus, Dünya okyanuslarından daha fazla su barındırabilir.', 'The ocean may hold more water than Earth’s oceans.'),
      L('Bu yüzden Europa, yaşam arayışında öne çıkar.', 'That is why Europa stands out in the search for life.'),
    ],
    hostBodyId: 'jupiter',
    relatedBodyIds: ['jupiter'],
    durationMs: 16_000,
    weight: 4,
    kind: 'moon',
  },
  {
    id: 'solar-flare',
    title: L('Güneş patlaması', 'Solar flare'),
    shortName: L('Patlama', 'Flare'),
    lead: L('Güneş’in manyetik alanında ani bir enerji boşalması parlak bir patlama yapar.', 'A sudden energy burst in the Sun’s magnetic field makes a bright flare.'),
    see: L('Güneş yüzeyinde parlak bir halka ve kısa süreli ışıma artışı.', 'A bright ring on the Sun’s surface and a short rise in glow.'),
    why: L('Manyetik alan çizgileri kopup yeniden bağlanınca enerji ışık olarak çıkar.', 'When magnetic field lines snap and join again, the energy comes out as light.'),
    facts: [
      L('Patlama radyo iletişimini ve uyduları etkileyebilir.', 'A flare can affect radio and satellites.'),
      L('Aynı enerji, Dünya’da kutup ışıklarını da tetikleyebilir.', 'The same energy can also trigger auroras on Earth.'),
      L('Bu, Güneş’in yok olması değildir; küçük bir bölgede ani ışıma olur.', 'This is not the Sun dying; a small region suddenly glows.'),
      L('Patlamalar Güneş lekelerinin yakınında daha sık görülür.', 'Flares are seen more often near sunspots.'),
      L('Işık Dünya’ya yaklaşık 8 dakikada gelir.', 'The light reaches Earth in about 8 minutes.'),
    ],
    wrong: L('Patlama Güneş’in patlayıp yok olması değildir. Küçük bir bölgede ani bir ışıma olur.', 'A flare is not the Sun exploding and vanishing. A small region suddenly glows.'),
    hostBodyId: 'sun',
    relatedBodyIds: ['sun'],
    durationMs: 12_000,
    weight: 5,
    kind: 'solar',
  },
  {
    id: 'cme-aurora',
    title: L('Güneş rüzgârı ve aurora', 'Solar wind and aurora'),
    shortName: L('Aurora', 'Aurora'),
    lead: L('Güneş’ten kopan plazma bulutu Dünya’nın manyetik alanıyla karşılaşınca kutuplar ışır.', 'When a plasma cloud from the Sun meets Earth’s magnetic field, the poles glow.'),
    see: L('Önce Güneş’ten Dünya’ya giden yumuşak bir puf; sonra kutuplarda yeşil ve kırmızı kuşak.', 'First a soft puff from the Sun toward Earth; then green and red bands at the poles.'),
    why: L('Yüklü parçacıklar atmosferdeki gazları ışıldatır. Yeşil çoğu zaman oksijendir.', 'Charged particles make gases in the air glow. Green is often oxygen.'),
    facts: [
      L('Aurora, Güneş ile Dünya’nın bağlantısını gösterir.', 'Aurora shows the link between the Sun and Earth.'),
      L('Kuşaklar manyetik kutuplara yakındır; eksen eğikliği bunu kaydırır.', 'The bands are near the magnetic poles; the tilt shifts this.'),
      L('Kuzeyde kutup ışığı, güneyde de benzer bir ışık olur.', 'There is aurora in the north, and a similar light in the south.'),
      L('Güçlü fırtınada aurora daha alçak enlemlerde de görülebilir.', 'In a strong storm, aurora can also be seen at lower latitudes.'),
      L('Parçacıklar ışıktan yavaştır; puf önce yola çıkar, ışık sonra yanar.', 'The particles are slower than light; the puff leaves first, then the light turns on.'),
    ],
    hostBodyId: 'earth',
    relatedBodyIds: ['sun', 'earth'],
    durationMs: 20_000,
    weight: 5,
    kind: 'solar',
  },
  {
    id: 'jupiter-grs',
    title: L('Büyük Kırmızı Leke', 'Great Red Spot'),
    shortName: L('Leke', 'Spot'),
    lead: L('Jüpiter’de Dünya’dan büyük bir fırtına yüzyıllardır dönüyor.', 'A storm bigger than Earth has been spinning on Jupiter for centuries.'),
    see: L('Jüpiter’in dönen yüzeyinde kızıl-turuncu oval; gezegenle birlikte döner.', 'A red-orange oval on Jupiter’s spinning surface; it turns with the planet.'),
    why: L('Gaz devinde rüzgârlar uzun süre dağılmaz; girdap yıllarca yaşar.', 'On a gas giant, winds do not break up quickly; a swirl can live for years.'),
    facts: [
      L('Leke, Jüpiter’in atmosferindeki dev bir girdaptır.', 'The spot is a giant swirl in Jupiter’s atmosphere.'),
      L('Jüpiter yaklaşık 10 saatte bir tur atar; leke bu dönüşle hareket eder.', 'Jupiter takes about 10 hours for one spin; the spot moves with that spin.'),
      L('Fırtına Dünya’dan geniştir.', 'The storm is wider than Earth.'),
      L('Renk, atmosferdeki kimyasallardan gelir.', 'The color comes from chemicals in the atmosphere.'),
      L('Leke zamanla küçülüp büyüyebilir ama yüzyıllardır oradadır.', 'The spot can shrink and grow over time, but it has been there for centuries.'),
    ],
    hostBodyId: 'jupiter',
    relatedBodyIds: ['jupiter'],
    durationMs: 18_000,
    weight: 5,
    kind: 'atmosphere',
  },
  {
    id: 'mars-dust',
    title: L('Mars toz fırtınası', 'Mars dust storm'),
    shortName: L('Toz', 'Dust'),
    lead: L('Mars’ta yerel bir toz fırtınası büyüyüp gezegenin çoğunu kaplayabilir.', 'A local dust storm on Mars can grow and cover most of the planet.'),
    see: L('Mars’ın atmosfer kabuğu okraya döner; yüzey biraz kararır.', 'Mars’s air shell turns ochre; the surface gets a bit darker.'),
    why: L('İnce hava ve kuru toz, rüzgârla kolay kalkar; Güneş ışığı yüzeye daha az iner.', 'Thin air and dry dust lift easily in the wind; less sunlight reaches the surface.'),
    facts: [
      L('Toz, Güneş ışığının yüzeye ulaşmasını azaltır.', 'Dust cuts how much sunlight reaches the surface.'),
      L('Gezegen kırmızıdan tozlu turuncu-kahverengiye dönebilir.', 'The planet can turn from red to dusty orange-brown.'),
      L('Bazı fırtınalar yerel kalır; bazıları neredeyse tüm gezegeni örter.', 'Some storms stay local; some cover almost the whole planet.'),
      L('İnce atmosfer, tozu uzun süre havada tutabilir.', 'The thin air can hold dust up for a long time.'),
      L('Gündüz gökyüzü tozdan daha sarı-kahverengi görünebilir.', 'The daytime sky can look more yellow-brown from the dust.'),
    ],
    hostBodyId: 'mars',
    relatedBodyIds: ['mars'],
    durationMs: 18_000,
    weight: 4,
    kind: 'atmosphere',
  },
  {
    id: 'saturn-rings',
    title: L('Satürn halkalarında dalga', 'Wave in Saturn’s rings'),
    shortName: L('Halka', 'Ring'),
    lead: L('Satürn’ün halkaları düzgün bir disk değil; uydular dalga ve kıvrım oluşturur.', 'Saturn’s rings are not a smooth disk; moons make waves and bends.'),
    see: L('Satürn’ün eğik halka düzleminde dönen parlak bir yoğunluk dalgası.', 'A bright density wave turning in Saturn’s tilted ring plane.'),
    why: L('Uydu çekimi halkaları sürekli biçimlendirir; boşluk ve dalga oluşur.', 'Moon gravity keeps shaping the rings; gaps and waves form.'),
    facts: [
      L('Halkalar buz ve kaya parçalarından oluşur.', 'The rings are bits of ice and rock.'),
      L('Halkalar Satürn’ün ekvatoruna yakındır; eksen eğikliği halkaları da eğer.', 'The rings sit near Saturn’s equator; the tilt bends the rings too.'),
      L('Boşluklar rastgele değil; uyduların çekimiyle açılır.', 'The gaps are not random; moon gravity opens them.'),
      L('Halkalar gezegen kadar kalın değildir; ince bir disktir.', 'The rings are not as thick as the planet; they are a thin disk.'),
      L('Yakından bakınca düzgün bir şerit değil, birçok ince halka görülür.', 'Up close it is not one smooth band; many thin rings are seen.'),
    ],
    hostBodyId: 'saturn',
    relatedBodyIds: ['saturn'],
    durationMs: 16_000,
    weight: 4,
    kind: 'atmosphere',
  },
  {
    id: 'meteor-shower',
    title: L('Meteor yağmuru', 'Meteor shower'),
    shortName: L('Meteor', 'Meteor'),
    lead: L('Dünya, kuyrukluyıldız tozunun içinden geçince atmosferde kısa ışıklı çizgiler oluşur.', 'When Earth goes through comet dust, short bright lines form in the air.'),
    see: L('Dünya’nın çevresinde kısa, parlak çizgiler: havada yanan toz taneleri.', 'Short bright lines around Earth: dust grains burning in the air.'),
    why: L('Küçük parçacıklar havaya sürtünce ısınır ve ışır. Yıldız düşmez.', 'Tiny bits heat and glow when they rub the air. A star does not fall.'),
    facts: [
      L('Meteor, uzay taşı değil: havada yanan küçük bir parçacıktır.', 'A meteor is not a space rock: it is a tiny bit burning in the air.'),
      L('Perseid ve Geminid gibi yağmurlar her yıl yaklaşık aynı tarihte gelir.', 'Showers like the Perseids and Geminids come at about the same date each year.'),
      L('Yere düşerse adı meteorit olur; çoğu gökyüzünde yok olur.', 'If it hits the ground it is a meteorite; most vanish in the sky.'),
      L('Çizgiler aynı noktadan geliyor gibi görünür; buna yağmurun geldiği nokta denir.', 'The lines look like they come from one point; that is called the shower’s radiant.'),
      L('Toz, eski kuyrukluyıldız yörüngesinden kalır.', 'The dust is left from an old comet path.'),
    ],
    wrong: L('Yıldızlar düşmez. Görünen çizgi, atmosferde yanan tozdur.', 'Stars do not fall. The line you see is dust burning in the air.'),
    hostBodyId: 'earth',
    relatedBodyIds: ['earth'],
    durationMs: 12_000,
    weight: 5,
    kind: 'atmosphere',
  },
  {
    id: 'venus-haze',
    title: L('Venüs’ün kalın pusu', 'Venus’s thick haze'),
    shortName: L('Venüs pusu', 'Venus haze'),
    lead: L('Venüs, kalın bir asit bulutuyla örtülüdür; yüzey teleskoptan görünmez.', 'Venus is covered by a thick acid cloud; the surface is not seen with a telescope.'),
    see: L('Venüs’ün çevresinde parlak sarımsı kalın bir kabuk. Gezegenin kendisi pusun içinde kalır.', 'A bright yellowish thick shell around Venus. The planet itself stays inside the haze.'),
    why: L('Kalın atmosfer Güneş ışığını tutar; yüzey çok ısınır.', 'The thick air holds sunlight; the surface gets very hot.'),
    facts: [
      L('Venüs, Güneş’e ikinci gezegendir ama yüzey sıcaklığı Merkür’den yüksektir.', 'Venus is the second planet from the Sun, but its surface is hotter than Mercury.'),
      L('Pus, çoğunlukla sülfürik asit damlacıklarıdır.', 'The haze is mostly sulfuric acid droplets.'),
      L('Yüzey ancak radar veya iniş araçlarıyla görülmüştür.', 'The surface has been seen only with radar or landers.'),
      L('Kalın hava, bir battaniye gibi ısıyı kaçırmaz.', 'The thick air is like a blanket; heat cannot escape.'),
      L('Venüs, Dünya’ya boyutça yakındır; hava onu çok farklı kılar.', 'Venus is close to Earth in size; the air makes it very different.'),
    ],
    wrong: L('Venüs Güneş’e yakın diye en sıcak değildir yalnızca. Asıl sebep kalın havadır.', 'Venus is not hottest only because it is close to the Sun. The main reason is the thick air.'),
    hostBodyId: 'venus',
    relatedBodyIds: ['venus', 'sun'],
    durationMs: 16_000,
    weight: 4,
    kind: 'atmosphere',
  },
  {
    id: 'uranus-tilt',
    title: L('Yatan Uranüs', 'Tilted Uranus'),
    shortName: L('Yatan Uranüs', 'Tilted Uranus'),
    lead: L('Uranüs neredeyse yan yatmış döner; ekvatoru diğer gezegenler gibi dik durmaz.', 'Uranus almost spins on its side; its equator does not stand like the other planets.'),
    see: L('Uranüs’te yatık parlak bir ekvator bandı. Satürn’ün halkası gibi dik değil, yatırılmış durur.', 'A tilted bright equator band on Uranus. It is not upright like Saturn’s ring; it lies on its side.'),
    why: L('Eksen eğikliği yaklaşık 98 derecedir. Mevsimler çok uzundur; kutuplar uzun süre Güneş görür.', 'The tilt is about 98 degrees. Seasons are very long; the poles see the Sun for a long time.'),
    facts: [
      L('Çoğu gezegen hafif eğiktir; Uranüs neredeyse yuvarlanmıştır.', 'Most planets tilt a little; Uranus is almost rolled over.'),
      L('Bu yatış, eski bir çarpışmayla açıklanır.', 'This lie-down is explained by an old crash.'),
      L('Halkaları da ekvatorla birlikte yatıktır.', 'Its rings lie with the equator too.'),
      L('Bir kutupta yaz onlarca yıl sürebilir.', 'Summer at one pole can last for decades.'),
      L('Satürn ile yan yana bakınca eğik farkı kolay görünür.', 'Side by side with Saturn, the tilt difference is easy to see.'),
    ],
    hostBodyId: 'uranus',
    relatedBodyIds: ['uranus'],
    durationMs: 16_000,
    weight: 4,
    kind: 'atmosphere',
  },
  {
    id: 'neptune-spot',
    title: L('Neptün’de koyu leke', 'Dark spot on Neptune'),
    shortName: L('Neptün lekesi', 'Neptune spot'),
    lead: L('Neptün’de çok hızlı rüzgârlar ve koyu fırtına lekeleri görülür.', 'Very fast winds and dark storm spots are seen on Neptune.'),
    see: L('Neptün’ün mavi yüzeyinde koyu bir oval; gezegenle birlikte döner.', 'A dark oval on Neptune’s blue surface; it turns with the planet.'),
    why: L('Uzak ve soğuk olsa da atmosferi durgun değildir; rüzgârlar saatte yüzlerce kilometreyi bulur.', 'Even though it is far and cold, its air is not still; winds can reach hundreds of kilometers an hour.'),
    facts: [
      L('Neptün, Güneş’ten en uzak gezegendir (cüce gezegenler sayılmaz).', 'Neptune is the farthest planet from the Sun (dwarf planets do not count).'),
      L('Koyu leke, Jüpiter’deki kırmızı lekeye benzer bir fırtınadır.', 'The dark spot is a storm like Jupiter’s red spot.'),
      L('Lekeler yıllar içinde belirip kaybolabilir.', 'Spots can appear and vanish over the years.'),
      L('Mavi renk, atmosferdeki metandan gelir.', 'The blue color comes from methane in the air.'),
      L('Güneş az ısıtır; yine de iç ısı rüzgârları besler.', 'The Sun heats it little; inner heat still feeds the winds.'),
    ],
    hostBodyId: 'neptune',
    relatedBodyIds: ['neptune'],
    durationMs: 16_000,
    weight: 4,
    kind: 'atmosphere',
  },
  {
    id: 'comet-tail',
    title: L('Kuyruklu yıldız', 'Comet'),
    shortName: L('Kuyruklu', 'Comet'),
    lead: L('Güneş’e yaklaşan buzlu cismin tozu ve gazı, Güneş’ten uzağa kuyruk çizer.', 'Dust and gas from an icy body near the Sun draw a tail away from the Sun.'),
    see: L('Güneş yakınında parlak bir baş ve Güneş’ten uzaklaşan ince kuyruk.', 'A bright head near the Sun and a thin tail pointing away from the Sun.'),
    why: L('Güneş ısıtır; buz buharlaşır. Rüzgâr ve ışık, kuyruğu Güneş’ten öteye iter.', 'The Sun heats it; ice turns to vapor. Wind and light push the tail away from the Sun.'),
    facts: [
      L('Kuyruk her zaman Güneş’ten uzağa bakar; gidiş yönüne değil.', 'The tail always points away from the Sun; not behind the path.'),
      L('Kuyruklu yıldız bir yıldız değildir; kirli bir kartopu gibidir.', 'A comet is not a star; it is like a dirty snowball.'),
      L('Dünya bu tozun içinden geçince meteor yağmuru olabilir.', 'When Earth goes through this dust, a meteor shower can happen.'),
      L('İki kuyruk görülebilir: toz ve iyon.', 'Two tails can be seen: dust and ion.'),
      L('Güneş’ten uzaklaşınca kuyruk zayıflar.', 'The tail gets weaker as it moves away from the Sun.'),
    ],
    wrong: L('Kuyruk, cismin arkasında sürüklenen bir ip değildir. Güneş iter; yön Güneş’e göredir.', 'The tail is not a rope dragging behind the body. The Sun pushes it; the direction is from the Sun.'),
    hostBodyId: 'sun',
    relatedBodyIds: ['sun'],
    durationMs: 16_000,
    weight: 4,
    kind: 'solar',
  },
  {
    id: 'supernova',
    title: L('Süpernova', 'Supernova'),
    shortName: L('Süpernova', 'Supernova'),
    lead: L('Büyük bir yıldız yaşamının sonunda muazzam bir patlamayla dağılabilir.', 'A big star can blow apart in a huge explosion at the end of its life.'),
    see: L('Uzak gökyüzünde kısa bir parlama ve yavaş genişleyen soluk bir kabuk.', 'A short flash in the far sky and a faint shell slowly growing.'),
    why: L('Yıldızın çekirdeği yakıtı bitince çöker; dış katmanlar savrulur.', 'When the star’s core runs out of fuel it collapses; the outer layers fly out.'),
    facts: [
      L('Patlama, demir ve oksijen gibi ağır elementleri uzaya savurur.', 'The explosion throws heavy elements like iron and oxygen into space.'),
      L('Bizim vücudumuzdaki bazı elementler de eski yıldız patlamalarından gelir.', 'Some elements in our bodies also come from old star explosions.'),
      L('Süpernova, yakındaki gezegenleri yok eder; Güneş Sistemi’nde şu an böyle bir olay yok.', 'A supernova would destroy nearby planets; there is no such event in the Solar System now.'),
      L('Güneş bu kadar büyük olmadığı için böyle patlamayacaktır.', 'The Sun is not that big, so it will not explode this way.'),
      L('Parlama, kısa süre bir gökadadaki tüm yıldızları geçebilir.', 'The flash can briefly outshine all the stars in a galaxy.'),
    ],
    hostBodyId: null,
    relatedBodyIds: [],
    durationMs: 16_000,
    weight: 3,
    kind: 'sky',
  },
  {
    id: 'ns-merger',
    title: L('Nötron yıldızı birleşmesi', 'Neutron star merger'),
    shortName: L('Birleşme', 'Merger'),
    lead: L('İki nötron yıldızı birbirine yaklaşır, birleşir ve kütleçekim dalgası üretebilir.', 'Two neutron stars come close, merge, and can make a gravity wave.'),
    see: L('İki küçük nokta yavaş spiral çizerek birleşir; sonra soluk bir halka yayılır.', 'Two small dots slowly spiral and merge; then a faint ring spreads.'),
    why: L('Çok yoğun iki çekirdek birbirini çeker, spiralleşir, çarpışır.', 'Two very dense cores pull each other, spiral, and crash.'),
    facts: [
      L('Nötron yıldızı, süpernova sonrası kalan çok yoğun bir çekirdektir.', 'A neutron star is a very dense core left after a supernova.'),
      L('Birleşme, altın gibi ağır elementlerin oluşumunda da rol oynar.', 'A merger also helps make heavy elements like gold.'),
      L('Kütleçekim dalgası uzayı esnetir; Dünya’da özel detektörlerle ölçülmüştür.', 'A gravity wave stretches space; it has been measured on Earth with special detectors.'),
      L('Bir çay kaşığı maddesi milyarlarca ton gelebilir.', 'A teaspoon of its matter can weigh billions of tons.'),
      L('Işık ve dalga neredeyse birlikte gelir; bu da hızlarını karşılaştırmayı sağlar.', 'Light and the wave arrive almost together; that lets us compare their speeds.'),
    ],
    hostBodyId: null,
    relatedBodyIds: [],
    durationMs: 18_000,
    weight: 3,
    kind: 'sky',
  },
  {
    id: 'black-hole',
    title: L('Kara delik oluşumu', 'Black hole forming'),
    shortName: L('Kara delik', 'Black hole'),
    lead: L('Çok büyük bir yıldızın çekirdeği çökerse ışığın bile kaçamadığı bir kara delik oluşabilir.', 'If a very big star’s core collapses, a black hole can form that even light cannot leave.'),
    see: L('Uzak bir yıldız küçülür; karanlık bir disk ve çevresinde soluk bir halka kalır.', 'A far star shrinks; a dark disk and a faint ring around it remain.'),
    why: L('Çekim o kadar güçlenir ki, belli bir sınırın içinden ışık geri dönemez.', 'Gravity gets so strong that light cannot come back from inside a certain limit.'),
    facts: [
      L('Olay ufku, ışığın geri dönemediği sınırdır.', 'The event horizon is the limit light cannot come back from.'),
      L('Kara delik sınırının dışında uzay normal davranır.', 'Outside the black hole’s limit, space behaves normally.'),
      L('Oluşum, Güneş Sistemi’nde değil; çok büyük yıldızların hayatının sonundadır.', 'This forming is not in the Solar System; it is at the end of very big stars’ lives.'),
      L('Güneş bir kara delik olacak kadar büyük değildir.', 'The Sun is not big enough to become a black hole.'),
      L('Etrafta dönen madde ısınır ve halka gibi parlar.', 'Matter going around it heats up and glows like a ring.'),
    ],
    wrong: L('Kara delik her şeyi süpürmez. Yalnızca olay ufkunun içinden ışık kaçamaz.', 'A black hole does not sweep up everything. Only light inside the event horizon cannot escape.'),
    hostBodyId: null,
    relatedBodyIds: [],
    durationMs: 16_000,
    weight: 3,
    kind: 'sky',
  },
]

const BY_ID = new Map(ASTRO_EVENTS.map((event) => [event.id, event]))

export function utcNoonMs(year: number, month: number, day: number): number {
  return Date.UTC(year, month - 1, day, 12, 0, 0)
}

export function eventStatusAt(targetMs: number | undefined, atMs: number): EventStatus {
  if (targetMs == null) return 'now'
  return targetMs > atMs ? 'upcoming' : 'happened'
}

export function statusAt(event: { targetMs?: number }, atMs: number): EventStatus {
  return eventStatusAt(event.targetMs, atMs)
}

/** Kart: tarihsiz olgu Şimdi; geçmiş Oldu; gelecek Yakında; atlanan gelecekte Şimdi. */
export function displayEventStatus(targetMs: number | undefined, simMs: number, nowMs: number): EventStatus {
  if (targetMs == null) return 'now'
  if (targetMs <= nowMs) return 'happened'
  if (simMs >= targetMs) return 'now'
  return 'upcoming'
}

export interface DatedEclipse {
  id: string
  visualId: 'solar-eclipse'
  title: LocText
  shortName: LocText
  dateLabel: LocText
  text: LocText
  targetMs: number
}

export const DATED_ECLIPSES: readonly DatedEclipse[] = [
  {
    id: 'eclipse-2026-aug-12',
    visualId: 'solar-eclipse',
    title: L('12 Ağustos 2026 tutulması', '12 August 2026 eclipse'),
    shortName: L('Tutulma', 'Eclipse'),
    dateLabel: L('12 Ağustos 2026', '12 August 2026'),
    text: L('Tam tutulma — Kuzey Kutbu, Grönland, İspanya', 'Total eclipse — North Pole, Greenland, Spain'),
    targetMs: utcNoonMs(2026, 8, 12),
  },
  {
    id: 'eclipse-2027-aug-02',
    visualId: 'solar-eclipse',
    title: L('2 Ağustos 2027 tutulması', '2 August 2027 eclipse'),
    shortName: L('Tutulma', 'Eclipse'),
    dateLabel: L('2 Ağustos 2027', '2 August 2027'),
    text: L('Tam tutulma — İspanya, Kuzey Afrika, Mısır', 'Total eclipse — Spain, North Africa, Egypt'),
    targetMs: utcNoonMs(2027, 8, 2),
  },
  {
    id: 'eclipse-2028-jan-26',
    visualId: 'solar-eclipse',
    title: L('26 Ocak 2028 halkalı tutulması', '26 January 2028 annular eclipse'),
    shortName: L('Halka', 'Ring'),
    dateLabel: L('26 Ocak 2028', '26 January 2028'),
    text: L('Halkalı tutulma — Ay Güneş’i tam kapatamaz', 'Annular eclipse — the Moon cannot cover the Sun fully'),
    targetMs: utcNoonMs(2028, 1, 26),
  },
  {
    id: 'eclipse-2028-jul-22',
    visualId: 'solar-eclipse',
    title: L('22 Temmuz 2028 tutulması', '22 July 2028 eclipse'),
    shortName: L('Tutulma', 'Eclipse'),
    dateLabel: L('22 Temmuz 2028', '22 July 2028'),
    text: L('Tam tutulma — Avustralya ve Yeni Zelanda', 'Total eclipse — Australia and New Zealand'),
    targetMs: utcNoonMs(2028, 7, 22),
  },
  {
    id: 'eclipse-2030-jun-01',
    visualId: 'solar-eclipse',
    title: L('1 Haziran 2030 Türkiye tutulması', '1 June 2030 Turkey eclipse'),
    shortName: L('Türkiye', 'Turkey'),
    dateLabel: L('1 Haziran 2030', '1 June 2030'),
    text: L('Halkalı tutulma — hat Türkiye’den de geçer', 'Annular eclipse — the path also crosses Turkey'),
    targetMs: utcNoonMs(2030, 6, 1),
  },
  {
    id: 'eclipse-2030-nov-25',
    visualId: 'solar-eclipse',
    title: L('25 Kasım 2030 tutulması', '25 November 2030 eclipse'),
    shortName: L('Tutulma', 'Eclipse'),
    dateLabel: L('25 Kasım 2030', '25 November 2030'),
    text: L('Tam tutulma — güney Afrika ve Avustralya', 'Total eclipse — southern Africa and Australia'),
    targetMs: utcNoonMs(2030, 11, 25),
  },
  {
    id: 'eclipse-2033-mar-30',
    visualId: 'solar-eclipse',
    title: L('30 Mart 2033 tutulması', '30 March 2033 eclipse'),
    shortName: L('Tutulma', 'Eclipse'),
    dateLabel: L('30 Mart 2033', '30 March 2033'),
    text: L('Tam tutulma — yaklaşık 2 dk 37 sn', 'Total eclipse — about 2 min 37 s'),
    targetMs: utcNoonMs(2033, 3, 30),
  },
  {
    id: 'eclipse-2034-mar-20',
    visualId: 'solar-eclipse',
    title: L('20 Mart 2034 tutulması', '20 March 2034 eclipse'),
    shortName: L('Tutulma', 'Eclipse'),
    dateLabel: L('20 Mart 2034', '20 March 2034'),
    text: L('Tam tutulma — yaklaşık 4 dk 09 sn', 'Total eclipse — about 4 min 09 s'),
    targetMs: utcNoonMs(2034, 3, 20),
  },
  {
    id: 'eclipse-2035-sep-02',
    visualId: 'solar-eclipse',
    title: L('2 Eylül 2035 tutulması', '2 September 2035 eclipse'),
    shortName: L('Tutulma', 'Eclipse'),
    dateLabel: L('2 Eylül 2035', '2 September 2035'),
    text: L('Tam tutulma — yaklaşık 2 dk 54 sn', 'Total eclipse — about 2 min 54 s'),
    targetMs: utcNoonMs(2035, 9, 2),
  },
  {
    id: 'eclipse-2037-jul-13',
    visualId: 'solar-eclipse',
    title: L('13 Temmuz 2037 tutulması', '13 July 2037 eclipse'),
    shortName: L('Tutulma', 'Eclipse'),
    dateLabel: L('13 Temmuz 2037', '13 July 2037'),
    text: L('Tam tutulma — yaklaşık 3 dk 58 sn', 'Total eclipse — about 3 min 58 s'),
    targetMs: utcNoonMs(2037, 7, 13),
  },
  {
    id: 'eclipse-2044-aug-23',
    visualId: 'solar-eclipse',
    title: L('23 Ağustos 2044 tutulması', '23 August 2044 eclipse'),
    shortName: L('Tutulma', 'Eclipse'),
    dateLabel: L('23 Ağustos 2044', '23 August 2044'),
    text: L('Tam tutulma — Kuzey Amerika (Montana, Kuzey Dakota)', 'Total eclipse — North America (Montana, North Dakota)'),
    targetMs: utcNoonMs(2044, 8, 23),
  },
]

export interface SelectableEvent extends Omit<AstroEvent, 'id'> {
  id: string
  visualId: AstroEventId
  targetMs?: number
  dateLabel?: LocText
  where?: LocText
}

export function getAstroEvent(id: string | null | undefined): AstroEvent | undefined {
  if (!id) return undefined
  return BY_ID.get(id as AstroEventId)
}

export function getSelectableEvent(id: string | null | undefined): SelectableEvent | undefined {
  if (!id) return undefined
  const dated = DATED_ECLIPSES.find((item) => item.id === id)
  if (dated) {
    const base = getAstroEvent(dated.visualId)
    if (!base) return undefined
    return {
      ...base,
      id: dated.id,
      visualId: dated.visualId,
      title: dated.title,
      shortName: dated.shortName,
      targetMs: dated.targetMs,
      dateLabel: dated.dateLabel,
      where: dated.text,
    }
  }
  const event = getAstroEvent(id)
  if (!event) return undefined
  return { ...event, visualId: event.id }
}

export function eventHasMore(event: {
  facts: readonly unknown[]
  why?: unknown
  wrong?: unknown
  upcoming?: readonly unknown[]
  relatedBodyIds?: readonly string[]
}): boolean {
  return (
    event.facts.length > 2 ||
    Boolean(event.why) ||
    Boolean(event.wrong) ||
    Boolean(event.upcoming && event.upcoming.length > 0) ||
    Boolean(event.relatedBodyIds && event.relatedBodyIds.length > 0)
  )
}

export function eventsForDrawer(atMs: number): {
  now: readonly AstroEvent[]
  upcoming: readonly DatedEclipse[]
  happened: readonly DatedEclipse[]
} {
  const featured = 'eclipse-2030-jun-01'
  const upcoming = DATED_ECLIPSES.filter((item) => item.targetMs > atMs).slice()
  upcoming.sort((a, b) => {
    if (a.id === featured) return -1
    if (b.id === featured) return 1
    return a.targetMs - b.targetMs
  })
  return {
    now: ASTRO_EVENTS,
    upcoming,
    happened: DATED_ECLIPSES.filter((item) => item.targetMs <= atMs).slice().sort((a, b) => b.targetMs - a.targetMs),
  }
}

export function astroEventIds(): AstroEventId[] {
  return ASTRO_EVENTS.map((event) => event.id)
}
