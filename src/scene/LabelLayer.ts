import { PerspectiveCamera, type Object3D, Vector3 } from 'three'
import { CSS2DObject, CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js'
import type { BodyId } from '../types/planet'
import { getBody } from '../astronomy/planetData'
import type { PlanetDefinition } from '../types/planet'
import { labelPriority, overlappingLabelIds } from './proximityVisibility'

export interface LabelOccluder {
  id: string
  x: number
  y: number
  z: number
  radius: number
}

const HOLD_FRAMES = 10

export class LabelLayer {
  readonly renderer: CSS2DRenderer
  private labels = new Map<string, CSS2DObject>()
  private shown = new Map<string, boolean>()
  private streak = new Map<string, number>()
  private world = new Vector3()
  private camLocal = new Vector3()
  private ndc = new Vector3()
  private camPos = new Vector3()
  private toLabel = new Vector3()
  private toSphere = new Vector3()
  private closest = new Vector3()
  private show = true

  constructor(host: HTMLElement) {
    this.renderer = new CSS2DRenderer()
    this.renderer.setSize(host.clientWidth, host.clientHeight)
    this.renderer.domElement.className = 'label-layer'
    host.appendChild(this.renderer.domElement)
  }

  attach(body: PlanetDefinition, parent: Object3D, offsetY = 2.4): void {
    const element = document.createElement('div')
    element.className = 'planet-label'
    element.textContent = body.name
    element.dataset.bodyId = body.id
    const label = new CSS2DObject(element)
    label.position.set(0, offsetY, 0)
    parent.add(label)
    this.labels.set(body.id, label)
    this.shown.set(body.id, false)
    this.streak.set(body.id, 0)
    this.applyHidden(label, true)
  }

  setOffset(bodyId: string, offsetY: number): void {
    const label = this.labels.get(bodyId)
    if (label) label.position.y = offsetY
  }

  setVisible(visible: boolean): void {
    this.show = visible
    if (!visible) {
      for (const [id, label] of this.labels) {
        this.applyHidden(label, true)
        this.shown.set(id, false)
        this.streak.set(id, 0)
      }
    }
  }

  highlight(bodyId: string | null): void {
    for (const [id, label] of this.labels) {
      label.element.classList.toggle('is-selected', id === bodyId)
    }
  }

  updateScales(
    camera: PerspectiveCamera,
    hideAll = false,
    occluders: readonly LabelOccluder[] = [],
    selectedId: string | null = null,
    hiddenIds: ReadonlySet<string> = new Set(),
  ): void {
    if (!this.show || hideAll) {
      for (const [id, label] of this.labels) {
        this.applyHidden(label, true)
        this.shown.set(id, false)
        this.streak.set(id, 0)
      }
      return
    }

    camera.getWorldPosition(this.camPos)

    const candidates: { id: string; x: number; y: number; priority: number }[] = []
    const baseWant = new Map<string, boolean>()

    for (const [id, label] of this.labels) {
      label.getWorldPosition(this.world)
      this.camLocal.copy(this.world).applyMatrix4(camera.matrixWorldInverse)
      const inFront = this.camLocal.z < -0.35
      this.ndc.copy(this.world).project(camera)
      const onScreen = Math.abs(this.ndc.x) < 1.32 && Math.abs(this.ndc.y) < 1.32
      const distance = this.camPos.distanceTo(this.world)
      const nearOk = distance > 3.8
      const farOk = distance < 360
      const blocked = this.isOccluded(id, occluders)
      const want = inFront && onScreen && nearOk && farOk && !blocked && !hiddenIds.has(id)
      baseWant.set(id, want)
      if (want) {
        candidates.push({
          id,
          x: this.ndc.x,
          y: this.ndc.y,
          priority: labelPriority(id, selectedId, getBody(id as BodyId).category),
        })
      }
    }

    const overlapped = overlappingLabelIds(candidates)

    for (const [id, label] of this.labels) {
      const want = baseWant.get(id) === true && !overlapped.has(id)
      const current = this.shown.get(id) === true
      const skipHold = selectedId === id && want

      if (skipHold || want === current) {
        this.streak.set(id, 0)
        if (skipHold) this.shown.set(id, true)
      } else {
        const next = (this.streak.get(id) ?? 0) + 1
        if (next >= HOLD_FRAMES) {
          this.shown.set(id, want)
          this.streak.set(id, 0)
        } else {
          this.streak.set(id, next)
        }
      }

      this.applyHidden(label, this.shown.get(id) !== true)
    }
  }

  private isOccluded(bodyId: string, occluders: readonly LabelOccluder[]): boolean {
    this.toLabel.copy(this.world).sub(this.camPos)
    const labelDist = this.toLabel.length()
    if (labelDist < 1e-4) return false
    this.toLabel.multiplyScalar(1 / labelDist)

    for (const occluder of occluders) {
      if (occluder.id === bodyId) continue
      this.toSphere.set(occluder.x, occluder.y, occluder.z)
      this.toSphere.sub(this.camPos)
      const t = this.toSphere.dot(this.toLabel)
      if (t <= 0.15 || t >= labelDist - 0.05) continue
      this.closest.copy(this.camPos).addScaledVector(this.toLabel, t)
      const distAxis = Math.hypot(occluder.x - this.closest.x, occluder.y - this.closest.y, occluder.z - this.closest.z)
      if (distAxis < occluder.radius * 0.94) return true
    }
    return false
  }

  private applyHidden(label: CSS2DObject, hidden: boolean): void {
    if (label.visible === !hidden && label.element.style.visibility === (hidden ? 'hidden' : 'visible')) return
    label.visible = !hidden
    label.element.style.visibility = hidden ? 'hidden' : 'visible'
    label.element.classList.toggle('is-hidden', hidden)
  }

  resize(width: number, height: number): void {
    this.renderer.setSize(width, height)
  }

  dispose(): void {
    this.renderer.domElement.remove()
    this.labels.clear()
    this.shown.clear()
    this.streak.clear()
  }
}
