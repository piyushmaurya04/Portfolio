export interface SkillGroup {
  label: string;
  items: string[];
}

export const coreSkills = [
  { name: 'Java', level: 90 },
  { name: 'Spring Boot', level: 88 },
  { name: 'Apache Kafka', level: 85 },
  { name: 'SQL', level: 82 },
  { name: 'JavaScript', level: 75 },
];

export const skillGroups: SkillGroup[] = [
  { label: 'Languages', items: ['Java', 'Python', 'JavaScript', 'SQL'] },
  {
    label: 'Backend & Messaging',
    items: ['Spring Boot', 'REST APIs', 'Apache Kafka', 'JDBC', 'Microservices', 'JWT', 'OAuth (SASL_SSL)'],
  },
  {
    label: 'DevOps & Tools',
    items: ['Git', 'Maven', 'Docker', 'Jenkins', 'Postman', 'Conjur', 'IntelliJ IDEA'],
  },
  {
    label: 'Frontend & Databases',
    items: ['HTML', 'CSS', 'React', 'Angular', 'MySQL', 'Oracle SQL', 'MongoDB'],
  },
  {
    label: 'Practices',
    items: ['Agile / Scrum', 'Production Support', 'DLQ Design', 'Root-Cause Analysis'],
  },
];

export interface EngineeringRow {
  index: string;
  title: string;
  detail: string;
}

export const engineeringRows: EngineeringRow[] = [
  { index: '01', title: 'Event-Driven Systems', detail: 'Apache Kafka · partitioned consumers · DLQ' },
  { index: '02', title: 'Backend Development', detail: 'Java · Spring Boot · REST APIs' },
  { index: '03', title: 'Data & Persistence', detail: 'Oracle · MySQL · MongoDB · JPA / Hibernate' },
  { index: '04', title: 'Fault Tolerance', detail: 'Retry strategies · idempotency · exactly-once writes' },
  { index: '05', title: 'Security & Ops', detail: 'OAuth SASL_SSL · Conjur · Kubernetes · CI/CD' },
  { index: '06', title: 'Interfaces', detail: 'React · Angular · JavaScript · HTML / CSS' },
];
