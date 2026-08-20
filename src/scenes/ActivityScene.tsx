import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SceneSection } from '../components/layout/SceneSection';
import { Eyebrow } from '../components/typography/Eyebrow';
import { Reveal } from '../components/typography/Reveal';
import { achievements } from '../data/achievements';

gsap.registerPlugin(ScrollTrigger);

export function ActivityScene() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = cardsRef.current;
    if (!grid || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cards = gsap.utils.toArray<HTMLElement>(grid.children);
    const directions = [{ y: -56 }, { x: 72 }, { y: 56 }, { x: -72 }];
    const context = gsap.context(() => {
      cards.forEach((card, index) => gsap.set(card, { autoAlpha: 0, ...directions[index] }));

      const timeline = gsap.timeline({
        scrollTrigger: { trigger: grid, start: 'top 82%', once: true },
      });
      cards.forEach((card) => {
        timeline.to(card, { autoAlpha: 1, x: 0, y: 0, duration: 0.35, ease: 'power3.out' }, '+=0.03');
      });
    }, grid);

    return () => context.revert();
  }, []);

  return (
    <SceneSection id="achievements" index={5}>
      <div className="ml-auto max-w-3xl">
        <Reveal>
          <Eyebrow index="05">Achievements</Eyebrow>
        </Reveal>
        <Reveal delay={0.05} x={80}>
          <h2 className="mt-8 font-display text-bone" style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)' }}>
            Achievements &amp; coding profiles.
          </h2>
        </Reveal>

        <div ref={cardsRef} className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {achievements.map((a) => (
            <div
              key={a.title}
              className="rounded-lg border border-bone/20 bg-ink/35 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-500 ease-editorial hover:border-gilt/50 hover:bg-ink/50 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_20px_48px_rgba(0,0,0,0.3)]"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-display text-xl text-bone">{a.title}</span>
                <span className="text-[0.64rem] uppercase tracking-[0.18em] text-gilt">{a.meta}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-bone/90">{a.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </SceneSection>
  );
}
