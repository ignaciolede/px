/* Helpers compartidos por los componentes (equivalen a cx/omit de componentes.js). */

export function cx(...parts) {
  return parts.filter(Boolean).join(' ')
}

export function omit(obj, keys) {
  const out = {}
  for (const k in obj) if (!keys.includes(k)) out[k] = obj[k]
  return out
}

/* Formato argentino: "$ 48.200" — espacio después del signo, punto de miles. */
export function money(n) {
  const signo = n < 0 ? '− ' : ''
  return signo + '$ ' + Math.abs(Math.round(n)).toLocaleString('es-AR')
}
