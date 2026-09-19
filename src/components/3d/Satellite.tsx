"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";

export function Satellite() {
  const satelliteRef = useRef<THREE.Group>(null);
  const scroll = useScroll(); // Gets scroll progress from ScrollControls

  useFrame((state, delta) => {
    if (!satelliteRef.current) return;

    // Scroll progress is between 0 and 1
    // We want the satellite to do multiple revolutions based on scroll
    // e.g., 3 full revolutions across the page
    const progress = scroll.offset; 
    const numRevolutions = 3;
    const angle = progress * Math.PI * 2 * numRevolutions;
    
    // Orbital path parameters
    const radiusX = 8;
    const radiusZ = 12;

    // Calculate position
    const x = Math.cos(angle) * radiusX;
    const z = Math.sin(angle) * radiusZ - 5; // Offset Z to orbit the black hole at [0, 0, -5]
    // Slight Y wobble
    const y = Math.sin(progress * Math.PI * 8) * 1.5; 

    // Smoothly interpolate to the new position
    satelliteRef.current.position.lerp(new THREE.Vector3(x, y, z), 0.1);
    
    // Spin the satellite on its own axis
    satelliteRef.current.rotation.y += delta * 0.5;
    satelliteRef.current.rotation.x += delta * 0.2;
  });

  return (
    <group ref={satelliteRef}>
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color="#b8c8d4"
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>
      {/* Optional tiny moon around the satellite */}
      <mesh position={[1, 0.5, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}
