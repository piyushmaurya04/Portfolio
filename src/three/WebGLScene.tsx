import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { DeveloperModel } from './DeveloperModel';
import { CameraRig } from './CameraRig';
import { Lighting } from './Lighting';
import { PostFX } from './PostFX';
import { HERO_STATE } from '../animation/sceneConfig';

interface WebGLSceneProps {
  simplified: boolean;
  elevated?: boolean;
}

/** One persistent, fixed full-viewport canvas that all sections scroll over. */
export function WebGLScene({ simplified, elevated = false }: WebGLSceneProps) {
  if (simplified) return null;

  return (
    <div className={`fixed inset-0 ${elevated ? 'z-[20]' : 'z-[2]'}`} aria-hidden="true">
      <Canvas
        dpr={[1, 1.6]}
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
        camera={{ position: HERO_STATE.camPos, fov: 35, near: 0.1, far: 100 }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 0.85;
        }}
      >
        <Suspense fallback={null}>
          <Lighting />
          <DeveloperModel />
          <CameraRig />
          <PostFX />
        </Suspense>
      </Canvas>
    </div>
  );
}
