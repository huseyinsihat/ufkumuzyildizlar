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

export function isAnchorLabel(category: string): boolean {
  return (
    category === 'star' ||
    category === 'terrestrial' ||
    category === 'gasGiant' ||
    category === 'iceGiant' ||
    category === 'dwarf'
  )
}

export function shouldOccludeBodyLabel(category: string): boolean {
  return !isAnchorLabel(category)
}

export function labelPriority(id: string, selectedId: string | null, category: string): number {
  if (id === selectedId) return 0
  if (isAnchorLabel(category)) return 1
  if (category !== 'moon') return 2
  if (id === 'moon') return 3
  return 4
}

export function overlappingLabelIds(
  items: { id: string; x: number; y: number; priority: number; persistent?: boolean }[],
  minDist = 0.11,
): Set<string> {
  const hidden = new Set<string>()
  const kept: { id: string; x: number; y: number; priority: number; persistent?: boolean }[] = []
  const sorted = [...items].sort((a, b) => a.priority - b.priority || a.id.localeCompare(b.id))
  for (const item of sorted) {
    const clash = kept.some((other) => Math.hypot(other.x - item.x, other.y - item.y) < minDist)
    if (clash && !item.persistent) hidden.add(item.id)
    else kept.push(item)
  }
  return hidden
}
