import { useState } from 'react'
import { earthSunDistanceAtScale } from '../../features/comparison'
import { AU_KM } from '../../astronomy/astronomyConstants'
import { getBody } from '../../astronomy/planetData'
import { formatKm, formatNumberTr } from '../../utils/formatting'
import { useUiStore } from '../../store/uiStore'

export function ScaleExperiment() {
  const [cm, setCm] = useState(1)
  const result = earthSunDistanceAtScale(cm)
  const earthKm = getBody('earth').orbitalRadiusAu * AU_KM
  const close = () => useUiStore.getState().setActivePanel('none')

  return (
    <aside className="side-panel" aria-label="Ölçek deneyi">
      <header className="panel-head">
        <h2>Ölçek deneyi</h2>
        <button type="button" className="icon-btn" onClick={close} aria-label="Kapat">
          ×
        </button>
      </header>
      <p>Uzay neden bu kadar büyük? Bunu bir cetvelle düşün.</p>
      <p className="muted">Gerçek Güneş–Dünya uzaklığı yaklaşık {formatKm(earthKm)}.</p>
      <label>
        1 cm = {cm} milyon km
        <input
          type="range"
          min={1}
          max={10}
          value={cm}
          onChange={(e) => setCm(Number(e.target.value))}
          aria-label="Ölçek seç"
        />
      </label>
      <p>{result.label}</p>
      <div className="scale-bar" aria-hidden="true">
        <span className="sun-dot" />
        <span className="scale-line" style={{ width: `${Math.min(result.cm / 2, 220)}px` }} />
        <span className="earth-dot" />
      </div>
      <p className="muted">
        Bu ölçekte Dünya’nın kendisi yalnızca {formatNumberTr((getBody('earth').radiusKm * 2 * cm) / 1_000_000, 4)} cm
        olurdu — neredeyse görünmez.
      </p>
    </aside>
  )
}
