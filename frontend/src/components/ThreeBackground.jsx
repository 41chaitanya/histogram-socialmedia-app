import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import * as THREE from 'three';

// Floating particles component
const Particles = ({ count = 200 }) => {
  const { isDark } = useTheme();
  const mesh = useRef();
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      temp.push({ x, y, z });
    }
    return temp;
  }, [count]);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    particles.forEach((p, i) => {
      pos[i * 3] = p.x;
      pos[i * 3 + 1] = p.y;
      pos[i * 3 + 2] = p.z;
    });
    return pos;
  }, [particles, count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.05;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={isDark ? '#E1306C' : '#833AB4'}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Gradient sphere
const GradientSphere = () => {
  const { isDark } = useTheme();
  const mesh = useRef();

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.1;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, -5]}>
      <icosahedronGeometry args={[2, 1]} />
      <meshBasicMaterial
        color={isDark ? '#405DE6' : '#F77737'}
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
};

const ThreeBackground = () => {
  const { isDark } = useTheme();
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      background: isDark 
        ? 'linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%)'
        : 'linear-gradient(135deg, #fafafa 0%, #f0f0f0 50%, #e8e8e8 100%)'
    }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <Particles />
        <GradientSphere />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
