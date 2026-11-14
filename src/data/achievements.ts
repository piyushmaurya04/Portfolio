export interface Achievement {
  title: string;
  meta: string;
  detail: string;
}

export const achievements: Achievement[] = [
  {
    title: 'TCS GEMS Award',
    meta: 'Best Team',
    detail:
      'Recognized for designing and deploying the WIPS event-driven Kafka synchronization platform with two-tier failure handling, DLQ self-recovery, and ~400K initial message throughput.',
  },
  {
    title: 'Enterprise Security',
    meta: '150+ Remediations',
    detail:
      'Remediated 150+ vulnerabilities across 14 enterprise apps via SAST/DAST/SCA scans, patched CVE-2024-38816 with CXF conflict resolution, and enforced SonarQube quality gates.',
  },
  {
    title: 'LeetCode',
    meta: '150+ solved',
    detail: 'Arrays, trees, graphs, dynamic programming and sorting across 150+ DSA problems.',
  },
  {
    title: 'Competitive Coding',
    meta: 'Java Gold 5★ · 2★',
    detail: 'Gold badge in Java on HackerRank and 2★ rating (1565) on CodeChef, demonstrating strong algorithmic problem-solving.',
  },
];

export const stats = [
  { value: '400K', label: 'Kafka messages / initial load' },
  { value: '150+', label: 'Vulnerabilities remediated' },
  { value: '4', label: 'Kafka consumer flows' },
  { value: 'GEMS', label: 'TCS Best Team award' },
];
