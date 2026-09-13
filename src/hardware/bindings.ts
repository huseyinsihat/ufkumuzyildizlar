import { L, type LocText } from '../i18n/types'

export const HARDWARE_BUTTONS = [
  { pin: 'D0', line: 'P:sun', label: L('Güneş', 'Sun') },
  { pin: 'D1', line: 'P:mercury', label: L('Merkür', 'Mercury') },
  { pin: 'D2', line: 'P:venus', label: L('Venüs', 'Venus') },
  { pin: 'D3', line: 'P:earth', label: L('Dünya', 'Earth') },
  { pin: 'D4', line: 'P:mars', label: L('Mars', 'Mars') },
  { pin: 'D5', line: 'P:jupiter', label: L('Jüpiter', 'Jupiter') },
  { pin: 'D6', line: 'P:saturn', label: L('Satürn', 'Saturn') },
  { pin: 'D7', line: 'P:uranus', label: L('Uranüs', 'Uranus') },
  { pin: 'D8', line: 'P:neptune', label: L('Neptün', 'Neptune') },
  { pin: 'D9', line: 'F:play', label: L('Oynat / Duraklat', 'Play / Pause') },
  { pin: 'D10', line: 'F:lab', label: L('Proje Etkinlikleri', 'Project Activities') },
  { pin: 'D11', line: 'F:events', label: L('Olaylar', 'Events') },
  { pin: 'D12', line: 'F:stars', label: L('Yıldızlar', 'Stars') },
  { pin: 'D13', line: 'F:team', label: L('Takım', 'Team') },
  { pin: 'D14', line: 'F:settings', label: L('Ayarlar', 'Settings') },
] as const

export const HARDWARE_ANALOG = {
  pin: 'A0',
  line: 'T:0-1',
  label: L('Hız (1 sn → 1 saat → 1 gün → 1 yıl)', 'Speed (1 s → 1 hour → 1 day → 1 year)'),
} as const
export const HARDWARE_MOTION = { pin: 'IMU', line: 'G:yaw,pitch', label: L('Kartı eğin: bakış döner', 'Tilt the board: the view turns') } as const

export const HARDWARE_EXTRAS = [
  { pin: 'D15', line: 'F:back', label: L('Geri', 'Back') },
  { pin: 'A1', line: 'F:chat', label: L('Güneş’e Sor', 'Ask the Sun') },
  { pin: 'A2', line: 'F:compare', label: L('Karşılaştır', 'Compare') },
] as const

export const HARDWARE_SPARES = [
  { pin: 'A3', label: L('Yedek', 'Spare') },
  { pin: 'A4', label: L('Yedek', 'Spare') },
  { pin: 'A5', label: L('Yedek', 'Spare') },
] as const

export type BoardPad = {
  pin: string
  label: LocText | string
  line?: string
  kind: 'power' | 'gnd' | 'wired' | 'extra' | 'spare' | 'motion'
}

export const BOARD_LEFT: BoardPad[] = [
  { pin: '3V3', label: '3.3V', kind: 'power' },
  ...HARDWARE_BUTTONS.slice(0, 9).map((item) => ({ ...item, kind: 'wired' as const })),
  { pin: 'GND', label: 'GND', kind: 'gnd' },
]

export const BOARD_RIGHT: BoardPad[] = [
  { pin: '5V', label: '5V', kind: 'power' },
  ...HARDWARE_BUTTONS.slice(9).map((item) => ({ ...item, kind: 'wired' as const })),
  { ...HARDWARE_ANALOG, kind: 'wired' },
  { pin: 'GND', label: 'GND', kind: 'gnd' },
]

export const BOARD_BOTTOM: BoardPad[] = [
  ...HARDWARE_EXTRAS.map((item) => ({ ...item, kind: 'extra' as const })),
  ...HARDWARE_SPARES.map((item) => ({ ...item, kind: 'spare' as const })),
  { ...HARDWARE_MOTION, kind: 'motion' },
]

export function hardwareLineMatches(lastLine: string, line: string | undefined): boolean {
  if (!line) return false
  const raw = lastLine.trim().toUpperCase()
  const target = line.trim().toUpperCase()
  if (!raw || !target) return false
  if (raw === target) return true
  const rawKind = raw.split(':')[0]
  const targetKind = target.split(':')[0]
  return (rawKind === 'T' && targetKind === 'T') || (rawKind === 'G' && targetKind === 'G')
}
