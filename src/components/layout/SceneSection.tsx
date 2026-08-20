import type { ReactNode } from 'react';

interface SceneSectionProps {
  id: string;
  index: number;
  children: ReactNode;
  className?: string;
}

/**
 * Full-height transparent section that scrolls over the persistent canvas.
 * data-scene / data-index are used by the active-section observer in App.
 */
export function SceneSection({ id, index, children, className = '' }: SceneSectionProps) {
  return (
    <section
      id={id}
      data-scene
      data-index={index}
      className={`relative z-10 flex min-h-screen w-full items-center px-6 py-24 sm:px-10 lg:px-24 ${className}`}
    >
      <div className="mx-auto w-full max-w-[90rem]">{children}</div>
    </section>
  );
}
