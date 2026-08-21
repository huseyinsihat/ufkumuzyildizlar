import type { LabActivity, LabActivityId, LabRoomId } from '../types/lab'

export const LAB_ROOMS: { id: LabRoomId; title: string; blurb: string; tone: string }[] = [
  { id: 'motion', title: 'Hareket', blurb: 'Dönme, dolanma ve gezegen yılı', tone: 'var(--amber)' },
  { id: 'earth', title: 'Dünya', blurb: 'Gece ve gündüz nasıl oluşur?', tone: 'var(--cyan)' },
  { id: 'gravity', title: 'Yerçekimi', blurb: 'Ağırlık, düşme ve zıplama', tone: '#ff8a5b' },
  { id: 'scale', title: 'Ölçek', blurb: 'Uzay neden bu kadar büyük?', tone: '#b794f6' },
  { id: 'build', title: 'Kur + Ay', blurb: 'Yörünge diz ve Ay evrelerini oluştur', tone: '#f6e05e' },
  { id: 'sky', title: 'Gökyüzü', blurb: 'Yıldızlar mı hareket eder, Dünya mı?', tone: '#7ee0ff' },
]

export const LAB_ACTIVITIES: LabActivity[] = [
  {
    id: 'earth-year',
    room: 'motion',
    title: 'Bir Dünya yılı',
    question: 'Dünya Güneş’in etrafında 1 tur atınca diğer gezegenler kaç tur atar?',
    simulateLabel: '1 yılı başlat',
    resultTitle: 'Dünya 1 turunu tamamladı',
    explain:
      'Güneş’e yakın gezegenler daha kısa yörüngede dolanır, bu yüzden bir Dünya yılında daha çok tur atarlar. Uzak gezegenler daha yavaş tamamlar.',
    uses3d: true,
  },
  {
    id: 'who-faster',
    room: 'motion',
    title: 'Yıl yarışı',
    question: 'Merkür mi Dünya mı Güneş çevresinde önce tur atar?',
    choices: [
      { id: 'mercury', label: 'Merkür' },
      { id: 'earth', label: 'Dünya' },
      { id: 'same', label: 'Aynı anda' },
    ],
    simulateLabel: 'Dene',
    resultTitle: 'Merkür turunu önce bitirdi',
    explain:
      'Merkür Güneş’e daha yakındır ve yörüngesi daha kısadır. Güneş’ten uzaklaştıkça gezegenler daha hızlı gitmez; genelde bir turları daha uzun sürer.',
    featured: true,
    uses3d: true,
  },
  {
    id: 'spin-vs-orbit',
    room: 'motion',
    title: 'Dönüyor mu, dolanıyor mu?',
    question: 'Gece-gündüz için Dünya’nın dönmesi mi, Güneş etrafında dolanması mı gerekir?',
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
    title: 'Gece–gündüz Makinesi',
    question: 'Dünya dönerken İstanbul ve Diyarbakır aynı anda mı geceye girer?',
    simulateLabel: 'Gördüm',
    resultTitle: 'Gece ve gündüz dönmeden doğar',
    explain:
      'Güneş bir tarafı aydınlatır. Dünya döndükçe İstanbul ve Diyarbakır neredeyse birlikte gündüze ve geceye girer; ikisi de aynı ülkede, saat farkı küçüktür. Dolanmak gerekmez.',
    uses3d: true,
  },
  {
    id: 'mass-weight',
    room: 'gravity',
    title: 'Kütlem değişir mi?',
    question: 'Ay’a gittiğinde kütlen değişir mi?',
    choices: [
      { id: 'yes', label: 'Evet' },
      { id: 'no', label: 'Hayır' },
    ],
    simulateLabel: 'Ağırlığı göster',
    resultTitle: 'Kütle aynı kalır',
    explain:
      'Kütle maddenin miktarıdır, gezegen değişince değişmez. Ağırlık ise yerçekiminin çekmesidir. Ay’da g daha küçük olduğu için aynı kütle daha hafif çekilir.',
    uses3d: false,
  },
  {
    id: 'drop-ball',
    room: 'gravity',
    title: 'Kim önce düşer?',
    question: 'Aynı top Ay’da, Dünya’da ve Jüpiter’de hangisinde önce yere varır?',
    choices: [
      { id: 'moon', label: 'Ay' },
      { id: 'earth', label: 'Dünya' },
      { id: 'jupiter', label: 'Jüpiter' },
    ],
    simulateLabel: 'Topları bırak',
    resultTitle: 'Jüpiter’de top daha çabuk düşer',
    explain:
      'Yerçekimi büyüdükçe ivme büyür. Jüpiter’de g en büyüktür, bu yüzden top yere daha çabuk varır. Ay’da ise yavaş düşer.',
    featured: true,
    uses3d: false,
  },
  {
    id: 'jump',
    room: 'gravity',
    title: 'Aynı insan, farklı gezegen',
    question: 'Aynı zıplama ile nerede daha yükseğe çıkarsın?',
    choices: [
      { id: 'moon', label: 'Ay' },
      { id: 'earth', label: 'Dünya' },
      { id: 'jupiter', label: 'Jüpiter' },
    ],
    simulateLabel: 'Zıplat',
    resultTitle: 'Ay’da zıplama daha yüksektir',
    explain:
      'Zıplama yüksekliği yerçekimi artınca küçülür. Ay’da g küçük olduğu için aynı hızla çok yükseğe çıkarsın. Jüpiter büyük olsa da yerçekimi daha güçlüdür; orada daha yükseğe değil, daha alçağa zıplarsın.',
    uses3d: false,
  },
  {
    id: 'real-scale',
    room: 'scale',
    title: 'Güneş Sistemi neden bu kadar büyük?',
    question: 'Neden modellerde gezegenler gerçektekinden büyük gösterilir?',
    choices: [
      { id: 'wrong', label: 'Çünkü gerçekte de öyle büyükler' },
      { id: 'model', label: 'Yoksa gezegenler görünmez olurdu' },
    ],
    simulateLabel: 'Gerçek ölçeği aç',
    resultTitle: 'Uzay çok boştur',
    explain:
      'Gerçek oranlarda gezegenler nokta kadar kalır. Eğitim modelinde gezegenleri büyüterek yörünge sırasını görebiliriz. Bu bir modeldir, evrenin birebir kopyası değildir.',
    uses3d: true,
  },
  {
    id: 'arrange-orbits',
    room: 'build',
    title: 'Gezegenleri kendin diz',
    question: 'Güneş’e uzaklık sırasına göre yörüngeleri doğru dizebilir misin?',
    simulateLabel: '3B’ye bak',
    resultTitle: 'Yörünge sırası hazır',
    explain:
      'Sıra: Merkür → Venüs → Dünya → Mars → Jüpiter → Satürn → Uranüs → Neptün. Sıra Güneş’e olan gerçek uzaklığı izler.',
    featured: true,
    uses3d: false,
  },
  {
    id: 'moon-phases',
    room: 'build',
    title: 'Dolunay’ı sen oluştur',
    question: 'Dolunay için Ay’ı nereye sürüklemelisin?',
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
    simulateLabel: 'Yıldıza bak',
    resultTitle: 'Gökyüzünü tanıdın',
    explain: 'Her yıldızın adı ve rengi farklıdır. Tıklayınca kamera o yıldıza gider.',
    uses3d: true,
  },
  {
    id: 'space-mission',
    room: 'sky',
    title: 'Uzay görevi',
    question: 'Öğrendiklerini bir keşifte birleştir.',
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
    question: 'Kuzey’de yaz, Dünya Güneş’e yaklaştığı için mi olur?',
    simulateLabel: 'Eğikliği dene',
    resultTitle: 'Yaz, yakınlıktan doğmaz',
    explain:
      'Dünya ocakta Güneş’e biraz daha yakındır ama Kuzey’de kıştır. Mevsimlerin asıl nedeni eksen eğikliğidir.',
    featured: true,
    uses3d: true,
  },
  {
    id: 'closest-hottest',
    room: 'scale',
    title: 'En sıcak kim?',
    question: 'Merkür, Venüs ve Dünya’dan hangisinin yüzeyi en sıcaktır?',
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
    question: 'Kuyruk her zaman hareketin arkasında mıdır?',
    simulateLabel: 'Kuyrukluyu sürükle',
    resultTitle: 'Kuyruk Güneş’ten kaçar',
    explain:
      'Kuyruk hareketin arkasında durmaz. Güneş rüzgârı onu Güneş’ten uzağa iter. Güneş’e yakınken kuyruk daha uzundur.',
    featured: true,
    uses3d: true,
  },
  {
    id: 'mercury-long-day',
    room: 'motion',
    title: 'Merkür’ün günü neden uzun?',
    question: 'Merkür’de bir gün kısa mıdır?',
    simulateLabel: '1 yılı izle',
    resultTitle: 'Yıl bitti, gün bitmedi',
    explain:
      'Merkür kendi etrafında çok yavaş döner. Bir yılı yaklaşık 88 Dünya günüdür; bir güneş günü ise yaklaşık 176 Dünya günüdür.',
    featured: true,
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
  'arrange-orbits': 'Güneşi ortaya koy, 8 halkaya diz.',
  'moon-phases': 'Ay’ı Dünya’nın gece tarafına sürükle.',
  'closest-hottest': 'Merkür, Venüs, Dünya — en sıcak kim?',
  'drop-ball': 'Ay, Dünya, Jüpiter — kim önce düşer?',
  'who-faster': 'Merkür mi Dünya mı önce tur atar?',
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
