import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { sampleScene, HERO_STATE } from '../animation/sceneConfig';
import { scrollStore } from '../animation/scrollStore';

const target = new THREE.Vector3();
const desired = new THREE.Vector3();

/** Drives the default camera from the sampled scene state with light damping. */
export function CameraRig() {
  const { camera } = useThree();
  const smoothed = useRef(false);

  useFrame((_, delta) => {
    const s = scrollStore.reducedMotion ? HERO_STATE : sampleScene(scrollStore.modelProgress);
    desired.set(s.camPos[0], s.camPos[1], s.camPos[2]);
    target.set(s.camTarget[0], s.camTarget[1], s.camTarget[2]);

    if (!smoothed.current || scrollStore.reducedMotion) {
      camera.position.copy(desired);
      smoothed.current = true;
    } else {
      const d = 1 - Math.pow(0.0015, delta); // frame-rate independent damping
      camera.position.lerp(desired, d);
    }
    camera.lookAt(target);
  });

  return null;
}
