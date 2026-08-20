import { SceneSection } from '../components/layout/SceneSection';
import { Eyebrow } from '../components/typography/Eyebrow';
import { Reveal } from '../components/typography/Reveal';
import { scrollToSection } from '../hooks/useKeyboardNav';
import { personal } from '../data/personal';

export function HeroScene() {
  return (
    <SceneSection id="hero" index={0}>
      <div className="max-w-2xl lg:max-w-3xl">
        <Reveal>
          <Eyebrow index="00">Software Engineer</Eyebrow>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-8 font-display text-bone leading-[0.98]" style={{ fontSize: 'clamp(2.8rem, 8vw, 6.5rem)' }}>
            Building
            <br />
            systems that
            <br />
            <span className="italic text-bone/90">work.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-bone/75">
            {personal.name} — {personal.role} at {personal.employer}. Designing event-driven,
            fault-tolerant enterprise systems.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="mt-6 text-[0.7rem] uppercase tracking-[0.28em] text-bone/40">
            Java · Spring Boot · Kafka · React · SQL
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => scrollToSection('projects')}
              className="rounded-full bg-bone px-6 py-3 text-[0.72rem] uppercase tracking-[0.2em] text-ink transition-opacity duration-300 hover:opacity-85"
            >
              View My Work
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="rounded-full border border-bone/20 px-6 py-3 text-[0.72rem] uppercase tracking-[0.2em] text-bone/80 transition-colors duration-300 hover:border-gilt/50 hover:text-bone"
            >
              Get In Touch
            </button>
          </div>
        </Reveal>
      </div>
    </SceneSection>
  );
}
