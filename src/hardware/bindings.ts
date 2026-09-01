export const HARDWARE_BUTTONS = [
  { pin: 'D0', line: 'P:sun', label: 'Güneş' },
  { pin: 'D1', line: 'P:mercury', label: 'Merkür' },
  { pin: 'D2', line: 'P:venus', label: 'Venüs' },
  { pin: 'D3', line: 'P:earth', label: 'Dünya' },
  { pin: 'D4', line: 'P:mars', label: 'Mars' },
  { pin: 'D5', line: 'P:jupiter', label: 'Jüpiter' },
  { pin: 'D6', line: 'P:saturn', label: 'Satürn' },
  { pin: 'D7', line: 'P:uranus', label: 'Uranüs' },
  { pin: 'D8', line: 'P:neptune', label: 'Neptün' },
  { pin: 'D9', line: 'F:play', label: 'Oynat / Duraklat' },
  { pin: 'D10', line: 'F:lab', label: 'Proje Etkinlikleri' },
  { pin: 'D11', line: 'F:events', label: 'Olaylar' },
  { pin: 'D12', line: 'F:stars', label: 'Yıldızlar' },
  { pin: 'D13', line: 'F:team', label: 'Takım' },
  { pin: 'D14', line: 'F:settings', label: 'Ayarlar' },
] as const

export const HARDWARE_ANALOG = { pin: 'A0', line: 'T:0-1', label: 'Hız (1 sn → 1 saat → 1 gün → 1 yıl)' } as const
export const HARDWARE_MOTION = { pin: 'IMU', line: 'G:yaw,pitch', label: 'Kartı eğin: bakış döner' } as const

export const HARDWARE_EXTRAS = [
  { pin: 'D15', line: 'F:back', label: 'Geri' },
  { pin: 'A1', line: 'F:chat', label: 'Güneş’e Sor' },
  { pin: 'A2', line: 'F:compare', label: 'Karşılaştır' },
] as const

export const HARDWARE_SPARES = [
  { pin: 'A3', label: 'Yedek' },
  { pin: 'A4', label: 'Yedek' },
  { pin: 'A5', label: 'Yedek' },
] as const

export type BoardPad = {
  pin: string
  label: string
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
