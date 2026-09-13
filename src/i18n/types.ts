export type AppLang = 'tr' | 'en'

export type LocText = { readonly tr: string; readonly en: string }

export function L(tr: string, en: string): LocText {
  return { tr, en }
}

export function tx(lang: AppLang, text: LocText): string {
  return text[lang]
}

/** Content mid-conversion: LocText after i18n, plain string before. */
export function loc(lang: AppLang, text: LocText | string): string {
  return typeof text === 'string' ? text : text[lang]
}

export function localeTag(lang: AppLang): string {
  return lang === 'en' ? 'en-US' : 'tr-TR'
}
