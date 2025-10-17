'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from 'lucide-react'

export function Education() {
  const [visibleSections, setVisibleSections] = useState(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('data-section')
            if (sectionId) {
              setVisibleSections(prev => new Set([...prev, sectionId]))
            }
          }
        })
      },
      { threshold: 0.1 }
    )

    const sections = document.querySelectorAll('[data-section]')
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const education = [
    {
      degree: 'Bachelor of Science in Computer Engineering',
      specialization: 'Software Engineering',
      institution: 'University of San Carlos',
      location: 'Cebu, Philippines',
      period: '2011 – 2019',
      type: 'University',
      description: 'Comprehensive program covering software engineering principles, computer systems, and programming methodologies.',
      highlights: [
        'Software Engineering Specialization',
        'Computer Systems Architecture',
        'Programming & Algorithm Design',
        'Database Management Systems',
        'Software Project Management'
      ]
    },
    {
      degree: 'High School Diploma',
      institution: 'Sogod National High School',
      location: 'Sogod, Philippines',
      period: '2007 – 2011',
      type: 'High School',
      description: 'Strong foundation in mathematics, sciences, and analytical thinking.',
      highlights: [
        'Mathematics & Sciences',
        'Analytical Problem Solving',
        'Academic Excellence',
        'Leadership Activities'
      ]
    }
  ]

  return (
    <section 
      id="education" 
      data-section="education"
      className="py-20 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="container mx-auto max-w-6xl">
        <div className={`transition-all duration-1000 ${visibleSections.has('education') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Education
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Academic foundation that shaped my engineering mindset
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <Card 
                key={`${edu.institution}-${edu.period}`}
                className={`bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/30 transition-all duration-500 hover:scale-105 hover:border-blue-500/50 ${visibleSections.has('education') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <GraduationCap className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <CardTitle className="text-lg text-white leading-tight">
                        {edu.degree}
                        {edu.specialization && (
                          <span className="block text-sm text-blue-400 font-normal mt-1">
                            {edu.specialization}
                          </span>
                        )}
                      </CardTitle>
                      <CardDescription className="text-slate-300 font-medium">
                        {edu.institution}
                      </CardDescription>
                      <div className="flex flex-col sm:flex-row gap-2 text-sm text-slate-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {edu.period}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {edu.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {edu.description}
                  </p>
                  
                  <div>
                    <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-green-400" />
                      Key Areas
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {edu.highlights.map((highlight, highlightIndex) => (
                        <div key={highlightIndex} className="flex items-center gap-2 text-slate-300 text-sm">
                          <Award className="w-3 h-3 text-green-400 flex-shrink-0" />
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}