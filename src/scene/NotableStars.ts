import {
  AdditiveBlending,
  Color,
  Group,
  Mesh,
  MeshBasicMaterial,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
} from 'three'
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'
import { NOTABLE_STARS } from '../content/skyWonders'
import { createStarGlowTexture } from './proceduralTextures'

const SKY = 248

export class NotableStars {
  readonly group: Group
  readonly meshes: Mesh[] = []
  private sprites: Sprite[] = []
  private pulse = 0

  constructor() {
    this.group = new Group()
    this.group.name = 'notable-stars'
    const geometry = new SphereGeometry(1, 16, 12)
    const glowMap = createStarGlowTexture()
    for (const star of NOTABLE_STARS) {
      const length = Math.hypot(star.x, star.y, star.z) || 1
      const x = (star.x / length) * SKY
      const y = (star.y / length) * SKY
      const z = (star.z / length) * SKY
      const mesh = new Mesh(
        geometry,
        new MeshBasicMaterial({ color: star.color, transparent: true, opacity: 0.98 }),
      )
      mesh.position.set(x, y, z)
      mesh.scale.setScalar(star.size * 2.4)
      mesh.userData.wonderId = star.id
      this.group.add(mesh)
      this.meshes.push(mesh)

      const glow = new Sprite(
        new SpriteMaterial({
          map: glowMap,
          color: new Color(star.color),
          transparent: true,
          opacity: 0.9,
          blending: AdditiveBlending,
          depthWrite: false,
        }),
      )
      glow.scale.setScalar(star.size * 7.5)
      glow.position.copy(mesh.position)
      glow.raycast = () => {}
      this.group.add(glow)
      this.sprites.push(glow)

      const label = document.createElement('div')
      label.className = 'planet-label sky-label'
      label.textContent = star.name
      const css = new CSS2DObject(label)
      css.position.set(0, star.size * 0.85, 0)
      mesh.add(css)
    }
  }

  setLabelsVisible(visible: boolean): void {
    for (const mesh of this.meshes) {
      mesh.traverse((child) => {
        if (child instanceof CSS2DObject) child.visible = visible
      })
    }
  }

  update(dt: number): void {
    this.pulse += dt
    const wave = 0.78 + Math.sin(this.pulse * 2.2) * 0.14
    for (const sprite of this.sprites) {
      sprite.material.opacity = 0.72 + wave * 0.2
    }
  }

  dispose(): void {
    for (const mesh of this.meshes) {
      const material = mesh.material
      if (!Array.isArray(material)) material.dispose()
    }
    const glowMap = this.sprites[0]?.material.map
    for (const sprite of this.sprites) {
      sprite.material.map = null
      sprite.material.dispose()
    }
    glowMap?.dispose()
  }
}
