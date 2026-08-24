import { describe, expect, it } from 'vitest'
import {
  isNearParent,
  labelPriority,
  overlappingLabelIds,
  shouldShowSatelliteLabel,
  shouldShowSatelliteMesh,
} from './proximityVisibility'

describe('proximityVisibility', () => {
  it('shows other moons only when near or selected', () => {
    expect(shouldShowSatelliteMesh({ satelliteId: 'io', nearParent: false, selected: false, labNeedsMoon: false })).toBe(
      false,
    )
    expect(shouldShowSatelliteMesh({ satelliteId: 'io', nearParent: true, selected: false, labNeedsMoon: false })).toBe(
      true,
    )
    expect(shouldShowSatelliteMesh({ satelliteId: 'moon', nearParent: false, selected: false, labNeedsMoon: false })).toBe(
      true,
    )
  })

  it('shows moon labels only when approaching Earth', () => {
    expect(shouldShowSatelliteLabel({ nearParent: false, selected: false })).toBe(false)
    expect(shouldShowSatelliteLabel({ nearParent: true, selected: false })).toBe(true)
    expect(shouldShowSatelliteLabel({ nearParent: false, selected: true })).toBe(true)
  })

  it('treats the selected body as closest to the camera', () => {
    expect(labelPriority('io', 'io', 'moon')).toBe(0)
    expect(labelPriority('jupiter', null, 'gasGiant')).toBeLessThan(labelPriority('io', null, 'moon'))
    expect(labelPriority('moon', null, 'moon')).toBeLessThan(labelPriority('io', null, 'moon'))
  })

  it('hides the lower-priority label when two sit on top of each other', () => {
    const hidden = overlappingLabelIds([
      { id: 'earth', x: 0, y: 0, priority: 1 },
      { id: 'moon', x: 0.02, y: 0.01, priority: 2 },
    ])
    expect(hidden.has('moon')).toBe(true)
    expect(hidden.has('earth')).toBe(false)
  })

  it('uses a generous educational near-parent window', () => {
    expect(isNearParent(20, 1.52)).toBe(true)
    expect(isNearParent(80, 1.52)).toBe(false)
  })
})
