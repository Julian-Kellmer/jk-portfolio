'use client'

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
// Since public/JulianFace.tsx is not picked up, let's assume it has been moved to JulianFaceSVG
import JulianFaceSVG from './JulianFaceSVG'

export default function HeroFace() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.to(containerRef.current, {
        y: -15,
        rotationZ: 2,
        duration: 2.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })

      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return

        const { innerWidth, innerHeight } = window

        const x = (e.clientX / innerWidth) * 2 - 1
        const y = (e.clientY / innerHeight) * 2 - 1

        gsap.to(containerRef.current, {
          rotationY: x * 10,
          rotationX: -y * 10,
          transformPerspective: 900,
          transformOrigin: 'center center',
          ease: 'power2.out',
          duration: 0.5,
        })

        const maxPupilMoveX = 16
        const maxPupilMoveY = 16

        gsap.to('#right-pupil-container', {
          x: x * maxPupilMoveX,
          y: y * maxPupilMoveY,
          ease: 'power2.out',
          duration: 0.2,
        })

        gsap.to('#left-pupil-container', {
          x: x * maxPupilMoveX,
          y: y * maxPupilMoveY,
          ease: 'power2.out',
          duration: 0.2,
        })
      }

      window.addEventListener('mousemove', handleMouseMove)

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    },
    { scope: containerRef },
  )

  return (
    <div className='w-full h-full flex items-center justify-center relative perspective-[1200px]'>
      <div
        ref={containerRef}
        className='w-full max-w-[500px] drop-shadow-2xl will-change-transform transform-style-preserve-3d'>
        <JulianFaceSVG className='w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]' />
      </div>
    </div>
  )
}
