const dateFormatter = new Intl.DateTimeFormat('tr-TR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

const dateOnlyFormatter = new Intl.DateTimeFormat('tr-TR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

const timeOnlyFormatter = new Intl.DateTimeFormat('tr-TR', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

export function formatSimulationDate(ms: number): string {
  return dateFormatter.format(new Date(ms))
}

export function formatSimulationDateParts(ms: number): { date: string; time: string } {
  const value = new Date(ms)
  return { date: dateOnlyFormatter.format(value), time: timeOnlyFormatter.format(value) }
}

export function formatNumberTr(value: number, digits = 0): string {
  return new Intl.NumberFormat('tr-TR', {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value)
}

export function formatKm(km: number): string {
  if (km >= 1_000_000) {
    return `${formatNumberTr(km / 1_000_000, 1)} milyon km`
  }
  if (km >= 1000) {
    return `${formatNumberTr(km / 1000, 1)} bin km`
  }
  return `${formatNumberTr(km, 0)} km`
}

export function formatAu(au: number): string {
  return `${formatNumberTr(au, au >= 10 ? 1 : 3)} AB`
}

export function formatDays(days: number): string {
  if (days >= 365) {
    return `${formatNumberTr(days / 365.25, 1)} yıl (${formatNumberTr(days, 0)} gün)`
  }
  return `${formatNumberTr(days, days < 10 ? 2 : 1)} gün`
}

export function formatHours(hours: number): string {
  const abs = Math.abs(hours)
  const suffix = hours < 0 ? ' (ters dönüş)' : ''
  if (abs >= 48) {
    return `${formatNumberTr(abs / 24, 1)} gün${suffix}`
  }
  return `${formatNumberTr(abs, 1)} saat${suffix}`
}

export function pad2(value: number): string {
  return String(value).padStart(2, '0')
}
