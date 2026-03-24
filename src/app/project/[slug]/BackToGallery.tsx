'use client'

import TransitionLink from '@/src/components/TransitionLink'

export default function BackToGallery() {
  return (
    <TransitionLink
      href='/gallery'
      className='px-4 py-2 rounded-full bg-white/80 backdrop-blur-md text-body text-black hover:bg-white/50 transition-colors duration-300'>
      Back to Gallery
    </TransitionLink>
  )
}
