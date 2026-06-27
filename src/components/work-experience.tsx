'use client';

import {Building2, Calendar, MapPin, Check} from 'lucide-react';
import {cn} from '@/lib/utils';
import {useReveal} from '@/hooks/use-reveal';
import {SectionHeading} from '@/components/section-heading';

const workExperience = [
  {
    title: 'Full-Stack Lead Developer',
    company: 'DNA Micro Software Inc.',
    location: 'Cebu, Philippines',
    period: 'Apr 2022 – Present',
    achievements: [
      'Lead a team of 6 developers, collaborating closely with QA, product, and UI/UX',
      'Designed and implemented scalable microservice architectures for independent delivery',
      'Built internal developer platforms that cut project setup time by ~70%',
      'Mentored junior engineers and introduced best practices in code quality and testing',
      'Partnered directly with clients to define requirements and ensure smooth delivery',
    ],
    skills: ['Team Leadership', 'Microservices', 'Developer Platforms', 'Client Relations'],
  },
  {
    title: 'Software Engineer',
    company: 'DNA Micro Software Inc.',
    location: 'Cebu, Philippines',
    period: 'Jul 2020 – Apr 2022',
    achievements: [
      'Built a template-based React platform that accelerated rollout across 5+ projects',
      'Improved API response times by 40% through service and async optimization',
      'Created modular microservice APIs with Express.js for scalable development',
      'Designed real-time monitoring tools that cut issue-resolution time by 50%',
    ],
    skills: ['React', 'Express.js', 'API Optimization', 'Real-time Systems'],
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
      'Collaborated cross-functionally to align technical solutions with business goals',
    ],
    skills: ['Full-Stack', 'Mobile Apps', 'Payment Systems', 'Security'],
  },
];

export function WorkExperience() {
  const {ref, shown} = useReveal();

  return (
    <section id="experience" className="relative px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Experience"
          title="Five years of shipping in production"
          subtitle="The track record the AI-augmented workflow now sits on top of."
        />

        <div ref={ref} className="mt-16 space-y-5">
          {workExperience.map((job, index) => (
            <article
              key={`${job.company}-${job.period}`}
              className={cn(
                'card-clean p-6 sm:p-7 transition-all duration-700',
                shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{transitionDelay: `${index * 120}ms`}}
            >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                    <Building2 className="h-5 w-5 text-violet-300" />
                    {job.title}
                  </h3>
                  <p className="mt-1 font-medium text-cyan-300/90">{job.company}</p>
                </div>
                <div className="flex flex-col gap-1.5 text-sm text-slate-500 sm:flex-row sm:gap-4">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" /> {job.period}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" /> {job.location}
                  </span>
                </div>
              </div>

              <ul className="mt-5 space-y-2">
                {job.achievements.map((achievement) => (
                  <li key={achievement} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-400">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                    {achievement}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {job.skills.map((skill) => (
                  <span key={skill} className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-jetbrains text-[11px] text-slate-400">
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
