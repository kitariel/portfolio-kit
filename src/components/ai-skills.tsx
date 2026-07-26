'use client';

import {Sparkles, Gem, Layers, Gauge, Bot, Workflow, type LucideIcon} from 'lucide-react';
import {SectionHeading} from '@/components/section-heading';
import {Reveal} from '@/components/motion/reveal';

interface Skill {
  icon: LucideIcon;
  name: string;
  description: string;
}

const skills: Skill[] = [
  {
    icon: Sparkles,
    name: 'AI-Native',
    description:
      'I live inside AI tools. Prompts, models, and agents are my default way to build — not an afterthought bolted onto an old workflow.',
  },
  {
    icon: Gem,
    name: 'Taste & Judgement',
    description:
      'AI generates infinite options; knowing which one is actually good is the real skill. I steer, review, and reject output until it ships production-grade.',
  },
  {
    icon: Layers,
    name: 'Context Engineering',
    description:
      'Great output starts with great context. I feed models the right constraints, examples, and codebase knowledge so they get it right the first time.',
  },
  {
    icon: Gauge,
    name: 'Iteration Speed',
    description:
      'Tight build–measure–refine loops. I ship a version in hours, learn from real feedback, and improve — instead of perfecting in isolation for weeks.',
  },
  {
    icon: Bot,
    name: 'AI Agents',
    description:
      'I design and orchestrate agents that plan, write, test, and verify multi-step work autonomously — then supervise the outcome with judgement.',
  },
  {
    icon: Workflow,
    name: 'Workflow',
    description:
      'I wire models, agents, and skills into repeatable systems. One engineer with the right workflow now outputs like a whole team.',
  },
];

export function AISkills() {
  return (
    <section id='skills' className='relative px-6 py-28 sm:py-36'>
      <div className='mx-auto max-w-7xl'>
        <SectionHeading
          eyebrow='01 — The new fundamentals'
          title='The 6 skills that matter in the AI era'
          subtitle="Framework expertise is table stakes now — the leverage moved up the stack. These are the skills I've sharpened to build with AI instead of around it."
        />

        <div className='mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {skills.map((skill, index) => (
            <Reveal key={skill.name} delay={index * 0.08}>
              <article className='card-clean group h-full bg-portafilter/50 p-6 backdrop-blur-sm'>
                <div className='flex items-center justify-between'>
                  <div className='flex h-11 w-11 items-center justify-center rounded-xl border border-crema/10 bg-crema/[0.03] text-ember transition-colors group-hover:border-ember/40 group-hover:text-ember-soft'>
                    <skill.icon className='h-5 w-5' />
                  </div>
                  <span className='font-jetbrains text-sm text-cream-faint'>0{index + 1}</span>
                </div>
                <h3 className='mt-5 font-display text-lg font-semibold text-cream'>{skill.name}</h3>
                <p className='mt-2 text-sm leading-relaxed text-cream-muted'>{skill.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
