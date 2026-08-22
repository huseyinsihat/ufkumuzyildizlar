import type { LabActivity, LabActivityId, LabRoomId } from '../types/lab'

export const LAB_ROOMS: { id: LabRoomId; title: string; blurb: string; tone: string }[] = [
  { id: 'motion', title: 'Hareket', blurb: 'Dönme, dolanma, yıl', tone: 'var(--amber)' },
  { id: 'earth', title: 'Dünya', blurb: 'Gece, gündüz, mevsim', tone: 'var(--cyan)' },
  { id: 'gravity', title: 'Yerçekimi', blurb: 'Düşme ve zıplama', tone: '#ff8a5b' },
  { id: 'scale', title: 'Ölçek', blurb: 'Uzay neden boş?', tone: '#b794f6' },
  { id: 'build', title: 'Kur + Ay', blurb: 'Yörünge ve dolunay', tone: '#f6e05e' },
  { id: 'sky', title: 'Gökyüzü', blurb: 'Yıldızlar mı kayıyor?', tone: '#7ee0ff' },
]

export const LAB_ACTIVITIES: LabActivity[] = [
  {
    id: 'earth-year',
    room: 'motion',
    title: 'Bir Dünya yılı',
    question: 'Dünya 1 tur atınca diğer gezegenler ne yapar?',
    watchHint: '1 yılı başlat. Yakın gezegenler daha çok tur atar.',
    choices: [
      { id: 'inner', label: 'Yakın gezegenler daha çok tur atar' },
      { id: 'same', label: 'Hepsi 1 tur atar' },
    ],
    simulateLabel: '1 yılı başlat',
    resultTitle: 'Dünya 1 turunu tamamladı',
    explain:
      'Güneş’e yakın gezegenlerin yılı daha kısadır. Bir Dünya yılında Merkür birkaç tur atar; uzak gezegenler bir turu bitiremez.',
    uses3d: true,
  },
  {
    id: 'who-faster',
    room: 'motion',
    title: 'Yıl yarışı',
    question: 'Kim önce tur atar: Merkür mü, Dünya mı?',
    watchHint: 'Yarışı başlat. Kim önce turunu bitirir?',
    choices: [
      { id: 'mercury', label: 'Merkür' },
      { id: 'earth', label: 'Dünya' },
      { id: 'same', label: 'Aynı anda' },
    ],
    simulateLabel: 'Dene',
    resultTitle: 'Merkür turunu önce bitirdi',
    explain:
      'Merkür Güneş’e daha yakındır. Bir turu yaklaşık 88 gündür; Dünya’nınki 365 gün.',
    featured: true,
    uses3d: true,
  },
  {
    id: 'spin-vs-orbit',
    room: 'motion',
    title: 'Dönüyor mu, dolanıyor mu?',
    question: 'Gece ve gündüz için Dünya ne yapmalı?',
    watchHint: 'Dönmeyi ve dolanmayı tek tek durdur. Gece-gündüz hangisinde kaybolur?',
    choices: [
      { id: 'spin', label: 'Kendi etrafında dönmesi' },
      { id: 'orbit', label: 'Güneş etrafında dolanması' },
      { id: 'both', label: 'İkisi birden' },
    ],
    simulateLabel: 'Anahtarları dene',
    resultTitle: 'Dönme ≠ dolanma',
    explain:
      'Dönme gece ve gündüzü yapar. Dolanma bir yılı yapar.',
    uses3d: true,
  },
  {
    id: 'day-night',
    room: 'earth',
    title: 'Gece ve gündüz',
    question: 'İstanbul ve Diyarbakır aynı anda mı gece olur?',
    watchHint: 'Camgöbeği İstanbul, amber Diyarbakır. Geceye birlikte mi giriyorlar?',
    choices: [
      { id: 'same', label: 'Evet, neredeyse aynı anda' },
      { id: 'diff', label: 'Hayır, saatlerce fark var' },
    ],
    simulateLabel: 'Gördüm',
    resultTitle: 'Gece ve gündüz dönmeden doğar',
    explain:
      'Güneş bir tarafı aydınlatır. Dünya dönünce İstanbul ve Diyarbakır neredeyse birlikte geceye girer.',
    uses3d: true,
  },
  {
    id: 'mass-weight',
    room: 'gravity',
    title: 'Kütlem değişir mi?',
    question: 'Ay’a gidince kütlen değişir mi?',
    watchHint: 'Kilonu seç. Ay’da his değişir, kütle aynı kalır.',
    choices: [
      { id: 'yes', label: 'Evet' },
      { id: 'no', label: 'Hayır' },
    ],
    simulateLabel: 'Ağırlığı göster',
    resultTitle: 'Kütle aynı kalır',
    explain:
      'Kütlen aynı kalır: maddenin miktarı değişmez. Ay’da yerçekimi daha zayıf olduğu için daha hafif hissedersin.',
    uses3d: true,
  },
  {
    id: 'drop-ball',
    room: 'gravity',
    title: 'Kim önce düşer?',
    question: 'Aynı top nerede önce yere düşer?',
    watchHint: 'Topları bırak. Aynı yükseklikten hangisi önce düşer?',
    choices: [
      { id: 'moon', label: 'Ay' },
      { id: 'earth', label: 'Dünya' },
      { id: 'jupiter', label: 'Jüpiter' },
    ],
    simulateLabel: 'Topları bırak',
    resultTitle: 'Jüpiter’de top daha çabuk düşer',
    explain:
      'Yerçekimi büyüdükçe top daha çabuk düşer. Jüpiter’de en güçlüdür; Ay’da en yavaş düşer.',
    featured: true,
    uses3d: true,
  },
  {
    id: 'jump',
    room: 'gravity',
    title: 'Nerede daha yükseğe?',
    question: 'Nerede daha yükseğe zıplarsın?',
    watchHint: 'Bir gezegen seç, zıplat. Ay’da daha yükseğe çıkarsın.',
    choices: [
      { id: 'moon', label: 'Ay' },
      { id: 'earth', label: 'Dünya' },
      { id: 'jupiter', label: 'Jüpiter' },
    ],
    simulateLabel: 'Zıplat',
    resultTitle: 'Ay’da zıplama daha yüksektir',
    explain:
      'Aynı zıplama Ay’da daha yükseğe çıkar çünkü yerçekimi daha zayıftır. Jüpiter’de tersi olur.',
    uses3d: true,
  },
  {
    id: 'real-scale',
    room: 'scale',
    title: 'Uzay neden boş?',
    question: 'Neden modellerde gezegenler büyük gösterilir?',
    watchHint: 'Görsel ölçek ile gerçek oranı karşılaştır.',
    choices: [
      { id: 'wrong', label: 'Çünkü gerçekte de öyle büyükler' },
      { id: 'model', label: 'Yoksa gezegenler görünmez olurdu' },
    ],
    simulateLabel: 'Gerçek ölçeği aç',
    resultTitle: 'Uzay çok boştur',
    explain:
      'Gerçek boyutta gezegenler nokta kadar kalır. Eğitim modelinde onları büyüterek sırayı görürüz.',
    uses3d: true,
  },
  {
    id: 'arrange-orbits',
    room: 'build',
    title: 'Gezegenleri kendin diz',
    question: 'Gezegenleri Güneş’ten uzağa doğru dizebilir misin?',
    watchHint: 'Aşağıdan bir gezegen seç, sonra sahnedeki doğru halkaya dokun.',
    simulateLabel: 'Sırayı gördüm',
    resultTitle: 'Yörünge sırası hazır',
    explain:
      'Sıra: Merkür → Venüs → Dünya → Mars → Jüpiter → Satürn → Uranüs → Neptün. Sıra Güneş’e olan gerçek uzaklığı izler.',
    featured: true,
    uses3d: true,
  },
  {
    id: 'moon-phases',
    room: 'build',
    title: 'Dolunay’ı sen oluştur',
    question: 'Dolunay için Ay’ı nereye koyarsın?',
    watchHint: 'Ay’ı sürükle. Dolunay: Güneş–Dünya–Ay hizası.',
    choices: [
      { id: 'shape', label: 'Evet, Ay’ın şekli değişiyor' },
      { id: 'light', label: 'Hayır, görünen aydınlık kısım değişiyor' },
    ],
    simulateLabel: 'Ay’ı sürükle',
    resultTitle: 'Dolunay: Güneş–Dünya–Ay hizası',
    explain:
      'Ay kendi ışığını üretmez; Güneş ışığını yansıtır. Şekli değişmez. Dolunayda Ay, Dünya’nın Güneş’e göre arkasındadır.',
    featured: true,
    uses3d: true,
  },
  {
    id: 'stars-or-earth',
    room: 'sky',
    title: 'Yıldızlar gerçekten hareket ediyor mu?',
    question: 'Yıldızlar mı kayıyor, Dünya mı dönüyor?',
    watchHint: 'Gökyüzünü hızlandır, sonra Dünya’nın dönüşüne bak.',
    choices: [
      { id: 'stars', label: 'Yıldızlar hareket ediyor' },
      { id: 'earth', label: 'Dünya dönüyor' },
    ],
    simulateLabel: 'Gökyüzünü hızlandır',
    resultTitle: 'Dünya dönünce gökyüzü kayıyor gibi görünür',
    explain:
      'Yıldızlar bir gecede yer değiştirmez. Dünya döndüğü için gökyüzü kayıyor gibi görünür.',
    uses3d: true,
  },
  {
    id: 'star-names',
    room: 'sky',
    title: 'Yıldızı tanı',
    question: 'Bu yıldız hangisi?',
    watchHint: 'Kameranın baktığı yıldızı seç.',
    simulateLabel: 'Yıldıza bak',
    resultTitle: 'Gökyüzünü tanıdın',
    explain: 'Her yıldızın adı ve rengi farklıdır. Tıklayınca kamera o yıldıza gider.',
    uses3d: true,
  },
  {
    id: 'space-mission',
    room: 'sky',
    title: 'Uzay görevi',
    question: 'Mars yılı, dolunay ve zıplamayı birleştir.',
    watchHint: 'Adımları sırayla tamamla. Önce Mars’a git.',
    simulateLabel: 'Göreve başla',
    resultTitle: 'Keşif tamam',
    explain: 'Mars’ın yılı daha uzun, Ay’ın yerçekimi daha zayıf, dolunay bir hizadır. Bunları simülasyonda gördün.',
    uses3d: true,
  },
  {
    id: 'light-travel',
    room: 'scale',
    title: 'Işık ne zaman gelir?',
    question: 'Güneş ışığı Dünya’ya anında mı gelir?',
    watchHint: 'Işığı Dünya’ya ve Jüpiter’e gönder. Hangisi daha uzun sürer?',
    choices: [
      { id: 'instant', label: 'Anında gelir' },
      { id: 'minutes', label: 'Birkaç dakikada gelir' },
    ],
    simulateLabel: 'Işığı gönder',
    resultTitle: 'Işık yolculuğu bitti',
    explain:
      'Işık çok hızlıdır ama Güneş çok uzaktır. Dünya’ya yaklaşık 8 dakika 20 saniyede gelir. Jüpiter’e ise daha uzun sürer.',
    featured: true,
    uses3d: true,
  },
  {
    id: 'seasons-tilt',
    room: 'earth',
    title: 'Yazın Güneş’e daha yakın mıyız?',
    question: 'Yaz, Dünya Güneş’e yaklaştığı için mi olur?',
    watchHint: 'Eğikliği aç-kapa. Ocak ve temmuzu dene. Dünya’ya bak.',
    choices: [
      { id: 'closer', label: 'Evet, daha yakınız' },
      { id: 'tilt', label: 'Hayır, eksen eğikliği' },
    ],
    simulateLabel: 'Eğikliği dene',
    resultTitle: 'Yaz, yakınlıktan doğmaz',
    explain:
      'Dünya ocakta Güneş’e biraz daha yakındır ama Kuzey’de kıştır. Mevsimleri asıl yapan eksen eğikliğidir.',
    featured: true,
    uses3d: true,
  },
  {
    id: 'closest-hottest',
    room: 'scale',
    title: 'En sıcak kim?',
    question: 'Hangisinin yüzeyi en sıcaktır?',
    watchHint: 'Atmosferi kaldır ve geri koy. En sıcak yüzey değişir mi?',
    choices: [
      { id: 'mercury', label: 'Merkür' },
      { id: 'venus', label: 'Venüs' },
      { id: 'earth', label: 'Dünya' },
    ],
    simulateLabel: 'Atmosferi dene',
    resultTitle: 'Venüs, Merkür’den sıcaktır',
    explain:
      'Merkür Güneş’e en yakındır. Ama Venüs’ün kalın atmosferi ısıyı tutar. En sıcak yüzey Venüs’tedir.',
    featured: true,
    uses3d: true,
  },
  {
    id: 'comet-tail',
    room: 'sky',
    title: 'Kuyruk arkada mı kalır?',
    question: 'Kuyruk hep arkada mı kalır?',
    watchHint: 'Buz topunu Güneş’in etrafında sürükle. Kuyruk nereye bakar?',
    choices: [
      { id: 'behind', label: 'Evet, hep arkada' },
      { id: 'sun', label: 'Hayır, Güneş’ten uzağa bakar' },
    ],
    simulateLabel: 'Kuyrukluyu sürükle',
    resultTitle: 'Kuyruk Güneş’ten kaçar',
    explain:
      'Kuyruk hareketin arkasında durmaz. Güneş rüzgârı onu Güneş’ten uzağa iter. Güneş’e yakınken kuyruk daha uzundur.',
    featured: true,
    uses3d: true,
  },
  {
    id: 'kepler-pizza',
    room: 'motion',
    title: 'Kepler’in pizza kuralı',
    question: 'Merkür Güneş’e yaklaşınca ne olur?',
    watchHint: 'Amber dilim yakın, cyan dilim uzak. İkisi de aynı süredir.',
    choices: [
      { id: 'faster', label: 'Hızlanır' },
      { id: 'slower', label: 'Yavaşlar' },
      { id: 'same', label: 'Hep aynı hız' },
    ],
    simulateLabel: 'Dilimleri izle',
    resultTitle: 'Yakınken dilim şişman, gezegen hızlı',
    explain:
      'Merkür Güneş’e yakınken daha hızlı gider. Aynı sürede Güneş’le arasındaki dilim aynı büyüklükte kalır.',
    featured: true,
    uses3d: true,
  },
  {
    id: 'mercury-long-day',
    room: 'motion',
    title: 'Merkür’ün günü neden uzun?',
    question: 'Merkür’de bir gün kısa mıdır?',
    watchHint: '1 yılı izle. Yıl biter, gün bitmez.',
    choices: [
      { id: 'short', label: 'Evet, günü kısadır' },
      { id: 'long', label: 'Hayır, günü yıldan uzundur' },
    ],
    simulateLabel: '1 yılı izle',
    resultTitle: 'Yıl bitti, gün bitmedi',
    explain:
      'Merkür kendi etrafında çok yavaş döner. Bir yılı yaklaşık 88 Dünya günüdür; bir günü bundan daha uzundur.',
    featured: true,
    uses3d: true,
  },
  {
    id: 'eclipse-align',
    room: 'build',
    title: 'Tutulma hizası',
    question: 'Her dolunayda Ay tutulması olur mu?',
    watchHint: 'Ay’ı sürükle. Tutulma için gölge konisine gir.',
    choices: [
      { id: 'always', label: 'Evet, her dolunay tutulmadır' },
      { id: 'align', label: 'Hayır, tam hiza ve gölge gerekir' },
    ],
    simulateLabel: 'Hizala',
    resultTitle: 'Tutulma bir hizadır',
    explain:
      'Her dolunay tutulma değildir. Ay, Dünya’nın gölgesine tam girmelidir.',
    uses3d: true,
  },
  {
    id: 'ursa-hunt',
    room: 'sky',
    title: 'Büyükayı’yı bul',
    question: 'Kepçedeki yedi yıldızı bulabilir misin?',
    watchHint: 'Kepçedeki yedi parlak yıldıza dokun.',
    simulateLabel: 'Yıldızlara dokun',
    resultTitle: 'Büyükayı tamam',
    explain:
      'Büyükayı bir gezegen değil, yedi parlak yıldızın gökyüzünde çizdiği şekildir. Yıldızlar çok uzaktadır; Dünya döndüğü için yerleri kayıyor gibi görünür.',
    featured: true,
    uses3d: true,
  },
  {
    id: 'light-diary',
    room: 'scale',
    title: 'Işık günlüğü',
    question: 'Uzak yıldızın ışığı daha mı uzun sürer?',
    watchHint: 'Önce Dünya’ya ışık gönder, sonra Proxima’ya bak.',
    choices: [
      { id: 'same', label: 'Evet, ışık her yere aynı anda gider' },
      { id: 'far', label: 'Hayır, daha uzak yıldız daha uzun sürer' },
    ],
    simulateLabel: 'Işığı karşılaştır',
    resultTitle: 'Işık zamanda yol alır',
    explain:
      'Işık Dünya’ya yaklaşık 8 dakika 20 saniyede gelir. En yakın yıldız Proxima’ya ise dört yıldan uzun sürer. 10 yaşındaysan o ışık sen 14 olmadan hâlâ yoldadır.',
    uses3d: true,
  },
]

export function getActivity(id: LabActivityId): LabActivity {
  const found = LAB_ACTIVITIES.find((item) => item.id === id)
  if (!found) throw new Error(`Bilinmeyen simülasyon: ${id}`)
  return found
}

export function activitiesInRoom(room: LabRoomId): LabActivity[] {
  return LAB_ACTIVITIES.filter((item) => item.room === room)
}

export const FEATURED_ACTIVITIES = LAB_ACTIVITIES.filter((item) => item.featured)

export const CHALLENGE_IDS = ['arrange-orbits', 'moon-phases', 'closest-hottest', 'drop-ball', 'who-faster'] as const

export type ChallengeId = (typeof CHALLENGE_IDS)[number]

export const CHALLENGE_BLURB: Record<ChallengeId, string> = {
  'arrange-orbits': '8 gezegeni sıraya diz.',
  'moon-phases': 'Dolunayı sen hizala.',
  'closest-hottest': 'En sıcak yüzey hangisi?',
  'drop-ball': 'Aynı top nerede önce düşer?',
  'who-faster': 'Kim önce tur atar?',
}

export const CHALLENGE_VERB: Record<ChallengeId, string> = {
  'arrange-orbits': 'Diz',
  'moon-phases': 'Sürükle',
  'closest-hottest': 'Seç',
  'drop-ball': 'Seç',
  'who-faster': 'Seç',
}

export const CHALLENGE_ICON: Record<ChallengeId, 'planet' | 'orbit' | 'thermo' | 'weight'> = {
  'arrange-orbits': 'planet',
  'moon-phases': 'orbit',
  'closest-hottest': 'thermo',
  'drop-ball': 'weight',
  'who-faster': 'orbit',
}

export const CHALLENGE_ACTIVITIES = CHALLENGE_IDS.map((id) => getActivity(id))
