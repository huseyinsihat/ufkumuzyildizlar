import { describe, expect, it, vi } from 'vitest'
import { displayName, getBody } from '../astronomy/planetData'
import { applyDocumentLang } from './applyLang'
import { tx } from './types'
import { UI } from './ui'

describe('i18n core', () => {
  it('returns both languages from tx', () => {
    expect(tx('tr', UI.language)).toBe('Dil')
    expect(tx('en', UI.language)).toBe('Language')
    expect(tx('tr', UI.explore)).toBe('Güneş Sistemini Keşfet')
    expect(tx('en', UI.explore)).toBe('Explore the Solar System')
  })

  it('shows Sun and Güneş from displayName', () => {
    const sun = getBody('sun')
    expect(displayName(sun, 'tr')).toBe('Güneş')
    expect(displayName(sun, 'en')).toBe('Sun')
    expect(displayName('earth', 'en')).toBe('Earth')
    expect(displayName('earth', 'tr')).toBe('Dünya')
  })

  it('sets html lang from applyDocumentLang', () => {
    const root = { lang: 'tr' }
    vi.stubGlobal('document', { documentElement: root })
    applyDocumentLang('en')
    expect(root.lang).toBe('en')
    applyDocumentLang('tr')
    expect(root.lang).toBe('tr')
    vi.unstubAllGlobals()
  })
})
