export interface QuizQuestion {
  id: string
  prompt: string
  options: string[]
  correctIndex: number
  explain: string
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    prompt: 'Dünya’nın Güneş etrafında tur atmasına ne denir?',
    options: ['Kendi etrafında dönme', 'Güneş etrafında tur', 'Ay’ın çekmesi', 'Yana yatmak'],
    correctIndex: 1,
    explain: 'Güneş etrafında tur atmak yılı yapar. Kendi etrafında dönme gece ve gündüz yapar.',
  },
  {
    id: 'q2',
    prompt: 'Yaz ve kış neden olur?',
    options: ['Dünya Güneş’e yaklaşır', 'Dünya biraz yana yatıktır', 'Ay çeker', 'Güneş büyür'],
    correctIndex: 1,
    explain: 'Dünya biraz yana yatıktır. Yazın Güneş ışığı daha dik gelir.',
  },
  {
    id: 'q3',
    prompt: 'Venüs neden Merkür’den sıcaktır?',
    options: ['Güneş’e daha yakındır', 'Kalın havası ısıyı tutar', 'Yanardağı daha çoktur', 'Daha hızlı döner'],
    correctIndex: 1,
    explain: 'Venüs’ün kalın havası ısıyı tutar. Bu yüzden en sıcaktır.',
  },
  {
    id: 'q4',
    prompt: 'Ay neden hep aynı yüzünü gösterir?',
    options: ['Ay dönmez', 'Dönmesi ve turu aynı sürer', 'Dünya’nın gölgesi', 'Güneş rüzgârı'],
    correctIndex: 1,
    explain: 'Ay’ın dönmesi ile Dünya etrafındaki turu aynı sürer. Bu yüzden hep aynı yüzünü görürüz.',
  },
  {
    id: 'q5',
    prompt: 'Plüton neden artık gezegen sayılmaz?',
    options: ['Çok soğuktur', 'Yolundaki taşları temizlememiştir', 'Uydusu yoktur', 'Halkası yoktur'],
    correctIndex: 1,
    explain: 'Bir gezegen, yolundaki diğer taşları temizlemiş olmalıdır. Plüton bunu yapmamıştır.',
  },
]
