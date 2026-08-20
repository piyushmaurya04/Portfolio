import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SceneSection } from '../components/layout/SceneSection';
import { Eyebrow } from '../components/typography/Eyebrow';
import { Reveal } from '../components/typography/Reveal';
import { ProjectCard } from '../components/projects/ProjectCard';
import { ProjectModal } from '../components/projects/ProjectModal';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';

const STEP = 236; // card width (220) + gap (16)

export function ProjectsScene() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollCards = (direction: -1 | 1) => {
    trackRef.current?.scrollBy({ left: STEP * direction, behavior: 'smooth' });
  };

  return (
    <SceneSection id="projects" index={2}>
      <div className="ml-auto max-w-4xl">
        <div className="ml-auto max-w-xl text-right">
          <Reveal>
            <Eyebrow index="02" className="justify-end">Projects</Eyebrow>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="mt-8 font-display text-bone" style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)' }}>
              Selected work.
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="mt-6 flex justify-end gap-2">
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                aria-label="Previous projects"
                onClick={() => scrollCards(-1)}
                className="grid h-10 w-10 place-items-center rounded-full border border-bone/15 text-bone/70 transition-colors duration-300 hover:border-gilt/50 hover:text-bone"
              >
                <ChevronLeft size={17} />
              </button>
              <button
                type="button"
                aria-label="Next projects"
                onClick={() => scrollCards(1)}
                className="grid h-10 w-10 place-items-center rounded-full border border-bone/15 text-bone/70 transition-colors duration-300 hover:border-gilt/50 hover:text-bone"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            ref={trackRef}
            className="proj-viewport no-scrollbar ml-auto mt-6 max-w-[760px]"
            aria-label="Selected work projects"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="proj-track" style={{ transform: 'rotateY(-16deg)' }}>
              {projects.map((p, i) => (
                <div key={p.id} className="proj-item" onMouseEnter={() => setHoveredIndex(i)}>
                  <ProjectCard
                    project={p}
                    index={i}
                    active={hoveredIndex === null ? i === 1 : hoveredIndex === i}
                    onOpen={setSelected}
                  />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </SceneSection>
  );
}
