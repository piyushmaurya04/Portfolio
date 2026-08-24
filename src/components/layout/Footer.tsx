import { personal, socials } from '../../data/personal';

const FOOTER_LINKS = socials.filter((s) => ['GitHub', 'LinkedIn'].includes(s.label));

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-bone/10 px-6 py-14 sm:px-10 lg:px-24">
      <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-2xl text-bone">{personal.name}</p>
          <p className="mt-1 text-[0.72rem] uppercase tracking-[0.2em] text-bone/40">
            {personal.role} · {personal.employerShort}
          </p>
        </div>

        <ul className="flex flex-wrap gap-6 text-[0.72rem] uppercase tracking-[0.18em] text-bone/50">
          {FOOTER_LINKS.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-bone">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className="mx-auto mt-10 w-full max-w-[90rem] text-[0.66rem] uppercase tracking-[0.16em] text-bone/25">
        © {new Date().getFullYear()} {personal.name}. Designed & built with care.
      </p>
    </footer>
  );
}
