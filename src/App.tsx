import { useCallback, useEffect, useRef, useState } from 'react';
import { WebGLScene } from './three/WebGLScene';
import { GlobalBackground } from './components/layout/GlobalBackground';
import { Footer } from './components/layout/Footer';
import { TopNavigation } from './components/navigation/TopNavigation';
import { MobileMenu } from './components/navigation/MobileMenu';
import { KeyboardHint } from './components/navigation/KeyboardHint';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { Preloader } from './components/ui/Preloader';
import { SceneErrorBoundary, isWebGLAvailable } from './components/SceneErrorBoundary';
import { HeroScene } from './scenes/HeroScene';
import { AboutScene } from './scenes/AboutScene';
import { ProjectsScene } from './scenes/ProjectsScene';
import { ExperienceScene } from './scenes/ExperienceScene';
import { SkillsScene } from './scenes/SkillsScene';
import { ActivityScene } from './scenes/ActivityScene';
import { ContactScene } from './scenes/ContactScene';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useKeyboardNav } from './hooks/useKeyboardNav';
import { usePrefersReducedMotion, useMediaQuery } from './hooks/useMediaQuery';
import { scrollStore } from './animation/scrollStore';

export default function App() {
  const reducedMotion = usePrefersReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const webgl = useRef(isWebGLAvailable());
  const experienceActive = active === 3;

  useSmoothScroll(reducedMotion);
  useKeyboardNav(useCallback(() => activeRef.current, []));

  useEffect(() => {
    scrollStore.simplified = !isDesktop;
  }, [isDesktop]);

  // Active-section tracking via IntersectionObserver (updates only on change).
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-scene]'));
    const ratios = new Map<number, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const idx = Number((entry.target as HTMLElement).dataset.index);
          ratios.set(idx, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let best = 0;
        let bestRatio = -1;
        ratios.forEach((r, idx) => {
          if (r > bestRatio) {
            bestRatio = r;
            best = idx;
          }
        });
        if (best !== activeRef.current) {
          activeRef.current = best;
          scrollStore.active = best;
          setActive(best);
        }
      },
      { threshold: [0.25, 0.5, 0.75] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-bone focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>

      <GlobalBackground />

      {webgl.current && (
        <SceneErrorBoundary>
          <WebGLScene simplified={!isDesktop} elevated={experienceActive} />
        </SceneErrorBoundary>
      )}

      <ScrollProgress />
      <TopNavigation active={active} />
      <MobileMenu active={active} />
      <KeyboardHint />

      <main>
        <HeroScene />
        <AboutScene />
        <ProjectsScene />
        <ExperienceScene />
        <SkillsScene />
        <ActivityScene />
        <ContactScene />
      </main>

      <Footer />

      {webgl.current && <Preloader />}
    </>
  );
}
