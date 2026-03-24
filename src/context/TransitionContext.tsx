'use client'

import { createContext, useContext, useCallback, useState, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

type Phase = 'idle' | 'covering' | 'covered' | 'uncovering'

const TransitionContext = createContext<{
  phase: Phase
  navigate: (href: string) => void
}>({ phase: 'idle', navigate: () => {} })

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [phase, setPhase] = useState<Phase>('idle')
  const busy = useRef(false)
  const prevPathname = useRef(pathname)

  const navigate = useCallback(
    (href: string) => {
      if (busy.current) return
      busy.current = true

      setPhase('covering')

      // Wait for cover animation to finish, then push the new route
      setTimeout(() => {
        prevPathname.current = pathname
        router.push(href)
        setPhase('covered')
      }, 700)
    },
    [router, pathname],
  )

  // When pathname changes while covered → new page rendered → uncover
  useEffect(() => {
    if (phase === 'covered' && pathname !== prevPathname.current) {
      setPhase('uncovering')
      setTimeout(() => {
        setPhase('idle')
        busy.current = false
      }, 750)
    }
  }, [pathname, phase])

  return (
    <TransitionContext.Provider value={{ phase, navigate }}>
      {children}
    </TransitionContext.Provider>
  )
}

export const usePageTransition = () => useContext(TransitionContext)
