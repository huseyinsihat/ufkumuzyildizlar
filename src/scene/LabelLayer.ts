import { PerspectiveCamera, type Object3D, Vector3 } from 'three'
import { CSS2DObject, CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js'
import type { PlanetDefinition } from '../types/planet'

export class LabelLayer {
  readonly renderer: CSS2DRenderer
  private labels = new Map<string, CSS2DObject>()
  private sticky = new Map<string, boolean>()
  private world = new Vector3()
  private ndc = new Vector3()
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
    this.sticky.set(body.id, true)
  }

  setOffset(bodyId: string, offsetY: number): void {
    const label = this.labels.get(bodyId)
    if (label) label.position.y = offsetY
  }

  setVisible(visible: boolean): void {
    this.show = visible
    for (const label of this.labels.values()) {
      this.applyHidden(label, !visible)
    }
  }

  highlight(bodyId: string | null): void {
    for (const [id, label] of this.labels) {
      label.element.classList.toggle('is-selected', id === bodyId)
    }
  }

  updateScales(camera: PerspectiveCamera, hideAll = false): void {
    for (const [id, label] of this.labels) {
      if (!this.show || hideAll) {
        this.applyHidden(label, true)
        this.sticky.set(id, false)
        continue
      }
      label.getWorldPosition(this.world)
      const distance = camera.position.distanceTo(this.world)
      this.ndc.copy(this.world).project(camera)
      const inFront = this.ndc.z > 0 && this.ndc.z < 1 && Math.abs(this.ndc.x) < 1.25 && Math.abs(this.ndc.y) < 1.25
      const nearOk = distance > 3.2
      const farOk = distance < 320
      const was = this.sticky.get(id) === true
      const next = was ? inFront && nearOk && distance < 340 : inFront && distance > 4.2 && farOk
      this.sticky.set(id, next)
      this.applyHidden(label, !next)
    }
  }

  private applyHidden(label: CSS2DObject, hidden: boolean): void {
    if (label.visible === !hidden) return
    label.visible = !hidden
    label.element.style.opacity = hidden ? '0' : '1'
  }

  resize(width: number, height: number): void {
    this.renderer.setSize(width, height)
  }

  dispose(): void {
    this.renderer.domElement.remove()
    this.labels.clear()
    this.sticky.clear()
  }
}
