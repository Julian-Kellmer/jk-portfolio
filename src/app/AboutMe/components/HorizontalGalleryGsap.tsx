'use client'

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

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
  // {
  //   id: 6,
  //   title: 'Studio Session',
  //   img: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&q=80&w=800',
  // },
]

export default function HorizontalGalleryGsap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const [items] = useState(mockData)

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

  // GSAP quickSetters para máximo performance en la animación de los CSS props
  const gsapSetters = useRef<{ trackX?: any; cards?: any[] }>({})

  // Re-calcula el tamaño del set y actualiza animaciones iniciales
  const measure = () => {
    if (!trackRef.current) return
    const firstSet = trackRef.current.children[0] as HTMLElement
    if (firstSet) {
      layout.current.singleSetWidth = firstSet.offsetWidth
    }
    layout.current.windowWidth = window.innerWidth
  }

  useGSAP(
    () => {
      measure()
      const timer = setTimeout(measure, 500)
      window.addEventListener('resize', measure)

      gsapSetters.current.trackX = gsap.quickSetter(trackRef.current, 'x', 'px')

      const cards3d = document.querySelectorAll('.js-gsap-card-3d')
      const cardMedias = document.querySelectorAll('.js-gsap-card-media')
      const cardImgs = document.querySelectorAll('.js-gsap-card-img')

      gsapSetters.current.cards = Array.from(cards3d).map((card, i) => ({
        card3d: card,
        rotateY: gsap.quickSetter(card, 'rotationY', 'deg'),
        rotateX: gsap.quickSetter(card, 'rotationX', 'deg'),
        z: gsap.quickSetter(card, 'z', 'px'),
        innerX: gsap.quickSetter(cardMedias[i], 'x', 'px'),
        scale: gsap.quickSetter(cardImgs[i], 'scale'),
      }))

      const render = (time: number, deltaTime: number) => {
        const p = physics.current
        const l = layout.current

        if (!p.isDragging) {
          // Inercia básica
          p.targetX += p.velocity
          p.velocity *= 0.95
          if (Math.abs(p.velocity) < 0.01) p.velocity = 0
        }

        // Lerp custom
        p.currentX += (p.targetX - p.currentX) * 0.08
        const diff = p.currentX - p.lastX
        p.lastX = p.currentX

        if (l.singleSetWidth > 0 && gsapSetters.current.trackX) {
          const w = l.singleSetWidth
          const mod = ((-p.currentX % w) + w) % w
          const visualX = -w - mod

          // Cálculo de transformaciones en base a la velocidad "diff"
          const clamp = (min: number, max: number, val: number) => Math.max(min, Math.min(max, val))

          const rotateY = clamp(-14, 14, diff * -0.18)
          const rotateX = clamp(-4, 4, Math.abs(diff) * 0.02)
          const z = clamp(0, 40, Math.abs(diff) * 1.4)
          const innerX = clamp(-18, 18, diff * -0.35)
          const scale = clamp(1.02, 1.08, 1 + Math.abs(diff) * 0.0015)

          // Actualización GSAP: Aplicar propiedades de forma super rápida a todo el track y cartas
          gsapSetters.current.trackX(visualX)

          if (gsapSetters.current.cards) {
            gsapSetters.current.cards.forEach((cs: any) => {
              cs.rotateY(rotateY)
              cs.rotateX(rotateX)
              cs.z(z)
              cs.innerX(innerX)
              cs.scale(scale)
            })
          }
        }
      }

      gsap.ticker.add(render)

      return () => {
        window.removeEventListener('resize', measure)
        clearTimeout(timer)
        gsap.ticker.remove(render)
      }
    },
    { scope: containerRef },
  )

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
      // GSAP animate cursor feedback or scale container slightly on grip
      gsap.to(containerRef.current, {
        scale: 0.99,
        duration: 0.3,
        ease: 'power2.out',
      })
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
      p.velocity = v * 16
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
      gsap.to(containerRef.current, {
        scale: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      })
    }
  }

  return (
    <div
      ref={containerRef}
      className='w-full h-full relative overflow-hidden flex items-center py-16'
      style={{
        touchAction: 'none',
        cursor: 'grab',
        userSelect: 'none',
        perspective: '1100px',
        perspectiveOrigin: 'center center',
        transformStyle: 'preserve-3d',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onPointerCancel={onPointerUp}>
      {/* Título Identificador */}
        

      <div
        ref={trackRef}
        className='flex will-change-transform items-center'
        style={{ transformStyle: 'preserve-3d' }}>
        {[0, 1, 2, 3].map((setIndex) => (
          <div
            key={`set-${setIndex}`}
            className='flex items-center shrink-0 pr-8 lg:pr-16 gap-8 lg:gap-16'
            style={{ transformStyle: 'preserve-3d' }}>
            {items.map((item, i) => (
              <div
                key={`${setIndex}-${item.id}`}
                className='js-gsap-card-outer shrink-0'
                style={{
                  width: '22vw',
                  minWidth: '220px',
                  maxWidth: '320px',
                  height: i % 2 === 0 ? '40vh' : '55vh',
                  minHeight: i % 2 === 0 ? '300px' : '400px',
                }}>
                <div
                  className='js-gsap-card-3d relative w-full h-full origin-center'
                  style={{
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                    willChange: 'transform',
                  }}>
                  <div className='js-gsap-card-media relative w-full h-full overflow-hidden bg-gray-200'>
                    <img
                      src={item.img}
                      alt=''
                      draggable={false}
                      className='js-gsap-card-img absolute inset-0 w-full h-full object-cover pointer-events-none'
                      style={{ willChange: 'transform' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
