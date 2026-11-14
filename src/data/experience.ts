export interface ExperienceProject {
  id: string;
  name: string;
  shortName: string;
  tech: string[];
  highlights: string[];
}

export interface ExperienceEntry {
  company: string;
  companyShort: string;
  role: string;
  account: string;
  location: string;
  period: string;
  startDate: string;
  summary: string;
  projects: ExperienceProject[];
  highlights: string[];
  tech: string[];
}

export const experience: ExperienceEntry[] = [
  {
    company: 'Tata Consultancy Services',
    companyShort: 'TCS',
    role: 'System Engineer',
    account: 'Enterprise Client Account',
    location: 'Mumbai, India',
    period: 'January 2025 – Present',
    startDate: '2025-01-16',
    summary:
      'Designing event-driven Apache Kafka data synchronization flows, engineering master-data REST integrations with Oracle PL/SQL and Angular, and leading enterprise security remediation across 14 production applications.',
    projects: [
      {
        id: 'wips',
        name: 'WIPS – Event-Driven Data Synchronization Platform',
        shortName: 'WIPS · Kafka Sync',
        tech: ['Java', 'Spring Boot', 'Apache Kafka', 'Oracle'],
        highlights: [
          "Designed and built a new event-driven sync flow with four Kafka consumers in the team's existing Kafka microservice, syncing distributor coverage, geography, landscape and qualification events from upstream systems into Oracle.",
          'Processed a ~400K-message initial load (85K–105K per topic) in under one minute per topic, using three concurrent consumers per topic (Kafka consumer groups) and stored-procedure call objects created once and reused for every message.',
          'Implemented two-level failure handling: in-consumer retries (5 attempts at 1-minute intervals, Spring Kafka DefaultErrorHandler) for transient errors, and direct DLQ routing for poison messages so a bad record never blocks a partition.',
          'Built scheduled DLQ reprocessing (up to 12 retries at 2-hour intervals) with a standard failure envelope (event ID, payload, reason, retry count, first failure time), enabling self-recovery from long outages without manual work.',
          'Delivered at-least-once processing with manual offset commits and idempotent Oracle stored procedures using event-ID deduplication.',
          'Added structured logs, throttled email alerts and JUnit 5/Mockito tests; secured Kafka with SASL/OAUTHBEARER over SSL using CyberArk Conjur credentials; released through Dev, Load Test, Stage and Production via CI/CD.',
        ],
      },
      {
        id: 'pss',
        name: 'PSS – Partner Self-Service: Customer Registry Integration',
        shortName: 'PSS · Registry Integration',
        tech: ['Java', 'Spring', 'REST APIs', 'Oracle PL/SQL', 'Angular'],
        highlights: [
          'Implemented Customer Registry (CR) master-data integration in Location Management: site create/update flows chaining Restricted Party Screening, CR REST APIs (Apache HttpClient, OAuth 2.0) and Oracle PL/SQL stored procedures.',
          'Built CR request/response handling with Jackson, validating business acknowledgements beyond HTTP status and routing error codes to prevent duplicate partner sites.',
          'Kept site-ID cross-references and company/site hierarchies in sync between CR and the partner database; supported asynchronous RPS callbacks for compliance-held sites, with full request/response audit logging.',
          'Built the new distributor flow after a business change moved distributors from the shared geography-based partner hierarchy to a separate coverage-based hierarchy, reworking PSS logic and UI with separate distributor and partner views, powered by data synced through the WIPS Kafka flow.',
          'Resolved production defects from the sprint backlog: reproduced issues in lower environments, fixed root causes, added tests and shipped fixes in scheduled releases.',
        ],
      },
      {
        id: 'security',
        name: 'Security & Code Quality',
        shortName: 'Security & Code Quality',
        tech: ['SAST', 'DAST', 'SCA', 'SonarQube'],
        highlights: [
          'Remediated 150+ unique vulnerabilities across 14 enterprise applications reported by SAST, DAST and SCA scans, covering insecure code patterns, input-validation gaps, runtime issues and vulnerable dependencies.',
          'Upgraded Spring Framework to fix CVE-2024-38816 (path traversal) and resolved the resulting JAX-RS/Apache CXF library conflicts; verified every fix through re-scans and regression testing before release.',
          'Kept SonarQube quality gates passing by fixing reported bugs, code smells and security hotspots, and by adding unit tests to meet coverage thresholds before every merge and release.',
        ],
      },
    ],
    highlights: [
      "Designed and built a new event-driven sync flow with four Kafka consumers in the team's existing Kafka microservice, syncing distributor coverage, geography, landscape and qualification events from upstream systems into Oracle.",
      'Processed a ~400K-message initial load (85K–105K per topic) in under one minute per topic, using three concurrent consumers per topic (Kafka consumer groups) and stored-procedure call objects created once and reused for every message.',
      'Implemented two-level failure handling: in-consumer retries (5 attempts at 1-minute intervals, Spring Kafka DefaultErrorHandler) for transient errors, and direct DLQ routing for poison messages so a bad record never blocks a partition.',
      'Built scheduled DLQ reprocessing (up to 12 retries at 2-hour intervals) with a standard failure envelope (event ID, payload, reason, retry count, first failure time), enabling self-recovery from long outages without manual work.',
      'Delivered at-least-once processing with manual offset commits and idempotent Oracle stored procedures using event-ID deduplication.',
      'Added structured logs, throttled email alerts and JUnit 5/Mockito tests; secured Kafka with SASL/OAUTHBEARER over SSL using CyberArk Conjur credentials; released through Dev, Load Test, Stage and Production via CI/CD.',
      'Implemented Customer Registry (CR) master-data integration in Location Management: site create/update flows chaining Restricted Party Screening, CR REST APIs (Apache HttpClient, OAuth 2.0) and Oracle PL/SQL stored procedures.',
      'Built CR request/response handling with Jackson, validating business acknowledgements beyond HTTP status and routing error codes to prevent duplicate partner sites.',
      'Kept site-ID cross-references and company/site hierarchies in sync between CR and the partner database; supported asynchronous RPS callbacks for compliance-held sites, with full request/response audit logging.',
      'Built the new distributor flow after a business change moved distributors from the shared geography-based partner hierarchy to a separate coverage-based hierarchy, reworking PSS logic and UI with separate distributor and partner views, powered by data synced through the WIPS Kafka flow.',
      'Resolved production defects from the sprint backlog: reproduced issues in lower environments, fixed root causes, added tests and shipped fixes in scheduled releases.',
      'Remediated 150+ unique vulnerabilities across 14 enterprise applications reported by SAST, DAST and SCA scans, covering insecure code patterns, input-validation gaps, runtime issues and vulnerable dependencies.',
      'Upgraded Spring Framework to fix CVE-2024-38816 (path traversal) and resolved the resulting JAX-RS/Apache CXF library conflicts; verified every fix through re-scans and regression testing before release.',
      'Kept SonarQube quality gates passing by fixing reported bugs, code smells and security hotspots, and by adding unit tests to meet coverage thresholds before every merge and release.',
    ],
    tech: [
      'Java',
      'Spring Boot',
      'Apache Kafka',
      'Oracle PL/SQL',
      'REST APIs',
      'Angular',
      'CyberArk Conjur',
      'OAuth 2.0 / SASL_SSL',
      'SonarQube',
      'SAST / DAST',
      'JUnit 5 / Mockito',
      'CI/CD',
    ],
  },
];

export const education = [
  {
    degree: 'B.Tech, Computer Science Engineering',
    institution: 'SSVPS B.S. Deore College of Engineering, Dhule',
    period: '2020 — 2024',
    score: 'CGPA 8.59',
  },
];
