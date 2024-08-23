"use client";
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { MeshStandardMaterial, ReinhardToneMapping } from "three";

const Model = ({ url }) => {
  const { scene } = useGLTF(url);
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.traverse((child) => {
        if (child.isMesh) {
          const originalMaterial = child.material.clone();

          const newMaterial = new MeshStandardMaterial({
            metalness: 1,
            roughness: 0.4,
            transparent: true,
          });
          newMaterial.color.copy(originalMaterial.color);

          child.material = newMaterial;
        }
      });
    }
  }, [ref]);

  return <primitive object={scene} ref={ref} />;
};

const SetToneMapping = () => {
  const { gl } = useThree();
  useEffect(() => {
    gl.toneMapping = ReinhardToneMapping;
    gl.toneMappingExposure = 1;
  }, [gl]);

  return null;
};

const ThreeScene = ({ modelUrl }) => {
  return (
    <Canvas>
      <Model url={modelUrl} />
      <OrbitControls />
      <SetToneMapping />
      <Environment preset="studio" />
      {/* Environment preset property = // sunset // apartment // warehouse // studio */}
    </Canvas>
  );
};

export default ThreeScene;
