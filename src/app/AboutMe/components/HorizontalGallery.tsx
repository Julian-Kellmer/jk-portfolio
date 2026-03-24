'use client'

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'

// Datos de ejemplo para la galería. Puedes cambiarlos luego por los de Supabase/Cloudinary.
const mockData = [
  {
    id: 1,
    title: 'Feel the Pain',
    img: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 2,
    title: 'The Lookback',
    img: 'https://images.unsplash.com/photo-1522273400909-fd1a8f77637e?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 3,
    title: 'Surf Timeline',
    img: 'https://images.unsplash.com/photo-1544414166-513ed8c3a9de?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 4,
    title: 'Index 2026',
    img: 'https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 5,
    title: 'Better Off',
    img: 'https://images.unsplash.com/photo-1510137600163-2729bc6959a6?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 6,
    title: 'Studio Session',
    img: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&q=80&w=800',
  },
]

export default function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const [items] = useState(mockData)

  // Ref para manejar la física base desconectada del render principal de React (mejor performance)
  const physics = useRef({
    targetX: 0,
    currentX: 0,
    isDragging: false,
    startX: 0,
    dragStartX: 0,
    velocity: 0,
    lastTime: 0,
    lastX: 0,
  })

  const layout = useRef({
    singleSetWidth: 0,
    windowWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
  })

  useEffect(() => {
    // Función para calcular el ancho exacto de UNO de los sets duplicados.
    const measure = () => {
      if (!trackRef.current) return
      const firstSet = trackRef.current.children[0] as HTMLElement
      if (firstSet) {
        layout.current.singleSetWidth = firstSet.offsetWidth
      }
      layout.current.windowWidth = window.innerWidth
    }

    measure()
    // Si hay fuentes o imágenes cargando despacio, re-medimos por las dudas
    const timer = setTimeout(measure, 500)
    window.addEventListener('resize', measure)

    let reqId: number

    // Render loop usando RequestAnimationFrame (alrededor de 60fps constantes)
    const render = (time: number) => {
      const p = physics.current
      const l = layout.current

      if (!p.isDragging) {
        // Al soltar aplicamos la inercia retenida en velocity
        p.targetX += p.velocity
        p.velocity *= 0.95 // Fricción
        if (Math.abs(p.velocity) < 0.01) p.velocity = 0
      }

      // Lerp (suavizado)
      p.currentX += (p.targetX - p.currentX) * 0.08

      const diff = p.currentX - p.lastX
      p.lastX = p.currentX

      if (l.singleSetWidth > 0 && trackRef.current) {
        const w = l.singleSetWidth

        const mod = ((-p.currentX % w) + w) % w
        const visualX = -w - mod

        // let rotateZ = diff * 0.08
        // rotateZ = Math.max(-6, Math.min(6, rotateZ))

        let rotateZ = diff * 0.15
        rotateZ = Math.max(-15, Math.min(15, rotateZ))

        let rotateY = diff * -0.2
        rotateY = Math.max(-20, Math.min(20, rotateY))

        trackRef.current.style.transform = `translate3d(${visualX}px, 0, 0)`

        const cards = trackRef.current.querySelectorAll('.js-gallery-card')
        cards.forEach((card: any) => {
          card.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
        })
      }

      reqId = requestAnimationFrame(render)
    }

    reqId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', measure)
      clearTimeout(timer)
      cancelAnimationFrame(reqId)
    }
  }, [])

  // ─── LÓGICA DE EVENTOS DEL DRAG ───
  const onPointerDown = (e: React.PointerEvent) => {
    const p = physics.current
    p.isDragging = true
    p.startX = e.clientX
    p.dragStartX = p.targetX
    p.velocity = 0
    p.lastTime = performance.now()

    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing'
    }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const p = physics.current
    if (!p.isDragging) return

    const delta = e.clientX - p.startX
    p.targetX = p.dragStartX + delta

    const now = performance.now()
    const dt = now - p.lastTime
    if (dt > 0) {
      const v = delta / dt
      p.velocity = v * 16 // Normalizando inercia
    }
    p.lastTime = now
    p.startX = e.clientX
    p.dragStartX = p.targetX
  }

  const onPointerUp = () => {
    const p = physics.current
    p.isDragging = false
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab'
    }
  }

  return (
    <div
      ref={containerRef}
      className='w-full h-full relative overflow-hidden flex items-center '
      style={{ touchAction: 'none', cursor: 'grab', userSelect: 'none' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onPointerCancel={onPointerUp}>
      <div
        ref={trackRef}
        className='flex will-change-transform items-center'>
        {/* Usar 4 sets asegura que SIEMPRE exista de donde leer y mostrar contenido aunque agarres una ventana ancha */}
        {[0, 1, 2, 3].map((setIndex) => (
          <div
            key={`set-${setIndex}`}
            className='flex items-center shrink-0 pr-8 lg:pr-16 gap-8 lg:gap-16'>
            {items.map((item, i) => (
              <div
                key={`${setIndex}-${item.id}`}
                className='js-gallery-card shrink-0'
                style={{
                  width: '22vw',
                  minWidth: '220px',
                  maxWidth: '320px',
                  height: i % 2 === 0 ? '40vh' : '55vh',
                  minHeight: i % 2 === 0 ? '300px' : '400px',
                }}>
                <div className='js-gallery-card-inner relative w-full h-full overflow-hidden bg-gray-200 origin-center will-change-transform'>
                  <img
                    src={item.img}
                    alt=''
                    draggable={false}
                    className='absolute inset-0 w-full h-full object-cover pointer-events-none'
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
