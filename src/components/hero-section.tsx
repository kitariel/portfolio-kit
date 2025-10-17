'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react'
import RubikCube from './rubik-cube'
import TypewriterText from './typewriter-text'

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-8">
          {/* Avatar */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mb-8 flex items-center justify-center">
              <RubikCube 
                size={typeof window !== 'undefined' && window.innerWidth >= 1024 ? 192 : window.innerWidth >= 640 ? 160 : 128}
                className="animate-pulse"
              />
              {/* Floating elements around cube */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
              <div className="absolute top-1/2 -left-4 w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
            </div>
          </div>

          {/* Name and Title */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 font-inter">
              Kit Mikhael
            </h1>
            <div className="relative">
              <TypewriterText 
                text="<FullStackDeveloper />"
                className="text-xl sm:text-2xl lg:text-3xl text-blue-400 mb-8 font-jetbrains"
                delay={1000}
              />
            </div>
          </div>

          <div className={`space-y-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              I craft exceptional digital experiences with modern technologies. 
              Passionate about creating scalable web applications that make a difference.
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'AWS'].map((tech, index) => (
                <span
                  key={tech}
                  className={`px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full text-sm text-slate-300 transition-all duration-300 hover:bg-slate-700/50 hover:border-blue-500/50 hover:text-white ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Button
              onClick={() => scrollToSection('#projects')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-blue-500/25"
            >
              View My Work
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection('#contact')}
              className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-200 hover:scale-105"
            >
              <Download className="w-5 h-5 mr-2" />
              Download CV
            </Button>
          </div>

          {/* Social Links */}
          <div className={`flex justify-center space-x-6 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {[
              { icon: Github, href: '#', label: 'GitHub' },
              { icon: Linkedin, href: '#', label: 'LinkedIn' },
              { icon: Mail, href: '#contact', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <button
                key={label}
                onClick={() => href.startsWith('#') ? scrollToSection(href) : window.open(href, '_blank')}
                className="p-3 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-full transition-all duration-200 hover:scale-110"
                aria-label={label}
              >
                <Icon className="w-6 h-6" />
              </button>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <button
              onClick={() => scrollToSection('#about')}
              className="flex flex-col items-center space-y-2 text-slate-400 hover:text-white transition-colors duration-200 group"
            >
              <span className="text-sm font-medium">Scroll Down</span>
              <ArrowDown className="w-5 h-5 animate-bounce group-hover:text-blue-400" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}