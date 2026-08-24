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
    answer: 'Mars’ın toprağında pas vardır. Pas kırmızı olduğu için Mars kırmızı görünür.',
    targetId: 'mars',
  },
  {
    id: 'saturn-rings',
    title: 'Satürn’ün halkalarını incele',
    question: 'Halkalar katı bir tabak mıdır?',
    answer: 'Hayır. Halkalar buz ve kaya parçalarıdır. Uzaktan bir halka gibi görünürler.',
    targetId: 'saturn',
  },
  {
    id: 'venus-hot',
    title: 'Venüs neden Dünya’dan daha sıcaktır?',
    question: 'Venüs Güneş’e Merkür’den uzak. Nasıl daha sıcak olur?',
    answer: 'Venüs’ün kalın havası Güneş ısısını tutar. Bu yüzden en sıcaktır.',
    targetId: 'venus',
  },
  {
    id: 'uranus-tilt',
    title: 'Uranüs neden farklı döner?',
    question: 'Uranüs neden yan yatarak döner?',
    answer: 'Uranüs neredeyse yan yatar. Büyük bir çarpışmadan sonra böyle durduğu düşünülür.',
    targetId: 'uranus',
  },
  {
    id: 'earth-seasons',
    title: 'Mevsimler nasıl oluşur?',
    question: 'Dünya Güneş’e yaklaştığı için mi yaz olur?',
    answer: 'Hayır. Dünya biraz yana yatıktır. Yazın Güneş ışığı daha dik gelir.',
    targetId: 'earth',
  },
  {
    id: 'moon-face',
    title: 'Ay neden hep aynı yüzünü gösterir?',
    question: 'Ay neden hep aynı yüzünü gösterir?',
    answer: 'Ay’ın dönmesi ile Dünya etrafındaki turu aynı sürer. Bu yüzden hep aynı yüzünü görürüz.',
    targetId: 'moon',
  },
]
