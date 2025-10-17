'use client';

import {useState, useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Code2, Database, Globe, Smartphone, Server, Cloud, ExternalLink, Github, Mail, MapPin, Phone, Send} from 'lucide-react';

export function PortfolioSections() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      {threshold: 0.1}
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const skills = [
    {name: 'Frontend', icon: Code2, techs: ['React.js', 'Next.js', 'TypeScript', 'Redux']},
    {name: 'Backend', icon: Server, techs: ['Node.js', 'Nest.js', 'Express.js', 'ASP.NET']},
    {name: 'Database', icon: Database, techs: ['RethinkDB', 'Redis', 'ElasticSearch', 'MariaDB']},
    {name: 'Architecture', icon: Globe, techs: ['Microservices', 'GraphQL', 'Event-driven', 'API Design']},
    {name: 'Cloud & Tools', icon: Cloud, techs: ['Docker', 'Kafka', 'gRPC', 'Socket.IO']},
    {name: 'Languages', icon: Code2, techs: ['JavaScript', 'TypeScript', 'C#', 'Python']},
  ];

  const projects = [
    {
      title: 'Platform Project Template',
      description: 'Modular platform capable of generating multiple projects from a single template. Reduced setup time by 70% with reusable modules and CLI tools.',
      image: '/api/placeholder/400/250',
      techs: ['React', 'Node.js', 'CLI Tools', 'Templates'],
      github: '#',
      demo: '#',
    },
    {
      title: 'Skyll Project',
      description: 'Comprehensive user portal (Admins, Teachers, Students) powered by the Platform Project Template with shared components and modular architecture.',
      image: '/api/placeholder/400/250',
      techs: ['React', 'Platform Template', 'Modular Architecture', 'User Management'],
      github: '#',
      demo: '#',
    },
    {
      title: 'GoRentals',
      description: 'Luxury car rental platform designed with modular React templates and scalable backend APIs for seamless booking experience.',
      image: '/api/placeholder/400/250',
      techs: ['React', 'Express.js', 'Modular Templates', 'Booking System'],
      github: '#',
      demo: '#',
    },
    {
      title: 'Yaxxi',
      description: 'Secure ride-booking service with admin dashboards, OTP verification, and fraud prevention mechanisms for safe transportation.',
      image: '/api/placeholder/400/250',
      techs: ['React', 'Node.js', 'OTP Verification', 'Admin Dashboard'],
      github: '#',
      demo: '#',
    },
  ];

  return (
    <>
      {/* About Section */}
      <section id='about' data-section className='py-20 px-4 sm:px-6 lg:px-8 relative'>
        <div className='container mx-auto max-w-6xl'>
          <div className={`transition-all duration-1000 ${visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className='text-center mb-16'>
              <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4'>About Me</h2>
              <p className='text-slate-400 text-lg max-w-2xl mx-auto'>Full-Stack Developer with 5+ years of experience in scalable architectures and team leadership</p>
            </div>

            <div className='grid lg:grid-cols-2 gap-12 items-center'>
              <div className='space-y-6'>
                <h3 className='text-2xl sm:text-3xl font-bold text-white'>Leading Teams, Building Platforms</h3>
                <div className='space-y-4 text-slate-300 leading-relaxed'>
                  <p>As a Full-Stack Developer with 5+ years of experience, I specialize in designing scalable architectures, building developer platforms, and leading high-performing teams. Currently leading a team of 6 developers at DNA Micro Software Inc., I focus on creating robust software ecosystems that empower developers and enhance user experience.</p>
                  <p>My expertise spans microservice architecture, frontend frameworks, and backend APIs, with a strong emphasis on maintainability, performance, and team collaboration. I've successfully reduced setup time by 70% through internal developer platforms and improved API response times by 40% through service optimization.</p>
                  <p>I'm passionate about mentoring junior engineers, introducing best practices in code quality and testing, and partnering directly with clients to deliver impactful solutions at scale.</p>
                </div>
                <div className='flex flex-wrap gap-4'>
                  <div className='flex items-center space-x-2 text-blue-400'>
                    <Code2 className='w-5 h-5' />
                    <span>5+ Years Experience</span>
                  </div>
                  <div className='flex items-center space-x-2 text-green-400'>
                    <Globe className='w-5 h-5' />
                    <span>Team Lead of 6 Developers</span>
                  </div>
                </div>
              </div>

              <div className='relative'>
                <div className='bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-8 backdrop-blur-sm border border-slate-700/50'>
                  <div className='space-y-4'>
                    <div className='flex justify-between items-center'>
                      <span className='text-slate-300'>Frontend Development</span>
                      <span className='text-blue-400 font-semibold'>95%</span>
                    </div>
                    <div className='w-full bg-slate-700 rounded-full h-2'>
                      <div className='bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full w-[95%]'></div>
                    </div>

                    <div className='flex justify-between items-center'>
                      <span className='text-slate-300'>Backend Development</span>
                      <span className='text-green-400 font-semibold'>90%</span>
                    </div>
                    <div className='w-full bg-slate-700 rounded-full h-2'>
                      <div className='bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full w-[90%]'></div>
                    </div>

                    <div className='flex justify-between items-center'>
                      <span className='text-slate-300'>Database Design</span>
                      <span className='text-purple-400 font-semibold'>85%</span>
                    </div>
                    <div className='w-full bg-slate-700 rounded-full h-2'>
                      <div className='bg-gradient-to-r from-purple-500 to-purple-400 h-2 rounded-full w-[85%]'></div>
                    </div>

                    <div className='flex justify-between items-center'>
                      <span className='text-slate-300'>DevOps & Cloud</span>
                      <span className='text-orange-400 font-semibold'>80%</span>
                    </div>
                    <div className='w-full bg-slate-700 rounded-full h-2'>
                      <div className='bg-gradient-to-r from-orange-500 to-orange-400 h-2 rounded-full w-[80%]'></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id='skills' data-section className='py-20 px-4 sm:px-6 lg:px-8 relative'>
        <div className='container mx-auto max-w-6xl'>
          <div className={`transition-all duration-1000 ${visibleSections.has('skills') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className='text-center mb-16'>
              <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4'>Skills & Expertise</h2>
              <p className='text-slate-400 text-lg max-w-2xl mx-auto'>Technologies and tools I use to bring ideas to life</p>
            </div>

            {/* Technical Skills */}
            <div className='mb-16'>
              <h3 className='text-2xl font-bold text-white mb-8 text-center'>Technical Skills</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {skills.map((skill, index) => (
                  <Card key={skill.name} className={`bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105 hover:border-blue-500/50 ${visibleSections.has('skills') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: `${index * 100}ms`}}>
                    <CardHeader className='text-center'>
                      <skill.icon className='w-12 h-12 mx-auto text-blue-400 mb-4' />
                      <CardTitle className='text-white'>{skill.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='flex flex-wrap gap-2 justify-center'>
                        {skill.techs.map((tech) => (
                          <span key={tech} className='px-3 py-1 bg-slate-700/50 text-slate-300 text-sm rounded-full border border-slate-600/50'>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div>
              <h3 className='text-2xl font-bold text-white mb-8 text-center'>Professional Skills</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
                {['Systematic Problem-Solving', 'Cross-Functional Collaboration', 'Team Leadership', 'Code Quality Focus', 'Continuous Learning'].map((softSkill, index) => (
                  <Card key={softSkill} className={`bg-gradient-to-br from-slate-800/50 to-slate-700/30 border-slate-600/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 ${visibleSections.has('skills') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: `${(skills.length + index) * 100}ms`}}>
                    <CardContent className='p-4 text-center'>
                      <span className='text-white font-medium text-sm'>{softSkill}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id='projects' data-section className='py-20 px-4 sm:px-6 lg:px-8 relative'>
        <div className='container mx-auto max-w-6xl'>
          <div className={`transition-all duration-1000 ${visibleSections.has('projects') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className='text-center mb-16'>
              <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4'>Featured Projects</h2>
              <p className='text-slate-400 text-lg max-w-2xl mx-auto'>A showcase of my recent work and personal projects</p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8'>
              {projects.map((project, index) => (
                <Card key={project.title} className={`bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105 overflow-hidden group ${visibleSections.has('projects') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: `${index * 200}ms`}}>
                  <div className='relative overflow-hidden'>
                    <div className='w-full h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center'>
                      <Code2 className='w-16 h-16 text-blue-400' />
                    </div>
                    <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4'>
                      <Button size='sm' variant='outline' className='text-white border-white hover:bg-white hover:text-black'>
                        <Github className='w-4 h-4 mr-2' />
                        Code
                      </Button>
                      <Button size='sm' className='bg-blue-600 hover:bg-blue-700'>
                        <ExternalLink className='w-4 h-4 mr-2' />
                        Demo
                      </Button>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className='text-white'>{project.title}</CardTitle>
                    <CardDescription className='text-slate-400'>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='flex flex-wrap gap-2'>
                      {project.techs.map((tech) => (
                        <span key={tech} className='px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded border border-slate-600/50'>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id='contact' data-section className='py-20 px-4 sm:px-6 lg:px-8 relative'>
        <div className='container mx-auto max-w-6xl'>
          <div className={`transition-all duration-1000 ${visibleSections.has('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className='text-center mb-16'>
              <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4'>Let&apos;s Work Together</h2>
              <p className='text-slate-400 text-lg max-w-2xl mx-auto'>Ready to bring your ideas to life? Let&apos;s discuss your next project</p>
            </div>

            <div className='grid lg:grid-cols-2 gap-12'>
              <div className='space-y-8'>
                <div>
                  <h3 className='text-2xl font-bold text-white mb-6'>Get In Touch</h3>
                  <p className='text-slate-300 leading-relaxed mb-8'>I&apos;m always interested in hearing about new opportunities and exciting projects. Whether you&apos;re a company looking to hire, or you&apos;re a fellow developer wanting to collaborate, I&apos;d love to hear from you.</p>
                </div>

                <div className='space-y-6'>
                  <div className='flex items-center space-x-4'>
                    <div className='w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center'>
                      <Mail className='w-6 h-6 text-blue-400' />
                    </div>
                    <div>
                      <p className='text-white font-medium'>Email</p>
                      <p className='text-slate-400'>kityoubagares94@gmail.com</p>
                    </div>
                  </div>

                  <div className='flex items-center space-x-4'>
                    <div className='w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center'>
                      <Phone className='w-6 h-6 text-green-400' />
                    </div>
                    <div>
                      <p className='text-white font-medium'>Phone</p>
                      <p className='text-slate-400'>+63 945 427 8134</p>
                    </div>
                  </div>

                  <div className='flex items-center space-x-4'>
                    <div className='w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center'>
                      <MapPin className='w-6 h-6 text-purple-400' />
                    </div>
                    <div>
                      <p className='text-white font-medium'>Location</p>
                      <p className='text-slate-400'>Consolacion City, Cebu, Philippines</p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className='bg-slate-800/50 border-slate-700/50'>
                <CardHeader>
                  <CardTitle className='text-white'>Send a Message</CardTitle>
                  <CardDescription className='text-slate-400'>Fill out the form below and I&apos;ll get back to you as soon as possible.</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-slate-300 mb-2'>First Name</label>
                      <input type='text' className='w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' placeholder='John' />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-slate-300 mb-2'>Last Name</label>
                      <input type='text' className='w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' placeholder='Doe' />
                    </div>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-slate-300 mb-2'>Email</label>
                    <input type='email' className='w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' placeholder='john@example.com' />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-slate-300 mb-2'>Subject</label>
                    <input type='text' className='w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' placeholder='Project Inquiry' />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-slate-300 mb-2'>Message</label>
                    <textarea rows={4} className='w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none' placeholder='Tell me about your project...' />
                  </div>
                  <Button className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition-all duration-200 hover:scale-105'>
                    <Send className='w-5 h-5 mr-2' />
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
