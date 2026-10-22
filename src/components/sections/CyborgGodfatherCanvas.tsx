"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform float uAssemblyProgress;
  uniform vec2 uMouse;
  uniform float uScrollY;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Matrix assembly glitch while the avatar materialises
    if (uAssemblyProgress < 1.0) {
      float glitch = sin(pos.y * 20.0 + uTime * 15.0) * (1.0 - uAssemblyProgress) * 0.5;
      pos.x += glitch;
      pos.z += glitch * 0.5;
    }

    // Mouse reactivity & scroll parallax
    pos.x += uMouse.x * 0.35;
    pos.y += uMouse.y * 0.35 - uScrollY * 0.0005;

    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uAssemblyProgress;
  uniform float uScrollY;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vec4 texColor = texture2D(uTexture, vUv);

    vec3 neonGreen = vec3(0.0, 1.0, 0.66);
    vec3 neonCyan = vec3(0.0, 0.9, 1.0);

    float lum = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
    vec3 finalColor = mix(neonGreen, neonCyan, vUv.y * 0.4) * (lum * 1.9 + 0.1);

    // Holographic scanlines & laser beam
    float scanline = sin(vUv.y * 400.0 - uTime * 10.0) * 0.15;
    finalColor += vec3(scanline);

    float laserBeam = smoothstep(0.0, 0.04, abs(vUv.y - fract(uTime * 0.4)));
    finalColor += neonGreen * (1.0 - laserBeam) * 0.9;

    // Scroll fade out
    float scrollFade = clamp(1.0 - uScrollY * 0.0015, 0.0, 1.0);

    float alpha = texColor.a * uAssemblyProgress * scrollFade;
    if (uAssemblyProgress < 1.0) {
      float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233) + uTime)) * 43758.5453);
      if (noise > uAssemblyProgress) discard;
    }

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

function HolographicCyborgMesh({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture("/avatar/7.webp");

  // The material is used DIRECTLY in useFrame. (Previously a separate, never-attached
  // `materialRef` made useFrame return early, so uniforms never updated and the
  // avatar stayed fully transparent.)
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uTexture: { value: texture },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uAssemblyProgress: { value: 0 },
          uScrollY: { value: 0 },
        },
        transparent: true,
        side: THREE.DoubleSide,
      }),
    [texture]
  );

  useEffect(() => () => material.dispose(), [material]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { x, y } = state.pointer;
    const scrollY = scrollRef.current; // cached by a passive listener - no layout read per frame
    const t = state.clock.getElapsedTime();
    const u = material.uniforms;

    u.uTime.value = t;
    u.uMouse.value.set(x, y);
    u.uScrollY.value = scrollY;
    u.uAssemblyProgress.value = Math.min(t / 1.5, 1.0);

    mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, x * 0.6 + scrollY * 0.002, 0.1);
    mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, -y * 0.5, 0.1);

    const scale = Math.max(1.0 - scrollY * 0.0012, 0.75);
    mesh.scale.set(scale, scale, scale);
  });

  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} material={material}>
        <planeGeometry args={[4.8, 6.4, 32, 32]} />
      </mesh>
    </Float>
  );
}

/**
 * Spatial Holographic Matrix Avatar Canvas.
 * Performance guards: cached scroll position, render loop paused while the canvas
 * is off-screen or the tab is hidden, and a capped device pixel ratio.
 */
export function CyborgGodfatherCanvas() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    let inView = true;
    let tabVisible = !document.hidden;
    const sync = () => setActive(inView && tabVisible);

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    io.observe(el);

    const onVisibility = () => {
      tabVisible = !document.hidden;
      sync();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="absolute right-0 top-0 h-full w-[55%] pointer-events-auto overflow-hidden z-20 hidden lg:block"
    >
      {/* Soft ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,170,0.1)_0%,transparent_75%)] pointer-events-none" />

      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full"
      >
        <ambientLight intensity={2.0} />
        <directionalLight position={[5, 5, 5]} intensity={4.0} color="#00ffaa" />
        <pointLight position={[-5, -5, -5]} intensity={3.0} color="#00ffff" />
        <HolographicCyborgMesh scrollRef={scrollRef} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.3}
          minPolarAngle={Math.PI / 2 - 0.3}
        />
      </Canvas>
    </div>
  );
}
