'use client';

import {useState} from 'react';
import {Reveal} from '@/components/reveal';
import {SectionIntro} from '@/components/section-intro';
import {profile} from '@/lib/content';

const WEB3FORMS_ACCESS_KEY = '0f344545-267b-41d4-9a8e-ce56478c2f1c';

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: '',
};

type Status = 'idle' | 'sending' | 'success' | 'error';

const fieldClass =
  'w-full rounded-none border-b border-hairline-strong bg-transparent py-3 text-[1.0625rem] text-ink placeholder:text-quiet focus:border-signal focus:outline-none focus-visible:outline-none';

export function ContactSection() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const update = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((current) => ({...current, [event.target.name]: event.target.value}));
    if (status !== 'sending') setStatus('idle');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');
    setError('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });

      const result: {success?: boolean; message?: string} = await response
        .json()
        .catch(() => ({}));

      if (response.ok && result.success) {
        setStatus('success');
        setForm(initialForm);
        return;
      }

      setStatus('error');
      setError(result.message ?? 'The message could not be sent. Please try again.');
    } catch {
      setStatus('error');
      setError('Network error. Check your connection and try again.');
    }
  };

  const sending = status === 'sending';

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-canvas py-20 sm:py-24 lg:py-32"
    >
      <div className="shell">
        <SectionIntro
          index="06"
          label="Contact"
          title="Tell me what you're building."
          intro="Open to senior full-stack roles and to project work. I read everything that comes through."
          headingId="contact-heading"
        />

        <div className="mt-14 grid gap-12 sm:mt-16 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <dl className="reveal-fade">
              <div className="rule-t py-4">
                <dt className="label text-muted">Email</dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${profile.email}`}
                    data-rule="hidden"
                    className="link-rule text-[1.0625rem]"
                  >
                    {profile.email}
                  </a>
                </dd>
              </div>
              <div className="rule-t py-4">
                <dt className="label text-muted">Phone</dt>
                <dd className="mt-2">
                  <a
                    href={`tel:${profile.phone.replace(/\s/g, '')}`}
                    data-rule="hidden"
                    className="link-rule text-[1.0625rem]"
                  >
                    {profile.phone}
                  </a>
                </dd>
              </div>
              <div className="rule-t py-4">
                <dt className="label text-muted">Based in</dt>
                <dd className="mt-2 text-[1.0625rem]">{profile.city}</dd>
              </div>
              <div className="rule-t py-4">
                <dt className="label text-muted">Elsewhere</dt>
                <dd className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
                  {profile.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-rule="hidden"
                      className="link-rule text-[1.0625rem]"
                    >
                      {link.label}
                      <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </dd>
              </div>
            </dl>

            <a
              className="btn btn-secondary reveal-fade mt-8"
              href={profile.cv}
              download={profile.cvFileName}
              style={{transitionDelay: '120ms'}}
            >
              Download CV (PDF)
            </a>
          </Reveal>

          <Reveal className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="reveal-fade grid gap-7">
              <div className="grid gap-7 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="label text-muted">
                    First name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    value={form.firstName}
                    onChange={update}
                    className={`${fieldClass} mt-2`}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="label text-muted">
                    Last name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    value={form.lastName}
                    onChange={update}
                    className={`${fieldClass} mt-2`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="label text-muted">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={update}
                  className={`${fieldClass} mt-2`}
                />
              </div>

              <div>
                <label htmlFor="subject" className="label text-muted">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={form.subject}
                  onChange={update}
                  className={`${fieldClass} mt-2`}
                />
              </div>

              <div>
                <label htmlFor="message" className="label text-muted">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={update}
                  className={`${fieldClass} mt-2 resize-y`}
                />
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                <button type="submit" className="btn btn-primary" disabled={sending}>
                  {sending ? 'Sending…' : 'Send message'}
                </button>

                {/* Both states are announced; neither shifts the layout. */}
                <p
                  role="status"
                  aria-live="polite"
                  className="text-[0.9375rem] text-graphite"
                >
                  {status === 'success'
                    ? 'Message sent. I will reply to the address you gave.'
                    : ''}
                </p>
                {status === 'error' && (
                  <p role="alert" className="text-[0.9375rem] text-signal">
                    {error}
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
