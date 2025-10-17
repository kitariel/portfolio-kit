'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, Calendar, MapPin, Users, TrendingUp, Award } from 'lucide-react'

export function WorkExperience() {
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

  const workExperience = [
    {
      title: 'Full-Stack Lead Developer',
      company: 'DNA Micro Software Inc.',
      location: 'Cebu, Philippines',
      period: 'April 2022 – Present',
      type: 'Full-time',
      achievements: [
        'Lead a team of 6 developers, collaborating closely with QA, product managers, and UI/UX teams',
        'Designed and implemented scalable microservice architectures for independent development',
        'Built internal developer platforms reducing setup time by approximately 70%',
        'Mentored junior engineers and introduced best practices in code quality and testing',
        'Partnered directly with clients to define requirements and ensure smooth delivery'
      ],
      skills: ['Team Leadership', 'Microservices', 'Developer Platforms', 'Client Relations']
    },
    {
      title: 'Software Engineer',
      company: 'DNA Micro Software Inc.',
      location: 'Cebu, Philippines',
      period: 'Jul 2020 – Apr 2022',
      type: 'Full-time',
      achievements: [
        'Developed dynamic, template-based React platform accelerating product rollout across 5+ projects',
        'Improved API response times by 40% through service optimization and asynchronous data handling',
        'Created microservice APIs with Express.js for modular, scalable development',
        'Designed real-time monitoring and debugging tools reducing issue resolution time by 50%',
        'Integrated GoRentals luxury car booking platform with reusable architecture patterns'
      ],
      skills: ['React', 'Express.js', 'API Optimization', 'Real-time Systems']
    },
    {
      title: 'Software Engineer',
      company: 'Arielus Software Inc.',
      location: 'Cebu, Philippines',
      period: 'Sep 2019 – May 2020',
      type: 'Full-time',
      achievements: [
        'Built full-stack web and mobile applications for merchant and booking services',
        'Implemented Yaxxi booking platform with OTP verification and fraud detection',
        'Created invoice and payment tracking systems increasing billing accuracy',
        'Collaborated with cross-functional teams to align technical solutions with business goals'
      ],
      skills: ['Full-Stack Development', 'Mobile Apps', 'Payment Systems', 'Security']
    }
  ]

  return (
    <section 
      id="experience" 
      data-section="experience"
      className="py-20 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="container mx-auto max-w-6xl">
        <div className={`transition-all duration-1000 ${visibleSections.has('experience') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Work Experience
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              My professional journey in software engineering and team leadership
            </p>
          </div>

          <div className="space-y-8">
            {workExperience.map((job, index) => (
              <Card 
                key={`${job.company}-${job.period}`}
                className={`bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/30 transition-all duration-500 ${visibleSections.has('experience') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="space-y-2">
                      <CardTitle className="text-xl text-white flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-blue-400" />
                        {job.title}
                      </CardTitle>
                      <CardDescription className="text-lg text-blue-400 font-medium">
                        {job.company}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 text-sm text-slate-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {job.period}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                      <Award className="w-4 h-4 text-green-400" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {job.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="text-slate-300 flex items-start gap-2">
                          <TrendingUp className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-3">Technologies & Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-slate-700/50 text-slate-300 text-sm rounded-full border border-slate-600/50 hover:border-blue-500/50 transition-colors"
                        >
                          {skill}
                        </span>
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