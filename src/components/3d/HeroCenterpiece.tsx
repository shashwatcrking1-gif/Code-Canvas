"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Hero Centerpiece — a cluster of 3-4 glass shapes that "assemble" from
 * scattered positions into a cohesive formation on mount.
 * This is the single orchestrated "wow" moment.
 * After assembly, the cluster gently rotates as an idle animation.
 */

interface PieceConfig {
  geometry: "icosahedron" | "octahedron" | "dodecahedron" | "tetrahedron";
  startPosition: [number, number, number];
  endPosition: [number, number, number];
  scale: number;
  color: string;
}

const pieces: PieceConfig[] = [
  {
    geometry: "icosahedron",
    startPosition: [-5, 4, -8],
    endPosition: [0, 0.5, 0],
    scale: 0.65,
    color: "#ffb833",
  },
  {
    geometry: "octahedron",
    startPosition: [6, -3, -6],
    endPosition: [0.8, -0.3, 0.5],
    scale: 0.45,
    color: "#c5b8d6",
  },
  {
    geometry: "dodecahedron",
    startPosition: [-4, -5, -10],
    endPosition: [-0.7, -0.5, -0.3],
    scale: 0.5,
    color: "#b8c8d4",
  },
  {
    geometry: "tetrahedron",
    startPosition: [3, 6, -12],
    endPosition: [0.3, 0.9, -0.5],
    scale: 0.35,
    color: "#ffd37a",
  },
];

function AssemblingPiece({ config }: { config: PieceConfig }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [assembled, setAssembled] = useState(false);
  const progress = useRef(0);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    if (!assembled) {
      // Lerp from start to end position with easing
      progress.current = Math.min(progress.current + delta * 0.4, 1);
      const eased = 1 - Math.pow(1 - progress.current, 3); // ease-out cubic

      meshRef.current.position.lerpVectors(
        new THREE.Vector3(...config.startPosition),
        new THREE.Vector3(...config.endPosition),
        eased
      );

      // Fade in opacity during assembly
      const mat = meshRef.current.material as THREE.MeshPhysicalMaterial;
      mat.opacity = eased * 0.9;

      if (progress.current >= 1) {
        setAssembled(true);
      }
    }

    // Always rotate slowly (even during assembly for visual interest)
    meshRef.current.rotation.x += 0.004;
    meshRef.current.rotation.y += 0.006;
  });

  const geometryNode = (() => {
    switch (config.geometry) {
      case "icosahedron":
        return <icosahedronGeometry args={[1, 0]} />;
      case "octahedron":
        return <octahedronGeometry args={[1, 0]} />;
      case "dodecahedron":
        return <dodecahedronGeometry args={[1, 0]} />;
      case "tetrahedron":
        return <tetrahedronGeometry args={[1, 0]} />;
    }
  })();

  return (
    <mesh
      ref={meshRef}
      position={config.startPosition}
      scale={config.scale}
    >
      {geometryNode}
      <meshPhysicalMaterial
        color={config.color}
        transmission={0.94}
        roughness={0.05}
        thickness={0.6}
        envMapIntensity={0.6}
        clearcoat={0.5}
        clearcoatRoughness={0.05}
        transparent
        opacity={0}
      />
    </mesh>
  );
}

export function HeroCenterpiece() {
  const groupRef = useRef<THREE.Group>(null);

  // Gentle idle rotation for the entire cluster
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.3;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {pieces.map((config, i) => (
        <AssemblingPiece key={i} config={config} />
      ))}
    </group>
  );
}
