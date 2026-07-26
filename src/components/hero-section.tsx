'use client';

import {Button} from '@/components/ui/button';
import {ArrowRight, Download, Github, Linkedin, Mail, MapPin} from 'lucide-react';
import {AccentPill} from '@/components/accent-pill';
import {Reveal, RevealLines} from '@/components/motion/reveal';
import {Magnetic} from '@/components/motion/magnetic';

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
  return (
    <section id='home' className='relative flex min-h-[100svh] items-center px-6 pb-24 pt-32'>
      {/* Content sits in the right-hand column on desktop: the background plate
          puts the crema disc on the left, and overlapping the two would cost
          both the composition and the text contrast. */}
      <div className='mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12'>
        <div className='lg:col-span-5' />

        <div className='lg:col-span-7'>
          <Reveal>
            <span className='inline-flex items-center gap-2 rounded-full border border-crema/15 bg-portafilter/60 px-4 py-1.5 text-sm text-cream-muted backdrop-blur-sm'>
              <span className='relative flex h-2 w-2'>
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-75' />
                <span className='relative inline-flex h-2 w-2 rounded-full bg-ember' />
              </span>
              Open to AI-augmented engineering roles
            </span>
          </Reveal>

          <h1 className='mt-8 font-display text-display font-semibold text-cream'>
            <RevealLines lines={['Kit Mikhael', 'Bagares']} />
          </h1>

          <Reveal delay={0.25}>
            <p className='mt-6 font-display text-2xl font-medium text-cream-muted sm:text-3xl'>
              Full-Stack Engineer, <span className='text-gradient'>AI-Augmented</span>
            </p>
          </Reveal>

          <Reveal delay={0.35}>
            <p className='mt-6 max-w-xl text-base leading-relaxed text-cream-muted text-pretty sm:text-lg'>
              5+ years building production software — now shipping in hours what used to take weeks, by
              orchestrating <span className='text-cream'>models, agents, skills &amp; workflows</span> instead of
              writing every line by hand.
            </p>
          </Reveal>

          <Reveal delay={0.45}>
            <div className='mt-8 flex flex-wrap items-center gap-2'>
              <span className='eyebrow mr-1 text-cream-faint'>Daily drivers</span>
              {tools.map((tool) => (
                <AccentPill key={tool}>{tool}</AccentPill>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.55}>
            <div className='mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center'>
              <Magnetic>
                <Button
                  asChild
                  className='group bg-ember px-7 py-6 text-base font-medium text-roast shadow-lg shadow-ember/25 hover:bg-ember-soft'
                >
                  <a href='#workflow'>
                    See how I work
                    <ArrowRight className='ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5' />
                  </a>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button
                  asChild
                  variant='outline'
                  className='border-crema/20 bg-transparent px-7 py-6 text-base font-medium text-cream hover:bg-crema/5 hover:text-cream'
                >
                  <a href='/static/resume/KitMikhaelBagaresNewResume.pdf' target='_blank' rel='noopener noreferrer'>
                    <Download className='mr-1 h-4 w-4' />
                    Download CV
                  </a>
                </Button>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={0.65}>
            <div className='mt-9 flex items-center gap-1'>
              {socials.map(({icon: Icon, href, label}) => (
                <a
                  key={label}
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={label}
                  className='rounded-full p-2.5 text-cream-muted transition-colors hover:bg-crema/5 hover:text-ember'
                >
                  <Icon className='h-5 w-5' />
                </a>
              ))}
              <span className='ml-2 inline-flex items-center gap-1.5 text-sm text-cream-faint'>
                <MapPin className='h-4 w-4' />
                Cebu, Philippines
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.75}>
            <dl className='mt-14 grid max-w-xl grid-cols-3 gap-4'>
              {stats.map((stat) => (
                <div key={stat.label} className='card-clean bg-portafilter/40 px-3 py-5 backdrop-blur-sm'>
                  <dt className='font-display text-2xl font-semibold text-cream sm:text-3xl'>{stat.value}</dt>
                  <dd className='mt-1 text-xs text-cream-muted sm:text-sm'>{stat.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      {/* Scroll cue — the page is a pour, so it reads downward. */}
      <div
        aria-hidden
        className='pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex'
      >
        <span className='eyebrow text-cream-faint'>Scroll</span>
        <span className='h-12 w-px bg-gradient-to-b from-ember to-transparent' />
      </div>
    </section>
  );
}
