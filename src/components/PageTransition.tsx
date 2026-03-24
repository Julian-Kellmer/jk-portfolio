'use client'

import { useEffect, useRef } from 'react'
import { usePageTransition } from '@/src/context/TransitionContext'

const EASE = 'cubic-bezier(0.76, 0, 0.24, 1)'
const DURATION = '0.65s'

export default function PageTransition() {
  const { phase } = usePageTransition()
  const rect1Ref = useRef<HTMLDivElement>(null)
  const rect2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const r1 = rect1Ref.current
    const r2 = rect2Ref.current
    if (!r1 || !r2) return

    if (phase === 'covering') {
      // Slide in from bottom — rect1 (primary) first, rect2 follows 80ms later
      r1.style.transition = `transform ${DURATION} ${EASE}`
      r2.style.transition = `transform ${DURATION} ${EASE} 80ms`
      r1.style.transform = 'translateY(0%)'
      r2.style.transform = 'translateY(0%)'
      r1.style.pointerEvents = 'auto'
      r2.style.pointerEvents = 'auto'
    } else if (phase === 'uncovering') {
      // Both slide out upward simultaneously
      r1.style.transition = `transform ${DURATION} ${EASE}`
      r2.style.transition = `transform ${DURATION} ${EASE}`
      r1.style.transform = 'translateY(-100%)'
      r2.style.transform = 'translateY(-100%)'
    } else if (phase === 'idle') {
      // Reset below the viewport without animating
      r1.style.transition = 'none'
      r2.style.transition = 'none'
      r1.style.transform = 'translateY(100%)'
      r2.style.transform = 'translateY(100%)'
      r1.style.pointerEvents = 'none'
      r2.style.pointerEvents = 'none'
    }
  }, [phase])

  return (
    <>
      {/* Rect 1 — primary color, enters first */}
      <div
        ref={rect1Ref}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9998,
          backgroundColor: 'var(--color-primary)',
          transform: 'translateY(100%)',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />
      {/* Rect 2 — bg color, follows behind */}
      <div
        ref={rect2Ref}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9997,
          backgroundColor: 'var(--color-bg)',
          transform: 'translateY(100%)',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />
    </>
  )
}
