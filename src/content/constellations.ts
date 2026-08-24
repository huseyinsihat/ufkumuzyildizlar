import { equatorialToSceneDir } from '../astronomy/skyCoordinates'

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

function star(id: string, name: string, raHours: number, decDeg: number): ConstellationStar {
  const dir = equatorialToSceneDir(raHours, decDeg)
  return { id, name, x: dir.x, y: dir.y, z: dir.z }
}

export const CONSTELLATIONS: Constellation[] = [
  {
    id: 'ursa-major',
    name: 'Büyük Ayı',
    description: 'Kuzey göğünün en tanınmış takımyıldızıdır. Kepçe biçimindeki yedi yıldızı kolayca bulunur.',
    stars: [
      star('dubhe', 'Dubhe', 11.0622, 61.751),
      star('merak', 'Merak', 11.0307, 56.382),
      star('phecda', 'Phecda', 11.8972, 53.695),
      star('megrez', 'Megrez', 12.2571, 57.033),
      star('alioth', 'Alioth', 12.9004, 55.96),
      star('mizar', 'Mizar', 13.3987, 54.925),
      star('alcaid', 'Alcaid', 13.7923, 49.313),
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
      star('polaris', 'Polaris', 2.5303, 89.2641),
      star('yildun', 'Yildun', 17.5362, 86.586),
      star('epsilon-umi', 'ε UMi', 16.7662, 82.037),
      star('kochab', 'Kochab', 14.8451, 74.155),
      star('pherkad', 'Pherkad', 15.3457, 71.834),
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
      star('betelgeuse', 'Betelgeuse', 5.9195, 7.407),
      star('bellatrix', 'Bellatrix', 5.4189, 6.35),
      star('alnitak', 'Alnitak', 5.6794, -1.943),
      star('alnilam', 'Alnilam', 5.6036, -1.202),
      star('mintaka', 'Mintaka', 5.5334, -0.299),
      star('saiph', 'Saiph', 5.796, -9.67),
      star('rigel', 'Rigel', 5.2423, -8.2016),
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
      star('schedar', 'Schedar', 0.6751, 56.537),
      star('caph', 'Caph', 0.1529, 59.15),
      star('gamma-cas', 'Navi', 0.9453, 60.717),
      star('ruchbah', 'Ruchbah', 1.4302, 60.235),
      star('segin', 'Segin', 1.9066, 63.67),
    ],
    lines: [
      ['caph', 'schedar'],
      ['schedar', 'gamma-cas'],
      ['gamma-cas', 'ruchbah'],
      ['ruchbah', 'segin'],
    ],
  },
]
