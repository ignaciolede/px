import AvatarStack from './AvatarStack'
import Icon from './Icon'
import { cx, omit } from './utils'

const STAGE_LABEL = { previaje: 'Previaje', viaje: 'Viaje', post: 'Post-viaje' }

export default function TripCard(props) {
  const { title, place, dates, stage = 'previaje', people, image, pending, className } = props
  const rest = omit(props, [
    'title', 'place', 'dates', 'stage', 'people', 'image', 'pending', 'className',
  ])
  return (
    <a href="#" {...rest} className={cx('px-trip', className)}>
      <div
        className={cx('px-trip__media', image ? 'px-trip__media--foto' : 'px-tone-' + stage + '-tinte')}
        style={image ? { backgroundImage: 'url(' + image + ')' } : undefined}
      >
        <span className={'px-badge px-tone-' + stage}>{STAGE_LABEL[stage]}</span>
        {place && (
          <span className={cx('px-trip__place', image && 'px-trip__place--foto')}>{place}</span>
        )}
      </div>
      <div className="px-trip__body">
        <div className="px-trip__text">
          <h3 className="px-trip__title">{title}</h3>
          <p className="px-trip__dates">
            <Icon name="calendar" size={16} />
            {dates}
          </p>
        </div>
        <AvatarStack people={people || []} max={3} />
      </div>
      {pending && (
        <p className="px-trip__pending">
          <span className="px-trip__pending-dot" aria-hidden="true" />
          {pending}
        </p>
      )}
    </a>
  )
}
