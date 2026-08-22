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

function mix(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function inEllipse(lon: number, lat: number, cx: number, cy: number, rx: number, ry: number): number {
  const dx = (lon - cx) / rx
  const dy = (lat - cy) / ry
  return 1 - (dx * dx + dy * dy)
}

function crater(lon: number, lat: number, cx: number, cy: number, radius: number): number {
  const dx = lon - cx
  const dy = (lat - cy) * 1.35
  const d = Math.hypot(dx, dy)
  if (d > radius) return 0
  const t = d / radius
  if (t < 0.22) return -0.32
  if (t < 0.72) return mix(-0.18, 0.06, (t - 0.22) / 0.5)
  return mix(0.14, 0, (t - 0.72) / 0.28)
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
      const n2 = fbm(u * 18, v * 14)
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
        const gran = 0.62 + n * 0.28 + n2 * 0.18
        const flare = noise(u * 6, v * 6) > 0.88 ? 1.18 : 1
        r = 255 * gran * flare
        g = 176 * gran
        b = 42 * gran
      } else if (id === 'moon' || id === 'mercury') {
        let shade = 0.58 + n * 0.28 + n2 * 0.1
        shade += crater(lon, lat, -40, 18, 22)
        shade += crater(lon, lat, 70, -12, 16)
        shade += crater(lon, lat, 20, 48, 12)
        shade += crater(lon, lat, -80, -36, 18)
        shade += crater(lon, lat, 120, 8, 10)
        const mare = id === 'moon' && inEllipse(lon, lat, -20, 10, 50, 32) > 0
        r = (id === 'moon' ? (mare ? 150 : 208) : 176) * shade
        g = (id === 'moon' ? (mare ? 148 : 206) : 166) * shade
        b = (id === 'moon' ? (mare ? 146 : 210) : 152) * shade
      } else if (id === 'mars') {
        const ice = Math.abs(lat) > 74
        const highland = n > 0.62
        const canyon = inEllipse(lon, lat, -40, -8, 48, 8) > 0.2
        if (ice) {
          r = 236
          g = 240
          b = 246
        } else {
          r = canyon ? 120 : highland ? 196 : 168 + n * 36
          g = canyon ? 48 : highland ? 92 : 58 + n * 16
          b = canyon ? 28 : highland ? 42 : 26 + n2 * 10
        }
      } else if (id === 'venus') {
        const streak = 0.5 + 0.5 * Math.sin(v * 28 + u * 6 + n * 10)
        const swirl = 0.5 + 0.5 * Math.sin(v * 9 + n2 * 6)
        r = 232 * (0.78 + streak * 0.16)
        g = 188 * (0.76 + swirl * 0.16)
        b = 112 * (0.7 + n * 0.18)
      } else if (id === 'jupiter') {
        const latN = lat / 90
        const band = 0.5 + 0.5 * Math.sin(latN * Math.PI * 14 + n * 2.6)
        const belt = Math.pow(Math.abs(Math.sin(latN * Math.PI * 7)), 0.65)
        r = mix(214, 168, belt) * (0.78 + band * 0.22)
        g = mix(176, 108, belt) * (0.74 + (1 - band) * 0.18)
        b = mix(128, 64, belt) * (0.7 + n * 0.16)
        const spot = inEllipse(lon, lat, -48, -22, 20, 11)
        if (spot > 0) {
          r = mix(r, 196, Math.min(1, spot * 1.4))
          g = mix(g, 78, Math.min(1, spot * 1.4))
          b = mix(b, 48, Math.min(1, spot * 1.4))
        }
      } else if (id === 'saturn') {
        const latN = lat / 90
        const band = 0.5 + 0.5 * Math.sin(latN * Math.PI * 10 + n * 1.4)
        const eq = 1 - Math.abs(latN)
        r = mix(214, 236, eq * 0.45) * (0.86 + band * 0.12)
        g = mix(176, 214, eq * 0.4) * (0.84 + n * 0.1)
        b = mix(118, 156, eq * 0.25) * (0.8 + (1 - band) * 0.1)
      } else if (id === 'uranus') {
        const band = 0.5 + 0.5 * Math.sin((lat / 90) * Math.PI * 5 + n * 1.2)
        r = 148 * (0.72 + n * 0.12)
        g = 214 * (0.78 + band * 0.12)
        b = 216 * (0.82 + band * 0.1)
      } else if (id === 'neptune') {
        const band = 0.5 + 0.5 * Math.sin((lat / 90) * Math.PI * 6 + n * 1.6)
        const storm = inEllipse(lon, lat, 30, 18, 16, 10)
        r = 36 * (0.7 + n * 0.16)
        g = 92 * (0.74 + band * 0.14)
        b = 210 * (0.82 + band * 0.12)
        if (storm > 0) {
          r = mix(r, 18, storm)
          g = mix(g, 48, storm)
          b = mix(b, 120, storm)
        }
      } else if (id === 'pluto') {
        const heart = inEllipse(lon, lat, 10, -8, 28, 22)
        r = mix(196, 232, Math.max(0, heart)) * (0.72 + n * 0.24)
        g = mix(164, 210, Math.max(0, heart)) * (0.68 + n * 0.2)
        b = mix(132, 188, Math.max(0, heart)) * (0.62 + n * 0.18)
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

export function createRingTexture(inner: number, outer: number, faint: boolean): CanvasTexture {
  const size = 1024
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) throw new Error('Halka dokusu oluşturulamadı')

  const image = ctx.createImageData(size, size)
  const data = image.data
  const innerT = Math.max(0.05, Math.min(0.95, inner / outer))
  const cx = size / 2

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const dx = x + 0.5 - cx
      const dy = y + 0.5 - cx
      const uvR = Math.hypot(dx, dy) / cx
      const i = (y * size + x) * 4
      if (uvR < innerT || uvR > 1) {
        data[i + 3] = 0
        continue
      }
      const along = (uvR - innerT) / (1 - innerT)
      const grain = 0.82 + noise(x * 0.08, y * 0.08) * 0.22
      let alpha = 0
      let r = 232
      let g = 210
      let b = 168
      if (faint) {
        r = 176
        g = 214
        b = 214
        alpha = along > 0.12 && along < 0.88 ? 90 * grain : 0
      } else if (along < 0.18) {
        alpha = 70 * grain
      } else if (along < 0.42) {
        alpha = 210 * grain
      } else if (along < 0.5) {
        alpha = 12
      } else if (along < 0.82) {
        alpha = 165 * grain
      } else if (along < 0.88) {
        alpha = 40
      } else {
        alpha = 110 * grain
      }
      data[i] = r
      data[i + 1] = g
      data[i + 2] = b
      data[i + 3] = clampByte(alpha)
    }
  }

  ctx.putImageData(image, 0, 0)
  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.anisotropy = 8
  return texture
}

const portraitCache = new Map<string, string>()

export function createBodyPortraitUrl(id: BodyId, color: string, size = 168): string | undefined {
  const cached = portraitCache.get(id)
  if (cached) return cached
  if (typeof document === 'undefined') return undefined
  try {
    const mapTex = createBodyTexture(id, color, 256)
    const map = mapTex.image as HTMLCanvasElement
    const mapCtx = map.getContext('2d', { willReadFrequently: true })
    if (!mapCtx) {
      mapTex.dispose()
      return undefined
    }
    const mapPixels = mapCtx.getImageData(0, 0, map.width, map.height).data
    const mw = map.width
    const mh = map.height
    const out = document.createElement('canvas')
    out.width = size
    out.height = size
    const ctx = out.getContext('2d')
    if (!ctx) {
      mapTex.dispose()
      return undefined
    }
    const pixels = ctx.createImageData(size, size)
    const data = pixels.data
    const radius = (size - 1) / 2
    const yaw = id === 'earth' ? 0.42 : id === 'mars' ? 0.2 : 0.28
    const lx = -0.42
    const ly = 0.52
    const lz = 0.74
    const len = Math.hypot(lx, ly, lz) || 1
    const Lx = lx / len
    const Ly = ly / len
    const Lz = lz / len
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const nx = (x - radius) / radius
        const ny = (radius - y) / radius
        const d2 = nx * nx + ny * ny
        const i = (y * size + x) * 4
        if (d2 > 1) continue
        const nz = Math.sqrt(Math.max(0, 1 - d2))
        const lon = Math.atan2(nx, nz) + yaw
        const lat = Math.asin(Math.max(-1, Math.min(1, ny)))
        let frac = lon / (Math.PI * 2) + 0.5
        frac -= Math.floor(frac)
        const u = Math.min(mw - 1, Math.floor(frac * mw))
        const v = Math.max(0, Math.min(mh - 1, Math.floor((0.5 - lat / Math.PI) * mh)))
        const mi = (v * mw + u) * 4
        const shade = 0.34 + 0.78 * Math.max(0, nx * Lx + ny * Ly + nz * Lz)
        const limb = 0.62 + 0.38 * nz
        const light = shade * limb
        data[i] = clampByte((mapPixels[mi] ?? 0) * light)
        data[i + 1] = clampByte((mapPixels[mi + 1] ?? 0) * light)
        data[i + 2] = clampByte((mapPixels[mi + 2] ?? 0) * light)
        data[i + 3] = 255
      }
    }
    ctx.putImageData(pixels, 0, 0)
    mapTex.dispose()
    const url = out.toDataURL('image/png')
    portraitCache.set(id, url)
    return url
  } catch {
    return undefined
  }
}

export function createStarGlowTexture(): CanvasTexture {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Yıldız ışıması oluşturulamadı')
  const glow = ctx.createRadialGradient(32, 32, 1, 32, 32, 30)
  glow.addColorStop(0, 'rgba(255,252,240,1)')
  glow.addColorStop(0.18, 'rgba(255,244,210,0.85)')
  glow.addColorStop(0.45, 'rgba(255,220,140,0.28)')
  glow.addColorStop(1, 'rgba(255,200,80,0)')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, size, size)
  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  return texture
}
