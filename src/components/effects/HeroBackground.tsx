import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = () => {
  const ref = useRef<THREE.Points>(null);
  
  // Generate random particles in a sphere
  const [positions] = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 10 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return [positions];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x -= 0.0005;
      ref.current.rotation.y -= 0.0005;
      
      // Subtle mouse interaction
      const mouseX = (state.pointer.x * Math.PI) / 10;
      const mouseY = (state.pointer.y * Math.PI) / 10;
      
      ref.current.rotation.x += (mouseY - ref.current.rotation.x) * 0.05;
      ref.current.rotation.y += (mouseX - ref.current.rotation.y) * 0.05;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#8b5cf6"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  );
};

const AbstractShape = () => {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (mesh.current) {
      // Rotate slowly
      mesh.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      
      // Mouse interaction
      mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, state.pointer.x * 1.5, 0.05);
      mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, state.pointer.y * 1.5, 0.05);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={mesh} args={[1.8, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#ffffff"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.1}
        />
      </Sphere>
      
      {/* Add an inner glowing wireframe sphere */}
      <Sphere args={[1.85, 32, 32]}>
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.15} />
      </Sphere>
    </Float>
  );
};

const HeroBackground: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
      <ambientLight intensity={3} />
      <directionalLight position={[10, 10, 10]} intensity={4} color="#00f0ff" />
      <directionalLight position={[-10, -10, -10]} intensity={4} color="#8b5cf6" />
      <pointLight position={[0, 0, 5]} intensity={4} color="#3b82f6" />
      <ParticleField />
      <AbstractShape />
    </Canvas>
  );
};

export default HeroBackground;
