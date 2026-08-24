import { CanvasTexture, NoColorSpace, SRGBColorSpace, Texture, TextureLoader } from 'three'
import type { BodyId } from '../types/planet'

export interface BodyTextureSet {
  map?: Texture
  roughnessMap?: Texture
  emissiveMap?: Texture
  clouds?: Texture
  normalMap?: Texture
}

const COLOR_FILES: Partial<Record<BodyId, string>> = {
  sun: 'sun.jpg',
  mercury: 'mercury.jpg',
  venus: 'venus.jpg',
  earth: 'earth.jpg',
  moon: 'moon.jpg',
  mars: 'mars.jpg',
  phobos: 'phobos.jpg',
  deimos: 'deimos.jpg',
  jupiter: 'jupiter.jpg',
  io: 'io.jpg',
  europa: 'europa.jpg',
  ganymede: 'ganymede.jpg',
  callisto: 'callisto.jpg',
  saturn: 'saturn.jpg',
  titan: 'titan.jpg',
  uranus: 'uranus.jpg',
  neptune: 'neptune.jpg',
  pluto: 'pluto.jpg',
}

function textureUrl(file: string): string {
  const base = import.meta.env.BASE_URL || '/'
  return `${base}textures/${file}`
}

function loadFile(loader: TextureLoader, file: string): Promise<Texture | undefined> {
  return new Promise((resolve) => {
    loader.load(
      textureUrl(file),
      (texture) => {
        texture.colorSpace = SRGBColorSpace
        texture.anisotropy = 8
        resolve(texture)
      },
      undefined,
      () => resolve(undefined),
    )
  })
}

function specularToRoughness(specular: Texture): CanvasTexture | undefined {
  const image = specular.image as HTMLImageElement | ImageBitmap | undefined
  if (!image || !('width' in image)) return undefined
  const canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height
  const ctx = canvas.getContext('2d')
  if (!ctx) return undefined
  ctx.drawImage(image, 0, 0)
  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = pixels.data
  for (let i = 0; i < data.length; i += 4) {
    const spec = data[i] ?? 0
    const rough = 255 - spec
    data[i] = rough
    data[i + 1] = rough
    data[i + 2] = rough
  }
  ctx.putImageData(pixels, 0, 0)
  const texture = new CanvasTexture(canvas)
  texture.anisotropy = 8
  return texture
}

export async function loadBodyTextures(): Promise<Map<BodyId, BodyTextureSet>> {
  const loader = new TextureLoader()
  const result = new Map<BodyId, BodyTextureSet>()
  const entries = Object.entries(COLOR_FILES) as [BodyId, string][]

  await Promise.all(
    entries.map(async ([id, file]) => {
      const map = await loadFile(loader, file)
      if (!map) return
      const set: BodyTextureSet = { map }
      if (id === 'earth') {
        const [spec, night, clouds] = await Promise.all([
          loadFile(loader, 'earth_specular.jpg'),
          loadFile(loader, 'earth_night.jpg'),
          loadFile(loader, 'earth_clouds.jpg'),
        ])
        if (spec) {
          set.roughnessMap = specularToRoughness(spec) ?? spec
          spec.dispose()
        }
        if (night) set.emissiveMap = night
        if (clouds) set.clouds = clouds
      }
      const normal = await loadFile(loader, `${id}_normal.jpg`)
      if (normal) {
        normal.colorSpace = NoColorSpace
        set.normalMap = normal
      }
      result.set(id, set)
    }),
  )

  return result
}
