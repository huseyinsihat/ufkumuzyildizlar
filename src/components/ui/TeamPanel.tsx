import { TEAM } from '../../content/team'
import { useHardwareStore } from '../../hardware/hardwareStore'
import { useUiStore } from '../../store/uiStore'

const PINS = [
  ['D0', 'Güneş'],
  ['D1', 'Merkür'],
  ['D2', 'Venüs'],
  ['D3', 'Dünya'],
  ['D4', 'Mars'],
  ['D5', 'Jüpiter'],
  ['D6', 'Satürn'],
  ['D7', 'Uranüs'],
  ['D8', 'Neptün'],
  ['D9', 'Oynat / Duraklat'],
  ['D10', '1 Gün'],
  ['D11', '1 Yıl'],
  ['D12', 'Şu an'],
  ['D13', 'Genel bakış'],
  ['D14', 'Yörünge'],
]

function Badge({ name, role }: { name: string; role: string }) {
  return (
    <li>
      <span className="team-initial" aria-hidden="true">
        {name
          .split(' ')
          .map((part) => part[0])
          .slice(0, 2)
          .join('')}
      </span>
      <strong>{name}</strong>
      <span>{role}</span>
    </li>
  )
}

export function TeamPanel() {
  const close = () => useUiStore.getState().setActivePanel('none')
  const status = useHardwareStore((s) => s.status)
  const message = useHardwareStore((s) => s.message)
  const lastLine = useHardwareStore((s) => s.lastLine)
  const connect = useHardwareStore((s) => s.connect)
  const disconnect = useHardwareStore((s) => s.disconnect)

  return (
    <aside className="hud-sheet team-sheet" aria-label="Takım">
      <header className="panel-head">
        <div>
          <h2>{TEAM.project}</h2>
          <p className="muted">
            {TEAM.teamName} · {TEAM.event}
          </p>
        </div>
        <button type="button" className="icon-btn" onClick={close} aria-label="Kapat">
          ×
        </button>
      </header>
      <div className="advisor-banner">
        <span className="team-initial" aria-hidden="true">
          HS
        </span>
        <div>
          <strong>{TEAM.advisor.name}</strong>
          <span>{TEAM.advisor.role}</span>
        </div>
      </div>
      <ul className="team-badges">
        {TEAM.members.map((member) => (
          <Badge key={member.name} name={member.name} role={member.role} />
        ))}
      </ul>

      <section className="hardware-block" aria-label="DeneyapKart">
        <h3>DeneyapKart</h3>
        <p className="muted">Kart yokken sahne aynı çalışır. Takınca tuşlar menüdeki işlerin aynısını yapar.</p>
        {status === 'unsupported' ? (
          <p className="muted">USB için Chrome veya Edge kullan.</p>
        ) : (
          <div className="row-actions">
            {status === 'connected' ? (
              <button type="button" className="btn" onClick={() => void disconnect()}>
                Bağlantıyı kes
              </button>
            ) : (
              <button type="button" className="btn primary" onClick={() => void connect()}>
                {status === 'error' ? 'Yeniden bağla' : 'DeneyapKart bağla'}
              </button>
            )}
            <span className="muted">{status === 'connected' ? 'Bağlı' : 'Bağlı değil'}</span>
          </div>
        )}
        {message ? <p className="muted">{message}</p> : null}
        {lastLine ? <p className="muted">Son tuş: {lastLine}</p> : null}
        <details>
          <summary>Pin tablosu</summary>
          <p className="muted">USB seri, 115200 baud. Tuşun bir ucu pine, diğer ucu GND.</p>
          <table className="pin-table">
            <thead>
              <tr>
                <th>Pin</th>
                <th>Tuş</th>
              </tr>
            </thead>
            <tbody>
              {PINS.map(([pin, label]) => (
                <tr key={pin}>
                  <td>{pin}</td>
                  <td>{label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      </section>
    </aside>
  )
}
