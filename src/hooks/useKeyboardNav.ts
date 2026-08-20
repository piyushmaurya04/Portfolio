import { useEffect } from 'react';
import { scrollStore } from '../animation/scrollStore';
import { SECTIONS } from '../animation/sceneConfig';

const isTypingTarget = (el: EventTarget | null): boolean => {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || el.isContentEditable;
};

export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  if (scrollStore.lenis) scrollStore.lenis.scrollTo(el, { offset: 0 });
  else el.scrollIntoView({ behavior: 'smooth' });
}

/** Arrow / W / S move between sections; K jumps to contact. Ignores form fields. */
export function useKeyboardNav(getActive: () => number): void {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return;
      const key = e.key.toLowerCase();
      let next = -1;
      const current = getActive();

      if (key === 'arrowdown' || key === 's') next = Math.min(current + 1, SECTIONS.length - 1);
      else if (key === 'arrowup' || key === 'w') next = Math.max(current - 1, 0);
      else if (key === 'k') next = SECTIONS.length - 1;

      if (next >= 0) {
        e.preventDefault();
        scrollToSection(SECTIONS[next].id);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [getActive]);
}
