import { BackgroundGlow } from './BackgroundGlow';
import { useMediaQuery } from '../../hooks/useMediaQuery';

/**
 * Fixed layered background sitting behind the WebGL canvas:
 * near-black base, central radial illumination, faint architectural grid,
 * a receding perspective grid floor, vignette and procedural grain.
 */
export function GlobalBackground() {
  const showBackgroundGlow = useMediaQuery('(min-width: 1024px)');

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      {/* Layer 1 — near-black base */}
      <div className="absolute inset-0 z-0 bg-ink" />

      {/* Layer 2 — subtle radial illumination around the hero */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(60% 55% at 55% 42%, rgba(60,58,54,0.35) 0%, rgba(12,12,14,0.0) 60%)',
        }}
      />

      {/* Layer 2b — glowing neon background object that tracks the model */}
      {showBackgroundGlow && <BackgroundGlow />}

      {/* Layer 3 — architectural grid */}
      <div className="arch-grid absolute inset-0 z-[1] opacity-70" />

      {/* Layer 3b — perspective grid floor receding to the horizon */}
      <div className="persp-grid" />

      {/* Layer 5 — vignette */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(120% 100% at 50% 45%, transparent 55%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* Layer 4 — grain */}
      <div className="grain absolute inset-0 z-[1]" />
    </div>
  );
}
