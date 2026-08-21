import { CanvasTexture, SRGBColorSpace } from 'three'
import type { BodyId } from '../types/planet'
import { seededRandom } from '../utils/math'

function hexToRgb(hex: string): [number, number, number] {
  const value = Number.parseInt(hex.replace('#', ''), 16)
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255]
}

function noiseValue(random: () => number, x: number, y: number): number {
  return (Math.sin(x * 12.9898 + y * 78.233 + random() * 0.01) * 43758.5453) % 1
}

export function createBodyTexture(id: BodyId, color: string, size = 512): CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('2B tuval bağlamı oluşturulamadı')
  }

  const [r, g, b] = hexToRgb(color)
  const random = seededRandom(id.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 1))

  const image = ctx.createImageData(size, size)
  const data = image.data

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const u = x / size
      const v = y / size
      let nr = r
      let ng = g
      let nb = b

      const n1 = Math.abs(noiseValue(random, u * 18, v * 12))
      const n2 = Math.abs(noiseValue(random, u * 40, v * 28))
      const band = 0.5 + 0.5 * Math.sin(v * Math.PI * (id === 'jupiter' || id === 'saturn' ? 18 : 6) + n1 * 4)

      if (id === 'earth') {
        const land = n1 * n2
        if (land > 0.18 && v > 0.18 && v < 0.82) {
          nr = 46
          ng = 120
          nb = 62
        } else {
          nr = 32
          ng = 92
          nb = 168
        }
        if (v < 0.12 || v > 0.88) {
          nr = 230
          ng = 240
          nb = 255
        }
      } else if (id === 'jupiter' || id === 'saturn') {
        nr = Math.min(255, r * (0.7 + band * 0.5))
        ng = Math.min(255, g * (0.7 + (1 - band) * 0.4))
        nb = Math.min(255, b * (0.65 + n2 * 0.3))
      } else if (id === 'sun') {
        const glow = 0.75 + n1 * 0.35
        nr = Math.min(255, 255 * glow)
        ng = Math.min(255, 180 * glow)
        nb = Math.min(255, 60 * glow)
      } else if (id === 'mars') {
        nr = Math.min(255, r + n1 * 40)
        ng = Math.max(0, g - n2 * 20)
        nb = Math.max(0, b - n1 * 10)
      } else {
        nr = Math.min(255, r * (0.75 + n1 * 0.4))
        ng = Math.min(255, g * (0.75 + n2 * 0.35))
        nb = Math.min(255, b * (0.75 + band * 0.3))
      }

      const i = (y * size + x) * 4
      data[i] = nr
      data[i + 1] = ng
      data[i + 2] = nb
      data[i + 3] = 255
    }
  }

  ctx.putImageData(image, 0, 0)
  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.anisotropy = 4
  return texture
}

export function createRingTexture(): CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Halka dokusu oluşturulamadı')
  }
  const gradient = ctx.createLinearGradient(0, 0, 1024, 0)
  gradient.addColorStop(0, 'rgba(0,0,0,0)')
  gradient.addColorStop(0.08, 'rgba(210,190,150,0.15)')
  gradient.addColorStop(0.22, 'rgba(230,210,170,0.55)')
  gradient.addColorStop(0.35, 'rgba(40,30,20,0.05)')
  gradient.addColorStop(0.48, 'rgba(220,200,160,0.7)')
  gradient.addColorStop(0.62, 'rgba(180,160,120,0.25)')
  gradient.addColorStop(0.78, 'rgba(235,220,180,0.5)')
  gradient.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 1024, 64)
  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  return texture
}
