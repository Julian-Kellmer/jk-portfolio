'use client'

import { useEffect, useRef, useState } from 'react'
import { usePageTransition } from '../../context/TransitionContext'
import Experience from '../../webgl/core/Experience'
import styles from './InfinityGallery.module.css'
import ProjectList from './ProjectList'
import { getProjects } from '../../lib/supabase'

function GalleryContent() {
  const canvasRef = useRef(null)
  const experienceRef = useRef(null)
  const [errorDetails, setErrorDetails] = useState('')
  const [view, setView] = useState('grid') // 'grid' | 'list'
  const [projects, setProjects] = useState([])

  const { navigate } = usePageTransition()

  useEffect(() => {
    getProjects().then(setProjects).catch(console.error)
  }, [])

  useEffect(() => {
    const handleProjectClick = (e) => {
      navigate(`/project/${e.detail}`)
    }
    window.addEventListener('projectClick', handleProjectClick)
    return () => window.removeEventListener('projectClick', handleProjectClick)
  }, [navigate])

  useEffect(() => {
    if (projects.length === 0) return
    try {
      if (canvasRef.current && !experienceRef.current) {
        experienceRef.current = new Experience(canvasRef.current, projects)
      }
    } catch (err) {
      console.error('WebGL Setup Error:', err)
      setErrorDetails(err.toString() + '\n' + err.stack)
    }

    return () => {
      if (experienceRef.current) {
        experienceRef.current.destroy()
        experienceRef.current = null
      }
    }
  }, [projects])

  const handleViewChange = (newView) => {
    setView(newView)
    // TODO: conectar a experienceRef.current.setView(newView)
  }

  return (
    <div className={styles.galleryContainer}>
      {errorDetails && (
        <div
          style={{
            color: 'red',
            position: 'absolute',
            zIndex: 9999,
            padding: 20,
          }}>
          <h1>Error Loading WebGL</h1>
          <pre>{errorDetails}</pre>
        </div>
      )}
      <div
        className=' bg-bg text-text text-h1 absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none'
        style={{ zIndex: 0 }}>
        <h1>Some of my work</h1>
      </div>
      <canvas
        ref={canvasRef}
        className={`${styles.canvas} `}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
      />

      {/* ─── List overlay ─── */}
      <ProjectList projects={projects} visible={view === 'list'} />

      {/* ─── View Toggle ─── */}
      <div className={styles.viewToggle} role="group" aria-label="Cambiar vista">
        {/* Grid */}
        <button
          id="toggle-grid"
          className={`${styles.toggleOption} ${view === 'grid' ? styles.toggleOptionActive : ''}`}
          onClick={() => handleViewChange('grid')}
          aria-label="Vista grilla"
          aria-pressed={view === 'grid'}>
          <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="1" y="1" width="6.5" height="6.5" rx="1.5" fill="currentColor"/>
            <rect x="10.5" y="1" width="6.5" height="6.5" rx="1.5" fill="currentColor"/>
            <rect x="1" y="10.5" width="6.5" height="6.5" rx="1.5" fill="currentColor"/>
            <rect x="10.5" y="10.5" width="6.5" height="6.5" rx="1.5" fill="currentColor"/>
          </svg>
        </button>
        {/* List */}
        <button
          id="toggle-list"
          className={`${styles.toggleOption} ${view === 'list' ? styles.toggleOptionActive : ''}`}
          onClick={() => handleViewChange('list')}
          aria-label="Vista lista"
          aria-pressed={view === 'list'}>
          <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="1" y="2" width="16" height="2.5" rx="1.25" fill="currentColor"/>
            <rect x="1" y="7.75" width="16" height="2.5" rx="1.25" fill="currentColor"/>
            <rect x="1" y="13.5" width="16" height="2.5" rx="1.25" fill="currentColor"/>
          </svg>
        </button>
      </div>

    </div>
  )
}

export default function InfinityGallery() {
  return <GalleryContent />
}
