export const MIN_STAR_PICK_PX = 32

export interface ScreenPickTarget {
  id: string
  ndcX: number
  ndcY: number
  radiusPx: number
  behindCamera?: boolean
}

export interface ViewportSize {
  width: number
  height: number
}

export function ndcToPixels(ndc: { x: number; y: number }, viewport: ViewportSize): { x: number; y: number } {
  return {
    x: (ndc.x + 1) * 0.5 * viewport.width,
    y: (1 - ndc.y) * 0.5 * viewport.height,
  }
}

export function worldRadiusToPixels(
  worldRadius: number,
  distance: number,
  fovDeg: number,
  viewportHeight: number,
): number {
  const worldHeight = 2 * Math.tan((fovDeg * Math.PI) / 180 / 2) * Math.max(distance, 0.001)
  return (worldRadius / worldHeight) * viewportHeight
}

export interface ScreenHit {
  target: ScreenPickTarget
  dist: number
}

export function closestScreenHit(
  pointerNdc: { x: number; y: number },
  viewport: ViewportSize,
  targets: ScreenPickTarget[],
  minRadiusPx = MIN_STAR_PICK_PX,
): ScreenHit | undefined {
  const pointer = ndcToPixels(pointerNdc, viewport)
  let best: ScreenHit | undefined
  for (const target of targets) {
    if (target.behindCamera) continue
    const point = ndcToPixels({ x: target.ndcX, y: target.ndcY }, viewport)
    const dist = Math.hypot(point.x - pointer.x, point.y - pointer.y)
    const threshold = Math.max(minRadiusPx, target.radiusPx)
    if (dist <= threshold && (!best || dist < best.dist)) {
      best = { target, dist }
    }
  }
  return best
}

export function pickClosestScreenTarget(
  pointerNdc: { x: number; y: number },
  viewport: ViewportSize,
  targets: ScreenPickTarget[],
): string | undefined {
  return closestScreenHit(pointerNdc, viewport, targets)?.target.id
}

/**
 * Stars win when the pointer is on their glow / 32px pad and closer than the body.
 * A planet/moon disk still wins when the pointer is on the globe and more than 32px from the star.
 */
export function resolveStarVsBody(
  starHit: ScreenHit | undefined,
  bodyHit: ScreenHit | undefined,
): 'star' | 'body' | undefined {
  if (starHit && bodyHit) {
    if (starHit.dist > MIN_STAR_PICK_PX) return 'body'
    return starHit.dist <= bodyHit.dist ? 'star' : 'body'
  }
  if (starHit) return 'star'
  if (bodyHit) return 'body'
  return undefined
}

export function isAncestorVisible(node: { visible: boolean; parent: unknown } | null): boolean {
  let current: { visible: boolean; parent: unknown } | null = node
  while (current) {
    if (!current.visible) return false
    current = current.parent as { visible: boolean; parent: unknown } | null
  }
  return true
}
