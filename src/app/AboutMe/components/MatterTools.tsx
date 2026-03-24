'use client'

import React, { useEffect, useRef } from 'react'
import Matter from 'matter-js'

const tools = [
  "React", "Next.js", "TypeScript", "Three.js", "WebGL", 
  "TailwindCSS", "Matter.js", "GSAP", "Python", 
  "AI / Local LLMs", "Frontend Nativa", "Framer Motion", "Node.js"
]

const circlesData = [
  { size: 60, classes: "bg-blue-500/20 border-blue-500/50" },
  { size: 100, classes: "bg-purple-500/20 border-purple-500/50" },
  { size: 40, classes: "bg-pink-500/20 border-pink-500/50" },
  { size: 80, classes: "bg-emerald-500/20 border-emerald-500/50" },
  { size: 50, classes: "bg-yellow-500/20 border-yellow-500/50" },
  { size: 120, classes: "bg-white/10 border-white/20" },
]

export default function MatterTools() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Array of refs for each DOM element
  const elementsRef = useRef<(HTMLDivElement | null)[]>([])
  const circleElementsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const { clientWidth: width, clientHeight: height } = container

    // Setup Engine
    const engine = Matter.Engine.create({
       gravity: { x: 0, y: 0.5, scale: 0.01 }
    })
    const world = engine.world

    // Boundaries
    const thickness = 60
    const ground = Matter.Bodies.rectangle(width / 2, height + thickness/2, width, thickness, { isStatic: true })
    const wallLeft = Matter.Bodies.rectangle(-thickness/2, height / 2, thickness, height, { isStatic: true })
    const wallRight = Matter.Bodies.rectangle(width + thickness/2, height / 2, thickness, height, { isStatic: true })
    const ceiling = Matter.Bodies.rectangle(width / 2, -thickness/2, width, thickness, { isStatic: true })

    Matter.Composite.add(world, [ground, wallLeft, wallRight, ceiling])

    // Create bodies for tools
    const bodies = elementsRef.current.map((el, i) => {
      if (!el) return null
      const w = el.offsetWidth
      const h = el.offsetHeight
      
      const x = Math.random() * (width - w) + w/2
      const y = Math.random() * (height/2) + h/2

      return Matter.Bodies.rectangle(x, y, w, h, {
        chamfer: { radius: h / 2.5 },
        restitution: 0.8,
        friction: 0.1,
        frictionAir: 0.02,
      })
    }).filter(Boolean) as Matter.Body[]

    const circleBodies = circlesData.map((circle) => {
      const r = circle.size / 2
      const x = Math.random() * (width - r * 2) + r
      const y = Math.random() * (height/2) + r

      return Matter.Bodies.circle(x, y, r, {
        restitution: 0.9,
        friction: 0.1,
        frictionAir: 0.02,
      })
    })
    
    Matter.Composite.add(world, [...bodies, ...circleBodies])

    // Add mouse control
    const mouse = Matter.Mouse.create(container)
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    })
    
    // Prevent default scroll when interacting with matter canvas or elements
    mouseConstraint.mouse.element.removeEventListener("mousewheel", (mouseConstraint.mouse as any).mousewheel);
    mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", (mouseConstraint.mouse as any).mousewheel);

    Matter.Composite.add(world, mouseConstraint)

    // Run engine
    const runner = Matter.Runner.create()
    Matter.Runner.run(runner, engine)

    // Render loop to update DOM elements
    let animationFrameId: number;

    const updateDOM = () => {
      elementsRef.current.forEach((el, index) => {
        const body = bodies[index]
        if (el && body) {
          const { x, y } = body.position
          // apply the position & rotation, centering via translate
          el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${body.angle}rad)`
        }
      })

      circleElementsRef.current.forEach((el, index) => {
        const body = circleBodies[index]
        if (el && body) {
          const { x, y } = body.position
          el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${body.angle}rad)`
        }
      })

      animationFrameId = requestAnimationFrame(updateDOM)
    }
    
    updateDOM()

    // Handle resize
    const handleResize = () => {
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight
      
      Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + thickness/2 })
      Matter.Body.setPosition(wallRight, { x: newWidth + thickness/2, y: newHeight / 2 })
      Matter.Body.setPosition(ceiling, { x: newWidth / 2, y: -thickness/2 })
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      Matter.Runner.stop(runner)
      Matter.Engine.clear(engine)
      Matter.World.clear(world, false)
    }

  }, [])

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[450px] md:h-[600px] mt-8 bg-transparent overflow-hidden shadow-inner"
    >
      {tools.map((tool, i) => (
        <div
          key={`tool-${i}`}
          ref={(el) => {
            elementsRef.current[i] = el;
          }}
          className="absolute top-0 left-0 px-5 py-2 md:px-7 md:py-3 bg-white/10 border border-white/20 backdrop-blur-md text-white text-sm md:text-base font-semibold rounded-full cursor-grab active:cursor-grabbing select-none shadow-lg"
          style={{ 
             // Intentionally offscreen initially
             transform: `translate(-50%, -50%) translate(-9999px, -9999px)` 
          }}
        >
          {tool}
        </div>
      ))}

      {circlesData.map((circle, i) => (
        <div
          key={`circle-${i}`}
          ref={(el) => {
            circleElementsRef.current[i] = el;
          }}
          className={`absolute top-0 left-0 rounded-full border backdrop-blur-md cursor-grab active:cursor-grabbing select-none shadow-lg transition-colors ${circle.classes}`}
          style={{ 
             width: circle.size,
             height: circle.size,
             // Intentionally offscreen initially
             transform: `translate(-50%, -50%) translate(-9999px, -9999px)` 
          }}
        />
      ))}
    </div>
  )
}
