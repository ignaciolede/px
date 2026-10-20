import Icon from './Icon'
import { cx } from './utils'

/* Un momento del día, unido a los demás por la línea de recorrido de la marca. */
export default function ItineraryItem({ time, title, place, done, current, last, className }) {
  return (
    <div
      className={cx(
        'px-iti',
        current && 'px-iti--now',
        done && 'px-iti--done',
        last && 'px-iti--last',
        className,
      )}
    >
      <div className="px-iti__rail" aria-hidden="true">
        <span className="px-iti__dot">{done && <Icon name="check" size={14} />}</span>
      </div>
      <div className="px-iti__card">
        <span className="px-iti__time">
          {time}
          {current && <span className="px-badge px-tone-viaje">Ahora</span>}
        </span>
        <span className="px-iti__title">{title}</span>
        {place && (
          <span className="px-iti__place">
            <Icon name="pin" size={16} />
            {place}
          </span>
        )}
      </div>
    </div>
  )
}
