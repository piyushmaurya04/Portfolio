import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { sampleScene, HERO_STATE } from '../animation/sceneConfig';
import { scrollStore } from '../animation/scrollStore';

RectAreaLightUniformsLib.init();

/**
 * Dark-object + white-backlight rig: a rect-area backlight is the hero source,
 * with a soft front fill, a side rim and low ambient. A controlled environment
 * (lightformers, not a preset) supplies restrained reflections on the laptop.
 */
export function Lighting() {
  const back = useRef<THREE.RectAreaLight>(null);
  const rim = useRef<THREE.SpotLight>(null);
  const fill = useRef<THREE.DirectionalLight>(null);
  const ambient = useRef<THREE.AmbientLight>(null);

  useEffect(() => {
    back.current?.lookAt(0, 0, 3);
  }, []);

  useFrame(() => {
    const s = scrollStore.reducedMotion ? HERO_STATE : sampleScene(scrollStore.modelProgress);
    if (back.current) back.current.intensity = s.back;
    if (rim.current) rim.current.intensity = s.rim;
    if (fill.current) fill.current.intensity = s.fill * 0.55;
    if (ambient.current) ambient.current.intensity = s.ambient * 0.55;
  });

  return (
    <>
      <ambientLight ref={ambient} intensity={0.16} color={'#cfd6e6'} />

      {/* White cinematic backlight — the visual source behind the model */}
      <rectAreaLight
        ref={back}
        position={[0, 0.6, -3.2]}
        width={7}
        height={7}
        intensity={8}
        color={'#fff6ea'}
      />

      {/* Side rim for edge separation */}
      <spotLight
        ref={rim}
        position={[-4.5, 3, 1.5]}
        angle={0.6}
        penumbra={0.9}
        intensity={3}
        distance={20}
        color={'#eef2ff'}
      />

      {/* Soft front fill so faces/laptop are not pure black */}
      <directionalLight ref={fill} position={[2.5, 1.5, 5]} intensity={0.6} color={'#fff2e0'} />

      <Environment resolution={256}>
        <Lightformer form="rect" intensity={0.45} color="#ffffff" position={[0, 0.5, -4]} scale={[9, 9, 1]} />
        <Lightformer form="rect" intensity={0.12} color="#dfe6f5" position={[-5, 2, 2]} scale={[4, 6, 1]} rotation={[0, Math.PI / 3, 0]} />
        <Lightformer form="rect" intensity={0.1} color="#fff0dd" position={[5, 1, 3]} scale={[4, 5, 1]} rotation={[0, -Math.PI / 3, 0]} />
      </Environment>
    </>
  );
}
