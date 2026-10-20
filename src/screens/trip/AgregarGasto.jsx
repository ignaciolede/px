import { useMemo, useState } from 'react'
import { Button, Chip } from '../../components'
import { money } from '../../components/utils'
import { GASTO_EJEMPLO, NOMBRES_GRUPO, YO } from '../../data/demo'
import './AgregarGasto.css'

const PROPINAS = [0, 10, 15]

function iniciales(nombre) {
  return nombre
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

/* P8 · Agregar gasto (docs/05 fila 8, Flujo-3-Gasto.png).
   Mismo componente para el sheet de mobile y el panel de desktop; el
   contenedor (overlay a sangre o panel al lado de la lista) lo decide
   src/screens/trip/Cuentas.jsx. */
export default function AgregarGasto({ onCancelar, onGuardar }) {
  const g = GASTO_EJEMPLO
  const [modo, setModo] = useState('consumo') // 'iguales' | 'consumo'
  const [propina, setPropina] = useState(10)
  const [consumo, setConsumo] = useState(() => {
    const inicial = {}
    g.items.forEach((it) => {
      inicial[it.id] = new Set(it.entre)
    })
    return inicial
  })

  function toggle(itemId, nombre) {
    setConsumo((prev) => {
      const set = new Set(prev[itemId])
      if (set.has(nombre)) set.delete(nombre)
      else set.add(nombre)
      return { ...prev, [itemId]: set }
    })
  }

  const total = Math.round(g.subtotal * (1 + propina / 100))

  const porPersona = useMemo(() => {
    if (modo === 'iguales') {
      const cuota = Math.round(total / NOMBRES_GRUPO.length)
      return Object.fromEntries(NOMBRES_GRUPO.map((n) => [n, cuota]))
    }
    const base = Object.fromEntries(NOMBRES_GRUPO.map((n) => [n, 0]))
    g.items.forEach((it) => {
      const participan = [...consumo[it.id]]
      if (!participan.length) return
      const share = it.monto / participan.length
      participan.forEach((n) => (base[n] += share))
    })
    const factor = 1 + propina / 100
    return Object.fromEntries(Object.entries(base).map(([n, v]) => [n, Math.round(v * factor)]))
  }, [modo, consumo, propina, total])

  return (
    <div className="ag">
      <div className="ag__top">
        <button type="button" className="ag__cancelar" onClick={onCancelar}>
          Cancelar
        </button>
        <span className="ag__top-titulo">Nuevo gasto</span>
        <span aria-hidden="true" style={{ width: 60 }} />
      </div>

      <div className="ag__hero">
        <span className="ag__hero-tag">✓ Leímos el ticket</span>
        <div className="ag__ticket">
          <p className="ag__ticket-comercio">{g.comercio.toUpperCase()}</p>
          <p className="ag__ticket-fecha">
            {g.fecha} · {g.hora}
          </p>
          <div className="ag__ticket-items">
            {g.items.map((it) => (
              <span key={it.id} className="ag__ticket-fila">
                <span>{it.nombre}</span>
                <span>{it.monto.toLocaleString('es-AR')}</span>
              </span>
            ))}
            <span className="ag__ticket-fila ag__ticket-total">
              <span>TOTAL</span>
              <span>{g.subtotal.toLocaleString('es-AR')}</span>
            </span>
          </div>
        </div>
        <div className="ag__hero-texto">
          <p className="ag__monto px-monto">{money(total)}</p>
          <p className="ag__monto-detalle px-cuerpo">
            {money(g.subtotal)} + {propina}% de propina · {g.comercio}
          </p>
        </div>
      </div>

      <div className="ag__card">
        <section>
          <p className="ag__bloque-titulo">¿Cómo se divide?</p>
          <div className="ag__chips" style={{ marginTop: 'var(--espacio-2)' }}>
            <Chip selected={modo === 'iguales'} onClick={() => setModo('iguales')}>
              Partes iguales
            </Chip>
            <Chip selected={modo === 'consumo'} onClick={() => setModo('consumo')}>
              Por consumo
            </Chip>
          </div>
        </section>

        <section>
          <p className="ag__bloque-titulo">Propina</p>
          <div className="ag__chips" style={{ marginTop: 'var(--espacio-2)' }}>
            {PROPINAS.map((p) => (
              <Chip key={p} selected={propina === p} onClick={() => setPropina(p)}>
                {p === 0 ? 'Sin' : p + '%'}
              </Chip>
            ))}
            <Chip selected={!PROPINAS.includes(propina)} onClick={() => setPropina(20)}>
              Otro
            </Chip>
          </div>
        </section>

        {modo === 'consumo' ? (
          <section>
            <p className="ag__bloque-titulo">Tocá las caras para decir quién comió qué.</p>
            <div className="ag__items" style={{ marginTop: 'var(--espacio-2)' }}>
              {g.items.map((it) => (
                <div key={it.id} className="ag__item">
                  <div className="ag__item-cabecera">
                    <b>{it.nombre}</b>
                    <span className="ag__monto">{money(it.monto)}</span>
                  </div>
                  <p className="ag__item-detalle px-meta">entre {consumo[it.id].size || 0}</p>
                  <div className="ag__item-avatares">
                    {NOMBRES_GRUPO.map((n) => (
                      <button
                        key={n}
                        type="button"
                        className={'px-avatar px-avatar--previaje ag__avatar-toggle' + (consumo[it.id].has(n) ? ' ag__avatar-toggle--on' : '')}
                        onClick={() => toggle(it.id, n)}
                        aria-pressed={consumo[it.id].has(n)}
                        aria-label={(consumo[it.id].has(n) ? 'Sacar a ' : 'Sumar a ') + n}
                      >
                        {iniciales(n)}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <p className="ag__nota px-cuerpo">
            Lo pagaste vos · entre {NOMBRES_GRUPO.length} · {money(Math.round(total / NOMBRES_GRUPO.length))} cada uno
          </p>
        )}

        <div className="ag__resumen">
          {NOMBRES_GRUPO.map((n) => (
            <span key={n} className="ag__resumen-persona">
              {n === YO ? 'Vos' : n} {money(porPersona[n] || 0)}
            </span>
          ))}
        </div>

        <div className="ag__pie">
          <button type="button" className="ag__pie-cancelar" onClick={onCancelar}>
            Cancelar
          </button>
          <Button icon="check" onClick={() => onGuardar && onGuardar()}>
            Guardar gasto
          </Button>
        </div>
      </div>
    </div>
  )
}
