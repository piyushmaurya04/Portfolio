const WEEKS = 52;
const DAYS = 7;

// Deterministic pseudo-random intensity so the grid is stable across renders.
const levelAt = (i: number): number => {
  const n = Math.sin(i * 12.9898) * 43758.5453;
  const f = n - Math.floor(n);
  if (f > 0.82) return 4;
  if (f > 0.62) return 3;
  if (f > 0.4) return 2;
  if (f > 0.2) return 1;
  return 0;
};

const OPACITY = [0.05, 0.18, 0.34, 0.55, 0.8];

/** Representative (static) contribution-style grid — clearly non-live data. */
export function ContributionGrid() {
  return (
    <div className="spatial">
      <div
        className="spatial-inner grid gap-[3px]"
        style={{
          gridTemplateColumns: `repeat(${WEEKS}, 1fr)`,
          transform: 'rotateX(12deg) rotateZ(-1deg)',
        }}
      >
        {Array.from({ length: WEEKS * DAYS }).map((_, i) => (
          <span
            key={i}
            className="aspect-square rounded-[2px] bg-gilt"
            style={{ opacity: OPACITY[levelAt(i)] }}
          />
        ))}
      </div>
    </div>
  );
}
