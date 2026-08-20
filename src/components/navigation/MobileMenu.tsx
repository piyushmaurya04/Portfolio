import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SECTIONS } from '../../animation/sceneConfig';
import { scrollToSection } from '../../hooks/useKeyboardNav';

interface MobileMenuProps {
  active: number;
}

/** Compact hamburger + full-screen overlay nav for small screens. */
export function MobileMenu({ active }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollToSection(id), 60);
  };

  return (
    <div className="sm:hidden">
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="fixed right-5 top-5 z-40 grid h-10 w-10 place-items-center rounded-full border border-bone/15 bg-ink/60 text-bone/80 backdrop-blur-md"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      <div
        className={`fixed inset-0 z-30 flex flex-col justify-center bg-ink/95 px-8 backdrop-blur-md transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <nav aria-label="Sections">
          <ul className="space-y-5">
            {SECTIONS.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => go(s.id)}
                  className="flex items-baseline gap-4 text-left"
                >
                  <span className="text-[0.7rem] tabular-nums text-gilt/70">{s.index}</span>
                  <span
                    className={`font-display text-3xl ${
                      active === i ? 'text-bone' : 'text-bone/50'
                    }`}
                  >
                    {s.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
