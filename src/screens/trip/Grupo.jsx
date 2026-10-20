import { useState } from 'react'
import { AvatarStack, Button, Icon } from '../../components'
import { GRUPO, VIAJE } from '../../data/demo'
import './Grupo.css'

/* P12 · Grupo (docs/05 fila 12, docs/06). Se abre desde los avatares del
   encabezado de Resumen (mobile) o la tarjeta Grupo del sidebar (desktop);
   no es una quinta sección de la nav. */
export default function Grupo({ onBack }) {
  const [verTodos, setVerTodos] = useState(false)
  const [copiado, setCopiado] = useState(false)
  const mostrados = verTodos ? GRUPO : GRUPO.slice(0, 4)

  function copiarLink() {
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  const Codigo = (
    <div className="gr__codigo">
      <p className="gr__codigo-label">Código del viaje</p>
      <p className="gr__codigo-num px-nums">{VIAJE.codigo}</p>
      <div className="gr__codigo-acciones">
        <button type="button" className="gr__codigo-btn gr__codigo-btn--primario" onClick={copiarLink}>
          {copiado ? 'Copiado' : 'Copiar link'}
        </button>
        <button type="button" className="gr__codigo-btn">
          Mostrar QR
        </button>
        <button type="button" className="gr__codigo-btn">
          Mandar por mail
        </button>
      </div>
    </div>
  )

  const Movimientos = (
    <div className="gr__movimientos">
      <p className="gr__movimientos-titulo px-sobretitulo">Últimos movimientos</p>
      <p className="gr__movimiento px-cuerpo">
        <b>Pedro</b> votó la cabaña · hace 1 h
      </p>
      <p className="gr__movimiento px-cuerpo">
        <b>Fede</b> te asignó comprar los vuelos · ayer
      </p>
      <p className="gr__movimiento px-cuerpo">
        <b>Pedro</b> subió la póliza del seguro · ayer
      </p>
    </div>
  )

  return (
    <div className="gr px-in">
      <button type="button" className="gr__volver" onClick={onBack}>
        <Icon name="chevron" size={18} className="gr__volver-icon" />
        {VIAJE.titulo}
      </button>

      <div className="gr__cabecera">
        <h1 className="px-display">
          El grupo <span className="gr__num">· {GRUPO.length}</span>
        </h1>
        <Button icon="plus" className="gr__invitar-desk">
          Invitar
        </Button>
      </div>

      <div className="gr__cols">
        <div className="gr__bloque-codigo">{Codigo}</div>

        <div className="gr__bloque-miembros">
          <div className="gr__miembros px-stagger">
            {mostrados.map((p) => (
              <div key={p.nombre} className="gr__miembro">
                <AvatarStack people={[p.nombre]} max={1} />
                <div className="gr__miembro-texto">
                  <p className="gr__miembro-nombre">{p.nombre === 'Nacho' ? 'Vos' : p.nombre}</p>
                  <p className="gr__miembro-detalle px-meta">{p.detalle}</p>
                </div>
                <span className={'gr__rol' + (p.esOrganizador ? ' gr__rol--organizador' : '')}>{p.rol}</span>
              </div>
            ))}
          </div>
          {!verTodos && GRUPO.length > 4 && (
            <a
              className="gr__vermas"
              href="#ver-todos"
              onClick={(e) => {
                e.preventDefault()
                setVerTodos(true)
              }}
            >
              Ver los {GRUPO.length}
            </a>
          )}
        </div>

        <div className="gr__bloque-mov">
          {Movimientos}
          <button type="button" className="gr__salir">
            Salir del grupo
          </button>
        </div>
      </div>
    </div>
  )
}
