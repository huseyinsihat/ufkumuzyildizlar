import { spawn } from 'node:child_process'
import { mkdir, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const CLIP_IDS = new Set([
  'intro-welcome',
  'intro-lead',
  'intro-lab',
  'intro-explore',
  'intro-team',
  'mode-explore',
  'mode-lab',
  'ui-planets',
  'ui-stars',
  'ui-facts',
  'ui-compare',
  'ui-team',
  'ui-overview',
  'body-sun',
  'body-mercury',
  'body-venus',
  'body-earth',
  'body-moon',
  'body-mars',
  'body-jupiter',
  'body-saturn',
  'body-uranus',
  'body-neptune',
  'body-pluto',
  'lab-predict',
  'lab-watch',
  'lab-why',
  'lab-done',
  'room-motion',
  'room-earth',
  'room-gravity',
  'room-scale',
  'room-build',
  'room-sky',
  'activity-arrange-orbits',
  'activity-moon-phases',
  'activity-closest-hottest',
  'activity-drop-ball',
  'activity-who-faster',
])

const root = fileURLToPath(new URL('..', import.meta.url))
const sourceDir = join(root, 'seslendirme', 'yenisesler')
const destDir = join(root, 'seslendirme')

function parseClipName(name) {
  const cleaned = name.replace(/\s+_+\s*$/, '').trim()
  const match =
    cleaned.match(/^(tr|en)-([a-z0-9-]+)\.mp3\.m4a$/i) ||
    cleaned.match(/^(tr|en)-([a-z0-9-]+)\.(?:mp3|m4a|ogg|wav)$/i)
  if (!match) return null
  return { lang: match[1].toLowerCase(), id: match[2].toLowerCase() }
}

function resolveFfmpeg() {
  if (process.env.FFMPEG) return process.env.FFMPEG
  try {
    const require = createRequire(import.meta.url)
    const bundled = require('ffmpeg-static')
    if (bundled) return bundled
  } catch {
    // system ffmpeg
  }
  return 'ffmpeg'
}

function convert(ffmpeg, input, output) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      ffmpeg,
      ['-y', '-i', input, '-vn', '-ac', '1', '-ar', '44100', '-b:a', '96k', output],
      { stdio: ['ignore', 'ignore', 'pipe'] },
    )
    let err = ''
    child.stderr.on('data', (chunk) => {
      err += chunk
    })
    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) resolve()
      else reject(new Error(err.trim() || `ffmpeg exit ${code}`))
    })
  })
}

async function ingest() {
  const ffmpeg = resolveFfmpeg()
  await mkdir(destDir, { recursive: true })
  const names = await readdir(sourceDir)
  const converted = []
  const skipped = []

  for (const name of names) {
    const parsed = parseClipName(name)
    if (!parsed || !CLIP_IDS.has(parsed.id)) {
      skipped.push(name)
      continue
    }
    const output = join(destDir, `${parsed.lang}-${parsed.id}.mp3`)
    await convert(ffmpeg, join(sourceDir, name), output)
    converted.push(`${parsed.lang}-${parsed.id}.mp3`)
  }

  converted.sort()
  console.log(`voice:ingest ${converted.length} file(s) → seslendirme/`)
  for (const name of converted) console.log(`  ${name}`)
  if (skipped.length) {
    console.log(`skipped ${skipped.length}:`)
    for (const name of skipped) console.log(`  ${name}`)
  }
}

ingest().catch((error) => {
  console.error(error)
  process.exit(1)
})
