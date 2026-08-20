import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollStore } from '../animation/scrollStore';
import { SECTIONS } from '../animation/sceneConfig';

gsap.registerPlugin(ScrollTrigger);

/**
 * Sets up Lenis smooth scrolling, drives it from the GSAP ticker so Lenis and
 * ScrollTrigger share a clock, and continuously writes normalized progress into
 * the shared store (no React state on the hot path).
 */
export function useSmoothScroll(reducedMotion: boolean): void {
  useEffect(() => {
    let anchors: number[] = [];

    const updateAnchors = () => {
      const currentScroll = scrollStore.lenis?.scroll ?? window.scrollY;
      anchors = SECTIONS.map((section) => {
        const element = document.getElementById(section.id);
        return element ? element.getBoundingClientRect().top + currentScroll : 0;
      });
    };

    const progressFromSections = (scroll: number, fallback: number) => {
      if (anchors.length !== SECTIONS.length) return fallback;
      if (scroll <= anchors[0]) return SECTIONS[0].at;

      for (let index = 0; index < anchors.length - 1; index++) {
        const start = anchors[index];
        const end = anchors[index + 1];
        if (scroll <= end) {
          const ratio = end === start ? 0 : (scroll - start) / (end - start);
          return SECTIONS[index].at + (SECTIONS[index + 1].at - SECTIONS[index].at) * ratio;
        }
      }
      return SECTIONS[SECTIONS.length - 1].at;
    };

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: !reducedMotion,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      lerp: reducedMotion ? 1 : 0.1,
    });

    scrollStore.lenis = lenis;
    scrollStore.reducedMotion = reducedMotion;
    requestAnimationFrame(updateAnchors);
    ScrollTrigger.addEventListener('refresh', updateAnchors);
    window.addEventListener('resize', updateAnchors);

    const onScroll = ({ scroll, limit, velocity }: { scroll: number; limit: number; velocity: number }) => {
      scrollStore.progress = limit > 0 ? scroll / limit : 0;
      scrollStore.velocity = velocity;

      // Section anchors include pin spacers, so the model reaches each named
      // composition exactly as its HTML section enters the viewport.
      scrollStore.modelProgress = progressFromSections(scroll, scrollStore.progress);

      ScrollTrigger.update();
    };
    lenis.on('scroll', onScroll);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(tick);
      ScrollTrigger.removeEventListener('refresh', updateAnchors);
      window.removeEventListener('resize', updateAnchors);
      lenis.destroy();
      scrollStore.lenis = null;
    };
  }, [reducedMotion]);
}
