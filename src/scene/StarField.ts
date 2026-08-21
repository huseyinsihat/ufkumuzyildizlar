import { BufferGeometry, Color, Float32BufferAttribute, NormalBlending, Points, PointsMaterial } from 'three'
import { seededRandom } from '../utils/math'

export function createStarField(count: number, radius = 420): Points {
  const random = seededRandom(42_424)
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const color = new Color()

  for (let i = 0; i < count; i += 1) {
    const theta = 2 * Math.PI * random()
    const phi = Math.acos(2 * random() - 1)
    const r = radius * (0.82 + random() * 0.18)
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.cos(phi)
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)

    const tint = random()
    if (tint < 0.18) color.setRGB(0.32, 0.4, 0.58)
    else if (tint < 0.32) color.setRGB(0.48, 0.38, 0.28)
    else color.setRGB(0.38, 0.4, 0.46)
    color.toArray(colors, i * 3)
  }

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
  geometry.setAttribute('color', new Float32BufferAttribute(colors, 3))

  const material = new PointsMaterial({
    size: 0.85,
    vertexColors: true,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
    blending: NormalBlending,
    sizeAttenuation: true,
  })

  const points = new Points(geometry, material)
  points.frustumCulled = false
  points.name = 'StarField'
  return points
}
