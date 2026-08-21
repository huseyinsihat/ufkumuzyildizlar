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
    prompt: 'Dünya’nın Güneş etrafındaki dolanımına ne denir?',
    options: ['Dönme', 'Dolanma', 'Gelgit', 'Eksen eğikliği'],
    correctIndex: 1,
    explain: 'Dolanma (revolution) Güneş çevresindeki turdur. Dönme ise kendi ekseni etrafındaki dönüştür.',
  },
  {
    id: 'q2',
    prompt: 'Mevsimlerin asıl nedeni nedir?',
    options: ['Dünya’nın Güneş’e yaklaşıp uzaklaşması', 'Eksen eğikliği', 'Ay’ın çekimi', 'Güneş’in büyümesi'],
    correctIndex: 1,
    explain: 'Dünya’nın ekseni yaklaşık 23,4° eğiktir. Bu, bir yarıkürenin yazın Güneş’i daha dik almasını sağlar.',
  },
  {
    id: 'q3',
    prompt: 'Venüs neden Merkür’den sıcaktır?',
    options: ['Güneş’e daha yakındır', 'Kalın atmosferi ısıyı hapseder', 'Volkanları daha fazladır', 'Daha hızlı döner'],
    correctIndex: 1,
    explain: 'Venüs’ün karbondioksit atmosferi güçlü bir sera etkisi yaratır.',
  },
  {
    id: 'q4',
    prompt: 'Ay neden hep aynı yüzünü gösterir?',
    options: ['Ay dönmez', 'Gelgit kilidi', 'Dünya’nın gölgesi', 'Güneş rüzgârı'],
    correctIndex: 1,
    explain: 'Ay’ın dönme ve dolanma süreleri eşittir. Buna gelgit kilidi denir.',
  },
  {
    id: 'q5',
    prompt: 'Plüton neden gezegen listesinde “cüce gezegen” olarak geçer?',
    options: ['Çok soğuktur', 'Yörüngesindeki komşularını temizlememiştir', 'Uydusu yoktur', 'Halkası yoktur'],
    correctIndex: 1,
    explain: 'IAU 2006 tanımına göre bir gezegen, yörüngesindeki diğer cisimleri “temizlemiş” olmalıdır.',
  },
]
