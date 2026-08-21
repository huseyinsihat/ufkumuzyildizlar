export type WebGLSupport = 'webgl2' | 'webgl1' | 'none'

export function detectWebGL(): WebGLSupport {
  if (typeof document === 'undefined') {
    return 'none'
  }
  try {
    const canvas = document.createElement('canvas')
    if (canvas.getContext('webgl2')) {
      return 'webgl2'
    }
    if (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) {
      return 'webgl1'
    }
    return 'none'
  } catch {
    return 'none'
  }
}

export function hasAnyWebGL(): boolean {
  return detectWebGL() !== 'none'
}
