"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { useToast } from "@/hooks/use-toast";
import { profile } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
};

const inputClass =
  "min-h-11 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted transition-colors focus:border-accent";

const links = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "Kit Mikhael Bagares",
    href: profile.linkedin,
    icon: Linkedin,
    external: true,
  },
  {
    label: "GitHub",
    value: "kitariel",
    href: profile.github,
    icon: Github,
    external: true,
  },
];

export function ContactCta() {
  const { toast } = useToast();
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "0f344545-267b-41d4-9a8e-ce56478c2f1c",
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });
      const result = await response.json();
      if (result.success) {
        toast({
          title: "Message sent",
          description: "Thanks — I'll get back to you shortly.",
        });
        setFormData(initialForm);
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again in a moment.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Network error",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="panel">
      <div>
        <SectionHeading
          title={<span id="contact-heading">Let’s build something useful</span>}
          subtitle="A product to build, a platform to improve, or a team to grow — I’d like to hear about it."
        />

        <div className="grid gap-8 p-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:p-6">
          <div>
            <ul className="divide-y divide-border border-y border-border">
              {links.map(({ label, value, href, icon: Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex min-h-[72px] items-center gap-4 py-5 transition-colors hover:text-accent"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center text-foreground-muted">
                      <Icon aria-hidden className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="eyebrow block text-foreground-muted">
                        {label}
                      </span>
                      <span className="mt-1 block break-all text-sm text-foreground">
                        {value}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="h-4 w-4 shrink-0 text-foreground-muted"
                    />
                    {external && (
                      <span className="sr-only">(opens in a new tab)</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button asChild variant="outline">
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-2 block text-sm text-foreground"
                >
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
                <label
                  htmlFor="lastName"
                  className="mb-2 block text-sm text-foreground"
                >
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
              <label
                htmlFor="email"
                className="mb-2 block text-sm text-foreground"
              >
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
              <label
                htmlFor="subject"
                className="mb-2 block text-sm text-foreground"
              >
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
              <label
                htmlFor="message"
                className="mb-2 block text-sm text-foreground"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className={cn(inputClass, "min-h-32 resize-y")}
                placeholder="Tell me about the project or role"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="h-12 w-full rounded-lg shadow-none"
            >
              <Send aria-hidden className="h-4 w-4" />
              {isSubmitting ? "Sending…" : "Send message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
