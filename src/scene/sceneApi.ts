import type { SolarSystemScene } from './SolarSystemScene'

let scene: SolarSystemScene | null = null

export function registerScene(instance: SolarSystemScene | null): void {
  scene = instance
}

export function getScene(): SolarSystemScene | null {
  return scene
}
