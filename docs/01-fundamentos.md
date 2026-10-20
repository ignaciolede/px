PX (nombre provisorio de ProyectoX) junta en un solo lugar todo lo que un grupo de amigos o una familia necesita para organizar un viaje: qué día se sale, dónde se duerme, qué se votó y quién puso cuánta plata. La marca es **cercana, amigable y accesible**. La interfaz es **liviana**: muestra lo que importa en la etapa en que está el viaje y nada más.

Tres ideas sostienen todo el sistema:

1. **El viaje tiene tres etapas, y cada una tiene su color.** Previaje = `lima`, Viaje = `mandarina`, Post-viaje = `cielo`. El color avisa en qué momento estás antes de leer nada.
2. **Una pantalla, una pregunta.** Cada pantalla responde una sola cosa (“¿qué hacemos hoy?”, “¿cómo quedamos con la plata?”). Lo demás va un toque más adentro.
3. **Hablamos como alguien del grupo**, no como una agencia de viajes.

## Color

- Fondo de página: `papel`. Cards, hojas e inputs: `papel-elevado`. Zonas agrupadas o el panel lateral de desktop: `papel-hundido`. Nunca uses blanco puro como fondo de página.
- Texto principal en `tinta`; texto secundario y metadatos en `tinta-suave`. Los dos pasan 4.5:1 sobre todos los `papel*` y los tres tintes de etapa, en Claro y en Noche.
- `mandarina` es el color de marca y del botón primario. **Un solo botón mandarina por pantalla.** El texto encima es `sobre-color`, nunca blanco (blanco sobre mandarina no llega a 3:1).
- Mandarina como texto o ícono va en `mandarina-texto`.
- Color por etapa:

| Etapa | Relleno (chips, badge, indicador) | Fondo suave (encabezado, banners) |
| --- | --- | --- |
| Previaje | `lima` | `lima-tinte` |
| Viaje | `mandarina` | `mandarina-tinte` |
| Post-viaje | `cielo` | `cielo-tinte` |

- El tinte de etapa va solo en el encabezado de la pantalla del viaje y en banners. El resto de la pantalla queda en `papel`. Si todo se tiñe, el color deja de significar algo.
- Plata: saldo a favor en `positivo` con “+” y la palabra (“te deben”). Saldo pendiente en `negativo` con “−” y la frase (“te falta poner”). En el tema Claro los dos tienen la misma luminosidad: **nunca los distingas solo por color.**
- Advertencias (una votación que cierra, una reserva sin confirmar): texto `aviso`, o badge con fondo `aviso-relleno` y texto `sobre-color`.
- `linea` es solo decorativa (divisores, borde de cards). El borde de un control (input, chip sin elegir, botón secundario) es `linea-fuerte`, que pasa 3:1.
- Foco de teclado: anillo sólido de 2px en `foco` con 2px de separación del color de fondo (`outline: 2px solid var(--foco); outline-offset: 2px`). Va en todo lo interactivo, sin excepción.
- Tema Noche: mismos nombres de token, otros valores. No hardcodees colores; usá siempre `var(--token)`.

## Tipografía

- Dos familias de Google Fonts: **Bricolage Grotesque** (`display`) para títulos y montos, y **Figtree** (`texto`) para todo lo demás. Cargalas con `https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600..800&family=Figtree:wght@400..700&display=swap`.
- Bricolage tiene carácter y algo de imperfección amable; Figtree es redonda y muy legible en tamaños chicos. No agregues una tercera familia.
- Escala: `display-xl` (solo desktop), `display`, `titulo-1`, `titulo-2`, `monto` | `cuerpo-lg`, `cuerpo`, `cuerpo-fuerte`, `etiqueta`, `meta`, `sobretitulo`.
- El texto corrido nunca baja de 16px (`cuerpo`). `meta` (13px) es solo para datos de apoyo, como fechas o autor de un gasto, y siempre va en `tinta-suave`.
- Un `display` por pantalla como máximo. Los títulos van en frase, con mayúscula solo al inicio (“Votá el alojamiento”, no “Votá El Alojamiento”). La única excepción en mayúsculas es `sobretitulo`, para la etapa y las etiquetas de sección.
- Los montos usan `monto` con números tabulares (`font-variant-numeric: tabular-nums`) y formato argentino: `$ 48.200`, con punto de miles y espacio después del signo.

## Espaciado, forma y profundidad

- Grilla de 4px. Margen lateral de pantalla: `espacio-4` en mobile, `espacio-6` desde `bp-tablet`. Entre secciones: `espacio-8` en mobile y `espacio-12` en desktop.
- La forma es redonda y blanda: los botones, chips, el selector de etapa y la nav son pills (`radio-pill`). Las cards de viaje y de votación usan `radio-lg`, las filas `radio-md` y los inputs `radio-sm`.
- Sombras: solo `sombra-card` en cards y `sombra-flotante` en lo que flota (nav, botón flotante, hojas). Nada de bordes con sombra a la vez.
- Todo lo tocable mide al menos `toque-min` (44px). Botones e inputs miden `control-md` (48px).

## Íconos

- Usá **Lucide** (lucide.dev): trazo de 2px y extremos redondeados, en 20px dentro de botones y filas y en 24px en la navegación. Son SVG de un solo color que heredan `currentColor`.
- Los íconos de los componentes de este sistema (nav, check, flechas) están dibujados inline con ese mismo criterio. **Son un reemplazo provisorio de Lucide:** cambialos por los de Lucide cuando se implemente.
- Ícono + texto siempre, salvo en la navegación inferior con su etiqueta debajo y en botones de cerrar o volver con `aria-label`.
- Sin emoji en la interfaz. Los usuarios sí pueden ponerlos en el nombre del grupo o del viaje, y se respetan.

## Imágenes

- **Fotos:** las de cada viaje las sube el grupo o vienen del destino. Van a sangre dentro de cards `radio-lg`, con el nombre del destino arriba de un velo (`velo`) para que el texto blanco tenga contraste.
- **Pictogramas** (estados vacíos, onboarding): figuras planas, gruesas y simpáticas, de una sola tinta (`tinta` o `papel`) sobre un bloque de color de etapa o sobre una foto. Formas redondeadas y sin contornos finos. Muestran personas haciendo cosas de viaje, como cargar mochila, votar o brindar.
- Sin ilustración 3D, sin degradés y sin personajes con cara detallada.

## Movimiento

- Transiciones cortas (150–220ms, `cubic-bezier(.2,.8,.2,1)`) para cambiar de etapa, abrir hojas y marcar un voto. Respetá `prefers-reduced-motion`: sin desplazamientos, solo fundido.
- Un único momento de festejo: cuando una votación se cierra o el grupo queda a mano, el chip ganador hace un pequeño rebote. Nada de confeti.

## Componentes

Están en `components/bundle.js` como `window.PX` (React 18), con los estilos en `components/bundle.css` y las clases con prefijo `px-`.

- `Button`: primario (`mandarina`), secundario (borde) o fantasma.
- `StageSwitch`: el selector Previaje · Viaje · Post. Va arriba del todo en la pantalla del viaje.
- `Chip`: para filtros y opciones, con tono por etapa.
- `TripCard`: un viaje en el inicio.
- `AvatarStack`: quiénes van.
- `PollOption`: una opción de votación.
- `BalanceRow`: cómo quedás con alguien.
- `ItineraryItem`: un momento del día.
- `TextField`: input con label.
- `BottomNav`: navegación mobile flotante dentro de un viaje: Resumen · Plan · Cuentas · Baúl.

Cómo se usan por etapa y por pantalla está en la sección *UX por etapa*.
