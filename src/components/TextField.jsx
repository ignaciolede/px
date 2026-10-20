import { useRef } from 'react'
import { cx, omit } from './utils'

let fid = 0

/* El label siempre visible arriba; el error reemplaza al hint. */
export default function TextField(props) {
  const { label, hint, error, className, id: idProp } = props
  const idRef = useRef(null)
  if (!idRef.current) idRef.current = idProp || 'px-f' + ++fid
  const id = idRef.current
  const ayuda = error || hint
  const rest = omit(props, ['label', 'hint', 'error', 'className', 'id'])
  return (
    <div className={cx('px-field', error && 'px-field--error', className)}>
      <label className="px-field__label" htmlFor={id}>
        {label}
      </label>
      <input
        {...rest}
        id={id}
        className="px-field__input"
        aria-invalid={!!error}
        aria-describedby={ayuda ? id + '-h' : undefined}
      />
      {ayuda && (
        <span id={id + '-h'} className="px-field__hint">
          {ayuda}
        </span>
      )}
    </div>
  )
}
