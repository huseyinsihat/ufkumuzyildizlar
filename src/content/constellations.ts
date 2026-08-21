export interface ConstellationStar {
  id: string
  name: string
  x: number
  y: number
  z: number
}

export interface Constellation {
  id: string
  name: string
  description: string
  stars: ConstellationStar[]
  lines: [string, string][]
}

function star(id: string, name: string, x: number, y: number, z: number): ConstellationStar {
  const length = Math.hypot(x, y, z) || 1
  return { id, name, x: x / length, y: y / length, z: z / length }
}

export const CONSTELLATIONS: Constellation[] = [
  {
    id: 'ursa-major',
    name: 'Büyük Ayı',
    description: 'Kuzey göğünün en tanınmış takımyıldızıdır. Kepçe biçimindeki yedi yıldızı kolayca bulunur.',
    stars: [
      star('dubhe', 'Dubhe', 0.35, 0.88, 0.12),
      star('merak', 'Merak', 0.28, 0.82, 0.22),
      star('phecda', 'Phecda', 0.12, 0.8, 0.28),
      star('megrez', 'Megrez', 0.02, 0.84, 0.22),
      star('alioth', 'Alioth', -0.12, 0.86, 0.18),
      star('mizar', 'Mizar', -0.24, 0.84, 0.12),
      star('alcaid', 'Alcaid', -0.38, 0.78, 0.02),
    ],
    lines: [
      ['dubhe', 'merak'],
      ['merak', 'phecda'],
      ['phecda', 'megrez'],
      ['megrez', 'dubhe'],
      ['megrez', 'alioth'],
      ['alioth', 'mizar'],
      ['mizar', 'alcaid'],
    ],
  },
  {
    id: 'ursa-minor',
    name: 'Küçük Ayı',
    description: 'Kutup Yıldızı (Polaris) bu takımyıldızdadır. Kuzeyi bulmak için kullanılır.',
    stars: [
      star('polaris', 'Polaris', 0.02, 0.99, 0.04),
      star('yildun', 'Yildun', 0.08, 0.94, 0.1),
      star('epsilon-umi', 'ε UMi', 0.12, 0.9, 0.16),
      star('kochab', 'Kochab', 0.18, 0.86, 0.22),
      star('pherkad', 'Pherkad', 0.1, 0.84, 0.28),
    ],
    lines: [
      ['polaris', 'yildun'],
      ['yildun', 'epsilon-umi'],
      ['epsilon-umi', 'kochab'],
      ['kochab', 'pherkad'],
      ['pherkad', 'epsilon-umi'],
    ],
  },
  {
    id: 'orion',
    name: 'Orion',
    description: 'Avcı Orion. Kemerindeki üç yıldız ve parlak Betelgeuse ile Rigel kolay tanınır.',
    stars: [
      star('betelgeuse', 'Betelgeuse', 0.72, 0.18, 0.55),
      star('bellatrix', 'Bellatrix', 0.62, 0.22, 0.64),
      star('alnitak', 'Alnitak', 0.66, 0.02, 0.62),
      star('alnilam', 'Alnilam', 0.7, 0.02, 0.58),
      star('mintaka', 'Mintaka', 0.74, 0.02, 0.54),
      star('saiph', 'Saiph', 0.68, -0.18, 0.62),
      star('rigel', 'Rigel', 0.78, -0.16, 0.5),
    ],
    lines: [
      ['betelgeuse', 'bellatrix'],
      ['bellatrix', 'mintaka'],
      ['mintaka', 'alnilam'],
      ['alnilam', 'alnitak'],
      ['alnitak', 'saiph'],
      ['saiph', 'rigel'],
      ['rigel', 'mintaka'],
      ['betelgeuse', 'alnitak'],
    ],
  },
  {
    id: 'cassiopeia',
    name: 'Cassiopeia',
    description: 'W harfine benzeyen beş parlak yıldız. Kuzey göğünde neredeyse her zaman görünür.',
    stars: [
      star('schedar', 'Schedar', -0.22, 0.72, 0.58),
      star('caph', 'Caph', -0.1, 0.68, 0.64),
      star('gamma-cas', 'Navi', -0.32, 0.76, 0.5),
      star('ruchbah', 'Ruchbah', -0.42, 0.7, 0.48),
      star('segin', 'Segin', -0.52, 0.66, 0.44),
    ],
    lines: [
      ['caph', 'schedar'],
      ['schedar', 'gamma-cas'],
      ['gamma-cas', 'ruchbah'],
      ['ruchbah', 'segin'],
    ],
  },
]
