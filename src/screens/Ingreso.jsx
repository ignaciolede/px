import { Button, TextField } from '../components'
import './Ingreso.css'

/* P1 · Ingreso (docs/05 fila 1, docs/06). Sin backend real: "Cualquier botón
   entra a Mis viajes" (docs/05, interacciones de la demo). Los SVG son los de
   referencia/canvas-html/P1-Ingreso-*.dc.html, copiados tal cual. */
function ArteMobile() {
  return (
    <svg viewBox="0 0 390 400" aria-hidden="true">
      <rect x="-24" y="-32" width="250" height="232" rx="32" style={{ fill: 'var(--mandarina)' }} />
      <rect x="244" y="36" width="180" height="148" rx="32" style={{ fill: 'var(--lima)' }} />
      <rect x="-24" y="216" width="186" height="168" rx="32" style={{ fill: 'var(--papel-hundido)' }} />
      <rect x="178" y="200" width="120" height="184" rx="32" style={{ fill: 'var(--cielo)' }} />
      <circle cx="350" cy="292" r="52" style={{ fill: 'var(--tinta)' }} />
      <path
        d="M70 120 C 130 120, 150 50, 210 70 S 300 120, 318 100 S 300 250, 236 300"
        style={{ fill: 'none', stroke: 'var(--tinta)', strokeWidth: 6, strokeLinecap: 'round', strokeDasharray: '0.1 16' }}
      />
      <circle cx="70" cy="120" r="11" style={{ fill: 'var(--papel)', stroke: 'var(--tinta)', strokeWidth: 4 }} />
      <circle cx="318" cy="100" r="11" style={{ fill: 'var(--papel)', stroke: 'var(--tinta)', strokeWidth: 4 }} />
      <circle cx="236" cy="300" r="11" style={{ fill: 'var(--papel)', stroke: 'var(--tinta)', strokeWidth: 4 }} />
    </svg>
  )
}

function ArteDesktop() {
  return (
    <svg viewBox="0 0 760 520" aria-hidden="true">
      <rect x="0" y="0" width="360" height="300" rx="40" style={{ fill: 'var(--mandarina)' }} />
      <rect x="384" y="56" width="376" height="200" rx="40" style={{ fill: 'var(--lima)' }} />
      <rect x="0" y="324" width="250" height="196" rx="40" style={{ fill: '#2b3732' }} />
      <rect x="274" y="324" width="200" height="196" rx="40" style={{ fill: 'var(--cielo)' }} />
      <circle cx="610" cy="410" r="96" style={{ fill: 'var(--papel)' }} />
      <path
        d="M90 150 C 180 150, 220 50, 320 90 S 470 190, 540 150 S 600 120, 640 160 S 560 300, 380 420"
        style={{ fill: 'none', stroke: 'var(--tinta)', strokeWidth: 8, strokeLinecap: 'round', strokeDasharray: '0.1 22' }}
      />
      <circle cx="90" cy="150" r="14" style={{ fill: 'var(--papel)', stroke: 'var(--tinta)', strokeWidth: 5 }} />
      <circle cx="540" cy="150" r="14" style={{ fill: 'var(--papel)', stroke: 'var(--tinta)', strokeWidth: 5 }} />
      <circle cx="380" cy="420" r="14" style={{ fill: 'var(--papel)', stroke: 'var(--tinta)', strokeWidth: 5 }} />
    </svg>
  )
}

export default function Ingreso({ onEntrar, onIngresarCodigo }) {
  return (
    <div className="ing px-in">
      <div className="ing__lado">
        <p className="ing__lado-marca">
          PX<span className="ing__marca-punto">.</span>
        </p>
        <div className="ing__arte">
          <ArteDesktop />
        </div>
        <h2 className="ing__lado-frase">Organizar el viaje también es parte del viaje.</h2>
      </div>

      <div className="ing__mobile-wrap">
        <div className="ing__arte">
          <ArteMobile />
        </div>
        <div className="ing__texto">
          <h1 className="ing__marca">
            PX<span className="ing__marca-punto">.</span>
          </h1>
          <p className="ing__bajada">Todo el viaje del grupo, en un solo lugar.</p>
        </div>
        <div className="ing__acciones ing__acciones--mobile">
          <Button full onClick={onEntrar}>
            Seguir con Google
          </Button>
          <Button variant="secundario" full onClick={onEntrar}>
            Seguir con Apple
          </Button>
          <Button variant="fantasma" full onClick={onEntrar}>
            Entrar con mi mail
          </Button>
          <p className="ing__codigo">
            ¿Te invitaron?{' '}
            <a href="#codigo" onClick={(e) => { e.preventDefault(); onIngresarCodigo && onIngresarCodigo() }}>
              Ingresá el código
            </a>
          </p>
        </div>
      </div>

      <div className="ing__form-wrap">
        <div className="ing__form">
          <div>
            <h1 className="ing__form-titulo">Hola. ¿Arrancamos?</h1>
            <p className="ing__form-bajada px-cuerpo-lg">
              Entrá en dos toques y armá el viaje con tu grupo: planes, votaciones, gastos y papeles, todo junto.
            </p>
          </div>
          <div className="ing__botones">
            <Button full onClick={onEntrar}>
              Seguir con Google
            </Button>
            <Button variant="secundario" full onClick={onEntrar}>
              Seguir con Apple
            </Button>
          </div>
          <div className="ing__separador">
            <span className="ing__separador-linea" />o con tu mail
            <span className="ing__separador-linea" />
          </div>
          <div className="ing__mail">
            <TextField label="Mail" type="email" placeholder="vos@mail.com" />
            <Button variant="fantasma" full iconRight="chevron" onClick={onEntrar}>
              Mandame un link para entrar
            </Button>
          </div>
          <div className="ing__invitacion">
            <p className="px-cuerpo-fuerte">¿Te invitaron a un viaje?</p>
            <p className="px-cuerpo">
              Abrí el link que te pasaron o{' '}
              <a
                href="#codigo"
                onClick={(e) => {
                  e.preventDefault()
                  onIngresarCodigo && onIngresarCodigo()
                }}
              >
                ingresá el código
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
