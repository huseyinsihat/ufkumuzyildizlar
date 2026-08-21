import { CanvasTexture, SRGBColorSpace } from 'three'
import type { BodyId } from '../types/planet'

function hash(n: number): number {
  const x = Math.sin(n * 127.1) * 43758.5453
  return x - Math.floor(x)
}

function noise(x: number, y: number): number {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const xf = x - xi
  const yf = y - yi
  const u = xf * xf * (3 - 2 * xf)
  const v = yf * yf * (3 - 2 * yf)
  const a = hash(xi * 13.1 + yi * 7.7)
  const b = hash((xi + 1) * 13.1 + yi * 7.7)
  const c = hash(xi * 13.1 + (yi + 1) * 7.7)
  const d = hash((xi + 1) * 13.1 + (yi + 1) * 7.7)
  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v
}

function fbm(x: number, y: number): number {
  return noise(x, y) * 0.55 + noise(x * 2.1, y * 2.1) * 0.3 + noise(x * 4.3, y * 4.3) * 0.15
}

function clampByte(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)))
}

function inEllipse(lon: number, lat: number, cx: number, cy: number, rx: number, ry: number): number {
  const dx = (lon - cx) / rx
  const dy = (lat - cy) / ry
  return 1 - (dx * dx + dy * dy)
}

function earthLand(lon: number, lat: number): number {
  const blobs = [
    inEllipse(lon, lat, 20, 8, 38, 38),
    inEllipse(lon, lat, 15, 52, 28, 18),
    inEllipse(lon, lat, 90, 48, 62, 28),
    inEllipse(lon, lat, 100, 20, 42, 22),
    inEllipse(lon, lat, 135, -24, 22, 16),
    inEllipse(lon, lat, -100, 48, 48, 28),
    inEllipse(lon, lat, -72, 16, 18, 16),
    inEllipse(lon, lat, -58, -18, 22, 32),
    inEllipse(lon, lat, -42, 72, 18, 12),
  ]
  const best = blobs.reduce((max, value) => Math.max(max, value), -1)
  return best + (fbm(lon * 0.08, lat * 0.1) - 0.5) * 0.35
}

export function createBodyTexture(id: BodyId, color: string, size = 768): CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) throw new Error('2B tuval bağlamı oluşturulamadı')

  const image = ctx.createImageData(size, size)
  const data = image.data
  const hex = Number.parseInt(color.replace('#', ''), 16)
  const baseR = (hex >> 16) & 255
  const baseG = (hex >> 8) & 255
  const baseB = hex & 255

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const u = x / size
      const v = y / size
      const lon = u * 360 - 180
      const lat = 90 - v * 180
      const n = fbm(u * 8, v * 6)
      let r = baseR
      let g = baseG
      let b = baseB

      if (id === 'earth') {
        const land = earthLand(lon, lat)
        const ice = lat > 72 || lat < -62 || (lat > 62 && n > 0.55)
        if (ice) {
          r = 236
          g = 244
          b = 252
        } else if (land > 0.08) {
          const desert = lat > 12 && lat < 32 && lon > -20 && lon < 55
          r = desert ? 194 : 46 + n * 40
          g = desert ? 160 : 108 + n * 36
          b = desert ? 92 : 52
        } else {
          r = 18 + n * 18
          g = 62 + n * 40
          b = 148 + n * 40
        }
      } else if (id === 'sun') {
        const gran = 0.72 + n * 0.38
        r = 255 * gran
        g = 168 * gran
        b = 48 * gran
      } else if (id === 'moon' || id === 'mercury') {
        const crater = noise(u * 28, v * 22)
        const shade = 0.55 + n * 0.35 - (crater > 0.82 ? 0.22 : 0)
        r = (id === 'moon' ? 196 : 168) * shade
        g = (id === 'moon' ? 196 : 160) * shade
        b = (id === 'moon' ? 200 : 150) * shade
      } else if (id === 'mars') {
        const ice = Math.abs(lat) > 72
        r = ice ? 230 : 168 + n * 50
        g = ice ? 236 : 62 + n * 18
        b = ice ? 242 : 28
      } else if (id === 'venus') {
        const swirl = 0.5 + 0.5 * Math.sin(v * 22 + n * 8)
        r = 228 * (0.82 + swirl * 0.18)
        g = 186 * (0.8 + n * 0.2)
        b = 118 * (0.75 + swirl * 0.2)
      } else if (id === 'jupiter') {
        const band = 0.5 + 0.5 * Math.sin(v * Math.PI * 16 + n * 3)
        const spot = inEllipse(lon, lat, -40, -18, 18, 10)
        r = 210 * (0.65 + band * 0.4)
        g = 160 * (0.6 + (1 - band) * 0.35)
        b = 96 * (0.55 + n * 0.25)
        if (spot > 0) {
          r = 196
          g = 86
          b = 54
        }
      } else if (id === 'saturn') {
        const band = 0.5 + 0.5 * Math.sin(v * Math.PI * 12 + n * 2)
        r = 230 * (0.75 + band * 0.2)
        g = 206 * (0.72 + n * 0.18)
        b = 150 * (0.7 + (1 - band) * 0.15)
      } else if (id === 'uranus' || id === 'neptune') {
        const band = 0.5 + 0.5 * Math.sin(v * Math.PI * 7 + n * 2)
        r = (id === 'uranus' ? 120 : 48) * (0.7 + n * 0.2)
        g = (id === 'uranus' ? 210 : 92) * (0.75 + band * 0.15)
        b = (id === 'uranus' ? 214 : 245) * (0.8 + band * 0.15)
      } else if (id === 'pluto') {
        r = 196 * (0.7 + n * 0.3)
        g = 164 * (0.65 + n * 0.25)
        b = 132 * (0.6 + n * 0.2)
      }

      const i = (y * size + x) * 4
      data[i] = clampByte(r)
      data[i + 1] = clampByte(g)
      data[i + 2] = clampByte(b)
      data[i + 3] = 255
    }
  }

  ctx.putImageData(image, 0, 0)
  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.anisotropy = 8
  return texture
}

export function createRingTexture(): CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Halka dokusu oluşturulamadı')
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
