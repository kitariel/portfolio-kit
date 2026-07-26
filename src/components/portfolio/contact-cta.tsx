'use client';

import {useState} from 'react';
import {ArrowUpRight, Download, Github, Linkedin, Mail, MapPin, Send} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {SectionHeading} from '@/components/portfolio/section-heading';
import {useReveal} from '@/hooks/use-reveal';
import {useToast} from '@/hooks/use-toast';
import {profile} from '@/lib/portfolio-data';
import {cn} from '@/lib/utils';

const initialForm = {firstName: '', lastName: '', email: '', subject: '', message: ''};

const inputClass =
  'w-full rounded-md border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground-muted transition-colors focus:border-border-strong focus:outline-none focus-visible:outline-2';

const links = [
  {label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: Mail},
  {label: 'LinkedIn', value: 'Kit Mikhael Bagares', href: profile.linkedin, icon: Linkedin, external: true},
  {label: 'GitHub', value: 'kitariel', href: profile.github, icon: Github, external: true},
];

export function ContactCta() {
  const {ref, shown} = useReveal({threshold: 0.08});
  const {toast} = useToast();
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({...formData, [event.target.name]: event.target.value});
  };

  const handleSubmit = async (event: React.FormEvent) => {
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
        toast({title: 'Message sent', description: "Thanks — I'll get back to you shortly."});
        setFormData(initialForm);
      } else {
        toast({title: 'Something went wrong', description: 'Please try again in a moment.', variant: 'destructive'});
      }
    } catch {
      toast({title: 'Network error', description: 'Please try again in a moment.', variant: 'destructive'});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="08 — Contact"
          title={<span id="contact-heading">Have an idea? Let&rsquo;s turn it into something real.</span>}
          subtitle="Tell me what you are building, what is blocking you, or what you want to improve."
        />

        <div ref={ref} className={cn('mt-14 grid gap-10 transition-opacity duration-700 sm:mt-16 lg:grid-cols-2 lg:gap-14', shown ? 'opacity-100' : 'opacity-0')}>
          <div>
            <ul className="space-y-3">
              {links.map(({label, value, href, icon: Icon, external}) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
                    className="panel panel-interactive group flex items-center gap-4 p-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-accent">
                      <Icon aria-hidden className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="eyebrow block text-foreground-muted">{label}</span>
                      <span className="mt-1 block truncate text-sm text-foreground">{value}</span>
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="h-4 w-4 shrink-0 text-foreground-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                    {external && <span className="sr-only">(opens in a new tab)</span>}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button asChild variant="outline">
                <a href={profile.resume} target="_blank" rel="noopener noreferrer">
                  <Download aria-hidden className="h-4 w-4" />
                  Download résumé
                </a>
              </Button>
              <span className="inline-flex items-center gap-2 text-sm text-foreground-muted">
                <MapPin aria-hidden className="h-4 w-4" />
                {profile.location}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="panel space-y-4 p-6 sm:p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="mb-2 block text-sm text-foreground">
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  autoComplete="given-name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="mb-2 block text-sm text-foreground">
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm text-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="subject" className="mb-2 block text-sm text-foreground">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm text-foreground">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className={cn(inputClass, 'resize-none')}
                placeholder="What are you building, and what is in the way?"
              />
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              <Send aria-hidden className="h-4 w-4" />
              {isSubmitting ? 'Sending…' : 'Send message'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
