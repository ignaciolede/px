import { useState } from 'react'
import {
  AvatarStack,
  BalanceRow,
  BottomNav,
  Button,
  Chip,
  Icon,
  ItineraryItem,
  PATHS,
  PollOption,
  StageSwitch,
  TextField,
  TripCard,
} from '../components'
import './Componentes.css'

/* Catálogo para comparar con design/componentes-referencia.
   Los datos son los de docs/05-pantallas-y-datos.md. */

const GRUPO = ['Nacho', 'Fede', 'Santi', 'Juan Cruz', 'Pedro', 'Tomi']

function Seccion({ nombre, archivo, nota, children }) {
  return (
    <section className="cat__seccion">
      <div className="cat__seccion-head">
        <h2 className="cat__nombre">{nombre}</h2>
        <span className="cat__archivo">{archivo}</span>
      </div>
      <p className="cat__nota px-cuerpo">{nota}</p>
      <div className="cat__muestras">{children}</div>
    </section>
  )
}

function Muestra({ pie, ancho = 'media', hundida, children }) {
  return (
    <div
      className={'cat__muestra cat__muestra--' + ancho + (hundida ? ' cat__muestra--hundida' : '')}
    >
      {children}
      {pie && <p className="cat__pie px-meta">{pie}</p>}
    </div>
  )
}

export default function Componentes() {
  const [tema, setTema] = useState('claro')
  const [etapa, setEtapa] = useState('previaje')
  const [filtro, setFiltro] = useState('decidir')
  const [votada, setVotada] = useState(null)
  const [seccion, setSeccion] = useState('plan')
  const [nombre, setNombre] = useState('Bariloche con los chicos')
  const [monto, setMonto] = useState('0')

  function cambiarTema(t) {
    setTema(t)
    document.documentElement.dataset.theme = t
  }

  return (
    <main className="cat">
      <div className="cat__inner">
        <header className="cat__head">
          <div>
            <p className="cat__marca">
              PX<span className="cat__punto">.</span>
            </p>
            <h1 className="cat__titulo px-display">Componentes</h1>
            <p className="cat__bajada px-cuerpo-lg">
              Los 11 componentes del design system, para comparar con{' '}
              <code>design/componentes-referencia</code>.
            </p>
          </div>
          <div className="cat__tema">
            <span className="cat__tema-label px-etiqueta">Tema</span>
            <Chip selected={tema === 'claro'} onClick={() => cambiarTema('claro')}>
              Claro
            </Chip>
            <Chip selected={tema === 'noche'} onClick={() => cambiarTema('noche')}>
              Noche
            </Chip>
          </div>
        </header>

        <Seccion
          nombre="Button"
          archivo="src/components/Button.jsx"
          nota="Un solo primario por pantalla. El texto es un verbo que dice qué pasa."
        >
          <Muestra pie="variant: primario · secundario · fantasma">
            <div className="cat__fila">
              <Button>Agregar gasto</Button>
              <Button variant="secundario">Ver gastos</Button>
              <Button variant="fantasma">Cancelar</Button>
            </div>
          </Muestra>
          <Muestra pie="size: md (48px) · sm (44px) · icon · iconRight">
            <div className="cat__fila">
              <Button size="sm">Votar ahora</Button>
              <Button icon="plus">Crear viaje</Button>
              <Button variant="secundario" iconRight="chevron">
                Abrir Hoy
              </Button>
            </div>
          </Muestra>
          <Muestra pie="full · disabled">
            <div className="cat__col">
              <Button full icon="plus">
                Crear e invitar al grupo
              </Button>
              <Button variant="secundario" full disabled>
                Cerrar votación
              </Button>
            </div>
          </Muestra>
        </Seccion>

        <Seccion
          nombre="StageSwitch"
          archivo="src/components/StageSwitch.jsx"
          nota="Va arriba del todo en la pantalla de un viaje, dentro del encabezado teñido. La etapa activa toma su color."
        >
          <Muestra pie={'Controlado · etapa actual: ' + etapa} ancho="ancha">
            <div className="cat__fila">
              <StageSwitch value={etapa} onChange={setEtapa} />
            </div>
          </Muestra>
          <Muestra pie="Sin control (defaultValue)" ancho="ancha" hundida>
            <div className="cat__fila">
              <StageSwitch defaultValue="viaje" />
            </div>
          </Muestra>
        </Seccion>

        <Seccion
          nombre="Chip"
          archivo="src/components/Chip.jsx"
          nota="Para filtrar o elegir. Seleccionado se rellena con el color del tone y muestra un check. Usá el tone de la etapa; neutro fuera de un viaje."
        >
          <Muestra pie="Filtros de Plan · tone neutro" ancho="ancha">
            <div className="cat__fila">
              <Chip selected={filtro === 'decidir'} onClick={() => setFiltro('decidir')}>
                Decidir
              </Chip>
              <Chip selected={filtro === 'itinerario'} onClick={() => setFiltro('itinerario')}>
                Itinerario
              </Chip>
              <Chip selected={filtro === 'mapa'} onClick={() => setFiltro('mapa')}>
                Mapa
              </Chip>
            </div>
          </Muestra>
          <Muestra pie="tone: previaje · viaje · post · con icon" ancho="ancha">
            <div className="cat__fila">
              <Chip selected tone="previaje">
                Previaje
              </Chip>
              <Chip selected tone="viaje">
                Viaje
              </Chip>
              <Chip selected tone="post">
                Post-viaje
              </Chip>
              <Chip icon="calendar">Todavía no sabemos</Chip>
            </div>
          </Muestra>
        </Seccion>

        <Seccion
          nombre="TripCard"
          archivo="src/components/TripCard.jsx"
          nota="Un viaje en el inicio. Sin foto, la cabecera usa el tinte de la etapa: nunca un placeholder gris."
        >
          <Muestra pie="Sin foto · con pending">
            <TripCard
              title="Bariloche con los chicos"
              place="Bariloche"
              dates="14–21 ene · faltan 23 días"
              stage="previaje"
              people={GRUPO}
              pending="Te toca votar el alojamiento"
            />
          </Muestra>
          <Muestra pie="stage viaje">
            <TripCard
              title="Mar de las Pampas"
              place="Mar de las Pampas"
              dates="Día 2 de 4 · finde en familia"
              stage="viaje"
              people={['Nacho', 'Cami', 'Juli', 'Tomi']}
            />
          </Muestra>
          <Muestra pie="stage post">
            <TripCard
              title="Córdoba egresados 2024"
              place="Córdoba"
              dates="Pasado · 8 personas"
              stage="post"
              people={GRUPO}
            />
          </Muestra>
        </Seccion>

        <Seccion
          nombre="AvatarStack"
          archivo="src/components/AvatarStack.jsx"
          nota="Quiénes van, con iniciales. Los que no entran se resumen en +N. Los colores rotan y no significan nada."
        >
          <Muestra pie="max 4 (por defecto) · el grupo de 6">
            <div className="cat__fila">
              <AvatarStack people={GRUPO} />
            </div>
          </Muestra>
          <Muestra pie="max 6 · max 3 · max 1">
            <div className="cat__fila">
              <AvatarStack people={GRUPO} max={6} />
              <AvatarStack people={GRUPO} max={3} />
              <AvatarStack people={['Fede']} max={1} />
            </div>
          </Muestra>
        </Seccion>

        <Seccion
          nombre="PollOption"
          archivo="src/components/PollOption.jsx"
          nota="Una opción de la votación ¿Dónde dormimos? La barra lima-tinte muestra el porcentaje; el voto propio se marca con check y borde tinta, no solo con color."
        >
          <Muestra pie="Tocá para votar · total 6 personas" ancho="ancha">
            <div className="cat__col">
              <PollOption
                label="Cabaña Los Coihues"
                detail="$ 38.000 por noche · 4 km del centro · propuso Fede"
                votes={votada === 'coihues' ? 4 : 3}
                total={6}
                voted={votada === 'coihues'}
                onVote={() => setVotada(votada === 'coihues' ? null : 'coihues')}
              />
              <PollOption
                label="Hostel del Lago"
                detail="$ 22.000 por noche · centro"
                votes={votada === 'hostel' ? 2 : 1}
                total={6}
                voted={votada === 'hostel'}
                onVote={() => setVotada(votada === 'hostel' ? null : 'hostel')}
              />
              <PollOption
                label="Depto. en Melipal"
                detail="$ 31.000 por noche"
                votes={votada === 'melipal' ? 1 : 0}
                total={6}
                voted={votada === 'melipal'}
                onVote={() => setVotada(votada === 'melipal' ? null : 'melipal')}
              />
            </div>
          </Muestra>
        </Seccion>

        <Seccion
          nombre="BalanceRow"
          archivo="src/components/BalanceRow.jsx"
          nota="Cómo quedás con alguien, con signo, palabra y color. Primero lo que tenés que poner, después lo que te deben y al final con quién estás a mano."
        >
          <Muestra pie="pendiente · a-favor · a-mano" ancho="ancha" hundida>
            <div className="cat__col">
              <BalanceRow name="Fede" amount={-12400} />
              <BalanceRow name="Tomi" amount={8150} />
              <BalanceRow name="Santi" amount={0} />
              <BalanceRow name="Juan Cruz" amount={0} />
              <BalanceRow name="Pedro" amount={0} />
            </div>
          </Muestra>
        </Seccion>

        <Seccion
          nombre="ItineraryItem"
          archivo="src/components/ItineraryItem.jsx"
          nota="Un momento del día, unido a los demás por la línea de recorrido. Apilados sin gap extra. Un solo current, y solo en la etapa Viaje."
        >
          <Muestra pie="Día 3 · sábado 16 · done, current, pendiente y last" ancho="ancha">
            <div className="cat__col cat__col--junto">
              <ItineraryItem time="08:30" title="Desayuno en la cabaña" done />
              <ItineraryItem
                time="10:00"
                title="Subida al Cerro Catedral"
                place="Base Cerro Catedral"
                current
              />
              <ItineraryItem time="15:30" title="Chocolate en el centro" place="Mitre 450" />
              <ItineraryItem time="16:30" title="Traslado al cerro Otto" />
              <ItineraryItem
                time="20:30"
                title="Cena en El Boliche de Alberto"
                place="Villegas 347 · reserva de Pedro"
                last
              />
            </div>
          </Muestra>
        </Seccion>

        <Seccion
          nombre="TextField"
          archivo="src/components/TextField.jsx"
          nota="Label siempre visible arriba; el error reemplaza al hint y dice qué hacer. Para montos, inputMode numeric."
        >
          <Muestra pie="Con hint">
            <TextField
              label="Nombre del viaje"
              hint="Podés cambiarlo cuando quieras"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Muestra>
          <Muestra pie="Con error · inputMode numeric">
            <TextField
              label="Monto"
              inputMode="numeric"
              error="Poné un monto mayor a 0"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
            />
          </Muestra>
          <Muestra pie="Solo label · con placeholder">
            <TextField label="Mail" type="email" placeholder="nacho@ejemplo.com" />
          </Muestra>
        </Seccion>

        <Seccion
          nombre="BottomNav"
          archivo="src/components/BottomNav.jsx"
          nota="Las cuatro secciones fijas de un viaje. Flota a espacio-4 del borde inferior; desde bp-desktop se reemplaza por una barra lateral. Máximo 4 ítems."
        >
          <Muestra pie={'Controlado · sección actual: ' + seccion} ancho="ancha" hundida>
            <BottomNav active={seccion} onChange={setSeccion} />
          </Muestra>
          <Muestra pie="Fuera del viaje: Mis viajes · Vos" ancho="ancha" hundida>
            <BottomNav
              items={[
                { id: 'viajes', label: 'Mis viajes', icon: 'route' },
                { id: 'vos', label: 'Vos', icon: 'user' },
              ]}
              defaultActive="viajes"
            />
          </Muestra>
        </Seccion>

        <Seccion
          nombre="Icon"
          archivo="src/components/Icon.jsx"
          nota="Trazo de 2px con puntas redondas: reemplazo provisorio de Lucide. Heredan currentColor. 20px en botones y filas, 24px en navegación."
        >
          <Muestra pie="Los 11 nombres de PATHS, a 24px" ancho="ancha">
            <div className="cat__iconos">
              {Object.keys(PATHS).map((name) => (
                <div key={name} className="cat__icono">
                  <Icon name={name} size={24} />
                  <span className="px-meta">{name}</span>
                </div>
              ))}
            </div>
          </Muestra>
        </Seccion>

        <Seccion
          nombre="Escala tipográfica"
          archivo="src/styles/base.css"
          nota="No es un componente: son las clases de la escala de design/tokens.json, para chequear que las dos familias cargaron."
        >
          <Muestra pie="Bricolage Grotesque (display) y Figtree (texto)" ancho="ancha">
            <div className="cat__tipo">
              <div className="cat__tipo-fila">
                <span className="px-meta">display-xl · 48/50</span>
                <span className="px-display-xl">¿A dónde vamos?</span>
              </div>
              <div className="cat__tipo-fila">
                <span className="px-meta">display · 36/40</span>
                <span className="px-display">Hola, Nacho</span>
              </div>
              <div className="cat__tipo-fila">
                <span className="px-meta">titulo-1 · 26/30</span>
                <span className="px-titulo-1">Bariloche con los chicos</span>
              </div>
              <div className="cat__tipo-fila">
                <span className="px-meta">titulo-2 · 20/26</span>
                <span className="px-titulo-2">Día 3 · Cerro Catedral</span>
              </div>
              <div className="cat__tipo-fila">
                <span className="px-meta">monto · 30/34 · tabular-nums</span>
                <span className="px-monto">$ 48.180</span>
              </div>
              <div className="cat__tipo-fila">
                <span className="px-meta">cuerpo-lg · 18/27</span>
                <span className="px-cuerpo-lg">Votá antes del viernes así reservamos.</span>
              </div>
              <div className="cat__tipo-fila">
                <span className="px-meta">cuerpo · 16/24</span>
                <span className="px-cuerpo">Salimos el 14 a las 7:30 desde Aeroparque.</span>
              </div>
              <div className="cat__tipo-fila">
                <span className="px-meta">cuerpo-fuerte · 16/24</span>
                <span className="px-cuerpo-fuerte">Cabaña Los Coihues</span>
              </div>
              <div className="cat__tipo-fila">
                <span className="px-meta">etiqueta · 15/20</span>
                <span className="px-etiqueta">Agregar gasto</span>
              </div>
              <div className="cat__tipo-fila">
                <span className="px-meta">meta · 13/18 · siempre en tinta-suave</span>
                <span className="px-meta">Lo pagó Pedro · hace 2 h</span>
              </div>
              <div className="cat__tipo-fila">
                <span className="px-meta">sobretitulo · 12/16 · mayúsculas</span>
                <span className="px-sobretitulo">Previaje</span>
              </div>
            </div>
          </Muestra>
        </Seccion>
      </div>
    </main>
  )
}
