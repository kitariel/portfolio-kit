'use client';

import {useState, useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Code2, Database, Globe, Smartphone, Server, Cloud, ExternalLink, Github, Mail, MapPin, Phone, Send} from 'lucide-react';
import Image from 'next/image';
import {useToast} from '@/hooks/use-toast';

export function PortfolioSections() {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {toast} = useToast();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          access_key: '0f344545-267b-41d4-9a8e-ce56478c2f1c',
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        toast({
          title: 'Success!',
          description: 'Message sent successfully!',
        });
        setFormData({firstName: '', lastName: '', email: '', subject: '', message: ''});
      } else {
        toast({
          title: 'Error',
          description: 'Failed to send message. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
      title: 'GymWebs',
      description: 'AI-Powered Workout Planning Platform. GymWebs is a modern fitness SaaS platform that empowers gym-goers to build, customize, and optimize structured workout programs with AI assistance.',
      techs: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Vercel', 'OpenAI', 'Claude API'],
      github: '#',
      demo: 'https://gympepz.vercel.app/',
      isPrivate: false,
      // gympepz.png
      image: '/static/images/gympepz.png',
    },
    {
      title: 'MovieTrending',
      description: 'Discover the latest trending movies and TV shows with personalized recommendations, popular titles, and newest releases in entertainment.',
      image: '/static/images/movietrendingapp.png',
      techs: ['React', 'Next.js', 'TypeScript', 'Movie API'],
      github: 'https://www.movietrendingtowatch.site/',
      demo: 'https://www.movietrendingtowatch.site/',
      isPrivate: false,
    },
    {
      title: 'LinkHaus',
      description: 'Creator monetization platform built for content creators. Transform your bio into a revenue engine with native advertising, affiliate links, and seamless brand integration.',
      image: '/static/images/linkhaus.png',
      techs: ['Next.js', 'Prisma', 'tRPC', 'Supabase', 'Postgres', 'T3 Stack'],
      github: 'https://development.linkhaus.io/creator',
      demo: 'https://development.linkhaus.io/creator',
      isPrivate: false,
    },
    {
      title: 'AliPlace',
      description: 'Find your perfect property with interactive maps',
      image: '/static/images/aliplace.png',
      techs: ['Next.js', 'Prisma', 'tRPC', 'Supabase', 'Postgres', 'T3 Stack'],
      github: 'https://aliplace.vercel.app/',
      demo: 'https://aliplace.vercel.app/',
      isPrivate: false,
    },
    {
      title: 'Platform Project Template',
      description: 'Modular platform capable of generating multiple projects from a single template. Reduced setup time by 70% with reusable modules and CLI tools.',
      image: '/api/placeholder/400/250',
      techs: ['React', 'Next.js', 'Node.js', 'Drizzle', 'Templates', 'Postgres', 'CLI'],
      github: '#',
      demo: '#',
      isPrivate: true,
    },
    {
      title: 'Skyll Project',
      description: 'Comprehensive user portal (Admins, Teachers, Students) powered by the Platform Project Template with shared components and modular architecture.',
      image: '/api/placeholder/400/250',
      techs: ['React', 'Next.js', 'Node.js', 'Drizzle', 'Templates', 'Postgres', 'CLI'],
      github: '#',
      demo: '#',
      isPrivate: true,
    },
    {
      title: 'GoRentals',
      description: 'Luxury car rental platform designed with modular React templates and scalable backend APIs for seamless booking experience.',
      image: '/api/placeholder/400/250',
      techs: ['React', 'Express.js', 'Modular Templates', 'Booking System'],
      github: '#',
      demo: '#',
      isPrivate: true,
    },
    {
      title: 'Yaxxi',
      description: 'Secure ride-booking service with admin dashboards, OTP verification, and fraud prevention mechanisms for safe transportation.',
      image: '/api/placeholder/400/250',
      techs: ['React', 'Node.js', 'OTP Verification', 'Admin Dashboard'],
      github: '#',
      demo: '#',
      isPrivate: true,
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
                  <p>My expertise spans microservice architecture, frontend frameworks, and backend APIs, with a strong emphasis on maintainability, performance, and team collaboration. I&apos;ve successfully reduced setup time by 70% through internal developer platforms and improved API response times by 40% through service optimization.</p>
                  <p>I&apos;m passionate about mentoring junior engineers, introducing best practices in code quality and testing, and partnering directly with clients to deliver impactful solutions at scale.</p>
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
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                  <div className='bg-gradient-to-br from-blue-500/10 to-blue-600/20 rounded-xl p-6 backdrop-blur-sm border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105'>
                    <div className='flex items-center space-x-4'>
                      <div className='w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center'>
                        <Code2 className='w-6 h-6 text-blue-400' />
                      </div>
                      <div>
                        <h4 className='text-white font-semibold text-lg'>Frontend Development</h4>
                        <p className='text-blue-200 text-sm'>React, Next.js, TypeScript</p>
                      </div>
                    </div>
                  </div>

                  <div className='bg-gradient-to-br from-green-500/10 to-green-600/20 rounded-xl p-6 backdrop-blur-sm border border-green-500/20 hover:border-green-400/40 transition-all duration-300 hover:scale-105'>
                    <div className='flex items-center space-x-4'>
                      <div className='w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center'>
                        <Server className='w-6 h-6 text-green-400' />
                      </div>
                      <div>
                        <h4 className='text-white font-semibold text-lg'>Backend Development</h4>
                        <p className='text-green-200 text-sm'>Node.js, Nest.js, Express.js</p>
                      </div>
                    </div>
                  </div>

                  <div className='bg-gradient-to-br from-purple-500/10 to-purple-600/20 rounded-xl p-6 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105'>
                    <div className='flex items-center space-x-4'>
                      <div className='w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center'>
                        <Database className='w-6 h-6 text-purple-400' />
                      </div>
                      <div>
                        <h4 className='text-white font-semibold text-lg'>Database Design</h4>
                        <p className='text-purple-200 text-sm'>RethinkDB, Redis, MariaDB</p>
                      </div>
                    </div>
                  </div>

                  <div className='bg-gradient-to-br from-orange-500/10 to-orange-600/20 rounded-xl p-6 backdrop-blur-sm border border-orange-500/20 hover:border-orange-400/40 transition-all duration-300 hover:scale-105'>
                    <div className='flex items-center space-x-4'>
                      <div className='w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center'>
                        <Cloud className='w-6 h-6 text-orange-400' />
                      </div>
                      <div>
                        <h4 className='text-white font-semibold text-lg'>DevOps & Cloud</h4>
                        <p className='text-orange-200 text-sm'>Docker, Kafka, gRPC</p>
                      </div>
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
                <Card key={project.title} className={`bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105 overflow-hidden group relative ${visibleSections.has('projects') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: `${index * 200}ms`}}>
                  <div className='relative overflow-hidden'>
                    <div className='w-full h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center relative'>{project.image && project.image !== '/api/placeholder/400/250' ? <Image src={project.image} alt={project.title} fill className='object-cover' /> : <Code2 className='w-16 h-16 text-blue-400' />}</div>
                    <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4'>
                      {project.isPrivate ? (
                        <Button size='sm' className='bg-red-600 hover:bg-red-700' onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}>
                          <Mail className='w-4 h-4 mr-2' />
                          Private
                        </Button>
                      ) : (
                        <>
                          <Button size='sm' className='bg-blue-600 hover:bg-blue-700' onClick={() => window.open(project.demo, '_blank')}>
                            <ExternalLink className='w-4 h-4 mr-2' />
                            Open
                          </Button>
                        </>
                      )}
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
                  <form onSubmit={handleFormSubmit} className='space-y-4'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-sm font-medium text-slate-300 mb-2'>First Name</label>
                        <input type='text' name='firstName' value={formData.firstName} onChange={handleFormChange} required className='w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' placeholder='John' />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-slate-300 mb-2'>Last Name</label>
                        <input type='text' name='lastName' value={formData.lastName} onChange={handleFormChange} required className='w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' placeholder='Doe' />
                      </div>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-slate-300 mb-2'>Email</label>
                      <input type='email' name='email' value={formData.email} onChange={handleFormChange} required className='w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' placeholder='john@example.com' />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-slate-300 mb-2'>Subject</label>
                      <input type='text' name='subject' value={formData.subject} onChange={handleFormChange} required className='w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' placeholder='Project Inquiry' />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-slate-300 mb-2'>Message</label>
                      <textarea rows={4} name='message' value={formData.message} onChange={handleFormChange} required className='w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none' placeholder='Tell me about your project...' />
                    </div>
                    <Button type='submit' disabled={isSubmitting} className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition-all duration-200 hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:hover:scale-100'>
                      <Send className='w-5 h-5 mr-2' />
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
