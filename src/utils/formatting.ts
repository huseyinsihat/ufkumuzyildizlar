import { localeTag, tx, type AppLang } from '../i18n/types'
import { UI } from '../i18n/ui'

function dateTimeFormatter(lang: AppLang): Intl.DateTimeFormat {
  return new Intl.DateTimeFormat(localeTag(lang), {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

function dateOnlyFormatter(lang: AppLang): Intl.DateTimeFormat {
  return new Intl.DateTimeFormat(localeTag(lang), {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

function timeOnlyFormatter(lang: AppLang): Intl.DateTimeFormat {
  return new Intl.DateTimeFormat(localeTag(lang), {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export function formatSimulationDate(ms: number, lang: AppLang = 'tr'): string {
  return dateTimeFormatter(lang).format(new Date(ms))
}

export function formatSimulationDateParts(ms: number, lang: AppLang = 'tr'): { date: string; time: string } {
  const value = new Date(ms)
  return { date: dateOnlyFormatter(lang).format(value), time: timeOnlyFormatter(lang).format(value) }
}

export function formatNumberTr(value: number, digits = 0, lang: AppLang = 'tr'): string {
  return new Intl.NumberFormat(localeTag(lang), {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value)
}

export function formatKm(km: number, lang: AppLang = 'tr'): string {
  if (km >= 1_000_000) {
    return `${formatNumberTr(km / 1_000_000, 1, lang)} ${tx(lang, UI.millionKm)}`
  }
  if (km >= 1000) {
    return `${formatNumberTr(km / 1000, 1, lang)} ${tx(lang, UI.thousandKm)}`
  }
  return `${formatNumberTr(km, 0, lang)} km`
}

export function formatAu(au: number, lang: AppLang = 'tr'): string {
  return `${formatNumberTr(au, au >= 10 ? 1 : 3, lang)} ${tx(lang, UI.au)}`
}

export function formatDays(days: number, lang: AppLang = 'tr'): string {
  if (days >= 365) {
    return `${formatNumberTr(days / 365.25, 1, lang)} ${tx(lang, UI.years)} (${formatNumberTr(days, 0, lang)} ${tx(lang, UI.days)})`
  }
  return `${formatNumberTr(days, days < 10 ? 2 : 1, lang)} ${tx(lang, UI.days)}`
}

export function formatHours(hours: number, lang: AppLang = 'tr'): string {
  const abs = Math.abs(hours)
  const suffix = hours < 0 ? ` ${tx(lang, UI.reverseSpin)}` : ''
  if (abs >= 48) {
    return `${formatNumberTr(abs / 24, 1, lang)} ${tx(lang, UI.days)}${suffix}`
  }
  return `${formatNumberTr(abs, 1, lang)} ${tx(lang, UI.hours)}${suffix}`
}

export function pad2(value: number): string {
  return String(value).padStart(2, '0')
}
