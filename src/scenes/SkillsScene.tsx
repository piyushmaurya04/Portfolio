import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SceneSection } from '../components/layout/SceneSection';
import { Eyebrow } from '../components/typography/Eyebrow';
import { Reveal } from '../components/typography/Reveal';
import { skillGroups } from '../data/skills';
import { scrollStore } from '../animation/scrollStore';

gsap.registerPlugin(ScrollTrigger);

export function SkillsScene() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = gsap.utils.toArray<HTMLElement>(grid.children);
    if (cards.length <= 1) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(cards, { opacity: 1, y: 0 });
      return;
    }

    // First card visible; the rest reveal one-by-one while the section is pinned.
    const hidden = cards.slice(1);
    gsap.set(hidden, { opacity: 0, y: 40 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#skills',
        start: 'top top',
        end: () => '+=' + hidden.length * window.innerHeight * 0.7,
        pin: true,
        anticipatePin: 1,
        scrub: 0.6,
        invalidateOnRefresh: true,
        // Expose the pin range so the 3D scene can subtract it and stay in sync.
        onRefresh: (self) => {
          scrollStore.skillsPin = { start: self.start, distance: self.end - self.start };
        },
      },
    });
    hidden.forEach((card) => {
      tl.to(card, { opacity: 1, y: 0, ease: 'power2.out', duration: 1 }, '+=0.6');
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      scrollStore.skillsPin = null;
    };
  }, []);

  return (
    <SceneSection id="skills" index={4}>
      <div className="w-full">
        <Reveal>
          <Eyebrow index="04">Skills</Eyebrow>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-8 font-display text-bone" style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)' }}>
            The stack.
          </h2>
        </Reveal>

        <div ref={gridRef} className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g) => (
            <div
              key={g.label}
              className="rounded-lg border border-bone/20 bg-ink/35 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-500 ease-editorial hover:border-gilt/50 hover:bg-ink/50 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_20px_48px_rgba(0,0,0,0.3)]"
            >
              <p className="text-[0.62rem] uppercase tracking-[0.2em] text-gilt/80">{g.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-bone/75">{g.items.join(' · ')}</p>
            </div>
          ))}
        </div>
      </div>
    </SceneSection>
  );
}
