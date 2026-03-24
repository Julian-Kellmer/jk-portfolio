uniform float uVelocity;

varying vec2 vUv;

void main() {
  vUv = uv;

  vec3 pos = position;

// Stronger bending based on x and y velocity
pos.z += sin(pos.x * 2.0) * uVelocity * 0.8;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
