'use client'

import React, { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import HorizontalGallery from './components/HorizontalGallery'
import RevealContainer from '@/src/components/RevealContainer'

gsap.registerPlugin(ScrollTrigger)

const AboutMePage = () => {
  const containerRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const nextSectionRef = useRef<HTMLElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number>(0)

  const aboutMeItems = [
    {
      text: (
        <span className='text-h4'>
          <img
            src='/SemilleroDelMundo.svg'
            className='inline-block w-[1em] h-[1em] mx-1 -mt-2'
            alt=''
          />
          Hincha del Semillero del Mundo
        </span>
      ),
      image: '/images/bicho.png',
    },
    {
      text: (
        <span className='text-h4'>
          Already an{' '}
          <img
            src='/IronMan.svg'
            className='inline-block w-[1em] h-[1em] mx-1 -mt-2'
            alt=''
          />{' '}
          Iron Man
        </span>
      ),
      image: '/images/ironFinished.JPG',
    },
    {
      text: (
        <span className='text-h4'>
          <img
            src='/Adonis.svg'
            className='inline-block w-[1em] h-[1em] mx-1 -mt-2'
            alt=''
          />{' '}
          Padre de Adonis
        </span>
      ),
      image: '/images/Ado.JPEG',
    },
    {
      text: (
        <span className='text-h4'>
          Fanatico de{' '}
          <img
            src='/apple.svg'
            className='inline-block w-[1em] h-[1em] mx-1 -mt-2'
            alt=''
          />{' '}
          Steve Jobs
        </span>
      ),
      image: '/images/steave.jpg',
    },
    {
      text: (
        <span className='text-h4'>
          <img
            src='/Libros.svg'
            className='inline-block w-[1.1em] h-[1.1em] mx-1 -mt-2'
            alt=''
          />{' '}
          Lector de biografias
        </span>
      ),
      image: '/images/bio.JPEG',
    },
  ]

  const annualGoals = [
    {
      id: '(a)',
      title: 'Derpa.io',
      description:
        'Creacion de aplicacion web, con el objetivo claro de simplificar la buscaqueda de viviendas online, y mejorar la experiencia de alquiler de viviendas.Integrando inteligencia artificial para facililtar la busqueda y al mismo tiempo crear una buena experiencia de busqueda.',
    },
    {
      id: '(b)',
      title: 'Agency Digital Experience',
      description:
        'Me encataria trabajar para una agencia de diseño digital para poder crecer profesionalmente y trabajar con los mejores profesionales de la industria.',
    },
    {
      id: '(c)',
      title: 'Desarrollar mi primer aplicacion',
      description:
        'Tengo muchas ideas en mente, y me gustaria poder desarrollarlas y lanzarlas al mercado. Quiero crear algo que pueda ayudar a las personas y que sea útil sin hacer un flujo complejo sino poder innovar con el nuevo alcance de las tecnologias y poder integrar e ir a fondo con herramientas de inteligencia artificil.',
    },
  ]

  useGSAP(
    () => {
      // 1. Pin de la sección inicial (hero).
      // Cuando su parte inferior llega a la parte inferior de la ventana, se fija.
      // 'pinSpacing: false' permite que la siguiente sección pase por encima.
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'bottom bottom',
        // Se mantiene pinneado la misma distancia que mide la siguiente sección (100vh)
        end: () =>
          `+=${nextSectionRef.current?.offsetHeight || window.innerHeight}`,
        pin: true,
        pinSpacing: false,
      })

      // 2. Pin del siguiente contenedor.
      // Cuando su parte superior llega a la parte superior de la ventana (completa la pantalla), se fija.
    },
    { scope: containerRef },
  )

  return (
    <RevealContainer className=''>
      {/* Contenedor Hero Inicial */}
      <section
        ref={containerRef}
        className='layout-wrap relative w-full flex flex-col font-sans overflow-x-hidden'>
        <div
          ref={heroRef}
          className='relative w-full h-[200svh] z-10'>
          <section className=' z-10 layout-grid mix-blend-difference h-[100svh]'>
            <h1 className='text-h3 select-none w-full col-span-8 col-start-2 pt-36 '>
              En el juego desde hace ya 4 años, <br/>actualemente me encuentro
              viviendo en Argentina Buenos Aires, <br/>y me dedico a crear
              experiencias y productos digitales.
            </h1>
          </section>
          <section className=' layout-grid text-white h-[100svh] flex flex-col  justify-end  '>
            <h1 className='text-h3 w-full col-span-5 col-start-7 self-end pb-32  text-end'>
              Entusiasma en crear experiencias memorables<br/> , apalancandome de la
              web o de tu celular,<br/> usando diseños creativos,<br/> e tecnologias
              novedosas.
            </h1>
          </section>
          <section className='absolute inset-0 w-full h-full  flex items-center justify-center -z-10 '>
            <div className=' bg-white flex items-center w-2/3  h-2/3  justify-center relative overflow-hidden'>
              <img
                src='/images/hero.JPEG'
                alt='GIF'
                className='w-full h-full object-cover  '
              />
            </div>
          </section>
        </div>
      </section>

      {/* Siguiente Sección */}
      <section
        ref={nextSectionRef}
        className='relative z-20 w-full layout-grid h-[100svh] bg-bg-secondary overflow-hidden'>
        <div className='col-span-5 relative h-full w-full '>
          {aboutMeItems.map((item, index) => (
            <img
              key={index}
              src={item.image}
              className={`absolute top-0 left-0 object-cover h-full w-full transition-opacity duration-500 ease-in-out ${
                hoveredIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              alt=''
            />
          ))}
        </div>
        <div className='col-span-7 flex flex-col justify-start pt-8 pr-8 h-full z-20 pointer-events-none'>
          <ul className='flex flex-col  text-end w-full'>
            {aboutMeItems.map((item, index) => (
              <li
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                className={`text-h3 transition-opacity duration-300 pointer-events-auto cursor-default text-bg ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-35'
                }`}>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sección Objetivos Anuales (Pin) */}
      <section className='relative w-full z-10 layout-grid bg-bg text-bg-secondary items-start border-t border-bg/10'>
        {/* Lado Izquierdo Pinned */}
        <div className='col-span-12 md:col-span-6 sticky top-0 h-[100vh] flex flex-col justify-between  pl-16 pt-32  '>
          <div className='flex flex-col gap-12'>
            
            <h2 className='text-h4 font-light max-w-xl'>
              <span className='inline-block w-6 h-6 rounded-full bg-bg mr-4 mb-2 align-middle'></span>
              Antecedentes en Website design, application design, interactive design,
              prototyping, ecommerce. Pero el foco este año es el desarrollo de
              software
            </h2>
          </div>

          <div className='w-full max-w-[300px] h-[350px] overflow-hidden mix-blend-darken opacity-90 pb-8'>
            <img
              src='/images/AboutMe.gif'
              className='w-full h-full object-cover grayscale'
              alt='illustration placeholder'
            />
          </div>
        </div>

        {/* Lado Derecho Escroleable */}
        <div className='col-span-12 md:col-span-6 md:col-start-9 flex flex-col pt-8 pb-[20vh]'>
          {annualGoals.map((goal, index) => (
            <div
              key={index}
              className='flex flex-col lg:flex-row gap-4 lg:gap-16 py-24 border-b border-bg/10 last:border-none'>
              <div className='text-2xl font-light w-12 shrink-0'>{goal.id}</div>
              <div className='flex flex-col gap-8'>
                <h3 className='text-4xl md:text-5xl tracking-[-0.04em] font-normal'>
                  {goal.title}
                </h3>
                <p className='text-lg leading-[1.65] opacity-75 font-light max-w-sm'>
                  {goal.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </RevealContainer>
  )
}

export default AboutMePage
