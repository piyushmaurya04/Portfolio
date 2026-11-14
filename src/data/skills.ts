export interface SkillGroup {
  label: string;
  items: string[];
}

export const coreSkills = [
  { name: 'Java', level: 90 },
  { name: 'Spring Boot', level: 88 },
  { name: 'Apache Kafka', level: 85 },
  { name: 'Oracle / SQL', level: 84 },
  { name: 'Security & Quality', level: 82 },
];

export const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    items: ['Java', 'Python', 'JavaScript', 'SQL / PL/SQL'],
  },
  {
    label: 'Backend & Messaging',
    items: [
      'Spring Boot',
      'Apache Kafka',
      'Spring Kafka',
      'REST APIs',
      'Microservices',
      'Jackson',
      'JUnit 5 / Mockito',
    ],
  },
  {
    label: 'Security & Code Quality',
    items: [
      'SonarQube',
      'SAST / DAST',
      'SCA Scans',
      'CyberArk Conjur',
      'OAuth 2.0 / SASL_SSL',
      'CVE Remediation',
    ],
  },
  {
    label: 'Databases & Tools',
    items: [
      'Oracle PL/SQL',
      'MySQL',
      'MongoDB',
      'Git',
      'Maven',
      'Docker',
      'Jenkins / CI/CD',
    ],
  },
  {
    label: 'Frontend & UI',
    items: ['Angular', 'React', 'HTML / CSS', 'TypeScript', 'JavaScript'],
  },
  {
    label: 'Architecture & Practices',
    items: [
      'Event-Driven Architecture',
      'DLQ Design & Reprocessing',
      'Idempotent Sync',
      'Agile / Scrum',
      'Root-Cause Analysis',
    ],
  },
];

export interface EngineeringRow {
  index: string;
  title: string;
  detail: string;
}

export const engineeringRows: EngineeringRow[] = [
  { index: '01', title: 'Event-Driven Systems', detail: 'Apache Kafka · ~400K initial load · consumer groups · DLQ' },
  { index: '02', title: 'Backend & Microservices', detail: 'Java · Spring Boot · REST APIs · Jackson · JUnit 5 / Mockito' },
  { index: '03', title: 'Data & Master Integrations', detail: 'Oracle PL/SQL · Customer Registry (CR) · RPS · MySQL' },
  { index: '04', title: 'Fault Tolerance & Reliability', detail: 'Two-tier retries · scheduled DLQ reprocessing · idempotent deduplication' },
  { index: '05', title: 'Security & Code Quality', detail: 'SAST / DAST · CVE-2024-38816 · SonarQube · CyberArk Conjur' },
  { index: '06', title: 'Interfaces & Frontend', detail: 'Angular (distributor & partner views) · React · JavaScript' },
];
