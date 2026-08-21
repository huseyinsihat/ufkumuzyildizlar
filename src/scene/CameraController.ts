import { PerspectiveCamera, Vector3 } from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { clamp, easeInOutCubic } from '../utils/math'

export class CameraController {
  readonly camera: PerspectiveCamera
  readonly controls: OrbitControls
  private fromPos = new Vector3()
  private toPos = new Vector3()
  private fromTarget = new Vector3()
  private toTarget = new Vector3()
  private elapsed = 0
  private duration = 1.15
  private animating = false

  constructor(canvas: HTMLCanvasElement) {
    this.camera = new PerspectiveCamera(48, 1, 0.1, 800)
    this.camera.position.set(0, 48, 118)

    this.controls = new OrbitControls(this.camera, canvas)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.06
    this.controls.minDistance = 4
    this.controls.maxDistance = 280
    this.controls.enablePan = true
    this.controls.panSpeed = 0.45
    this.controls.rotateSpeed = 0.7
    this.controls.zoomSpeed = 0.9
    this.controls.minPolarAngle = 0.12
    this.controls.maxPolarAngle = Math.PI * 0.92
    this.controls.target.set(0, 0, 0)
  }

  focusOn(worldPosition: Vector3, radius: number): void {
    this.fromPos.copy(this.camera.position)
    this.fromTarget.copy(this.controls.target)
    this.toTarget.copy(worldPosition)
    const offset = Math.max(radius * 6.5, 4.5)
    this.toPos.set(worldPosition.x + offset, worldPosition.y + offset * 0.45, worldPosition.z + offset)
    this.elapsed = 0
    this.animating = true
    this.controls.enabled = false
  }

  focusOverview(trueScale = false): void {
    this.fromPos.copy(this.camera.position)
    this.fromTarget.copy(this.controls.target)
    this.toPos.set(0, trueScale ? 72 : 48, trueScale ? 210 : 118)
    this.toTarget.set(0, 0, 0)
    this.elapsed = 0
    this.animating = true
    this.controls.enabled = false
  }

  focusClose(worldPosition: Vector3, radius: number): void {
    this.fromPos.copy(this.camera.position)
    this.fromTarget.copy(this.controls.target)
    this.toTarget.copy(worldPosition)
    const offset = Math.max(radius * 3.1, 2.4)
    this.toPos.set(worldPosition.x + offset * 0.2, worldPosition.y + offset * 0.15, worldPosition.z + offset)
    this.elapsed = 0
    this.animating = true
    this.controls.enabled = false
  }

  enterSkyView(): void {
    this.fromPos.copy(this.camera.position)
    this.fromTarget.copy(this.controls.target)
    this.toPos.set(0, 6, 14)
    this.toTarget.set(40, 18, 120)
    this.elapsed = 0
    this.animating = true
    this.controls.enabled = false
  }

  setFar(far: number): void {
    this.camera.far = far
    this.camera.updateProjectionMatrix()
  }

  setMaxDistance(distance: number): void {
    this.controls.maxDistance = distance
  }

  update(dt: number): void {
    if (this.animating) {
      this.elapsed += dt
      const t = easeInOutCubic(clamp(this.elapsed / this.duration, 0, 1))
      this.camera.position.lerpVectors(this.fromPos, this.toPos, t)
      this.controls.target.lerpVectors(this.fromTarget, this.toTarget, t)
      if (t >= 1) {
        this.animating = false
        this.controls.enabled = true
      }
    }
    this.controls.update()
  }

  resize(width: number, height: number): void {
    this.camera.aspect = width / Math.max(height, 1)
    this.camera.updateProjectionMatrix()
  }

  dispose(): void {
    this.controls.dispose()
  }
}
