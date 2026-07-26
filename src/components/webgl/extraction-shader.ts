/**
 * "Extraction" background shader.
 *
 * Cross-dissolves three video plates (crema / pressure / bloom) by weights the
 * scroll position drives, warps them with domain-distorted noise so the liquid
 * keeps moving even when a plate is paused, and blooms heat around the pointer.
 */

export const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  precision highp float;

  uniform sampler2D uTexA;   // hero crema disc
  uniform sampler2D uTexB;   // fire meeting water
  uniform sampler2D uTexC;   // coffee ink bloom
  uniform vec3  uWeights;    // blend weights, normalised to sum 1
  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uTexResolution;
  uniform vec2  uFocus;      // crop anchor, 0.5 = centred
  uniform float uZoom;       // <1 pulls the plate back so roast surrounds it
  uniform vec2  uCursor;     // 0..1, y already flipped to UV space
  uniform float uCursorHeat; // eases to 0 when the pointer leaves
  uniform float uTurbulence; // fed by scroll velocity
  uniform float uOpacity;    // master fade-in, keeps the canvas off the LCP path

  varying vec2 vUv;

  // -- cheap value noise ------------------------------------------------------
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float valueNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float total = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      total += valueNoise(p) * amplitude;
      p *= 2.02;
      amplitude *= 0.5;
    }
    return total;
  }

  // -- object-fit: cover, in UV space -----------------------------------------
  // uFocus biases the crop so the plate's subject stays off-centre instead of
  // drifting under the headline when the viewport is narrower than the plate.
  vec2 coverUv(vec2 uv) {
    vec2 ratio = uResolution / uTexResolution;
    float scale = max(ratio.x, ratio.y) * uZoom;
    vec2 size = uTexResolution * scale;
    vec2 offset = (uResolution - size) * uFocus;
    return (uv * uResolution - offset) / size;
  }

  void main() {
    vec2 uv = coverUv(vUv);

    // Domain-warped drift: keeps the liquid alive even on a paused plate.
    float drift = fbm(uv * 2.6 + vec2(uTime * 0.035, uTime * -0.02));
    vec2 warp = vec2(drift - 0.5) * (0.010 + uTurbulence * 0.02);

    // Heat bloom around the pointer -- pushes pixels radially outward.
    vec2 toCursor = vUv - uCursor;
    float dist = length(toCursor);
    float heat = exp(-dist * 7.0) * uCursorHeat;
    warp += normalize(toCursor + 1e-5) * heat * 0.028;

    vec2 sampleUv = uv + warp;

    vec3 color =
        texture2D(uTexA, sampleUv).rgb * uWeights.x
      + texture2D(uTexB, sampleUv).rgb * uWeights.y
      + texture2D(uTexC, sampleUv).rgb * uWeights.z;

    // Lift the ember channel where the pointer is, as though the heat is real.
    color += vec3(1.0, 0.37, 0.12) * heat * 0.5;

    // With uZoom < 1 the plate no longer fills the frame. Feather its edges
    // into the roast base rather than letting clamped texels smear outward.
    vec2 edge = smoothstep(0.0, 0.06, sampleUv) * smoothstep(1.0, 0.94, sampleUv);
    color *= edge.x * edge.y;

    // Vignette -- gentle. Strong enough to hide the plate edges, soft enough
    // that the footage still reads across most of the frame.
    float vignette = smoothstep(1.45, 0.15, length(vUv - 0.5) * 1.15);
    color *= mix(0.55, 1.0, vignette);

    // Settle everything onto the roast base so the page never shows pure black
    // seams where the plate ends.
    vec3 roast = vec3(0.043, 0.027, 0.020);
    color = max(color, roast * 0.4);

    gl_FragColor = vec4(color * uOpacity, 1.0);
  }
`;
