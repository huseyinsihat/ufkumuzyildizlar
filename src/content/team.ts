export const TEAM = {
  project: 'Ufkumuz Yıldızlar',
  home: 'Proje Etkinlikleri',
  teamName: 'Minik Dahiler',
  event: 'TEKNOFEST 2026',
  category: 'Astronomi, Uzay Bilimleri ve Havacılık',
  advisor: { name: 'Hüseyin SIHAT', role: 'Takım Danışmanı' },
  members: [
    { name: 'Hadiye Tombuloğlu', role: 'Takım Kaptanı' },
    { name: 'Reyyan Aksen', role: 'Takım Üyesi' },
    { name: 'Hamza Büyükkaya', role: 'Takım Üyesi' },
    { name: 'Neva Özdemir', role: 'Takım Üyesi' },
    { name: 'Nisa Altun', role: 'Takım Üyesi' },
    { name: 'Çınar Efe Çetin', role: 'Takım Üyesi' },
  ],
}

export const DEMO_STEPS = [
  {
    title: 'Güneş Sistemine bak',
    body: 'Gezegenler Güneş’in çevresinde dolanır. Kamerayı sürükleyerek bakışını değiştir.',
    action: 'overview' as const,
  },
  {
    title: 'Dünya’ya git',
    body: 'Dünya mavi gezegendir. Bir günü dönme, bir yılı dolanımdır. Bunlar farklı şeylerdir.',
    action: 'earth' as const,
  },
  {
    title: 'Eksen eğikliği',
    body: 'Dünya’nın ekseni yaklaşık 23,4° eğiktir. Bu eğiklik mevsimleri doğurur; Güneş’e yakınlık değil.',
    action: 'tilt' as const,
  },
  {
    title: 'Zaman yolculuğu',
    body: 'Zaman makinesi ile bir yıl ileri git. Gezegenlerin yörüngede nasıl ilerlediğini izle.',
    action: 'year' as const,
  },
  {
    title: 'Dünya ve Mars',
    body: 'İki gezegeni yan yana karşılaştır: çap, gün, yıl, yerçekimi.',
    action: 'compare' as const,
  },
  {
    title: 'Satürn’ün halkaları',
    body: 'Halkalar düz bir tabak değil; buz ve kayadan oluşan bir kuşağıdır.',
    action: 'saturn' as const,
  },
]