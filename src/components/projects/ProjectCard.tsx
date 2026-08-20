import type { Project } from '../../data/projects';

const PREVIEWS = [
  'linear-gradient(135deg, #2a1d12 0%, #0e1016 72%)',
  'linear-gradient(135deg, #101b22 0%, #090b10 72%)',
  'linear-gradient(135deg, #26141a 0%, #0b090d 72%)',
  'linear-gradient(135deg, #101a13 0%, #090b0b 72%)',
];

interface ProjectCardProps {
  project: Project;
  index: number;
  active: boolean;
  onOpen: (project: Project) => void;
}

export function ProjectCard({ project, index, active, onOpen }: ProjectCardProps) {
  const badge = String(index + 1).padStart(2, '0');
  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`View details for ${project.title}`}
      onClick={() => onOpen(project)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpen(project);
        }
      }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-lg border border-bone/15 bg-[#101214]/90 transition-all duration-500 ease-editorial hover:z-10 hover:scale-[1.1] hover:border-gilt/80 hover:bg-[#171a1d] ${
        active
          ? 'z-10 scale-[1.1] border-gilt/80 bg-[#181c20]'
          : ''
      }`}
    >
      {/* Preview */}
      <div className="relative h-28 overflow-hidden sm:h-32">
        <div
          className={`absolute inset-0 transition-transform duration-700 ease-editorial group-hover:scale-[1.04] ${
            active ? 'scale-[1.04]' : ''
          }`}
          style={{ background: PREVIEWS[index % PREVIEWS.length] }}
        />
        {project.coverImage && (
          <img
            src={project.coverImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.04]"
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background: project.coverImage
              ? 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.62))'
              : 'radial-gradient(80% 120% at 20% 0%, rgba(201,168,106,0.28), rgba(201,168,106,0.12) 25%, transparent 60%)',
          }}
        />
        <span className="pointer-events-none absolute bottom-1 left-3 font-display text-[3.4rem] leading-none text-bone/[0.06]">
          {badge}
        </span>
        <span className="absolute right-3 top-3 rounded-full border border-bone/15 bg-ink/50 px-2.5 py-0.5 text-[0.55rem] uppercase tracking-[0.16em] text-bone/70 backdrop-blur-sm">
          Project {badge}
        </span>
        {project.status && (
          <span className="absolute left-3 top-3 text-[0.55rem] uppercase tracking-[0.16em] text-gilt/90">
            {project.status}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[0.6rem] uppercase tracking-[0.2em] text-bone/60">{project.type}</p>
        <h3 className="mt-1.5 font-display text-lg text-bone">{project.title}</h3>
        <p className="mt-2 text-[0.8rem] leading-relaxed text-bone/80 line-clamp-2">{project.description}</p>

        <div className="mt-auto pt-4">
          <span className="inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.2em] text-bone/80">
            View Details
            <span
              aria-hidden="true"
              className={`transition-transform duration-300 group-hover:translate-x-1 ${
                active ? 'translate-x-1' : ''
              }`}
            >
              →
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}
