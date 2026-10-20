import AvatarStack from './AvatarStack'
import Icon from './Icon'
import { cx } from './utils'

function money(n) {
  return '$ ' + Math.abs(n).toLocaleString('es-AR')
}

/* Nadie "debe": a alguien le falta poner y a otro le tienen que devolver. */
export default function BalanceRow({ name, amount, direction, className }) {
  const dir = direction || (amount > 0 ? 'a-favor' : amount < 0 ? 'pendiente' : 'a-mano')
  const phrase =
    dir === 'a-favor'
      ? name + ' te tiene que devolver'
      : dir === 'pendiente'
        ? 'Te falta poner con ' + name
        : 'Están a mano con ' + name
  const sign = dir === 'a-favor' ? '+ ' : dir === 'pendiente' ? '− ' : ''
  return (
    <div className={cx('px-balance', className)}>
      <AvatarStack people={[name]} max={1} />
      <span className="px-balance__text">{phrase}</span>
      <span className={'px-balance__amount px-balance__amount--' + dir}>
        {dir === 'a-mano' ? <Icon name="check" size={18} label="a mano" /> : sign + money(amount)}
      </span>
    </div>
  )
}
