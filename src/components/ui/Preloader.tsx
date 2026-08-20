import { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import { personal } from '../../data/personal';

/** Editorial loading layer that fades once the model and assets are ready. */
export function Preloader() {
  const { progress, active } = useProgress();
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    if (!active && progress >= 100) {
      const t = setTimeout(() => setHidden(true), 400);
      return () => clearTimeout(t);
    }
  }, [active, progress]);

  useEffect(() => {
    if (hidden) {
      const t = setTimeout(() => setRemoved(true), 900);
      return () => clearTimeout(t);
    }
  }, [hidden]);

  if (removed) return null;
  const pct = Math.min(100, Math.round(progress));

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink transition-opacity duration-700 ease-editorial ${
        hidden ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      role="status"
      aria-live="polite"
    >
      <span className="font-display text-4xl text-bone/90">{personal.monogram}</span>
      <p className="eyebrow mt-6 text-bone/40">Loading Experience</p>
      <div className="mt-5 h-px w-40 overflow-hidden bg-bone/10">
        <div
          className="h-full bg-gilt/70 transition-[width] duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="mt-3 text-[0.7rem] tabular-nums text-bone/40">{pct}%</span>
    </div>
  );
}
