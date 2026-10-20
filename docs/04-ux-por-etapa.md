# UX por etapa

## Principios

1. **Una pantalla, una pregunta.** El inicio de cada etapa responde la pregunta más urgente de ese momento y muestra como máximo tres bloques.
2. **Revelado progresivo.** Primero el resumen y después el detalle: una card muestra 1 dato y el resto aparece al tocarla.
3. **Lo pendiente arriba.** Si algo necesita a la persona (votar, confirmar, poner plata), va primero, en un banner con el tinte de la etapa.
4. **Un primario por pantalla.** Un solo `Button` mandarina; lo demás es secundario o fantasma.
5. **Nada se pierde.** Toda acción destructiva pide confirmar y ofrece “Deshacer” durante 5 segundos.
6. **Mobile primero, desktop cuando conviene.** Se diseña para 360px y se expande. Previaje se aprovecha más en desktop, Viaje vive en el celular y Post-viaje funciona igual en los dos.

## Estructura del viaje

Dentro de un viaje, el `StageSwitch` va arriba del todo. La etapa activa se elige sola según las fechas (antes de salir: Previaje; entre ida y vuelta: Viaje; después: Post-viaje), pero cualquiera puede cambiarla a mano para mirar otra.

| Etapa | Dispositivo principal | Pregunta que responde | Tinte del encabezado |
| --- | --- | --- | --- |
| Previaje | Desktop | ¿Qué falta decidir y quién lo resuelve? | `lima-tinte` |
| Viaje | Mobile | ¿Qué hacemos hoy y dónde nos encontramos? | `mandarina-tinte` |
| Post-viaje | Los dos | ¿Cómo quedamos con la plata y qué nos llevamos? | `cielo-tinte` |

## Navegación

- **Fuera del viaje:** *Mis viajes* (pantalla inicial, con todos los viajes a la vez ordenados en curso, próximos y pasados) y *Vos* (perfil, preferencias, documentos personales, historial y cuenta).
- **Dentro de un viaje**, cuatro secciones fijas en `BottomNav`:
  - **Resumen** cambia según la etapa.
  - **Plan** tiene Decidir, el itinerario y el mapa.
  - **Cuentas** tiene los gastos y los saldos.
  - **Baúl** tiene el checklist, los requisitos, las tareas, los documentos y las emergencias.
- **Grupo** (miembros, roles, invitar, movimientos, repetir o salir) se abre tocando los avatares del encabezado.
- Durante Viaje, **Emergencias** es un botón fijo en el encabezado.

| Etapa | Qué muestra primero Resumen | Sección protagonista |
| --- | --- | --- |
| Previaje | Tus pendientes: votaciones abiertas, tareas a tu nombre, requisitos que faltan | Plan (Decidir) y Baúl |
| Viaje | Hoy: mapa del día, qué sigue, dónde está el grupo, botón de gasto | Resumen |
| Post-viaje | Cómo quedás con cada uno | Cuentas |

## Layout

**Mobile (base, 360–767px):**

- Margen lateral `espacio-4`.
- Encabezado con el tinte de la etapa: nombre del viaje (`titulo-1`), fechas (`meta`), `AvatarStack` y `StageSwitch`.
- Contenido en una columna con separación `espacio-8`.
- `BottomNav` flotante a `espacio-4` del borde inferior. Dejá `nav-alto` + `espacio-8` de aire al final del contenido para que no tape nada.
- Acción primaria: si es frecuente (agregar gasto en Viaje), botón flotante arriba de la nav a la derecha; si no, al final del bloque que la origina.

**Tablet (≥ `bp-tablet`):** igual que mobile, con margen `espacio-6` y cards en 2 columnas.

**Desktop (≥ `bp-desktop`):**

- La `BottomNav` pasa a barra lateral izquierda de 240px sobre `papel-hundido`.
- Contenido con ancho máximo de 1200px.
- En Previaje, dos columnas: a la izquierda (2/3) lo que hay que decidir (votaciones, itinerario en armado) y a la derecha (1/3) el resumen del grupo (quiénes van, qué falta, presupuesto).

## Jerarquía de una pantalla

1. Dónde estoy: encabezado con la etapa.
2. Qué me necesita: banner de pendientes, si hay.
3. El contenido de la etapa, con un máximo de tres bloques.
4. Una sola acción primaria.

## Accesibilidad

- Contraste AA verificado en los dos temas: texto 4.5:1 y controles y foco 3:1.
- Texto corrido de 16px como mínimo, con escalado hasta el 200% sin romper el layout (sin alturas fijas en contenedores de texto).
- Áreas táctiles de 44px como mínimo.
- El estado nunca se comunica solo con color: la etapa lleva su nombre, el saldo lleva signo y palabra y el voto lleva un check.
- Foco visible en todo lo interactivo y orden de tabulación igual al visual.
- `prefers-reduced-motion` respetado.
