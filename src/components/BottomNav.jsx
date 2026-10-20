import { useState } from 'react'
import Icon from './Icon'
import { cx } from './utils'

/* Las cuatro secciones fijas de un viaje. No hay quinta. */
export const NAV = [
  { id: 'resumen', label: 'Resumen', icon: 'home' },
  { id: 'plan', label: 'Plan', icon: 'route' },
  { id: 'cuentas', label: 'Cuentas', icon: 'wallet' },
  { id: 'baul', label: 'Baúl', icon: 'baul' },
]

export default function BottomNav({ items = NAV, active, defaultActive, onChange, className }) {
  const [interno, setInterno] = useState(defaultActive || items[0].id)
  const actual = active !== undefined ? active : interno

  return (
    <nav className={cx('px-nav', className)} aria-label="Principal">
      {items.map((it) => {
        const on = it.id === actual
        return (
          <button
            key={it.id}
            type="button"
            className={cx('px-nav__item', on && 'px-nav__item--on')}
            aria-current={on ? 'page' : undefined}
            onClick={() => {
              if (active === undefined) setInterno(it.id)
              if (onChange) onChange(it.id)
            }}
          >
            <Icon name={it.icon} size={22} />
            <span>{it.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
