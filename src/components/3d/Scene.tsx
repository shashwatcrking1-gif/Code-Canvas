"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { AdaptiveDpr, Preload } from "@react-three/drei";
import { GlassShapes } from "./GlassShapes";
import { HeroCenterpiece } from "./HeroCenterpiece";

/**
 * Main 3D Scene — renders as a fixed background behind page content.
 * Respects prefers-reduced-motion by showing a static fallback.
 * Adapts DPR for performance on lower-end devices.
 */
export function Scene() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);

    setIsMobile(window.innerWidth < 768);
    const resizeHandler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", resizeHandler);

    return () => {
      mq.removeEventListener("change", handler);
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  // Static fallback for reduced-motion users
  if (reducedMotion) {
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#FAFAF8] via-[#f0f4ee] to-[#e8ede5]" />
    );
  }

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          {/* Soft, warm lighting for glassy materials */}
          <ambientLight intensity={0.6} color="#fafaf8" />
          <directionalLight
            position={[5, 8, 5]}
            intensity={0.8}
            color="#ffffff"
          />
          <directionalLight
            position={[-3, -2, 4]}
            intensity={0.3}
            color="#c5d1bf"
          />

          {/* Environment for reflections on glass materials */}
          <fog attach="fog" args={["#FAFAF8", 8, 25]} />

          <HeroCenterpiece />
          <GlassShapes isMobile={isMobile} />

          <AdaptiveDpr pixelated />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
