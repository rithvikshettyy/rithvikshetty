"use client"

import { Suspense, useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber"
import * as THREE from "three"

const vertexShader = /* glsl */ `
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = /* glsl */ `
precision highp float;

uniform sampler2D uTex;
uniform vec2 uResolution;
uniform vec2 uImageRes;
uniform float uTime;
uniform float uPixelSize;
uniform vec2 uMouse;

// 8x8 Bayer ordered-dither matrix (0..1). Global const so the GPU builds it
// once at compile time — a local per-call array here caused 64 writes x 3 pipe()
// calls per pixel, hanging weaker GPUs long enough to trip a driver reset.
const float bayerMat[64] = float[64](
  0.0/64.0,  48.0/64.0, 12.0/64.0, 60.0/64.0, 3.0/64.0,  51.0/64.0, 15.0/64.0, 63.0/64.0,
  32.0/64.0, 16.0/64.0, 44.0/64.0, 28.0/64.0, 35.0/64.0, 19.0/64.0, 47.0/64.0, 31.0/64.0,
  8.0/64.0,  56.0/64.0, 4.0/64.0,  52.0/64.0, 11.0/64.0, 59.0/64.0, 7.0/64.0,  55.0/64.0,
  40.0/64.0, 24.0/64.0, 36.0/64.0, 20.0/64.0, 43.0/64.0, 27.0/64.0, 39.0/64.0, 23.0/64.0,
  2.0/64.0,  50.0/64.0, 14.0/64.0, 62.0/64.0, 1.0/64.0,  49.0/64.0, 13.0/64.0, 61.0/64.0,
  34.0/64.0, 18.0/64.0, 46.0/64.0, 30.0/64.0, 33.0/64.0, 17.0/64.0, 45.0/64.0, 29.0/64.0,
  10.0/64.0, 58.0/64.0, 6.0/64.0,  54.0/64.0, 9.0/64.0,  57.0/64.0, 5.0/64.0,  53.0/64.0,
  42.0/64.0, 26.0/64.0, 38.0/64.0, 22.0/64.0, 41.0/64.0, 25.0/64.0, 37.0/64.0, 21.0/64.0
);
float bayer(ivec2 p) {
  return bayerMat[p.y * 8 + p.x];
}

float hash(float n) { return fract(sin(n) * 43758.5453123); }

// Neon gradient map: dark -> deep blue ... bright -> white
vec3 gradientMap(float t) {
  t = clamp(t, 0.0, 1.0);
  vec3 c0 = vec3(0.16, 0.10, 0.90); // deep electric blue
  vec3 c1 = vec3(0.14, 0.38, 1.00); // blue
  vec3 c2 = vec3(0.12, 0.95, 0.98); // cyan
  vec3 c3 = vec3(0.74, 1.00, 0.14); // lime
  vec3 c4 = vec3(1.00, 1.00, 1.00); // white
  if (t < 0.25) return mix(c0, c1, t / 0.25);
  if (t < 0.50) return mix(c1, c2, (t - 0.25) / 0.25);
  if (t < 0.75) return mix(c2, c3, (t - 0.50) / 0.25);
  return mix(c3, c4, (t - 0.75) / 0.25);
}

// "cover" fit for the texture
vec2 coverUV(vec2 uv) {
  float rs = uResolution.x / uResolution.y;
  float ri = uImageRes.x / uImageRes.y;
  vec2 newSize = rs < ri ? vec2(uImageRes.x * uResolution.y / uImageRes.y, uResolution.y)
                         : vec2(uResolution.x, uImageRes.y * uResolution.x / uImageRes.x);
  // Vertical crop anchors to the top of the image so blooms stay whole and the
  // dense base bleeds off the bottom edge, reading as a field that continues.
  vec2 offset = (rs < ri ? vec2((newSize.x - uResolution.x) * 0.5, 0.0)
                         : vec2(0.0, (newSize.y - uResolution.y) * 1.0)) / newSize;
  return uv * uResolution / newSize + offset;
}

// Sample -> pixelate -> dither -> animated neon gradient map
vec3 pipe(vec2 uv) {
  vec2 px = uPixelSize / uResolution;
  vec2 puv = px * floor(uv / px);
  puv = coverUV(puv);

  float lum = dot(texture2D(uTex, puv).rgb, vec3(0.299, 0.587, 0.114));

  // Ordered dither in device-pixel space
  ivec2 ip = ivec2(mod(floor(gl_FragCoord.xy / uPixelSize), 8.0));
  float threshold = bayer(ip) - 0.5;

  float levels = 5.0;
  float t = lum + threshold * (1.0 / levels);

  // Moving neon: shift mid/dark tones over time, leave the bright background stable
  float travel = sin(uTime * 0.9 + uv.x * 6.0 + uv.y * 3.0) * 0.5 + 0.5;
  float midMask = smoothstep(0.95, 0.45, t);
  t += (travel - 0.5) * 0.30 * midMask;

  // Mouse warms the ramp locally
  float d = distance(uv, uMouse);
  t += (1.0 - smoothstep(0.0, 0.28, d)) * 0.18 * midMask;

  t = floor(t * (levels - 1.0) + 0.5) / (levels - 1.0);
  return gradientMap(t);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  // Glitch: occasional bursts slice horizontal bands + widen RGB split
  float burst = step(0.90, hash(floor(uTime * 5.0))) + step(0.97, hash(floor(uTime * 13.0)));
  burst = clamp(burst, 0.0, 1.0);
  float band = floor(uv.y * 34.0);
  float slide = (hash(band + floor(uTime * 22.0)) - 0.5) * 0.10 * burst;
  vec2 guv = uv + vec2(slide, 0.0);

  float split = 0.0025 + burst * 0.012;
  vec3 col;
  col.r = pipe(guv + vec2(split, 0.0)).r;
  col.g = pipe(guv).g;
  col.b = pipe(guv - vec2(split, 0.0)).b;

  // Drop the bright (near-white) background to transparent so the footer shows
  // through — neon tones keep a low channel, white pushes min toward 1.
  float minC = min(col.r, min(col.g, col.b));
  float alpha = smoothstep(0.85, 0.6, minC);

  // Fade the bottom edge into the footer black so the crop dissolves instead of
  // hard-slicing through blooms (uv.y = 0 is the bottom).
  alpha *= smoothstep(0.0, 0.22, uv.y);

  // Scanline flicker
  col *= 0.92 + 0.08 * sin(gl_FragCoord.y * 1.6 + uTime * 6.0);

  gl_FragColor = vec4(col, alpha);
}
`

function FlowerPlane({ reduced }: { reduced: boolean }) {
  const tex = useLoader(THREE.TextureLoader, "/flower-base.jpg")
  const { size, viewport, gl } = useThree()
  const mouse = useRef(new THREE.Vector2(0.5, 0.5))

  const uniforms = useMemo(
    () => ({
      uTex: { value: tex },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uImageRes: { value: new THREE.Vector2(tex.image.width, tex.image.height) },
      uTime: { value: 0 },
      uPixelSize: { value: 3.0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    [tex],
  )

  useEffect(() => {
    tex.minFilter = THREE.LinearFilter
    tex.magFilter = THREE.LinearFilter
    tex.generateMipmaps = false
    const dpr = gl.getPixelRatio()
    uniforms.uResolution.value.set(size.width * dpr, size.height * dpr)
  }, [size, gl, tex, uniforms])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const rect = gl.domElement.getBoundingClientRect()
      mouse.current.set(
        (e.clientX - rect.left) / rect.width,
        1.0 - (e.clientY - rect.top) / rect.height,
      )
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [gl])

  useFrame(({ clock }) => {
    if (!reduced) uniforms.uTime.value = clock.getElapsedTime()
    uniforms.uMouse.value.lerp(mouse.current, 0.08)
  })

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} transparent />
    </mesh>
  )
}

// Warm the texture cache as soon as this chunk loads (page open), so the
// shader has nothing left to fetch by the time the footer scrolls into view.
useLoader.preload(THREE.TextureLoader, "/flower-base.jpg")

export default function FlowerHalftone() {
  const [reduced, setReduced] = useState(false)
  // The canvas mounts immediately (shader compile + texture upload happen at
  // page open, so there's no pop-in), but the render loop only runs while the
  // footer is near view — offscreen it idles at zero cost.
  const [inView, setInView] = useState(false)
  // Bumped to force a full remount if the driver drops the context (recovery).
  const [gen, setGen] = useState(0)
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    const el = hostRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { rootMargin: "200px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={hostRef} className="!absolute inset-0">
      <Canvas
          key={gen}
          dpr={[1, 1.5]}
          // 'demand' still renders the first frame on mount (compiles the
          // program up front); 'always' drives the loop only while in view.
          frameloop={inView ? "always" : "demand"}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
          className="!absolute inset-0"
          onCreated={({ gl }) => {
            gl.domElement.addEventListener(
              "webglcontextlost",
              (e) => {
                // Let the browser reclaim it, then rebuild from scratch.
                e.preventDefault()
                setGen((g) => g + 1)
              },
              { once: true },
            )
          }}
        >
          {/* Suspense boundary for the texture's useLoader — required so the
              suspend is handled in production builds (dev is more forgiving). */}
          <Suspense fallback={null}>
            <FlowerPlane reduced={reduced} />
          </Suspense>
      </Canvas>
    </div>
  )
}
