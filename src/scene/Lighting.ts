import { AmbientLight, HemisphereLight, PointLight, Scene } from 'three'

export interface SceneLights {
  sun: PointLight
  ambient: AmbientLight
  sky: HemisphereLight
}

export function addLighting(scene: Scene): SceneLights {
  const ambient = new AmbientLight(0x3a4a66, 0.045)
  scene.add(ambient)

  const sky = new HemisphereLight(0x8eb4ff, 0x08060c, 0.08)
  scene.add(sky)

  const sun = new PointLight(0xfff1c4, 7.2, 0, 0)
  sun.position.set(0, 0, 0)
  sun.castShadow = false
  scene.add(sun)

  return { sun, ambient, sky }
}

export function setFillLight(lights: SceneLights, dim: boolean): void {
  lights.ambient.intensity = dim ? 0.02 : 0.045
  lights.sky.intensity = dim ? 0.03 : 0.08
}
