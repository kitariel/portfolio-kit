'use client';

import {Clock, Zap} from 'lucide-react';
import {cn} from '@/lib/utils';
import {useReveal} from '@/hooks/use-reveal';
import {SectionHeading} from '@/components/section-heading';

const examples = [
  {task: 'Scaffold a new feature — UI, API & tests', before: '2 days', after: '2 hrs'},
  {task: 'Triage & fix a production bug', before: '4 hrs', after: '25 min'},
  {task: 'Refactor a module + add test coverage', before: '1 week', after: '1 day'},
];

export function Impact() {
  const {ref, shown} = useReveal();

  return (
    <section id="impact" className="relative px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="03 — Proof, not buzzwords"
          title="From 10 hours to 30 minutes"
          subtitle="The point of all this isn't using AI for its own sake — it's compressing the distance between an idea and shipped, working software."
        />

        <div ref={ref} className="mt-16 grid gap-5 lg:grid-cols-5">
          {/* Featured comparison */}
          <div
            className={cn(
              'card-clean p-7 lg:col-span-3 transition-all duration-700',
              shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
          >
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-semibold text-gradient sm:text-6xl">20×</span>
              <span className="text-lg font-medium text-slate-300">faster — 95% less time</span>
            </div>

            <div className="mt-8 space-y-6">
              {/* Before */}
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="inline-flex items-center gap-2 text-slate-400">
                    <Clock className="h-4 w-4" /> Before — by hand
                  </span>
                  <span className="font-jetbrains text-slate-400">10 hrs</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-slate-600 transition-[width] duration-1000 ease-out"
                    style={{width: shown ? '100%' : '0%'}}
                  />
                </div>
              </div>

              {/* After */}
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="inline-flex items-center gap-2 text-slate-200">
                    <Zap className="h-4 w-4 text-cyan-300" /> After — AI-augmented
                  </span>
                  <span className="font-jetbrains text-cyan-300">30 min</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-[width] duration-1000 ease-out delay-300"
                    style={{width: shown ? '5%' : '0%'}}
                  />
                </div>
              </div>
            </div>

            <p className="mt-7 text-sm leading-relaxed text-slate-400">
              Same quality bar, same review standards — the difference is orchestrating models and agents to do the
              heavy lifting while I keep the taste, judgement, and final call.
            </p>
          </div>

          {/* Example rows */}
          <div
            className={cn(
              'card-clean p-7 lg:col-span-2 transition-all duration-700 delay-150',
              shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
          >
            <h3 className="eyebrow text-slate-500">Real tasks, real numbers</h3>
            <ul className="mt-5 divide-y divide-white/5">
              {examples.map((ex) => (
                <li key={ex.task} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                  <span className="text-sm text-slate-300">{ex.task}</span>
                  <span className="flex shrink-0 items-center gap-2 font-jetbrains text-xs">
                    <span className="text-slate-500 line-through">{ex.before}</span>
                    <span className="text-cyan-300">{ex.after}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
