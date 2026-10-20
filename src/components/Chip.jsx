import Icon from './Icon'
import { cx, omit } from './utils'

export default function Chip(props) {
  const { tone = 'neutro', selected, icon, className, children } = props
  const rest = omit(props, ['tone', 'selected', 'icon', 'className', 'children'])
  return (
    <button
      type="button"
      aria-pressed={!!selected}
      {...rest}
      className={cx('px-chip', selected && 'px-chip--on', selected && 'px-tone-' + tone, className)}
    >
      {selected ? <Icon name="check" size={16} /> : icon ? <Icon name={icon} size={16} /> : null}
      <span>{children}</span>
    </button>
  )
}
