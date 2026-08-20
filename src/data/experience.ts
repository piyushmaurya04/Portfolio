export interface ExperienceEntry {
  company: string;
  companyShort: string;
  role: string;
  account: string;
  location: string;
  period: string;
  startDate: string;
  summary: string;
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
    period: '2025 — Present',
    startDate: '2025-01-16',
    summary:
      'Building enterprise Java / Spring Boot applications and designing event-driven, fault-tolerant Apache Kafka pipelines with dead-letter-queue handling.',
    highlights: [
      'Enhanced an enterprise web application (PSS) with new business features and production-defect fixes, improving stability and reliability.',
      'Designed four Spring Boot Kafka consumer services ingesting real-time distributor data across 3 parallel partitions per topic — 70K–93K messages/topic persisted within seconds of deployment.',
      'Implemented eventId-based deduplication against Oracle stored procedures (UPSERT/DELETE) for exactly-once writes with full schema validation.',
      'Architected a two-tier fault-tolerance strategy: in-memory retry (5 attempts, 1-min backoff) plus DLQ routing with a scheduled reprocessor (every 2 hrs, up to 12 retries).',
      'Secured all Kafka connections with OAuth (SASL_SSL) and Conjur-managed credentials in Kubernetes across four environments.',
      'Validated a Teradata-to-Snowflake migration and independently owned the end-to-end production deployment lifecycle.',
    ],
    tech: ['Spring Boot', 'Apache Kafka', 'Oracle SQL', 'OAuth SASL_SSL', 'Kubernetes', 'Conjur'],
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
