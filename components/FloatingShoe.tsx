
import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PresentationControls, Environment, ContactShadows, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

function ShoeModel({ modelUrl, themeColor, scale }: { modelUrl: string, themeColor: string, scale: number }) {
  const { scene } = useGLTF(modelUrl);
  const shoeRef = useRef<THREE.Group>(null);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material instanceof THREE.MeshStandardMaterial) {
          const name = mesh.name.toLowerCase();
          
          // Applying theme colors to the most visible parts of the Khronos model
          // This model has parts like 'Shoe', 'Sole', etc.
          if (
            name.includes('shoe') || 
            name.includes('laces') || 
            name.includes('fabric') ||
            name.includes('trim')
          ) {
             mesh.material.color = new THREE.Color(themeColor);
          }
          
          mesh.material.envMapIntensity = 2.0;
          mesh.material.roughness = 0.3;
          mesh.material.metalness = 0.6;
        }
      }
    });
  }, [scene, themeColor]);

  useFrame((state) => {
    if (!shoeRef.current) return;
    const t = state.clock.getElapsedTime();
    
    const targetRotateY = (state.mouse.x * Math.PI) / 3;
    const targetRotateX = (-state.mouse.y * Math.PI) / 6;
    
    shoeRef.current.rotation.y = THREE.MathUtils.lerp(shoeRef.current.rotation.y, targetRotateY, 0.05);
    shoeRef.current.rotation.x = THREE.MathUtils.lerp(shoeRef.current.rotation.x, targetRotateX, 0.05);
    
    shoeRef.current.position.y = Math.sin(t * 1.5) * 0.1;
  });

  return (
    <primitive 
      ref={shoeRef} 
      object={scene} 
      scale={scale} 
      position={[0, -0.2, 0]}
      rotation={[0, -Math.PI / 2.5, 0]}
    />
  );
}

const Loader = () => (
  <mesh>
    <sphereGeometry args={[1, 64, 64]} />
    <MeshDistortMaterial 
      color="#000000" 
      speed={4} 
      distort={0.4} 
      radius={1} 
      wireframe 
      opacity={0.05}
      transparent
    />
  </mesh>
);

interface FloatingShoeProps {
  modelUrl: string;
  themeColor: string;
  scale: number;
}

export const FloatingShoe: React.FC<FloatingShoeProps> = ({ modelUrl, themeColor, scale }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 w-full h-full">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.12, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
      >
        <h1 className="text-[48vw] font-black tracking-tighter leading-none italic text-black uppercase select-none">
          AIR
        </h1>
      </motion.div>

      <div className="w-full h-full relative">
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 35 }} shadows>
          <Suspense fallback={<Loader />}>
            <Environment preset="studio" />
            <ambientLight intensity={0.7} />
            
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={3} castShadow />
            <pointLight position={[-10, 5, 5]} intensity={10} color={themeColor} />
            
            <PresentationControls
              global
              config={{ mass: 2, tension: 200 }}
              snap={{ mass: 3, tension: 400 }}
              rotation={[0, 0, 0]}
              polar={[-Math.PI / 6, Math.PI / 6]}
              azimuth={[-Math.PI / 1.5, Math.PI / 1.5]}
            >
              <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.8}>
                <ShoeModel modelUrl={modelUrl} themeColor={themeColor} scale={scale} />
              </Float>
            </PresentationControls>

            <ContactShadows 
              position={[0, -1.8, 0]} 
              opacity={0.5} 
              scale={20} 
              blur={2.8} 
              far={5} 
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

import { PRODUCTS } from '../constants';
// Preloading the unique stable URL
useGLTF.preload(PRODUCTS[0].modelUrl);
