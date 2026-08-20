export type Vec3 = [number, number, number];

export interface SceneState {
  camPos: Vec3;
  camTarget: Vec3;
  modelPos: Vec3;
  modelRotDeg: Vec3;
  modelScale: number;
  back: number; // backlight (rect area)
  rim: number; // rim / spot
  fill: number; // front fill
  ambient: number;
  glowPos: Vec3;
  glowScale: number;
}

export interface SectionMeta {
  id: string;
  label: string;
  index: string;
  at: number; // normalized scroll progress for this scene keyframe
}

export const SECTIONS: SectionMeta[] = [
  { id: 'hero', label: 'Start', index: '01', at: 0.0 },
  { id: 'about', label: 'About', index: '02', at: 1 / 6 },
  { id: 'projects', label: 'Projects', index: '03', at: 2 / 6 },
  { id: 'experience', label: 'Experience', index: '04', at: 3 / 6 },
  { id: 'skills', label: 'Skills', index: '05', at: 4 / 6 },
  { id: 'achievements', label: 'Achievements', index: '06', at: 5 / 6 },
  { id: 'contact', label: 'Contact', index: '07', at: 1.0 },
];

// Keyframes align 1:1 with SECTIONS (indexed by section id).
const KEYFRAMES: Record<string, SceneState> = {
  hero: {
    camPos: [0, 0.1, 6.4],
    camTarget: [0.1, 0, 0],
    modelPos: [1.8, -0.15, 0],
    modelRotDeg: [0, -32, 0],
    modelScale: 1.0,
    back: 8, rim: 3, fill: 0.6, ambient: 0.16,
    glowPos: [1.7, 0.1, -3], glowScale: 5.4,
  },
  about: {
    camPos: [0.4, 0.2, 6.9],
    camTarget: [0.15, 0, 0],
    modelPos: [1.8, -0.1, -0.3],
    modelRotDeg: [0, -30, 0],
    modelScale: 0.98,
    back: 7, rim: 4, fill: 0.5, ambient: 0.15,
    glowPos: [1.6, 0.2, -3.3], glowScale: 4.0,
  },
  projects: {
    camPos: [-0.3, 0.1, 7.1],
    camTarget: [-0.15, 0, 0],
    modelPos: [-2.3, -0.2, -0.6],
    modelRotDeg: [0, 30, 0],
    modelScale: 0.92,
    back: 6, rim: 3.5, fill: 0.6, ambient: 0.16,
    glowPos: [-1.6, 0.1, -3.4], glowScale: 3.6,
  },
  experience: {
    camPos: [0.2, 0.5, 6.6],
    camTarget: [0.15, 0.1, 0],
    modelPos: [1.8, -0.1, -0.4],
    modelRotDeg: [4, -30, 0],
    modelScale: 0.96,
    back: 6, rim: 5, fill: 0.5, ambient: 0.15,
    glowPos: [1.4, 0.3, -3.2], glowScale: 3.8,
  },
  skills: {
    camPos: [0, 0.2, 7.4],
    camTarget: [0, 0, 0],
    modelPos: [1.7, -0.25, -2.2],
    modelRotDeg: [0, -14, 0],
    modelScale: 0.8,
    back: 6.5, rim: 4, fill: 0.55, ambient: 0.17,
    glowPos: [0, 0.2, -3.6], glowScale: 4.4,
  },
  achievements: {
    camPos: [-0.2, 0.3, 7.0],
    camTarget: [-0.13, 0.05, 0],
    modelPos: [-2.3, -0.2, -0.7],
    modelRotDeg: [0, 30, 0],
    modelScale: 0.92,
    back: 6, rim: 4.5, fill: 0.5, ambient: 0.16,
    glowPos: [-1.3, 0.2, -3.4], glowScale: 3.7,
  },
  contact: {
    camPos: [0, 0.1, 6.3],
    camTarget: [0.1, 0, 0],
    modelPos: [1.8, -0.1, 0],
    modelRotDeg: [0, -30, 0],
    modelScale: 1.05,
    back: 8.5, rim: 3, fill: 0.6, ambient: 0.16,
    glowPos: [1.5, 0.15, -3], glowScale: 5.6,
  },
};

const smoothstep = (t: number): number => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
const lerp3 = (a: Vec3, b: Vec3, t: number): Vec3 => [
  lerp(a[0], b[0], t),
  lerp(a[1], b[1], t),
  lerp(a[2], b[2], t),
];

/** Interpolate the full scene state for a normalized scroll progress (0..1). */
export function sampleScene(progress: number): SceneState {
  const p = Math.min(Math.max(progress, 0), 1);
  let lower = SECTIONS[0];
  let upper = SECTIONS[SECTIONS.length - 1];
  for (let i = 0; i < SECTIONS.length - 1; i++) {
    if (p >= SECTIONS[i].at && p <= SECTIONS[i + 1].at) {
      lower = SECTIONS[i];
      upper = SECTIONS[i + 1];
      break;
    }
  }
  const span = upper.at - lower.at || 1;
  const t = smoothstep((p - lower.at) / span);
  const a = KEYFRAMES[lower.id];
  const b = KEYFRAMES[upper.id];
  return {
    camPos: lerp3(a.camPos, b.camPos, t),
    camTarget: lerp3(a.camTarget, b.camTarget, t),
    modelPos: lerp3(a.modelPos, b.modelPos, t),
    modelRotDeg: lerp3(a.modelRotDeg, b.modelRotDeg, t),
    modelScale: lerp(a.modelScale, b.modelScale, t),
    back: lerp(a.back, b.back, t),
    rim: lerp(a.rim, b.rim, t),
    fill: lerp(a.fill, b.fill, t),
    ambient: lerp(a.ambient, b.ambient, t),
    glowPos: lerp3(a.glowPos, b.glowPos, t),
    glowScale: lerp(a.glowScale, b.glowScale, t),
  };
}

/** Returns a named composition directly when a section needs a hard scene lock. */
export function sceneStateFor(id: string): SceneState {
  return KEYFRAMES[id] ?? KEYFRAMES.hero;
}

export const HERO_STATE = KEYFRAMES.hero;
