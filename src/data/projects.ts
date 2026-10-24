export interface Project {
  id: string;
  title: string;
  type: string;
  status?: string;
  featured?: boolean;
  coverImage?: string;
  liveUrl?: string;
  description: string;
  highlights: string[];
  tech: string[];
  repo?: string;
  repoLabel?: string;
}

export const projects: Project[] = [
  {
    id: 'tom',
    title: 'Smylio (Tenant Owner Management)',
    type: 'Backend · Full Stack',
    status: 'Live',
    featured: true,
    coverImage: '/projects/tenant-owner-management.png',
    liveUrl: 'https://smylio.onrender.com',
    description:
      'An owner-managed property platform with a normalized relational schema and REST APIs for Users, Properties and Leases. Financial logic is computed server-side to guarantee accuracy and avoid data staleness.',
    highlights: [
      'Anniversary-based, idempotent rent-billing engine using Spring @Scheduled — invoicing in arrears with month-end date clamping.',
      'Duplicate-prevention via a DB unique constraint plus application-level checks.',
      'Payment-lifecycle state machine: PENDING → LATE → AWAITING_APPROVAL → PAID.',
      'Dues modeled as a computed aggregate over unpaid rent rows — no stored totals.',
    ],
    tech: ['Java', 'Spring Boot', 'Spring Data JPA', 'Hibernate', 'MySQL', 'Maven'],
    repo: 'https://github.com/piyushmaurya04/Smylio/',
  },
  {
    id: 'expense-tracker',
    title: 'Ledger (Expense Tracker)',
    type: 'Full Stack',
    status: 'Live',
    liveUrl: 'https://ledger-mlrg.onrender.com/',
    coverImage: '/projects/ledger.png',
    description:
      'A personal finance app for organizing income and expenses, tracking budgets, and understanding spending and savings habits.',
    highlights: [
      'Secure accounts with private, protected finance data.',
      'Dashboard overview of income, expenses, and balance.',
      'Record, review, edit, and remove expense and income entries.',
      'Monitor monthly budgets and compare planned spending with actuals.',
      'Explore spending trends and manage profile details.',
    ],
    tech: [],
    repo: 'https://github.com/piyushmaurya04/Expense-Tracker',
  },
  {
    id: 'weather',
    title: 'Weather Application',
    type: 'Full Stack',
    coverImage: '/projects/weather.png',
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
    coverImage: '/projects/netflix.png',
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
    coverImage: '/projects/myntra.png',
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
