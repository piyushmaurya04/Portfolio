import { useEffect, useState } from 'react';
import { SceneSection } from '../components/layout/SceneSection';
import { Eyebrow } from '../components/typography/Eyebrow';
import { Reveal } from '../components/typography/Reveal';
import { experience } from '../data/experience';
import { tenureSince } from '../lib/tenure';

export function ExperienceScene() {
  const job = experience[0];
  const [activeTab, setActiveTab] = useState<string>('wips');
  const [today, setToday] = useState(() => new Date());

  useEffect(() => {
    const updateAtMidnight = () => setToday(new Date());
    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0);
    const timeout = window.setTimeout(updateAtMidnight, nextMidnight.getTime() - now.getTime());
    return () => window.clearTimeout(timeout);
  }, [today]);

  const activeProject = job.projects.find((p) => p.id === activeTab) ?? job.projects[0];

  return (
    <SceneSection id="experience" index={3} className="relative z-30 pointer-events-auto">
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
        <div className="mt-12 max-w-2xl lg:max-w-3xl">
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
              {job.account} · {job.location} · {tenureSince(job.startDate, today)}
            </p>
          </Reveal>

          {/* Project / Initiative Tabs */}
          <Reveal delay={0.16}>
            <div
              role="tablist"
              aria-label="Experience Initiatives"
              className="relative z-20 mt-8 flex flex-wrap gap-2 border-b border-bone/10 pb-4"
            >
              {job.projects.map((proj) => {
                const isActive = activeTab === proj.id;
                return (
                  <button
                    key={proj.id}
                    role="tab"
                    id={`tab-${proj.id}`}
                    aria-selected={isActive}
                    aria-controls={`panel-${proj.id}`}
                    type="button"
                    onClick={() => setActiveTab(proj.id)}
                    className={`cursor-pointer rounded-full px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.16em] transition-all duration-300 ${
                      isActive
                        ? 'border border-gilt/60 bg-bone/10 text-bone shadow-[0_0_16px_rgba(201,168,106,0.18)]'
                        : 'border border-bone/12 text-bone/50 hover:border-bone/25 hover:text-bone/80'
                    }`}
                  >
                    {proj.shortName}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Active Tab Panel */}
          <div className="mt-6">
            <div
              key={activeProject.id}
              role="tabpanel"
              id={`panel-${activeProject.id}`}
              aria-labelledby={`tab-${activeProject.id}`}
              className="transition-opacity duration-300"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display text-lg text-bone/95 sm:text-xl">
                  {activeProject.name}
                </h3>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {activeProject.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-gilt/30 bg-gilt/5 px-2.5 py-0.5 text-[0.64rem] uppercase tracking-[0.14em] text-gilt"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <ul className="mt-6 space-y-3.5">
                {activeProject.highlights.map((h, i) => (
                  <li key={i} className="flex gap-4 text-sm leading-relaxed text-bone/75">
                    <span className="mt-1 text-[0.7rem] tabular-nums text-gilt/70">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* All Tech Stack overview */}
          <Reveal delay={0.22}>
            <div className="mt-10 border-t border-bone/10 pt-6">
              <p className="text-[0.64rem] uppercase tracking-[0.2em] text-bone/40">
                Core Technologies &amp; Tooling
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {job.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-bone/12 px-3 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-bone/55"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </SceneSection>
  );
}
