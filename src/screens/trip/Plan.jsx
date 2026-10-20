import { useState } from 'react'
import { AvatarStack, Button, Chip, ItineraryItem, PollOption } from '../../components'
import { DIA_3, ITINERARIO_DIAS } from '../../data/demo'
import './Plan.css'

const CHIPS = [
  { id: 'decidir', label: 'Decidir' },
  { id: 'itinerario', label: 'Itinerario' },
  { id: 'mapa', label: 'Mapa' },
]

/* Mapa ilustrado del recorrido del día (SVG propio, sin API de mapas). */
function MapaDelRecorrido() {
  const paradas = [
    [90, 160],
    [240, 250],
    [420, 230],
    [360, 350],
    [150, 330],
  ]
  return (
    <svg viewBox="0 0 520 600" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Recorrido del día con cinco paradas">
      <rect width="520" height="600" style={{ fill: 'var(--papel-hundido)' }} />
      <path d="M-20 420 C 100 360, 200 460, 320 410 S 480 330, 540 380 L 540 620 L -20 620 Z" style={{ fill: 'var(--cielo-tinte)' }} />
      <path d="M320 40 C 420 20, 500 90, 510 170 C 450 200, 370 190, 340 140 Z" style={{ fill: 'var(--lima-tinte)' }} />
      <path d="M-20 270 L 540 220" style={{ fill: 'none', stroke: 'var(--papel-elevado)', strokeWidth: 18, strokeLinecap: 'round' }} />
      <path d="M210 -20 L 260 420" style={{ fill: 'none', stroke: 'var(--papel-elevado)', strokeWidth: 12, strokeLinecap: 'round' }} />
      <path
        d="M90 160 C 150 180, 180 250, 240 250 S 360 200, 420 230 S 440 320, 360 350 S 200 340, 150 330"
        style={{ fill: 'none', stroke: 'var(--mandarina)', strokeWidth: 7, strokeLinecap: 'round', strokeDasharray: '0.1 16' }}
      />
      {paradas.map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="16" style={{ fill: 'var(--lima)', stroke: 'var(--tinta)', strokeWidth: 3 }} />
          <text x={cx} y={cy + 5} textAnchor="middle" style={{ font: '800 14px var(--font-texto)', fill: 'var(--sobre-color)' }}>
            {i + 1}
          </text>
        </g>
      ))}
    </svg>
  )
}

/* P6/P7 · Plan — Decidir e Itinerario (docs/05 filas 6-7, docs/06).
   La vista "Mapa" sola no está diseñada (docs/06, Parcial): va un placeholder. */
export default function Plan({ votacion, votoActual, onVote, otrasVotaciones }) {
  const [vista, setVista] = useState('decidir')
  const [diaIdx, setDiaIdx] = useState(DIA_3.indiceDia)
  const [conflictoResuelto, setConflictoResuelto] = useState(false)

  const diaActual = ITINERARIO_DIAS[diaIdx]
  const esHoy = diaIdx === DIA_3.indiceDia

  return (
    <div className="plan">
      <div className="plan__cabecera">
        <div className="plan__titulo-fila">
          <h1 className="plan__titulo px-display">Plan</h1>
          <div className="plan__chips">
            {CHIPS.map((c) => (
              <Chip
                key={c.id}
                selected={vista === c.id}
                tone="previaje"
                onClick={() => setVista(c.id)}
              >
                {c.id === 'decidir' ? 'Decidir · ' + (otrasVotaciones.abiertas.length + 1) + ' abiertas' : c.label}
              </Chip>
            ))}
          </div>
        </div>
        <span className="plan__meta-desk px-cuerpo">Bariloche · previaje</span>
        <div className="plan__acciones-desk">
          <Button variant="fantasma" icon="calendar">
            Sincronizar calendario
          </Button>
          <Button icon="plus">{vista === 'itinerario' ? 'Agregar plan' : 'Nueva votación'}</Button>
        </div>
      </div>

      {vista === 'decidir' && (
        <div className="plan__decidir-cols">
          <div className="plan__decidir-col-izq">
            <div>
              <p className="plan__lista-titulo px-sobretitulo">Abiertas</p>
              <div className="plan__lista">
                <div className="plan__item">
                  <div>
                    <p className="plan__item-titulo">{votacion.pregunta}</p>
                    <p className="plan__item-detalle px-meta">
                      {votacion.opciones.length} opciones · {votacion.opciones.reduce((n, o) => n + o.votos.length, 0) + (votoActual ? 1 : 0)} de{' '}
                      {votacion.total} votaron · cierra {votacion.cierra.replace('viernes', 'vie')}
                    </p>
                  </div>
                </div>
                {otrasVotaciones.abiertas.map((v) => (
                  <div key={v.titulo} className="plan__item">
                    <div>
                      <p className="plan__item-titulo">{v.titulo}</p>
                      <p className="plan__item-detalle px-meta">{v.detalle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="plan__lista-titulo px-sobretitulo">Decididas</p>
              <div className="plan__lista">
                {otrasVotaciones.decididas.map((v) => (
                  <div key={v.titulo} className="plan__item plan__item--decidida">
                    <div>
                      <p className="plan__item-titulo">{v.titulo}</p>
                      <p className="plan__item-detalle plan__item-detalle--ok px-meta">{v.detalle}</p>
                    </div>
                    <span aria-hidden="true">✓</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="plan__decidir-col-der">
            <div className="plan__votacion">
              <div className="plan__votacion-hero">
                <p className="plan__votacion-meta">
                  Propuso Fede · cierra el {votacion.cierra}
                </p>
                <h2 className="plan__votacion-titulo">{votacion.pregunta}</h2>
                <div className="plan__votacion-progreso">
                  {Array.from({ length: votacion.total }).map((_, i) => (
                    <span key={i} className={'plan__dot' + (i < votacion.mayoria ? ' plan__dot--on' : '')} />
                  ))}
                  <span className="px-cuerpo">Con {votacion.mayoria} votos pasa al plan.</span>
                </div>
              </div>
              <div className="plan__votacion-body">
                {votacion.opciones.map((o) => (
                  <PollOptionRow key={o.id} opcion={o} votacion={votacion} votoActual={votoActual} onVote={onVote} />
                ))}
                <div className="plan__votacion-pie">
                  <span className="plan__votacion-faltan px-meta">
                    <AvatarStack people={votoActual ? ['Santi'] : votacion.faltanVotar} max={3} />
                    {votoActual ? 'Falta Santi' : 'Faltan vos y Santi'}
                  </span>
                  <div className="plan__votacion-acciones">
                    <Button variant="fantasma" icon="plus" size="sm">
                      Proponer otra
                    </Button>
                    <Button variant="secundario" size="sm">
                      Cerrar antes
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {vista === 'itinerario' && (
        <>
          <div className="plan__dias">
            {ITINERARIO_DIAS.map((d, i) => (
              <button
                key={d.fecha}
                type="button"
                className={'plan__dia' + (i === diaIdx ? ' plan__dia--on' : i === DIA_3.indiceDia ? ' plan__dia--hoy' : '')}
                onClick={() => setDiaIdx(i)}
              >
                <span className="plan__dia-nombre px-meta">{d.fecha.slice(0, 3)}</span>
                <span className="plan__dia-num px-nums">{d.fecha.slice(4)}</span>
                <span className="plan__dia-label">{d.label}</span>
              </button>
            ))}
          </div>

          <div className="plan__itinerario-cols">
            <div className="plan__itinerario-col-izq">
              <div className="plan__dia-cabecera">
                <p className="px-sobretitulo">
                  Día {diaIdx + 1} · {diaActual.label}
                </p>
                <h2 className="plan__dia-titulo px-display">{esHoy ? DIA_3.titulo : diaActual.label}</h2>
              </div>

              {esHoy && !conflictoResuelto && (
                <div className="plan__conflicto">
                  <span className="plan__conflicto-texto px-cuerpo">
                    <b>Se pisan dos planes:</b> {DIA_3.conflicto.texto.replace('Se pisan dos planes: ', '')}
                  </span>
                  <Button variant="secundario" size="sm" onClick={() => setConflictoResuelto(true)}>
                    {DIA_3.conflicto.accion}
                  </Button>
                </div>
              )}

              {esHoy ? (
                <div>
                  {DIA_3.items.map((it) => (
                    <ItineraryItem
                      key={it.id}
                      time={conflictoResuelto && it.id === 'otto' ? '17:00' : it.time}
                      title={it.title}
                      place={it.place}
                      done={it.done}
                      current={it.current}
                      last={it.last}
                    />
                  ))}
                </div>
              ) : (
                <p className="plan__lista-titulo px-cuerpo">Sin planes cargados todavía para este día.</p>
              )}
            </div>

            <div className="plan__itinerario-col-der">
              <MapaDelRecorrido />
              <div className="plan__mapa-flotante">
                <span className="px-cuerpo">
                  <b>38 km en el día.</b> Ordenando por cercanía ahorrás 9.
                </span>
                <Button variant="secundario" size="sm" icon="route">
                  Ordenar ruta
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      {vista === 'mapa' && (
        <p className="plan__mapa-placeholder px-cuerpo-lg">
          El mapa general del viaje todavía no está diseñado. Mientras tanto, el recorrido de cada día vive en Itinerario.
        </p>
      )}
    </div>
  )
}

function PollOptionRow({ opcion, votacion, votoActual, onVote }) {
  const votosBase = opcion.votos.length
  const votos = votosBase + (votoActual === opcion.id ? 1 : 0)
  const detalle = opcion.votos.length
    ? opcion.detalle + ' · votaron ' + opcion.votos.join(', ')
    : opcion.detalle
  return (
    <PollOption
      label={opcion.label}
      detail={detalle}
      votes={votos}
      total={votacion.total}
      voted={votoActual === opcion.id}
      onVote={() => onVote(opcion.id)}
    />
  )
}
