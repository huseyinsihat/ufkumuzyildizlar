import {
  BoxGeometry,
  BufferGeometry,
  Color,
  ConeGeometry,
  CylinderGeometry,
  Float32BufferAttribute,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  SphereGeometry,
  type Material,
} from 'three'
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'
import { EARTH_CRAFT_RINGS, EARTH_CRAFTS, earthCraftLocalPosition, type EarthCraft, type EarthCraftModel } from '../content/earthCrafts'

interface CraftNode {
  craft: EarthCraft
  group: Group
  angle: number
  picks: Mesh[]
  label: CSS2DObject
}

function mark(object: Group | Mesh, id: string): void {
  object.userData.craftId = id
  object.traverse((child) => {
    child.userData.craftId = id
  })
}

function metal(color: string, emissive = 0.08): MeshStandardMaterial {
  return new MeshStandardMaterial({
    color: new Color(color),
    roughness: 0.38,
    metalness: 0.22,
    emissive: new Color(color),
    emissiveIntensity: emissive,
  })
}

export class EarthCrafts {
  readonly group = new Group()
  readonly pickMeshes: Mesh[] = []
  private nodes: CraftNode[] = []
  private geometries: BufferGeometry[] = []
  private materials: Material[] = []
  private rings: Line[] = []
  private earthRadius = 1.18

  constructor() {
    this.group.name = 'earth-crafts'
    this.addOrbitRing(EARTH_CRAFT_RINGS.leo.orbit, EARTH_CRAFT_RINGS.leo.tilt, EARTH_CRAFT_RINGS.leo.color)
    this.addOrbitRing(EARTH_CRAFT_RINGS.geo.orbit, EARTH_CRAFT_RINGS.geo.tilt, EARTH_CRAFT_RINGS.geo.color)
    for (const craft of EARTH_CRAFTS) {
      const model = this.buildModel(craft.model, craft.color)
      mark(model, craft.id)
      const hit = new Mesh(
        this.track(new SphereGeometry(craft.model === 'iss' ? 0.14 : 0.1, 8, 8)),
        this.ghost(),
      )
      mark(hit, craft.id)
      model.add(hit)
      const label = document.createElement('div')
      label.className = 'planet-label craft-label'
      label.textContent = craft.name
      const css = new CSS2DObject(label)
      css.position.set(0, craft.model === 'iss' ? 0.16 : 0.12, 0)
      model.add(css)
      this.group.add(model)
      const picks: Mesh[] = []
      model.traverse((child) => {
        if (child instanceof Mesh) {
          picks.push(child)
          this.pickMeshes.push(child)
        }
      })
      this.nodes.push({ craft, group: model, angle: craft.phase, picks, label: css })
    }
  }

  setEarthRadius(radius: number): void {
    this.earthRadius = Math.max(radius, 0.08)
    for (const ring of this.rings) {
      const mul = Number(ring.userData.orbitMul) || 1
      ring.scale.setScalar(this.earthRadius * mul)
    }
  }

  setVisible(visible: boolean): void {
    this.group.visible = visible
  }

  setLabelsVisible(visible: boolean): void {
    for (const node of this.nodes) node.label.visible = visible
  }

  setSelected(id: string | null): void {
    for (const node of this.nodes) {
      const on = node.craft.id === id
      node.group.scale.setScalar(on ? 1.22 : 1)
      node.label.element.classList.toggle('is-selected', on)
    }
  }

  meshById(id: string): Group | undefined {
    return this.nodes.find((node) => node.craft.id === id)?.group
  }

  update(dt: number): void {
    for (const node of this.nodes) {
      node.angle += node.craft.speed * dt
      const p = earthCraftLocalPosition(node.craft.orbit, node.craft.tilt, node.angle, this.earthRadius)
      node.group.position.set(p.x, p.y, p.z)
      node.group.lookAt(0, 0, 0)
    }
  }

  dispose(): void {
    for (const geo of this.geometries) geo.dispose()
    for (const mat of this.materials) mat.dispose()
    this.nodes = []
    this.pickMeshes.length = 0
  }

  private track<T extends BufferGeometry>(geo: T): T {
    this.geometries.push(geo)
    return geo
  }

  private paint(color: string, emissive = 0.08): MeshStandardMaterial {
    const mat = metal(color, emissive)
    this.materials.push(mat)
    return mat
  }

  private ghost(): MeshBasicMaterial {
    const mat = new MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false,
    })
    this.materials.push(mat)
    return mat
  }

  private addOrbitRing(radiusMul: number, tilt: number, color: string): void {
    const segs = 96
    const positions = new Float32Array((segs + 1) * 3)
    for (let i = 0; i <= segs; i += 1) {
      const p = earthCraftLocalPosition(1, tilt, (i / segs) * Math.PI * 2, 1)
      positions[i * 3] = p.x
      positions[i * 3 + 1] = p.y
      positions[i * 3 + 2] = p.z
    }
    const geo = this.track(new BufferGeometry())
    geo.setAttribute('position', new Float32BufferAttribute(positions, 3))
    const mat = new LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.32,
    })
    this.materials.push(mat)
    const line = new Line(geo, mat)
    line.userData.orbitMul = radiusMul
    line.scale.setScalar(this.earthRadius * radiusMul)
    line.raycast = () => {}
    this.group.add(line)
    this.rings.push(line)
  }

  private buildModel(model: EarthCraftModel, color: string): Group {
    if (model === 'iss') return this.buildIss()
    if (model === 'dragon') return this.buildDragon()
    return this.buildSat(color)
  }

  private buildIss(): Group {
    const root = new Group()
    const body = new Mesh(this.track(new BoxGeometry(0.1, 0.042, 0.042)), this.paint('#e8eef6', 0.12))
    const truss = new Mesh(this.track(new BoxGeometry(0.32, 0.012, 0.012)), this.paint('#9aa3b2', 0.04))
    const panelGeo = this.track(new BoxGeometry(0.012, 0.11, 0.18))
    const panelMat = this.paint('#3b82c4', 0.22)
    const left = new Mesh(panelGeo, panelMat)
    const right = new Mesh(panelGeo, panelMat)
    left.position.set(-0.17, 0, 0)
    right.position.set(0.17, 0, 0)
    const module = new Mesh(this.track(new BoxGeometry(0.055, 0.036, 0.055)), this.paint('#cfd8e6', 0.1))
    module.position.set(0.02, 0.028, 0)
    root.add(body, truss, left, right, module)
    return root
  }

  private buildSat(color: string): Group {
    const root = new Group()
    const body = new Mesh(this.track(new BoxGeometry(0.046, 0.038, 0.038)), this.paint('#f8fafc', 0.1))
    const stripe = new Mesh(this.track(new BoxGeometry(0.048, 0.01, 0.04)), this.paint(color, 0.18))
    const wingGeo = this.track(new BoxGeometry(0.008, 0.09, 0.032))
    const wingMat = this.paint('#60a5fa', 0.2)
    const left = new Mesh(wingGeo, wingMat)
    const right = new Mesh(wingGeo, wingMat)
    left.position.set(-0.04, 0, 0)
    right.position.set(0.04, 0, 0)
    const dish = new Mesh(this.track(new CylinderGeometry(0.022, 0.022, 0.006, 16)), this.paint('#e2e8f0', 0.08))
    dish.rotation.z = Math.PI / 2
    dish.position.set(0.03, 0.02, 0)
    root.add(body, stripe, left, right, dish)
    return root
  }

  private buildDragon(): Group {
    const root = new Group()
    const visual = new Group()
    visual.rotation.x = Math.PI / 2
    const capsule = new Mesh(this.track(new SphereGeometry(0.038, 16, 12)), this.paint('#f8f4ec', 0.1))
    capsule.scale.set(1, 1.15, 1)
    const trunk = new Mesh(this.track(new CylinderGeometry(0.028, 0.034, 0.046, 12)), this.paint('#1e293b', 0.04))
    trunk.position.y = -0.042
    const nose = new Mesh(this.track(new ConeGeometry(0.02, 0.024, 12)), this.paint('#111827', 0.06))
    nose.position.y = 0.048
    visual.add(capsule, trunk, nose)
    root.add(visual)
    return root
  }
}
