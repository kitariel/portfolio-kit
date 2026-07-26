'use client';

import {Building2, Calendar, MapPin, Check, GraduationCap} from 'lucide-react';
import {SectionHeading} from '@/components/section-heading';
import {Reveal} from '@/components/motion/reveal';

const education = [
  {
    degree: 'BS in Computer Engineering',
    specialization: 'Software Engineering',
    institution: 'University of San Carlos',
    location: 'Cebu, Philippines',
    period: '2011 – 2019',
  },
  {
    degree: 'High School Diploma',
    specialization: undefined,
    institution: 'Sogod National High School',
    location: 'Sogod, Philippines',
    period: '2007 – 2011',
  },
];

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
  return (
    <section id="experience" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="05 — Track record"
          title="Five years of shipping in production"
          subtitle="The track record the AI-augmented workflow now sits on top of."
        />

        <div className="mt-16 space-y-5">
          {workExperience.map((job, index) => (
            <Reveal key={`${job.company}-${job.period}`} delay={index * 0.1}>
            <article className="card-clean bg-portafilter/50 p-6 backdrop-blur-sm sm:p-7">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-cream">
                    <Building2 className="h-5 w-5 text-ember" />
                    {job.title}
                  </h3>
                  <p className="mt-1 font-medium text-crema/90">{job.company}</p>
                </div>
                <div className="flex flex-col gap-1.5 text-sm text-cream-faint sm:flex-row sm:gap-4">
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
                  <li key={achievement} className="flex items-start gap-2.5 text-sm leading-relaxed text-cream-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
                    {achievement}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {job.skills.map((skill) => (
                  <span key={skill} className="rounded-md border border-crema/10 bg-crema/[0.03] px-2.5 py-0.5 font-jetbrains text-[11px] text-cream-muted">
                    {skill}
                  </span>
                ))}
              </div>
            </article>
            </Reveal>
          ))}
        </div>

        {/* Education folded in here rather than owning a section of its own --
            it is context for the track record, not a headline in itself. */}
        <Reveal delay={0.1}>
          <h3 className="eyebrow mt-20 flex items-center gap-2 text-ember">
            <span className="h-px w-6 bg-gradient-to-r from-ember to-crema" />
            Education
          </h3>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {education.map((item, index) => (
            <Reveal key={item.degree} delay={index * 0.1}>
              <article className="card-clean h-full bg-portafilter/50 p-6 backdrop-blur-sm">
                <h4 className="flex items-start gap-2 font-display text-base font-semibold text-cream">
                  <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-ember" />
                  {item.degree}
                </h4>
                {item.specialization && (
                  <p className="mt-1 pl-7 text-sm text-crema">{item.specialization}</p>
                )}
                <p className="mt-2 pl-7 text-sm text-cream-muted">{item.institution}</p>
                <p className="mt-1 pl-7 font-jetbrains text-xs text-cream-faint">
                  {item.period} · {item.location}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
