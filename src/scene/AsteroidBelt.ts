import {
  Color,
  DynamicDrawUsage,
  IcosahedronGeometry,
  InstancedMesh,
  Matrix4,
  MeshStandardMaterial,
  Quaternion,
  Vector3,
} from 'three'
import { educationalOrbitRadius } from '../astronomy/visualScale'
import { asteroidCountForDevice } from '../utils/performance'
import { seededRandom } from '../utils/math'

export class AsteroidBelt {
  readonly mesh: InstancedMesh
  private angles: Float32Array
  private radii: Float32Array
  private speeds: Float32Array
  private scales: Float32Array

  constructor(count = asteroidCountForDevice()) {
    const geometry = new IcosahedronGeometry(1, 0)
    const material = new MeshStandardMaterial({
      color: '#8d8478',
      roughness: 0.95,
      metalness: 0.05,
    })
    this.mesh = new InstancedMesh(geometry, material, count)
    this.mesh.instanceMatrix.setUsage(DynamicDrawUsage)
    this.mesh.frustumCulled = false
    this.mesh.raycast = () => {}

    const random = seededRandom(9041)
    this.angles = new Float32Array(count)
    this.radii = new Float32Array(count)
    this.speeds = new Float32Array(count)
    this.scales = new Float32Array(count)

    const inner = educationalOrbitRadius(2.2)
    const outer = educationalOrbitRadius(3.3)

    for (let i = 0; i < count; i += 1) {
      this.angles[i] = random() * Math.PI * 2
      this.radii[i] = inner + random() * (outer - inner)
      this.speeds[i] = 0.02 + random() * 0.04
      this.scales[i] = 0.04 + random() * 0.09
      const tint = 0.65 + random() * 0.3
      this.mesh.setColorAt(i, new Color(tint, tint * 0.92, tint * 0.8))
    }
    if (this.mesh.instanceColor) {
      this.mesh.instanceColor.needsUpdate = true
    }
    this.update(0)
  }

  update(dtSimDays: number): void {
    const quaternion = new Quaternion()
    const scale = new Vector3()
    const position = new Vector3()
    const matrix = new Matrix4()
    const count = this.angles.length
    for (let i = 0; i < count; i += 1) {
      this.angles[i] += this.speeds[i] * dtSimDays * 0.015
      const angle = this.angles[i]
      const radius = this.radii[i]
      position.set(Math.cos(angle) * radius, (Math.sin(angle * 3.1) * 0.35), Math.sin(angle) * radius)
      quaternion.setFromAxisAngle(new Vector3(0.2, 1, 0.1).normalize(), angle * 4)
      scale.setScalar(this.scales[i])
      matrix.compose(position, quaternion, scale)
      this.mesh.setMatrixAt(i, matrix)
    }
    this.mesh.instanceMatrix.needsUpdate = true
  }

  dispose(): void {
    this.mesh.geometry.dispose()
    const material = this.mesh.material
    if (!Array.isArray(material)) material.dispose()
  }
}
