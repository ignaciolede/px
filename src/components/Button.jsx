import Icon from './Icon'
import { cx, omit } from './utils'

/* primario = mandarina (uno por pantalla); secundario = borde; fantasma = sin fondo. */
export default function Button(props) {
  const { variant = 'primario', size = 'md', icon, iconRight, full, className, children } = props
  const rest = omit(props, ['variant', 'size', 'icon', 'iconRight', 'full', 'className', 'children'])
  return (
    <button
      type="button"
      {...rest}
      className={cx('px-btn', 'px-btn--' + variant, 'px-btn--' + size, full && 'px-btn--full', className)}
    >
      {icon && <Icon name={icon} />}
      {children && <span>{children}</span>}
      {iconRight && <Icon name={iconRight} />}
    </button>
  )
}
