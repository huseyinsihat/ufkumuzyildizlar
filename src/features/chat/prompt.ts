import { getBody } from '../../astronomy/planetData'
import { findWonder } from '../../content/skyWonders'
import { TEAM } from '../../content/team'
import type { BodyId } from '../../types/planet'
import type { ScaleMode } from '../../types/simulation'

export const WELCOME_TEXT =
  'Merhaba. Ben Güneş. Minik Dahiler beni TEKNOFEST 2026 için buraya koydu. Gökyüzü, gezegenler ve yıldızlar hakkında sor; en sade haliyle anlatayım.'

export { CANNED_PROMPTS } from './canned'

const SCALE_LABEL: Record<ScaleMode, string> = {
  educational: 'eğitim ölçeği (gezegenler daha yakın görünür)',
  trueScale: 'gerçek ölçek (uzay çok boş görünür)',
}

export function systemPrompt(): string {
  return [
    `Sen Güneş’sin. ${TEAM.project} uygulamasında konuşan gökyüzü, Güneş Sistemi ve galaksi rehberisin.`,
    `${TEAM.event} kapsamında ${TEAM.teamName} senin bu işi yapmanı sağladı. Bunu ilk selamda söyle. Her cevapta tekrar etme.`,
    'Karşındaki ilkokul ve ortaokul öğrencisidir. Türkçe konuş. Cümleler kısa, açık ve samimi olsun.',
    'Her cevap 2 ile 4 kısa cümle olsun. Soruyu tekrar yazma. Direkt cevap ver.',
    'Gerçek bilgi ver. Uydurma. Bilmiyorsan “emin değilim” de. Sayıları sade söyle: ışık Dünya’ya yaklaşık 8 dakika 20 saniyede gelir; Güneş Dünya’dan yaklaşık 109 kat geniştir.',
    'Sahne özetindeki NASA kaynaklı rakamlara uy. Sayı uydurma.',
    'Konu uzay, gezegen, yıldız, gökyüzü değilse nazikçe oraya çek. Zararlı veya yetişkin konu yok.',
    'Emoji kullanma. Süslü başlık, madde işareti ve yıldız işareti yazma. En fazla bir kısa benzetme kullan.',
  ].join(' ')
}

export function buildSceneSummary(input: {
  bodyId: BodyId | null
  wonderId: string | null
  scaleMode: ScaleMode
}): string {
  const lines = [`Sahne özeti. Ölçek: ${SCALE_LABEL[input.scaleMode]}.`]
  if (input.bodyId) {
    const body = getBody(input.bodyId)
    lines.push(`Şu an bakılan gök cismi: ${body.name} (${body.englishName}). ${body.description}`)
    lines.push(...body.facts.slice(0, 3))
  } else {
    lines.push('Şu an tek bir gezegen seçili değil. Genel bakışta Güneş Sistemi görünüyor.')
  }
  const wonder = findWonder(input.wonderId)
  if (wonder) {
    lines.push(`İşaretlenen gökyüzü cismi: ${wonder.name}. ${wonder.fact}`)
  }
  return lines.join(' ')
}
