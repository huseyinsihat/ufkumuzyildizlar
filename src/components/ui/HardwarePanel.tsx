import {
  BOARD_BOTTOM,
  BOARD_LEFT,
  BOARD_RIGHT,
  hardwareLineMatches,
  type BoardPad,
} from '../../hardware/bindings'
import { applyHardwareCommand, parseHardwareLine } from '../../hardware/commands'
import { useHardwareStore } from '../../hardware/hardwareStore'
import { useUiStore } from '../../store/uiStore'

function firePad(pad: BoardPad): void {
  if (!pad.line) return
  if (pad.line.startsWith('T:')) {
    applyHardwareCommand({ kind: 'time', t: 0.5 })
    useHardwareStore.setState({ lastLine: 'T:0.5' })
    useUiStore.getState().setActivePanel('hardware')
    return
  }
  const command = parseHardwareLine(pad.line)
  if (!command) return
  applyHardwareCommand(command)
  useHardwareStore.setState({ lastLine: pad.line })
  useUiStore.getState().setActivePanel('hardware')
}

function Pad({ pad, live }: { pad: BoardPad; live: boolean }) {
  const clickable = Boolean(pad.line) && pad.kind !== 'motion'
  const className = `board-pad is-${pad.kind}${live ? ' is-live' : ''}`

  if (!clickable) {
    return (
      <div className={className}>
        <b>{pad.pin}</b>
        <span>{pad.label}</span>
      </div>
    )
  }

  return (
    <button type="button" className={className} onClick={() => firePad(pad)}>
      <b>{pad.pin}</b>
      <span>{pad.label}</span>
    </button>
  )
}

function statusText(status: string, message: string): string {
  if (status === 'connected') return 'Kart bağlı. Bir pine bas, sahnede ne olduğunu gör.'
  if (status === 'unsupported') return 'USB için Chrome veya Edge gerekir.'
  if (status === 'error') return message || 'Kart koptu.'
  return 'USB tak, Bağlan’a bas. Pinlere dokunarak da deneyebilirsin.'
}

export function HardwarePanel() {
  const status = useHardwareStore((s) => s.status)
  const message = useHardwareStore((s) => s.message)
  const lastLine = useHardwareStore((s) => s.lastLine)
  const connect = useHardwareStore((s) => s.connect)
  const disconnect = useHardwareStore((s) => s.disconnect)
  const close = () => useUiStore.getState().setActivePanel('none')

  return (
    <aside className="hud-sheet hardware-sheet" aria-label="Deneyap Kart">
      <header className="panel-head">
        <div>
          <h2>Deneyap Kart</h2>
          <p className="muted">{statusText(status, message)}</p>
        </div>
        <button type="button" className="icon-btn" onClick={close} aria-label="Kapat">
          ×
        </button>
      </header>

      <div className="hardware-toolbar">
        {status === 'connected' ? (
          <button type="button" className="chip" onClick={() => void disconnect()}>
            Kopar
          </button>
        ) : (
          <button
            type="button"
            className="chip"
            onClick={() => void connect({ request: true })}
            disabled={status === 'unsupported'}
          >
            Bağlan
          </button>
        )}
        {lastLine ? <span className="hardware-last">Son: {lastLine}</span> : null}
      </div>

      <div className="board" aria-label="Pin ızgarası">
        <div className="board-col" aria-label="Sol pinler">
          {BOARD_LEFT.map((pad) => (
            <Pad key={`L-${pad.pin}`} pad={pad} live={hardwareLineMatches(lastLine, pad.line)} />
          ))}
        </div>
        <div className="board-core">
          <span className="board-usb">USB</span>
          <strong>Deneyap Kart 1A</strong>
          <span>Sol ve sağ pinler sahneyi yönetir.</span>
        </div>
        <div className="board-col" aria-label="Sağ pinler">
          {BOARD_RIGHT.map((pad) => (
            <Pad key={`R-${pad.pin}`} pad={pad} live={hardwareLineMatches(lastLine, pad.line)} />
          ))}
        </div>
        <div className="board-bottom">
          <p className="board-bottom-label">En alttaki ek pinler</p>
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
