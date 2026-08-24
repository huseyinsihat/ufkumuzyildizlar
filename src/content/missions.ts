export interface Mission {
  id: string
  title: string
  instruction: string
  hint: string
  points: number
}

export const MISSIONS: Mission[] = [
  {
    id: 'find-earth',
    title: 'Görev 1 — Dünya’yı bul',
    instruction: 'Güneş Sistemi’nde Dünya’yı seç.',
    hint: 'Mavi gezegen, Güneş’ten üçüncü sırada.',
    points: 50,
  },
  {
    id: 'find-mars-orbit',
    title: 'Görev 2 — Mars’ın yörüngesini göster',
    instruction: 'Mars’ın yörüngesine dokunarak Kızıl Gezegen’i seç.',
    hint: 'Etiketler kapalı; kalın yörünge halkalarından Mars’ı bul.',
    points: 60,
  },
  {
    id: 'find-jupiter',
    title: 'Görev 3 — Jüpiter’i bul',
    instruction: 'En büyük gezegeni seç.',
    hint: 'Mars’tan sonra, asteroit kuşağının hemen ötesinde.',
    points: 50,
  },
  {
    id: 'saturn-rings',
    title: 'Görev 4 — Satürn’ün halkalarını incele',
    instruction: 'Satürn’ü seçip halkalarını yakından gör.',
    hint: 'Halkalı gezegeni sola kaydırarak bulabilirsin.',
    points: 70,
  },
  {
    id: 'earth-tilt',
    title: 'Görev 5 — Dünya’nın yana yatık duruşunu göster',
    instruction: 'Dünya’yı seç ve Ayarlar’dan Eksenler’i aç.',
    hint: 'Ayarlar’daki Eksenler anahtarı Dünya seçiliyken görevi tamamlar.',
    points: 80,
  },
  {
    id: 'earth-year',
    title: 'Görev 6 — Bir Dünya yılı gözle',
    instruction: 'Zaman makinesiyle en az 1 yıl ileri git ve gezegenlerin turunu izle.',
    hint: 'Alttan “1 Yıl Atla”ya bas veya 1 yıl/sn hızını dene.',
    points: 100,
  },
  {
    id: 'find-mars',
    title: 'Görev 7 — Mars’ı keşfet',
    instruction: 'Kızıl Gezegen’i seç.',
    hint: 'Dünya’dan bir sonraki gezegen.',
    points: 40,
  },
]

export const BADGES = [
  { id: 'first-discovery', name: 'İlk Keşif', description: 'Dünya’yı buldun.' },
  { id: 'mars-explorer', name: 'Mars Kaşifi', description: 'Mars’ı inceledin.' },
  { id: 'planet-expert', name: 'Gezegen Uzmanı', description: 'Birden fazla gezegeni keşfettin.' },
  { id: 'orbit-master', name: 'Yörünge Ustası', description: 'Yörünge sırasını veya yılı gördün.' },
  { id: 'kepler-slice', name: 'Yakınken hızlanır', description: 'Güneş’e yakınken gezegenin hızlandığını gördün.' },
  { id: 'tilt-explorer', name: 'Eksen Kaşifi', description: 'Mevsimlerin eğiklikten geldiğini gördün.' },
  { id: 'ring-observer', name: 'Halka Gözlemcisi', description: 'Satürn’ün buz halkalarına baktın.' },
  { id: 'full-moon', name: 'Dolunay Ustası', description: 'Ay’ın aydınlık dilimini hizaladın.' },
  { id: 'gravity-lab', name: 'Yerçekimi Deneycisi', description: 'Kütle ile ağırlığın farkını denedin.' },
  { id: 'bear-hunter', name: 'Büyükayı Avcısı', description: 'Yedi yıldızı sırayla buldun.' },
  { id: 'light-scribe', name: 'Işık Günlüğü', description: 'Işığın zamanda yol aldığını gördün.' },
  { id: 'solar-sage', name: 'Güneş Sistemi Bilgini', description: 'Görevlerin çoğunu tamamladın.' },
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
