import type { ReactNode } from 'react'

const ICONS: Record<string, ReactNode> = {
  flask: (
    <>
      <path d="M9 3h6" />
      <path d="M10 3v6L6 19h12l-4-10V3" />
      <path d="M8.5 14h7" />
    </>
  ),
  planet: (
    <>
      <circle cx="12" cy="12" r="7.2" />
      <path d="M4 12h16" />
      <path d="M6.4 7.6c2.8 1.7 8.4 1.7 11.2 0" />
      <path d="M6.4 16.4c2.8-1.7 8.4-1.7 11.2 0" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="3.6" />
      <path d="M12 3.2v2.1M12 18.7v2.1M4.5 4.5l1.5 1.5M18 18l1.5 1.5M3.2 12h2.1M18.7 12h2.1M4.5 19.5l1.5-1.5M18 6l1.5-1.5" />
    </>
  ),
  orbit: (
    <>
      <ellipse cx="12" cy="12" rx="9" ry="4.4" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="20.2" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  compare: (
    <>
      <path d="M5 17V10h4v7zM15 17V6h4v11z" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 5v1.6M12 17.4V19M5 12h1.6M17.4 12H19M7 7l1.1 1.1M15.9 15.9 17 17M7 17l1.1-1.1M15.9 8.1 17 7" />
    </>
  ),
  ruler: (
    <>
      <path d="M4 8h16v8H4z" />
      <path d="M8 8v4M11 8v3M14 8v4M17 8v3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4.2l3 1.8" />
    </>
  ),
  weight: (
    <>
      <path d="M8.2 8h7.6L17 19H7z" />
      <path d="M12 5l2.2 3H9.8z" />
    </>
  ),
  thermo: (
    <>
      <path d="M11 4h2v9.4a3.2 3.2 0 1 1-2 0V4z" />
      <path d="M12 13.5v3" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3 9.4 11h3.8L11.2 21 18 10.2h-3.6L16.2 3z" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="2.4" />
      <path d="M4.5 18c.4-3 2.2-4.6 4.5-4.6S13.1 15 13.5 18" />
      <circle cx="16" cy="8.2" r="2.1" />
      <path d="M15 13.5c2.2.2 3.8 1.8 4.3 4.5" />
    </>
  ),
  book: (
    <>
      <path d="M4 6.5c1.6-.8 3.4-.8 5 0v12c-1.6-.8-3.4-.8-5 0z" />
      <path d="M20 6.5c-1.6-.8-3.4-.8-5 0v12c1.6-.8 3.4-.8 5 0z" />
      <path d="M12 6.5v12" />
    </>
  ),
  replay: (
    <>
      <path d="M7 7.5A6.5 6.5 0 1 1 5.6 12" />
      <path d="M7 4.2v3.6H3.4" />
    </>
  ),
  back: (
    <>
      <path d="M15 6 9 12l6 6" />
      <path d="M9 12h10" />
    </>
  ),
  forward: (
    <>
      <path d="M9 6l6 6-6 6" />
      <path d="M5 12h10" />
    </>
  ),
  up: (
    <>
      <path d="M6 15l6-6 6 6" />
      <path d="M12 9v10" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  down: (
    <>
      <path d="M6 9l6 6 6-6" />
      <path d="M12 15V5" />
    </>
  ),
  check: (
    <>
      <path d="M5.5 12.5 10 17l8.5-9" />
    </>
  ),
  reset: (
    <>
      <path d="M5 10V6.5H8.5" />
      <path d="M19 14v3.5H15.5" />
      <path d="M6.2 8.2A6.5 6.5 0 0 1 18 9.4" />
      <path d="M17.8 15.8A6.5 6.5 0 0 1 6 14.6" />
    </>
  ),
  chip: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.6" />
      <path d="M9 4.5v2.5M12 4.5v2.5M15 4.5v2.5M9 17v2.5M12 17v2.5M15 17v2.5M4.5 9h2.5M4.5 12h2.5M4.5 15h2.5M17 9h2.5M17 12h2.5M17 15h2.5" />
    </>
  ),
  more: (
    <>
      <circle cx="6" cy="12" r="1.7" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none" />
      <circle cx="18" cy="12" r="1.7" fill="currentColor" stroke="none" />
    </>
  ),
  play: <path d="M8 6.5v11L18 12z" />,
  pause: (
    <>
      <path d="M8 6h3v12H8zM13 6h3v12h-3z" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.4 7-11.2A7 7 0 0 0 5 9.8C5 14.6 12 21 12 21z" />
      <circle cx="12" cy="9.8" r="2.2" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8.5h3.2l1.4-2h6.8l1.4 2H20a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 20 19.5H4A1.5 1.5 0 0 1 2.5 18v-8A1.5 1.5 0 0 1 4 8.5z" />
      <circle cx="12" cy="13.5" r="3.2" />
    </>
  ),
  eclipse: (
    <>
      <circle cx="12" cy="12" r="7" />
      <path d="M12 5a7 7 0 0 0 0 14" />
    </>
  ),
  moon: (
    <>
      <path d="M15.5 4.2A7.5 7.5 0 1 0 19.8 14 6 6 0 0 1 15.5 4.2z" />
    </>
  ),
  volcano: (
    <>
      <path d="M4 19h16L14.5 9l-2 3-2.5-5z" />
      <path d="M12 4v3M10.5 5.5 12 7l1.5-1.5" />
    </>
  ),
  geyser: (
    <>
      <path d="M8 19h8" />
      <path d="M10 19c0-4 1-7 2-10 1 3 2 6 2 10" />
      <path d="M11 7c-1.5-2-1-3.5 1-4.5 2 1 2.5 2.5 1 4.5" />
    </>
  ),
  rain: (
    <>
      <path d="M8 10a4 4 0 0 1 7.5-1.8A3.2 3.2 0 1 1 17 16H8.5A3.5 3.5 0 0 1 8 10z" />
      <path d="M9 18.5 8 21M12 18.5 11 21M15 18.5 14 21" />
    </>
  ),
  ocean: (
    <>
      <path d="M3 14c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2" />
      <path d="M3 18c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2" />
      <path d="M7 8c1.2-2 3-3.2 5-3.2S15.8 6 17 8" />
    </>
  ),
  flare: (
    <>
      <path d="M12 3v6M8.5 5.5 12 9l3.5-3.5" />
      <circle cx="12" cy="14.5" r="4.5" />
      <path d="M12 12.2v4.6M9.8 14.5h4.4" />
    </>
  ),
  aurora: (
    <>
      <path d="M4 18c2-5 3.5-8 5-8s2.5 4 4 4 2.5-5 4-5 2.5 3 3 5" />
      <path d="M3 19h18" />
    </>
  ),
  spot: (
    <>
      <circle cx="12" cy="12" r="7.5" />
      <ellipse cx="10" cy="11" rx="3.2" ry="2.2" />
    </>
  ),
  dust: (
    <>
      <path d="M4 16c3-1 5 1 8 0s5-2 8-1" />
      <path d="M5 12c2.5-.8 4.5.6 7 0s4.5-1.4 7-.2" />
      <circle cx="8" cy="8" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="13" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="17" cy="9" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  rings: (
    <>
      <ellipse cx="12" cy="12" rx="9" ry="3.6" />
      <circle cx="12" cy="12" r="3.2" />
    </>
  ),
  meteor: (
    <>
      <path d="M5 19 14.5 9.5" />
      <path d="M9 19l2.5-2.5M5 15l2.5-2.5" />
      <circle cx="16.5" cy="7.5" r="2.2" />
    </>
  ),
  haze: (
    <>
      <circle cx="12" cy="12" r="5" />
      <path d="M4 9h3M17 9h3M3 12h4M17 12h4M4 15h3M17 15h3" />
    </>
  ),
  tilt: (
    <>
      <ellipse cx="12" cy="12" rx="4" ry="7.5" transform="rotate(-55 12 12)" />
      <path d="M5 19l14-14" />
    </>
  ),
  comet: (
    <>
      <circle cx="16.5" cy="7.5" r="2.4" />
      <path d="M14.2 9.2 4 19M13 11.2 6.5 19M15.5 10.5 9 19" />
    </>
  ),
  supernova: (
    <>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M6 18l2.5-2.5" />
      <circle cx="12" cy="12" r="2.4" />
    </>
  ),
  merge: (
    <>
      <circle cx="8" cy="12" r="3.2" />
      <circle cx="16" cy="12" r="3.2" />
      <path d="M11 12h2" />
    </>
  ),
  blackhole: (
    <>
      <circle cx="12" cy="12" r="3" />
      <ellipse cx="12" cy="12" rx="9" ry="3.4" />
      <path d="M5.5 12c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5" />
    </>
  ),
  shadow: (
    <>
      <circle cx="9" cy="12" r="5" />
      <path d="M12.5 7.2a5.5 5.5 0 0 1 0 9.6" />
    </>
  ),
}

export type IconName = keyof typeof ICONS

export function Icon({ name }: { name: IconName }) {
  return (
    <svg
      className="ui-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ICONS[name]}
    </svg>
  )
}
