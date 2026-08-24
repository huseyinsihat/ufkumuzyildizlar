export const TEAM = {
  project: 'Ufkumuz Yıldızlar',
  home: 'Proje Etkinlikleri',
  teamName: 'Minik Dahiler',
  event: 'TEKNOFEST 2026',
  category: 'Uzay Vatanda Millî Teknoloji Hamlesi',
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
    body: 'Gezegenler Güneş’in etrafında döner. Ekranı sürükle, bakışını değiştir.',
    action: 'overview' as const,
  },
  {
    title: 'Dünya’ya git',
    body: 'Dünya mavi gezegendir. Kendi etrafında dönünce gün olur. Güneş etrafında tur atınca yıl olur.',
    action: 'earth' as const,
  },
  {
    title: 'Dünya biraz yana yatık',
    body: 'Dünya biraz yana yatıktır. Yaz ve kış bundan olur. Güneş’e yakınlıktan değil.',
    action: 'tilt' as const,
  },
  {
    title: 'Zaman yolculuğu',
    body: 'Zamanı ileri al. Bir yıl sonra gezegenlerin nereye gittiğine bak.',
    action: 'year' as const,
  },
  {
    title: 'Dünya ve Mars',
    body: 'İki gezegeni yan yana gör. Hangisi büyük? Hangisinin yılı uzun?',
    action: 'compare' as const,
  },
  {
    title: 'Satürn’ün halkaları',
    body: 'Halkalar bir tabak değil. Buz ve kaya parçalarıdır.',
    action: 'saturn' as const,
  },
]