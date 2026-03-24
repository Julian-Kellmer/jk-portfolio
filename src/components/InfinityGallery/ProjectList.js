'use client'

import { useEffect, useState, useMemo } from 'react'
import styles from './ProjectList.module.css'

export default function ProjectList({ projects, visible }) {
  const [rowsVisible, setRowsVisible] = useState(false)

  // Reset + re-trigger row stagger every time the overlay becomes visible
  useEffect(() => {
    if (visible) {
      // Pequeño delay: deja que el fade del overlay arranque, luego las filas
      const t = setTimeout(() => setRowsVisible(true), 180)
      return () => clearTimeout(t)
    } else {
      setRowsVisible(false)
    }
  }, [visible])

  // Group projects by year, sorted newest first
  const grouped = useMemo(() => {
    const map = {}
    projects.forEach((p) => {
      if (!map[p.year]) map[p.year] = []
      map[p.year].push(p)
    })
    return Object.entries(map).sort(([a], [b]) => Number(b) - Number(a))
  }, [projects])

  // Flat list to calculate global stagger index
  const flatProjects = useMemo(
    () => grouped.flatMap(([, items]) => items),
    [grouped],
  )

  return (
    <div
      className={`${styles.overlay} ${visible ? styles.overlayVisible : ''}`}
      aria-hidden={!visible}>
      {/* layout-wrap aplica los márgenes laterales del sistema de grilla global */}
      <div className='layout-wrap '>
        {/* ── Header: "All projects"  ·  "N projects" ── */}
        {/* 📍 EDITAR HEADER → ProjectList.module.css → .listHeader / .listTitle / .listCount */}
        <div className={`${styles.listHeader} layout-grid `}>
          <div className='col-span-6 col-start-1 col-end-7'>
            <h2 className={`${styles.listTitle} text-h2`}>All projects</h2>
          </div> 
          <div className='col-span-6 col-start-7 col-end-8'>
            <span className={`${styles.listCount} text-h2 text-text/50`}>
              {projects.length} projects
            </span>
          </div>
        </div>

      
        {grouped.map(([year, items]) => (
          <div
            key={year}
            className={`${styles.yearGroup} layout-grid `}>
            {/* Año — columna izquierda */}
            {/* 📍 EDITAR AÑO → ProjectList.module.css → .yearLabel */}
            <span className={`${styles.yearLabel} col-span-1 col-start-1 col-end-2`}>{year}</span>

            {/* Filas — columna derecha */}
            <div className={`${styles.yearRows} col-start-2 col-end-13`}>
              {items.map((project) => {
                const globalIndex = flatProjects.indexOf(project)
                const delay = `${globalIndex * 45}ms`

                return (
                  /* 📍 EDITAR FILA → ProjectList.module.css → .projectRow */
                  <div
                    key={project.id}
                    className={`${styles.projectRow} ${rowsVisible ? styles.rowVisible : ''} cursor-pointer hover:bg-white/5 transition-colors`}
                    onClick={() => window.dispatchEvent(new CustomEvent('projectClick', { detail: project.slug }))}
                    style={{ transitionDelay: rowsVisible ? delay : '0ms' }}>
                    {/* Título — 📍 .rowTitle */}
                    <span className={styles.rowTitle}>{project.title}</span>

                    {/* Tags — 📍 .rowTags / .tag */}
                    <div className={styles.rowTags}>
                      {(project.tags ?? []).map((tag) => (
                        <span
                          key={tag}
                          className={`${styles.tag} text-small capitalize text-text/50`}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Cliente — 📍 .rowClient */}
                    <span className={styles.rowClient}>{project.client}</span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>{' '}
      {/* end layout-wrap */}
    </div>
  )
}
