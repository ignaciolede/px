import { useRef } from 'react'
import { AvatarStack, Button, Icon, PollOption, StageSwitch } from '../../components'
import { money } from '../../components/utils'
import './ResumenPreviaje.css'

/* P3 · Resumen Previaje (docs/05 fila 3, docs/06). Mobile: una columna,
   Lo que te toca → Votación → Checklist → Presupuesto → Requisitos.
   Desktop (≥bp-desktop): 2 columnas, decidir a la izquierda (2/3) y el
   resumen del grupo a la derecha (1/3), como pide docs/04 "Layout". */
export default function ResumenPreviaje({
  stage,
  onStageChange,
  people,
  diasParaSalir,
  salida,
  pendientes,
  checklist,
  presupuesto,
  requisitos,
  votacion,
  votoActual,
  onVote,
  onBack,
  onOpenGroup,
}) {
  const pollRef = useRef(null)

  function irAVotar() {
    pollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <div>
      <header className="rp__hero">
        <div className="rp__hero-top">
          <button type="button" className="rp__volver" onClick={onBack}>
            <Icon name="chevron" size={18} className="rp__volver-icon" />
            Mis viajes
          </button>
          <button type="button" className="rp__avatares" onClick={onOpenGroup} aria-label="Ver el grupo">
            <AvatarStack people={people} max={5} />
          </button>
        </div>

        <p className="rp__sobretitulo px-sobretitulo">Previaje · {people.length} personas</p>

        <div className="rp__titulo-fila">
          <div>
            <h1 className="rp__titulo px-display">Bariloche con los chicos</h1>
            <p className="rp__fechas px-cuerpo">14–21 ene</p>
          </div>

          <div className="rp__cuenta">
            <span className="rp__cuenta-num px-nums">{diasParaSalir}</span>
            <span className="rp__cuenta-label">días</span>
          </div>

          <div className="rp__cuenta-card">
            <span className="rp__cuenta-card-num px-nums">{diasParaSalir}</span>
            <span className="rp__cuenta-card-texto">
              días para
              <br />
              salir
              <br />
              {salida}
            </span>
          </div>
        </div>

        <div className="rp__stage">
          <StageSwitch value={stage} onChange={onStageChange} />
        </div>
      </header>

      <div className="rp__body">
        <div className="rp__col-principal">
          <section>
            <div className="rp__seccion-head">
              <h2 className="rp__seccion-titulo">Lo que te toca</h2>
              <span className="rp__seccion-meta px-meta">{pendientes.length} cosas</span>
            </div>
            <div className="rp__toca">
              {pendientes.map((p) => (
                <div
                  key={p.titulo}
                  className={
                    'rp__toca-card' +
                    (p.tipo === 'Tarea' ? ' rp__toca-card--tarea' : p.tipo === 'Documento' ? ' rp__toca-card--doc' : '')
                  }
                >
                  <span className="rp__toca-tag">{p.tipo}</span>
                  <p className="rp__toca-titulo">{p.titulo}</p>
                  <p className="rp__toca-detalle px-meta">{p.detalle}</p>
                  {p.titulo === 'Votar el alojamiento' && (
                    <div className="rp__toca-cta">
                      <Button full onClick={irAVotar}>
                        Votar ahora
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section ref={pollRef} className="rp__poll">
            <div className="rp__poll-hero">
              <p className="rp__poll-hero-meta">
                Votación · cierra el {votacion.cierra}
              </p>
              <h3 className="rp__poll-hero-titulo">{votacion.pregunta}</h3>
              <p className="rp__poll-hero-progreso px-cuerpo">
                Con {votacion.mayoria} votos pasa al plan. Faltan votar {votoActual ? 'Santi' : 'vos y Santi'}.
              </p>
            </div>
            <div className="rp__poll-body">
              {votacion.opciones.map((o) => (
                <PollOption
                  key={o.id}
                  label={o.label}
                  detail={o.detalle}
                  votes={o.votos.length + (votoActual === o.id ? 1 : 0)}
                  total={votacion.total}
                  voted={votoActual === o.id}
                  onVote={() => onVote(o.id)}
                />
              ))}
              <div className="rp__poll-pie">
                <span className="rp__poll-faltan px-meta">
                  <AvatarStack people={votacion.faltanVotar.filter((n) => n !== 'Nacho' || !votoActual)} max={3} />
                  {votoActual ? 'Falta Santi' : 'Faltan vos y Santi'}
                </span>
                <div className="rp__poll-acciones">
                  <Button variant="fantasma" icon="plus" size="sm">
                    Proponer otra
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside className="rp__rail">
          <div className="rp__checklist">
            <div className="rp__checklist-cabecera">
              <span className="rp__checklist-num px-nums">
                {checklist.hechos}
                <small>/{checklist.total}</small>
              </span>
            </div>
            <p className="px-cuerpo-fuerte">Checklist del grupo</p>
            <div className="rp__checklist-barra">
              <span style={{ width: Math.round((checklist.hechos / checklist.total) * 100) + '%' }} />
            </div>
            <p className="rp__checklist-falta">Falta: {checklist.falta}.</p>
          </div>

          <div className="rp__card">
            <p className="rp__card-label px-sobretitulo">Presupuesto estimado</p>
            <p className="rp__card-monto px-monto">{money(presupuesto)}</p>
            <p className="rp__card-nota px-meta">por persona, con lo votado hasta ahora</p>
          </div>

          <div className="rp__card">
            <p className="rp__card-label px-sobretitulo">Requisitos</p>
            <div className="rp__requisitos">
              {requisitos.map((r) =>
                r.ok ? (
                  <span key={r.label} className="rp__requisito px-cuerpo rp__requisito--ok">
                    <Icon name="check" size={16} />
                    {r.label}
                  </span>
                ) : (
                  <span key={r.label} className="rp__requisito px-cuerpo rp__requisito--falta">
                    <span className="rp__requisito-marca" aria-hidden="true">!</span>
                    {r.label}
                  </span>
                ),
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
