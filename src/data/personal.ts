export interface SocialLink {
  label: string;
  short: string;
  href: string;
}

export const personal = {
  name: 'Piyush Maurya',
  firstName: 'Piyush',
  lastName: 'Maurya',
  monogram: 'PM',
  role: 'Software Engineer',
  roles: [
    'Software Engineer',
    'Java · Spring Boot Developer',
    'Kafka Pipeline Engineer',
    'Backend & Microservices Dev',
  ],
  employer: 'Tata Consultancy Services',
  employerShort: 'TCS',
  jobTitle: 'System Engineer',
  location: 'Mumbai, India',
  region: 'Maharashtra, India',
  tagline:
    'Java · Spring Boot · Apache Kafka · Microservices. Building scalable, event-driven, fault-tolerant enterprise systems.',
  available: true,
  email: 'piyushmaurya0410@gmail.com',
  phone: '+91 86004 50745',
} as const;

export const socials: SocialLink[] = [
  { label: 'GitHub', short: 'GH', href: 'https://github.com/piyushmaurya04' },
  {
    label: 'LinkedIn',
    short: 'IN',
    href: 'https://www.linkedin.com/in/piyush-maurya-a1a5a1256/',
  },
  { label: 'LeetCode', short: 'LC', href: 'https://leetcode.com/u/mauryapiyush30/' },
  { label: 'CodeChef', short: 'CC', href: 'https://www.codechef.com/users/piyushmaurya04' },
  {
    label: 'HackerRank',
    short: 'HR',
    href: 'https://www.hackerrank.com/profile/piyushmaurya8421',
  },
  { label: 'X', short: 'X', href: 'https://x.com/piyushmaurya22' },
  { label: 'Instagram', short: 'IG', href: 'https://www.instagram.com/piyushmaurya22' },
];

export const emailHref = `mailto:${personal.email}`;
