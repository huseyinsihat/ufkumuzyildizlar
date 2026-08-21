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
  ['D10', '1 gün'],
  ['D11', '1 yıl'],
  ['D12', 'Şu an'],
  ['D13', 'Genel bakış'],
  ['D14', 'Yörünge'],
]

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
      <p className="team-lead">{TEAM.category}</p>
      <ul className="team-list">
        {TEAM.members.map((member) => (
          <li key={member.name}>
            <span className="team-initial" aria-hidden="true">
              {member.name.slice(0, 1)}
            </span>
            <div>
              <strong>{member.name}</strong>
              <span>{member.role}</span>
            </div>
          </li>
        ))}
      </ul>

      <section className="hardware-block" aria-label="DeneyapKart Bağlantı Bilgileri">
        <h3>DeneyapKart Bağlantı Bilgileri</h3>
        <p className="muted">
          Kart takılı değilken sahne aynı çalışır. Takınca tuşlar menüdeki işlerin aynısını yapar.
        </p>
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
                DeneyapKart bağla
              </button>
            )}
            <span className="muted">{status === 'connected' ? 'Bağlı' : 'Bağlı değil'}</span>
          </div>
        )}
        {message ? <p className="muted">{message}</p> : null}
        {lastLine ? <p className="muted">Son tuş: {lastLine}</p> : null}
        <p className="muted">USB seri, 115200 baud. Tuşun bir ucu pine, diğer ucu GND. Kod: firmware/deneyapkart/ufkumuz.ino</p>
        <p className="muted">Komutlar: P:earth · F:play · F:day · F:year · F:now · F:overview · F:orbits (Ay/Plüton: P:moon, P:pluto)</p>
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
      </section>
    </aside>
  )
}
