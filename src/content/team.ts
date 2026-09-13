import { L, type LocText } from '../i18n/types'

export const TEAM = {
  project: 'Ufkumuz Yıldızlar',
  home: L('Proje Etkinlikleri', 'Project Activities'),
  teamName: 'Minik Dahiler',
  event: 'TEKNOFEST 2026',
  category: L('Uzay Vatanda Millî Teknoloji Hamlesi', 'National Technology Move in the Homeland of Space'),
  advisor: { name: 'Hüseyin SIHAT', role: L('Takım Danışmanı', 'Team advisor') },
  members: [
    { name: 'Hadiye Tombuloğlu', role: L('Takım Kaptanı', 'Team captain') },
    { name: 'Reyyan Aksen', role: L('Takım Üyesi', 'Team member') },
    { name: 'Hamza Büyükkaya', role: L('Takım Üyesi', 'Team member') },
    { name: 'Neva Özdemir', role: L('Takım Üyesi', 'Team member') },
    { name: 'Nisa Altun', role: L('Takım Üyesi', 'Team member') },
    { name: 'Çınar Efe Çetin', role: L('Takım Üyesi', 'Team member') },
  ],
}

export const DEMO_STEPS: { title: LocText; body: LocText; action: 'overview' | 'earth' | 'tilt' | 'year' | 'compare' | 'saturn' }[] = [
  {
    title: L('Güneş Sistemine bak', 'Look at the Solar System'),
    body: L('Gezegenler Güneş’in etrafında döner. Ekranı sürükle, bakışını değiştir.', 'Planets go around the Sun. Drag the screen to change the view.'),
    action: 'overview',
  },
  {
    title: L('Dünya’ya git', 'Go to Earth'),
    body: L('Dünya mavi gezegendir. Kendi etrafında dönünce gün olur. Güneş etrafında tur atınca yıl olur.', 'Earth is the blue planet. A day happens when it spins. A year happens when it goes around the Sun.'),
    action: 'earth',
  },
  {
    title: L('Dünya biraz yana yatık', 'Earth tilts a little'),
    body: L('Dünya biraz yana yatıktır. Yaz ve kış bundan olur. Güneş’e yakınlıktan değil.', 'Earth tilts a little. Summer and winter come from that. Not from being closer to the Sun.'),
    action: 'tilt',
  },
  {
    title: L('Zaman yolculuğu', 'Time travel'),
    body: L('Zamanı ileri al. Bir yıl sonra gezegenlerin nereye gittiğine bak.', 'Move time forward. See where the planets go after one year.'),
    action: 'year',
  },
  {
    title: L('Dünya ve Mars', 'Earth and Mars'),
    body: L('İki gezegeni yan yana gör. Hangisi büyük? Hangisinin yılı uzun?', 'See two planets side by side. Which is bigger? Which year is longer?'),
    action: 'compare',
  },
  {
    title: L('Satürn’ün halkaları', 'Saturn’s rings'),
    body: L('Halkalar bir tabak değil. Buz ve kaya parçalarıdır.', 'The rings are not a plate. They are bits of ice and rock.'),
    action: 'saturn',
  },
]
