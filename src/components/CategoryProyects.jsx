import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import { useEffect, useRef } from "react"
import CategoryCard from "./CategoryCard"
import { Link } from "react-router-dom"

gsap.registerPlugin(ScrollTrigger)

const fakedata = [
  { title: 'Motion Graphics', img: '/images/BurgerKing.jpg', nombre: 'agostina caunedo', desc: 'Este proyecto tuvo comienzos en la ciudad de buenos aires donde el objetivo era dar visibilidad a la marca y lograr posicinarlo en el mercado gastronomico. Agostina caunedo lidero, la funcion cratvia tanto de movimiento.' },
  { title: '3d Design', img: '/images/sony.png', nombre: 'agostina caunedo', desc: 'Este proyecto tuvo comienzos en la ciudad de buenos aires donde el objetivo era dar visibilidad a la marca y lograr posicinarlo en el mercado gastronomico. Agostina caunedo lidero, la funcion cratvia tanto de movimiento.' },
  { title: 'Desarrollo Web ', img: '/images/Alucorp.jpg', nombre: 'agostina caunedo', desc: 'Este proyecto tuvo comienzos en la ciudad de buenos aires donde el objetivo era dar visibilidad a la marca y lograr posicinarlo en el mercado gastronomico. Agostina caunedo lidero, la funcion cratvia tanto de movimiento.' }
]


const CategoryProyects = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const sections = gsap.utils.toArray(".category-panel")
    const container = containerRef.current

    const ctx = gsap.context(() => {
      // 🔥 GUARDAR la referencia de la animación horizontal
      const horizontalTl = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 0.2,
          end: () => `+=${container.offsetWidth}`,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          id: "category-horizontal"
        }
      })

      // 🔥 MOVER el forEach DENTRO del context
      sections.forEach((section, index) => {
        const title = section.querySelector('#title')
        const info = section.querySelector('#info')
        const imageCont = section.querySelector('#image-cont')

        if (title && info && imageCont) {


          gsap.to(title, {
            x: 150,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              containerAnimation: horizontalTl, // 🔥 Usar la referencia correcta
              start: index === 0 ? 'left left' : 'left right',
              end: 'right left',
              scrub: 1, // Más lento
              id: `parallax-text-${index}` // 🔥 ID único
            }
          })



        }
      })

    }, container) // 🔥 Cerrar el context correctamente

    return () => ctx.revert()
  }, [])

  return (
    <div className="w-full overflow-hidden bg-black">
      <div ref={containerRef} className="category-cont flex w-[400vw] bg-black h-screen">
        {[...fakedata, { isButton: true }].map((item, index) => (
          item.isButton ? (
            // ÚLTIMO PANEL - BOTÓN
            <Link to="/gallery" className="">


              <div key="button-panel" className="gap-8 category-panel shrink-0 w-screen h-full flex items-center justify-center">
                <h1 className="text-white text-6xl tracking-none leading-tight font-primary capitalize">see all</h1>
                <div className=" flex justify-center align-center w-20 h-20 bg-[#2269E1] rounded-full">
                  <img src="/Arrow.svg" className="object-contain p-4" alt="" />
                </div>
              </div>
            </Link>
          ) : (
            <CategoryCard title={item.title} img={item.img} name={item.nombre} desc={item.desc} />
          )
        ))}
      </div>
    </div>
  )
}

export default CategoryProyects