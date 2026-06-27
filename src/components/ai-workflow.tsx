'use client';

import {Brain, Bot, Puzzle, Workflow, ArrowRight, ArrowDown, Repeat, type LucideIcon} from 'lucide-react';
import {cn} from '@/lib/utils';
import {useReveal} from '@/hooks/use-reveal';
import {SectionHeading} from '@/components/section-heading';
import {AccentPill} from '@/components/accent-pill';

interface FlowNode {
  icon: LucideIcon;
  step: string;
  title: string;
  role: string;
  description: string;
  tools: string[];
  /** Render the tool chips in the violet→cyan accent (used for the AI model names). */
  accentTools?: boolean;
}

const nodes: FlowNode[] = [
  {
    icon: Brain,
    step: 'Step 01',
    title: 'Model',
    role: 'The reasoning engine',
    description: 'Pick the right brain for the job — deep reasoning, raw speed, or low cost.',
    tools: ['Claude', 'Codex', 'Gemini'],
    accentTools: true,
  },
  {
    icon: Bot,
    step: 'Step 02',
    title: 'Agent',
    role: 'Plans & executes',
    description: 'Give the model tools and autonomy to act across many steps, not just answer.',
    tools: ['Claude Code', 'Codex CLI'],
  },
  {
    icon: Puzzle,
    step: 'Step 03',
    title: 'Skills',
    role: 'Reusable expertise',
    description: 'Package proven know-how into skills the agent loads on demand, every time.',
    tools: ['Custom skills', 'MCP tools'],
  },
  {
    icon: Workflow,
    step: 'Step 04',
    title: 'Workflow',
    role: 'Repeatable systems',
    description: 'Chain it all into a pipeline that ships reliable results, on repeat.',
    tools: ['Orchestration', 'CI / Review'],
  },
];

export function AIWorkflow() {
  const {ref, shown} = useReveal();

  return (
    <section id="workflow" className="relative px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="02 — How I build now"
          title="Model → Agent → Skills → Workflow"
          subtitle="My operating system for shipping fast. I compose AI building blocks into a loop that turns intent into reviewed, working software."
        />

        <div ref={ref} className="mt-16 flex flex-col lg:flex-row lg:items-stretch">
          {nodes.map((node, index) => (
            <div
              key={node.title}
              className="contents"
            >
              {/* Node card */}
              <article
                className={cn(
                  'card-clean group flex flex-1 flex-col items-center p-6 text-center transition-all duration-700',
                  shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                )}
                style={{transitionDelay: `${index * 120}ms`}}
              >
                <span className="eyebrow text-slate-500">{node.step}</span>
                <div className="mt-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/25 bg-violet-500/10 text-violet-200 transition-colors group-hover:border-violet-400/50">
                  <node.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{node.title}</h3>
                <p className="mt-1 font-jetbrains text-xs text-cyan-300/80">{node.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{node.description}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                  {node.tools.map((tool) =>
                    node.accentTools ? (
                      <AccentPill key={tool} className="rounded-md px-2 py-0.5 text-[11px]">
                        {tool}
                      </AccentPill>
                    ) : (
                      <span key={tool} className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 font-jetbrains text-[11px] text-slate-400">
                        {tool}
                      </span>
                    )
                  )}
                </div>
              </article>

              {/* Connector */}
              {index < nodes.length - 1 && (
                <div
                  className={cn(
                    'flex shrink-0 items-center justify-center py-3 transition-opacity duration-700 lg:px-2',
                    shown ? 'opacity-100' : 'opacity-0'
                  )}
                  style={{transitionDelay: `${index * 120 + 60}ms`}}
                  aria-hidden
                >
                  {/* horizontal on desktop */}
                  <div className="hidden items-center lg:flex">
                    <div className="h-0.5 w-7 flow-line" />
                    <ArrowRight className="h-4 w-4 text-violet-300/80" />
                  </div>
                  {/* vertical on mobile */}
                  <div className="flex flex-col items-center lg:hidden">
                    <div className="h-6 w-0.5 flow-line-v" />
                    <ArrowDown className="h-4 w-4 text-violet-300/80" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Iterate loop + payoff */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 font-jetbrains text-xs text-slate-300">
            <Repeat className="h-3.5 w-3.5 text-cyan-300" />
            Iterate — every loop sharpens the result
          </span>
          <p className="text-center text-sm text-slate-500">
            This loop is exactly why a task that used to take{' '}
            <span className="text-slate-300">10 hours</span> now ships in{' '}
            <span className="text-slate-300">30 minutes</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
