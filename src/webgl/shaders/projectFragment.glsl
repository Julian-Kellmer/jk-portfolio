uniform sampler2D uTexture;
uniform float uHover;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  
  // Scale/zoom on hover
  uv = (uv - 0.5) * (1.0 - uHover * 0.15) + 0.5;

  vec4 textureColor = texture2D(uTexture, uv);

  // Brightness increase on hover
  textureColor.rgb += uHover * 0.2;

  gl_FragColor = textureColor;
}
