import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, ContactShadows } from '@react-three/drei';

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function ModelViewer({ modelUrl }) {
  return (
    <Canvas camera={{ position: [0, 1, 4], fov: 45 }} className="rounded-xl shadow-xl">
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <Suspense fallback={null}>
        <Model url={modelUrl} />
        <Environment preset="city" />
        <ContactShadows position={[0, -1.2, 0]} opacity={0.5} scale={10} blur={1.5} far={10} />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Suspense>
    </Canvas>
  );
}
