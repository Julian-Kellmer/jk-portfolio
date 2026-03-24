'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { usePageTransition } from '@/src/context/TransitionContext'

const SELECTOR = 'h1, h2, h3, h4, p, a, button, li'

type Props = {
  children: React.ReactNode
  className?: string
}

export default function RevealContainer({ children, className }: Props) {
  const { phase } = usePageTransition()
  const ref = useRef<HTMLDivElement>(null)
  const viaTransition = useRef(false)

  // On mount: if the page rendered while covered, prepare elements hidden
  useEffect(() => {
    if (phase === 'covered' && ref.current) {
      viaTransition.current = true
      gsap.set(ref.current.querySelectorAll(SELECTOR), { opacity: 0, y: 25 })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // When curtain is fully gone (idle) → wait 500ms then animate elements in
  useEffect(() => {
    if (phase === 'idle' && viaTransition.current && ref.current) {
      const t = setTimeout(() => {
        if (!ref.current) return
        gsap.fromTo(
          ref.current.querySelectorAll(SELECTOR),
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.04,
          },
        )
        viaTransition.current = false
      }, 200)
      return () => clearTimeout(t)
    }
  }, [phase])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
