import EventEmitter from 'events'
import { lerp } from '../math/lerp'

export default class InputController extends EventEmitter {
  constructor() {
    super()

    this.isDown = false

    this.start = { x: 0, y: 0 }
    this.current = { x: 0, y: 0 }
    this.target = { x: 0, y: 0 }
    this.last = { x: 0, y: 0 }
    this.velocity = { x: 0, y: 0 }
    this.speedMultiplier = 1.0 // Normalizes pixel input

    this.onPointerDown = this.onPointerDown.bind(this)
    this.onPointerMove = this.onPointerMove.bind(this)
    this.onPointerUp = this.onPointerUp.bind(this)
    this.onWheel = this.onWheel.bind(this)

    window.addEventListener('pointerdown', this.onPointerDown)
    window.addEventListener('pointermove', this.onPointerMove)
    window.addEventListener('pointerup', this.onPointerUp)
    window.addEventListener('pointerleave', this.onPointerUp)
    window.addEventListener('wheel', this.onWheel)
  }

  onPointerDown(e) {
    // Desactiva el arrastre si el cursor está en los primeros 100px (el header)
    if (e.clientY < 100) return

    this.isDown = true
    this.start.x = e.clientX
    this.start.y = e.clientY
  }

  onPointerMove(e) {
    if (!this.isDown) return

    const deltaX = (e.clientX - this.start.x) * this.speedMultiplier
    const deltaY = (e.clientY - this.start.y) * this.speedMultiplier

    this.start.x = e.clientX
    this.start.y = e.clientY

    this.target.x += deltaX
    this.target.y += deltaY
  }

  onPointerUp() {
    this.isDown = false
  }

  onWheel(e) {
    // Optional wheel support for secondary interaction
    this.target.x -= e.deltaX * 0.5
    this.target.y -= e.deltaY * 0.5
  }

  update() {
    // Lerp towards target for smooth inertia
    this.current.x = lerp(this.current.x, this.target.x, 0.085)
    this.current.y = lerp(this.current.y, this.target.y, 0.085)

    // Calculate velocity for shaders
    this.velocity.x = this.current.x - this.last.x
    this.velocity.y = this.current.y - this.last.y

    this.last.x = this.current.x
    this.last.y = this.current.y
  }

  destroy() {
    window.removeEventListener('pointerdown', this.onPointerDown)
    window.removeEventListener('pointermove', this.onPointerMove)
    window.removeEventListener('pointerup', this.onPointerUp)
    window.removeEventListener('pointerleave', this.onPointerUp)
    window.removeEventListener('wheel', this.onWheel)
    this.removeAllListeners()
  }
}
