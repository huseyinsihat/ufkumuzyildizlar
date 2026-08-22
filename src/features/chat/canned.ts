export interface CannedPrompt {
  id: string
  question: string
  answers: readonly [string, string, string]
  aliases?: readonly string[]
}

export const CANNED_PROMPTS: readonly CannedPrompt[] = [
  {
    id: 'sun-yellow',
    question: 'Neden sarı görünüyorsun?',
    answers: [
      'Aslında her rengi üretirim. Dünya’nın havası mavi ışığı dağıtır; gözüne daha çok sarı-beyaz gelir.',
      'Ben beyaza yakınım. Gökyüzü mavi ışığı dağıttığı için sen beni sarı gibi görürsün.',
      'Rengim tek bir boya değil. Hava ve gözün, ışığımın sarı tarafını daha net seçer.',
    ],
  },
  {
    id: 'light-travel',
    question: 'Işığın Dünya’ya ne kadar sürer?',
    answers: [
      'Işığım Dünya’ya yaklaşık 8 dakika 20 saniyede ulaşır. Şimdi gördüğün ışık, biraz önceki halimdir.',
      'Yaklaşık 8 dakika 20 saniye. Uzak olsam da ışık çok hızlı gider.',
      'Sekiz dakika yirmi saniye kadar. Güneş doğunca aslında o ışık yolda biraz gecikmiştir.',
    ],
  },
  {
    id: 'mars-red',
    question: 'Mars neden kırmızı?',
    answers: [
      'Yüzeyinde pas gibi demir oksit vardır. O toz gezegeni kırmızı gösterir.',
      'Mars’ın toprağında paslı demir vardır. Bu yüzden ona Kızıl Gezegen denir.',
      'Kırmızı boya değil; demir oksit tozu ışığı kırmızımsı yansıtır.',
    ],
  },
  {
    id: 'how-many-planets',
    question: 'Kaç gezegen var?',
    aliases: ['kaç tane gezegen var', 'gezegen sayısı kaç'],
    answers: [
      'Güneş Sistemi’nde 8 gezegen vardır: Merkür, Venüs, Dünya, Mars, Jüpiter, Satürn, Uranüs ve Neptün. Plüton cüce gezegendir.',
      'Sekiz tane. Plüton artık gezegen değil; yörüngesini paylaştığı için cüce gezegen sayılır.',
      'Sekiz gezegen dolanır. Plüton küçük bir cüce gezegendir, sekizli listeye girmez.',
    ],
  },
  {
    id: 'closest-planet',
    question: 'Sana en yakın gezegen hangisi?',
    aliases: ['güneşe en yakın gezegen', 'en yakın gezegen', 'en yakın gezegen hangisi'],
    answers: [
      'Merkür bana en yakındır. Yılı da en kısadır: yaklaşık 88 gün.',
      'En yakınım Merkür’dür. O yüzden Güneş’in yanında en hızlı dolanır.',
      'Merkür. Venüs daha parlak görünür ama sıra olarak Merkür daha yakındır.',
    ],
  },
  {
    id: 'farthest-planet',
    question: 'Güneş’e en uzak gezegen hangisi?',
    aliases: [
      'güneş e en uzak gezegen',
      'güneşe en uzak gezegen',
      'en uzak gezegen',
      'en uzak gezegen hangisi',
      'sana en uzak gezegen hangisi',
    ],
    answers: [
      'Neptün’dür. Sekiz gezegen içinde bana en uzak olan odur. Bir Neptün yılı Dünya’dan çok daha uzundur.',
      'En uzağım Neptün. Uranüs’ten sonra gelir; turu yaklaşık 165 Dünya yılı sürer.',
      'Neptün. Bana en yakın Merkür, en uzak Neptün’dür.',
    ],
  },
  {
    id: 'hottest-planet',
    question: 'En sıcak gezegen hangisi?',
    answers: [
      'Venüs’tür. Merkür daha yakın olsa da Venüs’ün kalın havası ısıyı hapseder.',
      'Venüs fırın gibidir. Sera etkisi yüzünden Merkür’den sıcaktır.',
      'En sıcak Venüs. Kalın karbondioksit örtüsü Güneş ısısını kaçırmaz.',
    ],
  },
  {
    id: 'biggest-planet',
    question: 'En büyük gezegen hangisi?',
    answers: [
      'Jüpiter’dir. Gaz devidir; üzerinde yürünecek katı bir yer yoktur.',
      'Jüpiter hepsinden büyüktür. Çok hızlı döner; bir günü yaklaşık 10 saattir.',
      'Jüpiter. O kadar büyüktür ki yerçekimi Dünya’dan daha güçlüdür.',
    ],
  },
  {
    id: 'saturn-rings',
    question: 'Satürn’ün halkası ne?',
    answers: [
      'Katı bir çember değil. Buz, kaya ve toz parçaları Satürn’ün etrafında dolanır.',
      'Halkalar milyonlarca küçük parçadır. Uzaktan tek bir şerit gibi görünür.',
      'Buz ve taş kırıntılarıdır. Jüpiter, Uranüs ve Neptün’ün de ince halkası vardır ama Satürn’ünkü daha belirgindir.',
    ],
  },
  {
    id: 'why-night',
    question: 'Gece neden olur?',
    answers: [
      'Dünya kendi ekseni etrafında döner. Senin tarafın bana bakınca gündüz, öbür taraf gece olur.',
      'Güneş batmaz. Dünya döner; sen karanlık tarafa geçersin.',
      'Gece, Dünya’nın dönüşüyledir. Işığım hep vardır; gezegenin bir yüzü gölgede kalır.',
    ],
  },
  {
    id: 'why-seasons',
    question: 'Mevsimler neden değişir?',
    answers: [
      'Dünya’nın ekseni biraz yatıktır. Yazın senin yarımküre bana daha dik bakar, kışın daha yatık.',
      'Yaz-kış Güneş’e yakınlıkla olmaz. Asıl neden eksen eğikliğidir.',
      'Dünya eğik durur. Bu yüzden bir yer uzun süre daha çok ışık alır, sonra daha az.',
    ],
  },
  {
    id: 'moon-light',
    question: 'Ay ışığını nereden alır?',
    answers: [
      'Ay kendi ışığını üretmez. Benim ışığımı yansıtır, sen de onu görürsün.',
      'Ay bir ayna gibidir. Parıltısı Güneş’ten gelir.',
      'Ay bir yıldız değildir. Gördüğün ay ışığı, yansıyan Güneş ışığıdır.',
    ],
  },
  {
    id: 'moon-same-face',
    question: 'Ay’ın hep aynı yüzü mü görünür?',
    answers: [
      'Evet. Ay’ın dönüşü ile Dünya etrafındaki dolanması neredeyse eşittir. Buna gelgit kilidi denir.',
      'Dünya’dan hep aynı yüzü görünür. Öbür yüzü de vardır; sadece buradan bakılmaz.',
      'Ay dönmez sanılır ama döner. Turu ile dönüşü aynı sürdüğü için aynı yüz kalır.',
    ],
  },
  {
    id: 'what-is-star',
    question: 'Yıldız nedir?',
    answers: [
      'Yıldız, kendi ışığını üreten çok sıcak bir gaz topudur. Ben de bir yıldızım.',
      'Gezegen ışığını benden alır. Yıldız ise kendi ışığını yapar.',
      'Gökyüzündeki o noktalar uzak güneşlerdir. Ben size en yakın olanıyım.',
    ],
  },
  {
    id: 'sun-not-planet',
    question: 'Sen gezegen misin?',
    answers: [
      'Hayır. Ben bir yıldızım. Gezegenler benim etrafımda dolanır ve ışık üretmez.',
      'Gezegen değilim. Kendi ışığımı üretirim; gezegenler onu yansıtır.',
      'Ben Güneş Sistemi’nin yıldızıyım. Merkür’den Neptün’e hepsi bana bağlı dolanır.',
    ],
  },
  {
    id: 'why-orbit',
    question: 'Gezegenler neden düşmez?',
    answers: [
      'Yerçekimim onları çeker, hızları da yana götürür. İkisi birlikte yörüngeyi tutar.',
      'İp ucundaki taş gibi: çekilirler ama yeterince hızlı gittikleri için üzerine düşmezler.',
      'Düşmemelerinin nedeni yerçekimi ile hızın dengesidir. Bu dengeye yörünge denir.',
    ],
  },
  {
    id: 'earth-year',
    question: 'Bir yıl ne demek?',
    aliases: ['yıl nedir', 'bir yıl kaç gün', 'yıl ne demek'],
    answers: [
      'Dünya’nın benim etrafımda bir tur atmasıdır. Bu yaklaşık 365 gün sürer.',
      'Yıl, Dünya’nın Güneş turudur. Gün ise Dünya’nın kendi etrafında bir dönüşüdür.',
      'Bir yıl dolanmak, bir gün dönmektir. İkisi farklı harekettir.',
    ],
  },
  {
    id: 'mercury-day',
    question: 'Merkür’de gün neden uzun?',
    answers: [
      'Merkür yavaş döner, bana yakın olduğu için yılı kısadır. Bir günü, bir yılından uzundur.',
      'Merkür’de Güneş’in doğup batması çok sürer. Turu ise 88 günde biter.',
      'Yakın olduğu için çabuk dolanır ama kendi etrafında ağır döner. O yüzden günü uzar.',
    ],
  },
  {
    id: 'venus-spin',
    question: 'Venüs neden ters döner?',
    answers: [
      'Venüs diğerlerinin tersine döner. Orada Güneş batıdan doğar gibi görünürdü.',
      'Dönüşü tersinedir. Nedeni eski bir çarpışma olabilir; kesin tek hikâye yok, emin konuşmam.',
      'Venüs hem çok yavaş hem ters döner. Bir Venüs günü, bir Venüs yılından uzundur.',
    ],
  },
  {
    id: 'jupiter-day',
    question: 'Jüpiter neden çabuk döner?',
    answers: [
      'Jüpiter gaz devidir ve çok hızlı döner. Bir günü yaklaşık 10 saattir.',
      'Büyük olsa da günü kısadır. Hızlı dönüş kuşaklarını da şerit şerit gösterir.',
      'Dünya gününden çok daha kısa bir günü vardır: kabaca 10 saat.',
    ],
  },
  {
    id: 'uranus-tilt',
    question: 'Uranüs neden yan durur?',
    answers: [
      'Ekseni neredeyse yana yatmıştır. Yine de döner ve benim etrafımda dolanır.',
      'Uranüs yan yatarak gezer. Kutupları sırayla bana bakar; mevsimleri çok uzundur.',
      'Yatık durması hareketi durdurmaz. Hem döner hem tur atar; ince halkaları da vardır.',
    ],
  },
  {
    id: 'neptune-wind',
    question: 'Neptün neden mavi?',
    answers: [
      'Havasındaki metan kırmızı ışığı yutar, mavi-yeşil kalır. En uzak gezegendir.',
      'Neptün buz devidir. Metan ona mavi rengi verir.',
      'Mavi boya değil. Metan gazı, gördüğün rengi değiştirir.',
    ],
  },
  {
    id: 'comet-tail',
    question: 'Kuyrukluyıldızın kuyruğu neden oluşur?',
    answers: [
      'Bana yaklaşınca buz ısınır, gaz ve toz uçar. Rüzgârım onları kuyruk gibi iter.',
      'Kuyruk her zaman arkada değil; çoğu zaman benden uzağa bakar.',
      'Soğukken sönük durur. Yaklaşınca ısınır ve kuyruk çıkar.',
    ],
  },
  {
    id: 'asteroid-belt',
    question: 'Asteroit kuşağı nedir?',
    answers: [
      'Mars ile Jüpiter arasında kalan kaya ve metal parçalarıdır. Gezegen olamamış kırıntılardır.',
      'Filmdeki gibi sık bir duvar değildir. Araları genelde çok boştur.',
      'Küçük cisimler orada dolanır. Büyük bir gezegen değil, birçok küçük taş.',
    ],
  },
  {
    id: 'how-many-stars',
    question: 'Gökyüzünde kaç yıldız var?',
    aliases: ['kaç yıldız vardı', 'kaç yıldız var', 'kaç tane yıldız var', 'yıldız sayısı kaç'],
    answers: [
      'Samanyolu’nda yüz milyarlarca yıldız vardır; ben de onlardan biriyim. Çıplak gözle gece birkaç bin tanesini görürsün.',
      'Gökada milyarlarca yıldız barındırır. Şehir ışığı yoksa binlercesini sayabilirsin; hepsini değil.',
      'Tek tek sayılmaz. Gökadamızda yüz milyarlarca yıldız vardır. Gözün gördüğü, çok küçük bir kısımdır.',
    ],
  },
  {
    id: 'milky-way',
    question: 'Samanyolu nedir?',
    aliases: ['samanyolu ne', 'samanyolu nedir'],
    answers: [
      'Bizim gökadamızdır. İçinde milyarlarca yıldız vardır; ben de onlardan biriyim.',
      'Gece süt gibi görünen bant, içeriden baktığın yıldız diskidir.',
      'Güneş Sistemi Samanyolu’nun bir kenarındadır. Gökyüzü tek bir çatı değil, kocaman bir şehir.',
    ],
  },
  {
    id: 'milky-way-planets',
    question: 'Samanyolu’nda kaç gezegen vardır?',
    aliases: [
      'samanyolunda kaç gezegen vardır',
      'samanyolunda kaç gezegen var',
      'samanyolu kaç gezegen',
      'samanyolu nda kaç gezegen',
    ],
    answers: [
      'Samanyolu’nda gezegen sayısı tek tek bilinmez. Yıldızların çoğunun yanında gezegen olabilir; milyarlarca olabilir.',
      'Güneş Sistemi’nde 8 gezegen vardır. Samanyolu ise kocaman bir gökada; içinde çok daha fazla gezegen saklanır.',
      'Kesin bir sayı yok. Gökadamızda milyarlarca gezegen olması beklenir; hepsini sayamayız.',
    ],
  },
  {
    id: 'constellation',
    question: 'Takımyıldız gerçek şekil mi?',
    answers: [
      'Hayır. Yıldızlar farklı uzaklıklardadır. Biz onları bir kâğıttaki resim gibi birleştiririz.',
      'Büyükayı bir tencere gibi durur ama yıldızları yan yana duran bir nesne değildir.',
      'Takımyıldız, gökyüzünü hatırlamak için çizilmiş bir haritadır.',
    ],
  },
  {
    id: 'eclipse',
    question: 'Güneş tutulması nasıl olur?',
    answers: [
      'Ay, Dünya ile benim arama girince gölgesi yere düşer. Kısa süre ışığım kesilir gibi olur.',
      'Ay benim önümü örter. Ay tutulmasında ise Dünya’nın gölgesi Ay’ın üstüne düşer.',
      'Tutulma sihir değil. Üç cisim aynı hizaya gelince gölge oluşur.',
    ],
  },
  {
    id: 'gravity-jump',
    question: 'Ay’da neden daha yükseğe zıplarız?',
    answers: [
      'Ay’ın yerçekimi Dünya’dakinin yaklaşık altıda biridir. Aynı kasla daha yükseğe çıkarsın.',
      'Yerçekimi her yerde vardır ama güçleri farklıdır. Ay küçük olduğu için daha zayıf çeker.',
      'Jüpiter’de tam tersi olur: daha güçlü çeker, daha yükseğe zıplanmaz.',
    ],
  },
  {
    id: 'atmosphere',
    question: 'Atmosfer neden önemli?',
    answers: [
      'Dünya’nın havası nefes almanı sağlar ve ısıyı tutar. Merkür’de hava neredeyse yoktur.',
      'Hava bir battaniye gibidir. Olmazsa gündüz aşırı ısınır, gece aşırı soğur.',
      'Venüs’te hava çok kalındır ve çok ısı tutar. Dünya’daki denge canlılar için uygundur.',
    ],
  },
  {
    id: 'sun-size',
    question: 'Sen Dünya’dan ne kadar büyüksün?',
    answers: [
      'Çapım Dünya’nın yaklaşık 109 katıdır. O yüzden gezegenler bana göre küçük kalır.',
      'Dünya’yı yan yana dizsen kabaca 109 tane gerekirdi. Kütlem de çok daha büyüktür.',
      'Büyüklüğüm yüzünden hepsini çekerim. Gezegenler benim etrafımda tur atar.',
    ],
  },
]

export function pickChipCount(): 2 {
  return 2
}

export function normalizeQuestion(text: string): string {
  return text
    .toLocaleLowerCase('tr-TR')
    .replace(/[?!.,;:'’]/g, '')
    .replace(/güneş\s+e\s+/g, 'güneşe ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function matchCanned(text: string): CannedPrompt | undefined {
  const needle = normalizeQuestion(text)
  if (!needle) return undefined
  const exact = CANNED_PROMPTS.find((item) => {
    if (normalizeQuestion(item.question) === needle) return true
    return Boolean(item.aliases?.some((alias) => normalizeQuestion(alias) === needle))
  })
  if (exact) return exact
  if (needle.includes('samanyol') && needle.includes('gezegen')) {
    return CANNED_PROMPTS.find((item) => item.id === 'milky-way-planets')
  }
  if (needle.includes('en uzak') && needle.includes('gezegen')) {
    return CANNED_PROMPTS.find((item) => item.id === 'farthest-planet')
  }
  if (needle.includes('en yakın') && needle.includes('gezegen')) {
    return CANNED_PROMPTS.find((item) => item.id === 'closest-planet')
  }
  return undefined
}

export function pickChipQuestions(
  askedQuestions: ReadonlySet<string>,
  random = Math.random,
  count = pickChipCount(),
): CannedPrompt[] {
  const asked = new Set([...askedQuestions].map(normalizeQuestion))
  const pool = CANNED_PROMPTS.filter((item) => !asked.has(normalizeQuestion(item.question)))
  const shuffled = [...pool]
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    const a = shuffled[i]
    const b = shuffled[j]
    if (!a || !b) continue
    shuffled[i] = b
    shuffled[j] = a
  }
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

export function pickCannedAnswer(question: string, random = Math.random): string | null {
  const item = matchCanned(question)
  if (!item) return null
  const index = Math.min(item.answers.length - 1, Math.floor(random() * item.answers.length))
  return item.answers[index] ?? item.answers[0]
}

export function findCanned(question: string): CannedPrompt | undefined {
  return matchCanned(question)
}
