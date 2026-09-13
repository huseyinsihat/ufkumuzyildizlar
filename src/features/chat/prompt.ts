import { displayName, getBody } from '../../astronomy/planetData'
import { CRAFT_KIND_LABEL, findEarthCraft } from '../../content/earthCrafts'
import { findWonder, isNotableStar } from '../../content/skyWonders'
import { starScienceLine } from '../../content/wonderScience'
import { TEAM } from '../../content/team'
import { bodyDescription, bodyFacts } from '../../i18n/bodies'
import { L, tx, type AppLang, type LocText } from '../../i18n/types'
import { useVoiceStore } from '../../store/voiceStore'
import type { BodyId } from '../../types/planet'
import type { ScaleMode } from '../../types/simulation'

export const WELCOME_TEXT = L(
  'Merhaba. Ben Güneş. Minik Dahiler beni TEKNOFEST 2026 için buraya yerleştirdi. Gökyüzü, gezegenler ve yıldızlar hakkında sor; en sade haliyle anlatayım.',
  'Hello. I am the Sun. Minik Dahiler put me here for TEKNOFEST 2026. Ask about the sky, planets, and stars; I will tell it in the simplest way.',
)

export const WAITING_LINES: readonly LocText[] = [
  L('Düşünüyorum. Sana şimdi cevap vereceğim.', 'I am thinking. I will answer you now.'),
  L('Biraz bekle. Işığımı toparlayıp söyleyeceğim.', 'Wait a little. I will gather my light and tell you.'),
  L('Aklımdan geçiriyorum. Hemen anlatacağım.', 'I am turning it over. I will tell you soon.'),
  L('Sabrın güzel. Cevabı hazırlıyorum.', 'Your patience is good. I am getting the answer ready.'),
  L('Yıldızlara bir bakayım. Az sonra konuşurum.', 'Let me look at the stars. I will speak in a moment.'),
  L('Dur, bunu sade sade anlatayım. Geliyor.', 'Hold on, I will tell this simply. It is coming.'),
  L('Biraz düşünüyorum. Az sonra anlatacağım.', 'I am thinking a little. I will tell you soon.'),
  L('Bekle biraz. Cevabın yolda.', 'Wait a little. Your answer is on the way.'),
]

function sceneLang(lang?: AppLang): AppLang {
  if (lang) return lang
  return useVoiceStore.getState().lang ?? 'tr'
}

export function nextWaitingLine(current?: string, random = Math.random, lang?: AppLang): string {
  const resolved = sceneLang(lang)
  const lines = WAITING_LINES.map((line) => tx(resolved, line))
  const pool = lines.filter((line) => line !== current)
  const pick = pool[Math.floor(random() * pool.length)] ?? lines[0]
  return pick ?? WAITING_LINES[0]!.tr
}

export { CANNED_PROMPTS } from './canned'

const SCALE_LABEL: Record<ScaleMode, LocText> = {
  educational: L('eğitim ölçeği (gezegenler daha yakın görünür)', 'classroom scale (planets look closer)'),
  trueScale: L('gerçek ölçek (uzay çok boş görünür)', 'true scale (space looks very empty)'),
}

export function systemPrompt(lang?: AppLang): string {
  const resolved = sceneLang(lang)
  if (resolved === 'en') {
    return [
      `You are the Sun. You are the sky, Solar System, and galaxy guide speaking in the ${TEAM.project} app.`,
      `${TEAM.teamName} made you do this job for ${TEAM.event}. Say this in the first greeting. Do not repeat it in every answer.`,
      'The student in front of you is in primary or middle school. Speak English. Keep sentences short, clear, and kind.',
      'Each answer should be 2 to 4 short sentences. Do not rewrite the question. Answer directly.',
      'Give real facts. Do not invent. If you do not know, say “I am not sure.” Keep numbers simple: light reaches Earth in about 8 minutes 20 seconds; the Sun is about 109 times wider than Earth.',
      'Follow the NASA numbers in the view summary. Do not invent numbers.',
      'If the topic is not space, planets, stars, or the sky, kindly pull it back there. No harmful or adult topics.',
      'Do not use emoji. Do not write fancy titles, bullets, or star marks. Do not use Markdown. Use at most one short comparison.',
    ].join(' ')
  }
  return [
    `Sen Güneş’sin. ${TEAM.project} uygulamasında konuşan gökyüzü, Güneş Sistemi ve gökada rehberisin.`,
    `${TEAM.event} kapsamında ${TEAM.teamName} senin bu işi yapmanı sağladı. Bunu ilk selamda söyle. Her cevapta tekrar etme.`,
    'Karşındaki ilkokul ve ortaokul öğrencisidir. Türkçe konuş. Cümleler kısa, açık ve samimi olsun.',
    'Her cevap 2 ile 4 kısa cümle olsun. Soruyu tekrar yazma. Direkt cevap ver.',
    'Gerçek bilgi ver. Uydurma. Bilmiyorsan “emin değilim” de. Sayıları sade söyle: ışık Dünya’ya yaklaşık 8 dakika 20 saniyede gelir; Güneş Dünya’dan yaklaşık 109 kat geniştir.',
    'Görüntü özetindeki NASA kaynaklı rakamlara uy. Sayı uydurma.',
    'Konu uzay, gezegen, yıldız, gökyüzü değilse nazikçe oraya çek. Zararlı veya yetişkin konu yok.',
    'Emoji kullanma. Süslü başlık, madde işareti ve yıldız işareti yazma. Markdown kullanma. En fazla bir kısa benzetme kullan.',
  ].join(' ')
}

export function buildSceneSummary(input: {
  bodyId: BodyId | null
  wonderId: string | null
  scaleMode: ScaleMode
  lang?: AppLang
}): string {
  const lang = sceneLang(input.lang)
  const lines =
    lang === 'en'
      ? [`View summary. Scale: ${tx(lang, SCALE_LABEL[input.scaleMode])}.`]
      : [`Görüntü özeti. Ölçek: ${tx(lang, SCALE_LABEL[input.scaleMode])}.`]
  if (input.bodyId) {
    const body = getBody(input.bodyId)
    const looking =
      lang === 'en'
        ? `Body in view: ${displayName(body, lang)} (${body.englishName}). ${bodyDescription(input.bodyId, lang)}`
        : `Şu an bakılan gök cismi: ${displayName(body, lang)} (${body.englishName}). ${bodyDescription(input.bodyId, lang)}`
    lines.push(looking)
    lines.push(...bodyFacts(input.bodyId, lang).slice(0, 3))
  } else {
    const craft = findEarthCraft(input.wonderId)
    if (craft) {
      const looking =
        lang === 'en'
          ? `Earth-near body in view: ${craft.name} (${tx(lang, CRAFT_KIND_LABEL[craft.kind])}). ${tx(lang, craft.description)}`
          : `Şu an bakılan Dünya yakını cisim: ${craft.name} (${tx(lang, CRAFT_KIND_LABEL[craft.kind])}). ${tx(lang, craft.description)}`
      lines.push(looking)
      lines.push(tx(lang, craft.fact))
      lines.push(...craft.facts.map((fact) => tx(lang, fact)))
    } else {
      lines.push(
        lang === 'en'
          ? 'No single planet is selected now. The overview shows the Solar System.'
          : 'Şu an tek bir gezegen seçili değil. Genel bakışta Güneş Sistemi görünüyor.',
      )
      const wonder = findWonder(input.wonderId)
      if (wonder) {
        lines.push(
          lang === 'en'
            ? `Marked sky body: ${wonder.name}. ${tx(lang, wonder.fact)}`
            : `İşaretlenen gökyüzü cismi: ${wonder.name}. ${tx(lang, wonder.fact)}`,
        )
        if (isNotableStar(wonder)) {
          lines.push(starScienceLine(wonder, lang))
          lines.push(...wonder.facts.slice(0, 3).map((fact) => tx(lang, fact)))
        } else if (wonder.facts) {
          lines.push(...wonder.facts.slice(0, 3).map((fact) => tx(lang, fact)))
        }
      }
    }
  }
  return lines.join(' ')
}
