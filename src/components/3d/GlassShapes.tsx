"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Floating translucent geometric shapes scattered throughout the scene.
 * Each shape has:
 * - Slow idle rotation
 * - Gentle sine-wave float
 * - Subtle mouse-parallax response via pointer position
 *
 * On mobile, we show fewer shapes for performance.
 */

interface ShapeConfig {
  geometry: "icosahedron" | "octahedron" | "torus" | "dodecahedron" | "tetrahedron" | "torusKnot";
  position: [number, number, number];
  scale: number;
  color: string;
  rotationSpeed: [number, number, number];
  floatSpeed: number;
  floatAmplitude: number;
}

const allShapes: ShapeConfig[] = [
  {
    geometry: "icosahedron",
    position: [-3.5, 2, -2],
    scale: 0.8,
    color: "#a8b5a0",
    rotationSpeed: [0.003, 0.005, 0.002],
    floatSpeed: 0.6,
    floatAmplitude: 0.3,
  },
  {
    geometry: "octahedron",
    position: [3.2, -1.5, -3],
    scale: 0.6,
    color: "#c5b8d6",
    rotationSpeed: [0.004, 0.002, 0.006],
    floatSpeed: 0.8,
    floatAmplitude: 0.25,
  },
  {
    geometry: "torus",
    position: [-2, -2.5, -1],
    scale: 0.5,
    color: "#b8c8d4",
    rotationSpeed: [0.002, 0.004, 0.003],
    floatSpeed: 0.5,
    floatAmplitude: 0.35,
  },
  {
    geometry: "dodecahedron",
    position: [4, 2.5, -4],
    scale: 0.7,
    color: "#c5d1bf",
    rotationSpeed: [0.005, 0.003, 0.004],
    floatSpeed: 0.7,
    floatAmplitude: 0.2,
  },
  {
    geometry: "tetrahedron",
    position: [-4.5, 0, -5],
    scale: 0.55,
    color: "#d4c5e0",
    rotationSpeed: [0.006, 0.004, 0.002],
    floatSpeed: 0.9,
    floatAmplitude: 0.15,
  },
  {
    geometry: "torusKnot",
    position: [1.5, 3, -6],
    scale: 0.35,
    color: "#8fa085",
    rotationSpeed: [0.002, 0.006, 0.003],
    floatSpeed: 0.4,
    floatAmplitude: 0.4,
  },
];

function GlassShape({ config }: { config: ShapeConfig }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = config.position[1];

  // Create the geometry based on the config type
  const geometryNode = useMemo(() => {
    switch (config.geometry) {
      case "icosahedron":
        return <icosahedronGeometry args={[1, 0]} />;
      case "octahedron":
        return <octahedronGeometry args={[1, 0]} />;
      case "torus":
        return <torusGeometry args={[1, 0.4, 16, 32]} />;
      case "dodecahedron":
        return <dodecahedronGeometry args={[1, 0]} />;
      case "tetrahedron":
        return <tetrahedronGeometry args={[1, 0]} />;
      case "torusKnot":
        return <torusKnotGeometry args={[0.8, 0.3, 64, 16]} />;
      default:
        return <icosahedronGeometry args={[1, 0]} />;
    }
  }, [config.geometry]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    // Idle rotation
    meshRef.current.rotation.x += config.rotationSpeed[0];
    meshRef.current.rotation.y += config.rotationSpeed[1];
    meshRef.current.rotation.z += config.rotationSpeed[2];

    // Sine-wave float
    meshRef.current.position.y =
      initialY + Math.sin(t * config.floatSpeed) * config.floatAmplitude;

    // Subtle mouse-parallax: shift position slightly based on pointer
    const px = state.pointer.x * 0.15;
    const py = state.pointer.y * 0.1;
    meshRef.current.position.x =
      config.position[0] + px * (config.position[2] * -0.05);
    meshRef.current.position.z =
      config.position[2] + py * 0.1;
  });

  return (
    <mesh ref={meshRef} position={config.position} scale={config.scale}>
      {geometryNode}
      <meshPhysicalMaterial
        color={config.color}
        transmission={0.92}
        roughness={0.08}
        thickness={0.5}
        envMapIntensity={0.5}
        clearcoat={0.3}
        clearcoatRoughness={0.1}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

export function GlassShapes({ isMobile }: { isMobile: boolean }) {
  // Show fewer shapes on mobile for performance
  const shapes = isMobile ? allShapes.slice(0, 3) : allShapes;

  return (
    <group>
      {shapes.map((config, i) => (
        <GlassShape key={i} config={config} />
      ))}
    </group>
  );
}
