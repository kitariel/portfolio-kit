/**
 * Single source of truth for every piece of copy on the site.
 *
 * Ground rule: nothing in here is invented. Titles, descriptions, tech lists,
 * links, employment history and education all carry over from the previous
 * portfolio and CV. Fields that were never stated anywhere (project years,
 * per-project roles, measured results) are left undefined on purpose and the
 * UI omits them — see PORTFOLIO-REDESIGN-NOTES.md for the list of details
 * still to supply.
 */

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** Prefixes an asset with the base path so GitHub Pages exports resolve. */
export const asset = (path: string) => `${BASE_PATH}${path}`;

export const profile = {
  name: 'Kit Mikhael Bagares',
  role: 'Senior Full-Stack Engineer',
  location: 'Cebu, Philippines',
  lede: 'I design and ship production systems—web, mobile, and the infrastructure behind them.',
  email: 'kityoubagares94@gmail.com',
  phone: '+63 945 427 8134',
  city: 'Consolacion, Cebu, Philippines',
  cv: asset('/static/resume/KitMikhaelBagaresNewResume.pdf'),
  cvFileName: 'KitMikhaelBagaresNewResume.pdf',
  links: [
    {label: 'GitHub', href: 'https://github.com/kitariel'},
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/kit-mikhael-bagares-1143541a7',
    },
  ],
} as const;

export const media = {
  systemVideo: asset('/media/portfolio-system.mp4'),
  systemPoster: asset('/media/portfolio-system-poster.jpg'),
  systemMid: asset('/media/portfolio-system-mid.jpg'),
  systemExpanded: asset('/media/portfolio-system-expanded.jpg'),
} as const;

export interface Project {
  slug: string;
  title: string;
  /** Descriptive label, e.g. what kind of product this is. */
  category: string;
  /** Shipping year — undefined until confirmed; the UI hides it. */
  year?: string;
  /** The problem the product addresses, in one or two sentences. */
  problem: string;
  /** Undefined where the scope was never documented. */
  role?: string;
  tech: string[];
  /** Only ever a figure that already existed in the CV or old site. */
  result?: string;
  /** Live URL, or undefined when the work is private. */
  href?: string;
  /** Wording for the link, since not every URL is a production site. */
  linkLabel?: string;
  visibility: 'live' | 'private';
  /** Real screenshot. Never a mockup or generated interface. */
  image?: string;
  imageAlt?: string;
  /** Optional muted screen recording played on hover/focus. */
  preview?: string;
  /** True when the case study is still to be written. */
  pending?: boolean;
}

/** The four projects that lead the page, in the order they appear. */
export const featuredProjects: Project[] = [
  {
    slug: 'aliplace',
    title: 'AliPlace',
    category: 'Property marketplace',
    problem:
      'Property hunting means juggling listings, locations and shortlists across tabs. AliPlace puts search, an interactive map and browsing in one continuous flow.',
    tech: ['Next.js', 'TypeScript', 'tRPC', 'Prisma', 'Supabase', 'PostgreSQL'],
    href: 'https://aliplace.vercel.app/',
    linkLabel: 'Open live site',
    visibility: 'live',
    image: asset('/media/work/aliplace.jpg'),
    imageAlt: 'AliPlace property search interface with map and listing results.',
  },
  {
    slug: 'linkhaus',
    title: 'LinkHaus',
    category: 'Creator monetization platform',
    problem:
      'A bio link is usually a dead end. LinkHaus turns it into a revenue surface with native advertising, affiliate links and brand integrations.',
    tech: ['Next.js', 'TypeScript', 'tRPC', 'Prisma', 'Supabase', 'PostgreSQL'],
    href: 'https://development.linkhaus.io/creator',
    linkLabel: 'Open development build',
    visibility: 'live',
    image: asset('/media/work/linkhaus.jpg'),
    imageAlt: 'LinkHaus creator dashboard.',
  },
  {
    slug: 'aikapoy',
    title: 'AIKapoy',
    category: 'Case study in preparation',
    problem:
      'Write-up in progress. Happy to walk through the architecture and the current build on request.',
    tech: [],
    visibility: 'private',
    pending: true,
  },
  {
    slug: 'platform-project-template',
    title: 'Platform Project Template',
    category: 'Internal developer platform',
    problem:
      'Every new client project restarted the same scaffolding work. This generates multiple projects from one template, with reusable modules and CLI tooling behind it.',
    role: 'Full-stack lead developer',
    tech: ['React', 'Next.js', 'Node.js', 'Drizzle', 'PostgreSQL', 'CLI'],
    result: 'Cut new-project setup time by roughly 70%.',
    visibility: 'private',
  },
];

/** Everything else that has shipped, listed as a compact index. */
export const furtherProjects: Project[] = [
  {
    slug: 'gymwebs',
    title: 'GymWebs',
    category: 'Fitness SaaS',
    problem:
      'Helps gym-goers build, customize and optimize structured training programs with AI assistance.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'OpenAI API', 'Claude API'],
    href: 'https://gympepz.vercel.app/',
    linkLabel: 'Open live site',
    visibility: 'live',
    image: asset('/media/work/gympepz.jpg'),
    imageAlt: 'GymWebs workout planning interface.',
  },
  {
    slug: 'movietrending',
    title: 'MovieTrending',
    category: 'Media discovery',
    problem:
      'Trending movies and shows with personalized recommendations, popular titles and new releases.',
    tech: ['React', 'Next.js', 'TypeScript', 'Movie API'],
    href: 'https://www.movietrendingtowatch.site/',
    linkLabel: 'Open live site',
    visibility: 'live',
    image: asset('/media/work/movietrendingapp.jpg'),
    imageAlt: 'MovieTrending home page showing trending titles.',
  },
  {
    slug: 'skyll',
    title: 'Skyll',
    category: 'Education portal',
    problem:
      'One portal serving admins, teachers and students, built on the Platform Project Template with shared modular architecture.',
    tech: ['React', 'Next.js', 'Node.js', 'Drizzle', 'PostgreSQL'],
    visibility: 'private',
  },
  {
    slug: 'gorentals',
    title: 'GoRentals',
    category: 'Booking platform',
    problem:
      'Luxury car rental built from modular React templates on scalable backend APIs.',
    tech: ['React', 'Express.js', 'Modular templates'],
    visibility: 'private',
  },
  {
    slug: 'yaxxi',
    title: 'Yaxxi',
    category: 'Ride booking',
    problem:
      'Ride-booking service with admin dashboards, OTP verification and fraud-prevention mechanisms.',
    tech: ['React', 'Node.js', 'OTP verification', 'Admin dashboards'],
    visibility: 'private',
  },
];

export const processSteps = [
  {
    step: 'Understand',
    detail:
      'Start with the product intent and the constraints around it — users, data, deadlines, the systems already in place.',
  },
  {
    step: 'Architect',
    detail:
      'Decide the boundaries before the code: services, data model, contracts, and what stays deliberately simple.',
  },
  {
    step: 'Build',
    detail:
      'Implement front end, API and infrastructure together, on shared modules rather than one-off screens.',
  },
  {
    step: 'Verify',
    detail:
      'Review every change, test the paths that matter, and confirm behaviour against the original intent.',
  },
  {
    step: 'Ship',
    detail:
      'Deploy, watch it in production, and keep it maintainable for whoever picks it up next.',
  },
] as const;

export const capabilityGroups = [
  {
    title: 'Product & front end',
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'XState'],
  },
  {
    title: 'Back end & APIs',
    items: ['Node.js', 'NestJS', 'Express.js', 'tRPC', 'GraphQL', 'gRPC', 'Socket.IO', 'Kafka'],
  },
  {
    title: 'Data',
    items: ['PostgreSQL', 'Prisma', 'Drizzle', 'Supabase', 'RethinkDB'],
  },
  {
    title: 'Platform & delivery',
    items: ['Docker', 'Linux', 'Git', 'CI/CD', 'C#'],
  },
  {
    title: 'AI in the workflow',
    items: ['Claude', 'Codex', 'Gemini', 'OpenAI API', 'Claude API'],
  },
] as const;

export const experience = [
  {
    title: 'Full-Stack Lead Developer',
    company: 'DNA Micro Software Inc.',
    location: 'Cebu, Philippines',
    period: 'Apr 2022 — Present',
    achievements: [
      'Lead a team of 6 developers, collaborating closely with QA, product, and UI/UX',
      'Designed and implemented scalable microservice architectures for independent delivery',
      'Built internal developer platforms that cut project setup time by ~70%',
      'Mentored junior engineers and introduced best practices in code quality and testing',
      'Partnered directly with clients to define requirements and ensure smooth delivery',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'DNA Micro Software Inc.',
    location: 'Cebu, Philippines',
    period: 'Jul 2020 — Apr 2022',
    achievements: [
      'Built a template-based React platform that accelerated rollout across 5+ projects',
      'Improved API response times by 40% through service and async optimization',
      'Created modular microservice APIs with Express.js for scalable development',
      'Designed real-time monitoring tools that cut issue-resolution time by 50%',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Arielus Software Inc.',
    location: 'Cebu, Philippines',
    period: 'Sep 2019 — May 2020',
    achievements: [
      'Built full-stack web and mobile apps for merchant and booking services',
      'Implemented a booking platform with OTP verification and fraud detection',
      'Created invoice and payment-tracking systems that improved billing accuracy',
      'Collaborated cross-functionally to align technical solutions with business goals',
    ],
  },
] as const;

export const education = [
  {
    degree: 'BS Computer Engineering',
    detail: 'Software Engineering specialization',
    institution: 'University of San Carlos',
    period: '2011 — 2019',
  },
  {
    degree: 'High School Diploma',
    institution: 'Sogod National High School',
    period: '2007 — 2011',
  },
] as const;

export const navItems = [
  {label: 'Work', href: '#work'},
  {label: 'Process', href: '#process'},
  {label: 'Experience', href: '#experience'},
  {label: 'Capabilities', href: '#capabilities'},
  {label: 'Contact', href: '#contact'},
] as const;
