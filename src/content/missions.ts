import { L, type LocText } from '../i18n/types'

export interface Mission {
  id: string
  title: LocText
  instruction: LocText
  hint: LocText
  points: number
}

export const MISSIONS: Mission[] = [
  {
    id: 'find-earth',
    title: L('Görev 1 — Dünya’yı bul', 'Mission 1 — Find Earth'),
    instruction: L('Güneş Sistemi’nde Dünya’yı seç.', 'Pick Earth in the Solar System.'),
    hint: L('Mavi gezegen, Güneş’ten üçüncü sırada.', 'The blue planet, third from the Sun.'),
    points: 50,
  },
  {
    id: 'find-mars-orbit',
    title: L('Görev 2 — Mars’ın yörüngesini göster', 'Mission 2 — Show the orbit of Mars'),
    instruction: L('Mars’ın yörüngesine dokunarak Kızıl Gezegen’i seç.', 'Tap the orbit of Mars to pick the Red Planet.'),
    hint: L('Etiketler kapalı; kalın yörünge halkalarından Mars’ı bul.', 'Names are off; find Mars from the thick orbit rings.'),
    points: 60,
  },
  {
    id: 'find-jupiter',
    title: L('Görev 3 — Jüpiter’i bul', 'Mission 3 — Find Jupiter'),
    instruction: L('En büyük gezegeni seç.', 'Pick the biggest planet.'),
    hint: L('Mars’tan sonra, asteroit kuşağının hemen ötesinde.', 'After Mars, just beyond the asteroid belt.'),
    points: 50,
  },
  {
    id: 'saturn-rings',
    title: L('Görev 4 — Satürn’ün halkalarını incele', 'Mission 4 — Look at Saturn’s rings'),
    instruction: L('Satürn’ü seçip halkalarını yakından gör.', 'Pick Saturn and see its rings up close.'),
    hint: L('Halkalı gezegeni sola kaydırarak bulabilirsin.', 'Slide left to find the planet with rings.'),
    points: 70,
  },
  {
    id: 'earth-tilt',
    title: L('Görev 5 — Dünya’nın yana yatık duruşunu göster', 'Mission 5 — Show that Earth tilts'),
    instruction: L('Dünya’yı seç ve Ayarlar’dan Eksenler’i aç.', 'Pick Earth and turn Axes on in Settings.'),
    hint: L('Ayarlar’daki Eksenler anahtarı Dünya seçiliyken görevi tamamlar.', 'The Axes switch in Settings finishes the mission when Earth is selected.'),
    points: 80,
  },
  {
    id: 'earth-year',
    title: L('Görev 6 — Bir Dünya yılı gözle', 'Mission 6 — Watch one Earth year'),
    instruction: L('Zaman makinesiyle en az 1 yıl ileri git ve gezegenlerin turunu izle.', 'Jump at least 1 year with the time machine and watch the planets go around.'),
    hint: L('Alttan “1 Yıl Atla”ya bas veya 1 yıl/sn hızını dene.', 'Tap “Skip 1 year” at the bottom, or try the 1 year/s speed.'),
    points: 100,
  },
  {
    id: 'find-mars',
    title: L('Görev 7 — Mars’ı keşfet', 'Mission 7 — Discover Mars'),
    instruction: L('Kızıl Gezegen’i seç.', 'Pick the Red Planet.'),
    hint: L('Dünya’dan bir sonraki gezegen.', 'The next planet after Earth.'),
    points: 40,
  },
]

export const BADGES = [
  { id: 'first-discovery', name: L('İlk Keşif', 'First Discovery'), description: L('Dünya’yı buldun.', 'You found Earth.') },
  { id: 'mars-explorer', name: L('Mars Kaşifi', 'Mars Explorer'), description: L('Mars’ı inceledin.', 'You looked at Mars.') },
  { id: 'planet-expert', name: L('Gezegen Uzmanı', 'Planet Expert'), description: L('Birden fazla gezegeni keşfettin.', 'You discovered more than one planet.') },
  { id: 'orbit-master', name: L('Yörünge Ustası', 'Orbit Master'), description: L('Yörünge sırasını veya yılı gördün.', 'You saw the orbit order or a year.') },
  { id: 'kepler-slice', name: L('Yakınken hızlanır', 'Faster when closer'), description: L('Güneş’e yakınken gezegenin hızlandığını gördün.', 'You saw a planet speed up near the Sun.') },
  { id: 'tilt-explorer', name: L('Eksen Kaşifi', 'Axis Explorer'), description: L('Mevsimlerin eğiklikten geldiğini gördün.', 'You saw that seasons come from the tilt.') },
  { id: 'ring-observer', name: L('Halka Gözlemcisi', 'Ring Watcher'), description: L('Satürn’ün buz halkalarına baktın.', 'You looked at Saturn’s ice rings.') },
  { id: 'full-moon', name: L('Dolunay Ustası', 'Full Moon Master'), description: L('Ay’ın aydınlık dilimini hizaladın.', 'You lined up the Moon’s bright slice.') },
  { id: 'gravity-lab', name: L('Yerçekimi Deneycisi', 'Gravity Tester'), description: L('Kütle ile ağırlığın farkını denedin.', 'You tried the difference between mass and weight.') },
  { id: 'bear-hunter', name: L('Büyükayı Avcısı', 'Ursa Major Hunter'), description: L('Yedi yıldızı sırayla buldun.', 'You found the seven stars in order.') },
  { id: 'light-scribe', name: L('Işık Günlüğü', 'Light Diary'), description: L('Işığın zamanda yol aldığını gördün.', 'You saw that light takes time to travel.') },
  { id: 'solar-sage', name: L('Güneş Sistemi Bilgini', 'Solar System Sage'), description: L('Görevlerin çoğunu tamamladın.', 'You finished most of the missions.') },
] as const

export type BadgeId = (typeof BADGES)[number]['id']

export const LAB_BADGES: Record<string, BadgeId> = {
  'who-faster': 'orbit-master',
  'earth-year': 'orbit-master',
  'arrange-orbits': 'orbit-master',
  'kepler-pizza': 'kepler-slice',
  'seasons-tilt': 'tilt-explorer',
  'moon-phases': 'full-moon',
  'eclipse-align': 'full-moon',
  'drop-ball': 'gravity-lab',
  jump: 'gravity-lab',
  'mass-weight': 'gravity-lab',
  'ursa-hunt': 'bear-hunter',
  'light-diary': 'light-scribe',
  'light-travel': 'light-scribe',
  'day-night': 'tilt-explorer',
  'spin-vs-orbit': 'tilt-explorer',
  'real-scale': 'orbit-master',
  'comet-tail': 'orbit-master',
  'mercury-long-day': 'orbit-master',
  'stars-or-earth': 'bear-hunter',
  'star-names': 'bear-hunter',
  'space-mission': 'mars-explorer',
  'closest-hottest': 'planet-expert',
}
