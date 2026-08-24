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
  date: string
  text: string
}

export type EventStatus = 'now' | 'upcoming' | 'happened'

export const EVENT_STATUS_LABEL: Record<EventStatus, string> = {
  now: 'Şimdi',
  upcoming: 'Yakında',
  happened: 'Oldu',
}

export interface AstroEvent {
  id: AstroEventId
  title: string
  shortName: string
  lead: string
  see: string
  why: string
  facts: string[]
  wrong?: string
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
    title: 'Tam Güneş tutulması',
    shortName: 'Tutulma',
    lead: 'Ay, Güneş ile Dünya’nın arasına girer. Ay’ın gölgesi Dünya’nın üzerine düşer.',
    see: 'Dünya’nın Güneş’e bakan yüzünde koyu bir leke. İnce bir çizgi Güneş, Ay ve Dünya’yı bağlar. Gezegen tamamen karanlık olmaz.',
    why: 'Üç cisim aynı hizaya gelince Ay, Güneş ışığının bir kısmını keser.',
    facts: [
      'Hiza: Güneş – Ay – Dünya.',
      'Güneş tamamen kapanınca korona görünür: Güneş’in dış atmosferi.',
      'Tutulmalar rastgele değil; yörüngeler hesaplanabildiği için tarihleri önceden bilinir.',
      'Ay’ın gölgesi Dünya üzerinde dar bir şerit çizer; her yerde tam tutulma görülmez.',
      'Halkalı tutulmada Ay Güneş’i tam kapatamaz; kenarda parlak bir halka kalır.',
    ],
    wrong: 'Tutulma Güneş’in sönmesi değildir. Ay yalnızca Güneş’i bir süre örter; sonra Güneş yine oradadır.',
    hostBodyId: 'earth',
    relatedBodyIds: ['sun', 'earth', 'moon'],
    durationMs: 16_000,
    weight: 5,
    kind: 'eclipse',
    upcoming: [
      { date: '2 Ağustos 2027', text: 'Tam tutulma — İspanya, Kuzey Afrika, Mısır' },
      { date: '26 Ocak 2028', text: 'Halkalı tutulma — Ay Güneş’i tam kapatamaz' },
      { date: '22 Temmuz 2028', text: 'Tam tutulma — Avustralya ve Yeni Zelanda' },
      { date: '1 Haziran 2030', text: 'Halkalı tutulma — hat Türkiye’den de geçer' },
      { date: '25 Kasım 2030', text: 'Tam tutulma — güney Afrika ve Avustralya' },
      { date: '30 Mart 2033', text: 'Tam tutulma — yaklaşık 2 dk 37 sn' },
      { date: '20 Mart 2034', text: 'Tam tutulma — yaklaşık 4 dk 09 sn' },
      { date: '2 Eylül 2035', text: 'Tam tutulma — yaklaşık 2 dk 54 sn' },
      { date: '13 Temmuz 2037', text: 'Tam tutulma — yaklaşık 3 dk 58 sn' },
      { date: '23 Ağustos 2044', text: 'Tam tutulma — Kuzey Amerika (Montana, Kuzey Dakota)' },
    ],
  },
  {
    id: 'lunar-eclipse',
    title: 'Ay tutulması',
    shortName: 'Ay tutulması',
    lead: 'Dünya, Güneş ile Ay’ın arasına girince Ay’ın üzerine gölge düşer.',
    see: 'Ay’ın Güneş’e bakan yüzünde kırmızımsı koyu bir leke. Ay kaybolmaz; kızarır.',
    why: 'Hiza bu kez Güneş – Dünya – Ay’dır. Dünya’nın gölgesi Ay’ı örter.',
    facts: [
      'Güneş tutulmasının ters hizasıdır.',
      'Ay bazen bakır kırmızısı görünür; buna “kanlı Ay” denir.',
      'Kırmızı, Dünya atmosferinden geçen Güneş ışığının kırılmasından gelir.',
      'Ay tutulması, gece Dünya’nın büyük kısmından görülebilir.',
      'Ay yörüngesi biraz eğik olduğu için her dolunayda tutulma olmaz.',
    ],
    wrong: 'Ay tutulunca Ay yok olmaz. Dünya’nın gölgesi üzerine düşer; sonra çıkar.',
    hostBodyId: 'moon',
    relatedBodyIds: ['sun', 'earth', 'moon'],
    durationMs: 16_000,
    weight: 5,
    kind: 'eclipse',
  },
  {
    id: 'jupiter-moon-shadow',
    title: 'Jüpiter’de uydu gölgesi',
    shortName: 'Gölge',
    lead: 'Bir uydu Jüpiter’in önünden geçince gölgesi gezegenin üzerine düşer.',
    see: 'Jüpiter’in ekvatorunda küçük bir uydu ve gezegen üzerinde yürüyen koyu oval.',
    why: 'Güneş – uydu – Jüpiter aynı hizaya gelince gölge düşer. Tutulma yalnızca Dünya’da olmaz.',
    facts: [
      'Jüpiter’in büyük uyduları gezegenin üzerinde karanlık bir leke gezdirir.',
      'Bu, Güneş – uydu – Jüpiter hizasının sonucudur.',
      'Uydu ekvator düzleminde dolanır; gölge de o hatta yürür.',
      'Teleskopla bakınca leke, uydunun kendisinden önce fark edilebilir.',
      'Aynı fikir Dünya’daki Güneş tutulmasıyla aynıdır: öndeki cisim ışığı keser.',
    ],
    hostBodyId: 'jupiter',
    relatedBodyIds: ['jupiter', 'sun'],
    durationMs: 14_000,
    weight: 4,
    kind: 'moon',
  },
  {
    id: 'io-volcano',
    title: 'Io’da volkan',
    shortName: 'Volkan',
    lead: 'Jüpiter’in uydusu Io, Güneş Sistemi’nin en volkanik dünyalarındandır.',
    see: 'Jüpiter’in ekvatorunda sarımsı Io; yüzeyinden yavaş yükselen sıcak bir püskürme.',
    why: 'Jüpiter’in çekimi Io’nun içini gerer; içerisi ısınır ve volkan çıkar.',
    facts: [
      'Bağlantı: çekim → iç ısınma → volkanizma.',
      'Io’nun yüzeyi kükürtten sarı-turuncu görünür.',
      'Püskürmeler uzaya kadar yükselebilir.',
      'Io, Dünya’dan daha fazla aktif volkana sahiptir.',
      'Isınma “gelgit ısınması”dır: cisim sıkışır, gevşer, ısınır.',
    ],
    hostBodyId: 'jupiter',
    relatedBodyIds: ['jupiter'],
    durationMs: 16_000,
    weight: 4,
    kind: 'moon',
  },
  {
    id: 'enceladus-geyser',
    title: 'Enceladus gayzerleri',
    shortName: 'Gayzer',
    lead: 'Satürn’ün buzlu uydusu Enceladus, çatlaklarından su buharı fışkırtır.',
    see: 'Satürn’ün ekvatorunda küçük buz uydusu; güneyinden ince su jeti çıkar.',
    why: 'Buzun altında sıvı su olabilir; çatlaklardan dışarı fışkırır.',
    facts: [
      'Buzlu bir dünya dışarıdan sakin görünür; içerisi hareketli olabilir.',
      'Jetler Satürn’ün halkalarına da madde taşır.',
      'Su buharı donarak ince buz taneleri olur.',
      'Bu, yaşam arayışında önemli bir ipucudur: sıvı su.',
      'Gayzerler uydunun güney kutbuna yakındır.',
    ],
    hostBodyId: 'saturn',
    relatedBodyIds: ['saturn'],
    durationMs: 14_000,
    weight: 4,
    kind: 'moon',
  },
  {
    id: 'titan-methane',
    title: 'Titan’da metan yağmuru',
    shortName: 'Yağmur',
    lead: 'Satürn’ün büyük uydusu Titan’da yağmur su değil, çoğunlukla metandır.',
    see: 'Turuncu puslu Titan, düşen yağmur çizgileri ve yüzeyde koyu göl parıltısı.',
    why: 'Titan’da metan buharlaşır, bulut olur, yağar, göllere akar: soğuk bir döngü.',
    facts: [
      'Bu, Dünya’daki su döngüsüne benzer ama çok daha soğuktur.',
      'Göller su değil, ağırlıklı olarak sıvı hidrokarbondur.',
      'Kalın turuncu pus, Titan’ın atmosferidir.',
      'Titan, kalın atmosfere sahip tek uydudur.',
      'Yüzeyde nehir yatakları ve kıyılar görülmüştür.',
    ],
    hostBodyId: 'saturn',
    relatedBodyIds: ['saturn'],
    durationMs: 18_000,
    weight: 4,
    kind: 'moon',
  },
  {
    id: 'europa-ocean',
    title: 'Europa’nın gizli okyanusu',
    shortName: 'Okyanus',
    lead: 'Europa buzla kaplıdır; buzun altında büyük bir sıvı su okyanusu olması beklenir.',
    see: 'Buz kabuğu biraz saydamlaşır; içeride mavi bir okyanus ışıması görünür. Kesit yok.',
    why: 'Jüpiter’in çekimi Europa’nın içini de sıcak tutmaya yardım eder.',
    facts: [
      'Dışarıdan buz dünyası gibi görünür, içeride okyanus olabilir.',
      'Bir gökcismi, yüzeyinden tamamen farklı bir iç yapıya sahip olabilir.',
      'Buz kabuğu onlarca kilometre kalın olabilir.',
      'Okyanus, Dünya okyanuslarından daha fazla su barındırabilir.',
      'Bu yüzden Europa, yaşam arayışında öne çıkar.',
    ],
    hostBodyId: 'jupiter',
    relatedBodyIds: ['jupiter'],
    durationMs: 16_000,
    weight: 4,
    kind: 'moon',
  },
  {
    id: 'solar-flare',
    title: 'Güneş patlaması',
    shortName: 'Patlama',
    lead: 'Güneş’in manyetik alanında ani bir enerji boşalması parlak bir patlama yapar.',
    see: 'Güneş yüzeyinde parlak bir halka ve kısa süreli ışıma artışı.',
    why: 'Manyetik alan çizgileri kopup yeniden bağlanınca enerji ışık olarak çıkar.',
    facts: [
      'Patlama radyo iletişimini ve uyduları etkileyebilir.',
      'Aynı enerji, Dünya’da kutup ışıklarını da tetikleyebilir.',
      'Bu, Güneş’in yok olması değildir; küçük bir bölgede ani ışıma olur.',
      'Patlamalar Güneş lekelerinin yakınında daha sık görülür.',
      'Işık Dünya’ya yaklaşık 8 dakikada gelir.',
    ],
    wrong: 'Patlama Güneş’in patlayıp yok olması değildir. Küçük bir bölgede ani bir ışıma olur.',
    hostBodyId: 'sun',
    relatedBodyIds: ['sun'],
    durationMs: 12_000,
    weight: 5,
    kind: 'solar',
  },
  {
    id: 'cme-aurora',
    title: 'Güneş rüzgârı ve aurora',
    shortName: 'Aurora',
    lead: 'Güneş’ten kopan plazma bulutu Dünya’nın manyetik alanıyla karşılaşınca kutuplar ışır.',
    see: 'Önce Güneş’ten Dünya’ya giden yumuşak bir puf; sonra kutuplarda yeşil ve kırmızı kuşak.',
    why: 'Yüklü parçacıklar atmosferdeki gazları ışıldatır. Yeşil çoğu zaman oksijendir.',
    facts: [
      'Aurora, Güneş ile Dünya’nın bağlantısını gösterir.',
      'Kuşaklar manyetik kutuplara yakındır; eksen eğikliği bunu kaydırır.',
      'Kuzeyde kutup ışığı, güneyde de benzer bir ışık olur.',
      'Güçlü fırtınada aurora daha alçak enlemlerde de görülebilir.',
      'Parçacıklar ışıktan yavaştır; puf önce yola çıkar, ışık sonra yanar.',
    ],
    hostBodyId: 'earth',
    relatedBodyIds: ['sun', 'earth'],
    durationMs: 20_000,
    weight: 5,
    kind: 'solar',
  },
  {
    id: 'jupiter-grs',
    title: 'Büyük Kırmızı Leke',
    shortName: 'Leke',
    lead: 'Jüpiter’de Dünya’dan büyük bir fırtına yüzyıllardır dönüyor.',
    see: 'Jüpiter’in dönen yüzeyinde kızıl-turuncu oval; gezegenle birlikte döner.',
    why: 'Gaz devinde rüzgârlar uzun süre dağılmaz; girdap yıllarca yaşar.',
    facts: [
      'Leke, Jüpiter’in atmosferindeki dev bir girdaptır.',
      'Jüpiter yaklaşık 10 saatte bir tur atar; leke bu dönüşle hareket eder.',
      'Fırtına Dünya’dan geniştir.',
      'Renk, atmosferdeki kimyasallardan gelir.',
      'Leke zamanla küçülüp büyüyebilir ama yüzyıllardır oradadır.',
    ],
    hostBodyId: 'jupiter',
    relatedBodyIds: ['jupiter'],
    durationMs: 18_000,
    weight: 5,
    kind: 'atmosphere',
  },
  {
    id: 'mars-dust',
    title: 'Mars toz fırtınası',
    shortName: 'Toz',
    lead: 'Mars’ta yerel bir toz fırtınası büyüyüp gezegenin çoğunu kaplayabilir.',
    see: 'Mars’ın atmosfer kabuğu okraya döner; yüzey biraz kararır.',
    why: 'İnce hava ve kuru toz, rüzgârla kolay kalkar; Güneş ışığı yüzeye daha az iner.',
    facts: [
      'Toz, Güneş ışığının yüzeye ulaşmasını azaltır.',
      'Gezegen kırmızıdan tozlu turuncu-kahverengiye dönebilir.',
      'Bazı fırtınalar yerel kalır; bazıları neredeyse tüm gezegeni örter.',
      'İnce atmosfer, tozu uzun süre havada tutabilir.',
      'Gündüz gökyüzü tozdan daha sarı-kahverengi görünebilir.',
    ],
    hostBodyId: 'mars',
    relatedBodyIds: ['mars'],
    durationMs: 18_000,
    weight: 4,
    kind: 'atmosphere',
  },
  {
    id: 'saturn-rings',
    title: 'Satürn halkalarında dalga',
    shortName: 'Halka',
    lead: 'Satürn’ün halkaları düzgün bir disk değil; uydular dalga ve kıvrım oluşturur.',
    see: 'Satürn’ün eğik halka düzleminde dönen parlak bir yoğunluk dalgası.',
    why: 'Uydu çekimi halkaları sürekli biçimlendirir; boşluk ve dalga oluşur.',
    facts: [
      'Halkalar buz ve kaya parçalarından oluşur.',
      'Halkalar Satürn’ün ekvatoruna yakındır; eksen eğikliği halkaları da eğer.',
      'Boşluklar rastgele değil; uyduların çekimiyle açılır.',
      'Halkalar gezegen kadar kalın değildir; ince bir disktir.',
      'Yakından bakınca düzgün bir şerit değil, birçok ince halka görülür.',
    ],
    hostBodyId: 'saturn',
    relatedBodyIds: ['saturn'],
    durationMs: 16_000,
    weight: 4,
    kind: 'atmosphere',
  },
  {
    id: 'meteor-shower',
    title: 'Meteor yağmuru',
    shortName: 'Meteor',
    lead: 'Dünya, kuyrukluyıldız tozunun içinden geçince atmosferde kısa ışıklı çizgiler oluşur.',
    see: 'Dünya’nın çevresinde kısa, parlak çizgiler: havada yanan toz taneleri.',
    why: 'Küçük parçacıklar havaya sürtünce ısınır ve ışır. Yıldız düşmez.',
    facts: [
      'Meteor, uzay taşı değil: havada yanan küçük bir parçacıktır.',
      'Perseid ve Geminid gibi yağmurlar her yıl yaklaşık aynı tarihte gelir.',
      'Yere düşerse adı meteorit olur; çoğu gökyüzünde yok olur.',
      'Çizgiler aynı noktadan geliyor gibi görünür; buna radiant denir.',
      'Toz, eski kuyrukluyıldız yörüngesinden kalır.',
    ],
    wrong: 'Yıldızlar düşmez. Görünen çizgi, atmosferde yanan tozdur.',
    hostBodyId: 'earth',
    relatedBodyIds: ['earth'],
    durationMs: 12_000,
    weight: 5,
    kind: 'atmosphere',
  },
  {
    id: 'venus-haze',
    title: 'Venüs’ün kalın pusu',
    shortName: 'Venüs pusu',
    lead: 'Venüs, kalın bir asit bulutuyla örtülüdür; yüzey teleskoptan görünmez.',
    see: 'Venüs’ün çevresinde parlak sarımsı kalın bir kabuk. Gezegenin kendisi pusun içinde kalır.',
    why: 'Kalın atmosfer Güneş ışığını tutar; yüzey çok ısınır.',
    facts: [
      'Venüs, Güneş’e ikinci gezegendir ama yüzey sıcaklığı Merkür’den yüksektir.',
      'Pus, çoğunlukla sülfürik asit damlacıklarıdır.',
      'Yüzey ancak radar veya iniş araçlarıyla görülmüştür.',
      'Kalın hava, bir battaniye gibi ısıyı kaçırmaz.',
      'Venüs, Dünya’ya boyutça yakındır; hava onu çok farklı kılar.',
    ],
    wrong: 'Venüs Güneş’e yakın diye en sıcak değildir yalnızca. Asıl sebep kalın havadır.',
    hostBodyId: 'venus',
    relatedBodyIds: ['venus', 'sun'],
    durationMs: 16_000,
    weight: 4,
    kind: 'atmosphere',
  },
  {
    id: 'uranus-tilt',
    title: 'Yatan Uranüs',
    shortName: 'Yatan Uranüs',
    lead: 'Uranüs neredeyse yan yatmış döner; ekvatoru diğer gezegenler gibi dik durmaz.',
    see: 'Uranüs’te yatık parlak bir ekvator bandı. Satürn’ün halkası gibi dik değil, yatırılmış durur.',
    why: 'Eksen eğikliği yaklaşık 98 derecedir. Mevsimler çok uzundur; kutuplar uzun süre Güneş görür.',
    facts: [
      'Çoğu gezegen hafif eğiktir; Uranüs neredeyse yuvarlanmıştır.',
      'Bu yatış, eski bir çarpışmayla açıklanır.',
      'Halkaları da ekvatorla birlikte yatıktır.',
      'Bir kutupta yaz onlarca yıl sürebilir.',
      'Satürn ile yan yana bakınca eğik farkı kolay görünür.',
    ],
    hostBodyId: 'uranus',
    relatedBodyIds: ['uranus'],
    durationMs: 16_000,
    weight: 4,
    kind: 'atmosphere',
  },
  {
    id: 'neptune-spot',
    title: 'Neptün’de koyu leke',
    shortName: 'Neptün lekesi',
    lead: 'Neptün’de çok hızlı rüzgârlar ve koyu fırtına lekeleri görülür.',
    see: 'Neptün’ün mavi yüzeyinde koyu bir oval; gezegenle birlikte döner.',
    why: 'Uzak ve soğuk olsa da atmosferi durgun değildir; rüzgârlar saatte yüzlerce kilometreyi bulur.',
    facts: [
      'Neptün, Güneş’ten en uzak gezegendir (cüce gezegenler sayılmaz).',
      'Koyu leke, Jüpiter’deki kırmızı lekeye benzer bir fırtınadır.',
      'Lekeler yıllar içinde belirip kaybolabilir.',
      'Mavi renk, atmosferdeki metandan gelir.',
      'Güneş az ısıtır; yine de iç ısı rüzgârları besler.',
    ],
    hostBodyId: 'neptune',
    relatedBodyIds: ['neptune'],
    durationMs: 16_000,
    weight: 4,
    kind: 'atmosphere',
  },
  {
    id: 'comet-tail',
    title: 'Kuyruklu yıldız',
    shortName: 'Kuyruklu',
    lead: 'Güneş’e yaklaşan buzlu cismin tozu ve gazı, Güneş’ten uzağa kuyruk çizer.',
    see: 'Güneş yakınında parlak bir baş ve Güneş’ten uzaklaşan ince kuyruk.',
    why: 'Güneş ısıtır; buz buharlaşır. Rüzgâr ve ışık, kuyruğu Güneş’ten öteye iter.',
    facts: [
      'Kuyruk her zaman Güneş’ten uzağa bakar; gidiş yönüne değil.',
      'Kuyruklu yıldız bir yıldız değildir; kirli bir kartopu gibidir.',
      'Dünya bu tozun içinden geçince meteor yağmuru olabilir.',
      'İki kuyruk görülebilir: toz ve iyon.',
      'Güneş’ten uzaklaşınca kuyruk zayıflar.',
    ],
    wrong: 'Kuyruk, cismin arkasında sürüklenen bir ip değildir. Güneş iter; yön Güneş’e göredir.',
    hostBodyId: 'sun',
    relatedBodyIds: ['sun'],
    durationMs: 16_000,
    weight: 4,
    kind: 'solar',
  },
  {
    id: 'supernova',
    title: 'Süpernova',
    shortName: 'Süpernova',
    lead: 'Büyük bir yıldız yaşamının sonunda muazzam bir patlamayla dağılabilir.',
    see: 'Uzak gökyüzünde kısa bir parlama ve yavaş genişleyen soluk bir kabuk.',
    why: 'Yıldızın çekirdeği yakıtı bitince çöker; dış katmanlar savrulur.',
    facts: [
      'Patlama, demir ve oksijen gibi ağır elementleri uzaya savurur.',
      'Bizim vücudumuzdaki bazı elementler de eski yıldız patlamalarından gelir.',
      'Süpernova, yakındaki gezegenleri yok eder; Güneş Sistemi’nde şu an böyle bir olay yok.',
      'Güneş bu kadar büyük olmadığı için böyle patlamayacaktır.',
      'Parlama, kısa süre bir galaksideki tüm yıldızları geçebilir.',
    ],
    hostBodyId: null,
    relatedBodyIds: [],
    durationMs: 16_000,
    weight: 3,
    kind: 'sky',
  },
  {
    id: 'ns-merger',
    title: 'Nötron yıldızı birleşmesi',
    shortName: 'Birleşme',
    lead: 'İki nötron yıldızı birbirine yaklaşır, birleşir ve kütleçekim dalgası üretebilir.',
    see: 'İki küçük nokta yavaş spiral çizerek birleşir; sonra soluk bir halka yayılır.',
    why: 'Çok yoğun iki çekirdek birbirini çeker, spiralleşir, çarpışır.',
    facts: [
      'Nötron yıldızı, süpernova sonrası kalan çok yoğun bir çekirdektir.',
      'Birleşme, altın gibi ağır elementlerin oluşumunda da rol oynar.',
      'Kütleçekim dalgası uzayı esnetir; Dünya’da özel detektörlerle ölçülmüştür.',
      'Bir çay kaşığı maddesi milyarlarca ton gelebilir.',
      'Işık ve dalga neredeyse birlikte gelir; bu da hızlarını karşılaştırmayı sağlar.',
    ],
    hostBodyId: null,
    relatedBodyIds: [],
    durationMs: 18_000,
    weight: 3,
    kind: 'sky',
  },
  {
    id: 'black-hole',
    title: 'Kara delik oluşumu',
    shortName: 'Kara delik',
    lead: 'Çok büyük bir yıldızın çekirdeği çökerse ışığın bile kaçamadığı bir kara delik oluşabilir.',
    see: 'Uzak bir yıldız küçülür; karanlık bir disk ve çevresinde soluk bir halka kalır.',
    why: 'Çekim o kadar güçlenir ki, belli bir sınırın içinden ışık geri dönemez.',
    facts: [
      'Olay ufku, ışığın geri dönemediği sınırdır.',
      'Kara delik sınırının dışında uzay normal davranır.',
      'Oluşum, Güneş Sistemi’nde değil; çok büyük yıldızların hayatının sonundadır.',
      'Güneş bir kara delik olacak kadar büyük değildir.',
      'Etrafta dönen madde ısınır ve halka gibi parlar.',
    ],
    wrong: 'Kara delik her şeyi süpürmez. Yalnızca olay ufkunun içinden ışık kaçamaz.',
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
  title: string
  shortName: string
  dateLabel: string
  text: string
  targetMs: number
}

export const DATED_ECLIPSES: readonly DatedEclipse[] = [
  {
    id: 'eclipse-2026-aug-12',
    visualId: 'solar-eclipse',
    title: '12 Ağustos 2026 tutulması',
    shortName: 'Tutulma',
    dateLabel: '12 Ağustos 2026',
    text: 'Tam tutulma — Kuzey Kutbu, Grönland, İspanya',
    targetMs: utcNoonMs(2026, 8, 12),
  },
  {
    id: 'eclipse-2027-aug-02',
    visualId: 'solar-eclipse',
    title: '2 Ağustos 2027 tutulması',
    shortName: 'Tutulma',
    dateLabel: '2 Ağustos 2027',
    text: 'Tam tutulma — İspanya, Kuzey Afrika, Mısır',
    targetMs: utcNoonMs(2027, 8, 2),
  },
  {
    id: 'eclipse-2028-jan-26',
    visualId: 'solar-eclipse',
    title: '26 Ocak 2028 halkalı tutulması',
    shortName: 'Halka',
    dateLabel: '26 Ocak 2028',
    text: 'Halkalı tutulma — Ay Güneş’i tam kapatamaz',
    targetMs: utcNoonMs(2028, 1, 26),
  },
  {
    id: 'eclipse-2028-jul-22',
    visualId: 'solar-eclipse',
    title: '22 Temmuz 2028 tutulması',
    shortName: 'Tutulma',
    dateLabel: '22 Temmuz 2028',
    text: 'Tam tutulma — Avustralya ve Yeni Zelanda',
    targetMs: utcNoonMs(2028, 7, 22),
  },
  {
    id: 'eclipse-2030-jun-01',
    visualId: 'solar-eclipse',
    title: '1 Haziran 2030 Türkiye tutulması',
    shortName: 'Türkiye',
    dateLabel: '1 Haziran 2030',
    text: 'Halkalı tutulma — hat Türkiye’den de geçer',
    targetMs: utcNoonMs(2030, 6, 1),
  },
  {
    id: 'eclipse-2030-nov-25',
    visualId: 'solar-eclipse',
    title: '25 Kasım 2030 tutulması',
    shortName: 'Tutulma',
    dateLabel: '25 Kasım 2030',
    text: 'Tam tutulma — güney Afrika ve Avustralya',
    targetMs: utcNoonMs(2030, 11, 25),
  },
  {
    id: 'eclipse-2033-mar-30',
    visualId: 'solar-eclipse',
    title: '30 Mart 2033 tutulması',
    shortName: 'Tutulma',
    dateLabel: '30 Mart 2033',
    text: 'Tam tutulma — yaklaşık 2 dk 37 sn',
    targetMs: utcNoonMs(2033, 3, 30),
  },
  {
    id: 'eclipse-2034-mar-20',
    visualId: 'solar-eclipse',
    title: '20 Mart 2034 tutulması',
    shortName: 'Tutulma',
    dateLabel: '20 Mart 2034',
    text: 'Tam tutulma — yaklaşık 4 dk 09 sn',
    targetMs: utcNoonMs(2034, 3, 20),
  },
  {
    id: 'eclipse-2035-sep-02',
    visualId: 'solar-eclipse',
    title: '2 Eylül 2035 tutulması',
    shortName: 'Tutulma',
    dateLabel: '2 Eylül 2035',
    text: 'Tam tutulma — yaklaşık 2 dk 54 sn',
    targetMs: utcNoonMs(2035, 9, 2),
  },
  {
    id: 'eclipse-2037-jul-13',
    visualId: 'solar-eclipse',
    title: '13 Temmuz 2037 tutulması',
    shortName: 'Tutulma',
    dateLabel: '13 Temmuz 2037',
    text: 'Tam tutulma — yaklaşık 3 dk 58 sn',
    targetMs: utcNoonMs(2037, 7, 13),
  },
  {
    id: 'eclipse-2044-aug-23',
    visualId: 'solar-eclipse',
    title: '23 Ağustos 2044 tutulması',
    shortName: 'Tutulma',
    dateLabel: '23 Ağustos 2044',
    text: 'Tam tutulma — Kuzey Amerika (Montana, Kuzey Dakota)',
    targetMs: utcNoonMs(2044, 8, 23),
  },
]

export interface SelectableEvent extends Omit<AstroEvent, 'id'> {
  id: string
  visualId: AstroEventId
  targetMs?: number
  dateLabel?: string
  where?: string
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
  facts: readonly string[]
  why?: string
  wrong?: string
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
