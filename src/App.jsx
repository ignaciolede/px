import { useState } from 'react'
import './App.css'
import HomeLayout from './layout/HomeLayout'
import TripLayout from './layout/TripLayout'
import { Button } from './components'
import Componentes from './screens/Componentes'
import Ingreso from './screens/Ingreso'
import MisViajes from './screens/MisViajes'
import Vos from './screens/Vos'
import CrearViaje from './screens/CrearViaje'
import Unirse from './screens/Unirse'
import ResumenPreviaje from './screens/trip/ResumenPreviaje'
import Hoy from './screens/trip/Hoy'
import ResumenPost from './screens/trip/ResumenPost'
import Plan from './screens/trip/Plan'
import Cuentas from './screens/trip/Cuentas'
import Baul from './screens/trip/Baul'
import Grupo from './screens/trip/Grupo'
import {
  NOMBRES_GRUPO,
  OTRAS_VOTACIONES,
  POST_VIAJE,
  PREVIAJE,
  VOS,
  VOTACION_ALOJAMIENTO,
} from './data/demo'

/* App — navegación de la demo (docs/06, mapa del producto).
   Estado simple en este archivo: ruta actual, pestaña dentro de ella,
   etapa del viaje y los pocos datos que varias pantallas comparten
   (el voto del alojamiento, si ya le pagaste a Fede, tu color). */
export default function App() {
  const [route, setRoute] = useState('ingreso') // ingreso | home | trip
  const [homeTab, setHomeTab] = useState('viajes') // viajes | vos | crear | unirse
  const [tripSection, setTripSection] = useState('resumen') // resumen | plan | cuentas | baul | grupo
  const [stage, setStage] = useState('previaje') // previaje | viaje | post
  const [userColor, setUserColor] = useState(VOS.colorTono)
  const [votoActual, setVotoActual] = useState(null)
  const [pagado, setPagado] = useState(false)
  const [gastoPendiente, setGastoPendiente] = useState(false)
  const [verCatalogo, setVerCatalogo] = useState(false)

  function irAHome(tab = 'viajes') {
    setRoute('home')
    setHomeTab(tab)
  }

  function abrirBariloche(etapaInicial = 'previaje') {
    setStage(etapaInicial)
    setTripSection('resumen')
    setRoute('trip')
  }

  function irASeccion(section) {
    setTripSection(section)
  }

  function votar(id) {
    setVotoActual((actual) => (actual === id ? null : id))
  }

  function agregarGastoDesdeHoy() {
    setGastoPendiente(true)
    setTripSection('cuentas')
  }

  const devToggle = (
    <button type="button" className="dev-switch" onClick={() => setVerCatalogo((v) => !v)}>
      {verCatalogo ? 'Volver a la demo' : 'Catálogo'}
    </button>
  )

  if (verCatalogo) {
    return (
      <>
        {devToggle}
        <Componentes />
      </>
    )
  }

  // ---- Ingreso (P1): sin backend, cualquier botón entra a Mis viajes ----
  if (route === 'ingreso') {
    return (
      <>
        {devToggle}
        <Ingreso onEntrar={() => irAHome('viajes')} onIngresarCodigo={() => irAHome('unirse')} />
      </>
    )
  }

  // ---- Fuera de un viaje: Mis viajes · Vos · Crear viaje · Unirse ----
  if (route === 'home') {
    const esSheet = homeTab === 'crear' || homeTab === 'unirse'
    return (
      <>
        {devToggle}
      <HomeLayout
        active={homeTab === 'crear' || homeTab === 'unirse' ? 'viajes' : homeTab}
        onNavigate={(id) => setHomeTab(id)}
        hideMobileNav={esSheet}
        sidebarExtra={
          homeTab === 'viajes' ? (
            <>
              <Button icon="plus" full onClick={() => setHomeTab('crear')}>
                Crear viaje
              </Button>
              <Button variant="secundario" full onClick={() => setHomeTab('unirse')}>
                Unirme con código
              </Button>
            </>
          ) : null
        }
        sidebarFooter={homeTab === 'vos' ? <button type="button" onClick={() => setRoute('ingreso')}>Cerrar sesión</button> : null}
      >
        {homeTab === 'viajes' && (
          <MisViajes
            userColor={userColor}
            onOpenBariloche={() => abrirBariloche('previaje')}
            onCreateTrip={() => setHomeTab('crear')}
            onJoinTrip={() => setHomeTab('unirse')}
            onOpenVos={() => setHomeTab('vos')}
          />
        )}
        {homeTab === 'vos' && <Vos userColor={userColor} onChangeColor={setUserColor} />}
        {homeTab === 'crear' && <CrearViaje onCancelar={() => setHomeTab('viajes')} onCrear={() => setHomeTab('viajes')} />}
        {homeTab === 'unirse' && <Unirse onCerrar={() => setHomeTab('viajes')} onSumarme={() => abrirBariloche('previaje')} />}
      </HomeLayout>
      </>
    )
  }

  // ---- Dentro del viaje: Resumen (3 etapas) · Plan · Cuentas · Baúl · Grupo ----
  const esHoy = tripSection === 'resumen' && stage === 'viaje'
  const badges = { plan: OTRAS_VOTACIONES.abiertas.length + 1, baul: PREVIAJE.checklist.total - PREVIAJE.checklist.hechos }

  return (
    <>
      {devToggle}
      <TripLayout
      trip={{ title: 'Bariloche con los chicos', swatchTone: stage, summary: resumenSidebar(stage) }}
      active={tripSection === 'grupo' ? undefined : tripSection}
      stage={stage}
      badges={badges}
      people={NOMBRES_GRUPO}
      emergencias={esHoy}
      hideMobileNav={tripSection === 'grupo'}
      onNavigate={irASeccion}
      onBack={() => irAHome('viajes')}
      onOpenGroup={() => irASeccion('grupo')}
      onEmergencias={() => irASeccion('baul')}
    >
      {tripSection === 'resumen' && stage === 'previaje' && (
        <ResumenPreviaje
          stage={stage}
          onStageChange={setStage}
          people={NOMBRES_GRUPO}
          diasParaSalir={PREVIAJE.diasParaSalir}
          salida={PREVIAJE.salida}
          pendientes={PREVIAJE.pendientes}
          checklist={PREVIAJE.checklist}
          presupuesto={PREVIAJE.presupuestoEstimado}
          requisitos={PREVIAJE.requisitos}
          votacion={VOTACION_ALOJAMIENTO}
          votoActual={votoActual}
          onVote={votar}
          onBack={() => irAHome('viajes')}
          onOpenGroup={() => irASeccion('grupo')}
        />
      )}
      {esHoy && <Hoy stage={stage} onStageChange={setStage} onAgregarGasto={agregarGastoDesdeHoy} />}
      {tripSection === 'resumen' && stage === 'post' && (
        <ResumenPost
          stage={stage}
          onStageChange={setStage}
          people={NOMBRES_GRUPO}
          resumen={POST_VIAJE}
          pagado={pagado}
          onYaLePague={() => setPagado(true)}
          onVerGastos={() => irASeccion('cuentas')}
          onBack={() => irAHome('viajes')}
        />
      )}

      {tripSection === 'plan' && <Plan votacion={VOTACION_ALOJAMIENTO} votoActual={votoActual} onVote={votar} otrasVotaciones={OTRAS_VOTACIONES} />}

      {tripSection === 'cuentas' && <Cuentas abrirGastoAlEntrar={gastoPendiente} onConsumirAbrir={() => setGastoPendiente(false)} />}

      {tripSection === 'baul' && <Baul />}

      {tripSection === 'grupo' && <Grupo onBack={() => irASeccion('resumen')} />}
      </TripLayout>
    </>
  )
}

function resumenSidebar(stage) {
  if (stage === 'viaje') return 'Día 3 de 8'
  if (stage === 'post') return 'Volvieron hace 2 días'
  return 'Faltan ' + PREVIAJE.diasParaSalir + ' días'
}
