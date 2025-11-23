
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const Contact = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.from('.anim-text', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
      })
      .from('.social-link', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      }, '-=0.5')

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className='min-h-screen bg-black text-white px-4 py-24 sm:px-8 md:px-16 lg:px-24 flex flex-col justify-center'>
      <div className='max-w-7xl mx-auto w-full'>
        
        <div className='mb-16 md:mb-32'>
          <h1 className='anim-text text-[10vw] leading-[0.9] font-black font-title tracking-tighter uppercase text-white mix-blend-difference'>
            Let's work <br /> <span className='text-[#2269E1]'>Together</span>
          </h1>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32'>
          
          <div className='anim-text space-y-8'>
            <div>
              <h2 className='text-sm font-bold uppercase tracking-widest text-gray-500 mb-4'>Email</h2>
              <a href="mailto:Kellmer002@gmail.com" className='text-2xl md:text-4xl font-primary font-bold hover:text-[#2269E1] transition-colors duration-300 break-all'>
                Kellmer002@gmail.com
              </a>
            </div>
            
            <div>
              <h2 className='text-sm font-bold uppercase tracking-widest text-gray-500 mb-4'>Location</h2>
              <p className='text-xl md:text-2xl font-primary text-gray-300'>
                Buenos Aires, Capital Federal, Argentina
              </p>
            </div>
          </div>

          <div>
            <h2 className='anim-text text-sm font-bold uppercase tracking-widest text-gray-500 mb-6'>Socials</h2>
            <ul className='space-y-4'>
              {['Instagram', 'Linkedin', 'Behance'].map((social) => (
                <li key={social} className='social-link'>
                  <a href="#" className='text-3xl md:text-5xl font-title font-bold uppercase tracking-tight hover:text-[#2269E1] transition-colors duration-300 flex items-center gap-4 group'>
                    {social}
                    <span className='opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-2xl'>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Contact

