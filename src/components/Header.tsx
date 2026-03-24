'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './Header.module.css'
import TransitionLink from './TransitionLink'

const navLinks = [
  { label: 'Acerca de mí', href: '/AboutMe' },
  { label: 'Mis Trabajos', href: '/gallery' },
]

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [linksVisible, setLinksVisible] = useState(false)

  // Lock scroll + freeze WebGL canvas while menu is open
  useEffect(() => {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement | null

    if (menuOpen || contactOpen) {
      document.body.style.overflow = 'hidden'
      if (menuOpen)
        document.documentElement.setAttribute('data-menu-open', 'true')
      if (canvas) canvas.style.pointerEvents = 'none'
    } else {
      document.body.style.overflow = ''
      document.documentElement.removeAttribute('data-menu-open')
      if (canvas) canvas.style.pointerEvents = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.documentElement.removeAttribute('data-menu-open')
      if (canvas) canvas.style.pointerEvents = ''
    }
  }, [menuOpen, contactOpen])

  // When the menu opens, wait for the slide-up animation to finish
  // before revealing the nav links
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (menuOpen) {
      // ~600ms = duration of the slide-up transition
      timer = setTimeout(() => setLinksVisible(true), 600)
    } else {
      setLinksVisible(false)
    }
    return () => clearTimeout(timer)
  }, [menuOpen])

  const handleClose = () => {
    setMenuOpen(false)
    setContactOpen(false)
  }

  return (
    <>
      <header
        className={`${styles.header} ${menuOpen ? styles.headerMenuOpen : ''}`}>
        {/* Left – Logo */}
        <div className={styles.logoWrapper}>
          <TransitionLink href='/' onClick={handleClose}>
            <Image
              src='/logoTerminado.svg'
              alt='Julian Kellmer logo'
              width={64}
              height={64}
              priority
              className={styles.logo}
            />
          </TransitionLink>
        </div>

        {/* Right – Open / Close Menu button */}
        <div className='flex gap-4'>
          <button
            className={`${styles.menuBtn} ${contactOpen ? styles.menuBtnOpen : ''} text-body text-secondary`}
            onClick={() => {
              setContactOpen(true)
              setMenuOpen(false)
            }}
            aria-label='Open Contact'>
            <span className={styles.menuLabel}>Contact</span>
          </button>
          <button
            className={`${styles.menuBtn} ${menuOpen ? styles.menuBtnOpen : ''} text-body  text-secondary  `}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}>
            <span className={styles.menuLabel}>
              {menuOpen ? 'Close Menu' : 'Open Menu'}
            </span>
          </button>
        </div>
      </header>

      {/* ── Fullscreen Nav Overlay ── */}
      <div
        className={`${styles.navOverlay} ${menuOpen ? styles.navOverlayOpen : ''}`}
        aria-hidden={!menuOpen}>
        <nav className={`${styles.navLinks} flex flex-col justify-between`}>
          <div>
            {navLinks.map((link, i) => (
              <TransitionLink
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${linksVisible ? styles.navLinkVisible : ''} text-h2 w-full justify-between flex items-center `}
                style={{
                  transitionDelay: linksVisible ? `${i * 100}ms` : '0ms',
                }}
                onClick={handleClose}>
                {link.label}
                <span className={styles.navLinkArrow}>→</span>
              </TransitionLink>
            ))}
          </div>
          <div className='flex w-full justify-end '>
            <div className='self end flex gap-4'>
              <Image
                src='/GitHub.svg'
                alt='GitHub'
                width={28}
                height={28}
              />
              <Image
                src='/Linkedin.svg'
                alt='Linkedin'
                width={28}
                height={28}
              />
              <Image
                src='/Email.svg'
                alt='Email'
                width={28}
                height={28}
              />
            </div>
          </div>
        </nav>
      </div>

      {/* ── Contact Modal Overlay ── */}
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-700 bg-[#0a0a0a]/90 backdrop-blur-2xl ${
          contactOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!contactOpen}>
        <button
          onClick={() => setContactOpen(false)}
          className='absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors'>
          <svg
            width='14'
            height='14'
            viewBox='0 0 14 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M1 1L13 13M13 1L1 13'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>

        <div className='w-full max-w-5xl px-6 flex flex-col'>
          <div className='flex items-center gap-3 text-white/50 text-small'>
            <span className='w-1.5 h-1.5 rounded-full border border-white/50'></span>
            Hablemos
          </div>
          <h2 className='text-white text-4xl md:text-[5rem] leading-[1.1] font-medium tracking-tight mb-16 max-w-2xl'>
            ¡Hola! Es un gusto conocerte.
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Card 1: Email */}
            <a
              href='https://mail.google.com/mail/?view=cm&fs=1&to=kellmer002@gmail.com'
              target='_blank'
              rel='noopener noreferrer'
              className='group relative rounded-3xl bg-white/[0.04] border border-white/10 p-10 flex flex-col justify-between min-h-[300px] md:min-h-[340px] hover:bg-white/[0.08] hover:scale-[1.02] transition-all duration-300'>
              <div className='flex flex-col gap-8'>
                <div className='flex items-center gap-3 text-body'>
                  <span className='text-body w-2 h-2 rounded-full bg-white'></span>
                  colaboremos
                </div>
                <h3 className='text-white text-3xl md:text-4xl font-normal tracking-tight pr-8 leading-snug'>
                  Me interesa trabajar juntos.
                </h3>
              </div>
              <div className='w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors mt-8'>
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M5 12H19M19 12L12 5M19 12L12 19'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
            </a>

            {/* Card 2: WhatsApp */}
            <a
              href='https://wa.me/541166161929'
              target='_blank'
              rel='noopener noreferrer'
              className='group relative rounded-3xl bg-white/[0.04] border border-white/10 p-10 flex flex-col justify-between min-h-[300px] md:min-h-[340px] hover:bg-white/[0.08] hover:scale-[1.02] transition-all duration-300'>
              <div className='flex flex-col gap-8'>
                <div className='flex items-center gap-3 text-body'>
                  <span className='text-body w-2 h-2 rounded-full bg-white'></span>
                  Contactame
                </div>
                <h3 className='text-white text-3xl md:text-4xl font-normal tracking-tight pr-8 leading-snug'>
                  Hablemos.
                </h3>
              </div>
              <div className='w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors mt-8'>
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M5 12H19M19 12L12 5M19 12L12 19'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
