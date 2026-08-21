import { AmbientLight, HemisphereLight, PointLight, Scene } from 'three'

export function addLighting(scene: Scene): PointLight {
  const ambient = new AmbientLight(0x3a4a66, 0.07)
  scene.add(ambient)

  const skyFill = new HemisphereLight(0x8eb4ff, 0x08060c, 0.16)
  scene.add(skyFill)

  const sunLight = new PointLight(0xfff1c4, 6.4, 0, 0)
  sunLight.position.set(0, 0, 0)
  sunLight.castShadow = false
  scene.add(sunLight)

  return sunLight
}
