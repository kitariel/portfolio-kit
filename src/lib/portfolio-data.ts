/**
 * Single source of truth for every repeated block of portfolio content.
 * Sections render from these structures instead of duplicating markup.
 */

export type AiToolId = "gemini" | "claude" | "codex";

export interface AiTool {
  id: AiToolId;
  /** Accessible name for the icon and card heading. */
  name: string;
  /** One-word role, shown under the name. */
  role: string;
  summary: string;
  responsibilities: string[];
}

/** Research, planning, and execution in workflow order. */
export const aiTools: AiTool[] = [
  {
    id: "gemini",
    name: "Gemini",
    role: "Research",
    summary:
      "Where a project starts — understanding the space before committing to a direction.",
    responsibilities: [
      "Research",
      "Market and product understanding",
      "Idea exploration",
      "Strategy",
      "Comparing possibilities",
    ],
  },
  {
    id: "claude",
    name: "Claude",
    role: "Planning",
    summary:
      "Turning what I learned into a plan someone else could actually pick up and build.",
    responsibilities: [
      "Planning",
      "Writing",
      "Documentation",
      "Reviewing requirements",
      "Business and product reasoning",
    ],
  },
  {
    id: "codex",
    name: "Codex",
    role: "Execution",
    summary:
      "Implement the plan, review the code, test the behaviour, and refine the product before release.",
    responsibilities: [
      "Implementation",
      "Coding",
      "Refactoring",
      "Testing",
      "Automation",
      "Product execution",
    ],
  },
];

/* -------------------------------------------------------------------------- */

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Overview", href: "#overview" },
  { label: "Selected work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Technology", href: "#stack" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
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
  image?: { src: string; alt: string };
  /** Featured projects receive expanded editorial briefs. */
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "aliplace",
    name: "Aliplaces",
    problem:
      "Property listings are usually a list of rows, but people search for a home by place, not by page number.",
    solution:
      "A map-first discovery, listing and property-operation platform, with optional Studio workspaces for teams that manage properties day to day.",
    role: "Solo build — product, design and engineering",
    tech: [
      "Next.js",
      "TypeScript",
      "tRPC",
      "Prisma",
      "PostgreSQL",
      "Better Auth",
      "Tailwind CSS",
      "shadcn/ui",
      "UploadThing",
      "Mapbox",
      "Vercel",
    ],
    status: "Independent product · live",
    href: "https://www.aliplaces.com/",
    image: {
      src: "/static/images/aliplaces-production.jpg",
      alt: "Aliplaces production discovery page with property images and search filters",
    },
    featured: true,
  },
  {
    slug: "aikapoy",
    name: "AIKapoy",
    problem:
      "Replying well takes context and tone, and most AI assistants either miss both or send something on your behalf.",
    solution:
      "A context-aware browser sidebar for chat, replies, summaries, rewriting, analysis, and reusable prompts. Users attach page context, refine the output, and decide when to use it; nothing is sent automatically.",
    role: "Solo build — product, design and engineering",
    tech: [
      "JavaScript browser extension",
      "Next.js",
      "API backend",
      "AI reply workflows",
    ],
    status: "Independent product · live",
    href: "https://www.aikapoy.com/",
    image: {
      src: "/static/images/aikapoy-production.jpg",
      alt: "AIKapoy production website presenting its contextual browser assistant",
    },
    featured: true,
  },
  {
    slug: "applywithcontext",
    name: "ApplyWithContext",
    problem:
      "Job applications get generic exactly when they need to be specific, because rewriting context for every role is tedious.",
    solution:
      "A job-application workspace that combines application tracking, saved profile context, and tailored first drafts, keeping role details, status, and notes together.",
    role: "Solo build — product, design and engineering",
    tech: [
      "Next.js",
      "TypeScript",
      "Workflow-first UX",
      "AI-assisted drafting",
    ],
    status: "Independent product · live beta",
    href: "https://www.applywithcontext.cv/",
    image: {
      src: "/static/images/applywithcontext-app.png",
      alt: "ApplyWithContext application tracking dashboard, from the product preview on its public website",
    },
    featured: true,
  },
  {
    slug: "finllet",
    name: "Finllet",
    problem:
      "Keeping track of bank accounts, e-wallets, cash, and loan repayments means piecing together a financial picture from separate records.",
    solution:
      "An offline-first personal finance journal for accounts, expenses, income, and loan tracking, with conversational entry and a local ledger. The mobile app is in active development.",
    role: "End-to-end build — product, design, web and mobile development",
    tech: ["Expo", "React Native", "TypeScript", "Next.js", "SQLite"],
    status: "Independent product · in development",
    href: "https://finllet.app/",
    image: {
      src: "/static/images/finllet-production.jpg",
      alt: "Finllet public product preview showing its money tracking app",
    },
    featured: true,
  },
  {
    slug: "bmad",
    name: "B-MAD",
    problem:
      "Food and habit tracking becomes hard to sustain when each meal and daily update requires another form.",
    solution:
      "A conversational calorie and habit tracker for food, water, steps, weight, and progress, with an offline diary and optional online features. iOS and Android releases are coming soon.",
    role: "End-to-end build — product, design, web and mobile development",
    tech: ["Expo", "React Native", "TypeScript", "Next.js", "SQLite"],
    status: "Independent product · in development",
    href: "https://www.trybmad.com/",
    image: {
      src: "/static/images/bmad-production.jpg",
      alt: "B-MAD public product preview showing conversational food tracking and mobile app screens",
    },
    featured: true,
  },
  {
    slug: "webmak-labs",
    name: "WebMak Labs",
    problem:
      "Local businesses are often represented online by a social post and a phone number.",
    solution:
      "Websites for local businesses, bringing menus, locations, hours, photos, contact details, and reservations into one place.",
    role: "Solo build — product, design and engineering",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    status: "Independent studio work",
    featured: true,
  },
  {
    slug: "gymwebs",
    name: "GymWebs",
    problem:
      "Structured training programmes are hard to build and even harder to keep adjusting.",
    solution:
      "A fitness platform that helps gym-goers build, customise and optimise structured programmes with AI assistance.",
    role: "Solo build — product, design and engineering",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "OpenAI",
      "Claude API",
    ],
    status: "Live",
    href: "https://gympepz.vercel.app/",
    image: {
      src: "/static/images/gympepz.png",
      alt: "GymWebs AI-assisted workout planning interface",
    },
  },
  {
    slug: "linkhaus",
    name: "LinkHaus",
    problem: "A bio link is prime real estate that usually earns nothing.",
    solution:
      "A creator monetisation platform with native advertising, affiliate links, and brand integration in a single bio link.",
    role: "Full-stack engineer",
    tech: ["Next.js", "tRPC", "Prisma", "Supabase", "PostgreSQL", "T3 Stack"],
    status: "Live",
    href: "https://development.linkhaus.io/creator",
    image: {
      src: "/static/images/linkhaus.png",
      alt: "LinkHaus creator monetisation dashboard",
    },
  },
  {
    slug: "movietrending",
    name: "MovieTrending",
    problem:
      "Finding something worth watching means bouncing between five different apps.",
    solution:
      "One place to discover trending movies and shows, with personalised recommendations, popular titles and the newest releases.",
    role: "Solo build — product, design and engineering",
    tech: ["React", "Next.js", "TypeScript", "Movie API"],
    status: "Live",
    href: "https://www.movietrendingtowatch.site/",
    image: {
      src: "/static/images/movietrendingapp.png",
      alt: "MovieTrending discovery interface",
    },
  },
  {
    slug: "platform-template",
    name: "Platform Project Template",
    problem:
      "Every new client project restarted the same scaffolding work from zero.",
    solution:
      "A modular platform that generates multiple projects from one template, with reusable modules and CLI tooling — around 70% less initial setup.",
    role: "Lead developer",
    tech: ["React", "Next.js", "Node.js", "Drizzle", "PostgreSQL", "CLI"],
    status: "Private — internal platform",
  },
  {
    slug: "skyll",
    name: "Skyll",
    problem:
      "Admins, teachers and students each needed a different portal on top of the same data.",
    solution:
      "One user portal covering all three roles, built on the Platform Project Template with shared, modular architecture.",
    role: "Lead developer",
    tech: ["React", "Next.js", "Node.js", "Drizzle", "PostgreSQL", "CLI"],
    status: "Private — client work",
  },
  {
    slug: "gorentals",
    name: "GoRentals",
    problem:
      "A luxury rental fleet needed booking that felt as considered as the cars.",
    solution:
      "A rental platform built from modular React templates and scalable backend APIs, connecting fleet operations with booking workflows.",
    role: "Full-stack engineer",
    tech: ["React", "Express.js", "Modular templates", "Booking system"],
    status: "Private — client work",
  },
  {
    slug: "yaxxi",
    name: "Yaxxi",
    problem:
      "Ride booking only works if both riders and operators can trust it.",
    solution:
      "A ride-booking service with admin dashboards, OTP verification and fraud-prevention mechanisms.",
    role: "Full-stack engineer",
    tech: ["React", "Node.js", "OTP verification", "Admin dashboard"],
    status: "Private — client work",
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
    value: "~70%",
    label: "less initial project setup",
    detail:
      "Reusable platform modules and CLI tooling turned repeated scaffolding into a generated starting point across 5+ projects.",
  },
  {
    value: "~40%",
    label: "faster API responses",
    detail:
      "Service-level and async optimisation on the endpoints that carried the most traffic.",
  },
  {
    value: "50%+",
    label: "less issue-resolution time",
    detail:
      "Real-time monitoring tooling that surfaced recurring problems before they reached support.",
  },
  {
    value: "6",
    label: "engineers led and mentored",
    detail:
      "Day-to-day leadership across QA, product and UI/UX, with code quality and testing standards to match.",
  },
];

export const impactHighlights: string[] = [
  "Reusable platform modules and CLI tooling",
  "Dynamic forms and standardised CRUD workflows",
  "Microservice architectures that ship independently",
  "Real-time systems with monitoring built in",
];

/* -------------------------------------------------------------------------- */

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "Understand the business, users, constraints, existing system, and definition of success.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Turn requirements into a clear workflow, information architecture, technical plan, and interface direction.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Implement reusable, maintainable, tested features with scalable architecture and AI-assisted development workflows.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "Validate quality, performance, security, usability, and production readiness, then keep improving from real feedback.",
  },
];

/* -------------------------------------------------------------------------- */

export interface TechCategory {
  title: string;
  items: string[];
}

export const techCategories: TechCategory[] = [
  {
    title: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Redux",
      "Tailwind CSS",
      "shadcn/ui",
    ],
  },
  {
    title: "Backend",
    items: [
      "Node.js",
      "NestJS",
      "Express",
      "REST",
      "GraphQL",
      "Microservices",
      "Socket.IO",
    ],
  },
  {
    title: "Data & infrastructure",
    items: [
      "Prisma",
      "PostgreSQL",
      "Redis",
      "Elasticsearch",
      "Kafka",
      "Docker",
      "Vercel",
      "Firebase",
    ],
  },
  {
    title: "AI workflow",
    items: ["Gemini", "Claude", "Codex/OpenAI"],
  },
];

/* -------------------------------------------------------------------------- */

export interface ExperienceEntry {
  title: string;
  company: string;
  location: string;
  period: string;
  startedAt: string;
  achievements: string[];
}

export const experience: ExperienceEntry[] = [
  {
    title: "Senior Lead Full Stack Developer",
    company: "DNA Micro",
    location: "Cebu, Philippines",
    period: "Apr 2022 – Present",
    startedAt: "2022-04-01",
    achievements: [
      "Lead a team of 6 developers, working closely with QA, product and UI/UX",
      "Designed and implemented scalable microservice architectures for independent delivery",
      "Built internal developer platforms that cut project setup time by ~70%",
      "Mentored junior engineers and set the standards for code quality and testing",
      "Partnered directly with clients to define requirements and keep delivery predictable",
    ],
  },
  {
    title: "Software Engineer",
    company: "DNA Micro",
    location: "Cebu, Philippines",
    period: "Jul 2020 – Apr 2022",
    startedAt: "2020-07-01",
    achievements: [
      "Built a template-based React platform that accelerated rollout across 5+ projects",
      "Improved API response times by 40% through service and async optimisation",
      "Created modular microservice APIs with Express.js",
      "Designed real-time monitoring tools that reduced issue-resolution time by over 50%",
      "Integrated GoRentals with reusable architecture patterns",
    ],
  },
  {
    title: "Software Engineer",
    company: "Arielus Software Inc. (formerly 3AG Business Solutions Inc.)",
    location: "Cebu, Philippines",
    period: "Sep 2019 – May 2020",
    startedAt: "2019-09-01",
    achievements: [
      "Built full-stack web and mobile apps for merchant and booking services",
      "Implemented a booking platform with OTP verification and fraud detection",
      "Created invoice and payment-tracking systems that improved billing accuracy",
    ],
  },
];

export const education = {
  degree: "BS in Computer Engineering",
  specialization: "Software Engineering",
  institution: "University of San Carlos",
  location: "Cebu, Philippines",
  period: "2011 – 2019",
};

/* -------------------------------------------------------------------------- */

export const profile = {
  name: "Kit Mikhael Bagares",
  monogram: "KMB",
  title: "Senior Full-Stack Engineer / Lead Developer",
  location: "Cebu, Philippines",
  intro:
    "I build production-ready digital products by connecting business goals, thoughtful user experience, scalable engineering, and practical AI workflows.",
  email: "kityoubagares94@gmail.com",
  phone: "+63 945 427 8134",
  linkedin: "https://www.linkedin.com/in/kit-mikhael-bagares-1143541a7",
  github: "https://github.com/kitariel",
  resume: "/static/resume/KitMikhaelBagaresNewResume.pdf",
} as const;

export const credibilityPoints: string[] = [
  "Based in Cebu, Philippines",
  "Building software professionally since 2019",
  "Web, mobile, backend, booking, merchant and internal platform systems",
  "Currently leading and mentoring engineers",
  "Works across product, QA, design, clients and engineering",
];

/* -------------------------------------------------------------------------- */

export const media = {
  portrait: {
    src: "/static/images/portrait-kit.webp",
    alt: "Portrait of Kit Mikhael Bagares",
    width: 760,
    height: 950,
  },
} as const;
