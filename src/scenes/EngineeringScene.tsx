import { SceneSection } from '../components/layout/SceneSection';
import { Eyebrow } from '../components/typography/Eyebrow';
import { Reveal } from '../components/typography/Reveal';
import { engineeringRows } from '../data/skills';

export function EngineeringScene() {
  return (
    <SceneSection id="engineering" index={3}>
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow index="03">Engineering</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-8 font-display text-bone" style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)' }}>
            How it&apos;s built.
          </h2>
        </Reveal>

        <div className="spatial mt-10">
          <ul className="spatial-inner" style={{ transform: 'rotateX(6deg) rotateY(-4deg)' }}>
            {engineeringRows.map((row, i) => (
              <Reveal key={row.index} delay={0.04 * i}>
                <li className="group flex items-baseline gap-6 border-t border-bone/10 py-5 last:border-b">
                  <span className="text-[0.72rem] tabular-nums text-gilt/70">{row.index}</span>
                  <span
                    className="font-display text-bone/90 transition-colors duration-300 group-hover:text-bone"
                    style={{ fontSize: 'clamp(1.3rem, 2.6vw, 2rem)' }}
                  >
                    {row.title}
                  </span>
                  <span className="ml-auto text-right text-[0.72rem] uppercase tracking-[0.14em] text-bone/40">
                    {row.detail}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </SceneSection>
  );
}
