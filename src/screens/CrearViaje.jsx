import { useState } from 'react'
import { Button, Chip, TextField } from '../components'
import './CrearViaje.css'

/* P10 · Crear viaje (docs/05 fila 10, docs/06). Vive dentro de Mis viajes
   (HomeLayout): en mobile es una hoja con "Cancelar" arriba, en desktop se
   embebe junto al sidebar y la vista previa reemplaza al "Cancelar" de arriba. */
export default function CrearViaje({ onCancelar, onCrear }) {
  const [destino, setDestino] = useState('Bariloche')
  const [sinDestino, setSinDestino] = useState(false)
  const [nombre, setNombre] = useState('Bariloche con los chicos')
  const [conQuien, setConQuien] = useState('grupo')
  const [sinFechas, setSinFechas] = useState(false)

  const destinoMostrado = sinDestino ? 'Tu próximo viaje' : destino || 'Tu próximo viaje'

  return (
    <div className="cv-layout">
      <div className="cv">
        <button type="button" className="cv__cancelar" onClick={onCancelar}>
          Cancelar
        </button>

        <div>
          <p className="cv__sobretitulo px-sobretitulo">Nuevo viaje</p>
          <h1 className="px-display">¿A dónde se van?</h1>
          <p className="cv__bajada px-cuerpo-lg">Si todavía no lo saben, no pasa nada: lo deciden entre todos adentro.</p>
        </div>

        <div className="cv__campo">
          <label className="cv__label" htmlFor="cv-destino">
            Destino
          </label>
          <input
            id="cv-destino"
            className="cv__input"
            value={destino}
            onChange={(e) => {
              setDestino(e.target.value)
              setSinDestino(false)
            }}
            placeholder="¿A dónde van?"
          />
          <Chip
            selected={sinDestino}
            onClick={() => {
              setSinDestino((v) => !v)
              if (!sinDestino) setDestino('')
            }}
          >
            Todavía no sabemos
          </Chip>
        </div>

        <div className="cv__campo">
          <span className="cv__label">¿Cuándo?</span>
          <div className="cv__fechas">
            <div className="cv__fecha">
              <span className="cv__fecha-label px-meta">Ida</span>
              <span className="cv__fecha-valor">jue 14 ene</span>
            </div>
            <div className="cv__fecha">
              <span className="cv__fecha-label px-meta">Vuelta</span>
              <span className="cv__fecha-valor">jue 21 ene</span>
            </div>
          </div>
          <Chip selected={sinFechas} onClick={() => setSinFechas((v) => !v)}>
            Lo votamos después
          </Chip>
        </div>

        <TextField label="Nombre del viaje" hint="Así lo va a ver todo el grupo" value={nombre} onChange={(e) => setNombre(e.target.value)} />

        <div className="cv__campo">
          <span className="cv__label">¿Con quién?</span>
          <div className="cv__con-quien">
            <Chip selected={conQuien === 'grupo'} tone="previaje" onClick={() => setConQuien('grupo')}>
              En grupo
            </Chip>
            <Chip selected={conQuien === 'solo'} onClick={() => setConQuien('solo')}>
              Solo
            </Chip>
          </div>
        </div>

        <div className="cv__pie">
          <Button full iconRight="chevron" onClick={onCrear}>
            Crear e invitar al grupo
          </Button>
          <button type="button" className="cv__pie-cancelar" onClick={onCancelar}>
            Cancelar
          </button>
        </div>
      </div>

      <div className="cv__preview">
        <p className="cv__preview-label px-sobretitulo">Así lo va a ver el grupo</p>
        <div className="cv__preview-card">
          <span className="px-badge px-tone-previaje" style={{ alignSelf: 'flex-start' }}>
            Previaje
          </span>
          <p className="cv__preview-titulo">{destinoMostrado}</p>
          <p className="px-cuerpo-fuerte">
            {nombre || 'Tu próximo viaje'} · {sinFechas ? 'fechas sin definir' : '14–21 ene'}
          </p>
        </div>
        <p className="cv__preview-nota px-meta">El viaje arranca en Previaje y pasa solo a Viaje el día de la salida.</p>
      </div>
    </div>
  )
}
