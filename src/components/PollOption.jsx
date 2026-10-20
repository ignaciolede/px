import Icon from './Icon'
import { cx } from './utils'

export default function PollOption({ label, detail, votes, total, voted, onVote, className }) {
  const pct = total ? Math.round((votes / total) * 100) : 0
  return (
    <button
      type="button"
      className={cx('px-poll', voted && 'px-poll--on', className)}
      aria-pressed={!!voted}
      onClick={onVote}
    >
      <span className="px-poll__bar" style={{ width: pct + '%' }} aria-hidden="true" />
      <span className="px-poll__check" aria-hidden="true">
        {voted && <Icon name="check" size={16} />}
      </span>
      <span className="px-poll__text">
        <span className="px-poll__label">{label}</span>
        {detail && <span className="px-poll__detail">{detail}</span>}
      </span>
      <span className="px-poll__count">{votes + (votes === 1 ? ' voto' : ' votos')}</span>
    </button>
  )
}
