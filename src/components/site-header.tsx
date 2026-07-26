'use client';

import {useEffect, useRef, useState} from 'react';
import {navItems, profile} from '@/lib/content';

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape closes the menu and hands focus back to the toggle.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMenuOpen(false);
      toggleRef.current?.focus();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen ? 'rule-b bg-canvas' : 'border-b border-transparent'
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-6 lg:h-20">
        <a
          href="#top"
          className="text-[0.9375rem] font-medium tracking-tight text-ink sm:text-base"
        >
          {profile.name}
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-rule="hidden"
              className="link-rule label text-graphite"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={profile.cv}
          download={profile.cvFileName}
          className="label hidden border border-hairline-strong px-4 py-2.5 text-ink transition-colors duration-300 hover:bg-ink hover:text-canvas lg:inline-flex"
        >
          Download CV
        </a>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className="label -mr-1 px-1 py-2 text-ink lg:hidden"
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Sections"
          className="rule-t bg-canvas lg:hidden"
        >
          <div className="shell flex flex-col py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rule-t py-4 text-xl tracking-tight first:border-t-0"
              >
                {item.label}
              </a>
            ))}
            <a
              href={profile.cv}
              download={profile.cvFileName}
              onClick={() => setMenuOpen(false)}
              className="rule-t py-4 text-xl tracking-tight text-signal"
            >
              Download CV
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
