import { useMemo } from 'react'
import { getHeliocentricEclipticAu } from '../../astronomy/coordinateSystems'
import { getPlanets, getBody, displayName } from '../../astronomy/planetData'
import { auToScene } from '../../astronomy/visualScale'
import { useLang } from '../../i18n/useT'
import { useSimulationStore } from '../../store/simulationStore'
import { useEducationStore } from '../../store/educationStore'
import { useLabStore } from '../../store/labStore'
import { useUiStore } from '../../store/uiStore'
import { focusBody } from '../../features/planetExplorer/focus'

const SIZE = 640
const CX = SIZE / 2
const CY = SIZE / 2
const SCALE = 2.6

export function SolarSystem2D() {
  const lang = useLang()
  const time = useSimulationStore((s) => s.displayedTimeMs)
  const selected = useSimulationStore((s) => s.selectedBodyId)
  const selectBody = useSimulationStore((s) => s.selectBody)
  const scaleMode = useSimulationStore((s) => s.scaleMode)
  const showOrbits = useSimulationStore((s) => s.showOrbits)
  const showLabels = useSimulationStore((s) => s.showLabels)
  const setPanel = useUiStore((s) => s.setActivePanel)
  const notify = useEducationStore((s) => s.notifySelection)
  const intro = useUiStore((s) => s.introVisible)
  const mode = useUiStore((s) => s.appMode)
  const labOpen = useLabStore((s) => s.labOpen)
  const hideNames = intro || (mode === 'lab' && labOpen) || !showLabels

  const date = useMemo(() => new Date(time), [time])
  const planets = getPlanets()

  return (
    <div className="fallback-2d">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label="2B Güneş Sistemi şeması">
        <rect width={SIZE} height={SIZE} fill="#050814" />
        <circle
          cx={CX}
          cy={CY}
          r={14}
          fill={getBody('sun').color}
          stroke={selected === 'sun' ? '#7ee0ff' : 'transparent'}
          strokeWidth={2}
          role="button"
          tabIndex={0}
          aria-label={displayName('sun', lang)}
          onClick={() => focusBody('sun')}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              focusBody('sun')
            }
          }}
        />
        {hideNames ? null : (
          <text x={CX} y={CY - 20} textAnchor="middle" fill="#fff" fontSize="11">
            {displayName('sun', lang)}
          </text>
        )}
        {planets.map((planet) => {
          const pos = auToScene(getHeliocentricEclipticAu(planet.id, date), scaleMode)
          const x = CX + pos.x * SCALE
          const y = CY + pos.z * SCALE
          const r = Math.max(3, Math.min(12, planet.radiusKm / 8000))
          const active = selected === planet.id
          return (
            <g key={planet.id}>
              {showOrbits ? (
                <>
                  <circle
                    cx={CX}
                    cy={CY}
                    r={Math.hypot(x - CX, y - CY)}
                    fill="none"
                    stroke="transparent"
                    strokeWidth={16}
                    pointerEvents="stroke"
                    role="button"
                    tabIndex={0}
                    aria-label={`${displayName(planet, lang)}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => focusBody(planet.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        focusBody(planet.id)
                      }
                    }}
                  />
                  <circle
                    cx={CX}
                    cy={CY}
                    r={Math.hypot(x - CX, y - CY)}
                    fill="none"
                    stroke={active ? '#7ee0ff' : '#3d4d78'}
                    strokeWidth={active ? 6 : 4}
                    pointerEvents="none"
                  />
                </>
              ) : null}
              <circle
                cx={x}
                cy={y}
                r={r}
                fill={planet.color}
                stroke={active ? '#7ee0ff' : 'transparent'}
                strokeWidth={2}
                role="button"
                tabIndex={0}
                aria-label={displayName(planet, lang)}
                onClick={() => {
                  selectBody(planet.id)
                  notify(planet.id)
                  setPanel('none')
                }}
              />
              {hideNames ? null : (
                <text x={x + 10} y={y - 8} fill="#e8eef8" fontSize="10">
                  {displayName(planet, lang)}
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
