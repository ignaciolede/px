import { createElement } from 'react'
import { cx } from './utils'

/* Íconos: trazo 2px, puntas redondas (reemplazo provisorio de Lucide). */
export const PATHS = {
  plus: [['path', { d: 'M12 5v14M5 12h14' }]],
  check: [['path', { d: 'M5 12.5l4.5 4.5L19 7' }]],
  chevron: [['path', { d: 'M9 6l6 6-6 6' }]],
  home: [['path', { d: 'M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z' }]],
  route: [
    ['circle', { cx: 6, cy: 18, r: 2 }],
    ['circle', { cx: 18, cy: 6, r: 2 }],
    ['path', { d: 'M8 18h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7' }],
  ],
  wallet: [
    ['rect', { x: 3, y: 6, width: 18, height: 13, rx: 3 }],
    ['path', { d: 'M3 10h18M16 14.5h2' }],
  ],
  user: [
    ['circle', { cx: 12, cy: 8, r: 4 }],
    ['path', { d: 'M4 20c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5' }],
  ],
  calendar: [
    ['rect', { x: 3, y: 5, width: 18, height: 16, rx: 3 }],
    ['path', { d: 'M3 10h18M8 3v4M16 3v4' }],
  ],
  pin: [
    ['path', { d: 'M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z' }],
    ['circle', { cx: 12, cy: 9.5, r: 2.5 }],
  ],
  baul: [
    ['rect', { x: 3, y: 7, width: 18, height: 13, rx: 3 }],
    ['path', { d: 'M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 12h18' }],
  ],
  vote: [
    ['path', { d: 'M5 12l4 4 10-10' }],
    ['path', { d: 'M4 20h16' }],
  ],
}

export default function Icon({ name, size = 20, label, className }) {
  const parts = PATHS[name] || []
  return (
    <svg
      className={cx('px-icon', className)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={label ? undefined : 'true'}
      role={label ? 'img' : undefined}
      aria-label={label}
    >
      {parts.map(([tag, attrs], i) => createElement(tag, { key: i, ...attrs }))}
    </svg>
  )
}
