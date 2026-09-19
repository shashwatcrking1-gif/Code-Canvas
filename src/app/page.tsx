"use client";

import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { VideoShowcase } from "@/components/sections/VideoShowcase";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { Contact } from "@/components/sections/Contact";

/**
 * Dynamically import the 3D Scene with no SSR — Three.js requires the
 * browser's WebGL context which isn't available during server rendering.
 */
const Scene = dynamic(
  () => import("@/components/3d/Scene").then((mod) => ({ default: mod.Scene })),
  { ssr: false }
);

/**
 * Main page — composes all sections with the 3D scene as a fixed background.
 * The Scene renders behind everything (fixed, -z-10).
 * Sections are positioned relatively with z-index above the 3D layer.
 */
export default function Home() {
  return (
    <>
      {/* 3D background — fixed behind all content */}
      <Scene />

      {/* Page sections — scrollable content above the 3D layer */}
      <main className="relative z-10">
        <Hero />
        <About />
        <VideoShowcase />
        <ProjectShowcase />
        <Contact />
      </main>
    </>
  );
}
