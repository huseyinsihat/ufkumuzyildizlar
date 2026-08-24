import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  Points,
  PointsMaterial,
} from 'three'
import { blackbodyRgb } from '../astronomy/starSpectrum'
import { seededRandom } from '../utils/math'
import { createStarPointTexture } from './proceduralTextures'

function spectralTemp(tint: number): number {
  if (tint < 0.06) return 22000
  if (tint < 0.16) return 12000
  if (tint < 0.34) return 8500
  if (tint < 0.58) return 6200
  if (tint < 0.82) return 4800
  return 3400
}

function makeLayer(
  count: number,
  radius: number,
  size: number,
  map: ReturnType<typeof createStarPointTexture>,
  random: () => number,
): Points {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const color = new Color()
  const tilt = 1.047

  for (let i = 0; i < count; i += 1) {
    let theta = 0
    let phi = 0
    for (let attempt = 0; attempt < 8; attempt += 1) {
      theta = 2 * Math.PI * random()
      phi = Math.acos(2 * random() - 1)
      const bandLat = Math.asin(
        Math.max(-1, Math.min(1, Math.cos(phi) * Math.cos(tilt) + Math.sin(phi) * Math.cos(theta) * Math.sin(tilt))),
      )
      const density = 0.12 + 0.88 * Math.exp(-(bandLat * bandLat) / (2 * 0.12 * 0.12))
      if (random() < density) break
    }
    const r = radius * (0.82 + random() * 0.18)
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.cos(phi)
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)

    const mag = random() ** 2.8
    const rgb = blackbodyRgb(spectralTemp(random()))
    const bright = 0.18 + mag * 0.82
    color.setRGB(rgb.r * bright, rgb.g * bright, rgb.b * bright)
    color.toArray(colors, i * 3)
  }

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
  geometry.setAttribute('color', new Float32BufferAttribute(colors, 3))

  const material = new PointsMaterial({
    size,
    map,
    vertexColors: true,
    transparent: true,
    opacity: 0.92,
    depthWrite: false,
    blending: AdditiveBlending,
    sizeAttenuation: true,
  })

  const points = new Points(geometry, material)
  points.frustumCulled = false
  points.userData.baseSize = size
  return points
}

export function createStarField(count: number, radius = 620): Group {
  const random = seededRandom(42_424)
  const map = createStarPointTexture()
  const group = new Group()
  group.name = 'StarField'
  const faint = Math.round(count * 0.82)
  group.add(makeLayer(faint, radius, 1.15, map, random))
  group.add(makeLayer(count - faint, radius, 2.15, map, random))
  return group
}

export function setStarFieldDistant(group: Group, distant: boolean): void {
  group.traverse((child) => {
    if (!(child instanceof Points)) return
    const material = child.material
    if (!(material instanceof PointsMaterial)) return
    const base = Number(child.userData.baseSize) || material.size
    material.size = distant ? base * 2.6 : base
  })
}
