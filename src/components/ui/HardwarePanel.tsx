import {
  BOARD_BOTTOM,
  BOARD_LEFT,
  BOARD_RIGHT,
  hardwareLineMatches,
  type BoardPad,
} from '../../hardware/bindings'
import { applyHardwareCommand, parseHardwareLine } from '../../hardware/commands'
import { useHardwareStore } from '../../hardware/hardwareStore'
import { loc } from '../../i18n/types'
import { useLang, useT } from '../../i18n/useT'
import { useUiStore } from '../../store/uiStore'

function firePad(pad: BoardPad): void {
  if (!pad.line) return
  if (pad.line.startsWith('T:')) {
    applyHardwareCommand({ kind: 'time', t: 0.5 })
    useHardwareStore.setState({ lastLine: 'T:0.5' })
    return
  }
  const command = parseHardwareLine(pad.line)
  if (!command) return
  applyHardwareCommand(command)
  useHardwareStore.setState({ lastLine: pad.line })
}

function Pad({ pad, live }: { pad: BoardPad; live: boolean }) {
  const lang = useLang()
  const clickable = Boolean(pad.line) && pad.kind !== 'motion'
  const className = `board-pad is-${pad.kind}${live ? ' is-live' : ''}`
  const label = loc(lang, pad.label)

  if (!clickable) {
    return (
      <div className={className}>
        <b>{pad.pin}</b>
        <span>{label}</span>
      </div>
    )
  }

  return (
    <button type="button" className={className} onClick={() => firePad(pad)}>
      <b>{pad.pin}</b>
      <span>{label}</span>
    </button>
  )
}

function statusCopy(status: string, message: string, t: (key: 'hwConnected' | 'hwUnsupported' | 'hwError' | 'hwIdle') => string): string {
  if (status === 'connected') return t('hwConnected')
  if (status === 'unsupported') return t('hwUnsupported')
  if (status === 'error') return message || t('hwError')
  return t('hwIdle')
}

export function HardwarePanel() {
  const t = useT()
  const status = useHardwareStore((s) => s.status)
  const message = useHardwareStore((s) => s.message)
  const lastLine = useHardwareStore((s) => s.lastLine)
  const connect = useHardwareStore((s) => s.connect)
  const disconnect = useHardwareStore((s) => s.disconnect)
  const close = () => useUiStore.getState().setActivePanel('none')

  return (
    <aside className="hud-sheet hardware-sheet" aria-label={t('hardware')}>
      <header className="panel-head">
        <div>
          <h2>{t('hardware')}</h2>
          <p className="muted">{statusCopy(status, message, t)}</p>
        </div>
        <button type="button" className="icon-btn" onClick={close} aria-label={t('close')}>
          ×
        </button>
      </header>

      <div className="hardware-toolbar">
        {status === 'connected' ? (
          <button type="button" className="chip" onClick={() => void disconnect()}>
            {t('disconnect')}
          </button>
        ) : (
          <button
            type="button"
            className="chip"
            onClick={() => void connect({ request: true })}
            disabled={status === 'unsupported'}
          >
            {t('connect')}
          </button>
        )}
        {lastLine ? (
          <span className="hardware-last">
            {t('lastLine')}: {lastLine}
          </span>
        ) : null}
      </div>

      <div className="board" aria-label={t('pinGrid')}>
        <div className="board-col" aria-label={t('leftPins')}>
          {BOARD_LEFT.map((pad) => (
            <Pad key={`L-${pad.pin}`} pad={pad} live={hardwareLineMatches(lastLine, pad.line)} />
          ))}
        </div>
        <div className="board-core">
          <span className="board-usb">USB</span>
          <strong>Deneyap Kart 1A</strong>
          <span>{t('boardHint')}</span>
        </div>
        <div className="board-col" aria-label={t('rightPins')}>
          {BOARD_RIGHT.map((pad) => (
            <Pad key={`R-${pad.pin}`} pad={pad} live={hardwareLineMatches(lastLine, pad.line)} />
          ))}
        </div>
        <div className="board-bottom">
          <p className="board-bottom-label">{t('extraPins')}</p>
          <div className="board-bottom-pads">
            {BOARD_BOTTOM.map((pad) => (
              <Pad key={`B-${pad.pin}`} pad={pad} live={hardwareLineMatches(lastLine, pad.line)} />
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
