import { useEffect, useRef } from 'react';
import { scrollStore } from '../../animation/scrollStore';

/** Thin top progress bar driven directly from the store (no React state). */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      if (ref.current) {
        ref.current.style.transform = `scaleX(${scrollStore.progress})`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-40 h-px bg-transparent">
      <div
        ref={ref}
        className="h-full origin-left bg-gilt/70"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
