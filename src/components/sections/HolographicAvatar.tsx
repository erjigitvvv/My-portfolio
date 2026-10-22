"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/**
  * Holographic Cyber Matrix Avatar Node
  * VisionOS Spatial Glass 3D Mesh with Matrix Particle Ring and Neon Laser Core
  */
function HolographicMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Points>(null);

  // Generate matrix cyber particles
  const particleCount = 280;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    const theta = Math.random() * Math.PI * 2;
    const radius = 1.2 + Math.random() * 0.8;
    positions[i] = Math.cos(theta) * radius;
    positions[i + 1] = (Math.random() - 0.5) * 2.5;
    positions[i + 2] = Math.sin(theta) * radius;
  }

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.y = -t * 0.25;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Cyber Core (Icosahedron / Head proxy) */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh>
          <icosahedronGeometry args={[0.9, 1]} />
          <meshStandardMaterial
            color="#3DBE74"
            wireframe
            emissive="#4FD98A"
            emissiveIntensity={0.8}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
      </Float>

      {/* Inner Glowing Hologram Sphere */}
      <mesh>
        <sphereGeometry args={[0.65, 32, 32]} />
        <meshPhysicalMaterial
          color="#177A43"
          roughness={0.2}
          metalness={0.8}
          transmission={0.85}
          thickness={1.2}
          ior={1.5}
          emissive="#3DBE74"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Matrix Cyber Particles Ring */}
      <points ref={ringRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#4FD98A"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export function HolographicAvatar() {
  return (
    <div className="relative h-[380px] w-full sm:h-[460px] lg:h-[520px] rounded-3xl overflow-hidden glass-surface border border-[var(--glass-border)] shadow-2xl">
      {/* Background Holographic Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent)]/15 via-transparent to-cyan-500/10 pointer-events-none" />

      {/* Header Scanline Bar */}
      <div className="absolute top-3 left-4 right-4 z-10 flex items-center justify-between font-mono text-[10px] text-[var(--accent)]">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-ping" />
          HOLOGRAPHIC RIG // NEURAL_MATRIX.glsl
        </span>
        <span>VISION_OS v2.6</span>
      </div>

      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 50 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={2.5} color="#4FD98A" />
        <pointLight position={[-5, -5, -5]} intensity={1.5} color="#35D0FF" />
        <HolographicMesh />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
}
