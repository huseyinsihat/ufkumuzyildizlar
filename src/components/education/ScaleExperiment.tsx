import { useState } from 'react'
import { earthSunDistanceAtScale } from '../../features/comparison'
import { AU_KM } from '../../astronomy/astronomyConstants'
import { getBody } from '../../astronomy/planetData'
import { L, tx } from '../../i18n/types'
import { useLang, useT } from '../../i18n/useT'
import { formatKm, formatNumberTr } from '../../utils/formatting'
import { useUiStore } from '../../store/uiStore'

const TITLE = L('Ölçek deneyi', 'Scale experiment')
const LEAD = L('Uzay neden bu kadar büyük? Bunu bir cetvelle düşün.', 'Why is space so big? Think of it with a ruler.')
const REAL_DIST = L('Gerçek Güneş–Dünya uzaklığı yaklaşık {dist}.', 'The real Sun–Earth distance is about {dist}.')
const CM_EQ = L('1 cm = {cm} milyon km', '1 cm = {cm} million km')
const PICK = L('Ölçek seç', 'Pick a scale')
const TINY = L(
  'Bu ölçekte Dünya’nın kendisi yalnızca {size} cm olurdu — neredeyse görünmez.',
  'At this scale Earth itself would be only {size} cm — almost invisible.',
)

export function ScaleExperiment() {
  const t = useT()
  const lang = useLang()
  const [cm, setCm] = useState(1)
  const result = earthSunDistanceAtScale(cm, lang)
  const earthKm = getBody('earth').orbitalRadiusAu * AU_KM
  const close = () => useUiStore.getState().setActivePanel('none')
  const tiny = formatNumberTr((getBody('earth').radiusKm * 2 * cm) / 1_000_000, 4, lang)

  return (
    <aside className="side-panel" aria-label={tx(lang, TITLE)}>
      <header className="panel-head">
        <h2>{tx(lang, TITLE)}</h2>
        <button type="button" className="icon-btn" onClick={close} aria-label={t('close')}>
          ×
        </button>
      </header>
      <p>{tx(lang, LEAD)}</p>
      <p className="muted">{tx(lang, REAL_DIST).replace('{dist}', formatKm(earthKm, lang))}</p>
      <label>
        {tx(lang, CM_EQ).replace('{cm}', String(cm))}
        <input
          type="range"
          min={1}
          max={10}
          value={cm}
          onChange={(e) => setCm(Number(e.target.value))}
          aria-label={tx(lang, PICK)}
        />
      </label>
      <p>{result.label}</p>
      <div className="scale-bar" aria-hidden="true">
        <span className="sun-dot" />
        <span className="scale-line" style={{ width: `${Math.min(result.cm / 2, 220)}px` }} />
        <span className="earth-dot" />
      </div>
      <p className="muted">{tx(lang, TINY).replace('{size}', tiny)}</p>
    </aside>
  )
}
