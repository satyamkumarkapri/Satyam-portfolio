import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Torus, Float } from '@react-three/drei';
import * as THREE from 'three';

const HologramRing: React.FC = () => {
  const outerRing = useRef<THREE.Mesh>(null);
  const innerRing = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (outerRing.current && innerRing.current) {
      outerRing.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
      outerRing.current.rotation.z = state.clock.getElapsedTime() * 0.1;
      
      innerRing.current.rotation.x = Math.PI / 2.2 + Math.sin(state.clock.getElapsedTime() * 0.3) * 0.05;
      innerRing.current.rotation.z = state.clock.getElapsedTime() * -0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group>
        <Torus ref={outerRing} args={[3.2, 0.01, 16, 100]}>
          <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.6} />
        </Torus>
        <Torus ref={innerRing} args={[2.8, 0.005, 16, 100]}>
          <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.6} />
        </Torus>
      </group>
    </Float>
  );
};

export default HologramRing;
