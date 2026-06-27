'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Mail, MapPin, Phone, Send} from 'lucide-react';
import {cn} from '@/lib/utils';
import {useReveal} from '@/hooks/use-reveal';
import {useToast} from '@/hooks/use-toast';
import {SectionHeading} from '@/components/section-heading';

const initialForm = {firstName: '', lastName: '', email: '', subject: '', message: ''};

const inputClass =
  'w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-white placeholder-slate-500 transition-colors focus:border-violet-400/50 focus:outline-none focus:ring-1 focus:ring-violet-400/40';

const contactInfo = [
  {icon: Mail, label: 'Email', value: 'kityoubagares94@gmail.com'},
  {icon: Phone, label: 'Phone', value: '+63 945 427 8134'},
  {icon: MapPin, label: 'Location', value: 'Consolacion, Cebu, Philippines'},
];

export function Contact() {
  const {ref, shown} = useReveal();
  const {toast} = useToast();
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
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
        toast({title: 'Message sent', description: "Thanks! I'll get back to you shortly."});
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
    <section id="contact" className="relative px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Get in touch"
          title="Let's work together"
          subtitle="Hiring, collaborating, or just curious how AI-augmented delivery would work on your team? Send a note."
        />

        <div ref={ref} className={cn('mt-16 grid gap-10 lg:grid-cols-2', shown ? 'opacity-100' : 'opacity-0', 'transition-opacity duration-700')}>
          {/* Info */}
          <div className="space-y-8">
            <p className="text-base leading-relaxed text-slate-400">
              I&apos;m open to roles and projects where I can pair 5+ years of full-stack engineering with an AI-first
              workflow. If that sounds like your team, I&apos;d love to talk.
            </p>
            <div className="space-y-4">
              {contactInfo.map(({icon: Icon, label, value}) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-violet-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
                    <p className="text-slate-200">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="card-clean space-y-4 p-6 sm:p-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-slate-300">First name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className={inputClass} placeholder="Jane" />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">Last name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className={inputClass} placeholder="Doe" />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="jane@company.com" />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">Subject</label>
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className={inputClass} placeholder="Opportunity at ..." />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">Message</label>
              <textarea rows={4} name="message" value={formData.message} onChange={handleChange} required className={cn(inputClass, 'resize-none')} placeholder="Tell me about your team or project..." />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-violet-500 to-cyan-500 py-6 text-base font-medium text-white hover:opacity-95 disabled:opacity-60"
            >
              <Send className="mr-1 h-4 w-4" />
              {isSubmitting ? 'Sending...' : 'Send message'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
