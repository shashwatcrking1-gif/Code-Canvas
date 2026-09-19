"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { AdaptiveDpr, Preload, ScrollControls, Scroll, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BlackHole } from "./BlackHole";
import { Satellite } from "./Satellite";

// Import HTML sections
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { VideoShowcase } from "@/components/sections/VideoShowcase";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { Contact } from "@/components/sections/Contact";

export function Scene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const resizeHandler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-[#030303]">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: false }} // Better performance without antialias for bloom
      >
        <Suspense fallback={null}>
          <color attach="background" args={['#030303']} />
          
          {/* Space lighting */}
          <ambientLight intensity={0.1} color="#ffffff" />
          <directionalLight position={[10, 10, 10]} intensity={1.5} color="#fff9eb" />
          <pointLight position={[0, 0, -5]} intensity={2} color="#fa9705" distance={20} />

          {/* Infinite Scroll Wrapper from Drei */}
          <ScrollControls pages={5} damping={0.2} infinite>
            
            {/* 3D Elements tied to scroll */}
            <BlackHole />
            <Satellite />
            <Stars radius={100} depth={50} count={isMobile ? 2000 : 5000} factor={4} saturation={0} fade speed={1} />

            {/* HTML Overlay sync'd with 3D scroll */}
            <Scroll html style={{ width: "100%", height: "100%" }}>
              <main className="w-full text-[#f0f0f0]">
                {/* 
                  To make the infinite scroll feel seamless, we space the sections 
                  so they span the 5 "pages" of the ScrollControls.
                */}
                <div style={{ height: "100vh" }}><Hero /></div>
                <div style={{ minHeight: "100vh" }}><About /></div>
                <div style={{ minHeight: "100vh" }}><VideoShowcase /></div>
                <div style={{ minHeight: "100vh" }}><ProjectShowcase /></div>
                <div style={{ minHeight: "100vh", display: 'flex', alignItems: 'center' }}><Contact /></div>
              </main>
            </Scroll>
          </ScrollControls>

          {/* Cinematic Bloom for the Black Hole */}
          <EffectComposer>
            <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} />
          </EffectComposer>

          <AdaptiveDpr pixelated />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
