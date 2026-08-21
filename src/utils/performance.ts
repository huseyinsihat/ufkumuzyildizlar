export function capPixelRatio(deviceRatio: number): number {
  return Math.min(deviceRatio, 1.75)
}

export function asteroidCountForDevice(): number {
  if (typeof navigator === 'undefined') {
    return 900
  }
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
  if (memory !== undefined && memory <= 4) {
    return 500
  }
  return 1100
}

export function starCountForDevice(): number {
  if (typeof navigator === 'undefined') {
    return 4000
  }
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
  if (memory !== undefined && memory <= 4) {
    return 2200
  }
  return 5000
}
