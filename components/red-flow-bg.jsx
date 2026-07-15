/* eslint-disable react/no-unknown-property */
"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Recreation of the reference hero background (lukebaffait.fr):
// a soft red gradient field, warped by an animated perlin flow-field whose
// origin follows the cursor with momentum — plus a subtle parallax tilt.
// The gradient is procedural (no texture), the distortion matches the
// reference's iterative rotate-by-noise technique.

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uMouse;      // lerped, 0..1
uniform vec2 uRes;

const float PI = 3.14159265359;

vec3 hash33(vec3 p3) {
  p3 = fract(p3 * vec3(0.1031, 0.11369, 0.13787));
  p3 += dot(p3, p3.yxz + 19.19);
  return -1.0 + 2.0 * fract(vec3(
    (p3.x + p3.y) * p3.z,
    (p3.x + p3.z) * p3.y,
    (p3.y + p3.z) * p3.x
  ));
}

float pnoise(vec3 p) {
  vec3 pi = floor(p);
  vec3 pf = p - pi;
  vec3 w = pf * pf * (3.0 - 2.0 * pf);
  float n000 = dot(pf - vec3(0.,0.,0.), hash33(pi + vec3(0.,0.,0.)));
  float n100 = dot(pf - vec3(1.,0.,0.), hash33(pi + vec3(1.,0.,0.)));
  float n010 = dot(pf - vec3(0.,1.,0.), hash33(pi + vec3(0.,1.,0.)));
  float n110 = dot(pf - vec3(1.,1.,0.), hash33(pi + vec3(1.,1.,0.)));
  float n001 = dot(pf - vec3(0.,0.,1.), hash33(pi + vec3(0.,0.,1.)));
  float n101 = dot(pf - vec3(1.,0.,1.), hash33(pi + vec3(1.,0.,1.)));
  float n011 = dot(pf - vec3(0.,1.,1.), hash33(pi + vec3(0.,1.,1.)));
  float n111 = dot(pf - vec3(1.,1.,1.), hash33(pi + vec3(1.,1.,1.)));
  float nx00 = mix(n000, n100, w.x);
  float nx01 = mix(n001, n101, w.x);
  float nx10 = mix(n010, n110, w.x);
  float nx11 = mix(n011, n111, w.x);
  float nxy0 = mix(nx00, nx10, w.y);
  float nxy1 = mix(nx01, nx11, w.y);
  return mix(nxy0, nxy1, w.z);
}

// Soft gaussian blob
float blob(vec2 uv, vec2 c, vec2 r) {
  vec2 d = (uv - c) / r;
  return exp(-dot(d, d));
}

// The red gradient "painting" — layout mimics the reference image:
// dark left, tall soft red mass right-of-center, bright core upper-right.
vec3 baseColor(vec2 uv) {
  // Softer charcoal base (not pure black) so the dark areas read less harsh.
  vec3 col = vec3(0.05, 0.042, 0.043);
  float aspect = uRes.x / uRes.y;
  vec2 auv = vec2(uv.x * aspect, uv.y);

  vec3 red = vec3(0.30, 0.03, 0.015);
  vec3 hot = vec3(0.44, 0.075, 0.035);
  vec3 deep = vec3(0.11, 0.009, 0.011);

  // Slow independent drift per blob keeps the mass visibly alive even
  // before the flow-field warping is taken into account.
  float t = uTime * 0.22;
  vec2 w1 = 0.035 * vec2(sin(t), cos(t * 0.8));
  vec2 w2 = 0.045 * vec2(sin(t * 0.7 + 2.1), sin(t * 0.9 + 0.6));
  vec2 w3 = 0.05  * vec2(cos(t * 0.6 + 4.0), sin(t * 0.5 + 1.7));

  col += deep * blob(auv, vec2(0.52 * aspect, 0.45) + w1, vec2(0.55, 0.75)) * 1.2;
  col += red  * blob(auv, vec2(0.60 * aspect, 0.62) + w2, vec2(0.30, 0.55)) * 1.1;
  col += red  * blob(auv, vec2(0.74 * aspect, 0.30) + w1.yx, vec2(0.28, 0.45));
  col += hot  * blob(auv, vec2(0.66 * aspect, 0.80) + w3, vec2(0.16, 0.30)) * 0.9;
  col += hot  * blob(auv, vec2(0.78 * aspect, 0.55) + w2.yx, vec2(0.13, 0.28)) * 0.55;
  // faint echo far left so the dark side isn't flat
  col += deep * blob(auv, vec2(0.12 * aspect, 0.20) + w3.yx, vec2(0.22, 0.35)) * 0.6;
  return col;
}

// Reference technique: iteratively push the UV along angles read from a slow
// perlin field. The field's origin follows the (momentum-lerped) mouse, which
// is what makes the smoke "react" to the cursor.
vec2 distortUV(vec2 uv) {
  vec2 st = uv;
  float aspect = uRes.x / max(uRes.y, 0.001);
  vec2 aspectVec = vec2(aspect, 1.0);
  vec2 invPos = 1.0 - uMouse;
  float freq = 5.0 * 0.158;
  float t = 0.95 + uTime * 0.11;
  float rad = radians(360.0 * 6.0);
  float amt = 0.02;
  for (int i = 0; i < 8; i++) {
    vec2 clamped = clamp(st, -1.0, 2.0);
    vec2 scaled = (clamped - 0.5) * aspectVec + invPos;
    float p = pnoise(vec3((scaled - 0.5) * freq, t)) - 0.5;
    float ang = p * rad;
    st += vec2(cos(ang), sin(ang)) * amt;
  }
  return mix(uv, clamp(st, 0.0, 1.0), 0.51);
}

void main() {
  vec2 uv = vUv;
  // subtle parallax tilt toward the cursor
  uv += (uMouse - 0.5) * vec2(-0.025, -0.02);
  uv = distortUV(uv);
  vec3 col = baseColor(uv);
  // gentle vignette to keep the headline crisp
  float vig = smoothstep(1.25, 0.35, length(vUv - vec2(0.5, 0.45)));
  col *= mix(0.55, 1.0, vig);
  gl_FragColor = vec4(col, 1.0);
}
`;

function FlowPlane({ paused, disableAnimation, enableMouseInteraction }) {
  const mat = useRef();
  const { viewport, size } = useThree();
  const mouseTarget = useRef(new THREE.Vector2(0.5, 0.5));

  // Initial values only — R3F clones this object into the material, so all
  // runtime updates must go through mat.current.uniforms (NOT this object).
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uRes: { value: new THREE.Vector2(1, 1) },
    }),
    []
  );

  // The canvas sits underneath the hero content, so R3F pointer events never
  // reach the mesh — track the cursor on the window instead.
  useEffect(() => {
    if (!enableMouseInteraction) return;
    const onMove = (e) => {
      mouseTarget.current.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [enableMouseInteraction]);

  useFrame(({ clock }) => {
    if (paused || !mat.current) return;
    const u = mat.current.uniforms;
    if (!disableAnimation) u.uTime.value = clock.getElapsedTime();
    u.uRes.value.set(size.width, size.height);
    // momentum: the field origin eases toward the cursor
    u.uMouse.value.lerp(mouseTarget.current, 0.045);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial ref={mat} vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
    </mesh>
  );
}

export default function RedFlowBg({
  dpr = 0.75,
  paused = false,
  disableAnimation = false,
  enableMouseInteraction = true,
}) {
  return (
    <Canvas
      className="w-full h-full"
      dpr={dpr}
      frameloop={paused ? "never" : "always"}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <FlowPlane
        paused={paused}
        disableAnimation={disableAnimation}
        enableMouseInteraction={enableMouseInteraction}
      />
    </Canvas>
  );
}
