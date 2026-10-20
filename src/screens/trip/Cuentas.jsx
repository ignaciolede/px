import { useEffect, useState } from 'react'
import { Button, Icon } from '../../components'
import { money } from '../../components/utils'
import { GASTOS_CUENTAS } from '../../data/demo'
import AgregarGasto from './AgregarGasto'
import './Cuentas.css'

/* P8 · Cuentas (docs/05 fila 8, docs/06). "Agregar gasto" vive acá: panel al
   lado de la lista en desktop, pantalla completa en mobile (AgregarGasto.jsx).
   El botón Gasto de Hoy llega con abrirGastoAlEntrar=true; se consume una
   sola vez (onConsumirAbrir) para no reabrir el formulario en cada visita. */
export default function Cuentas({ abrirGastoAlEntrar = false, onConsumirAbrir }) {
  const [gastoAbierto, setGastoAbierto] = useState(abrirGastoAlEntrar)
  const g = GASTOS_CUENTAS

  useEffect(() => {
    if (abrirGastoAlEntrar) onConsumirAbrir && onConsumirAbrir()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="cu">
      <div className="cu__col">
        <h1 className="cu__titulo px-display">Cuentas</h1>

        <div className="cu__totales">
          <div className="cu__total cu__total--viaje">
            <p className="cu__total-label">Total del viaje</p>
            <p className="cu__total-monto">{money(g.totalViaje)}</p>
          </div>
          <div className="cu__total cu__total--saldo">
            <p className="cu__total-label px-meta">Tu saldo</p>
            <p className="cu__total-monto cu__total-monto--negativo">{money(g.tuSaldo)}</p>
          </div>
        </div>

        <section>
          <p className="cu__grupo-titulo px-sobretitulo">Hoy</p>
          <div className="cu__lista">
            {g.hoy.map((it) => (
              <Fila key={it.id} it={it} />
            ))}
          </div>
        </section>

        <section>
          <p className="cu__grupo-titulo px-sobretitulo">Ayer</p>
          <div className="cu__lista">
            {g.ayer.map((it) => (
              <Fila key={it.id} it={it} />
            ))}
          </div>
        </section>

        {!gastoAbierto && (
          <Button icon="plus" onClick={() => setGastoAbierto(true)} full className="cu__agregar-inline">
            Agregar gasto
          </Button>
        )}
      </div>

      {!gastoAbierto && (
        <button
          type="button"
          className="cu__flotante px-btn px-btn--primario px-btn--md"
          onClick={() => setGastoAbierto(true)}
          aria-label="Agregar gasto"
        >
          <Icon name="plus" />
          <span>Gasto</span>
        </button>
      )}

      {gastoAbierto && (
        <div className="cu__gasto-wrap">
          <AgregarGasto onCancelar={() => setGastoAbierto(false)} onGuardar={() => setGastoAbierto(false)} />
        </div>
      )}
    </div>
  )
}

function Fila({ it }) {
  return (
    <div className="cu__fila">
      <span className="cu__fila-icono">
        <Icon name={it.icono} size={20} />
      </span>
      <div className="cu__fila-texto">
        <p className="cu__fila-titulo">{it.titulo}</p>
        <p className="cu__fila-detalle px-meta">{it.detalle}</p>
      </div>
      <span className="cu__fila-monto">{money(it.monto)}</span>
    </div>
  )
}
