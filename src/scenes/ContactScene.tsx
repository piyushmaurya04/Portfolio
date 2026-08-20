import { Github, Linkedin, Instagram, Twitter, Code2, ChefHat, Trophy } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SceneSection } from '../components/layout/SceneSection';
import { Eyebrow } from '../components/typography/Eyebrow';
import { Reveal } from '../components/typography/Reveal';
import { ContactForm } from '../components/ui/ContactForm';
import { personal, emailHref, socials } from '../data/personal';

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  LeetCode: Code2,
  CodeChef: ChefHat,
  HackerRank: Trophy,
  X: Twitter,
  Instagram: Instagram,
};

export function ContactScene() {
  return (
    <SceneSection id="contact" index={6}>
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow index="06">Contact</Eyebrow>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-8 font-display leading-[1.0] text-bone" style={{ fontSize: 'clamp(2.4rem, 7vw, 5rem)' }}>
            Ready to build
            <br />
            something <span className="italic">great?</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-bone/75">
            Open to opportunities in backend and distributed systems. Reach out and let&apos;s talk.
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-[0.72rem] uppercase tracking-[0.18em] text-bone/75">
            <a href={emailHref} className="transition-colors hover:text-bone">
              {personal.email}
            </a>
            <span className="h-3 w-px bg-bone/35" />
            <span>{personal.location}</span>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <ul className="mt-8 flex flex-wrap gap-3">
            {socials.map((s) => {
              const Icon = SOCIAL_ICONS[s.label] ?? Code2;
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-bone/25 bg-ink/30 text-bone/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_8px_20px_rgba(0,0,0,0.14)] backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:border-gilt hover:bg-ink/50 hover:text-gilt hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_12px_28px_rgba(0,0,0,0.24)]"
                  >
                    <Icon size={16} />
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-10">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </SceneSection>
  );
}
