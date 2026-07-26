import {profile} from '@/lib/content';

export function SiteFooter() {
  return (
    <footer className="on-ink bg-ink py-10 text-canvas sm:py-12">
      <div className="shell flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-lg tracking-tight">{profile.name}</p>
          <p className="label text-muted mt-2">
            {profile.role} · {profile.location}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:items-end">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a
              href={`mailto:${profile.email}`}
              data-rule="hidden"
              className="link-rule label"
            >
              Email
            </a>
            {profile.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                data-rule="hidden"
                className="link-rule label"
              >
                {link.label}
              </a>
            ))}
            <a href="#top" data-rule="hidden" className="link-rule label">
              Back to top
            </a>
          </div>
          <p className="label text-muted">
            © {new Date().getFullYear()} — Built and shipped by hand
          </p>
        </div>
      </div>
    </footer>
  );
}
