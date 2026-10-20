import { cx } from './utils'

function initials(n) {
  return n
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

/* Los colores rotan; no significan nada, solo ayudan a distinguir. */
const AV_TONES = ['previaje', 'viaje', 'post', 'papel']

export default function AvatarStack({ people = [], max = 4, className }) {
  const shown = people.slice(0, max)
  const extra = people.length - shown.length
  return (
    <div
      className={cx('px-avatars', className)}
      aria-label={people.length + ' personas: ' + people.join(', ')}
    >
      {shown.map((n, i) => (
        <span
          key={n + i}
          className={'px-avatar px-avatar--' + AV_TONES[i % 4]}
          title={n}
          aria-hidden="true"
        >
          {initials(n)}
        </span>
      ))}
      {extra > 0 && (
        <span className="px-avatar px-avatar--mas" aria-hidden="true">
          {'+' + extra}
        </span>
      )}
    </div>
  )
}
