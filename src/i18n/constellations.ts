import { L, tx, type AppLang, type LocText } from './types'

export const CONSTELLATION_NAME = {
  'ursa-major': L('Büyükayı', 'Ursa Major'),
  'ursa-minor': L('Küçük Ayı', 'Ursa Minor'),
  orion: L('Avcı', 'Orion'),
  cassiopeia: L('Kraliçe', 'Cassiopeia'),
  cygnus: L('Kuğu', 'Cygnus'),
  lyra: L('Çalgı', 'Lyra'),
  aquila: L('Kartal', 'Aquila'),
  'canis-major': L('Büyük Köpek', 'Canis Major'),
  aries: L('Koç', 'Aries'),
  taurus: L('Boğa', 'Taurus'),
  gemini: L('İkizler', 'Gemini'),
  cancer: L('Yengeç', 'Cancer'),
  leo: L('Aslan', 'Leo'),
  virgo: L('Başak', 'Virgo'),
  libra: L('Terazi', 'Libra'),
  scorpius: L('Akrep', 'Scorpius'),
  sagittarius: L('Yay', 'Sagittarius'),
  capricornus: L('Oğlak', 'Capricornus'),
  aquarius: L('Kova', 'Aquarius'),
  pisces: L('Balık', 'Pisces'),
  andromeda: L('Andromeda', 'Andromeda'),
  perseus: L('Perseus', 'Perseus'),
  crux: L('Güney Haçı', 'Crux'),
  bootes: L('Çoban', 'Boötes'),
  auriga: L('Arabacı', 'Auriga'),
  draco: L('Ejderha', 'Draco'),
} as const satisfies Record<string, LocText>

export function constellationDisplayName(id: string, lang: AppLang, fallback = id): string {
  const copy = CONSTELLATION_NAME[id as keyof typeof CONSTELLATION_NAME]
  return copy ? tx(lang, copy) : fallback
}
