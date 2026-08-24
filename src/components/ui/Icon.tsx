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
