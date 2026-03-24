'use client'

import HeroFace from '../components/HeroFace'
import TransitionLink from '../components/TransitionLink'
import RevealContainer from '../components/RevealContainer'

export default function Home() {
  return (
    <RevealContainer className='grid grid-cols-12 min-h-screen bg-[#111111] text-white relative items-center overflow-hidden'>
      {/* Col 1 */}
      <div className='col-span-1'></div>

      {/* Cols 2 a 7 */}
      <section className='col-span-6 flex flex-col justify-center gap-8 z-10 relative'>
        <h1 className='text-h1'>
          Creo experiencias <br />
          Simplifico procesos
        </h1>

        <h2 className='text-h4'>
          Hola yo soy <span className='text-blue-500 font-normal'>Julian</span>{' '}
          <br />
          Frontend & AI Engineer
        </h2>

        <div className='mt-8 flex gap-8'>
          <TransitionLink
            href='/AboutMe'
            className='text-small hover:text-gray-300 transition-colors underline-offset-4'>
            Conoce un poco más de mí
          </TransitionLink>
          <TransitionLink
            href='/gallery'
            className='text-small hover:text-gray-300 transition-colors underline-offset-4'>
            Ver mis obras de arte
          </TransitionLink>
        </div>
      </section>

      {/* Cols 8 a 11 */}
      <section className='col-span-4 flex items-center justify-center relative'>
        <HeroFace />
      </section>

      {/* Col 12 */}
      <div className='col-span-1'></div>
    </RevealContainer>
  )
}
