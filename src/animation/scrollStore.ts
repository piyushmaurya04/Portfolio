import type Lenis from 'lenis';

/**
 * Mutable, non-reactive store shared between the DOM scroll layer and the
 * WebGL render loop. Updated every scroll tick; read inside useFrame so the
 * 3D scene animates without triggering React re-renders.
 */
export const scrollStore = {
  progress: 0,
  // Progress used to drive the 3D scene; excludes pinned-section scroll distance
  // so the model stays in sync with the text.
  modelProgress: 0,
  velocity: 0,
  active: 0,
  reducedMotion: false,
  simplified: false,
  skillsPin: null as { start: number; distance: number } | null,
  lenis: null as Lenis | null,
};
