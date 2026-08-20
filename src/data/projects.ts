export interface Project {
  id: string;
  title: string;
  type: string;
  status?: string;
  featured?: boolean;
  description: string;
  highlights: string[];
  tech: string[];
  repo?: string;
  repoLabel?: string;
}

export const projects: Project[] = [
  {
    id: 'tom',
    title: 'Tenant & Owner Management',
    type: 'Backend · Full Stack',
    status: 'In Progress',
    featured: true,
    description:
      'An owner-managed property platform with a normalized relational schema and REST APIs for Users, Properties and Leases. Financial logic is computed server-side to guarantee accuracy and avoid data staleness.',
    highlights: [
      'Anniversary-based, idempotent rent-billing engine using Spring @Scheduled — invoicing in arrears with month-end date clamping.',
      'Duplicate-prevention via a DB unique constraint plus application-level checks.',
      'Payment-lifecycle state machine: PENDING → LATE → AWAITING_APPROVAL → PAID.',
      'Dues modeled as a computed aggregate over unpaid rent rows — no stored totals.',
    ],
    tech: ['Java', 'Spring Boot', 'Spring Data JPA', 'Hibernate', 'MySQL', 'Maven'],
    repoLabel: 'Private / in-progress repository',
  },
  {
    id: 'weather',
    title: 'Weather Application',
    type: 'Full Stack',
    description:
      'A dynamic weather app serving real-time weather data through a Java backend with a responsive client interface.',
    highlights: [
      'Frontend in HTML/CSS/JS with a clean, responsive UI.',
      'Backend in Java JSP & Servlets performing real-time weather lookups.',
    ],
    tech: ['Java', 'JSP', 'Servlets', 'JavaScript', 'CSS'],
    repo: 'https://github.com/piyushmaurya04/Weather-project',
  },
  {
    id: 'netflix',
    title: 'Netflix Clone',
    type: 'Frontend',
    description:
      'A pixel-faithful replica of the Netflix interface, built to master responsive layout, component structure and interactive UI patterns.',
    highlights: [
      'Responsive hero banner and horizontally scrollable rows.',
      'Hover / card-scaling effects with clean semantic HTML, CSS and vanilla JS.',
    ],
    tech: ['HTML', 'CSS', 'JavaScript'],
    repo: 'https://github.com/piyushmaurya04/Netflix-Clone-',
  },
  {
    id: 'myntra',
    title: 'Myntra Clone',
    type: 'Frontend',
    description:
      'A responsive e-commerce clone of Myntra featuring a full front-end shopping experience.',
    highlights: [
      'Dynamic product listings with an interactive cart.',
      'Add-to-bag flow with live cart updates and an authentication flow.',
    ],
    tech: ['HTML', 'CSS', 'JavaScript'],
    repoLabel: 'Coming soon',
  },
];
