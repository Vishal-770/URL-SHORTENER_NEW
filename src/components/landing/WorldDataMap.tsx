"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * Read a CSS variable from the document root at runtime.
 * This ensures colors respect light/dark mode.
 */
function useCSSColor(variable: string): string {
  const [color, setColor] = useState("#df6035");
  useEffect(() => {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(variable)
      .trim();
    if (value) setColor(value);
  }, [variable]);
  return color;
}

function GlowingGlobe({ primaryColor, secondaryColor }: { primaryColor: string; secondaryColor: string }) {
  const pointsRef = useRef<THREE.Points>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  const particles = useMemo(() => {
    const p = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = 2 * Math.PI * Math.random();
      const r = 2.5;
      p[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      p[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      p[i * 3 + 2] = r * Math.cos(theta);
    }
    return p;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.1;
      pointsRef.current.rotation.x = time * 0.05;
    }
    if (sphereRef.current) {
      sphereRef.current.rotation.y = time * 0.15;
    }
  });

  return (
    <group>
      <Points ref={pointsRef} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={primaryColor}
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      <Sphere ref={sphereRef} args={[2.4, 64, 64]}>
        <MeshDistortMaterial
          color={secondaryColor}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0}
          metalness={1}
          opacity={0.3}
          transparent
          wireframe
        />
      </Sphere>

      <Sphere args={[2.2, 32, 32]}>
        <meshBasicMaterial color={primaryColor} transparent opacity={0.05} />
      </Sphere>
    </group>
  );
}

export default function WorldDataMap() {
  const primaryColor = useCSSColor("--primary");
  const secondaryColor = useCSSColor("--secondary");

  return (
    <section className="py-40 bg-background relative overflow-hidden flex flex-col items-center">
      {/* Background Grid — uses CSS var directly, works in both modes */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(var(--border) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-4xl w-full px-6 space-y-6 text-center mb-10 relative z-10">
        <p className="text-[11px] font-mono uppercase tracking-[0.8em] text-primary">
          Global Transit Matrix
        </p>
        <h2 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter text-foreground">
          Liquid Matrix.
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground italic font-medium">
          Visualizing our real-time edge network. Sub-50ms resolution powered by a neural infrastructure.
        </p>
      </div>

      <div className="relative w-full h-[600px] cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color={primaryColor} />
          <GlowingGlobe primaryColor={primaryColor} secondaryColor={secondaryColor} />
        </Canvas>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 px-8 py-3 rounded-full border border-border/20 bg-muted/10 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
              Live Nodes
            </span>
          </div>
          <div className="h-4 w-[1px] bg-border" />
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
              Transit Flow
            </span>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
    </section>
  );
}
