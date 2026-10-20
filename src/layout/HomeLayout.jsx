import Icon from '../components/Icon'
import BottomNav from '../components/BottomNav'
import { cx } from '../components/utils'
import './HomeLayout.css'

/* Fuera de un viaje: Mis viajes (inicio) y Vos (docs/04, "Navegación"). */
const SECCIONES = [
  { id: 'viajes', label: 'Mis viajes', icon: 'route' },
  { id: 'vos', label: 'Vos', icon: 'user' },
]

/**
 * Chrome de navegación fuera de un viaje: sidebar en desktop, BottomNav flotante
 * en mobile. El header de cada pantalla (saludo, avatar, filtros) lo arma la
 * propia pantalla; acá solo vive la navegación entre Mis viajes y Vos.
 *
 * Props:
 * - active: 'viajes' | 'vos'
 * - onNavigate(id)
 * - sidebarExtra: contenido debajo del nav, solo en desktop (p.ej. "Crear viaje" /
 *   "Unirme con código" en Mis viajes; no todas las pantallas lo necesitan).
 * - sidebarFooter: contenido fijo al pie del sidebar, solo en desktop (p.ej.
 *   "Cerrar sesión" en Vos).
 */
export default function HomeLayout({
  active,
  onNavigate,
  sidebarExtra,
  sidebarFooter,
  hideMobileNav = false,
  children,
}) {
  return (
    <div className="home">
      <aside className="home__sidebar">
        <p className="home__marca">
          PX<span className="home__marca-punto">.</span>
        </p>

        <nav className="home__nav" aria-label="Principal">
          {SECCIONES.map((s) => {
            const on = s.id === active
            return (
              <button
                key={s.id}
                type="button"
                className={cx('home__nav-item', on && 'home__nav-item--on')}
                aria-current={on ? 'page' : undefined}
                onClick={() => onNavigate && onNavigate(s.id)}
              >
                <Icon name={s.icon} size={20} />
                {s.label}
              </button>
            )
          })}
        </nav>

        {sidebarExtra && <div className="home__extra">{sidebarExtra}</div>}

        <div className="home__spacer" />

        {sidebarFooter && <div className="home__footer">{sidebarFooter}</div>}
      </aside>

      <main className={cx('home__main', hideMobileNav && 'home__main--sin-nav')}>{children}</main>

      {!hideMobileNav && (
        <div className="home__nav-mobile">
          <BottomNav items={SECCIONES} active={active} onChange={onNavigate} />
        </div>
      )}
    </div>
  )
}
