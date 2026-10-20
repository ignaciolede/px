import { useState } from 'react'
import { Button, Chip, Icon } from '../../components'
import { CHECKLIST_GRUPO, CHECKLIST_PERSONAL, DOCUMENTOS_VIAJE, EMERGENCIAS, PREVIAJE } from '../../data/demo'
import './Baul.css'

const CHIPS = [
  { id: 'checklist', label: 'Checklist' },
  { id: 'requisitos', label: 'Requisitos' },
  { id: 'documentos', label: 'Documentos' },
  { id: 'emergencias', label: 'Emergencias' },
]

/* P9 · Baúl (docs/05 fila 9, docs/06). Mobile: una sección a la vez con chips.
   Desktop: las tres columnas juntas (Tareas, Documentos, Requisitos) y
   Emergencias como tarjeta dentro de Requisitos — así en P9-Baul-D. */
export default function Baul() {
  const [vista, setVista] = useState('checklist')
  const [grupo, setGrupo] = useState(() => Object.fromEntries(CHECKLIST_GRUPO.map((t) => [t.id, t.hecha])))
  const [personal, setPersonal] = useState(() => Object.fromEntries(CHECKLIST_PERSONAL.map((t) => [t.id, t.hecha])))

  const deltaGrupo = CHECKLIST_GRUPO.reduce((n, t) => n + ((grupo[t.id] ? 1 : 0) - (t.hecha ? 1 : 0)), 0)
  const deltaPersonal = CHECKLIST_PERSONAL.reduce((n, t) => n + ((personal[t.id] ? 1 : 0) - (t.hecha ? 1 : 0)), 0)
  const hechos = PREVIAJE.checklist.hechos + deltaGrupo + deltaPersonal

  function toggleGrupo(id) {
    setGrupo((p) => ({ ...p, [id]: !p[id] }))
  }
  function togglePersonal(id) {
    setPersonal((p) => ({ ...p, [id]: !p[id] }))
  }

  const ChecklistBlock = (
    <>
      <div className="baul__contador">
        <p className="baul__contador-num px-nums">
          {hechos}/{PREVIAJE.checklist.total}
        </p>
        <p className="baul__contador-texto px-cuerpo">cosas listas. A este ritmo llegan bien.</p>
      </div>
      <section>
        <p className="baul__seccion-titulo px-sobretitulo">Del grupo</p>
        <div className="baul__lista px-stagger">
          {CHECKLIST_GRUPO.map((t) => (
            <button key={t.id} type="button" className={'baul__item' + (grupo[t.id] ? ' baul__item--hecho' : '')} onClick={() => toggleGrupo(t.id)}>
              <span className="baul__check">{grupo[t.id] && <Icon name="check" size={16} />}</span>
              <span className="baul__item-texto">
                <span className="baul__item-titulo">{t.titulo}</span>
                <br />
                <span className="baul__item-detalle px-meta">{t.detalle}</span>
              </span>
            </button>
          ))}
        </div>
      </section>
      <section>
        <p className="baul__seccion-titulo px-sobretitulo">Solo tuyo</p>
        <div className="baul__lista px-stagger">
          {CHECKLIST_PERSONAL.map((t) => (
            <button key={t.id} type="button" className={'baul__item' + (personal[t.id] ? ' baul__item--hecho' : '')} onClick={() => togglePersonal(t.id)}>
              <span className="baul__check">{personal[t.id] && <Icon name="check" size={16} />}</span>
              <span className="baul__item-texto">
                <span className="baul__item-titulo">{t.titulo}</span>
              </span>
            </button>
          ))}
        </div>
      </section>
    </>
  )

  const RequisitosBlock = (
    <div className="baul__requisitos px-stagger">
      {PREVIAJE.requisitos.map((r) =>
        r.ok ? (
          <span key={r.label} className="baul__requisito baul__requisito--ok px-cuerpo">
            <Icon name="check" size={16} />
            {r.label}
          </span>
        ) : (
          <span key={r.label} className="baul__requisito baul__requisito--falta px-cuerpo">
            <b aria-hidden="true">!</b>
            {r.label}
          </span>
        ),
      )}
    </div>
  )

  const DocumentosBlock = (
    <div className="baul__docs px-stagger">
      {DOCUMENTOS_VIAJE.map((d) => (
        <div key={d.titulo} className={'baul__doc px-tone-' + d.tono}>
          <span className="baul__doc-tipo">{d.tipo}</span>
          <span className="baul__doc-titulo">{d.titulo}</span>
        </div>
      ))}
      <div className="baul__doc baul__doc--subir">
        <Icon name="plus" size={24} />
        <span className="px-cuerpo">Subir PDF o captura</span>
      </div>
    </div>
  )

  const EmergenciasBlock = (
    <div className="baul__emergencias">
      <span className="baul__emergencias-tag">Emergencias</span>
      <p className="baul__emergencias-titulo">{EMERGENCIAS.titulo}</p>
      <p>{EMERGENCIAS.detalle}</p>
      <p className="baul__emergencias-nota">{EMERGENCIAS.nota}</p>
    </div>
  )

  return (
    <div className="baul px-in">
      <div>
        <h1 className="px-display">Baúl</h1>
        <p className="baul__bajada px-cuerpo-lg">Lo que hay que llevar, hacer y tener a mano.</p>
      </div>

      <div className="baul__contador-desk">
        <span className="px-nums px-titulo-1">
          {hechos}/{PREVIAJE.checklist.total}
        </span>
        <span className="px-meta"> cosas listas</span>
      </div>

      <div className="baul__chips">
        {CHIPS.map((c) => (
          <Chip key={c.id} selected={vista === c.id} tone="previaje" onClick={() => setVista(c.id)}>
            {c.label}
          </Chip>
        ))}
      </div>

      <div className="baul__bloque-mobile">
        {vista === 'checklist' && ChecklistBlock}
        {vista === 'requisitos' && <div className="baul__card">{RequisitosBlock}</div>}
        {vista === 'documentos' && DocumentosBlock}
        {vista === 'emergencias' && EmergenciasBlock}
      </div>

      <div className="baul__cols px-stagger">
        <div className="baul__col">
          <div className="baul__col-cabecera">
            <p className="px-titulo-2">Tareas del grupo</p>
          </div>
          <div className="baul__lista px-stagger">
            {CHECKLIST_GRUPO.map((t) => (
              <button key={t.id} type="button" className={'baul__item' + (grupo[t.id] ? ' baul__item--hecho' : '')} onClick={() => toggleGrupo(t.id)}>
                <span className="baul__check">{grupo[t.id] && <Icon name="check" size={16} />}</span>
                <span className="baul__item-texto">
                  <span className="baul__item-titulo">{t.titulo}</span>
                  <br />
                  <span className="baul__item-detalle px-meta">{t.detalle}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="baul__col">
          <p className="px-titulo-2">Documentos</p>
          {DocumentosBlock}
        </div>

        <div className="baul__col">
          <p className="px-titulo-2">Requisitos</p>
          {RequisitosBlock}
          {EmergenciasBlock}
        </div>
      </div>

      <Button icon="plus" className="baul__agregar">
        Agregar
      </Button>
    </div>
  )
}
