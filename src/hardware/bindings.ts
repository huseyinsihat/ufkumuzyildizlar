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
  { pin: 'D11', line: 'F:compare', label: 'Karşılaştır' },
  { pin: 'D12', line: 'F:planets', label: 'Gezegenler' },
  { pin: 'D13', line: 'F:stars', label: 'Yıldızlar' },
  { pin: 'D14', line: 'F:facts', label: 'Bilgiler' },
] as const

export const HARDWARE_ANALOG = { pin: 'A0', line: 'T:0-1', label: 'Hız (1 sn → 1 yıl)' } as const
export const HARDWARE_MOTION = { line: 'G:yaw,pitch', label: 'Kartı eğin: bakış döner' } as const
