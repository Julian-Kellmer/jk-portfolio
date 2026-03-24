import * as THREE from 'three'
import EventEmitter from 'events'

export default class RaycastController extends EventEmitter {
  constructor(experience) {
    super()
    this.experience = experience
    this.camera = this.experience.camera.instance
    this.sizes = this.experience.sizes

    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()
    this.hoveredItem = null

    this.onPointerMove = this.onPointerMove.bind(this)
    this.onClick = this.onClick.bind(this)
    window.addEventListener('pointermove', this.onPointerMove)
    window.addEventListener('click', this.onClick)
  }

  onClick(event) {
    // Solo procesar clicks que caen directamente sobre el canvas WebGL
    if (event.target.tagName !== 'CANVAS') return

    // Desactiva los clicks en la zona del header (primeros 100px)
    if (event.clientY < 100) return

    // Avoid triggering full clicks when intensely dragging the scene
    if (this.experience.world && this.experience.world.inputController) {
      const v = this.experience.world.inputController.velocity
      if (Math.abs(v.x) > 2 || Math.abs(v.y) > 2) return
    }

    if (this.hoveredItem) {
      const card = this.hoveredItem.userData.component
      if (card && card.data && card.data.slug) {
        window.dispatchEvent(
          new CustomEvent('projectClick', { detail: card.data.slug }),
        )
      }
    }
  }

  onPointerMove(event) {
    // Si el puntero está sobre un elemento UI (no el canvas), desactivamos el hover
    if (event.target.tagName !== 'CANVAS') {
      this.mouse.x = 9999
      this.mouse.y = 9999
      return
    }

    // Si estamos en la zona del header (primeros 100px), evitamos el hover
    // mandando la coordenada fuera de la pantalla
    if (event.clientY < 100) {
      this.mouse.x = 9999
      this.mouse.y = 9999
      return
    }

    // Normalize mouse coordinates for raycasting
    this.mouse.x = (event.clientX / this.sizes.width) * 2 - 1
    this.mouse.y = -(event.clientY / this.sizes.height) * 2 + 1
  }

  update(meshArray) {
    this.raycaster.setFromCamera(this.mouse, this.camera)
    const intersects = this.raycaster.intersectObjects(meshArray)

    if (intersects.length > 0) {
      const currentHover = intersects[0].object

      if (this.hoveredItem !== currentHover) {
        if (this.hoveredItem) {
          this.emit('pointerleave', this.hoveredItem)
        }
        this.hoveredItem = currentHover
        this.emit('pointerenter', this.hoveredItem)
      }
    } else {
      if (this.hoveredItem) {
        this.emit('pointerleave', this.hoveredItem)
        this.hoveredItem = null
      }
    }
  }

  destroy() {
    window.removeEventListener('pointermove', this.onPointerMove)
    window.removeEventListener('click', this.onClick)
    this.removeAllListeners()
  }
}
