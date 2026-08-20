import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SceneSection } from '../components/layout/SceneSection';
import { Eyebrow } from '../components/typography/Eyebrow';
import { Reveal } from '../components/typography/Reveal';
import { scrollToSection } from '../hooks/useKeyboardNav';
import { personal } from '../data/personal';

export function HeroScene() {
  const [versionsOpen, setVersionsOpen] = useState(false);
  const versionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!versionsRef.current?.contains(event.target as Node)) {
        setVersionsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setVersionsOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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

        <Reveal delay={0.3}>
          <div className="mt-4">
            <div ref={versionsRef} className="relative inline-block">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={versionsOpen}
                onClick={() => setVersionsOpen((open) => !open)}
                className="inline-flex items-center gap-2 py-3 text-left text-[0.72rem] uppercase tracking-[0.16em] text-bone/65 transition-colors duration-300 hover:text-gilt"
              >
                <span>
                  Wanna Try Different Versions of the <span className="underline underline-offset-4">Portfolio</span> ??
                </span>
                <ChevronDown size={15} className={`shrink-0 transition-transform duration-300 ${versionsOpen ? 'rotate-180' : ''}`} />
              </button>

              {versionsOpen && (
                <div
                  role="menu"
                  className="absolute left-0 top-full z-30 mt-2 min-w-full rounded-lg border border-bone/15 bg-ink-800/95 p-2 shadow-[0_18px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
                >
                  <a
                    href="https://piyushmaurya-portfolio-v2.netlify.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    role="menuitem"
                    onClick={() => setVersionsOpen(false)}
                    className="block whitespace-nowrap rounded-md px-3 py-2 text-[0.68rem] uppercase tracking-[0.14em] text-bone/75 transition-colors duration-300 hover:bg-bone/10 hover:text-gilt"
                  >
                    Version v2 - Code Nexus
                  </a>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </SceneSection>
  );
}
