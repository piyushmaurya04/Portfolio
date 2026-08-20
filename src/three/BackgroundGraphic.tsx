import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createGlowTexture } from './glowTexture';
import { sampleScene, HERO_STATE } from '../animation/sceneConfig';
import { scrollStore } from '../animation/scrollStore';

/**
 * Large additive white graphic behind the model. It is a real emissive object
 * in the scene (drives bloom) and reads as the source of the backlight.
 */
export function BackgroundGraphic() {
  const ref = useRef<THREE.Group>(null);
  const texture = useMemo(() => createGlowTexture(), []);

  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    const s = scrollStore.reducedMotion ? HERO_STATE : sampleScene(scrollStore.progress);
    g.position.set(s.glowPos[0], s.glowPos[1], s.glowPos[2]);
    g.scale.setScalar(s.glowScale);
  });

  return (
    <group ref={ref}>
      <mesh>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
