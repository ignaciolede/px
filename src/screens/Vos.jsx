import { Chip } from '../components'
import { COLORES_TONO, VOS } from '../data/demo'
import './Vos.css'

/* P13 · Vos (docs/05 fila 13, docs/06). "Elegir color cambia tu avatar en
   toda la demo": userColor vive en App.jsx y se pasa a quien lo necesite. */
export default function Vos({ userColor, onChangeColor }) {
  return (
    <div className="vos px-in">
      <div className="vos__topfila">
        <div className={'vos__hero px-tone-' + userColor + '-tinte'}>
          <span className={'vos__hero-avatar px-tone-' + userColor}>N</span>
          <div>
            <p className="vos__hero-nombre">{VOS.nombre}</p>
            <p className="vos__hero-detalle px-cuerpo">
              Salís de {VOS.salida} · pagás en {VOS.moneda}
            </p>
          </div>
        </div>

        <div className="vos__stats px-stagger">
          <div className="vos__stat vos__stat--tinta">
            <span className="vos__stat-num px-nums">{VOS.stats.viajes}</span>
            <span>viajes con PX</span>
          </div>
          <div className="vos__stat vos__stat--mandarina">
            <span className="vos__stat-num px-nums">{VOS.stats.lugares}</span>
            <span>lugares visitados</span>
          </div>
          <div className="vos__stat vos__stat--cielo">
            <span className="vos__stat-num px-nums">{VOS.stats.provincias}</span>
            <span>provincias</span>
          </div>
          <div className="vos__stat">
            <span className="px-sobretitulo">Último</span>
            <span className="px-titulo-2">{VOS.stats.ultimo}</span>
          </div>
        </div>
      </div>

      <div className="vos__cols px-stagger">
        <section className="vos__card">
          <p className="vos__card-titulo">Cómo viajás</p>
          <p className="px-meta">Lo usamos para sugerir opciones cuando el grupo propone.</p>
          <div className="px-row">
            {VOS.preferencias.map((p) => (
              <Chip key={p} selected icon="check">
                {p}
              </Chip>
            ))}
            <Chip icon="plus">Comida y alergias</Chip>
          </div>
        </section>

        <section className="vos__card">
          <p className="vos__card-titulo">Documentos</p>
          {VOS.documentos.map((d) => (
            <div key={d.nombre} className="vos__fila">
              <span className="px-cuerpo-fuerte">{d.nombre}</span>
              {d.ok ? <span style={{ color: 'var(--positivo)' }}>{d.estado}</span> : <Chip selected tone="neutro">{d.estado}</Chip>}
            </div>
          ))}
          <a href="#agregar-documento">Agregar documento</a>
        </section>

        <section className="vos__card">
          <p className="vos__card-titulo">Tu color</p>
          <p className="px-meta">Así te reconocen en los avatares y el mapa.</p>
          <div className="vos__colores">
            {COLORES_TONO.map((tono) => (
              <button
                key={tono}
                type="button"
                className={'vos__color-btn px-tone-' + tono + (userColor === tono ? ' vos__color-btn--on' : '')}
                aria-pressed={userColor === tono}
                aria-label={'Elegir color ' + tono}
                onClick={() => onChangeColor(tono)}
              />
            ))}
          </div>
        </section>
      </div>

      <div className="vos__cols px-stagger">
        <section className="vos__card">
          <p className="vos__card-titulo">Salida y moneda</p>
          <p className="px-cuerpo">
            {VOS.aeropuertos} · Pesos argentinos
          </p>
          <a href="#cambiar-salida">Cambiar</a>
        </section>

        <section className="vos__card">
          <p className="vos__card-titulo">Privacidad</p>
          <p className="px-cuerpo">Ubicación en vivo: te preguntamos en cada viaje. Tu historial lo ve solo tu grupo.</p>
          <a href="#ajustar-privacidad">Ajustar</a>
        </section>

        <section className="vos__card">
          <p className="vos__card-titulo">Cuenta</p>
          <p className="px-cuerpo">Entrás con Google · nacho@[tu-mail]</p>
          <a href="#borrar-cuenta" style={{ color: 'var(--negativo)' }}>
            Borrar mi cuenta
          </a>
        </section>
      </div>
    </div>
  )
}
