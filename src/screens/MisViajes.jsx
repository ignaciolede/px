import { Button, Chip, Icon, TripCard } from '../components'
import { OTROS_VIAJES, VOS } from '../data/demo'
import './MisViajes.css'

/* P2 · Mis viajes (docs/05, docs/06 tabla 2).
   Bariloche es el único viaje con pantallas propias: es el único que navega
   de verdad. Mar de las Pampas, Escapada al norte y Córdoba son datos de
   referencia (docs/05, "Otros viajes") sin pantallas detrás, así que quedan
   como vista — no abren nada — para no mostrar el viaje equivocado. */
export default function MisViajes({ userColor = VOS.colorTono, onOpenBariloche, onCreateTrip, onJoinTrip, onOpenVos }) {
  const { enCurso, proximos, pasados } = OTROS_VIAJES

  return (
    <div className="mv">
      <header className="mv__head">
        <div>
          <p className="mv__marca">
            PX<span className="mv__marca-punto">.</span>
          </p>
        </div>
        <div className="mv__filtros">
          <Chip selected>Todos</Chip>
          <Chip>En grupo</Chip>
          <Chip>Solo</Chip>
        </div>
        <button type="button" className={'mv__avatar px-tone-' + userColor} onClick={onOpenVos} aria-label="Ir a Vos">
          N
        </button>
      </header>

      <div className="mv__saludo">
        <h1 className="px-display">Hola, {VOS.nombre}</h1>
        <p className="mv__bajada px-cuerpo-lg">Tenés un viaje en curso y dos por venir.</p>
      </div>

      <div className="mv__encurso-fila">
        <div className="mv__encurso">
          <span className="mv__encurso-badge">
            En curso · día {enCurso.diaActual} de {enCurso.diasTotales}
          </span>
          <p className="mv__encurso-titulo">{enCurso.titulo}</p>
          <div className="mv__encurso-pie">
            <span className="mv__encurso-detalle">
              {enCurso.detalle} · Hoy: {enCurso.hoy}
            </span>
            <span className="mv__encurso-btn">
              Abrir Hoy
              <Icon name="chevron" size={16} />
            </span>
          </div>
        </div>

        <div className="mv__proxima">
          <p className="mv__proxima-label">Próxima salida</p>
          <p className="mv__proxima-num px-nums">23</p>
          <p className="mv__proxima-texto px-cuerpo">días para Bariloche. Falta tu voto en el alojamiento.</p>
        </div>
      </div>

      <section className="mv__seccion">
        <h2 className="mv__seccion-titulo">Próximos</h2>
        <div className="mv__grid">
          {proximos.map((v) =>
            v.id === 'bariloche' ? (
              <TripCard
                key={v.id}
                title={v.titulo}
                place={v.place}
                dates={v.dates}
                stage={v.stage}
                people={v.people}
                pending={v.pending}
                onClick={(e) => {
                  e.preventDefault()
                  onOpenBariloche && onOpenBariloche()
                }}
              />
            ) : (
              <TripCard key={v.id} title={v.titulo} place={v.place} dates={v.dates} stage={v.stage} people={v.people} pending={v.pending} />
            ),
          )}
        </div>
      </section>

      <section className="mv__seccion">
        <h2 className="mv__seccion-titulo">Pasados</h2>
        {pasados.map((p) => (
          <div key={p.titulo} className="mv__pasado">
            <span className="mv__pasado-ini">{p.iniciales}</span>
            <div className="mv__pasado-texto">
              <p className="mv__pasado-titulo">{p.titulo}</p>
              <p className="mv__pasado-detalle px-meta">{p.detalle}</p>
            </div>
            <Button variant="secundario" size="sm">
              Repetir viaje
            </Button>
          </div>
        ))}
      </section>

      <div className="mv__acciones">
        <Button icon="plus" full onClick={onCreateTrip}>
          Crear viaje
        </Button>
        <Button variant="secundario" full onClick={onJoinTrip}>
          Unirme con código
        </Button>
      </div>
    </div>
  )
}
