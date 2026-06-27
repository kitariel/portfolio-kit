'use client';

import Image from 'next/image';
import {Code2, ExternalLink, Lock, Sparkles} from 'lucide-react';
import {cn} from '@/lib/utils';
import {useReveal} from '@/hooks/use-reveal';
import {SectionHeading} from '@/components/section-heading';

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
  const {ref, shown} = useReveal();

  return (
    <section id="projects" className="relative px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="04 — Selected work"
          title="Products I've shipped"
          subtitle="Real platforms in production — increasingly built with AI in the loop, from planning to code to review."
        />

        <div ref={ref} className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const hasImage = Boolean(project.image);
            return (
              <article
                key={project.title}
                className={cn(
                  'card-clean group flex flex-col overflow-hidden transition-all duration-700',
                  shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                )}
                style={{transitionDelay: `${index * 80}ms`}}
              >
                {/* Preview */}
                <div className="relative flex h-44 items-center justify-center overflow-hidden border-b border-white/5 bg-gradient-to-br from-violet-500/10 to-cyan-500/10">
                  {hasImage ? (
                    <Image src={project.image as string} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <Code2 className="h-12 w-12 text-violet-300/60" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {project.isPrivate ? (
                      <button
                        onClick={scrollToContact}
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
                      >
                        <Lock className="h-4 w-4" /> Private — ask for a demo
                      </button>
                    ) : (
                      <button
                        onClick={() => window.open(project.demo, '_blank')}
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-4 py-2 text-sm font-medium text-white"
                      >
                        <ExternalLink className="h-4 w-4" /> Open live
                      </button>
                    )}
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                    {isAiProject(project.techs) && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-violet-400/30 bg-violet-500/10 px-2 py-0.5 text-[10px] font-medium text-violet-200">
                        <Sparkles className="h-3 w-3" /> AI
                      </span>
                    )}
                  </div>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.techs.map((tech) => (
                      <span key={tech} className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 font-jetbrains text-[11px] text-slate-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
