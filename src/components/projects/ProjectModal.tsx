import { useEffect, useRef } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import type { Project } from '../../data/projects';
import { scrollStore } from '../../animation/scrollStore';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

/** Accessible project detail dialog: Escape / overlay close, focus + scroll lock. */
export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!project) return;
    previouslyFocused.current = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';
    scrollStore.lenis?.stop();
    panelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      scrollStore.lenis?.start();
      previouslyFocused.current?.focus();
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center px-4 pb-10 pt-24 sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <button
        type="button"
        aria-label="Close details"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/80 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        style={{ boxShadow: '0 0 80px 24px rgba(0, 0, 0, 0.75)' }}
        className="modal-scroll relative z-10 max-h-[calc(100vh-8.5rem)] w-full max-w-2xl overflow-y-auto rounded-xl bg-ink-800 p-7 outline-none sm:p-8"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-bone/15 text-bone/70 transition-colors hover:border-gilt/50 hover:text-bone"
        >
          <X size={16} />
        </button>

        <div className="flex flex-wrap items-center gap-3 pr-10">
          <span className="text-[0.64rem] uppercase tracking-[0.2em] text-bone/45">{project.type}</span>
          {project.status && (
            <span className="text-[0.62rem] uppercase tracking-[0.18em] text-gilt/90">
              {project.status}
            </span>
          )}
        </div>

        <h3 id="project-modal-title" className="mt-2 font-display text-2xl text-bone sm:text-3xl">
          {project.title}
        </h3>

        <p className="mt-3 text-[0.82rem] leading-relaxed text-bone/75">{project.description}</p>

        {project.highlights.length > 0 && (
          <ul className="mt-5 space-y-2.5 border-t border-bone/10 pt-5">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex gap-3 text-[0.82rem] leading-relaxed text-bone/75">
                <span className="mt-0.5 text-[0.64rem] tabular-nums text-gilt/70">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-bone/12 px-3 py-1 text-[0.64rem] uppercase tracking-[0.14em] text-bone/55"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 border-t border-bone/10 pt-5">
          {project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-bone/20 px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.2em] text-bone/85 transition-colors hover:border-gilt/50 hover:text-bone"
            >
              View Repository
              <ArrowUpRight size={15} />
            </a>
          ) : (
            <p className="text-[0.66rem] uppercase tracking-[0.16em] text-bone/35">
              {project.repoLabel ?? 'Private repository'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
