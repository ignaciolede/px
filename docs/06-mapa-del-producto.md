# Mapa del producto

Este es el manual consultable de PX: dónde vive cada función, cada botón, y dónde va algo nuevo. **Es la fuente de verdad para preguntas de ubicación.** Cuando se implementa algo, se completa la columna *Archivo*; cuando se agrega algo, se agrega una fila.

Estados: **Diseñada** = tiene pantalla y captura · **Parcial** = aparece como botón o bloque, sin pantalla propia · **Solo manual** = definida, sin diseño todavía.

## 0. Chrome compartido (no es una función, es la navegación)

- **Fuera de un viaje** (Mis viajes, Vos, Crear viaje, Unirse): `src/layout/HomeLayout.jsx` — sidebar en desktop, `BottomNav` flotante en mobile.
- **Dentro de un viaje** (Resumen, Plan, Cuentas, Baúl, Grupo): `src/layout/TripLayout.jsx` — sidebar con volver/mini-card/nav/Emergencias-o-Grupo en desktop, `BottomNav` flotante en mobile.
- Componentes del design system portados: `src/components/*.jsx` (ver `src/screens/Componentes.jsx` para el catálogo comparativo).
- Datos de ejemplo: `src/data/demo.js`. Navegación y estado de la demo: `src/App.jsx`.

## 1. Funciones

| Función | Dónde vive | Etapa | Estado | Pantalla / captura | Archivo |
| --- | --- | --- | --- | --- | --- |
| Registro e ingreso con Google/Apple | Ingreso | — | Diseñada | P1 Ingreso | `src/screens/Ingreso.jsx` |
| Recuperación de acceso | Ingreso › link "¿Olvidaste…?" | — | Solo manual | P1 | |
| Gestión de cuenta (alta, baja, datos) | Vos › Cuenta | — | Parcial | P13 Vos (desktop) | `src/screens/Vos.jsx` |
| Perfil básico (nombre, color, moneda) | Vos › encabezado y "Tu color" | — | Diseñada | P13 Vos | `src/screens/Vos.jsx` |
| Preferencias de viaje (presupuesto, ritmo, comida, alergias) | Vos › Cómo viajás | — | Diseñada | P13 Vos | `src/screens/Vos.jsx` |
| Ciudad y aeropuertos de salida | Vos › Aeropuertos de salida / Salida y moneda | — | Parcial | P13 Vos | `src/screens/Vos.jsx` |
| Documentos personales con vencimiento | Vos › Documentos (aviso también en Resumen Previaje) | Previaje | Diseñada | P13 Vos, P3 | `src/screens/Vos.jsx`, `src/screens/trip/ResumenPreviaje.jsx` |
| Historial de lugares visitados | Vos › números y "Último" | Post | Parcial | P13 Vos | `src/screens/Vos.jsx` |
| Preferencias de privacidad | Vos › Privacidad | — | Parcial | P13 Vos | `src/screens/Vos.jsx` |
| Distintos viajes en simultáneo | Mis viajes (en curso / próximos / pasados) | — | Diseñada | P2 Mis viajes | `src/screens/MisViajes.jsx` |
| Crear viaje (con o sin destino y fechas) | Mis viajes › Crear viaje | — | Diseñada | P10 Crear viaje | `src/screens/CrearViaje.jsx` |
| Unirse con código, QR, link o mail | Mis viajes › Unirme con código; link externo | — | Diseñada | P11 Unirse | `src/screens/Unirse.jsx` |
| Invitar al grupo | Grupo › código BRC 4K9 (copiar link, QR, mail) | Todas | Diseñada | P12 Grupo | `src/screens/trip/Grupo.jsx` |
| Rol organizador / miembro / lector | Grupo › etiqueta de cada integrante | Todas | Diseñada | P12 Grupo | `src/screens/trip/Grupo.jsx` |
| Últimos movimientos (sin notificaciones) | Grupo › Últimos movimientos | Todas | Diseñada | P12 Grupo | `src/screens/trip/Grupo.jsx` |
| Salir del grupo con pendientes | Grupo › "Salir del grupo" → muestra deudas y reservas | Todas | Parcial (pantalla de pendientes: solo manual, ver Flujo 5) | P12 Grupo | `src/screens/trip/Grupo.jsx` (el link; sin pantalla de pendientes) |
| Varios viajes por grupo / repetir viaje | Post-viaje › ¿Repetimos? · Mis viajes › Pasados › Repetir viaje | Post | Diseñada | P5, P2 (desktop) | `src/screens/trip/ResumenPost.jsx`, `src/screens/MisViajes.jsx` |
| Proponer opciones (destino, alojamiento, actividad) | Plan › Decidir › "Proponer otra" / "Nueva votación" | Previaje | Diseñada | P6 Decidir | `src/screens/trip/Plan.jsx` (botones presentes, sin flujo real) |
| Votación con mayoría configurable | Plan › Decidir (también en Resumen Previaje) | Previaje | Diseñada | P6, P3 | `src/screens/trip/Plan.jsx`, `src/screens/trip/ResumenPreviaje.jsx` (voto compartido vía `src/App.jsx`) |
| Itinerario día por día | Plan › Itinerario | Previaje, Viaje | Diseñada | P7 Itinerario | `src/screens/trip/Plan.jsx` |
| Conflictos y husos horarios | Plan › Itinerario › aviso amarillo con botón | Previaje, Viaje | Diseñada | P7 | `src/screens/trip/Plan.jsx` |
| Sincronizar con calendario (.ics) | Plan › Itinerario › "Sincronizar calendario" | Previaje | Parcial | P7 | `src/screens/trip/Plan.jsx` (botón sin acción) |
| Mapa con lugares y rutas | Plan › Mapa (chip) · mapa en Itinerario (desktop) y en Hoy | Viaje | Parcial (la vista "Mapa" sola no está diseñada) | P7, P4 | `src/screens/trip/Plan.jsx` (placeholder del chip Mapa + SVG de Itinerario), `src/screens/trip/Hoy.jsx` |
| Optimizador de ruta diaria | Itinerario › "Ordenar ruta" · Hoy › "Ordenar ruta por cercanía" | Viaje | Parcial | P7, P4 (desktop) | `src/screens/trip/Plan.jsx`, `src/screens/trip/Hoy.jsx` (botones sin acción) |
| Ubicación del grupo en vivo | Hoy › avatares en el mapa y "3 del grupo compartiendo"; se activa en Vos › Privacidad | Viaje | Parcial | P4, P13 | `src/screens/trip/Hoy.jsx` (ilustrativo) |
| Cargar gastos | Cuentas (lista) · botón flotante "Gasto" en Viaje | Todas | Diseñada | P8, P4 | `src/screens/trip/Cuentas.jsx`, `src/screens/trip/Hoy.jsx` (botón) |
| Importar comprobantes (leer ticket/PDF) | Cuentas › Agregar gasto › ticket leído | Todas | Diseñada | P8 Agregar gasto | `src/screens/trip/AgregarGasto.jsx` (ticket de ejemplo fijo) |
| Dividir cuenta (iguales / por consumo / propina) | Cuentas › Agregar gasto | Todas | Diseñada | P8 | `src/screens/trip/AgregarGasto.jsx` |
| Saldos y quedar a mano | Resumen Post-viaje · Cuentas › Tu saldo | Post | Diseñada | P5, P8 (desktop) | `src/screens/trip/ResumenPost.jsx`, `src/screens/trip/Cuentas.jsx` |
| Checklist personal y compartido | Baúl › Checklist | Previaje | Diseñada | P9 Baúl | `src/screens/trip/Baul.jsx` |
| Asignación de tareas por usuario | Baúl › Tareas del grupo (también "Lo que te toca" en Resumen) | Previaje | Diseñada | P9, P3 | `src/screens/trip/Baul.jsx`, `src/screens/trip/ResumenPreviaje.jsx` |
| Checklist de requisitos del viaje | Baúl › Requisitos (también en Resumen Previaje, desktop) | Previaje | Diseñada | P9, P3 | `src/screens/trip/Baul.jsx`, `src/screens/trip/ResumenPreviaje.jsx` |
| Documentos del viaje (pasajes, vouchers, pólizas) | Baúl › Documentos · "Voucher de hoy" en Hoy | Previaje, Viaje | Diseñada | P9, P4 | `src/screens/trip/Baul.jsx`, `src/screens/trip/Hoy.jsx` |
| Emergencias a mano | Baúl › Emergencias · botón rojo fijo durante Viaje | Viaje | Diseñada | P9, P4 | `src/screens/trip/Baul.jsx` (bloque), `src/layout/TripLayout.jsx` (botón fijo), `src/screens/trip/Hoy.jsx` (lo activa) |

## 2. Botones y elementos por pantalla

- **P1 Ingreso** (`src/screens/Ingreso.jsx`): Seguir con Google (primario) · Seguir con Apple · Entrar con mi mail / campo Mail + "Mandame un link" · Ingresá el código.
- **P2 Mis viajes** (`src/screens/MisViajes.jsx`): avatar (→ Vos) · tarjeta "En curso" + Abrir Hoy · bloque cuenta regresiva · tarjetas de Próximos · fila de Pasados + Repetir viaje · Crear viaje (primario/flotante) · Unirme con código · filtros Todos / En grupo / Solo (desktop) · nav: Mis viajes, Vos.
- **Encabezado de viaje** (`src/layout/TripLayout.jsx` + el header propio de cada pantalla): volver a Mis viajes · nombre y fechas · avatares (→ Grupo, en el header de Resumen) · selector de etapa Previaje / Viaje / Post-viaje · nav: Resumen, Plan, Cuentas, Baúl · en Viaje: Emergencias.
- **P3 Resumen Previaje** (`src/screens/trip/ResumenPreviaje.jsx`): cuenta regresiva · Lo que te toca (Votar ahora, tarea, aviso de documento) · votación "¿Dónde dormimos?" + Proponer otra · checklist 12/20 · presupuesto estimado · requisitos.
- **P4 Hoy** (`src/screens/trip/Hoy.jsx`): pastilla "Bariloche · día 3" · Emergencias (vía TripLayout) · mapa · Ahora / después · Ruta · Voucher · Gasto (primario) · Ordenar ruta por cercanía (desktop) · Gastos de hoy · Voucher de hoy.
- **P5 Resumen Post-viaje** (`src/screens/trip/ResumenPost.jsx`): tu saldo · Pagarle a Fede / Copiar alias (primario) · Ya le pagué · saldos con cada uno · Ver gastos · el viaje en números · Mismo grupo, otro destino · Mismo destino, otra fecha.
- **P6 Decidir** (`src/screens/trip/Plan.jsx`): chips Decidir / Itinerario / Mapa · Nueva votación (primario, desktop) · opciones votables · Proponer · Cerrar antes · lista de abiertas y decididas.
- **P7 Itinerario** (`src/screens/trip/Plan.jsx`): chips · Calendario / Sincronizar calendario · días · aviso de choque + Correr el traslado · ítems del día · Agregar plan (primario) · mapa + Ordenar ruta (desktop).
- **P8 Agregar gasto** (`src/screens/trip/AgregarGasto.jsx`, abierto desde `src/screens/trip/Cuentas.jsx`): Cancelar · ticket leído · monto · Partes iguales / Por consumo · Propina Sin / 10% / 15% / Otro · caras por ítem (por consumo) · Guardar gasto (primario).
- **P9 Baúl** (`src/screens/trip/Baul.jsx`): chips Checklist / Requisitos / Documentos / Emergencias · contador 12/20 · tareas con check y responsable · documentos + Subir PDF o captura · requisitos · bloque de emergencias · Agregar (primario).
- **P10 Crear viaje** (`src/screens/CrearViaje.jsx`): Destino + Todavía no sabemos · Ida / Vuelta + Lo votamos después · Nombre · En grupo / Solo · Crear e invitar al grupo (primario) · vista previa (desktop).
- **P11 Unirse** (`src/screens/Unirse.jsx`): 6 casillas de código · Escanear QR · Link de invitación (desktop) · tarjeta del viaje · Sumarme al viaje (primario) · No es este.
- **P12 Grupo** (`src/screens/trip/Grupo.jsx`): código + Copiar link (primario) · QR · Mail · integrantes con rol · Últimos movimientos · Salir del grupo · Invitar (desktop).
- **P13 Vos** (`src/screens/Vos.jsx`): avatar y nombre · números · Tu color · Cómo viajás · Documentos · Aeropuertos / Salida y moneda · Privacidad · Cuenta · Cerrar sesión · nav: Mis viajes, Vos.

## 3. "Quiero agregar X": dónde va

Responder siempre en este orden y citar la regla usada.

1. **¿Es de la persona y sirve para todos sus viajes?** (datos, preferencias, documentos propios, configuración) → **Vos**.
   **¿Es sobre la lista de viajes o crear/sumarse a uno?** → **Mis viajes**.
2. **¿Es del grupo dentro de un viaje?** Elegí por el verbo principal:
   - decidir, planear, cuándo, dónde, recorrido → **Plan** (Decidir, Itinerario o Mapa).
   - plata: pagar, dividir, deber, presupuesto → **Cuentas**.
   - llevar, hacer, tener a mano: listas, tareas, papeles, contactos → **Baúl**.
   - personas: invitar, roles, permisos, actividad → **Grupo**.
3. **¿Hay que verlo apenas se abre el viaje en alguna etapa?** Entonces, además, va una **tarjeta en el Resumen de esa etapa** que lleva a su sección. Resumen no es dueño de ninguna función: solo muestra lo urgente.
4. **¿En qué dispositivo se usa más?** Previaje → pensarlo primero para desktop; Viaje → mobile; Post-viaje → los dos.
5. **Límites que no se rompen:** no hay quinta sección en la nav (4 fijas: Resumen, Plan, Cuentas, Baúl) · máximo 3 bloques en un Resumen · un solo botón primario por pantalla · nada de notificaciones: los avisos van a Últimos movimientos o a una tarjeta en Resumen.
6. **Si no encaja en ninguna:** no inventar lugar. Proponer 2 opciones con pros y contras y preguntar.

Al terminar de agregar algo: sumar una fila en la tabla 1, sus botones en la sección 2 y el archivo donde quedó.
