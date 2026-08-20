import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { sampleScene, HERO_STATE } from '../animation/sceneConfig';
import { scrollStore } from '../animation/scrollStore';

const MODEL_URL = '/models/developer.glb';
const TARGET_SIZE = 2.75;
const DEG = Math.PI / 180;

/**
 * The persistent hero object. The GLB is oriented, centered and normalized once,
 * then its group is driven every frame from the sampled scene state.
 * Geometry ships without normals, so they are computed on load.
 */
export function DeveloperModel() {
  const { scene } = useGLTF(MODEL_URL);
  const pivot = useRef<THREE.Group>(null);

  const prepared = useMemo(() => {
    const root = scene.clone(true);
    root.rotation.set(-Math.PI / 2, 0, 0); // Z-up model -> Y-up scene

    root.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = false;
      mesh.receiveShadow = false;
      mesh.geometry.computeVertexNormals();

      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const raw of materials) {
        const mat = raw as THREE.MeshStandardMaterial;
        mat.envMapIntensity = 0.18;
        if (/photo|wallpaper|screen|portrait/i.test(mat.name)) {
          // Keep the embedded photo visible in a dark scene by self-lighting it.
          mat.emissive = new THREE.Color(0xffffff);
          mat.emissiveMap = mat.map;
          mat.emissiveIntensity = 1.15;
          mat.toneMapped = true;
          mat.roughness = 0.5;
        } else if (/alumin/i.test(mat.name)) {
          mat.roughness = Math.max(mat.roughness ?? 0.25, 0.68);
          mat.envMapIntensity = 0.2;
        }
        mat.needsUpdate = true;
      }
    });

    root.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    root.position.sub(center);

    const fit = new THREE.Group();
    fit.add(root);
    fit.scale.setScalar(TARGET_SIZE / maxDim);
    return fit;
  }, [scene]);

  useFrame((state) => {
    const p = pivot.current;
    if (!p) return;
    const s = scrollStore.reducedMotion ? HERO_STATE : sampleScene(scrollStore.modelProgress);
    const simp = scrollStore.simplified;
    // Subtle idle float/sway so the model feels alive when not scrolling.
    const t = state.clock.elapsedTime;
    const idle = scrollStore.reducedMotion ? 0 : 1;
    const floatY = Math.sin(t * 0.6) * 0.05 * idle;
    const swayY = Math.sin(t * 0.4) * 0.9 * idle; // degrees
    const swayZ = Math.sin(t * 0.5) * 0.5 * idle; // degrees
    // On small screens amplify the side offset slightly and shrink so the model
    // reads as a cropped accent that never sits under the typography.
    p.position.set(
      s.modelPos[0] * (simp ? 1.05 : 1),
      s.modelPos[1] + floatY,
      s.modelPos[2] + (simp ? -0.5 : 0),
    );
    p.rotation.set(
      s.modelRotDeg[0] * DEG,
      (s.modelRotDeg[1] + swayY) * DEG,
      (s.modelRotDeg[2] + swayZ) * DEG,
    );
    p.scale.setScalar(s.modelScale * (simp ? 0.8 : 1));
  });

  return (
    <group ref={pivot}>
      <primitive object={prepared} />
    </group>
  );
}

useGLTF.preload(MODEL_URL);
