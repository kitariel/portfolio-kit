'use client';

import {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {ArrowRight, Download, Github, Linkedin, Mail, MapPin} from 'lucide-react';
import {cn} from '@/lib/utils';
import {AccentPill} from '@/components/accent-pill';

const tools = ['Claude', 'Codex', 'Gemini'];

const stats = [
  {value: '10×', label: 'faster delivery with AI'},
  {value: '6', label: 'AI-era skills'},
  {value: '5+', label: 'years shipping products'},
];

const socials = [
  {icon: Github, href: 'https://github.com/kitariel', label: 'GitHub'},
  {icon: Linkedin, href: 'https://www.linkedin.com/in/kit-mikhael-bagares-1143541a7', label: 'LinkedIn'},
  {icon: Mail, href: 'mailto:kityoubagares94@gmail.com', label: 'Email'},
];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({behavior: 'smooth'});
  };

  const show = (delay: string) =>
    cn('transition-all duration-700', delay, isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6');

  return (
    <section id="home" className="relative flex min-h-[92vh] items-center justify-center px-6 pt-28 pb-20">
      <div className="mx-auto max-w-3xl text-center">
        {/* Status pill */}
        <div className={show('delay-0')}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open to AI-augmented engineering roles
          </span>
        </div>

        {/* Name */}
        <h1 className={cn('mt-8 text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white', show('delay-100'))}>
          Kit Mikhael Bagares
        </h1>

        {/* Role */}
        <p className={cn('mt-4 text-2xl sm:text-3xl font-medium text-slate-300', show('delay-200'))}>
          Full-Stack Engineer, <span className="text-gradient">AI-Augmented</span>
        </p>

        {/* Tagline */}
        <p className={cn('mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-400', show('delay-300'))}>
          5+ years building production software — now shipping in hours what used to take weeks, by orchestrating{' '}
          <span className="text-slate-200">models, agents, skills &amp; workflows</span> instead of writing every line by hand.
        </p>

        {/* Tools */}
        <div className={cn('mt-7 flex flex-wrap items-center justify-center gap-2', show('delay-500'))}>
          <span className="eyebrow mr-1 text-slate-500">Daily drivers</span>
          {tools.map((tool) => (
            <AccentPill key={tool}>{tool}</AccentPill>
          ))}
        </div>

        {/* CTAs */}
        <div className={cn('mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row', show('delay-700'))}>
          <Button
            onClick={() => scrollToSection('#workflow')}
            className="group bg-gradient-to-r from-violet-500 to-cyan-500 px-7 py-6 text-base font-medium text-white shadow-lg shadow-violet-500/20 hover:opacity-95"
          >
            See how I work
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button
            variant="outline"
            onClick={() => window.open('/static/resume/KitMikhaelBagaresNewResume.pdf', '_blank')}
            className="border-white/15 bg-transparent px-7 py-6 text-base font-medium text-slate-200 hover:bg-white/5 hover:text-white"
          >
            <Download className="mr-1 h-4 w-4" />
            Download CV
          </Button>
        </div>

        {/* Socials + location */}
        <div className={cn('mt-8 flex items-center justify-center gap-1', show('delay-1000'))}>
          {socials.map(({icon: Icon, href, label}) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="rounded-full p-2.5 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
          <span className="ml-2 inline-flex items-center gap-1.5 text-sm text-slate-500">
            <MapPin className="h-4 w-4" />
            Cebu, Philippines
          </span>
        </div>

        {/* Stats */}
        <dl className={cn('mx-auto mt-14 grid max-w-xl grid-cols-3 gap-4', show('delay-1000'))}>
          {stats.map((stat) => (
            <div key={stat.label} className="card-clean px-3 py-5">
              <dt className="text-2xl sm:text-3xl font-semibold text-white">{stat.value}</dt>
              <dd className="mt-1 text-xs sm:text-sm text-slate-400">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
