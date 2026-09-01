import { copyFile, mkdir, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const sourceDir = join(root, 'seslendirme')
const destDir = join(root, 'public', 'audio')
const namePattern = /^(?:(?:tr|en)-.+|sfx-.+)\.mp3$/i

async function syncVoice() {
  await mkdir(destDir, { recursive: true })
  const names = (await readdir(sourceDir)).filter((name) => namePattern.test(name)).sort()
  for (const name of names) {
    await copyFile(join(sourceDir, name), join(destDir, name))
  }
  console.log(`voice:sync ${names.length} file(s) → public/audio/`)
  for (const name of names) console.log(`  ${name}`)
}

syncVoice().catch((error) => {
  console.error(error)
  process.exit(1)
})
