'use client';

import {GraduationCap, Calendar, MapPin} from 'lucide-react';
import {cn} from '@/lib/utils';
import {useReveal} from '@/hooks/use-reveal';
import {SectionHeading} from '@/components/section-heading';

const education = [
  {
    degree: 'BS in Computer Engineering',
    specialization: 'Software Engineering',
    institution: 'University of San Carlos',
    location: 'Cebu, Philippines',
    period: '2011 – 2019',
    highlights: [
      'Software Engineering specialization',
      'Computer systems architecture',
      'Programming & algorithm design',
      'Database management systems',
    ],
  },
  {
    degree: 'High School Diploma',
    institution: 'Sogod National High School',
    location: 'Sogod, Philippines',
    period: '2007 – 2011',
    highlights: ['Mathematics & sciences', 'Analytical problem solving', 'Academic excellence', 'Leadership activities'],
  },
];

export function Education() {
  const {ref, shown} = useReveal();

  return (
    <section id="education" className="relative px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Education" title="Where the engineering mindset started" />

        <div ref={ref} className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {education.map((edu, index) => (
            <article
              key={edu.institution}
              className={cn(
                'card-clean p-6 sm:p-7 transition-all duration-700',
                shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{transitionDelay: `${index * 120}ms`}}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-violet-300">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold leading-tight text-white">{edu.degree}</h3>
                  {edu.specialization && <p className="mt-0.5 text-sm text-cyan-300/90">{edu.specialization}</p>}
                  <p className="mt-1 text-sm text-slate-400">{edu.institution}</p>
                  <div className="mt-2 flex flex-col gap-1.5 text-xs text-slate-500 sm:flex-row sm:gap-4">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" /> {edu.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" /> {edu.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {edu.highlights.map((highlight) => (
                  <span key={highlight} className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-xs text-slate-400">
                    {highlight}
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
