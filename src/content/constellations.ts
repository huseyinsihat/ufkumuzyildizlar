import { equatorialToSceneDir } from '../astronomy/skyCoordinates'

export interface ConstellationStar {
  id: string
  name: string
  x: number
  y: number
  z: number
}

export interface Constellation {
  id: string
  name: string
  description: string
  shape: string
  season: string
  brightest: string
  see: string
  facts: string[]
  stars: ConstellationStar[]
  lines: [string, string][]
}

export interface ConstellationFigurePoint {
  id: string
  x: number
  y: number
}

export interface ConstellationFigure {
  points: ConstellationFigurePoint[]
  lines: [string, string][]
  width: number
  height: number
}

function star(id: string, name: string, raHours: number, decDeg: number): ConstellationStar {
  const dir = equatorialToSceneDir(raHours, decDeg)
  return { id, name, x: dir.x, y: dir.y, z: dir.z }
}

export const CONSTELLATIONS: Constellation[] = [
  {
    id: 'ursa-major',
    name: 'Büyükayı',
    description: 'Kuzey göğünün en tanınmış takımyıldızıdır. Kepçe biçimindeki yedi yıldızı kolayca bulunur.',
    shape: 'Kepçe ve ayı gövdesi',
    season: 'İlkbahar',
    brightest: 'Alioth',
    see: 'Kepçenin ağzındaki iki yıldızı yukarı uzat; Kutup Yıldızı’na giden yol oradadır.',
    facts: [
      'Kepçenin yedi yıldızı ayının belini ve kuyruğunu çizer.',
      'Dubhe ile Merak, Kuzey’i gösteren “işaretçi” yıldızlardır.',
      'Ayı gövdesi kepçenin altına inen pati yıldızlarıyla tamamlanır.',
    ],
    stars: [
      star('dubhe', 'Dubhe', 11.0622, 61.751),
      star('merak', 'Merak', 11.0307, 56.382),
      star('phecda', 'Phecda', 11.8972, 53.695),
      star('megrez', 'Megrez', 12.2571, 57.033),
      star('alioth', 'Alioth', 12.9004, 55.96),
      star('mizar', 'Mizar', 13.3987, 54.925),
      star('alkaid', 'Alkaid', 13.7923, 49.313),
      star('muscida', 'Muscida', 8.5044, 60.718),
      star('talitha', 'Talitha', 8.9868, 48.042),
      star('kappa-uma', 'κ UMa', 9.0604, 47.157),
      star('tania-b', 'Tania Borealis', 10.2849, 42.914),
      star('tania-a', 'Tania Australis', 10.3721, 41.499),
      star('alula-b', 'Alula Borealis', 11.308, 33.094),
      star('alula-a', 'Alula Australis', 11.303, 31.529),
    ],
    lines: [
      ['dubhe', 'merak'],
      ['merak', 'phecda'],
      ['phecda', 'megrez'],
      ['megrez', 'dubhe'],
      ['megrez', 'alioth'],
      ['alioth', 'mizar'],
      ['mizar', 'alkaid'],
      ['dubhe', 'muscida'],
      ['merak', 'talitha'],
      ['talitha', 'kappa-uma'],
      ['phecda', 'tania-b'],
      ['tania-b', 'tania-a'],
      ['phecda', 'alula-b'],
      ['alula-b', 'alula-a'],
    ],
  },
  {
    id: 'ursa-minor',
    name: 'Küçük Ayı',
    description: 'Kutup Yıldızı (Polaris) bu takımyıldızdadır. Kuzeyi bulmak için kullanılır.',
    shape: 'Küçük kepçe',
    season: 'Tüm yıl',
    brightest: 'Kutup Yıldızı',
    see: 'Büyük kepçenin işaretçilerini kuzeye uzat; duran parlak yıldız Polaris’tir.',
    facts: [
      'Polaris gökyüzünde neredeyse yerinde durur; Dünya’nın ekseni ona bakar.',
      'Küçük kepçenin kasesi Kochab ve Pherkad ile kapanır.',
      'Türkiye’den yılın her gecesi ufuk üstünde kalır.',
    ],
    stars: [
      star('polaris', 'Kutup Yıldızı', 2.5303, 89.2641),
      star('yildun', 'Yildun', 17.5362, 86.586),
      star('epsilon-umi', 'ε UMi', 16.7662, 82.037),
      star('zeta-umi', 'ζ UMi', 15.7343, 77.794),
      star('eta-umi', 'η UMi', 16.2917, 75.755),
      star('kochab', 'Kochab', 14.8451, 74.155),
      star('pherkad', 'Pherkad', 15.3457, 71.834),
    ],
    lines: [
      ['polaris', 'yildun'],
      ['yildun', 'epsilon-umi'],
      ['epsilon-umi', 'zeta-umi'],
      ['zeta-umi', 'kochab'],
      ['kochab', 'pherkad'],
      ['pherkad', 'eta-umi'],
      ['eta-umi', 'zeta-umi'],
    ],
  },
  {
    id: 'orion',
    name: 'Avcı',
    description: 'Avcı (Orion). Kemerindeki üç yıldız ve parlak Betelgeuse ile Rigel kolay tanınır.',
    shape: 'Kemerli avcı',
    season: 'Kış',
    brightest: 'Rigel',
    see: 'Kış gecesinde üçlü kemeri bul; üstte kızıl Betelgeuse, altta mavi Rigel durur.',
    facts: [
      'Kemer: Mintaka, Alnilam ve Alnitak neredeyse düz bir çizgidir.',
      'Meissa avcının başı, kısa kılıç kemerin altından sarkar.',
      'Betelgeuse soğuyan bir kırmızı süperdev, Rigel ise sıcak mavi bir devdir.',
    ],
    stars: [
      star('betelgeuse', 'Betelgeuse', 5.9195, 7.407),
      star('bellatrix', 'Bellatrix', 5.4189, 6.35),
      star('meissa', 'Meissa', 5.5856, 9.934),
      star('alnitak', 'Alnitak', 5.6794, -1.943),
      star('alnilam', 'Alnilam', 5.6036, -1.202),
      star('mintaka', 'Mintaka', 5.5334, -0.299),
      star('saiph', 'Saiph', 5.796, -9.67),
      star('rigel', 'Rigel', 5.2423, -8.2016),
      star('hatysa', 'Hatysa', 5.5906, -5.91),
      star('tabit', 'Tabit', 4.8307, 6.961),
      star('nu-ori', 'ν Ori', 6.1262, 14.768),
    ],
    lines: [
      ['betelgeuse', 'meissa'],
      ['meissa', 'bellatrix'],
      ['betelgeuse', 'bellatrix'],
      ['bellatrix', 'mintaka'],
      ['mintaka', 'alnilam'],
      ['alnilam', 'alnitak'],
      ['alnitak', 'saiph'],
      ['saiph', 'rigel'],
      ['rigel', 'mintaka'],
      ['betelgeuse', 'alnitak'],
      ['alnilam', 'hatysa'],
      ['bellatrix', 'tabit'],
      ['betelgeuse', 'nu-ori'],
    ],
  },
  {
    id: 'cassiopeia',
    name: 'Kraliçe',
    description: 'W harfine benzeyen beş parlak yıldız. Kuzey göğünde neredeyse her zaman görünür.',
    shape: 'W harfi',
    season: 'Sonbahar',
    brightest: 'Schedar',
    see: 'Kutup Yıldızı’nın öte yanında parlak bir W ara; kraliçenin tahtı odur.',
    facts: [
      'Beş yıldızı W ya da M harfi gibi okunur; mevsimle döner.',
      'Samanyolu Kraliçe’den geçer; bu yüzden arka planı yıldız doludur.',
      'Türkiye’den yılın büyük bölümünde ufuk üstündedir.',
    ],
    stars: [
      star('schedar', 'Schedar', 0.6751, 56.537),
      star('caph', 'Caph', 0.1529, 59.15),
      star('gamma-cas', 'Navi', 0.9453, 60.717),
      star('ruchbah', 'Ruchbah', 1.4302, 60.235),
      star('segin', 'Segin', 1.9066, 63.67),
    ],
    lines: [
      ['caph', 'schedar'],
      ['schedar', 'gamma-cas'],
      ['gamma-cas', 'ruchbah'],
      ['ruchbah', 'segin'],
    ],
  },
  {
    id: 'cygnus',
    name: 'Kuğu',
    description: 'Kuzey haçı da denir. Kuyruğundaki Deneb, Yaz Üçgeni’nin bir köşesidir.',
    shape: 'Kuzey haçı',
    season: 'Yaz',
    brightest: 'Deneb',
    see: 'Yaz gecesinde Deneb’den Albireo’ya inen haçı bul; kanatlar Sadr’dan iki yana açılır.',
    facts: [
      'Gövde Deneb–Sadr–Albireo, kanatlar Fawaris ve Gienah’dır.',
      'Deneb çok uzak ve çok parlaktır; Yaz Üçgeni’nin bir köşesidir.',
      'Kuğunun gövdesi Samanyolu’nun parlak bandının üstüne oturur.',
    ],
    stars: [
      star('deneb', 'Deneb', 20.6905, 45.2803),
      star('sadr', 'Sadr', 20.3705, 40.2567),
      star('gienah-cyg', 'Gienah', 20.7705, 33.9703),
      star('delta-cyg', 'Fawaris', 19.7496, 45.1308),
      star('albireo', 'Albireo', 19.512, 27.9597),
      star('kappa-cyg', 'κ Cyg', 19.285, 53.368),
    ],
    lines: [
      ['deneb', 'sadr'],
      ['sadr', 'albireo'],
      ['delta-cyg', 'sadr'],
      ['sadr', 'gienah-cyg'],
      ['deneb', 'kappa-cyg'],
    ],
  },
  {
    id: 'lyra',
    name: 'Çalgı',
    description: 'Küçük bir lir. En parlak yıldızı Vega, Yaz Üçgeni’nin köşelerinden biridir.',
    shape: 'Lir / paralelkenar',
    season: 'Yaz',
    brightest: 'Vega',
    see: 'Yaz Üçgeni’nin en parlak köşesi Vega’dır; hemen altında küçük bir paralelkenar durur.',
    facts: [
      'Vega, yaz göğünün en parlak yıldızlarından biridir.',
      'Altındaki dört yıldız lirin gövdesini çizer.',
      'Vega, Yaz Üçgeni’nde Altair ve Deneb ile komşudur.',
    ],
    stars: [
      star('vega', 'Vega', 18.6156, 38.7838),
      star('sheliak', 'Sheliak', 18.8347, 33.3627),
      star('sulafat', 'Sulafat', 18.9824, 32.6896),
      star('zeta-lyr', 'ζ Lyr', 18.7462, 37.6051),
      star('delta-lyr', 'δ Lyr', 18.9084, 36.899),
    ],
    lines: [
      ['vega', 'zeta-lyr'],
      ['vega', 'delta-lyr'],
      ['zeta-lyr', 'sheliak'],
      ['sheliak', 'sulafat'],
      ['sulafat', 'delta-lyr'],
      ['delta-lyr', 'zeta-lyr'],
    ],
  },
  {
    id: 'aquila',
    name: 'Kartal',
    description: 'Gökyüzünde kanatlarını açmış bir kartal. Parlak Altair, Yaz Üçgeni’nin üçüncü köşesidir.',
    shape: 'Açık kanatlı kartal',
    season: 'Yaz',
    brightest: 'Altair',
    see: 'Altair’i iki yan yıldızıyla (Tarazed ve Alshain) bul; gövde kuyruğa doğru uzanır.',
    facts: [
      'Altair, Tarazed ve Alshain kartalın başını çizer.',
      'Kanatlar Altair’den iki yana açılır.',
      'Altair Yaz Üçgeni’nin üçüncü köşesidir.',
    ],
    stars: [
      star('altair', 'Altair', 19.8464, 8.8683),
      star('tarazed', 'Tarazed', 19.7703, 10.6133),
      star('alshain', 'Alshain', 19.9211, 6.4068),
      star('delta-aql', 'δ Aql', 19.4232, 3.1146),
      star('theta-aql', 'θ Aql', 20.1885, -0.8215),
      star('zeta-aql', 'ζ Aql', 19.0902, 13.863),
      star('eta-aql', 'η Aql', 19.8745, 1.006),
    ],
    lines: [
      ['tarazed', 'altair'],
      ['altair', 'alshain'],
      ['zeta-aql', 'altair'],
      ['altair', 'eta-aql'],
      ['altair', 'delta-aql'],
      ['delta-aql', 'theta-aql'],
    ],
  },
  {
    id: 'canis-major',
    name: 'Büyük Köpek',
    description: 'Avcı’nın köpeği. Gece göğünün en parlak yıldızı Sirius buradadır.',
    shape: 'Köpek gövdesi',
    season: 'Kış',
    brightest: 'Sirius',
    see: 'Avcı’nın kemerini güneydoğuya uzat; karşılaştığın en parlak yıldız Sirius’tur.',
    facts: [
      'Sirius, gece göğünün en parlak yıldızıdır.',
      'Mirzam ön ayak, Adhara karın, Aludra kuyruktur.',
      'Avcı ile birlikte kış göğünün en net çiftidir.',
    ],
    stars: [
      star('sirius', 'Sirius', 6.7525, -16.7161),
      star('mirzam', 'Mirzam', 6.3783, -17.9559),
      star('wezen', 'Wezen', 7.1399, -26.3932),
      star('adhara', 'Adhara', 6.9771, -28.9721),
      star('aludra', 'Aludra', 7.4016, -29.3031),
      star('furud', 'Furud', 6.3386, -30.063),
    ],
    lines: [
      ['mirzam', 'sirius'],
      ['sirius', 'wezen'],
      ['wezen', 'adhara'],
      ['sirius', 'adhara'],
      ['wezen', 'aludra'],
      ['adhara', 'furud'],
    ],
  },
  {
    id: 'aries',
    name: 'Koç',
    description: 'Takımyıldızlardan biridir. Üç parlak yıldızı küçük bir kavis çizer.',
    shape: 'Koç başı',
    season: 'Sonbahar',
    brightest: 'Hamal',
    see: 'Andromeda zincirinin altında küçük kırık bir çizgi ara; Hamal en parlak ucudur.',
    facts: [
      'Hamal, Sheratan ve Mesarthim koçun başını büker.',
      'Bharani, başı gövdeye bağlayan dördüncü ışıktır.',
      'Eski gök haritalarında Güneş yolunun ilk durağidir.',
    ],
    stars: [
      star('hamal', 'Hamal', 2.1193, 23.4628),
      star('sheratan', 'Sheratan', 1.9107, 20.808),
      star('mesarthim', 'Mesarthim', 1.9106, 19.2939),
      star('bharani', 'Bharani', 2.8331, 27.261),
    ],
    lines: [
      ['hamal', 'sheratan'],
      ['sheratan', 'mesarthim'],
      ['hamal', 'bharani'],
    ],
  },
  {
    id: 'taurus',
    name: 'Boğa',
    description: 'Boğa’nın kızıl gözü Aldebaran’dır. Boynuzları kış göğünde kolay seçilir.',
    shape: 'V boynuzlu boğa',
    season: 'Kış',
    brightest: 'Aldebaran',
    see: 'Avcı’nın kemerini sağa takip et; kızıl Aldebaran boğanın gözüdür.',
    facts: [
      'Hyades kümesi boğanın yüzünü V harfi gibi çizer.',
      'Aldebaran V’nin ucundaki kızıl gözdür.',
      'İki boynuz Elnath ve Tianguan’a uzanır.',
    ],
    stars: [
      star('aldebaran', 'Aldebaran', 4.5987, 16.5093),
      star('ain', 'Ain', 4.4769, 19.1804),
      star('hyadum', 'Hyadum I', 4.3299, 15.6276),
      star('hyadum-ii', 'Hyadum II', 4.3822, 17.543),
      star('theta-tau', 'θ Tau', 4.4777, 15.871),
      star('elnath', 'Elnath', 5.4382, 28.6075),
      star('zeta-tau', 'Tianguan', 5.6274, 21.1426),
    ],
    lines: [
      ['hyadum', 'aldebaran'],
      ['hyadum-ii', 'aldebaran'],
      ['theta-tau', 'aldebaran'],
      ['aldebaran', 'ain'],
      ['ain', 'elnath'],
      ['aldebaran', 'zeta-tau'],
    ],
  },
  {
    id: 'gemini',
    name: 'İkizler',
    description: 'Gökyüzündeki ikizler Castor ve Pollux’tur. Kış gecelerinde yan yana parlarlar.',
    shape: 'Yan yana iki gövde',
    season: 'Kış',
    brightest: 'Pollux',
    see: 'Avcı’nın sol üstünde iki parlak baş ara: Castor ve Pollux. Ayaklar Alhena ve Tejat’tır.',
    facts: [
      'Castor ve Pollux ikizlerin başlarıdır; yan yana dururlar.',
      'Her başdan bir gövde aşağı iner; iki kardeş gibi paraleldir.',
      'Kış göğünde Avcı’nın hemen yanında parlarlar.',
    ],
    stars: [
      star('castor', 'Castor', 7.5767, 31.8883),
      star('pollux', 'Pollux', 7.7553, 28.0262),
      star('alhena', 'Alhena', 6.6286, 16.3993),
      star('wasat', 'Wasat', 7.3354, 21.9823),
      star('mebsuta', 'Mebsuta', 6.7328, 25.1311),
      star('tejat', 'Tejat', 6.3827, 22.5068),
      star('propus', 'Propus', 6.2479, 22.507),
      star('mekbuda', 'Mekbuda', 7.0685, 20.57),
    ],
    lines: [
      ['castor', 'pollux'],
      ['castor', 'mebsuta'],
      ['mebsuta', 'tejat'],
      ['tejat', 'propus'],
      ['pollux', 'wasat'],
      ['wasat', 'mekbuda'],
      ['mekbuda', 'alhena'],
    ],
  },
  {
    id: 'cancer',
    name: 'Yengeç',
    description: 'Burçların en sönüklerindendir. Ortadaki dörtgen, yengecin gövdesidir.',
    shape: 'Yengeç gövdesi',
    season: 'İlkbahar',
    brightest: 'Altarf',
    see: 'İkizler ile Aslan’ın arasında sönük bir Y ara; gövde iki eşek yıldızındadır.',
    facts: [
      'Asellus Borealis ve Australis yengecin gövdesini tutar.',
      'Altarf ve Acubens iki yana açılan kıskaçlardır.',
      'Ortadaki sönük küme Praesepe, “arı kovanı” diye anılır.',
    ],
    stars: [
      star('acubens', 'Acubens', 8.9748, 11.8577),
      star('altarf', 'Altarf', 8.2752, 9.1856),
      star('asellus-borealis', 'Asellus Borealis', 8.7214, 21.4685),
      star('asellus-australis', 'Asellus Australis', 8.7784, 18.1543),
      star('iota-cnc', 'ι Cnc', 8.7783, 28.76),
    ],
    lines: [
      ['altarf', 'asellus-australis'],
      ['asellus-australis', 'acubens'],
      ['asellus-australis', 'asellus-borealis'],
      ['asellus-borealis', 'iota-cnc'],
    ],
  },
  {
    id: 'leo',
    name: 'Aslan',
    description: 'Bahar göğünün aslanı. Başındaki orak ve parlak Regulus kolay tanınır.',
    shape: 'Orak ve aslan gövdesi',
    season: 'İlkbahar',
    brightest: 'Regulus',
    see: 'Bahar akşamında ters soru işareti gibi bir orak ara; noktası Regulus’tur.',
    facts: [
      'Baştaki orak, aslanın yelesini çizer.',
      'Regulus aslanın kalbi sayılır; ekvatora çok yakındır.',
      'Denebola kuyruğun ucundaki parlak noktadır.',
    ],
    stars: [
      star('regulus', 'Regulus', 10.1395, 11.9672),
      star('algieba', 'Algieba', 10.3328, 19.8415),
      star('adhafera', 'Adhafera', 10.2781, 23.4173),
      star('rasalas', 'Rasalas', 9.8794, 23.7743),
      star('eta-leo', 'η Leo', 10.1222, 16.763),
      star('zosma', 'Zosma', 11.2373, 20.5237),
      star('chertan', 'Chertan', 11.237, 15.4298),
      star('denebola', 'Denebola', 11.8177, 14.5721),
    ],
    lines: [
      ['rasalas', 'adhafera'],
      ['adhafera', 'algieba'],
      ['algieba', 'eta-leo'],
      ['eta-leo', 'regulus'],
      ['regulus', 'chertan'],
      ['chertan', 'zosma'],
      ['zosma', 'denebola'],
      ['chertan', 'denebola'],
    ],
  },
  {
    id: 'virgo',
    name: 'Başak',
    description: 'Gökyüzünün en büyük takımyıldızlarından biridir. En parlak yıldızı Spica’dır.',
    shape: 'Y biçimli başak',
    season: 'İlkbahar',
    brightest: 'Spica',
    see: 'Aslan’ın kuyruğundan doğuya in; mavi-beyaz Spica başağın ucudur.',
    facts: [
      'Spica, başak demetini tutan el gibi parlar.',
      'Porrima’dan iki kola ayrılan Y, bakirenin gövdesidir.',
      'Bahar göğünün en uzun takımyıldızlarındandır.',
    ],
    stars: [
      star('spica', 'Spica', 13.4199, -11.1613),
      star('porrima', 'Porrima', 12.6943, -1.4494),
      star('zaniah', 'Zaniah', 12.3318, -0.6666),
      star('vindemiatrix', 'Vindemiatrix', 13.0363, 10.9591),
      star('heze', 'Heze', 13.5782, -0.5958),
      star('auva', 'Auva', 12.9267, 3.397),
    ],
    lines: [
      ['zaniah', 'porrima'],
      ['porrima', 'vindemiatrix'],
      ['porrima', 'auva'],
      ['auva', 'heze'],
      ['porrima', 'heze'],
      ['heze', 'spica'],
    ],
  },
  {
    id: 'libra',
    name: 'Terazi',
    description: 'Adalet terazisi. İki kefesi Zubenelgenubi ve Zubeneschamali yıldızlarıdır.',
    shape: 'Terazi kefeleri',
    season: 'Yaz',
    brightest: 'Zubeneschamali',
    see: 'Akrep’in kıskaçlarının üstünde iki parlak kefe ara; dördüncü yıldız kirişi tutar.',
    facts: [
      'İki kefe Zubenelgenubi ve Zubeneschamali’dir.',
      'Zubenelakrab ve Brachium terazinin kirişini çizer.',
      'Eskiden Akrep’in kıskaçları sayılırdı; sonra ayrı bir terazi oldu.',
    ],
    stars: [
      star('zubenelgenubi', 'Zubenelgenubi', 14.8479, -16.0418),
      star('zubeneschamali', 'Zubeneschamali', 15.2835, -9.3829),
      star('brachium', 'Brachium', 15.0671, -25.2819),
      star('zubenelakrab', 'Zubenelakrab', 15.617, -14.7895),
    ],
    lines: [
      ['zubenelgenubi', 'zubeneschamali'],
      ['zubeneschamali', 'zubenelakrab'],
      ['zubenelgenubi', 'brachium'],
      ['zubenelgenubi', 'zubenelakrab'],
    ],
  },
  {
    id: 'scorpius',
    name: 'Akrep',
    description: 'Kıvrık kuyruğu gerçek bir akrebe benzer. Kalbindeki kırmızı Antares çok parlaktır.',
    shape: 'Kıskaçlı akrep',
    season: 'Yaz',
    brightest: 'Antares',
    see: 'Yaz güneyinde kızıl Antares’i bul; kuyruk kancası Shaula ve Lesath’ta biter.',
    facts: [
      'Antares akrebin kalbidir; adı “Mars’ın rakibi” demektir.',
      'Kıskaçlar Graffias ve Jabbah ile açılır.',
      'Kuyruk gerçek bir akrep gibi kıvrılır; yazın güney ufukta durur.',
    ],
    stars: [
      star('jabbah', 'Jabbah', 16.1999, -19.461),
      star('graffias', 'Graffias', 16.0901, -19.8055),
      star('dschubba', 'Dschubba', 16.0053, -22.6217),
      star('pi-sco', 'π Sco', 15.9819, -26.1141),
      star('alniyat', 'Alniyat', 16.3531, -25.593),
      star('antares', 'Antares', 16.4901, -26.432),
      star('tau-sco', 'τ Sco', 16.5986, -28.216),
      star('epsilon-sco', 'Larawag', 16.8365, -34.2932),
      star('sargas', 'Sargas', 17.6217, -42.9978),
      star('shaula', 'Shaula', 17.5601, -37.1038),
      star('lesath', 'Lesath', 17.2048, -37.2958),
    ],
    lines: [
      ['jabbah', 'graffias'],
      ['graffias', 'dschubba'],
      ['dschubba', 'pi-sco'],
      ['dschubba', 'alniyat'],
      ['alniyat', 'antares'],
      ['antares', 'tau-sco'],
      ['tau-sco', 'epsilon-sco'],
      ['epsilon-sco', 'sargas'],
      ['sargas', 'shaula'],
      ['shaula', 'lesath'],
    ],
  },
  {
    id: 'sagittarius',
    name: 'Yay',
    description: 'Çaydanlık biçimindeki yıldızları kolay bulunur. Samanyolu’nun merkezi bu yöndedir.',
    shape: 'Çaydanlık',
    season: 'Yaz',
    brightest: 'Kaus Australis',
    see: 'Akrep’in doğusunda bir çaydanlık ara; ağzı Samanyolu’nun merkezine bakar.',
    facts: [
      'Altı parlak yıldız bir çaydanlığı çizer: kulp, kapak, ağız.',
      'Çaydanlığın ağzı, Samanyolu’nun merkezine doğrudur.',
      'Yazın güney ufukta, Akrep’in hemen yanında durur.',
    ],
    stars: [
      star('alnasl', 'Alnasl', 18.0968, -30.4241),
      star('kaus-media', 'Kaus Media', 18.349, -29.8281),
      star('kaus-australis', 'Kaus Australis', 18.4029, -34.3846),
      star('ascella', 'Ascella', 19.0435, -29.8801),
      star('nunki', 'Nunki', 18.9211, -26.2967),
      star('kaus-borealis', 'Kaus Borealis', 18.4662, -25.4213),
    ],
    lines: [
      ['alnasl', 'kaus-media'],
      ['kaus-media', 'kaus-australis'],
      ['kaus-australis', 'ascella'],
      ['ascella', 'nunki'],
      ['nunki', 'kaus-borealis'],
      ['kaus-borealis', 'kaus-media'],
    ],
  },
  {
    id: 'capricornus',
    name: 'Oğlak',
    description: 'Deniz keçisi. Üçgenimsi biçimi sonbahar göğünün güneyinde durur.',
    shape: 'Üçgen gemi',
    season: 'Sonbahar',
    brightest: 'Deneb Algedi',
    see: 'Kova’nın altında yatan geniş bir üçgen ara; pruva Algedi, kıç Deneb Algedi’dir.',
    facts: [
      'Üst kenar Algedi’den Deneb Algedi’ye uzanan bir teknedir.',
      'Güneydeki ζ ve ω yıldızları gövdeyi şişirir.',
      'Sonbahar akşamlarında güney ufukta alçak durur.',
    ],
    stars: [
      star('algedi', 'Algedi', 20.2946, -12.5071),
      star('dabih', 'Dabih', 20.3508, -14.7814),
      star('nashira', 'Nashira', 21.618, -16.6623),
      star('deneb-algedi', 'Deneb Algedi', 21.7836, -16.1266),
      star('omega-cap', 'ω Cap', 20.8637, -26.919),
      star('zeta-cap', 'ζ Cap', 21.4445, -22.411),
    ],
    lines: [
      ['algedi', 'dabih'],
      ['dabih', 'nashira'],
      ['nashira', 'deneb-algedi'],
      ['deneb-algedi', 'algedi'],
      ['dabih', 'omega-cap'],
      ['omega-cap', 'zeta-cap'],
      ['zeta-cap', 'deneb-algedi'],
    ],
  },
  {
    id: 'aquarius',
    name: 'Kova',
    description: 'Su taşıyıcısı. Yıldızları bir testiden dökülen suyu andırır.',
    shape: 'Testi ve su akışı',
    season: 'Sonbahar',
    brightest: 'Sadalsuud',
    see: 'Oğlak’ın üstünde bir Y testi ara; su Skat’a doğru dökülür.',
    facts: [
      'Sadachbia, ζ ve η Aquarii su testisinin Y’sini çizer.',
      'Sadalmelik ve Sadalsuud testiyi omuzda tutar.',
      'Akış λ Aquarii üzerinden Skat’a iner.',
    ],
    stars: [
      star('sadalmelik', 'Sadalmelik', 22.0964, -0.3198),
      star('sadalsuud', 'Sadalsuud', 21.5258, -5.5712),
      star('sadachbia', 'Sadachbia', 22.3609, -1.3873),
      star('pi-aqr', 'π Aqr', 22.4213, 1.377),
      star('zeta-aqr', 'ζ Aqr', 22.4805, -0.02),
      star('eta-aqr', 'η Aqr', 22.5893, -0.117),
      star('lambda-aqr', 'λ Aqr', 22.8769, -7.578),
      star('skat', 'Skat', 22.8769, -15.8208),
    ],
    lines: [
      ['sadalsuud', 'sadalmelik'],
      ['sadalmelik', 'sadachbia'],
      ['pi-aqr', 'sadachbia'],
      ['sadachbia', 'zeta-aqr'],
      ['zeta-aqr', 'eta-aqr'],
      ['eta-aqr', 'lambda-aqr'],
      ['lambda-aqr', 'skat'],
    ],
  },
  {
    id: 'pisces',
    name: 'Balık',
    description: 'İki balık bir kordonla bağlıdır. İlkbahar ekinoksu bu yönde bulunur.',
    shape: 'İki balık ve kordon',
    season: 'Sonbahar',
    brightest: 'Alrescha',
    see: 'Andromeda’nın altında bir çember (Circlet) ara; kordon Alrescha düğümünde ikinci balığa gider.',
    facts: [
      'Batı balığı Circlet denen küçük bir çemberdir.',
      'Alrescha iki balığı bağlayan kordonun düğümüdür.',
      'İlkbahar ekinoksu, Güneş’in bu takımyıldıza girdiği yöndedir.',
    ],
    stars: [
      star('alrescha', 'Alrescha', 2.0342, 2.7637),
      star('eta-psc', 'η Psc', 1.5242, 15.3458),
      star('o-psc', 'ο Psc', 1.7566, 9.157),
      star('nu-psc', 'ν Psc', 1.6905, 5.487),
      star('mu-psc', 'μ Psc', 1.5031, 6.144),
      star('gamma-psc', 'γ Psc', 23.2867, 3.2773),
      star('theta-psc', 'θ Psc', 23.4661, 6.379),
      star('iota-psc', 'ι Psc', 23.6656, 5.6263),
      star('lambda-psc', 'λ Psc', 23.7008, 1.78),
      star('kappa-psc', 'κ Psc', 23.4489, 1.256),
      star('omega-psc', 'ω Psc', 23.973, 6.8633),
    ],
    lines: [
      ['gamma-psc', 'theta-psc'],
      ['theta-psc', 'iota-psc'],
      ['iota-psc', 'omega-psc'],
      ['iota-psc', 'lambda-psc'],
      ['lambda-psc', 'kappa-psc'],
      ['kappa-psc', 'gamma-psc'],
      ['alrescha', 'nu-psc'],
      ['nu-psc', 'mu-psc'],
      ['mu-psc', 'kappa-psc'],
      ['alrescha', 'o-psc'],
      ['o-psc', 'eta-psc'],
      ['eta-psc', 'alrescha'],
    ],
  },
  {
    id: 'andromeda',
    name: 'Andromeda',
    description: 'Zincirli prenses. Üç parlak yıldızı bir hat çizer; ünlü Andromeda Gökadası buradadır.',
    shape: 'Zincir ve gökada kolu',
    season: 'Sonbahar',
    brightest: 'Alpheratz',
    see: 'Kraliçe’nin W’sinden aşağı inen üç parlak zinciri takip et; Mirach’tan çıkan kol M31’e gider.',
    facts: [
      'Alpheratz, Mirach ve Almach prensesin zincirini çizer.',
      'Mirach’tan μ ve ν And’e giden kol, Andromeda Gökadası’nın yönüdür.',
      'Alpheratz aynı zamanda Kanatlı At’ın köşesidir.',
    ],
    stars: [
      star('alpheratz', 'Alpheratz', 0.1398, 29.0904),
      star('delta-and', 'δ And', 0.6553, 30.861),
      star('mirach', 'Mirach', 1.1622, 35.6206),
      star('almach', 'Almach', 2.0647, 42.3297),
      star('mu-and', 'μ And', 0.9459, 38.499),
      star('nu-and', 'ν And', 0.8302, 41.079),
    ],
    lines: [
      ['alpheratz', 'delta-and'],
      ['delta-and', 'mirach'],
      ['mirach', 'almach'],
      ['mirach', 'mu-and'],
      ['mu-and', 'nu-and'],
    ],
  },
  {
    id: 'perseus',
    name: 'Perseus',
    description: 'Kahraman Perseus. Başındaki Mirfak ve yanıp sönen Algol kolay bulunur.',
    shape: 'Kahraman silüeti',
    season: 'Sonbahar',
    brightest: 'Mirfak',
    see: 'Kraliçe ile Boğa arasında parlak Mirfak’ı bul; altındaki Algol birkaç günde bir kararır.',
    facts: [
      'Algol, “şeytan yıldızı”dır; eş yıldızı onu periyodik örter.',
      'Mirfak kahramanın gövdesinin merkezidir.',
      'Kraliçe’nin W’si ile Ülker arasında bir köprü gibi durur.',
    ],
    stars: [
      star('mirfak', 'Mirfak', 3.4054, 49.8612),
      star('algol', 'Algol', 3.1361, 40.9556),
      star('delta-per', 'δ Per', 3.7154, 47.7875),
      star('atik', 'Atik', 3.7534, 32.2882),
      star('gamma-per', 'γ Per', 3.0799, 53.506),
      star('epsilon-per', 'ε Per', 3.9642, 40.01),
      star('menkib', 'Menkib', 3.9022, 31.884),
    ],
    lines: [
      ['gamma-per', 'mirfak'],
      ['delta-per', 'mirfak'],
      ['mirfak', 'algol'],
      ['algol', 'atik'],
      ['mirfak', 'epsilon-per'],
      ['epsilon-per', 'menkib'],
    ],
  },
  {
    id: 'crux',
    name: 'Güney Haçı',
    description: 'Güney göğünün küçük ama net haçı. Güney yarımkürede yön bulmak için kullanılır.',
    shape: 'Küçük haç',
    season: 'Güney göğü',
    brightest: 'Acrux',
    see: 'Güney yarımkürede dört parlak yıldız küçük bir haç çizer; uzun kol güneyi gösterir.',
    facts: [
      'Gökyüzündeki en küçük takımyıldızlardan biridir.',
      'Uzun kol, Güney Kutbu yönünü kabaca gösterir.',
      'Türkiye’den görünmez; güney yarımkürenin pusulasıdır.',
    ],
    stars: [
      star('acrux', 'Acrux', 12.4433, -63.0991),
      star('mimosa', 'Mimosa', 12.7953, -59.6888),
      star('gacrux', 'Gacrux', 12.5194, -57.1132),
      star('delta-cru', 'Imai', 12.2524, -58.7489),
    ],
    lines: [
      ['acrux', 'gacrux'],
      ['mimosa', 'delta-cru'],
    ],
  },
  {
    id: 'bootes',
    name: 'Çoban',
    description: 'Uçurtma biçimindeki çoban. En parlak yıldızı turuncu Arcturus’tur.',
    shape: 'Uçurtma',
    season: 'İlkbahar',
    brightest: 'Arcturus',
    see: 'Büyük kepçenin sapını yay gibi uzat; turuncu Arcturus uçurtmanın ucudur.',
    facts: [
      'Nekkar, Seginus ve Izar uçurtmanın üçgenini çizer.',
      'Arcturus uçurtmanın kuyruğundaki turuncu devdir.',
      'Kepçenin sapını takip etmek Çoban’ı bulmanın en kolay yoludur.',
    ],
    stars: [
      star('arcturus', 'Arcturus', 14.261, 19.1824),
      star('izar', 'Izar', 14.7498, 27.0742),
      star('seginus', 'Seginus', 14.5347, 38.3083),
      star('nekkar', 'Nekkar', 15.0324, 40.3906),
      star('muphrid', 'Muphrid', 13.9114, 18.3977),
      star('zeta-boo', 'ζ Boo', 14.6858, 13.728),
    ],
    lines: [
      ['muphrid', 'arcturus'],
      ['arcturus', 'izar'],
      ['izar', 'seginus'],
      ['seginus', 'nekkar'],
      ['nekkar', 'izar'],
      ['arcturus', 'zeta-boo'],
    ],
  },
  {
    id: 'auriga',
    name: 'Arabacı',
    description: 'Beşgen bir savaş arabası. Parlak sarı Capella, Arabacı’nın keçisidir.',
    shape: 'Beşgen araba',
    season: 'Kış',
    brightest: 'Capella',
    see: 'Kış göğünde Boğa’nın boynuzu Elnath ile Capella’yı birleştir; ortaya beşgen çıkar.',
    facts: [
      'Capella, kış göğünün en parlak sarı yıldızlarındandır.',
      'Beşgenin bir köşesi Boğa ile paylaşılan Elnath’tır.',
      'Arabacı, Avcı’nın hemen kuzeyinde durur.',
    ],
    stars: [
      star('capella', 'Capella', 5.2782, 45.998),
      star('menkalinan', 'Menkalinan', 5.9916, 44.9474),
      star('mahasim', 'Mahasim', 5.9952, 37.2126),
      star('elnath-aur', 'Elnath', 5.4382, 28.6075),
      star('hassaleh', 'Hassaleh', 4.9499, 33.1661),
    ],
    lines: [
      ['capella', 'menkalinan'],
      ['menkalinan', 'mahasim'],
      ['mahasim', 'elnath-aur'],
      ['elnath-aur', 'hassaleh'],
      ['hassaleh', 'capella'],
    ],
  },
  {
    id: 'draco',
    name: 'Ejderha',
    description: 'Kuzey göğünü dolanan uzun bir ejderha. Eski kutup yıldızı Thuban kuyruğundadır.',
    shape: 'Kıvrılan ejderha',
    season: 'Yaz',
    brightest: 'Eltanin',
    see: 'Küçük Ayı’nın çevresinde dolanan ince bir zincir ara; dörtgen baş Eltanin’dedir.',
    facts: [
      'Baş, Eltanin–Rastaban–Kuma–Grumium dörtgenidir.',
      'Gövde Küçük Ayı’nın etrafını dolanır.',
      'Thuban, Mısır piramitleri döneminde kutup yıldızıydı.',
    ],
    stars: [
      star('eltanin', 'Eltanin', 17.9434, 51.4889),
      star('rastaban', 'Rastaban', 17.5072, 52.3014),
      star('grumium', 'Grumium', 17.8921, 56.8725),
      star('kuma', 'Kuma', 17.536, 55.1841),
      star('thuban', 'Thuban', 14.0732, 64.3758),
      star('edasich', 'Edasich', 15.4153, 58.966),
      star('eta-dra', 'η Dra', 16.3999, 61.514),
      star('kappa-dra', 'κ Dra', 12.5581, 69.788),
      star('giausar', 'Giausar', 11.5234, 69.3311),
    ],
    lines: [
      ['eltanin', 'rastaban'],
      ['rastaban', 'kuma'],
      ['kuma', 'grumium'],
      ['grumium', 'eltanin'],
      ['kuma', 'edasich'],
      ['edasich', 'eta-dra'],
      ['eta-dra', 'thuban'],
      ['thuban', 'kappa-dra'],
      ['kappa-dra', 'giausar'],
    ],
  },
]

export function findConstellation(id: string | null | undefined): Constellation | undefined {
  if (!id) return undefined
  return CONSTELLATIONS.find((item) => item.id === id)
}

export function constellationCentroidDir(constellation: Constellation): { x: number; y: number; z: number } {
  let x = 0
  let y = 0
  let z = 0
  for (const item of constellation.stars) {
    x += item.x
    y += item.y
    z += item.z
  }
  const length = Math.hypot(x, y, z) || 1
  return { x: x / length, y: y / length, z: z / length }
}

export function projectConstellationFigure(
  constellation: Constellation,
  width = 120,
  height = 72,
  pad = 8,
): ConstellationFigure {
  const center = constellationCentroidDir(constellation)
  const worldUp = Math.abs(center.y) > 0.95 ? { x: 1, y: 0, z: 0 } : { x: 0, y: 1, z: 0 }
  let ux = worldUp.y * center.z - worldUp.z * center.y
  let uy = worldUp.z * center.x - worldUp.x * center.z
  let uz = worldUp.x * center.y - worldUp.y * center.x
  const uLen = Math.hypot(ux, uy, uz) || 1
  ux /= uLen
  uy /= uLen
  uz /= uLen
  let vx = center.y * uz - center.z * uy
  let vy = center.z * ux - center.x * uz
  let vz = center.x * uy - center.y * ux
  const vLen = Math.hypot(vx, vy, vz) || 1
  vx /= vLen
  vy /= vLen
  vz /= vLen

  const raw = constellation.stars.map((item) => ({
    id: item.id,
    x: item.x * ux + item.y * uy + item.z * uz,
    y: item.x * vx + item.y * vy + item.z * vz,
  }))
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity
  for (const point of raw) {
    minX = Math.min(minX, point.x)
    maxX = Math.max(maxX, point.x)
    minY = Math.min(minY, point.y)
    maxY = Math.max(maxY, point.y)
  }
  const spanX = maxX - minX || 1
  const spanY = maxY - minY || 1
  const scale = Math.min((width - pad * 2) / spanX, (height - pad * 2) / spanY)
  const midX = (minX + maxX) / 2
  const midY = (minY + maxY) / 2
  return {
    width,
    height,
    lines: constellation.lines,
    points: raw.map((point) => ({
      id: point.id,
      x: width / 2 + (point.x - midX) * scale,
      y: height / 2 - (point.y - midY) * scale,
    })),
  }
}
