import { Button, ItineraryItem, StageSwitch } from '../../components'
import { money } from '../../components/utils'
import { DIA_3 } from '../../data/demo'
import './Hoy.css'

/* P4 · Hoy — Resumen durante la etapa Viaje (docs/05 fila 4, docs/06).
   El mapa es una ilustración SVG propia (nada de API de mapas externa).
   Mobile y desktop usan composiciones distintas, así que son dos SVG
   (no el mismo recortado) para no distorsionar el dibujo. */
function MapaDelDiaMobile() {
  return (
    <svg viewBox="0 0 390 480" role="img" aria-label="Mapa del día: ya pasaste por la cabaña, ahora estás en el Cerro Catedral y a la noche cenan en el centro">
      <rect width="390" height="480" style={{ fill: 'var(--papel-hundido)' }} />
      <path d="M-10 300 C 60 250, 120 330, 200 300 S 330 230, 400 270 L 400 480 L -10 480 Z" style={{ fill: 'var(--cielo-tinte)' }} />
      <path d="M240 40 C 300 20, 360 60, 380 120 C 340 150, 280 140, 250 110 Z" style={{ fill: 'var(--lima-tinte)' }} />
      <path d="M20 120 C 50 90, 110 100, 120 150 C 90 180, 40 170, 20 120 Z" style={{ fill: 'var(--lima-tinte)' }} />
      <path d="M-10 210 L 400 170" style={{ fill: 'none', stroke: 'var(--papel-elevado)', strokeWidth: 14, strokeLinecap: 'round' }} />
      <path d="M150 -10 L 190 300" style={{ fill: 'none', stroke: 'var(--papel-elevado)', strokeWidth: 10, strokeLinecap: 'round' }} />
      <path d="M300 -10 C 290 80, 320 140, 300 260" style={{ fill: 'none', stroke: 'var(--papel-elevado)', strokeWidth: 8, strokeLinecap: 'round' }} />
      <path
        d="M70 140 C 120 160, 150 200, 170 196 S 260 150, 300 180 S 320 250, 250 280"
        style={{ fill: 'none', stroke: 'var(--mandarina)', strokeWidth: 6, strokeLinecap: 'round', strokeDasharray: '0.1 14' }}
      />
      <circle cx="70" cy="140" r="12" style={{ fill: 'var(--tinta)' }} />
      <path d="M64 140 l4 4 l8 -8" style={{ fill: 'none', stroke: 'var(--papel)', strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round' }} />
      <circle cx="300" cy="180" r="30" style={{ fill: 'var(--mandarina)', opacity: 0.25 }} />
      <circle cx="300" cy="180" r="16" style={{ fill: 'var(--mandarina)', stroke: 'var(--papel)', strokeWidth: 4 }} />
      <circle cx="250" cy="280" r="11" style={{ fill: 'var(--papel)', stroke: 'var(--tinta)', strokeWidth: 4 }} />
      <circle cx="330" cy="210" r="15" style={{ fill: 'var(--lima)', stroke: 'var(--papel)', strokeWidth: 3 }} />
      <text x="330" y="215" textAnchor="middle" style={{ font: '700 11px var(--font-texto)', fill: 'var(--sobre-color)' }}>F</text>
      <circle cx="276" cy="150" r="15" style={{ fill: 'var(--cielo)', stroke: 'var(--papel)', strokeWidth: 3 }} />
      <text x="276" y="155" textAnchor="middle" style={{ font: '700 11px var(--font-texto)', fill: 'var(--sobre-color)' }}>S</text>
      <text x="40" y="350" style={{ font: '600 13px var(--font-texto)', fill: 'var(--tinta-suave)' }}>Lago Nahuel Huapi</text>
    </svg>
  )
}

function MapaDelDiaDesktop() {
  return (
    <svg viewBox="0 0 700 1000" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Mapa: la cabaña ya pasó, ahora el Cerro Catedral, a la noche cena en el centro">
      <rect width="700" height="1000" style={{ fill: 'var(--papel-hundido)' }} />
      <path d="M-20 640 C 120 560, 240 700, 380 640 S 600 520, 720 580 L 720 1020 L -20 1020 Z" style={{ fill: 'var(--cielo-tinte)' }} />
      <path d="M420 80 C 540 40, 660 120, 690 230 C 610 280, 500 260, 450 200 Z" style={{ fill: 'var(--lima-tinte)' }} />
      <path d="M40 240 C 100 180, 210 200, 230 290 C 170 350, 80 330, 40 240 Z" style={{ fill: 'var(--lima-tinte)' }} />
      <path d="M-20 430 L 720 350" style={{ fill: 'none', stroke: 'var(--papel-elevado)', strokeWidth: 22, strokeLinecap: 'round' }} />
      <path d="M280 -20 L 350 620" style={{ fill: 'none', stroke: 'var(--papel-elevado)', strokeWidth: 16, strokeLinecap: 'round' }} />
      <path d="M560 -20 C 540 160, 600 280, 560 540" style={{ fill: 'none', stroke: 'var(--papel-elevado)', strokeWidth: 12, strokeLinecap: 'round' }} />
      <path
        d="M130 290 C 220 320, 270 400, 320 395 S 480 300, 560 360 S 600 500, 470 560"
        style={{ fill: 'none', stroke: 'var(--mandarina)', strokeWidth: 8, strokeLinecap: 'round', strokeDasharray: '0.1 18' }}
      />
      <circle cx="130" cy="290" r="16" style={{ fill: 'var(--tinta)' }} />
      <path d="M122 290 l5 5 l11 -11" style={{ fill: 'none', stroke: 'var(--papel)', strokeWidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round' }} />
      <circle cx="560" cy="360" r="44" style={{ fill: 'var(--mandarina)', opacity: 0.22 }} />
      <circle cx="560" cy="360" r="22" style={{ fill: 'var(--mandarina)', stroke: 'var(--papel)', strokeWidth: 5 }} />
      <circle cx="470" cy="560" r="15" style={{ fill: 'var(--papel)', stroke: 'var(--tinta)', strokeWidth: 5 }} />
      <circle cx="610" cy="410" r="19" style={{ fill: 'var(--lima)', stroke: 'var(--papel)', strokeWidth: 4 }} />
      <text x="610" y="415" textAnchor="middle" style={{ font: '700 13px var(--font-texto)', fill: 'var(--sobre-color)' }}>F</text>
      <circle cx="520" cy="300" r="19" style={{ fill: 'var(--cielo)', stroke: 'var(--papel)', strokeWidth: 4 }} />
      <text x="520" y="305" textAnchor="middle" style={{ font: '700 13px var(--font-texto)', fill: 'var(--sobre-color)' }}>S</text>
      <text x="70" y="760" style={{ font: '600 16px var(--font-texto)', fill: 'var(--tinta-suave)' }}>Lago Nahuel Huapi</text>
    </svg>
  )
}

export default function Hoy({ stage, onStageChange, onAgregarGasto }) {
  const dia = DIA_3
  const abreviado = dia.items.filter((it) => it.current || it.last)

  return (
    <div className="hoy">
      <div className="hoy__mapa">
        <div className="hoy__mapa-svg hoy__mapa-svg--mobile">
          <MapaDelDiaMobile />
        </div>
        <div className="hoy__mapa-svg hoy__mapa-svg--desk">
          <MapaDelDiaDesktop />
        </div>
        <span className="hoy__pildora">
          <span className="hoy__pildora-tag">Viaje</span>
          Bariloche · día 3
        </span>
        <span className="hoy__pildora-grupo">
          <span className="hoy__pildora-dot" aria-hidden="true" />
          3 del grupo compartiendo ubicación
        </span>
        <div className="hoy__ordenar">
          <Button variant="secundario" icon="route">
            Ordenar ruta por cercanía
          </Button>
        </div>
      </div>

      <div className="hoy__hoja">
        <span className="hoy__asa" aria-hidden="true" />

        <div className="hoy__stage">
          <StageSwitch value={stage} onChange={onStageChange} />
        </div>

        <div className="hoy__cabecera-mobile">
          <h1 className="px-display">Hoy</h1>
          <span className="hoy__meta px-meta">Sáb 16 · 2 de 4 planes</span>
        </div>
        <div className="hoy__cabecera-desk">
          <p className="px-sobretitulo">Sábado 16 · día 3</p>
          <h1 className="hoy__titulo-dia px-display">{dia.titulo}</h1>
        </div>

        <div className="hoy__itinerario hoy__itinerario--abreviado">
          {abreviado.map((it) => (
            <ItineraryItem key={it.id} time={it.time} title={it.title} place={it.placeHoy || it.place} current={it.current} last={it.last} />
          ))}
        </div>
        <div className="hoy__itinerario hoy__itinerario--completo">
          {dia.items.map((it) => (
            <ItineraryItem key={it.id} time={it.time} title={it.title} place={it.placeHoy || it.place} done={it.done} current={it.current} last={it.last} />
          ))}
        </div>

        <div className="hoy__stats">
          <div className="hoy__stat hoy__stat--gasto">
            <span className="hoy__stat-label">Gastos de hoy</span>
            <span className="hoy__stat-monto px-nums">{money(dia.gastosDeHoy)}</span>
            <span className="px-meta">3 gastos · tu parte $ 10.700</span>
          </div>
          <div className="hoy__stat hoy__stat--voucher">
            <span className="hoy__stat-label">Voucher de hoy</span>
            <b className="px-cuerpo-fuerte">{dia.voucher}</b>
            <a href="#voucher">Abrir</a>
          </div>
        </div>

        <div className="hoy__botones hoy__botones--mobile">
          <Button variant="secundario" size="sm" icon="route">
            Ruta
          </Button>
          <Button variant="secundario" size="sm" icon="baul">
            Voucher
          </Button>
          <Button size="sm" icon="plus" onClick={onAgregarGasto}>
            Gasto
          </Button>
        </div>

        <div className="hoy__botones hoy__botones--desk">
          <Button icon="plus" full onClick={onAgregarGasto}>
            Agregar gasto
          </Button>
        </div>
      </div>
    </div>
  )
}
