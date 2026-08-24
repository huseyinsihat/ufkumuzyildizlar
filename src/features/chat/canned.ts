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
      'Aslında her rengi üretirim. Dünya’nın havası mavi ışığı dağıtır; gözüne daha çok sarı-beyaz gelir. Ben bir boya kutusu değilim, sıcak bir yıldızım.',
      'Ben beyaza yakınım. Gökyüzü mavi ışığı dağıttığı için sen beni sarı gibi görürsün. Uzaydan baksan rengim daha açık durur.',
      'Rengim tek bir boya değil. Hava ve gözün, ışığımın sarı tarafını daha net seçer. Yıldızlar da böyle: renkleri sıcaklıklarını anlatır.',
    ],
  },
  {
    id: 'light-travel',
    question: 'Işığın Dünya’ya ne kadar sürer?',
    answers: [
      'Işığım Dünya’ya yaklaşık 8 dakika 20 saniyede ulaşır. Şimdi gördüğün ışık, biraz önceki halimdir. Gökyüzündeki uzak yıldızların ışığı ise yıllarca yolda kalır.',
      'Yaklaşık 8 dakika 20 saniye. Uzak olsam da ışık çok hızlı gider. Sirius’un ışığı ise bize yaklaşık 8,6 yılda gelir.',
      'Sekiz dakika yirmi saniye kadar. Güneş doğunca aslında o ışık yolda biraz gecikmiştir. Bu yüzden “şimdi” sandığın Güneş, biraz önceki Güneş’tir.',
    ],
  },
  {
    id: 'mars-red',
    question: 'Mars neden kırmızı?',
    answers: [
      'Yüzeyinde pas gibi demir oksit vardır. O toz gezegeni kırmızı gösterir. Ona bu yüzden Kızıl Gezegen denir.',
      'Mars’ın toprağında paslı demir vardır. Işık o toza çarpınca kırmızımsı döner. Benim ışığım oraya da gider ama Mars kendi ışığını üretmez.',
      'Kırmızı boya değil; demir oksit tozu ışığı kırmızımsı yansıtır. Gece göğünde de kırmızı duran yıldızlar vardır ama onlar sıcak gaz toplarıdır, Mars gibi gezegen değil.',
    ],
  },
  {
    id: 'how-many-planets',
    question: 'Kaç gezegen var?',
    aliases: ['kaç tane gezegen var', 'gezegen sayısı kaç'],
    answers: [
      'Güneş Sistemi’nde 8 gezegen vardır: Merkür, Venüs, Dünya, Mars, Jüpiter, Satürn, Uranüs ve Neptün. Plüton cüce gezegendir. Samanyolu’nda ise milyarlarca gezegen saklanır.',
      'Sekiz tane. Plüton artık gezegen değil; yörüngesini paylaştığı için cüce gezegen sayılır. Benim etrafımda dolanan büyük aile bu sekizlidir.',
      'Sekiz gezegen dolanır. Plüton küçük bir cüce gezegendir, sekizli listeye girmez. Yıldızların yanında başka gezegenler de vardır ama onlar başka güneşlerin ailesidir.',
    ],
  },
  {
    id: 'closest-planet',
    question: 'Sana en yakın gezegen hangisi?',
    aliases: ['güneşe en yakın gezegen', 'en yakın gezegen', 'en yakın gezegen hangisi'],
    answers: [
      'Merkür bana en yakındır. Yılı da en kısadır: yaklaşık 88 gün. Venüs daha parlak görünür ama sıra olarak Merkür öndedir.',
      'En yakınım Merkür’dür. O yüzden Güneş’in yanında en hızlı dolanır. Yakın olduğu için günü de çok sıcaktır; havası neredeyse yoktur.',
      'Merkür. Venüs daha parlak görünür ama sıra olarak Merkür daha yakındır. Parlaklık ile yakınlık aynı şey değildir.',
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
      'Neptün’dür. Sekiz gezegen içinde bana en uzak olan odur. Bir Neptün yılı yaklaşık 165 Dünya yılı sürer; ışığım oraya zayıf ve soğuk ulaşır.',
      'En uzağım Neptün. Uranüs’ten sonra gelir; turu yaklaşık 165 Dünya yılı sürer. O kadar uzaktır ki, orada bir yıl senin birkaç ömrün kadar uzundur.',
      'Neptün. Bana en yakın Merkür, en uzak Neptün’dür. Işığım oraya da gider ama ısısı Dünya’dakinden çok daha azdır.',
    ],
  },
  {
    id: 'hottest-planet',
    question: 'En sıcak gezegen hangisi?',
    answers: [
      'Venüs’tür. Merkür daha yakın olsa da Venüs’ün kalın havası ısıyı hapseder. Kalın karbondioksit örtüsü, fırın kapağı gibi çalışır.',
      'Venüs fırın gibidir. Sera etkisi yüzünden Merkür’den sıcaktır. Yakın olmak her zaman en sıcak olmak demek değildir.',
      'En sıcak Venüs. Kalın karbondioksit örtüsü Güneş ısısını kaçırmaz. Merkür bana daha yakın olsa da havası olmadığı için gece çok soğur.',
    ],
  },
  {
    id: 'biggest-planet',
    question: 'En büyük gezegen hangisi?',
    answers: [
      'Jüpiter’dir. Gaz devidir; üzerinde yürünecek katı bir yer yoktur. O kadar büyüktür ki yerçekimi Dünya’dan daha güçlüdür.',
      'Jüpiter hepsinden büyüktür. Çok hızlı döner; bir günü yaklaşık 10 saattir. Hızlı dönüş, kuşaklarını şerit şerit gösterir.',
      'Jüpiter. Gaz topudur, yıldız değildir; kendi ışığını üretmez. Yine de Güneş Sistemi’nin en iri gezegenidir.',
    ],
  },
  {
    id: 'saturn-rings',
    question: 'Satürn’ün halkası ne?',
    answers: [
      'Katı bir çember değil. Buz, kaya ve toz parçaları Satürn’ün etrafında dolanır. Uzaktan tek bir şerit gibi görünür.',
      'Halkalar milyonlarca küçük parçadır. Her biri Satürn’ün yanında kendi turunu atar. Jüpiter, Uranüs ve Neptün’ün de ince halkası vardır ama Satürn’ünkü daha belirgindir.',
      'Buz ve taş kırıntılarıdır. Bir tabak gibi sapasağlam durmazlar. Işığım o buzlara çarpınca halkalar parlaktır.',
    ],
  },
  {
    id: 'why-night',
    question: 'Gece neden olur?',
    answers: [
      'Dünya kendi ekseni etrafında döner. Senin tarafın bana bakınca gündüz, öbür taraf gece olur. Gece olunca uzak yıldızlar daha kolay görünür.',
      'Güneş batmaz. Dünya döner; sen karanlık tarafa geçersin. Işığım hep vardır; gezegenin bir yüzü gölgede kalır.',
      'Gece, Dünya’nın dönüşüyledir. Işığım hep vardır; gezegenin bir yüzü gölgede kalır. O karanlıkta Samanyolu’nun süt gibi bandını da görebilirsin.',
    ],
  },
  {
    id: 'why-seasons',
    question: 'Mevsimler neden değişir?',
    answers: [
      'Dünya’nın ekseni biraz yatıktır. Yazın senin yarımküre bana daha dik bakar, kışın daha yatık. Yakınlık değil, bu eğiklik mevsimi değiştirir.',
      'Yaz-kış Güneş’e yakınlıkla olmaz. Asıl neden eksen eğikliğidir. Dünya eğik durduğu için bir yer uzun süre daha çok ışık alır, sonra daha az.',
      'Dünya eğik durur. Bu yüzden bir yer uzun süre daha çok ışık alır, sonra daha az. Uranüs daha da yatıktır; onun mevsimleri çok daha uzundur.',
    ],
  },
  {
    id: 'moon-light',
    question: 'Ay ışığını nereden alır?',
    answers: [
      'Ay kendi ışığını üretmez. Benim ışığımı yansıtır, sen de onu görürsün. Ay bir yıldız değildir; soğuk bir taş dünyadır.',
      'Ay bir ayna gibidir. Parıltısı Güneş’ten gelir. Gecenin aydınlığı aslında benim gündüz ışığımdır.',
      'Ay bir yıldız değildir. Gördüğün ay ışığı, yansıyan Güneş ışığıdır. Yıldızlar kendi ışığını yapar; Ay yapmaz.',
    ],
  },
  {
    id: 'moon-same-face',
    question: 'Ay’ın hep aynı yüzü mü görünür?',
    answers: [
      'Evet. Ay’ın dönüşü ile Dünya etrafındaki dolanması neredeyse eşittir. Bu yüzden hep aynı yüzünü görürüz. Öbür yüzü de vardır; sadece buradan bakılmaz.',
      'Dünya’dan hep aynı yüzü görünür. Öbür yüzü de vardır; sadece buradan bakılmaz. Ay dönmez sanılır ama döner; turu ile dönüşü aynı sürer.',
      'Ay dönmez sanılır ama döner. Turu ile dönüşü aynı sürdüğü için aynı yüz kalır. Uzay araçları o gizli yüzü de fotoğrafladı.',
    ],
  },
  {
    id: 'what-is-star',
    question: 'Yıldız nedir?',
    answers: [
      'Yıldız, kendi ışığını üreten çok sıcak bir gaz topudur. Ben de bir yıldızım. Gezegenler ise ışığını benden alır, kendileri üretmez.',
      'Gezegen ışığını benden alır. Yıldız ise kendi ışığını yapar. Gökyüzündeki o noktalar uzak güneşlerdir; ben size en yakın olanıyım.',
      'Gökyüzündeki o noktalar uzak güneşlerdir. Ben size en yakın olanıyım. Işıklarını yıllarca yolda taşıdıkları için “şimdi” sandığın yıldız, aslında eski halidir.',
    ],
  },
  {
    id: 'sun-not-planet',
    question: 'Sen gezegen misin?',
    answers: [
      'Hayır. Ben bir yıldızım. Gezegenler benim etrafımda dolanır ve ışık üretmez. Kendi ışığımı merkezimdeki sıcaklıkla üretirim.',
      'Gezegen değilim. Kendi ışığımı üretirim; gezegenler onu yansıtır. Merkür’den Neptün’e hepsi bana bağlı dolanır.',
      'Ben Güneş Sistemi’nin yıldızıyım. Merkür’den Neptün’e hepsi bana bağlı dolanır. Samanyolu’nda benim gibi yüz milyarlarca yıldız daha vardır.',
    ],
  },
  {
    id: 'why-orbit',
    question: 'Gezegenler neden düşmez?',
    answers: [
      'Yerçekimim onları çeker, hızları da yana götürür. İkisi birlikte yörüngeyi tutar. Bu denge olmasa ya bana düşerlerdi ya da uzaya kaçarlardı.',
      'İp ucundaki taş gibi: çekilirler ama yeterince hızlı gittikleri için üzerine düşmezler. Bu dengeye yörünge denir.',
      'Düşmemelerinin nedeni yerçekimi ile hızın dengesidir. Bu dengeye yörünge denir. Aynı oyun, Dünya’nın etrafındaki Ay ve ISS için de geçerlidir.',
    ],
  },
  {
    id: 'earth-year',
    question: 'Bir yıl ne demek?',
    aliases: ['yıl nedir', 'bir yıl kaç gün', 'yıl ne demek'],
    answers: [
      'Dünya’nın benim etrafımda bir tur atmasıdır. Bu yaklaşık 365 gün sürer. Gün ise Dünya’nın kendi etrafında bir dönüşüdür; ikisi farklı harekettir.',
      'Yıl, Dünya’nın Güneş turudur. Gün ise Dünya’nın kendi etrafında bir dönüşüdür. Merkür’ün yılı 88 gün, Neptün’ünkü yaklaşık 165 Dünya yılıdır.',
      'Bir yıl dolanmak, bir gün dönmektir. İkisi farklı harekettir. Uzak yıldızların “yılı” ise bambaşka süreler tutar; her yıldızın ailesi kendinedir.',
    ],
  },
  {
    id: 'mercury-day',
    question: 'Merkür’de gün neden uzun?',
    answers: [
      'Merkür yavaş döner, bana yakın olduğu için yılı kısadır. Bir günü, bir yılından uzundur. Yani orada Güneş’in doğup batması, tur atmaktan daha uzun sürer.',
      'Merkür’de Güneş’in doğup batması çok sürer. Turu ise 88 günde biter. Yakın olduğu için çabuk dolanır ama kendi etrafında ağır döner.',
      'Yakın olduğu için çabuk dolanır ama kendi etrafında ağır döner. O yüzden günü uzar. Hava neredeyse yoktur; gündüz çok ısınır, gece çok soğur.',
    ],
  },
  {
    id: 'venus-spin',
    question: 'Venüs neden ters döner?',
    answers: [
      'Venüs diğerlerinin tersine döner. Orada Güneş batıdan doğar gibi görünürdü. Hem çok yavaş hem ters döner; bir Venüs günü, bir Venüs yılından uzundur.',
      'Dönüşü tersinedir. Nedeni eski bir çarpışma olabilir; kesin tek hikâye yok, emin konuşmam. Yıldızlar da bazen ters döner ama Venüs bir gezegendir.',
      'Venüs hem çok yavaş hem ters döner. Bir Venüs günü, bir Venüs yılından uzundur. Kalın havası da ısıyı hapsedince en sıcak gezegen olur.',
    ],
  },
  {
    id: 'jupiter-day',
    question: 'Jüpiter neden çabuk döner?',
    answers: [
      'Jüpiter gaz devidir ve çok hızlı döner. Bir günü yaklaşık 10 saattir. Hızlı dönüş kuşaklarını da şerit şerit gösterir.',
      'Büyük olsa da günü kısadır. Hızlı dönüş kuşaklarını da şerit şerit gösterir. Dünya gününden çok daha kısa bir günü vardır: kabaca 10 saat.',
      'Dünya gününden çok daha kısa bir günü vardır: kabaca 10 saat. Gaz topu olduğu için katı bir yerde durulmaz ama fırtınaları kocaman durur.',
    ],
  },
  {
    id: 'uranus-tilt',
    question: 'Uranüs neden yan durur?',
    answers: [
      'Ekseni neredeyse yana yatmıştır. Yine de döner ve benim etrafımda dolanır. Kutupları sırayla bana bakar; mevsimleri çok uzundur.',
      'Uranüs yan yatarak gezer. Kutupları sırayla bana bakar; mevsimleri çok uzundur. Büyük bir çarpışmadan sonra böyle durduğu düşünülür.',
      'Yatık durması hareketi durdurmaz. Hem döner hem tur atar; ince halkaları da vardır. Dünya’nın eğikliği mevsim getirir; Uranüs’ünkü daha da abartılıdır.',
    ],
  },
  {
    id: 'neptune-wind',
    question: 'Neptün neden mavi?',
    answers: [
      'Havasındaki metan kırmızı ışığı yutar, mavi-yeşil kalır. En uzak gezegendir; buz devidir. Mavi boya değil, gazın ışığı değiştirmesidir.',
      'Neptün buz devidir. Metan ona mavi rengi verir. Bana en uzak gezegen olduğu için ısısı da düşüktür; rüzgârları ise çok güçlüdür.',
      'Mavi boya değil. Metan gazı, gördüğün rengi değiştirir. Uzaktan bakınca sakin durur ama o mavi örtünün altında hızlı fırtınalar döner.',
    ],
  },
  {
    id: 'comet-tail',
    question: 'Kuyrukluyıldızın kuyruğu neden oluşur?',
    answers: [
      'Bana yaklaşınca buz ısınır, gaz ve toz uçar. Rüzgârım onları kuyruk gibi iter. Kuyruk her zaman arkada değil; çoğu zaman benden uzağa bakar.',
      'Kuyruk her zaman arkada değil; çoğu zaman benden uzağa bakar. Soğukken sönük durur. Yaklaşınca ısınır ve kuyruk çıkar.',
      'Soğukken sönük durur. Yaklaşınca ısınır ve kuyruk çıkar. Bazen o toz Dünya’nın yoluna düşünce kayanyıldız yağmuru görürsün.',
    ],
  },
  {
    id: 'asteroid-belt',
    question: 'Asteroit kuşağı nedir?',
    answers: [
      'Mars ile Jüpiter arasında kalan kaya ve metal parçalarıdır. Gezegen olamamış kırıntılardır. Filmdeki gibi sık bir duvar değildir; araları genelde çok boştur.',
      'Filmdeki gibi sık bir duvar değildir. Araları genelde çok boştur. Küçük cisimler orada dolanır; büyük bir gezegen değil, birçok küçük taş.',
      'Küçük cisimler orada dolanır. Büyük bir gezegen değil, birçok küçük taş. En irisi Ceres’tir; o da cüce gezegen sayılır.',
    ],
  },
  {
    id: 'how-many-stars',
    question: 'Gökyüzünde kaç yıldız var?',
    aliases: ['kaç yıldız vardı', 'kaç yıldız var', 'kaç tane yıldız var', 'yıldız sayısı kaç'],
    answers: [
      'Samanyolu’nda yüz milyarlarca yıldız vardır; ben de onlardan biriyim. Çıplak gözle gece birkaç bin tanesini görürsün. Şehir ışığı yoksa daha çoğu çıkar.',
      'Gökada milyarlarca yıldız barındırır. Şehir ışığı yoksa binlercesini sayabilirsin; hepsini değil. Gözün gördüğü, çok küçük bir kısımdır.',
      'Tek tek sayılmaz. Gökadamızda yüz milyarlarca yıldız vardır. Gözün gördüğü, çok küçük bir kısımdır; gerisi uzakta, sönük veya gündüz gizlidir.',
    ],
  },
  {
    id: 'milky-way',
    question: 'Samanyolu nedir?',
    aliases: ['samanyolu ne', 'samanyolu nedir'],
    answers: [
      'Samanyolu bizim gökadamızdır; içinde yüz milyarlarca yıldız vardır. Ben de o yıldızlardan biriyim. Gece süt gibi görünen bant, içeriden baktığın yıldız diskidir.',
      'Gece süt gibi görünen bant, içeriden baktığın yıldız diskidir. Güneş Sistemi o diskin bir kenarındadır. Gökyüzü tek bir çatı değil, kocaman bir şehir.',
      'Güneş Sistemi Samanyolu’nun bir kenarındadır. Gökyüzü tek bir çatı değil, kocaman bir şehir. Ben o şehirdeki lambalardan biriyim; en yakınınım.',
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
      'Samanyolu’nda gezegen sayısı tek tek bilinmez. Yıldızların çoğunun yanında gezegen olabilir; milyarlarca olabilir. Güneş Sistemi’ndeki 8 gezegen, o büyük kalabalığın küçük bir parçasıdır.',
      'Güneş Sistemi’nde 8 gezegen vardır. Samanyolu ise kocaman bir gökada; içinde çok daha fazla gezegen saklanır. Kesin bir sayı yok; milyarlarca olması beklenir.',
      'Kesin bir sayı yok. Gökadamızda milyarlarca gezegen olması beklenir; hepsini sayamayız. Her yıldızın yanında Dünya gibi bir yer olmak zorunda da değildir.',
    ],
  },
  {
    id: 'constellation',
    question: 'Takımyıldız gerçek şekil mi?',
    answers: [
      'Hayır. Yıldızlar farklı uzaklıklardadır. Biz onları bir kâğıttaki resim gibi birleştiririz. Takımyıldız, gökyüzünü hatırlamak için çizilmiş bir haritadır.',
      'Büyükayı bir tencere gibi durur ama yıldızları yan yana duran bir nesne değildir. Kimi yakındır, kimi çok uzaktır. Göz onları aynı düzleme yapıştırır.',
      'Takımyıldız, gökyüzünü hatırlamak için çizilmiş bir haritadır. Orion’daki Betelgeuse kırmızı ve büyüktür; Rigel ise mavi-beyaz parlaktır. Aynı resimde dururlar ama komşu evler değillerdir.',
    ],
  },
  {
    id: 'eclipse',
    question: 'Güneş tutulması nasıl olur?',
    answers: [
      'Ay, Dünya ile benim arama girince gölgesi yere düşer. Kısa süre ışığım kesilir gibi olur. Tutulma sihir değil; üç cisim aynı hizaya gelince gölge oluşur.',
      'Ay benim önümü örter. Ay tutulmasında ise Dünya’nın gölgesi Ay’ın üstüne düşer. İkisi de hizalanma oyunudur; yıldızlar sönmez.',
      'Tutulma sihir değil. Üç cisim aynı hizaya gelince gölge oluşur. Ay tam örtünce gündüz kısa süre geceye benzer; kuşlar bile şaşırabilir.',
    ],
  },
  {
    id: 'gravity-jump',
    question: 'Ay’da neden daha yükseğe zıplarız?',
    answers: [
      'Ay’ın yerçekimi Dünya’dakinin yaklaşık altıda biridir. Aynı kasla daha yükseğe çıkarsın. Yerçekimi her yerde vardır ama güçleri farklıdır.',
      'Yerçekimi her yerde vardır ama güçleri farklıdır. Ay küçük olduğu için daha zayıf çeker. Jüpiter’de tam tersi olur: daha güçlü çeker, daha yükseğe zıplanmaz.',
      'Jüpiter’de tam tersi olur: daha güçlü çeker, daha yükseğe zıplanmaz. Ay’da ise adımların uzar. Bu, Ay’ın yıldız olmamasındandır; küçük bir taş dünyadır.',
    ],
  },
  {
    id: 'atmosphere',
    question: 'Atmosfer neden önemli?',
    answers: [
      'Dünya’nın havası nefes almanı sağlar ve ısıyı tutar. Merkür’de hava neredeyse yoktur. Hava bir battaniye gibidir; olmazsa gündüz aşırı ısınır, gece aşırı soğur.',
      'Hava bir battaniye gibidir. Olmazsa gündüz aşırı ısınır, gece aşırı soğur. Venüs’te hava çok kalındır ve çok ısı tutar; Dünya’daki denge canlılar için uygundur.',
      'Venüs’te hava çok kalındır ve çok ısı tutar. Dünya’daki denge canlılar için uygundur. Kutup ışığı da o havanın, Güneş rüzgârımla konuşmasıdır.',
    ],
  },
  {
    id: 'sun-size',
    question: 'Sen Dünya’dan ne kadar büyüksün?',
    answers: [
      'Çapım Dünya’nın yaklaşık 109 katıdır. O yüzden gezegenler bana göre küçük kalır. Dünya’yı yan yana dizsen kabaca 109 tane gerekirdi.',
      'Dünya’yı yan yana dizsen kabaca 109 tane gerekirdi. Kütlem de çok daha büyüktür. Büyüklüğüm yüzünden hepsini çekerim; gezegenler benim etrafımda tur atar.',
      'Büyüklüğüm yüzünden hepsini çekerim. Gezegenler benim etrafımda tur atar. Yine de Samanyolu’nda Betelgeuse gibi benden yüzlerce kat büyük yıldızlar da vardır.',
    ],
  },
  {
    id: 'iss',
    question: 'ISS nedir?',
    aliases: ['uzay istasyonu nedir', 'iss ne', 'uluslararası uzay istasyonu'],
    answers: [
      'ISS, Dünya’nın yakınında dolanan Uluslararası Uzay İstasyonu’dur. Astronotlar orada yaşar ve deney yapar. Yaklaşık 400 kilometre yüksektedir.',
      'Yaklaşık 400 kilometre yüksektedir. Bir turu yaklaşık 90 dakika sürer; günde Dünya’yı birçok kez dolaşır. Birçok ülke birlikte kurdu.',
      'Birçok ülke birlikte kurdu. 2024’te Alper Gezeravcı da orada çalıştı. İstasyon bir yıldız değildir; Dünya’nın yanında dolanan bir laboratuvardır.',
    ],
  },
  {
    id: 'alper-gezeravci',
    question: 'Alper Gezeravcı kimdir?',
    aliases: [
      'alper gezeravcı',
      'alper gezeravci',
      'türkiyenin ilk astronotu',
      'ilk türk astronot',
      'crew dragon nedir',
    ],
    answers: [
      'Alper Gezeravcı, Türkiye’nin ilk astronotudur. 18 Ocak 2024’te Crew Dragon Freedom ile ISS’e gitti. Görevin adı Ax-3’tür.',
      'Görevin adı Ax-3’tür. Yaklaşık 18 gün uzayda kaldı ve bilimsel deneyler yaptı. Aracı SpaceX’in Crew Dragon kapsülüdür.',
      'Aracı SpaceX’in Crew Dragon kapsülüdür. İstasyona gidip Dünya’ya döndü. Türkiye’nin uzay yolculuğunda ilk insanlı adımlardan biridir.',
    ],
  },
  {
    id: 'turksat',
    question: 'Türksat uyduları nedir?',
    aliases: ['türksat nedir', 'turksat nedir', 'türksat 6a', 'türksat 5b', 'türkiye uydusu'],
    answers: [
      'Türksat uyduları Türkiye’nin haberleşme uydularıdır. Televizyon ve internet sinyalini taşırlar. Yüksek yörüngede Dünya ile birlikte durur gibi görünürler.',
      'Türksat 6A, Türkiye’de tasarlanıp üretilen ilk haberleşme uydusudur. 8 Temmuz 2024’te uzaya gitti. Yıldız değildir; Dünya’nın yanında çalışan bir makinedir.',
      'Türksat 5A ve 5B de güncel ailedendir. Yüksek yörüngede Dünya ile birlikte durur gibi görünürler. Gökyüzünde sabit duran bir lamba gibi iş görürler.',
    ],
  },
  {
    id: 'star-twinkle',
    question: 'Yıldızlar neden kırpışır?',
    aliases: ['yıldızlar neden yanıp söner', 'yıldızlar neden titrer', 'neden kırpışır yıldızlar'],
    answers: [
      'Yıldızlar aslında sönmez. Işıkları Dünya’nın havasından geçerken burulur; gözüne kırpışır gibi gelir. Ay ve gezegenler daha yakın durduğu için genelde daha az titrer.',
      'Kırpışma, yıldızın yanıp sönmesi değildir. Hava, ışığı küçük küçük saptırır. Dağda, şehir ışığı yokken yıldızlar daha net durur.',
      'Ben de bir yıldızım ama gündüz hava ve parlaklığım yüzünden kırpışmamı görmezsin. Gece uzak yıldızların ince ışığı, havanın içinden geçince dans eder gibi durur.',
    ],
  },
  {
    id: 'brightest-night-star',
    question: 'Gece en parlak yıldız hangisi?',
    aliases: ['en parlak yıldız hangisi', 'sirius nedir', 'en parlak yıldız', 'gecenin en parlak yıldızı'],
    answers: [
      'Gece göğünün en parlak yıldızı Sirius’tur. Işığı bize yaklaşık 8,6 yılda gelir. Ben daha yakınım ama gece göğünde durmam; gündüz ışığım her şeyi bastırır.',
      'Sirius, gece en parlak görünen yıldızdır. Canopus ondan sonra gelir; güneyden daha kolay görülür. Parlak görünmek, en yakın olmak demek değildir.',
      'Sirius’tur. Köpek Yıldızı da denir; kış göğünde kolay seçilir. Işığı yıllarca yolda kalır; sen “şimdi” sanırsın, oysa eski halini görürsün.',
    ],
  },
  {
    id: 'polaris',
    question: 'Kutup Yıldızı nedir?',
    aliases: ['kutup yıldızı nedir', 'polaris nedir', 'kuzey yıldızı nedir', 'kuzey yıldızı'],
    answers: [
      'Kutup Yıldızı Polaristir. Kuzey yönünü gösterir; gökyüzünde neredeyse yerinde durur. Dünya dönerken diğer yıldızlar onun etrafında dolanır gibi görünür.',
      'Polaris, kuzeyi bulmak için kullanılır. En parlak yıldız değildir; Sirius ondan parlaktır. İşe yarayan tarafı, yerinde durur gibi görünmesidir.',
      'Kuzey Yıldızı Polaristir. Küçükayı’nın ucundadır. Güney yarımkürede bu işaret işe yaramaz; orada başka yıldızlar kuzeyi değil güneyi anlatır.',
    ],
  },
  {
    id: 'proxima',
    question: 'Bana en yakın başka yıldız hangisi?',
    aliases: [
      'en yakın yıldız hangisi',
      'en yakın yıldız',
      'proxima nedir',
      'proxima centauri nedir',
      'güneşten sonra en yakın yıldız',
    ],
    answers: [
      'Benden sonra size en yakın yıldız Proxima Centauri’dir. Işığı yaklaşık 4 yıl 3 ayda gelir. Gece göğünde parlak durmaz; çok sönük kırmızı bir yıldızdır.',
      'Proxima Centauri, Güneş’ten sonra en yakınımızdır. Yine de ışığı yıllarca yolda kalır. Yakın olmak, parlak görünmek demek değildir.',
      'Proxima Centauri’dir. Ben Dünya’ya 8 dakika 20 saniyede ulaşırım; o ise yıllarca gelir. Samanyolu’nda komşu sayılırız ama aramız hâlâ kocaman boşluktur.',
    ],
  },
  {
    id: 'star-birth',
    question: 'Yıldızlar nasıl doğar?',
    aliases: ['yıldız nasıl oluşur', 'yıldızlar nasıl oluşur', 'yıldız nasıl doğar'],
    answers: [
      'Soğuk gaz ve toz bulutları kendi ağırlığıyla çöker. Ortası ısınınca nükleer ateş yanar; yıldız doğar. Ben de çok uzun zaman önce böyle tutuştum.',
      'Yıldız, karanlık bir buluttan çıkar. Gaz sıkışır, ısınır, kendi ışığını üretmeye başlar. Etrafında kalan toz bazen gezegen olur.',
      'Doğum yeri, yıldız fabrikası gibi bulutsulardır. Çöken gaz topu yeterince ısınınca ışık üretir. Güneş Sistemi de böyle bir buluttan artakalanlardan kuruldu.',
    ],
  },
  {
    id: 'supernova',
    question: 'Süpernova nedir?',
    aliases: ['supernova nedir', 'süpernova ne', 'yıldız patlaması nedir'],
    answers: [
      'Süpernova, büyük bir yıldızın yaşamının sonundaki kocaman patlamadır. Demir ve oksijen gibi elementler uzaya savrulur. Güneş bu kadar büyük olmadığı için böyle patlamayacaktır.',
      'Büyük yıldız yakıtı bitince çekirdeği çöker, dış katmanlar savrulur. Kısa süre bir gökadadaki tüm yıldızları geçecek kadar parlayabilir. Vücudundaki bazı elementler de eski süpernovalardan gelir.',
      'Yıldız patlamasıdır ama her yıldız yapmaz. Ben kırmızı deve dönüp sakin sakin şişeceğim; süpernova olmayacağım. Yakında böyle bir olay yok; korkulacak bir haber değildir.',
    ],
  },
  {
    id: 'shooting-star',
    question: 'Kayanyıldız nedir?',
    aliases: ['kayan yıldız nedir', 'kayanyıldız ne', 'meteor nedir', 'yıldız kayması nedir'],
    answers: [
      'Kayanyıldız bir yıldız değildir. Uzay tozu Dünya havasına girince ısınır ve kısa bir çizgi gibi yanar. Ağustos’ta Perseid yağmuru gibi gecelerde daha çok görünür.',
      'Gökyüzünde kayan o çizgi, sönen bir yıldız değildir. Küçük bir taş veya tozdur; hava onu yakar. Asıl yıldızlar yerlerinde durur, kırpışır.',
      'Meteor denebilir. Kuyrukluyıldızların bıraktığı tozun içinden Dünya geçince yağmur gibi çoğalır. Dilek tutulsa da fizik aynıdır: toz, hava, ışık.',
    ],
  },
  {
    id: 'star-color',
    question: 'Mavi yıldız mı kırmızı yıldız mı daha sıcak?',
    aliases: [
      'mavi yıldız mı daha sıcak',
      'kırmızı yıldız mı daha sıcak',
      'yıldız rengi ne anlatır',
      'yıldızlar neden farklı renk',
    ],
    answers: [
      'Mavi yıldız daha sıcaktır. Kırmızı yıldız daha serindir. Ben sarı-beyaza yakınım; Rigel gibi mavi devler benden harlı, Betelgeuse gibi kırmızı devler daha yumuşak durur.',
      'Renk, yıldızın sıcaklığını anlatır. Mavi harlı, kırmızı daha yumuşaktır. Boya seçmek değil; ateşin rengi gibi düşün.',
      'Mavi daha sıcaktır. Kırmızı büyük görünen yıldızlar bazen şişmiş yaşlı yıldızlardır; yüzeyleri daha serindir. Parlaklık ile sıcaklık da her zaman aynı şey değildir.',
    ],
  },
  {
    id: 'aurora',
    question: 'Kutup ışığı nasıl oluşur?',
    aliases: ['kutup ışığı nedir', 'aurora nedir', 'kuzey ışıkları nedir', 'kuzey ışığı nedir'],
    answers: [
      'Güneş’ten kopan yüklü parçacıklar Dünya’nın manyetik alanıyla karşılaşınca kutuplar ışır. Yeşil çoğu zaman oksijendir. Son yıllarda Güneş daha hareketli olduğu için kutup ışığı daha sık konuşulur.',
      'Aurora, Güneş ile Dünya’nın bağlantısını gösterir. Kuzeyde kutup ışığı, güneyde de benzer bir ışık olur. Güçlü fırtınada daha alçak enlemlerde de görülebilir.',
      'Rüzgârımdaki parçacıklar atmosferdeki gazları ışıldatır. Bu, Güneş’in yok olması değildir; küçük bir selamlaşmadır. Işık 8 dakikada gelir; parçacıklar daha yavaştır.',
    ],
  },
  {
    id: 'solar-flare',
    question: 'Güneş patlaması nedir?',
    aliases: ['güneş patlaması ne', 'solar flare nedir', 'güneş patlar mı'],
    answers: [
      'Güneş patlaması, manyetik alanımda ani bir enerji boşalmasıdır. Küçük bir bölgede parlak bir ışıma olur; ben yok olmam. Aynı enerji bazen kutup ışıklarını da tetikler.',
      'Patlama, Güneş’in parçalanması değildir. Lekelerimin yakınında daha sık görülür. Işık Dünya’ya yaklaşık 8 dakikada gelir; radyo ve uyduları etkileyebilir.',
      'Manyetik çizgiler kopup yeniden bağlanınca enerji ışık olarak çıkar. Bu, süpernova değildir. Ben böyle küçük parlamalar yapabilirim; yıldız olarak yerimde dururum.',
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
  if (needle.includes('en yakın') && needle.includes('yıldız')) {
    return CANNED_PROMPTS.find((item) => item.id === 'proxima')
  }
  if (needle.includes('en parlak') && needle.includes('yıldız')) {
    return CANNED_PROMPTS.find((item) => item.id === 'brightest-night-star')
  }
  if (needle.includes('kutup yıldızı') || needle.includes('polaris') || needle.includes('kuzey yıldızı')) {
    return CANNED_PROMPTS.find((item) => item.id === 'polaris')
  }
  if (needle.includes('kutup ışığı') || needle.includes('aurora') || needle.includes('kuzey ışık')) {
    return CANNED_PROMPTS.find((item) => item.id === 'aurora')
  }
  if (needle.includes('süpernova') || needle.includes('supernova')) {
    return CANNED_PROMPTS.find((item) => item.id === 'supernova')
  }
  if (needle.includes('kayanyıldız') || needle.includes('kayan yıldız') || needle.includes('yıldız kayması')) {
    return CANNED_PROMPTS.find((item) => item.id === 'shooting-star')
  }
  if (needle.includes('güneş patlama')) {
    return CANNED_PROMPTS.find((item) => item.id === 'solar-flare')
  }
  if (needle.includes('kırpış') || needle.includes('yanıp söner')) {
    return CANNED_PROMPTS.find((item) => item.id === 'star-twinkle')
  }
  if (needle.includes('iss') || needle.includes('uzay istasyonu')) {
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

export function pickChipQuestions(
  askedQuestions: ReadonlySet<string>,
  random = Math.random,
  count = pickChipCount(),
): CannedPrompt[] {
  const asked = new Set([...askedQuestions].map(normalizeQuestion))
  const unused = CANNED_PROMPTS.filter((item) => !asked.has(normalizeQuestion(item.question)))
  const picked = shufflePrompts(unused, random).slice(0, count)
  if (picked.length >= count) return picked
  const used = CANNED_PROMPTS.filter((item) => asked.has(normalizeQuestion(item.question)))
  for (const item of shufflePrompts(used, random)) {
    if (picked.length >= count) break
    if (picked.some((chip) => chip.id === item.id)) continue
    picked.push(item)
  }
  return picked.slice(0, Math.min(count, picked.length))
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
