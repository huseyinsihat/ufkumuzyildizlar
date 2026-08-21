import type { BodyId } from '../types/planet'

export interface ExplorePrompt {
  id: string
  title: string
  question: string
  answer: string
  targetId?: BodyId
}

export const EXPLORE_PROMPTS: ExplorePrompt[] = [
  {
    id: 'mars-today',
    title: 'Bugün Mars’ı keşfet',
    question: 'Mars neden kırmızı görünür?',
    answer:
      'Mars’ın yüzeyi demir oksit, yani pas içerir. Pas kırmızı-turuncu olduğu için gezegen kızıl görünür.',
    targetId: 'mars',
  },
  {
    id: 'saturn-rings',
    title: 'Satürn’ün halkalarını incele',
    question: 'Halkalar katı bir disk midir?',
    answer:
      'Hayır. Halkalar milyonlarca buz ve kaya parçasından oluşur. Uzaktan düz bir halka gibi görünürler.',
    targetId: 'saturn',
  },
  {
    id: 'venus-hot',
    title: 'Venüs neden Dünya’dan daha sıcaktır?',
    question: 'Güneş’e daha uzak olan Venüs, Merkür’den bile nasıl daha sıcak olur?',
    answer:
      'Venüs’ün kalın karbondioksit atmosferi Güneş ısısını hapseder. Buna sera etkisi denir.',
    targetId: 'venus',
  },
  {
    id: 'uranus-tilt',
    title: 'Uranüs neden farklı döner?',
    question: 'Uranüs neden yan yatarak dolanır?',
    answer:
      'Eksen eğikliği yaklaşık 98°dir. Büyük bir çarpışma sonucu yan yattığı düşünülür. Bu yüzden mevsimleri çok uzundur.',
    targetId: 'uranus',
  },
  {
    id: 'earth-seasons',
    title: 'Mevsimler nasıl oluşur?',
    question: 'Dünya Güneş’e yaklaştığı için mi yaz olur?',
    answer:
      'Hayır. Asıl neden eksen eğikliğidir. Yazın yarıküre Güneş’e daha dik bakar; kışın daha eğik bakar.',
    targetId: 'earth',
  },
  {
    id: 'moon-face',
    title: 'Ay neden hep aynı yüzünü gösterir?',
    question: 'Gelgit kilidi nedir?',
    answer:
      'Ay’ın kendi ekseni etrafında dönüş süresi, Dünya etrafındaki dolanma süresine eşittir. Bu yüzden hep aynı yüzünü görürüz.',
    targetId: 'moon',
  },
]
