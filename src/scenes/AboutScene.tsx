import { SceneSection } from '../components/layout/SceneSection';
import { Eyebrow } from '../components/typography/Eyebrow';
import { Reveal } from '../components/typography/Reveal';
import { stats } from '../data/achievements';
import { personal } from '../data/personal';

const QUICK_FACTS = [
  'B.Tech, Computer Engineering — SSVPS, Dhule (2020–2024)',
  'System Engineer @ TCS, Mumbai, India',
  'Java · Spring Boot · Kafka · Microservices',
];

export function AboutScene() {
  return (
    <SceneSection id="about" index={1}>
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow index="01">About</Eyebrow>
        </Reveal>

        <Reveal delay={0.05} x={-80}>
          <h2 className="mt-8 font-display leading-[1.05] text-bone" style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)' }}>
            Engineering reliable, event-driven systems.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 text-sm leading-relaxed text-bone/75">
            I&apos;m a Software Engineer at {personal.employer} ({personal.employerShort}), working on the
            client account in Mumbai. I build enterprise Java / Spring Boot applications and design
            event-driven, fault-tolerant Apache Kafka pipelines with dead-letter-queue handling that
            eliminate manual intervention and prevent data loss.
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-4 text-sm leading-relaxed text-bone/75">
            I have a solid foundation in SQL, production support and CI/CD (Docker, Jenkins). I
            independently own the full production deployment lifecycle, from build to release, and was
            recognized with a TCS GEMS Award for Best Team.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <ul className="mt-8 space-y-2 border-t border-bone/10 pt-6">
            {QUICK_FACTS.map((f, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-bone/75">
                <span className="mt-1 text-[0.7rem] tabular-nums text-gilt/70">0{i + 1}</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-bone/10 pt-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl text-bone">{s.value}</p>
                <p className="mt-1 text-[0.62rem] uppercase tracking-[0.16em] text-bone/40">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </SceneSection>
  );
}
