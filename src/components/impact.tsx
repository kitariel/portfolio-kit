'use client';

import {useRef} from 'react';
import {Clock, Zap} from 'lucide-react';
import {useInView} from 'motion/react';
import {SectionHeading} from '@/components/section-heading';
import {Reveal} from '@/components/motion/reveal';

const examples = [
  {task: 'Scaffold a new feature — UI, API & tests', before: '2 days', after: '2 hrs'},
  {task: 'Triage & fix a production bug', before: '4 hrs', after: '25 min'},
  {task: 'Refactor a module + add test coverage', before: '1 week', after: '1 day'},
];

export function Impact() {
  const ref = useRef<HTMLDivElement>(null);
  // The bars are the payload of this section, so they animate on entry rather
  // than being baked in at their final width.
  const shown = useInView(ref, {once: true, margin: '-15% 0px'});

  return (
    <section id='impact' className='relative px-6 py-28 sm:py-36'>
      <div className='mx-auto max-w-7xl'>
        <SectionHeading
          eyebrow='03 — Proof, not buzzwords'
          title='From 10 hours to 30 minutes'
          subtitle="The point of all this isn't using AI for its own sake — it's compressing the distance between an idea and shipped, working software."
        />

        <div ref={ref} className='mt-16 grid gap-5 lg:grid-cols-5'>
          <Reveal className='lg:col-span-3'>
            <div className='card-clean h-full bg-portafilter/50 p-7 backdrop-blur-sm'>
              <div className='flex items-baseline gap-3'>
                <span className='font-display text-5xl font-semibold text-gradient sm:text-6xl'>20×</span>
                <span className='text-lg font-medium text-cream-muted'>faster — 95% less time</span>
              </div>

              <div className='mt-8 space-y-6'>
                <div>
                  <div className='mb-2 flex items-center justify-between text-sm'>
                    <span className='inline-flex items-center gap-2 text-cream-muted'>
                      <Clock className='h-4 w-4' /> Before — by hand
                    </span>
                    <span className='font-jetbrains text-cream-muted'>10 hrs</span>
                  </div>
                  <div className='h-3 w-full overflow-hidden rounded-full bg-crema/5'>
                    <div
                      className='h-full rounded-full bg-grounds transition-[width] duration-1000 ease-out'
                      style={{width: shown ? '100%' : '0%'}}
                    />
                  </div>
                </div>

                <div>
                  <div className='mb-2 flex items-center justify-between text-sm'>
                    <span className='inline-flex items-center gap-2 text-cream'>
                      <Zap className='h-4 w-4 text-ember' /> After — AI-augmented
                    </span>
                    <span className='font-jetbrains text-ember'>30 min</span>
                  </div>
                  <div className='h-3 w-full overflow-hidden rounded-full bg-crema/5'>
                    <div
                      className='h-full rounded-full bg-gradient-to-r from-ember to-crema transition-[width] duration-1000 ease-out delay-300'
                      style={{width: shown ? '5%' : '0%'}}
                    />
                  </div>
                </div>
              </div>

              <p className='mt-7 text-sm leading-relaxed text-cream-muted'>
                Same quality bar, same review standards — the difference is orchestrating models and agents to do
                the heavy lifting while I keep the taste, judgement, and final call.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15} className='lg:col-span-2'>
            <div className='card-clean h-full bg-portafilter/50 p-7 backdrop-blur-sm'>
              <h3 className='eyebrow text-cream-faint'>Real tasks, real numbers</h3>
              <ul className='mt-5 divide-y divide-grounds'>
                {examples.map((ex) => (
                  <li key={ex.task} className='flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0'>
                    <span className='text-sm text-cream-muted'>{ex.task}</span>
                    <span className='flex shrink-0 items-center gap-2 font-jetbrains text-xs'>
                      <span className='text-cream-faint line-through'>{ex.before}</span>
                      <span className='text-ember'>{ex.after}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
