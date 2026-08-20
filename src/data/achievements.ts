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
      'Recognized for independently designing and deploying a production-ready Kafka consumer service with DLQ and auto-retry, adopted as a critical upstream data source.',
  },
  {
    title: 'LeetCode',
    meta: '150+ solved',
    detail: 'Arrays, trees, graphs, dynamic programming and sorting across 150+ DSA problems.',
  },
  {
    title: 'CodeChef',
    meta: '2★ · 1565',
    detail: 'Highest rating 1565 — strong in algorithms, data structures and competitive programming.',
  },
  {
    title: 'HackerRank',
    meta: 'Java Gold 5★',
    detail: 'Gold badge in Java demonstrating advanced proficiency and problem-solving.',
  },
];

export const stats = [
  { value: '4', label: 'Kafka consumer services' },
  { value: '150+', label: 'DSA problems solved' },
  { value: '93K', label: 'Messages / topic' },
  { value: 'GEMS', label: 'TCS Best Team award' },
];
