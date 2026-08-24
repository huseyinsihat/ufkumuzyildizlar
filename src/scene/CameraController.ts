import { PerspectiveCamera, Vector3 } from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { clamp, easeInOutCubic } from '../utils/math'
import { CAMERA_TRAVEL_MIN_SEC, cameraTravelArcOffset, cameraTravelDuration } from './cameraTravel'

export class CameraController {
  readonly camera: PerspectiveCamera
  readonly controls: OrbitControls
  private fromPos = new Vector3()
  private toPos = new Vector3()
  private fromTarget = new Vector3()
  private toTarget = new Vector3()
  private followPos = new Vector3()
  private followDelta = new Vector3()
  private arcOffset = new Vector3()
  private elapsed = 0
  private duration = CAMERA_TRAVEL_MIN_SEC
  private animating = false
  private followEnabled = false
  private willFollow = false
  private gyroYaw = 0
  private gyroPitch = 0
  private gyroTargetYaw = 0
  private gyroTargetPitch = 0
  private appliedYaw = 0
  private appliedPitch = 0
  private up = new Vector3(0, 1, 0)
  private right = new Vector3()
  private nudgeFrom = new Vector3()
  private nudgeTo = new Vector3()
  private nudgeNdc = new Vector3()
  private nudgeElapsed = 0
  private nudging = false
  private readonly nudgeDuration = 1.2

  constructor(canvas: HTMLCanvasElement) {
    this.camera = new PerspectiveCamera(48, 1, 0.1, 1400)
    this.camera.position.set(0, 42, 102)

    this.controls = new OrbitControls(this.camera, canvas)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.06
    this.controls.minDistance = 4
    this.controls.maxDistance = 360
    this.controls.enablePan = true
    this.controls.panSpeed = 0.45
    this.controls.rotateSpeed = 0.7
    this.controls.zoomSpeed = 0.9
    this.controls.minPolarAngle = 0.12
    this.controls.maxPolarAngle = Math.PI * 0.92
    this.controls.target.set(0, 0, 0)
  }

  focusOn(worldPosition: Vector3, radius: number, follow = false): void {
    this.fromPos.copy(this.camera.position)
    this.fromTarget.copy(this.controls.target)
    this.toTarget.copy(worldPosition)
    const offset = Math.max(radius * 6.5, 4.5)
    this.toPos.set(worldPosition.x + offset, worldPosition.y + offset * 0.45, worldPosition.z + offset)
    this.willFollow = follow
    this.beginTween()
  }

  focusOverview(trueScale = false): void {
    this.fromPos.copy(this.camera.position)
    this.fromTarget.copy(this.controls.target)
    this.toPos.set(0, trueScale ? 72 : 42, trueScale ? 210 : 102)
    this.toTarget.set(0, 0, 0)
    this.willFollow = false
    this.beginTween()
  }

  focusClose(worldPosition: Vector3, radius: number): void {
    this.fromPos.copy(this.camera.position)
    this.fromTarget.copy(this.controls.target)
    this.toTarget.copy(worldPosition)
    const offset = Math.max(radius * 3.1, 2.4)
    this.toPos.set(worldPosition.x + offset * 0.2, worldPosition.y + offset * 0.15, worldPosition.z + offset)
    this.willFollow = true
    this.beginTween()
  }

  focusSeasonEarth(earthPos: Vector3, earthRadius: number): void {
    this.fromPos.copy(this.camera.position)
    this.fromTarget.copy(this.controls.target)
    this.toTarget.copy(earthPos)
    const dist = Math.max(earthRadius * 4.8, 5.2)
    const away = earthPos.lengthSq() > 0.01 ? earthPos.clone().normalize() : new Vector3(0, 0, 1)
    const up = new Vector3(0, 1, 0)
    const side = new Vector3().crossVectors(away, up)
    if (side.lengthSq() < 0.01) side.set(1, 0, 0)
    side.normalize()
    this.toPos
      .copy(earthPos)
      .addScaledVector(away, dist * 0.95)
      .addScaledVector(side, dist * 0.5)
      .addScaledVector(up, dist * 0.28)
    this.willFollow = true
    this.beginTween()
  }

  enterSkyView(): void {
    this.fromPos.copy(this.camera.position)
    this.fromTarget.copy(this.controls.target)
    this.toPos.set(0, 6, 14)
    this.toTarget.set(40, 18, 120)
    this.willFollow = false
    this.beginTween()
  }

  stopFollow(): void {
    this.willFollow = false
    this.followEnabled = false
  }

  /** Softly pan the look target toward a world point. Never changes camera distance. */
  nudgeLook(worldPosition: Vector3): void {
    if (this.animating || this.nudging || this.followEnabled) return
    this.nudgeNdc.copy(worldPosition).project(this.camera)
    const onScreen =
      this.nudgeNdc.z > 0 &&
      this.nudgeNdc.z < 1 &&
      Math.abs(this.nudgeNdc.x) < 0.72 &&
      Math.abs(this.nudgeNdc.y) < 0.72
    if (onScreen) return
    this.nudgeFrom.copy(this.controls.target)
    this.nudgeTo.copy(worldPosition)
    this.nudgeElapsed = 0
    this.nudging = true
  }

  track(worldPosition: Vector3): void {
    if (this.animating) {
      this.followPos.copy(worldPosition)
      return
    }
    if (!this.followEnabled) return
    this.followDelta.copy(worldPosition).sub(this.followPos)
    this.camera.position.add(this.followDelta)
    this.controls.target.add(this.followDelta)
    this.followPos.copy(worldPosition)
  }

  setFar(far: number): void {
    this.camera.far = far
    this.camera.updateProjectionMatrix()
  }

  setMaxDistance(distance: number): void {
    this.controls.maxDistance = distance
  }

  setGyro(yaw: number, pitch: number): void {
    this.gyroTargetYaw = clamp(yaw, -0.55, 0.55)
    this.gyroTargetPitch = clamp(pitch, -0.35, 0.35)
  }

  update(dt: number): void {
    if (this.animating) {
      this.elapsed += dt
      const t = easeInOutCubic(clamp(this.elapsed / this.duration, 0, 1))
      this.camera.position.lerpVectors(this.fromPos, this.toPos, t)
      this.camera.position.addScaledVector(this.arcOffset, Math.sin(Math.PI * t))
      this.controls.target.lerpVectors(this.fromTarget, this.toTarget, t)
      if (t >= 1) {
        this.animating = false
        this.controls.enabled = true
        this.followEnabled = this.willFollow
      }
    } else if (this.nudging) {
      this.nudgeElapsed += dt
      const t = easeInOutCubic(clamp(this.nudgeElapsed / this.nudgeDuration, 0, 1))
      this.controls.target.lerpVectors(this.nudgeFrom, this.nudgeTo, t)
      if (t >= 1) this.nudging = false
    }
    this.controls.update()
    if (this.animating) return
    this.gyroYaw += (this.gyroTargetYaw - this.gyroYaw) * Math.min(1, dt * 5)
    this.gyroPitch += (this.gyroTargetPitch - this.gyroPitch) * Math.min(1, dt * 5)
    const dyaw = this.gyroYaw - this.appliedYaw
    const dpitch = this.gyroPitch - this.appliedPitch
    if (Math.abs(dyaw) > 0.0002 || Math.abs(dpitch) > 0.0002) {
      const offset = this.camera.position.clone().sub(this.controls.target)
      offset.applyAxisAngle(this.up, dyaw)
      this.right.crossVectors(this.up, offset).normalize()
      if (this.right.lengthSq() > 0.01) offset.applyAxisAngle(this.right, dpitch)
      this.camera.position.copy(this.controls.target).add(offset)
      this.appliedYaw = this.gyroYaw
      this.appliedPitch = this.gyroPitch
    }
  }

  private beginTween(): void {
    this.elapsed = 0
    this.animating = true
    this.nudging = false
    this.followEnabled = false
    this.controls.enabled = false
    const distance = this.fromPos.distanceTo(this.toPos)
    this.duration = cameraTravelDuration(distance)
    const arc = cameraTravelArcOffset(this.fromPos, this.toPos)
    this.arcOffset.set(arc.x, arc.y, arc.z)
  }

  resize(width: number, height: number): void {
    this.camera.aspect = width / Math.max(height, 1)
    this.camera.updateProjectionMatrix()
  }

  dispose(): void {
    this.controls.dispose()
  }
}
