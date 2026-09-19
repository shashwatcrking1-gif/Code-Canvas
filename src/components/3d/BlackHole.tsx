"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function BlackHole() {
  const diskRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (diskRef.current) {
      // Fast rotation for the accretion disk
      diskRef.current.rotation.z -= delta * 0.2;
    }
    if (coreRef.current) {
      // The event horizon slowly rotates as well
      coreRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group position={[0, 0, -5]} rotation={[Math.PI * 0.45, 0, 0]}>
      {/* Event Horizon (Pure Black) */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Accretion Disk (Glowing Ring) */}
      <mesh ref={diskRef} rotation={[Math.PI / 2, 0, 0]}>
        {/* Inner radius just outside event horizon, outer radius spreading outwards */}
        <ringGeometry args={[2.8, 6.5, 128]} />
        {/* Using a bright emissive color. We rely on Postprocessing Bloom to make it glow heavily */}
        <meshStandardMaterial
          color="#ffb833"
          emissive="#fa9705"
          emissiveIntensity={2.5}
          side={THREE.DoubleSide}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Secondary outer faded disk for more atmospheric depth */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[6.5, 9, 64]} />
        <meshStandardMaterial
          color="#db7600"
          emissive="#943d03"
          emissiveIntensity={0.8}
          side={THREE.DoubleSide}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}
