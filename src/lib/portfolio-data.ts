/**
 * Single source of truth for every repeated block of portfolio content.
 * Sections render from these structures instead of duplicating markup.
 */

export type AiToolId = 'gemini' | 'claude' | 'codex';

export interface AiTool {
  id: AiToolId;
  /** Accessible name for the icon and card heading. */
  name: string;
  /** One-word role, shown under the name. */
  role: string;
  summary: string;
  responsibilities: string[];
  /** Brand colour, used only on hover/focus — icons rest as off-white. */
  brand: string;
  /**
   * Where this tool's mark sits in the closing frame of the transformation
   * footage, normalised to the 16:9 video box. Measured from the rendered
   * final frame so the DOM icons land exactly on the filmed ones.
   */
  videoPosition: {x: number; y: number; size: number};
}

/** Ordered left → right exactly as the marks appear in the closing frame. */
export const aiTools: AiTool[] = [
  {
    id: 'gemini',
    name: 'Gemini',
    role: 'Research',
    summary: 'Where a project starts — understanding the space before committing to a direction.',
    responsibilities: [
      'Research',
      'Market and product understanding',
      'Idea exploration',
      'Strategy',
      'Comparing possibilities',
    ],
    brand: '#8ab4f8',
    videoPosition: {x: 0.3003, y: 0.2897, size: 0.092},
  },
  {
    id: 'claude',
    name: 'Claude',
    role: 'Planning',
    summary: 'Turning what I learned into a plan someone else could actually pick up and build.',
    responsibilities: [
      'Planning',
      'Writing',
      'Documentation',
      'Reviewing requirements',
      'Business and product reasoning',
    ],
    brand: '#d97757',
    videoPosition: {x: 0.4927, y: 0.388, size: 0.089},
  },
  {
    id: 'codex',
    name: 'Codex',
    role: 'Execution',
    summary: 'The build itself — shipped, tested, and reviewed against the plan.',
    responsibilities: ['Implementation', 'Coding', 'Refactoring', 'Testing', 'Automation', 'Product execution'],
    brand: '#f4efe6',
    videoPosition: {x: 0.68, y: 0.2916, size: 0.103},
  },
];

/* -------------------------------------------------------------------------- */

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  {label: 'Work', href: '#work'},
  {label: 'Process', href: '#process'},
  {label: 'About', href: '#about'},
  {label: 'Contact', href: '#contact'},
];

/* -------------------------------------------------------------------------- */

export interface Project {
  slug: string;
  name: string;
  /** Short problem statement. */
  problem: string;
  /** Short solution statement. */
  solution: string;
  role: string;
  tech: string[];
  /** Only set where it is actually known. */
  status?: string;
  /** Live URL, when there is a public one. */
  href?: string;
  image?: {src: string; alt: string};
  /** Featured projects get the large alternating editorial layout. */
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: 'aliplace',
    name: 'AliPlace',
    problem: 'Property listings are usually a list of rows, but people search for a home by place, not by page number.',
    solution:
      'A map-first discovery, listing and property-operation platform, with optional Studio workspaces for teams that manage properties day to day.',
    role: 'Solo build — product, design and engineering',
    tech: [
      'Next.js',
      'TypeScript',
      'tRPC',
      'Prisma',
      'PostgreSQL',
      'Better Auth',
      'Tailwind CSS',
      'shadcn/ui',
      'UploadThing',
      'Mapbox',
      'Vercel',
    ],
    status: 'Independent product · live demo',
    href: 'https://aliplace.vercel.app/',
    image: {src: '/static/images/aliplace.png', alt: 'AliPlace map-first property discovery interface'},
    featured: true,
  },
  {
    slug: 'aikapoy',
    name: 'AIKapoy',
    problem: 'Replying well takes context and tone, and most AI assistants either miss both or send something on your behalf.',
    solution:
      'A context-aware reply assistant: highlight the content, choose a tone, generate a reply, copy it. Nothing is ever sent automatically.',
    role: 'Solo build — product, design and engineering',
    tech: ['JavaScript browser extension', 'Next.js', 'API backend', 'AI reply workflows'],
    status: 'Independent product',
    featured: true,
  },
  {
    slug: 'applywithcontext',
    name: 'ApplyWithContext',
    problem: 'Job applications get generic exactly when they need to be specific, because rewriting context for every role is tedious.',
    solution:
      'Write once, apply everywhere — save a profile once, then produce applications that stay contextual and human-sounding.',
    role: 'Solo build — product, design and engineering',
    tech: ['Next.js', 'TypeScript', 'Workflow-first UX', 'AI-assisted drafting'],
    status: 'Independent product',
    featured: true,
  },
  {
    slug: 'webmak-labs',
    name: 'WebMak Labs',
    problem: 'Local businesses are often represented online by a social post and a phone number.',
    solution:
      'Clean, modern websites that carry what customers actually look for — menus, locations, business hours, photos, contact details and reservations.',
    role: 'Solo build — product, design and engineering',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    status: 'Independent studio work',
    featured: true,
  },
  {
    slug: 'gymwebs',
    name: 'GymWebs',
    problem: 'Structured training programmes are hard to build and even harder to keep adjusting.',
    solution:
      'A fitness platform that helps gym-goers build, customise and optimise structured programmes with AI assistance.',
    role: 'Solo build — product, design and engineering',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'OpenAI', 'Claude API'],
    status: 'Live',
    href: 'https://gympepz.vercel.app/',
    image: {src: '/static/images/gympepz.png', alt: 'GymWebs AI-assisted workout planning interface'},
  },
  {
    slug: 'linkhaus',
    name: 'LinkHaus',
    problem: 'A bio link is prime real estate that usually earns nothing.',
    solution:
      'A creator monetisation platform that turns a bio link into a revenue engine with native advertising, affiliate links and brand integration.',
    role: 'Full-stack engineer',
    tech: ['Next.js', 'tRPC', 'Prisma', 'Supabase', 'PostgreSQL', 'T3 Stack'],
    status: 'Live',
    href: 'https://development.linkhaus.io/creator',
    image: {src: '/static/images/linkhaus.png', alt: 'LinkHaus creator monetisation dashboard'},
  },
  {
    slug: 'movietrending',
    name: 'MovieTrending',
    problem: 'Finding something worth watching means bouncing between five different apps.',
    solution:
      'One place to discover trending movies and shows, with personalised recommendations, popular titles and the newest releases.',
    role: 'Solo build — product, design and engineering',
    tech: ['React', 'Next.js', 'TypeScript', 'Movie API'],
    status: 'Live',
    href: 'https://www.movietrendingtowatch.site/',
    image: {src: '/static/images/movietrendingapp.png', alt: 'MovieTrending discovery interface'},
  },
  {
    slug: 'platform-template',
    name: 'Platform Project Template',
    problem: 'Every new client project restarted the same scaffolding work from zero.',
    solution:
      'A modular platform that generates multiple projects from one template, with reusable modules and CLI tooling — around 70% less initial setup.',
    role: 'Lead developer',
    tech: ['React', 'Next.js', 'Node.js', 'Drizzle', 'PostgreSQL', 'CLI'],
    status: 'Private — internal platform',
  },
  {
    slug: 'skyll',
    name: 'Skyll',
    problem: 'Admins, teachers and students each needed a different portal on top of the same data.',
    solution:
      'One user portal covering all three roles, built on the Platform Project Template with shared, modular architecture.',
    role: 'Lead developer',
    tech: ['React', 'Next.js', 'Node.js', 'Drizzle', 'PostgreSQL', 'CLI'],
    status: 'Private — client work',
  },
  {
    slug: 'gorentals',
    name: 'GoRentals',
    problem: 'A luxury rental fleet needed booking that felt as considered as the cars.',
    solution: 'A rental platform built from modular React templates on scalable backend APIs for a seamless booking flow.',
    role: 'Full-stack engineer',
    tech: ['React', 'Express.js', 'Modular templates', 'Booking system'],
    status: 'Private — client work',
  },
  {
    slug: 'yaxxi',
    name: 'Yaxxi',
    problem: 'Ride booking only works if both riders and operators can trust it.',
    solution: 'A ride-booking service with admin dashboards, OTP verification and fraud-prevention mechanisms.',
    role: 'Full-stack engineer',
    tech: ['React', 'Node.js', 'OTP verification', 'Admin dashboard'],
    status: 'Private — client work',
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
export const otherProjects = projects.filter((project) => !project.featured);

/* -------------------------------------------------------------------------- */

export interface ImpactMetric {
  value: string;
  label: string;
  detail: string;
}

/** Experience highlights, phrased the way they appear on the résumé. */
export const impactMetrics: ImpactMetric[] = [
  {
    value: '~70%',
    label: 'less initial project setup',
    detail:
      'Reusable platform modules and CLI tooling turned repeated scaffolding into a generated starting point across 5+ projects.',
  },
  {
    value: '~40%',
    label: 'faster API responses',
    detail: 'Service-level and async optimisation on the endpoints that carried the most traffic.',
  },
  {
    value: '50%',
    label: 'faster real-time issue resolution',
    detail: 'Real-time monitoring tooling that surfaced recurring problems before they reached support.',
  },
  {
    value: '6',
    label: 'engineers led and mentored',
    detail: 'Day-to-day leadership across QA, product and UI/UX, with code quality and testing standards to match.',
  },
];

export const impactHighlights: string[] = [
  'Reusable platform modules and CLI tooling',
  'Dynamic forms and standardised CRUD workflows',
  'Microservice architectures that ship independently',
  'Real-time systems with monitoring built in',
];

/* -------------------------------------------------------------------------- */

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    description: 'Understand the business, users, constraints, existing system, and definition of success.',
  },
  {
    number: '02',
    title: 'Design',
    description:
      'Turn requirements into a clear workflow, information architecture, technical plan, and interface direction.',
  },
  {
    number: '03',
    title: 'Build',
    description:
      'Implement reusable, maintainable, tested features with scalable architecture and AI-assisted development workflows.',
  },
  {
    number: '04',
    title: 'Launch',
    description:
      'Validate quality, performance, security, usability, and production readiness, then keep improving from real feedback.',
  },
];

/* -------------------------------------------------------------------------- */

export interface TechCategory {
  title: string;
  items: string[];
}

export const techCategories: TechCategory[] = [
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Redux', 'Tailwind CSS', 'shadcn/ui'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'NestJS', 'Express', 'REST', 'GraphQL', 'Microservices', 'Socket.IO'],
  },
  {
    title: 'Data & infrastructure',
    items: ['Prisma', 'PostgreSQL', 'Redis', 'Elasticsearch', 'Kafka', 'Docker', 'Vercel', 'Firebase'],
  },
  {
    title: 'AI workflow',
    items: ['Gemini', 'Claude', 'Codex/OpenAI'],
  },
];

/* -------------------------------------------------------------------------- */

export interface ExperienceEntry {
  title: string;
  company: string;
  location: string;
  period: string;
  achievements: string[];
}

export const experience: ExperienceEntry[] = [
  {
    title: 'Full-Stack Lead Developer',
    company: 'DNA Micro Software Inc.',
    location: 'Cebu, Philippines',
    period: 'Apr 2022 – Present',
    achievements: [
      'Lead a team of 6 developers, working closely with QA, product and UI/UX',
      'Designed and implemented scalable microservice architectures for independent delivery',
      'Built internal developer platforms that cut project setup time by ~70%',
      'Mentored junior engineers and set the standards for code quality and testing',
      'Partnered directly with clients to define requirements and keep delivery predictable',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'DNA Micro Software Inc.',
    location: 'Cebu, Philippines',
    period: 'Jul 2020 – Apr 2022',
    achievements: [
      'Built a template-based React platform that accelerated rollout across 5+ projects',
      'Improved API response times by 40% through service and async optimisation',
      'Created modular microservice APIs with Express.js',
      'Designed real-time monitoring tools that cut issue-resolution time by 50%',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Arielus Software Inc.',
    location: 'Cebu, Philippines',
    period: 'Sep 2019 – May 2020',
    achievements: [
      'Built full-stack web and mobile apps for merchant and booking services',
      'Implemented a booking platform with OTP verification and fraud detection',
      'Created invoice and payment-tracking systems that improved billing accuracy',
    ],
  },
];

export const education = {
  degree: 'BS in Computer Engineering',
  specialization: 'Software Engineering',
  institution: 'University of San Carlos',
  location: 'Cebu, Philippines',
  period: '2011 – 2019',
};

/* -------------------------------------------------------------------------- */

export const profile = {
  name: 'Kit Mikhael Bagares',
  monogram: 'KMB',
  title: 'Senior Full-Stack Engineer / Lead Developer',
  location: 'Cebu, Philippines',
  intro:
    'I build production-ready digital products by connecting business goals, thoughtful user experience, scalable engineering, and practical AI workflows.',
  email: 'kityoubagares94@gmail.com',
  phone: '+63 945 427 8134',
  linkedin: 'https://www.linkedin.com/in/kit-mikhael-bagares-1143541a7',
  github: 'https://github.com/kitariel',
  resume: '/static/resume/KitMikhaelBagaresNewResume.pdf',
} as const;

export const credibilityPoints: string[] = [
  'Based in Cebu, Philippines',
  'More than five years of experience',
  'Web, mobile, backend, booking, merchant and internal platform systems',
  'Currently leading and mentoring engineers',
  'Works across product, QA, design, clients and engineering',
];

/* -------------------------------------------------------------------------- */

export const media = {
  video: {
    /** 720p fast-start encode with frequent keyframes for scroll scrubbing. */
    mp4: '/static/videos/portfolio-transformation-scroll.mp4',
    poster: '/static/videos/portfolio-video-poster.webp',
    posterFallback: '/static/videos/portfolio-video-poster.jpg',
    finalFrame: '/static/videos/portfolio-video-final-frame.webp',
    finalFrameFallback: '/static/videos/portfolio-video-final-frame.jpg',
    /** Seconds. The closing pose settles here; the DOM icons cross-fade in. */
    iconHandoffTime: 13.6,
    duration: 13.7,
  },
  portrait: {
    src: '/static/images/portrait-kit.webp',
    alt: 'Portrait of Kit Mikhael Bagares',
    width: 760,
    height: 950,
  },
} as const;
