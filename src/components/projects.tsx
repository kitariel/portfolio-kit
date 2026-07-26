'use client';

import Image from 'next/image';
import {Code2, ExternalLink, Lock, Sparkles} from 'lucide-react';
import {SectionHeading} from '@/components/section-heading';
import {Reveal} from '@/components/motion/reveal';

interface Project {
  title: string;
  description: string;
  techs: string[];
  demo: string;
  isPrivate: boolean;
  image?: string;
}

const projects: Project[] = [
  {
    title: 'GymWebs',
    description:
      'AI-powered workout planning platform. A fitness SaaS that helps gym-goers build, customize, and optimize structured programs with AI assistance.',
    techs: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'OpenAI', 'Claude API'],
    demo: 'https://gympepz.vercel.app/',
    isPrivate: false,
    image: '/static/images/gympepz.png',
  },
  {
    title: 'MovieTrending',
    description:
      'Discover trending movies and TV shows with personalized recommendations, popular titles, and the newest releases.',
    techs: ['React', 'Next.js', 'TypeScript', 'Movie API'],
    demo: 'https://www.movietrendingtowatch.site/',
    isPrivate: false,
    image: '/static/images/movietrendingapp.png',
  },
  {
    title: 'LinkHaus',
    description:
      'Creator monetization platform. Turn a bio link into a revenue engine with native advertising, affiliate links, and brand integration.',
    techs: ['Next.js', 'Prisma', 'tRPC', 'Supabase', 'Postgres', 'T3 Stack'],
    demo: 'https://development.linkhaus.io/creator',
    isPrivate: false,
    image: '/static/images/linkhaus.png',
  },
  {
    title: 'AliPlace',
    description: 'Find your perfect property with interactive maps and a streamlined browsing experience.',
    techs: ['Next.js', 'Prisma', 'tRPC', 'Supabase', 'Postgres', 'T3 Stack'],
    demo: 'https://aliplace.vercel.app/',
    isPrivate: false,
    image: '/static/images/aliplace.png',
  },
  {
    title: 'Platform Project Template',
    description:
      'Modular platform that generates multiple projects from a single template. Cut setup time by 70% with reusable modules and CLI tooling.',
    techs: ['React', 'Next.js', 'Node.js', 'Drizzle', 'Postgres', 'CLI'],
    demo: '#',
    isPrivate: true,
  },
  {
    title: 'Skyll Project',
    description:
      'Comprehensive user portal for Admins, Teachers, and Students, powered by the Platform Project Template with shared, modular architecture.',
    techs: ['React', 'Next.js', 'Node.js', 'Drizzle', 'Postgres', 'CLI'],
    demo: '#',
    isPrivate: true,
  },
  {
    title: 'GoRentals',
    description:
      'Luxury car rental platform built with modular React templates and scalable backend APIs for a seamless booking experience.',
    techs: ['React', 'Express.js', 'Modular Templates', 'Booking System'],
    demo: '#',
    isPrivate: true,
  },
  {
    title: 'Yaxxi',
    description:
      'Secure ride-booking service with admin dashboards, OTP verification, and fraud-prevention mechanisms for safe transportation.',
    techs: ['React', 'Node.js', 'OTP Verification', 'Admin Dashboard'],
    demo: '#',
    isPrivate: true,
  },
];

const isAiProject = (techs: string[]) => techs.some((t) => /openai|claude|ai/i.test(t));

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'});
}

export function Projects() {
  return (
    <section id="projects" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="04 — Selected work"
          title="Products I've shipped"
          subtitle="Real platforms in production — increasingly built with AI in the loop, from planning to code to review."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const hasImage = Boolean(project.image);
            return (
              <Reveal key={project.title} delay={index * 0.07} className="h-full">
              <article className="card-clean group flex h-full flex-col overflow-hidden bg-portafilter/50 backdrop-blur-sm">
                {/* Preview */}
                <div className="relative flex h-44 items-center justify-center overflow-hidden border-b border-grounds bg-gradient-to-br from-ember/10 to-well/30">
                  {hasImage ? (
                    <Image src={project.image as string} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <Code2 className="h-12 w-12 text-ember/60" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-roast/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {project.isPrivate ? (
                      <button
                        onClick={scrollToContact}
                        className="inline-flex items-center gap-2 rounded-full border border-crema/20 bg-crema/5 px-4 py-2 text-sm text-cream hover:bg-crema/10"
                      >
                        <Lock className="h-4 w-4" /> Private — ask for a demo
                      </button>
                    ) : (
                      <button
                        onClick={() => window.open(project.demo, '_blank')}
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ember to-crema px-4 py-2 text-sm font-medium text-cream"
                      >
                        <ExternalLink className="h-4 w-4" /> Open live
                      </button>
                    )}
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-cream">{project.title}</h3>
                    {isAiProject(project.techs) && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-ember/30 bg-ember/10 px-2 py-0.5 text-[10px] font-medium text-ember">
                        <Sparkles className="h-3 w-3" /> AI
                      </span>
                    )}
                  </div>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-cream-muted">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.techs.map((tech) => (
                      <span key={tech} className="rounded-md border border-crema/10 bg-crema/[0.03] px-2 py-0.5 font-jetbrains text-[11px] text-cream-muted">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
