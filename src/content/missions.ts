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
    instruction: 'Yörüngeleri aç ve Mars’ı seç.',
    hint: 'Sol menüden Yörüngeler’i aç, sonra kızıl gezegene tıkla.',
    points: 60,
  },
  {
    id: 'find-jupiter',
    title: 'Görev 3 — Jüpiter’i bul',
    instruction: 'En büyük gezegeni seç.',
    hint: 'Mars’tan sonra, asteroid kuşağının hemen ötesinde.',
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
    title: 'Görev 5 — Dünya’nın eksen eğikliğini göster',
    instruction: 'Dünya’yı seç ve “Eksenimi göster”i aç.',
    hint: 'Bilgi panelindeki Dönüş sekmesinden ekseni açabilirsin.',
    points: 80,
  },
  {
    id: 'earth-year',
    title: 'Görev 6 — Bir Dünya yılı gözle',
    instruction: 'Zaman makinesiyle en az 1 yıl ileri git ve gezegenlerin dolanımını izle.',
    hint: 'Alttan “1 yıl sonra”ya bas veya 1 yıl/sn hızını dene.',
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
  { id: 'first-discovery', name: 'İlk Keşif', description: 'İlk gezegenini seçtin.' },
  { id: 'mars-explorer', name: 'Mars Kaşifi', description: 'Mars’ı inceledin.' },
  { id: 'planet-expert', name: 'Gezegen Uzmanı', description: 'Birden fazla gezegeni keşfettin.' },
  { id: 'orbit-master', name: 'Yörünge Ustası', description: 'Yörüngeyi bilinçli olarak gösterdin.' },
  { id: 'solar-sage', name: 'Güneş Sistemi Bilgini', description: 'Görevlerin çoğunu tamamladın.' },
] as const
