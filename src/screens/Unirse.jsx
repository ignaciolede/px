import { AvatarStack, Button } from '../components'
import { VIAJE } from '../data/demo'
import './Unirse.css'

/* P11 · Unirse (docs/05 fila 11, docs/06). El código ya viene completo
   (BRC 4K9) para mostrar directo la tarjeta "Encontramos este viaje". */
export default function Unirse({ onCerrar, onSumarme }) {
  const letras = VIAJE.codigo.replace(' ', '').split('')

  return (
    <div className="un-layout">
      <div className="un">
        <button type="button" className="un__cerrar" onClick={onCerrar}>
          Cerrar
        </button>

        <div>
          <h1 className="px-display">Sumate al viaje</h1>
          <p className="un__bajada px-cuerpo-lg">Poné el código que te pasaron, pegá el link o escaneá el QR desde el celu.</p>
        </div>

        <div className="un__codigo" role="group" aria-label="Código de invitación">
          {letras.map((l, i) => (
            <input key={i} className="un__casilla" defaultValue={l} maxLength={1} aria-label={'Letra ' + (i + 1)} readOnly />
          ))}
        </div>

        <Button variant="secundario" full className="un__escanear">
          Escanear QR
        </Button>

        <div className="un__separador">
          <span className="un__separador-linea" />o<span className="un__separador-linea" />
        </div>

        <div className="un__link-campo">
          <label className="un__label" htmlFor="un-link">
            Link de invitación
          </label>
          <input id="un-link" className="un__input" placeholder="Pegalo acá" />
        </div>
      </div>

      <div className="un__encontrado">
        <span className="un__encontrado-label">Encontramos este viaje</span>
        <div className="un__tarjeta">
          <p className="un__tarjeta-por px-cuerpo">Fede te sumó a</p>
          <p className="un__tarjeta-titulo">{VIAJE.titulo}</p>
          <p className="un__tarjeta-meta px-cuerpo">
            <AvatarStack people={VIAJE.grupo.filter((n) => n !== 'Nacho')} max={5} />
            {VIAJE.fechas} · ya van 5
          </p>
        </div>

        <div className="un__acciones">
          <Button onClick={onSumarme}>Sumarme al viaje</Button>
          <button type="button" className="un__no-es-este" onClick={onCerrar}>
            No es este
          </button>
        </div>

        <p className="un__nota px-meta">Vas a ver todo y podés votar. Para borrar cosas hace falta ser organizador.</p>
      </div>
    </div>
  )
}
