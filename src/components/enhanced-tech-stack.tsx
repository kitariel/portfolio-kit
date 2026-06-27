'use client'

import Image from 'next/image'
import {SectionHeading} from '@/components/section-heading'

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
    color: 'text-white'
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
    color: 'text-white'
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

export default function EnhancedTechStack() {

  return (
    <section id="stack" className="relative px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Engineering stack"
          title="The foundation underneath the AI"
          subtitle="AI accelerates the work — these are the tools and technologies the craft is actually built on, from 5+ years in production."
        />

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {techStack.map((tech) => (
            <a
              key={tech.name}
              href={tech.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card-clean group flex flex-col items-center gap-3 p-4"
            >
              <div className="relative">{tech.icon}</div>
              <span className="text-center text-sm font-medium leading-tight text-slate-400 transition-colors group-hover:text-white">
                {tech.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}