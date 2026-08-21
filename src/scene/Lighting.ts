import { AmbientLight, PointLight, Scene } from 'three'

export function addLighting(scene: Scene): PointLight {
  const ambient = new AmbientLight(0x6b7c9c, 0.18)
  scene.add(ambient)

  const sunLight = new PointLight(0xfff1c1, 3.4, 0, 0)
  sunLight.position.set(0, 0, 0)
  sunLight.castShadow = false
  scene.add(sunLight)

  return sunLight
}
