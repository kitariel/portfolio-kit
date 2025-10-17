'use client'

import Image from 'next/image'

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
    <section 
      id="all-technologies" 
      className="py-20 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            All Technologies
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Complete overview of technologies I work with
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {techStack.map((tech, index) => (
            <div
              key={tech.name}
              className="group relative transition-all duration-300 opacity-100 translate-y-0"
              style={{ 
                animationDelay: `${index * 100}ms`
              }}
            >
              <a
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-slate-700/50 hover:border-slate-500/50"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    {tech.icon}
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  </div>
                  <span className={`text-sm font-medium text-center leading-tight ${tech.color || 'text-slate-300'} group-hover:text-white transition-colors`}>
                    {tech.name}
                  </span>
                </div>
              </a>

              {/* Ripple Effect */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}