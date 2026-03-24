import * as THREE from 'three'
import { lerp } from '../math/lerp'
import vertexShader from '../shaders/projectVertex.glsl'
import fragmentShader from '../shaders/projectFragment.glsl'

export default class ProjectCard {
  constructor(data, index, geometry, baseParams) {
    this.data = data
    this.index = index
    this.geometry = geometry
    this.baseParams = baseParams

    this.basePosition = new THREE.Vector3()
    this.hoverTarget = 0
    this.hoverCurrent = 0

    this.setMaterial()
    this.setMesh()
  }

  setMaterial() {
    // Load texture
    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load(this.data.image[0], () => {
      this.material.needsUpdate = true
    })
    texture.minFilter = THREE.LinearFilter
    texture.generateMipmaps = false

    this.material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        uTexture: { value: texture },
        uVelocity: { value: 0 },
        uHover: { value: 0 },
        uTime: { value: 0 },
      },
      transparent: true,
    })
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    // Assign reference to this class for raycasting hover events
    this.mesh.userData = { component: this }
  }

  onPointerEnter() {
    this.hoverTarget = 1
  }

  onPointerLeave() {
    this.hoverTarget = 0
  }

  update(globalOffset, totalWidth, totalHeight, wrapFunc, velocity, time, sphereParams) {
    // Lerp hover uniform
    this.hoverCurrent = lerp(this.hoverCurrent, this.hoverTarget, 0.1)
    this.material.uniforms.uHover.value = this.hoverCurrent
    this.material.uniforms.uVelocity.value = velocity.x
    this.material.uniforms.uTime.value = time

    // Subtle scale on hover
    const scale = 1.0 + this.hoverCurrent * 0.05
    this.mesh.scale.set(scale, scale, 1)

    // Calculate Grid Infinity Wrapping
    const rawX = this.basePosition.x + globalOffset.x
    const rawY = this.basePosition.y + globalOffset.y

    const wrappedX = wrapFunc(rawX, -totalWidth / 2, totalWidth / 2)
    const wrappedY = wrapFunc(rawY, -totalHeight / 2, totalHeight / 2)

    // ─── Cylindrical arc projection ────────────────────────────────────────────
    // Model: cards lie on the inside surface of a vertical cylinder.
    // The camera sits at the cylinder axis. Centre card → flat (theta=0).
    // Cards to the left/right → rotated and curved along the arc.
    //
    // Step 1 — normalise horizontal world position [-1 .. 1]
    const { curvatureStrength, sphereRadius, lensRadiusX, lensRadiusY, verticalTiltStrength } = sphereParams

    const nx = wrappedX / lensRadiusX   // -1 = far left, 0 = centre, +1 = far right
    const ny = wrappedY / lensRadiusY   // -1 = bottom,   0 = centre, +1 = top

    // Step 2 — arc angle in radians
    //   nx=0  → theta=0  → no rotation, no Z offset  (centre card stays flat)
    //   nx=±1 → theta=±curvatureStrength  (edge cards rotate and recede)
    const theta = nx * curvatureStrength

    // Step 3 — cylindrical projection
    //   A point at angle theta on a cylinder of radius R:
    //     x = R * sin(theta)   (horizontal position on the arc)
    //     z = R * (1 - cos(theta))  (depth recession: 0 at centre, positive = away from cam)
    const curvedX = Math.sin(theta) * sphereRadius
    const curvedZ = sphereRadius * (1 - Math.cos(theta))

    // Step 4 — apply final positions
    this.mesh.position.x = curvedX
    this.mesh.position.y = wrappedY
    // Add curvedZ so edges come TOWARD the camera (inside-sphere view); hover pushes card forward
    this.mesh.position.z = this.hoverCurrent * 0.15 + curvedZ

    // Step 5 — align rotation to arc tangent
    //   The tangent of the cylinder at angle theta is exactly -theta on Y axis.
    //   This makes each card face the camera naturally (no manual tilt needed).
    this.mesh.rotation.y = -theta

    // Step 6 — subtle vertical tilt (independent of horizontal curvature)
    this.mesh.rotation.x = ny * verticalTiltStrength
    // ──────────────────────────────────────────────────────────────────────────
  }

  destroy() {
    if (this.material.uniforms.uTexture.value) {
      this.material.uniforms.uTexture.value.dispose()
    }
    this.material.dispose()
  }
}
