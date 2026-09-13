import { L, type LocText } from '../i18n/types'
import type { LabActivity, LabActivityId, LabRoomId } from '../types/lab'

export const LAB_ROOMS: { id: LabRoomId; title: LocText; blurb: LocText; tone: string }[] = [
  { id: 'motion', title: L('Hareket', 'Motion'), blurb: L('Gezegenler nasıl döner ve tur atar? Yıl neden farklıdır?', 'How do planets spin and go around? Why is a year different?'), tone: 'var(--amber)' },
  { id: 'earth', title: L('Dünya', 'Earth'), blurb: L('Gece, gündüz ve mevsimler nasıl oluşur?', 'How do night, day, and seasons happen?'), tone: 'var(--cyan)' },
  { id: 'gravity', title: L('Yerçekimi', 'Gravity'), blurb: L('Aynı top nerede önce düşer? Nerede daha yükseğe zıplarsın?', 'Where does the same ball fall first? Where do you jump higher?'), tone: '#ff8a5b' },
  { id: 'scale', title: L('Uzaklık', 'Distance'), blurb: L('Uzay neden boş? Işık anında mı gelir? En yakın en sıcak mı?', 'Why is space empty? Does light arrive at once? Is the closest also the hottest?'), tone: '#b794f6' },
  { id: 'build', title: L('Sıra ve Ay', 'Order and Moon'), blurb: L('8 gezegeni diz. Dolunayı yakala. Her dolunay tutulma mı?', 'Line up 8 planets. Catch the full Moon. Is every full Moon an eclipse?'), tone: '#f6e05e' },
  { id: 'sky', title: L('Gökyüzü', 'Sky'), blurb: L('Yıldızlar mı kayıyor? Kepçeyi bul. Kuyruk neden arkada değil?', 'Are the stars sliding? Find the Dipper. Why is the tail not always behind?'), tone: '#7ee0ff' },
]

export const LAB_ACTIVITIES: LabActivity[] = [
  {
    id: 'earth-year',
    room: 'motion',
    title: L('Bir Dünya yılında kim tur atar?', 'Who goes around in one Earth year?'),
    question: L('Dünya Güneş etrafında 1 tur atınca Merkür ve Jüpiter ne yapar?', 'When Earth finishes 1 trip around the Sun, what do Mercury and Jupiter do?'),
    watchHint: L('1 yılı izle. Merkür daha çok tur atar; Jüpiter turunu bitiremez.', 'Watch 1 year. Mercury takes more trips; Jupiter cannot finish one.'),
    choices: [
      { id: 'inner', label: L('Merkür daha çok tur atar', 'Mercury takes more trips') },
      { id: 'same', label: L('Hepsi aynı anda 1 tur atar', 'They all finish 1 trip together') },
    ],
    simulateLabel: L('1 yılı başlat', 'Start 1 year'),
    resultTitle: L('Merkür birkaç tur, Dünya 1 tur, Jüpiter turunu bitiremez.', 'Mercury takes a few trips, Earth takes 1, Jupiter cannot finish.'),
    explain: L('Güneş’e yakın gezegenin yılı kısadır. Bir Dünya yılında Merkür yaklaşık 4 tur atar.', 'A planet close to the Sun has a short year. In one Earth year, Mercury takes about 4 trips.'),
    uses3d: true,
  },
  {
    id: 'who-faster',
    room: 'motion',
    title: L('Kim önce tur atar?', 'Who finishes a trip first?'),
    question: L('Merkür mü, Dünya mı önce Güneş etrafında 1 turu bitirir?', 'Does Mercury or Earth finish 1 trip around the Sun first?'),
    watchHint: L('Yarışı başlat. Kim önce turunu bitirir?', 'Start the race. Who finishes first?'),
    choices: [
      { id: 'mercury', label: L('Merkür', 'Mercury') },
      { id: 'earth', label: L('Dünya', 'Earth') },
      { id: 'same', label: L('Aynı anda', 'At the same time') },
    ],
    simulateLabel: L('Yarışı başlat', 'Start the race'),
    resultTitle: L('Merkür turunu önce bitirdi.', 'Mercury finished first.'),
    explain: L('Merkür Güneş’e daha yakındır. Turu yaklaşık 88 gündür; Dünya’nınki 365 gün.', 'Mercury is closer to the Sun. Its trip is about 88 days; Earth’s is 365 days.'),
    uses3d: true,
  },
  {
    id: 'spin-vs-orbit',
    room: 'motion',
    title: L('Dönme mi, tur mu?', 'Spin or trip?'),
    question: L('Gece ve gündüz için Dünya ne yapmalı?', 'What must Earth do for night and day?'),
    watchHint: L('Dönmeyi ve turu tek tek durdur. Gece hangisinde kaybolur?', 'Stop spin and the trip one by one. When does night go away?'),
    choices: [
      { id: 'spin', label: L('Kendi etrafında dönmeli', 'It must spin') },
      { id: 'orbit', label: L('Güneş etrafında tur atmalı', 'It must go around the Sun') },
      { id: 'both', label: L('İkisi birden', 'Both') },
    ],
    simulateLabel: L('Gördüm', 'I saw it'),
    resultTitle: L('Dönme gece ve gündüzü yapar; tur yılı yapar.', 'Spin makes night and day; the trip makes a year.'),
    explain: L('Kendi etrafında dönünce gece ve gündüz olur. Güneş etrafında tur atınca yıl olur.', 'Night and day happen when Earth spins. A year happens when it goes around the Sun.'),
    uses3d: true,
  },
  {
    id: 'day-night',
    room: 'earth',
    title: L('Gece ve gündüz nasıl olur?', 'How do night and day happen?'),
    question: L('İstanbul ve Diyarbakır geceye saatlerce ayrı mı girer?', 'Do Istanbul and Diyarbakır enter night hours apart?'),
    watchHint: L('Mavi nokta İstanbul, turuncu nokta Diyarbakır. Güneş bir tarafı ısıtır. Dünya dönünce gece yer değiştirir.', 'The blue dot is Istanbul, the orange dot is Diyarbakır. The Sun warms one side. Night moves when Earth spins.'),
    choices: [
      { id: 'same', label: L('Hayır, neredeyse birlikte', 'No, almost together') },
      { id: 'diff', label: L('Evet, saatlerce fark var', 'Yes, hours apart') },
    ],
    simulateLabel: L('Gördüm', 'I saw it'),
    resultTitle: L('Aynı ülkede doğu ve batı neredeyse birlikte geceye girer.', 'East and west in the same country enter night almost together.'),
    explain: L('Aynı ülkede doğu ve batı neredeyse birlikte geceye girer. Amerika ile Türkiye gibi uzak yerler değil.', 'East and west in the same country enter night almost together. They are not as far as America and Turkey.'),
    uses3d: true,
  },
  {
    id: 'mass-weight',
    room: 'gravity',
    title: L('Ay’da ben değişir miyim?', 'Do I change on the Moon?'),
    question: L('Ay’a gidince sen mi değişirsin, yoksa sadece daha mı hafif hissedersin?', 'If you go to the Moon, do you change, or do you only feel lighter?'),
    watchHint: L('Kilonu seç. Üç yerde nasıl hissettiğine bak. Sen aynı çocuksun.', 'Pick your mass. See how it feels in three places. You are the same child.'),
    choices: [
      { id: 'yes', label: L('Ben değişirim', 'I change') },
      { id: 'no', label: L('Ben aynıyım, orada çekim zayıf', 'I stay the same; gravity is weaker there') },
    ],
    simulateLabel: L('Bunu gördüm', 'I saw this'),
    resultTitle: L('Sen aynı kalırsın. Ay’da daha hafif hissedersin.', 'You stay the same. You feel lighter on the Moon.'),
    explain: L('Sen aynı çocuksun. Ay’da çekim daha zayıf olduğu için daha hafif hissedersin.', 'You are the same child. You feel lighter on the Moon because gravity is weaker.'),
    uses3d: true,
  },
  {
    id: 'drop-ball',
    room: 'gravity',
    title: L('Aynı top nerede önce düşer?', 'Where does the same ball fall first?'),
    question: L('Aynı top nerede önce yere düşer?', 'Where does the same ball hit the ground first?'),
    watchHint: L('Topları bırak. Aynı yükseklikten hangisi önce düşer?', 'Drop the balls. From the same height, which falls first?'),
    choices: [
      { id: 'moon', label: L('Ay', 'Moon') },
      { id: 'earth', label: L('Dünya', 'Earth') },
      { id: 'jupiter', label: L('Jüpiter', 'Jupiter') },
    ],
    simulateLabel: L('Topları bırak', 'Drop the balls'),
    resultTitle: L('Jüpiter’de top daha çabuk düşer.', 'The ball falls sooner on Jupiter.'),
    explain: L('Çekim güçlendikçe top daha çabuk düşer. Jüpiter’de en güçlü, Ay’da en yavaş.', 'A stronger pull makes the ball fall sooner. Strongest on Jupiter, slowest on the Moon.'),
    uses3d: true,
  },
  {
    id: 'jump',
    room: 'gravity',
    title: L('Nerede daha yükseğe zıplarsın?', 'Where do you jump higher?'),
    question: L('Nerede daha yükseğe zıplarsın?', 'Where do you jump higher?'),
    watchHint: L('Bir yer seç, zıplat. Ay’da yüksek, Jüpiter’de alçak.', 'Pick a place and jump. High on the Moon, low on Jupiter.'),
    choices: [
      { id: 'moon', label: L('Ay', 'Moon') },
      { id: 'earth', label: L('Dünya', 'Earth') },
      { id: 'jupiter', label: L('Jüpiter', 'Jupiter') },
    ],
    simulateLabel: L('Zıplat', 'Jump'),
    resultTitle: L('Ay’da zıplama daha yüksektir.', 'The jump is higher on the Moon.'),
    explain: L('Aynı zıplama Ay’da daha yükseğe çıkar, çünkü çekim daha zayıf. Jüpiter’de tersi.', 'The same jump goes higher on the Moon because gravity is weaker. On Jupiter it is the opposite.'),
    uses3d: true,
  },
  {
    id: 'real-scale',
    room: 'scale',
    title: L('Gezegenler neden büyük çizilir?', 'Why are planets drawn big?'),
    question: L('Modellerde gezegenler neden bu kadar büyük gösterilir?', 'Why do models show planets this big?'),
    watchHint: L('Anlamak için büyüğü ve gerçek boşluğu karşılaştır.', 'Compare the big model and the real empty space.'),
    choices: [
      { id: 'wrong', label: L('Çünkü gerçekte de öyle büyükler', 'Because they really are that big') },
      { id: 'model', label: L('Yoksa gezegenler görünmez olurdu', 'Or the planets would be too small to see') },
    ],
    simulateLabel: L('Bunu gördüm', 'I saw this'),
    resultTitle: L('Uzay çok boş. Küçük noktaları görelim diye büyütürüz.', 'Space is very empty. We enlarge the tiny dots so we can see them.'),
    explain: L('Gerçek boyutta gezegenler nokta kadar kalır. Sırayı görmek için onları büyütürüz.', 'At true size the planets look like dots. We enlarge them so we can see the order.'),
    uses3d: true,
  },
  {
    id: 'arrange-orbits',
    room: 'build',
    title: L('Gezegenleri diz', 'Line up the planets'),
    question: L('Güneş’ten uzağa doğru 8 gezegeni dizebilir misin?', 'Can you line up the 8 planets going out from the Sun?'),
    watchHint: L('Önce adı seç. Sonra doğru halkaya dokun.', 'Pick a name first. Then tap the right ring.'),
    simulateLabel: L('Sırayı gördüm', 'I saw the order'),
    resultTitle: L('Sıra hazır.', 'The order is ready.'),
    explain: L('Sıra, Güneş’e olan gerçek uzaklıktır. Merkür, Venüs, Dünya, Mars, Jüpiter, Satürn, Uranüs, Neptün.', 'The order is the real distance from the Sun. Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.'),
    uses3d: true,
  },
  {
    id: 'moon-phases',
    room: 'build',
    title: L('Dolunayı sen yap', 'Make a full Moon'),
    question: L('Dolunay için Ay nerede olmalı?', 'Where should the Moon be for a full Moon?'),
    watchHint: L('Ay’ı sürükle. Dolunay: Güneş, Dünya, Ay bir çizgide; Ay gece tarafında.', 'Drag the Moon. Full Moon: Sun, Earth, Moon in a line; the Moon on the night side.'),
    choices: [
      { id: 'night', label: L('Dünya’nın gece tarafında, Güneş–Dünya–Ay bir çizgide', 'On Earth’s night side, Sun–Earth–Moon in a line') },
      { id: 'between', label: L('Güneş ile Dünya’nın arasında', 'Between the Sun and Earth') },
    ],
    simulateLabel: L('Ay’ı sürükle', 'Drag the Moon'),
    resultTitle: L('Dolunayda Ay, Dünya’nın gece tarafındadır.', 'At full Moon the Moon is on Earth’s night side.'),
    explain: L('Ay kendi ışığını yapmaz. Güneş ışığını yansıtır. Dolunayda Ay, Dünya’nın gece tarafındadır.', 'The Moon does not make its own light. It reflects sunlight. At full Moon it is on Earth’s night side.'),
    uses3d: true,
  },
  {
    id: 'stars-or-earth',
    room: 'sky',
    title: L('Yıldızlar mı kayıyor?', 'Are the stars sliding?'),
    question: L('Gece yıldızlar mı yer değiştirir, Dünya mı döner?', 'At night, do the stars move, or does Earth spin?'),
    watchHint: L('Önce gökyüzünün kayışına bak. Sonra Dünya’nın dönüşüne bak.', 'First watch the sky drift. Then watch Earth spin.'),
    choices: [
      { id: 'stars', label: L('Yıldızlar yer değiştirir', 'The stars move') },
      { id: 'earth', label: L('Dünya döner', 'Earth spins') },
    ],
    simulateLabel: L('Gördüm', 'I saw it'),
    resultTitle: L('Yıldızlar yerinde. Dünya döndüğü için gökyüzü kayıyor gibi durur.', 'The stars stay. The sky looks like it slides because Earth spins.'),
    explain: L('Yıldızlar bir gecede yer değiştirmez. Dünya döndüğü için gökyüzü kayıyor gibi görünür.', 'The stars do not move in one night. The sky looks like it slides because Earth spins.'),
    uses3d: true,
  },
  {
    id: 'star-names',
    room: 'sky',
    title: L('Bu hangi yıldız?', 'Which star is this?'),
    question: L('Gördüğün yıldızı, rengine bakarak seç.', 'Pick the star you see by looking at its color.'),
    watchHint: L('Rengine ve kısa ipucuna bak, sonra adını seç.', 'Look at the color and the short hint, then pick the name.'),
    simulateLabel: L('Yıldıza bak', 'Look at the star'),
    resultTitle: L('Her yıldızın adı ve rengi ayrıdır.', 'Each star has its own name and color.'),
    explain: L('Her yıldızın adı ve rengi farklıdır. Dokununca bakış o yıldıza gider.', 'Each star has a different name and color. Tap it and the view goes there.'),
    uses3d: true,
  },
  {
    id: 'space-mission',
    room: 'sky',
    title: L('Keşif yolu', 'Discovery path'),
    question: L('Sırayla üç bakış: Mars, dolunay, Ay’da zıpla.', 'Three looks in order: Mars, full Moon, jump on the Moon.'),
    watchHint: L('Adımları sırayla gör. Atlamadan ilerle.', 'See the steps in order. Do not skip.'),
    simulateLabel: L('Gördüm', 'I saw it'),
    resultTitle: L('Mars’ın yılı uzun. Dolunay bir çizgidir. Ay’da zıplama yüksektir.', 'Mars has a long year. A full Moon is a line. A jump on the Moon is high.'),
    explain: L('Mars’ın yılı Dünya’dan uzundur. Dolunay bir çizgidir. Ay’da çekim zayıf olduğu için zıplama yüksektir.', 'A Mars year is longer than an Earth year. A full Moon is a line. A jump is high on the Moon because gravity is weaker.'),
    uses3d: true,
  },
  {
    id: 'light-travel',
    room: 'scale',
    title: L('Güneş ışığı anında mı gelir?', 'Does sunlight arrive at once?'),
    question: L('Güneş ışığı Dünya’ya anında mı gelir?', 'Does sunlight reach Earth at once?'),
    watchHint: L('Önce Dünya’ya, sonra Jüpiter’e ışık gönder. Hangisi daha uzun sürer?', 'Send light to Earth first, then to Jupiter. Which takes longer?'),
    choices: [
      { id: 'instant', label: L('Anında gelir', 'It arrives at once') },
      { id: 'minutes', label: L('Birkaç dakikada gelir', 'It arrives in a few minutes') },
    ],
    simulateLabel: L('Işığı gönder', 'Send the light'),
    resultTitle: L('Işık Dünya’ya yaklaşık 8 dakika 20 saniyede gelir.', 'Light reaches Earth in about 8 minutes 20 seconds.'),
    explain: L('Işık çok hızlıdır ama Güneş çok uzaktır. Dünya’ya yaklaşık 8 dakika 20 saniyede gelir.', 'Light is very fast, but the Sun is far. It reaches Earth in about 8 minutes 20 seconds.'),
    uses3d: true,
  },
  {
    id: 'seasons-tilt',
    room: 'earth',
    title: L('Yaz yakınlıktan mı?', 'Is summer from being closer?'),
    question: L('Yaz, Dünya Güneş’e daha yakın olduğu için mi olur?', 'Does summer happen because Earth is closer to the Sun?'),
    watchHint: L('Dünya dik dursun, sonra biraz yan dursun. Ocak ve temmuzu dene.', 'Let Earth stand straight, then tilt a little. Try January and July.'),
    choices: [
      { id: 'closer', label: L('Evet, daha yakınız', 'Yes, we are closer') },
      { id: 'tilt', label: L('Hayır, Dünya biraz yan durur', 'No, Earth tilts a little') },
    ],
    simulateLabel: L('Bunu gördüm', 'I saw this'),
    resultTitle: L('Yaz yakınlıktan olmaz.', 'Summer is not from being closer.'),
    explain: L('Yaz, Dünya’nın biraz yan durmasından olur. Ocak’ta daha yakınız ama kuzeyde kıştır.', 'Summer happens because Earth tilts a little. In January we are closer, but it is winter in the north.'),
    uses3d: true,
  },
  {
    id: 'closest-hottest',
    room: 'scale',
    title: L('En yakın en sıcak mı?', 'Is the closest the hottest?'),
    question: L('Hangisinin yüzeyi en sıcaktır?', 'Which surface is the hottest?'),
    watchHint: L('Venüs’ün kalın havasını kaldır ve geri koy. En sıcak yer değişir mi?', 'Take Venus’s thick air off, then put it back. Does the hottest place change?'),
    choices: [
      { id: 'mercury', label: L('Merkür', 'Mercury') },
      { id: 'venus', label: L('Venüs', 'Venus') },
      { id: 'earth', label: L('Dünya', 'Earth') },
    ],
    simulateLabel: L('Sonucu gör', 'See the result'),
    resultTitle: L('En yakın, en sıcak demek değildir. En sıcak yüzey Venüs’tür.', 'Closest does not mean hottest. The hottest surface is Venus.'),
    explain: L('Merkür Güneş’e en yakındır. Venüs’ün kalın havası ısıyı tutar. En sıcak yüzey Venüs’tür.', 'Mercury is closest to the Sun. Venus’s thick air holds heat. The hottest surface is Venus.'),
    uses3d: true,
  },
  {
    id: 'comet-tail',
    room: 'sky',
    title: L('Kuyruk hep arkada mı?', 'Is the tail always behind?'),
    question: L('Kuyruk hep arkada mı kalır?', 'Does the tail always stay behind?'),
    watchHint: L('Sürükle veya yaklaştır: kuyruk Güneş’ten uzağa bakar.', 'Drag or zoom: the tail points away from the Sun.'),
    choices: [
      { id: 'behind', label: L('Evet, hep arkada', 'Yes, always behind') },
      { id: 'sun', label: L('Hayır, Güneş’ten uzağa bakar', 'No, it points away from the Sun') },
    ],
    simulateLabel: L('Gördüm', 'I saw it'),
    resultTitle: L('Kuyruk Güneş’ten kaçar.', 'The tail runs from the Sun.'),
    explain: L('Kuyruk gidişin arkasında durmaz. Güneş onu kendinden uzağa iter.', 'The tail does not stay behind the path. The Sun pushes it away.'),
    uses3d: true,
  },
  {
    id: 'kepler-pizza',
    room: 'motion',
    title: L('Yakınken daha hızlı', 'Faster when closer'),
    question: L('Merkür Güneş’e yaklaşınca ne olur?', 'What happens when Mercury gets closer to the Sun?'),
    watchHint: L('Merkür halkasında kalsın. Güneş’e yaklaşınca sarı dilimde hızlanır; uzakta mavi dilimde yavaşlar.', 'Keep Mercury on its ring. Near the Sun it speeds up in the yellow slice; far away it slows in the blue slice.'),
    choices: [
      { id: 'faster', label: L('Hızlanır', 'It speeds up') },
      { id: 'slower', label: L('Yavaşlar', 'It slows down') },
      { id: 'same', label: L('Hep aynı hız', 'Always the same speed') },
    ],
    simulateLabel: L('Gördüm', 'I saw it'),
    resultTitle: L('Güneş’e yakınken daha hızlı gider.', 'It goes faster when it is close to the Sun.'),
    explain: L('Güneş’e yakınken daha hızlı gider. Uzaktayken yavaşlar. İki dilim aynı süredir.', 'It goes faster when close to the Sun. It slows when far. The two slices take the same time.'),
    uses3d: true,
  },
  {
    id: 'mercury-long-day',
    room: 'motion',
    title: L('Merkür’de gün mü uzun, yıl mı?', 'On Mercury, is the day or the year longer?'),
    question: L('Merkür’de bir gün, bir yıldan kısa mıdır?', 'On Mercury, is one day shorter than one year?'),
    watchHint: L('Yılı izle. Tur biter, Güneş bir kez doğup batmaz.', 'Watch the year. The trip ends, but the Sun does not rise and set once.'),
    choices: [
      { id: 'short', label: L('Evet, günü kısadır', 'Yes, its day is short') },
      { id: 'long', label: L('Hayır, günü yıldan uzundur', 'No, its day is longer than its year') },
    ],
    simulateLabel: L('1 yılı izle', 'Watch 1 year'),
    resultTitle: L('Yıl bitti, gün bitmedi.', 'The year ended; the day did not.'),
    explain: L('Merkür kendi etrafında çok yavaş döner. Yılı biter, Güneş bir kez doğup batmadan önce ikinci tura başlar.', 'Mercury spins very slowly. Its year ends, and it starts a second trip before the Sun rises and sets once.'),
    uses3d: true,
  },
  {
    id: 'eclipse-align',
    room: 'build',
    title: L('Her dolunay tutulma mı?', 'Is every full Moon an eclipse?'),
    question: L('Her dolunayda Ay kararır mı?', 'Does the Moon go dark at every full Moon?'),
    watchHint: L('Ay’ı sürükle. Tutulma için Dünya’nın gölgesine gir.', 'Drag the Moon. For an eclipse it must enter Earth’s shadow.'),
    choices: [
      { id: 'always', label: L('Evet, her dolunay tutulmadır', 'Yes, every full Moon is an eclipse') },
      { id: 'align', label: L('Hayır, tam hiza ve gölge gerekir', 'No, a full line-up and shadow are needed') },
    ],
    simulateLabel: L('Hizayı gördüm', 'I saw the line-up'),
    resultTitle: L('Dolunay yetmez. Gölgeye girmek gerekir.', 'A full Moon is not enough. It must enter the shadow.'),
    explain: L('Dolunay yetmez. Ay, Dünya’nın gölgesine tam girmelidir.', 'A full Moon is not enough. The Moon must fully enter Earth’s shadow.'),
    uses3d: true,
  },
  {
    id: 'ursa-hunt',
    room: 'sky',
    title: L('Kepçeyi bul', 'Find the Dipper'),
    question: L('Kepçedeki yedi yıldızı bulabilir misin?', 'Can you find the seven stars in the Dipper?'),
    watchHint: L('Kepçedeki yedi parlak yıldıza dokun.', 'Tap the seven bright stars in the Dipper.'),
    simulateLabel: L('Yıldızlara dokun', 'Tap the stars'),
    resultTitle: L('Büyükayı bir gezegen değil, yedi yıldızın kepçesidir.', 'Ursa Major is not a planet. It is a dipper of seven stars.'),
    explain: L('Büyükayı bir gezegen değil. Yedi parlak yıldızın gökyüzünde çizdiği kepçedir.', 'Ursa Major is not a planet. It is a dipper drawn by seven bright stars in the sky.'),
    uses3d: true,
  },
  {
    id: 'light-diary',
    room: 'scale',
    title: L('Uzak ışık daha mı uzun gider?', 'Does far light take longer?'),
    question: L('Daha uzak bir yıldıza ışık daha mı uzun sürer?', 'Does light take longer to a farther star?'),
    watchHint: L('Önce Dünya’ya ışık gönder. Sonra Proxima yolunu izle.', 'Send light to Earth first. Then watch the Proxima path.'),
    choices: [
      { id: 'same', label: L('Hayır, her yere aynı anda varır', 'No, it arrives everywhere at once') },
      { id: 'far', label: L('Evet, uzak yol daha uzun sürer', 'Yes, a farther path takes longer') },
    ],
    simulateLabel: L('Karşılaştırdım', 'I compared'),
    resultTitle: L('Işık Dünya’ya dakikalar, Proxima’ya yıllar sürer.', 'Light takes minutes to Earth, years to Proxima.'),
    explain: L('Işık Dünya’ya dakikalar sürer. En yakın yıldıza (Proxima) dört yıldan uzun sürer.', 'Light takes minutes to Earth. To the nearest star (Proxima) it takes more than four years.'),
    uses3d: true,
  },
]

export function getActivity(id: LabActivityId): LabActivity {
  const found = LAB_ACTIVITIES.find((item) => item.id === id)
  if (!found) throw new Error(`Bilinmeyen simülasyon: ${id}`)
  return found
}

const LAB_CORRECT_CHOICE: Partial<Record<LabActivityId, string>> = {
  'earth-year': 'inner',
  'who-faster': 'mercury',
  'spin-vs-orbit': 'spin',
  'day-night': 'same',
  'mass-weight': 'no',
  'drop-ball': 'jupiter',
  jump: 'moon',
  'real-scale': 'model',
  'moon-phases': 'night',
  'stars-or-earth': 'earth',
  'light-travel': 'minutes',
  'seasons-tilt': 'tilt',
  'closest-hottest': 'venus',
  'comet-tail': 'sun',
  'kepler-pizza': 'faster',
  'mercury-long-day': 'long',
  'eclipse-align': 'align',
  'light-diary': 'far',
}

export function isCorrectLabChoice(activityId: LabActivityId, choiceId: string): boolean | undefined {
  const correct = LAB_CORRECT_CHOICE[activityId]
  if (!correct) return undefined
  return choiceId === correct
}

export function activitiesInRoom(room: LabRoomId): LabActivity[] {
  return LAB_ACTIVITIES.filter((item) => item.room === room)
}

export const CHALLENGE_IDS = ['arrange-orbits', 'moon-phases', 'closest-hottest', 'drop-ball', 'who-faster'] as const

export type ChallengeId = (typeof CHALLENGE_IDS)[number]

export const CHALLENGE_BLURB: Record<ChallengeId, LocText> = {
  'arrange-orbits': L('8 gezegeni Güneş’ten uzağa diz.', 'Line up 8 planets going out from the Sun.'),
  'moon-phases': L('Ay’ı sürükle, dolunayı yakala.', 'Drag the Moon and catch the full Moon.'),
  'closest-hottest': L('En yakın mı, en sıcak mı?', 'Closest, or hottest?'),
  'drop-ball': L('Aynı top nerede önce düşer?', 'Where does the same ball fall first?'),
  'who-faster': L('Kim önce bir tur atar?', 'Who finishes one trip first?'),
}

export const CHALLENGE_VERB: Record<ChallengeId, LocText> = {
  'arrange-orbits': L('Diz', 'Line up'),
  'moon-phases': L('Sürükle', 'Drag'),
  'closest-hottest': L('Seç', 'Pick'),
  'drop-ball': L('Seç', 'Pick'),
  'who-faster': L('Seç', 'Pick'),
}

export const CHALLENGE_ICON: Record<ChallengeId, 'planet' | 'orbit' | 'thermo' | 'weight'> = {
  'arrange-orbits': 'planet',
  'moon-phases': 'orbit',
  'closest-hottest': 'thermo',
  'drop-ball': 'weight',
  'who-faster': 'orbit',
}

export const CHALLENGE_ACTIVITIES = CHALLENGE_IDS.map((id) => getActivity(id))

export const FEATURED_ACTIVITIES = CHALLENGE_ACTIVITIES
