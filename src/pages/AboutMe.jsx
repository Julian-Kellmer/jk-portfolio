import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

const AboutMe = () => {
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
      }).from(
        '.skill-item',
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.5'
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const skills = [
    { name: 'React', level: 'Expert' },
    { name: 'Next.js', level: 'Expert' },
    { name: 'GSAP', level: 'Love it' },
    { name: 'Three.js', level: 'Advanced' },
    { name: 'Figma', level: 'Proficient' },
    { name: 'Blender', level: 'Creative' },
    { name: 'SupaBase', level: 'Advanced' },
    { name: 'Flutter', level: 'Progressive' },
  ]

  return (
    <div
      ref={containerRef}
      className='min-h-screen bg-black text-white px-4 py-24 sm:px-8 md:px-16 lg:px-24 flex flex-col justify-center'>
      <div className='max-w-7xl mx-auto w-full'>
        {/* Header / Hero */}
        <div className='mb-16 md:mb-32'>
          <h1 className='anim-text text-[12vw] leading-[0.9] font-black font-title  uppercase text-[#2269E1] mix-blend-difference'>
            Julian <br /> Kellmer
          </h1>
          <p className='anim-text text-xl md:text-3xl font-primary mt-8 max-w-2xl text-gray-400 leading-relaxed'>
            Product Developer situado en Buenos Aires.
          </p>
        </div>

        {/* Bio & Skills Layout */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32'>
          {/* Bio Section */}
          <div className='anim-text'>
            <h2 className='text-sm font-bold uppercase tracking-widest text-gray-500 mb-6'>
              About
            </h2>
            <p className='text-xl md:text-2xl font-primary leading-relaxed text-gray-200'>
              Me especializo en el desarrollo de productos digitales, combinando{' '}
              <span className='text-white font-bold'>React</span> y{' '}
              <span className='text-white font-bold'>Next.js</span> para crear
              soluciones escalables y de alto impacto. Mi enfoque une la
              ingeniería con el diseño creativo mediante{' '}
              <span className='text-[#2269E1] font-bold'>GSAP</span> y{' '}
              <span className='text-[#2269E1] font-bold'>Three.js</span>,
              utilizando <span className='text-white font-bold'>Figma</span> y{' '}
              <span className='text-white font-bold'>Blender</span> para
              materializar productos que priorizan la experiencia del usuario y
              la innovación técnica.
            </p>
          </div>

          {/* Skills Section */}
          <div>
            <h2 className='anim-text text-sm font-bold uppercase tracking-widest text-gray-500 mb-6'>
              Stack
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4'>
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className='skill-item border-b border-white/20 py-4 flex justify-between items-end group hover:border-[#2269E1] transition-colors duration-300'>
                  <span className='text-2xl md:text-3xl font-title font-bold tracking-tight group-hover:text-[#2269E1] transition-colors duration-300'>
                    {skill.name}
                  </span>
                  <span className='text-sm text-gray-500 font-primary uppercase tracking-wider'>
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact / Footer */}
        <div className='mt-32 anim-text'>
          <h2 className='text-sm font-bold uppercase tracking-widest text-gray-500 mb-6'>
            Contacto
          </h2>
          <a
            href='mailto:Kellmer002@gmail.com'
            className='text-4xl md:text-6xl lg:text-8xl font-black font-title  hover:text-[#2269E1] transition-colors duration-300 break-all'>
            Kellmer002@gmail.com
          </a>
        </div>
      </div>
    </div>
  )
}

export default AboutMe
