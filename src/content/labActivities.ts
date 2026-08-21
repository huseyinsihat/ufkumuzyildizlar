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
    title: 'Kim neden hızlı?',
    question: 'Hangisi Güneş çevresindeki turunu daha önce tamamlar?',
    choices: [
      { id: 'mercury', label: 'Merkür' },
      { id: 'earth', label: 'Dünya' },
      { id: 'same', label: 'Aynı anda' },
    ],
    simulateLabel: 'Dene',
    resultTitle: 'Merkür turunu önce bitirdi',
    explain:
      'Merkür Güneş’e daha yakındır ve yörüngesi daha kısadır. Güneş’ten uzaklaştıkça gezegenler daha hızlı gitmez; genelde bir turları daha uzun sürer.',
    uses3d: true,
  },
  {
    id: 'spin-vs-orbit',
    room: 'motion',
    title: 'Dönüyor mu, dolanıyor mu?',
    question: 'Gece-gündüz için Dünya’nın kendi etrafında dönmesi mi, Güneş etrafında dolanması mı gerekir?',
    choices: [
      { id: 'spin', label: 'Kendi etrafında dönmesi' },
      { id: 'orbit', label: 'Güneş etrafında dolanması' },
      { id: 'both', label: 'İkisi birden' },
    ],
    simulateLabel: 'Anahtarları dene',
    resultTitle: 'Dönme ≠ dolanma',
    explain:
      'Dönme, Dünya’nın kendi ekseni etrafındaki turudur: gece ve gündüzü yapar. Dolanma, Güneş etrafındaki turudur: bir yılı yapar. İkisi farklı hareketlerdir.',
    uses3d: true,
  },
  {
    id: 'day-night',
    room: 'earth',
    title: 'Gece–gündüz makinesi',
    question: 'Dünya dönerken hangi şehirler gündüz, hangileri gece olur?',
    choices: [
      { id: 'spin', label: 'Kendi etrafında dönmesi gerekir' },
      { id: 'orbit', label: 'Güneş etrafında dolanması gerekir' },
    ],
    simulateLabel: '24 saati hızlandır',
    resultTitle: 'Gece ve gündüz dönmeden doğar',
    explain:
      'Güneş bir tarafı aydınlatır. Dünya döndükçe İzmir’den Van’a Türk şehirleri neredeyse birlikte gündüze ve geceye girer. New York veya Tokyo gibi uzak şehirler yok; bu yüzden saat farkı küçüktür. Dolanmak gerekmez.',
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
    title: 'Aynı topu bırak',
    question: 'Aynı top hangi gezegende daha hızlı düşer?',
    choices: [
      { id: 'moon', label: 'Ay' },
      { id: 'earth', label: 'Dünya' },
      { id: 'mars', label: 'Mars' },
      { id: 'jupiter', label: 'Jüpiter' },
    ],
    simulateLabel: 'Topları bırak',
    resultTitle: 'Jüpiter’de top daha çabuk düşer',
    explain:
      'Yerçekimi büyüdükçe ivme büyür. Jüpiter’de g en büyüktür, bu yüzden top yere daha çabuk varır. Ay’da ise yavaş düşer.',
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
    question: 'Neden astronomi modellerinde gezegenler gerçek boyutlarından daha büyük gösterilebilir?',
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
    simulateLabel: 'Simülasyonu başlat',
    resultTitle: 'Yörünge sırası hazır',
    explain:
      'Merkür en içte, sonra Venüs, Dünya, Mars, Jüpiter, Satürn, Uranüs, Neptün gelir. Sıra Güneş’e olan gerçek uzaklığı izler.',
    uses3d: false,
  },
  {
    id: 'moon-phases',
    room: 'build',
    title: 'Dolunay’ı sen oluştur',
    question: 'Ay gerçekten şekil mi değiştiriyor? Ay’ı dolunay olacak yere sürükle.',
    choices: [
      { id: 'shape', label: 'Evet, Ay’ın şekli değişiyor' },
      { id: 'light', label: 'Hayır, görünen aydınlık kısım değişiyor' },
    ],
    simulateLabel: 'Ay’ı sürükle',
    resultTitle: 'Dolunay: Güneş–Dünya–Ay hizası',
    explain:
      'Ay kendi ışığını üretmez; Güneş ışığını yansıtır. Şekli değişmez, Dünya’dan gördüğümüz aydınlık dilim değişir. Dolunayda Ay, Dünya’nın Güneş’e göre arkasındadır; her dolunayda tutulma olmaz çünkü Ay’ın yörüngesi biraz eğiktir.',
    uses3d: true,
  },
  {
    id: 'stars-or-earth',
    room: 'sky',
    title: 'Yıldızlar gerçekten hareket ediyor mu?',
    question: 'Gece gökyüzünde yıldızlar kayıyor gibi durur. Yıldızlar mı hareket ediyor, Dünya mı?',
    choices: [
      { id: 'stars', label: 'Yıldızlar hareket ediyor' },
      { id: 'earth', label: 'Dünya dönüyor' },
    ],
    simulateLabel: 'Gökyüzünü hızlandır',
    resultTitle: 'Dünya dönünce gökyüzü kayıyor gibi görünür',
    explain:
      'Yıldızlar bir gecede yer değiştirmez. Dünya kendi ekseni etrafında döndüğü için gökyüzü bize hareket ediyor gibi gelir.',
    uses3d: true,
  },
  {
    id: 'space-mission',
    room: 'sky',
    title: 'Uzay görevi',
    question: 'Öğrendiklerini bir keşif görevinde birleştir.',
    simulateLabel: 'Göreve başla',
    resultTitle: 'Keşif tamam',
    explain: 'Mars’ın yılı daha uzun, Ay’ın yerçekimi daha zayıf, dolunay bir hizadır. Bunları simülasyonda gördün.',
    uses3d: true,
  },
  {
    id: 'light-travel',
    room: 'scale',
    title: 'Işık ne zaman gelir?',
    question: 'Güneş ışığı Dünya’ya anında mı ulaşır?',
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
    title: 'En yakın en sıcak mı?',
    question: 'Güneş’e en yakın gezegen en sıcak gezegen midir?',
    simulateLabel: 'Battaniyeyi dene',
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
    question: 'Kuyruklu yıldızın kuyruğu her zaman arkasında mıdır?',
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
    question: 'Güneş’e yakın olan Merkür’de bir gün kısa mıdır?',
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
