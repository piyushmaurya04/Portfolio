import { useEffect, useRef } from 'react';
import { sampleScene, HERO_STATE } from '../../animation/sceneConfig';
import { scrollStore } from '../../animation/scrollStore';

// Maps the model's world X/Y to a screen offset so the glow tracks the laptop.
const X_FACTOR = 11; // vw per world unit
const Y_FACTOR = 4; // vh per world unit

/** Glowing neon background object that follows the model across scenes. */
export function BackgroundGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const el = ref.current;
      if (el) {
        const s = scrollStore.reducedMotion ? HERO_STATE : sampleScene(scrollStore.modelProgress);
        const x = s.modelPos[0] * X_FACTOR;
        const y = -s.modelPos[1] * Y_FACTOR - 12; // raise so it peeks above the laptop
        el.style.transform = `translate(-50%, -50%) translate(${x}vw, ${y}vh)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={ref}
      className="absolute left-1/2 top-1/2 z-0 w-[58vw] max-w-[640px] opacity-50"
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <svg viewBox="0 0 240 160" className="glow-cloud w-full" aria-hidden="true">
        <defs>
          <linearGradient id="ringGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#eef2ff" />
            <stop offset="100%" stopColor="#cad7ff" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#ringGlow)" strokeLinecap="round">
          <ellipse cx="124" cy="82" rx="76" ry="48" strokeWidth="10" transform="rotate(-13 124 82)" />
          <ellipse cx="124" cy="82" rx="57" ry="35" strokeWidth="7" strokeOpacity="0.82" transform="rotate(22 124 82)" />
          <ellipse cx="124" cy="82" rx="38" ry="23" strokeWidth="5" strokeOpacity="0.62" transform="rotate(-40 124 82)" />
        </g>
      </svg>
    </div>
  );
}
