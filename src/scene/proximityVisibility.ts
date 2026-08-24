export function isNearParent(cameraDistance: number, parentRadius: number): boolean {
  return cameraDistance < parentRadius * 14 + 8
}

export function shouldShowSatelliteMesh(options: {
  satelliteId: string
  nearParent: boolean
  selected: boolean
  labNeedsMoon: boolean
}): boolean {
  if (options.satelliteId === 'moon') return true
  if (options.labNeedsMoon && options.satelliteId === 'moon') return true
  return options.nearParent || options.selected
}

export function shouldShowSatelliteLabel(options: { nearParent: boolean; selected: boolean }): boolean {
  return options.nearParent || options.selected
}

export function labelPriority(id: string, selectedId: string | null, category: string): number {
  if (id === selectedId) return 0
  if (category !== 'moon') return 1
  if (id === 'moon') return 2
  return 3
}

export function overlappingLabelIds(
  items: { id: string; x: number; y: number; priority: number }[],
  minDist = 0.11,
): Set<string> {
  const hidden = new Set<string>()
  const kept: { id: string; x: number; y: number; priority: number }[] = []
  const sorted = [...items].sort((a, b) => a.priority - b.priority || a.id.localeCompare(b.id))
  for (const item of sorted) {
    const clash = kept.some((other) => Math.hypot(other.x - item.x, other.y - item.y) < minDist)
    if (clash) hidden.add(item.id)
    else kept.push(item)
  }
  return hidden
}
