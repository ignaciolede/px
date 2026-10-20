import { useState } from 'react'
import { AvatarStack, BalanceRow, Button, Icon, StageSwitch } from '../../components'
import { money } from '../../components/utils'
import './ResumenPost.css'

/* P5 · Resumen Post-viaje (docs/05 fila 5, docs/06).
   "Ya le pagué" marca el saldo con Fede como a-mano (docs/05, interacciones). */
export default function ResumenPost({ stage, onStageChange, people, resumen, pagado, onYaLePague, onVerGastos, onBack }) {
  const saldos = resumen.saldos.map((s) => (s.nombre === resumen.saldo.con && pagado ? { ...s, amount: 0 } : s))
  const saldoPropio = pagado ? 0 : resumen.saldo.monto

  return (
    <div className="px-in">
      <header className="rpost__hero">
        <button type="button" className="rpost__volver" onClick={onBack}>
          <Icon name="chevron" size={18} className="rpost__volver-icon" />
          Bariloche con los chicos
        </button>

        <div className="rpost__hero-top-desk">
          <StageSwitch value={stage} onChange={onStageChange} />
          <AvatarStack people={people} max={6} />
        </div>

        <p className="rpost__sobretitulo px-sobretitulo">{resumen.volvieronHace}</p>
        <h1 className="rpost__titulo px-display">
          {saldoPropio === 0 ? 'Quedaste a mano' : 'Te falta poner'}
        </h1>
        {saldoPropio !== 0 && <p className="rpost__monto-grande">{money(saldoPropio)}</p>}
        <p className="px-cuerpo-lg">
          {saldoPropio === 0 ? 'Ya no le debés nada a nadie.' : 'para quedar a mano con ' + resumen.saldo.con + '.'}
        </p>

        <div className="rpost__stage">
          <StageSwitch value={stage} onChange={onStageChange} />
        </div>
      </header>

      <div className="rpost__body">
        <div className="rpost__principal">
          <div className="rpost__saldo-card">
            <span className="rpost__saldo-card-label">Tu saldo</span>
            {saldoPropio === 0 ? (
              <span className="rpost__saldo-card-nota">Quedaste a mano con todos.</span>
            ) : (
              <>
                <span className="rpost__saldo-card-monto px-nums">{money(saldoPropio)}</span>
                <span className="rpost__saldo-card-nota">para quedar a mano con {resumen.saldo.con}.</span>
              </>
            )}
            <div className="rpost__acciones">
              <Button>Copiar alias de {resumen.saldo.con}</Button>
              <Button variant="secundario" onClick={onYaLePague} disabled={pagado}>
                {pagado ? 'Ya le pagaste' : 'Ya le pagué'}
              </Button>
            </div>
          </div>

          <div>
            <div className="rpost__cuentas-cabecera">
              <h2 className="rpost__numeros-titulo">Así quedan las cuentas</h2>
              <a href="#gastos" onClick={onVerGastos}>Ver gastos</a>
            </div>
            <p className="rpost__banner px-cuerpo">
              <Icon name="route" size={20} />
              Simplificamos: <b>{resumen.simplificado}</b>.
            </p>
            <div className="rpost__saldos px-stagger" style={{ marginTop: 'var(--espacio-3)' }}>
              {saldos.map((s) => (
                <BalanceRow key={s.nombre} name={s.nombre} amount={s.amount} />
              ))}
            </div>
          </div>
        </div>

        <section>
          <h2 className="rpost__numeros-titulo">El viaje en números</h2>
          <div className="rpost__numeros px-stagger">
            <div className="rpost__numero rpost__numero--tinta">
              <span className="rpost__numero-label">Gastaron entre todos</span>
              <span className="rpost__numero-valor px-nums">{money(resumen.numeros.gastaronEntreTodos)}</span>
              <span className="rpost__numero-nota">
                {money(resumen.numeros.porPersona)} por persona · lo que más pesó: {resumen.numeros.quePeso}
              </span>
            </div>
            <div className="rpost__numero rpost__numero--lima">
              <span className="rpost__numero-valor px-nums">{resumen.numeros.lugares}</span>
              <span className="rpost__numero-nota">lugares visitados</span>
            </div>
            <div className="rpost__numero rpost__numero--mandarina">
              <span className="rpost__numero-valor px-nums">{resumen.numeros.gastosCargados}</span>
              <span className="rpost__numero-nota">gastos cargados</span>
            </div>
            <div className="rpost__numero rpost__numero--papel">
              <span className="rpost__numero-label">El más organizado</span>
              <span className="px-titulo-2">{resumen.numeros.masOrganizado.nombre}</span>
              <span className="rpost__numero-nota px-meta">{resumen.numeros.masOrganizado.detalle}</span>
            </div>
          </div>
        </section>

        <section className="rpost__repetir">
          <h2 className="rpost__repetir-titulo">¿Repetimos?</h2>
          <p className="px-cuerpo">Arrancá un viaje nuevo en Previaje con lo que elijas.</p>
          <div className="rpost__repetir-botones">
            <Button variant="secundario">Mismo grupo, otro destino</Button>
            <Button variant="secundario">Mismo destino, otra fecha</Button>
          </div>
        </section>
      </div>
    </div>
  )
}
