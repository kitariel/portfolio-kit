'use client'

import Image from 'next/image'
import {Marquee} from '@/components/motion/marquee'
import {Reveal} from '@/components/motion/reveal'

interface TechItem {
  name: string
  icon: React.ReactNode
  url?: string
  color?: string
  width?: number
  height?: number
}

const techStack: TechItem[] = [
  {
    name: 'NextJS',
    icon: (
      <Image
        alt='NextJS'
        src='/static/images/nextjs.jpg'
        width={45}
        height={45}
        className="rounded-full object-cover"
      />
    ),
    url: 'https://nextjs.org/',
    color: 'text-cream'
  },
  {
    name: 'NestJS',
    icon: (
      <Image
        alt='NestJS'
        src='/static/images/nestjs.webp'
        width={130}
        height={45}
        className="rounded-lg object-cover"
      />
    ),
    url: 'https://nestjs.com/',
    color: 'text-red-500'
  },
  {
    name: 'JavaScript',
    icon: (
      <Image
        alt='JavaScript'
        src='/static/images/Javascript.png'
        width={45}
        height={45}
        className="rounded-full object-cover"
      />
    ),
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    color: 'text-yellow-400'
  },
  {
    name: 'TypeScript',
    icon: (
      <Image
        alt='TypeScript'
        src='/static/images/typescript.png'
        width={45}
        height={45}
        className="rounded-full object-cover"
      />
    ),
    url: 'https://www.typescriptlang.org/',
    color: 'text-blue-500'
  },
  {
    name: 'NodeJS',
    icon: (
      <Image
        alt='NodeJS'
        src='/static/images/nodejs.png'
        width={45}
        height={45}
        className="rounded-full object-cover"
      />
    ),
    url: 'https://nodejs.org/',
    color: 'text-green-500'
  },
  {
    name: 'gRPC',
    icon: (
      <Image
        alt='gRPC'
        src='/static/images/grpc.png'
        width={45}
        height={45}
        className="rounded-full object-cover"
      />
    ),
    url: 'https://grpc.io/',
    color: 'text-blue-400'
  },
  {
    name: 'Linux',
    icon: (
      <Image
        alt='Linux'
        src='/static/images/linux.png'
        width={45}
        height={45}
        className="rounded-full object-cover"
      />
    ),
    url: 'https://www.linux.org/',
    color: 'text-yellow-500'
  },
  {
    name: 'ReactJS',
    icon: (
      <Image
        alt='ReactJS'
        src='/static/images/reactjs.png'
        width={45}
        height={45}
        className="rounded-full object-cover"
      />
    ),
    url: 'https://react.dev/',
    color: 'text-blue-400'
  },
  {
    name: 'RethinkDB',
    icon: (
      <Image
        alt='RethinkDB'
        src='/static/images/rethinkdb.png'
        width={45}
        height={45}
        className="rounded-full object-cover"
      />
    ),
    url: 'https://rethinkdb.com/',
    color: 'text-orange-500'
  },
  {
    name: 'C#',
    icon: (
      <Image
        alt='C#'
        src='/static/images/csharp.png'
        width={45}
        height={45}
        className="rounded-full object-cover"
      />
    ),
    url: 'https://docs.microsoft.com/en-us/dotnet/csharp/',
    color: 'text-purple-500'
  },
  {
    name: 'Docker',
    icon: (
      <Image
        alt='Docker'
        src='/static/images/docker.png'
        width={45}
        height={45}
        className="rounded-full object-cover"
      />
    ),
    url: 'https://www.docker.com/',
    color: 'text-blue-500'
  },
  {
    name: 'Git',
    icon: (
      <Image
        alt='Git'
        src='/static/images/git.png'
        width={45}
        height={45}
        className="rounded-full object-cover"
      />
    ),
    url: 'https://git-scm.com/',
    color: 'text-orange-600'
  },
  {
    name: 'GraphQL',
    icon: (
      <Image
        alt='GraphQL'
        src='/static/images/gql.png'
        width={45}
        height={45}
        className="rounded-full object-cover"
      />
    ),
    url: 'https://graphql.org/',
    color: 'text-pink-500'
  },
  {
    name: 'Socket.io',
    icon: (
      <Image
        alt='Socket.io'
        src='/static/images/socketio.png'
        width={45}
        height={45}
        className="rounded-full object-cover"
      />
    ),
    url: 'https://socket.io/',
    color: 'text-cream'
  },
  {
    name: 'Kafka',
    icon: (
      <Image
        alt='Kafka'
        src='/static/images/kafka.png'
        width={45}
        height={45}
        className="rounded-full object-cover"
      />
    ),
    url: 'https://kafka.apache.org/',
    color: 'text-gray-300'
  },
  {
    name: 'XState',
    icon: (
      <Image
        alt='XState'
        src='/static/images/xstate.svg'
        width={130}
        height={45}
        className="rounded-lg object-contain"
      />
    ),
    url: 'https://xstate.js.org/',
    color: 'text-blue-300'
  },
  {
    name: 'ExpressJS',
    icon: (
      <Image
        alt='ExpressJS'
        src='/static/images/expressjs.png'
        width={100}
        height={45}
        className="rounded-lg object-contain"
      />
    ),
    url: 'https://expressjs.com/',
    color: 'text-gray-300'
  }
]

/**
 * Demoted from a full section to a marquee strip. The stack is supporting
 * evidence, not a headline act -- giving it a whole screen slowed the page down
 * right where the work should be building momentum.
 */
export default function EnhancedTechStack() {
  return (
    <section id="stack" className="relative overflow-hidden py-20 sm:py-24">
      <div className="mx-auto mb-10 max-w-7xl px-6">
        <Reveal className="flex flex-col gap-3 text-center">
          <span className="eyebrow inline-flex items-center justify-center gap-2 text-ember">
            <span className="h-px w-6 bg-gradient-to-r from-ember to-crema" />
            Engineering stack
          </span>
          <p className="mx-auto max-w-2xl text-base text-cream-muted text-pretty">
            AI accelerates the work — these are the tools the craft is actually built on, from 5+ years in
            production.
          </p>
        </Reveal>
      </div>

      <Marquee speed={55}>
        {techStack.map((tech) => (
          <a
            key={tech.name}
            href={tech.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group mx-2 flex shrink-0 items-center gap-3 rounded-xl border border-crema/10 bg-portafilter/50 px-5 py-4 backdrop-blur-sm transition-colors hover:border-ember/35"
          >
            <span className="relative flex items-center">{tech.icon}</span>
            <span className="whitespace-nowrap font-jetbrains text-sm text-cream-muted transition-colors group-hover:text-cream">
              {tech.name}
            </span>
          </a>
        ))}
      </Marquee>
    </section>
  )
}