import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import { useEffect, useRef } from "react"

gsap.registerPlugin(ScrollTrigger)
const fakedata = [
    { name: 'Sienna', img: '/images/Sienna.png' },
    { name: 'Aromatik', img: '/images/Aromatik.png' },
    { name: 'Cafe Delirante', img: '/images/cafedelirante.png' },
    { name: 'Tengo todo Tecnmo', img: '/images/tengoTodoTecno.png' },]
const Home = () => {
    const widthScreen = window.innerWidth
    const heightScreen = window.innerHeight
    const mobile = widthScreen <= 400
    const compu = widthScreen > 400

    const containerRef = useRef(null)
    const overlayRef = useRef(null)
    useEffect(() => {

        if (!containerRef.current) return

        const sections = gsap.utils.toArray(".home-panel")
        const container = containerRef.current
        const overlay = overlayRef.current

        const ctx = gsap.context(() => {
            gsap.to(sections, {
                xPercent: -100 * (sections.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    pin: true,
                    scrub: 0.2,
                    end: () => `+=${container.offsetWidth}`,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    // 🔥 ID ÚNICO para este ScrollTrigger
                    id: "home-horizontal"
                }
            })

            gsap.to(overlay, {
                x: '-40vw',
                y: '10vh', // Se mueve una pantalla completa hacia izquierda
                ease: 'none',
                scrollTrigger: {
                    trigger: overlay, // ✅ MISMO trigger que los paneles
                    start: 'top top',   // ✅ Comienza cuando el container tope la parte superior
                    end: () => `+=${container.offsetWidth}`, // ✅ offsetWidth (sin typo)
                    scrub: 0.2,         // ✅ MISMO scrub para sincronización
                    pin: false,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    id: 'overlay-movement'
                }
            })


        }, container)

        return () => ctx.revert()

    }, [])

    return (
        compu ? (
            <div className="w-full overflow-hidden bg-red-">
                {/* 🔥 CLASES ÚNICAS */}
                <div ref={containerRef} className="home-cont relative flex w-[200vw] h-screen">
                    <div className="home-panel shrink-0 w-screen h-full flex p-32">
                        <div className="w-1/2">
                            <h1 className="leading-none tracking-tighter capitalize font-primary text-[96px] mb-4">Agencia creativa multimedial</h1>
                            <p className="text-[32px] leading-none tracking-tighter">Diseñamos y Creamos para Creativos....</p>
                            <p className="text-[32px] text-gray-500 leading-none tracking-tighter">No para apurados</p>
                        </div>
                    </div>
                    <div className="home-panel shrink-0 w-screen h-full flex p-24">
                        <div className="w-full flex flex-col">
                            <h3 className="font-title self-end text-[96px]">Mis ultimos trabajos</h3>
                            <div className="w-full flex justify-end">
                                <ul className="text-end font-title text-[64px]">
                                    {fakedata.map((job, index) => {
                                        return (
                                            <li key={index}>{job.name}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div ref={overlayRef} className="absolute w-full h-screen justify-center items-center inset-0 flex">
                        <div className="w-[958px] h-[560px] bg-black p-3 rounded-3xl relative translate-x-[-30vw]">
                            <div className="w-full h-full bg-gray-400 rounded-2xl overflow-hidden">
                                <img src="/images/background.png" className="w-full h-full object-cover" alt="mockup background" />
                            </div>
                            <div className="w-[270px] h-[30px] bg-black absolute top-0 left-[355px] rounded-xl">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : <>
        <section>

        </section>
        </>
    )
}

export default Home