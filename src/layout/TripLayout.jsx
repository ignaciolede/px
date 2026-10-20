import AvatarStack from '../components/AvatarStack'
import Icon from '../components/Icon'
import BottomNav from '../components/BottomNav'
import { cx } from '../components/utils'
import './TripLayout.css'

/* Las cuatro secciones fijas de un viaje (docs/06, sección 1 y 3.5). */
const SECCIONES = [
  { id: 'resumen', label: 'Resumen', icon: 'home' },
  { id: 'plan', label: 'Plan', icon: 'route' },
  { id: 'cuentas', label: 'Cuentas', icon: 'wallet' },
  { id: 'baul', label: 'Baúl', icon: 'baul' },
]

/**
 * Chrome de navegación dentro de un viaje: sidebar en desktop, BottomNav flotante
 * en mobile. El header de cada pantalla (hero teñido, título simple, mapa a sangre)
 * lo arma la propia pantalla dentro de `children` — acá solo vive la navegación.
 *
 * Grupo no es una quinta sección: se entra por la tarjeta del pie del sidebar
 * (desktop) o por los avatares del encabezado de Resumen (mobile), como dice el mapa.
 * Durante Viaje, ese mismo lugar del pie pasa a ser el botón de Emergencias.
 *
 * Props:
 * - trip: { title, swatchTone ('previaje'|'viaje'|'post'), summary } — summary es
 *   el texto corto ya armado por la pantalla ("Faltan 23 días", "Día 3 de 8"...).
 * - active: 'resumen' | 'plan' | 'cuentas' | 'baul'
 * - stage: 'previaje' | 'viaje' | 'post'
 * - badges: { plan?, baul?, ... } conteos opcionales por sección (solo se ven en desktop)
 * - people: string[] del grupo, para la tarjeta Grupo del pie
 * - emergencias: mostrar el botón fijo (la pantalla lo pide; p.ej. Hoy sí, Baúl no)
 * - onNavigate(id) / onBack() / onOpenGroup() / onEmergencias()
 */
export default function TripLayout({
  trip,
  active,
  stage = 'previaje',
  badges = {},
  people = [],
  emergencias = false,
  backLabel = 'Mis viajes',
  hideMobileNav = false,
  onNavigate,
  onBack,
  onOpenGroup,
  onEmergencias,
  children,
}) {
  const mostrarEmergencias = stage === 'viaje' && emergencias

  return (
    <div className="trip">
      <aside className="trip__sidebar">
        <p className="trip__marca">
          PX<span className="trip__marca-punto">.</span>
        </p>

        <button type="button" className="trip__volver" onClick={onBack}>
          <Icon name="chevron" size={18} className="trip__volver-icon" />
          {backLabel}
        </button>

        {trip && (
          <div className="trip__card">
            <span className={cx('trip__card-color', 'px-tone-' + (trip.swatchTone || stage))} />
            <div>
              <p className="trip__card-titulo">{trip.title}</p>
              {trip.summary && <p className="trip__card-meta">{trip.summary}</p>}
            </div>
          </div>
        )}

        <nav className="trip__nav" aria-label="Secciones del viaje">
          {SECCIONES.map((s) => {
            const on = s.id === active
            const badge = badges[s.id]
            return (
              <button
                key={s.id}
                type="button"
                className={cx('trip__nav-item', on && 'trip__nav-item--on')}
                aria-current={on ? 'page' : undefined}
                onClick={() => onNavigate && onNavigate(s.id)}
              >
                <Icon name={s.icon} size={20} />
                {s.label}
                {badge > 0 && <span className="trip__nav-badge">{badge}</span>}
              </button>
            )
          })}
        </nav>

        <div className="trip__spacer" />

        {mostrarEmergencias ? (
          <button type="button" className="trip__emergencias-desk" onClick={onEmergencias}>
            Emergencias
          </button>
        ) : (
          <button type="button" className="trip__grupo" onClick={onOpenGroup}>
            <AvatarStack people={people} max={5} />
            <span className="trip__grupo-titulo">Grupo</span>
            <span className="trip__grupo-caption">Invitar · roles · movimientos</span>
          </button>
        )}
      </aside>

      <main className={cx('trip__main', hideMobileNav && 'trip__main--sin-nav')}>{children}</main>

      {mostrarEmergencias && (
        <button
          type="button"
          className="trip__emergencias-mobile"
          onClick={onEmergencias}
          aria-label="Emergencias"
        >
          Emergencias
        </button>
      )}

      {!hideMobileNav && (
        <div className="trip__nav-mobile">
          <BottomNav items={SECCIONES} active={active} onChange={onNavigate} />
        </div>
      )}
    </div>
  )
}
