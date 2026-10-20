/* Datos de ejemplo de la demo (docs/05-pantallas-y-datos.md). Fijos, nada se guarda. */

export const YO = 'Nacho'

export const GRUPO = [
  { nombre: 'Nacho', rol: 'Miembro', detalle: '3 cosas pendientes', esOrganizador: false },
  { nombre: 'Fede', rol: 'Organizador', detalle: 'Armó el viaje · cargó 9 gastos', esOrganizador: true },
  { nombre: 'Santi', rol: 'Miembro', detalle: 'Falta su voto del alojamiento', esOrganizador: false },
  { nombre: 'Juan Cruz', rol: 'Miembro', detalle: 'Al día', esOrganizador: false },
  { nombre: 'Pedro', rol: 'Miembro', detalle: 'Reserva el alojamiento', esOrganizador: false },
  { nombre: 'Tomi', rol: 'Lector', detalle: 'Ve todo y vota, no puede borrar', esOrganizador: false },
]

export const NOMBRES_GRUPO = GRUPO.map((p) => p.nombre)

export const VOS = {
  nombre: 'Nacho',
  colorTono: 'previaje', // lima — docs/05: "Vos: Nacho, color lima"
  salida: 'Buenos Aires',
  aeropuertos: 'Aeroparque y Ezeiza',
  moneda: 'pesos',
  stats: { viajes: 4, lugares: 31, provincias: 3, ultimo: 'Mar de las Pampas' },
  documentos: [
    { nombre: 'DNI', estado: 'Vence en marzo', ok: false },
    { nombre: 'Pasaporte', estado: 'Vigente', ok: true },
  ],
  preferencias: ['Hasta $ 40.000 la noche', 'Ritmo tranqui'],
}

export const COLORES_TONO = ['previaje', 'viaje', 'post', 'papel']

export const VIAJE = {
  titulo: 'Bariloche con los chicos',
  destino: 'Bariloche',
  fechas: '14–21 ene',
  fechasLargas: '14 al 21 de enero',
  dias: 8,
  codigo: 'BRC 4K9',
  grupo: NOMBRES_GRUPO,
}

export const PREVIAJE = {
  diasParaSalir: 23,
  salida: '14 de enero, 7:30',
  pendientes: [
    { tipo: 'Cierra el viernes', titulo: 'Votar el alojamiento', detalle: 'Faltan vos y Santi' },
    { tipo: 'Tarea', titulo: 'Comprar los vuelos', detalle: 'Te lo asignó Fede · antes del 20 dic' },
    { tipo: 'Documento', titulo: 'Tu DNI vence en marzo', detalle: 'Sirve para el viaje, pero ojo después' },
  ],
  checklist: { hechos: 12, total: 20, falta: 'alquilar el auto, comprar los vuelos y 6 cosas más' },
  presupuestoEstimado: 285000,
  requisitos: [
    { label: 'DNI vigente · 6 de 6', ok: true },
    { label: 'Seguro de viaje', ok: true },
    { label: 'Vuelos sin comprar', ok: false },
    { label: 'Estadía en votación', ok: false },
  ],
}

export const VOTACION_ALOJAMIENTO = {
  pregunta: '¿Dónde dormimos?',
  mayoria: 4,
  total: 6,
  cierra: 'viernes 11',
  opciones: [
    { id: 'coihues', label: 'Cabaña Los Coihues', detalle: '$ 38.000 por noche · 4 km del centro · propuso Fede', votos: ['Fede', 'Tomi', 'Pedro'] },
    { id: 'hostel', label: 'Hostel del Lago', detalle: '$ 22.000 por noche · centro', votos: ['Juan Cruz'] },
    { id: 'melipal', label: 'Depto. en Melipal', detalle: '$ 31.000 por noche · propuso Santi', votos: [] },
  ],
  faltanVotar: ['Nacho', 'Santi'],
}

export const OTRAS_VOTACIONES = {
  abiertas: [{ titulo: '¿Alquilamos auto?', detalle: 'Ya votaste · 5 de 6' }],
  decididas: [
    { titulo: 'Destino', detalle: 'Bariloche, 5 de 6' },
    { titulo: 'Fechas', detalle: '14 al 21 de enero' },
  ],
}

export const TAREAS = [
  { id: 'vuelos', titulo: 'Comprar los vuelos', responsable: 'Nacho', detalle: 'Vos · antes del 20 dic', asignoQuien: 'Fede', hecha: false },
  { id: 'alojamiento', titulo: 'Reservar el alojamiento', responsable: 'Pedro', detalle: 'Pedro · cuando cierre la votación', hecha: false },
  { id: 'auto', titulo: 'Alquilar el auto', responsable: 'Tomi', detalle: 'Tomi · depende de la votación', hecha: false },
  { id: 'seguro', titulo: 'Contratar seguro de viaje', responsable: 'Pedro', detalle: 'Pedro lo resolvió', hecha: true },
]

export const CHECKLIST_PERSONAL = [
  { id: 'campera', titulo: 'Campera de abrigo', hecha: false },
  { id: 'cargador', titulo: 'Cargador y batería externa', hecha: false },
]

export const CHECKLIST_GRUPO = [
  { id: 'vuelos', titulo: 'Comprar los vuelos', detalle: 'Vos · antes del 20 dic', quien: 'Nacho', hecha: false },
  { id: 'auto', titulo: 'Alquilar el auto', detalle: 'Tomi · depende de la votación', quien: 'Tomi', hecha: false },
  { id: 'mate', titulo: 'Llevar mate y termo', detalle: 'Santi lo resolvió', quien: 'Santi', hecha: true },
]

export const DOCUMENTOS_VIAJE = [
  { tipo: 'PASAJE', titulo: 'Ida · 14 ene', tono: 'viaje' },
  { tipo: 'PASAJE', titulo: 'Vuelta · 21 ene', tono: 'post' },
  { tipo: 'PÓLIZA', titulo: 'Seguro de viaje', tono: 'neutro' },
]

export const ITINERARIO_DIAS = [
  { fecha: 'jue 14', label: 'Llegada' },
  { fecha: 'vie 15', label: 'Circuito chico' },
  { fecha: 'sáb 16', label: 'Montaña' },
  { fecha: 'dom 17', label: 'Lago' },
  { fecha: 'lun 18', label: 'Libre' },
  { fecha: 'mar 19', label: 'Sin planes' },
  { fecha: 'mié 20', label: 'Sin planes' },
  { fecha: 'jue 21', label: 'Vuelta' },
]

export const DIA_3 = {
  indiceDia: 2, // sáb 16 — "Día de montaña"
  fechaLarga: 'Día 3 · sábado 16',
  titulo: 'Día de montaña',
  conflicto: {
    texto: 'Se pisan dos planes: el chocolate termina 16:45 y el traslado al cerro Otto sale 16:30.',
    accion: 'Correr el traslado a 17:00',
  },
  items: [
    { id: 'desayuno', time: '08:30', title: 'Desayuno en la cabaña', done: true },
    {
      id: 'catedral',
      time: '10:00',
      title: 'Subida al Cerro Catedral',
      place: 'Base del cerro · 20 min en auto',
      placeHoy: 'Estás acá · Fede y Santi también',
      current: true,
    },
    { id: 'chocolate', time: '15:30', title: 'Chocolate en el centro', place: 'Mitre 450' },
    { id: 'otto', time: '16:30', title: 'Traslado al cerro Otto', place: 'Sale desde Mitre y Quaglia' },
    { id: 'cena', time: '20:30', title: 'Cena en El Boliche de Alberto', place: 'Villegas 347 · reserva de Pedro', last: true },
  ],
  gastosDeHoy: 64300,
  voucher: 'Pase Cerro Catedral × 6',
}

export const GASTO_EJEMPLO = {
  comercio: 'Parrilla La Tranquera',
  fecha: '16/01',
  hora: '21:40',
  items: [
    { id: 'parrillada', nombre: 'Parrillada x2', monto: 28000, entre: ['Nacho', 'Fede', 'Santi', 'Tomi'] },
    { id: 'ensaladas', nombre: 'Ensaladas x3', monto: 9600, entre: ['Santi', 'Juan Cruz', 'Pedro'] },
    { id: 'bebidas', nombre: 'Bebidas', monto: 6200, entre: NOMBRES_GRUPO },
  ],
  subtotal: 43800,
  propinaPct: 10,
  total: 48180,
  partesIguales: 8030,
}

export const GASTOS_CUENTAS = {
  totalViaje: 642300,
  tuSaldo: -12400,
  hoy: [
    { id: 'pases', titulo: 'Pases Cerro Catedral', detalle: 'Pagó Fede · entre 6', monto: 54000, icono: 'wallet' },
    { id: 'nafta', titulo: 'Nafta', detalle: 'Pagó Pedro · entre 6', monto: 10300, icono: 'wallet' },
  ],
  ayer: [{ id: 'super', titulo: 'Súper para la cabaña', detalle: 'Pagaste vos · entre 6', monto: 37900, icono: 'home' }],
}

export const POST_VIAJE = {
  volvieronHace: 'Volvieron hace 2 días',
  saldo: { monto: -12400, con: 'Fede' },
  simplificado: '4 transferencias en vez de 11',
  saldos: [
    { nombre: 'Fede', amount: -12400 },
    { nombre: 'Tomi', amount: 8150 },
    { nombre: 'Santi', amount: 0 },
    { nombre: 'Juan Cruz', amount: 0 },
    { nombre: 'Pedro', amount: 0 },
  ],
  numeros: {
    gastaronEntreTodos: 1842000,
    porPersona: 307000,
    lugares: 23,
    gastosCargados: 41,
    masOrganizado: { nombre: 'Pedro', detalle: 'cargó 17 gastos' },
    quePeso: 'la cabaña',
  },
}

export const OTROS_VIAJES = {
  enCurso: {
    titulo: 'Mar de las Pampas',
    diaActual: 2,
    diasTotales: 4,
    detalle: 'Finde en familia',
    hoy: 'playa y asado a las 21',
    people: ['Nacho', 'Cami', 'Juli', 'Tomi'],
  },
  proximos: [
    {
      id: 'bariloche',
      titulo: 'Bariloche con los chicos',
      place: 'Bariloche',
      dates: '14–21 ene',
      pending: 'Faltan 2 votos para el alojamiento',
      people: NOMBRES_GRUPO,
      stage: 'previaje',
    },
    {
      id: 'norte',
      titulo: 'Escapada al norte',
      place: '¿Jujuy o Salta?',
      dates: 'Fechas sin definir',
      pending: '3 destinos propuestos, votá',
      people: ['Nacho', 'Santi', 'Cami'],
      stage: 'previaje',
    },
  ],
  pasados: [{ titulo: 'Córdoba, egresados 2024', detalle: '8 personas · 6 días · todos a mano', iniciales: 'Cba' }],
}

export const EMERGENCIAS = {
  titulo: 'Asistencia al viajero',
  detalle: '[Teléfono de la póliza] · [Número de póliza]',
  nota: 'Durante el viaje, esto aparece fijo arriba de todo.',
}
