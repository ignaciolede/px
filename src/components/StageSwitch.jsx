import { useState } from 'react'
import { cx } from './utils'

export const STAGES = [
  { id: 'previaje', label: 'Previaje' },
  { id: 'viaje', label: 'Viaje' },
  { id: 'post', label: 'Post-viaje' },
]

export default function StageSwitch({ value, defaultValue = 'previaje', onChange, className }) {
  const [interno, setInterno] = useState(defaultValue)
  const actual = value !== undefined ? value : interno

  function pick(id) {
    if (value === undefined) setInterno(id)
    if (onChange) onChange(id)
  }

  return (
    <div className={cx('px-stage', className)} role="tablist" aria-label="Etapa del viaje">
      {STAGES.map((s) => {
        const on = s.id === actual
        return (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={on}
            className={cx('px-stage__tab', on && 'px-stage__tab--on px-tone-' + s.id)}
            onClick={() => pick(s.id)}
          >
            <span className="px-stage__dot" aria-hidden="true" />
            {s.label}
          </button>
        )
      })}
    </div>
  )
}
