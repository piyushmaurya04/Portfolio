import { SECTIONS } from '../../animation/sceneConfig';
import { scrollToSection } from '../../hooks/useKeyboardNav';
import { personal } from '../../data/personal';

const NAV = SECTIONS.map((s) => ({
  id: s.id,
  label: s.id === 'hero' ? 'Home' : s.label,
}));

interface TopNavigationProps {
  active: number;
}

export function TopNavigation({ active }: TopNavigationProps) {
  return (
    <header className="fixed inset-x-0 top-4 z-30 flex justify-center px-4">
      <nav
        aria-label="Primary"
        className="flex items-center gap-1 rounded-full border border-bone/10 bg-ink/60 px-2 py-1.5 backdrop-blur-md"
      >
        <span className="px-3 font-display text-sm tracking-wide text-bone/90">
          {personal.monogram}
        </span>
        <span className="mx-1 hidden h-4 w-px bg-bone/10 sm:block" />
        <ul className="hidden items-center sm:flex">
          {NAV.map((item, i) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`rounded-full px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.2em] transition-colors duration-300 ${
                  active === i ? 'text-bone' : 'text-bone/45 hover:text-bone/80'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => scrollToSection('contact')}
          className="ml-1 hidden rounded-full border border-bone/15 px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.2em] text-bone/80 transition-colors duration-300 hover:border-gilt/50 hover:text-bone sm:block"
        >
          Let&apos;s Connect
        </button>
      </nav>
    </header>
  );
}
