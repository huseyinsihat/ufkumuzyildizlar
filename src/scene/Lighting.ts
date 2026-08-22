import { AmbientLight, HemisphereLight, PointLight, Scene } from 'three'

export interface SceneLights {
  sun: PointLight
  ambient: AmbientLight
  sky: HemisphereLight
}

export function addLighting(scene: Scene): SceneLights {
  const ambient = new AmbientLight(0x4a3a28, 0.1)
  scene.add(ambient)

  const sky = new HemisphereLight(0xffe4c4, 0x0c0912, 0.16)
  scene.add(sky)

  const sun = new PointLight(0xfff3d2, 4.6, 0, 0)
  sun.position.set(0, 0, 0)
  sun.castShadow = false
  scene.add(sun)

  return { sun, ambient, sky }
}

export function setFillLight(lights: SceneLights, dim: boolean): void {
  lights.ambient.intensity = dim ? 0.04 : 0.1
  lights.sky.intensity = dim ? 0.06 : 0.16
}
