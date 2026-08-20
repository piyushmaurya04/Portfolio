import { SceneSection } from '../components/layout/SceneSection';
import { Eyebrow } from '../components/typography/Eyebrow';
import { Reveal } from '../components/typography/Reveal';
import { experience } from '../data/experience';
import { tenureSince } from '../lib/tenure';

export function ExperienceScene() {
  const job = experience[0];
  return (
    <SceneSection id="experience" index={3}>
      <div className="w-full">
        {/* Eyebrow + heading — left */}
        <div className="max-w-xl">
          <Reveal>
            <Eyebrow index="03">Experience</Eyebrow>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="mt-8 font-display leading-[1.05] text-bone" style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)' }}>
              Building scalable software with Java and Spring Boot.
            </h2>
          </Reveal>
        </div>

        {/* Details — left */}
        <div className="mt-12 max-w-2xl">
          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-bone/10 pt-6">
              <span className="font-display text-2xl text-bone">{job.companyShort}</span>
              <span className="text-sm text-bone/75">{job.role}</span>
              <span className="ml-auto text-[0.72rem] uppercase tracking-[0.2em] text-gilt">
                {job.period}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-3 text-[0.72rem] uppercase tracking-[0.2em] text-bone/40">
              {job.account} · {job.location} · {tenureSince(job.startDate)}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <ul className="mt-8 space-y-4">
              {job.highlights.map((h, i) => (
                <li key={i} className="flex gap-4 text-sm leading-relaxed text-bone/75">
                  <span className="mt-1 text-[0.7rem] tabular-nums text-gilt/70">0{i + 1}</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-8 flex flex-wrap gap-2">
              {job.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-bone/12 px-3 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-bone/55"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </SceneSection>
  );
}
