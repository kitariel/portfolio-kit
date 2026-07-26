'use client';

import {useEffect, useRef, useState} from 'react';
import {Menu, X} from 'lucide-react';
import {navItems, profile} from '@/lib/portfolio-data';
import {cn} from '@/lib/utils';

export function PortfolioNavigation() {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* The bar stays quiet over the footage and firms up once the page begins. */
  useEffect(() => {
    let queued = false;
    const update = () => {
      queued = false;
      setSolid(window.scrollY > window.innerHeight * 0.6);
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Escape closes the mobile menu and returns focus to its trigger. */
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <a
        href="#workflow"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-surface-elevated focus:px-4 focus:py-2 focus:text-sm focus:text-foreground"
      >
        Skip to content
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
          solid || menuOpen
            ? 'border-b border-border bg-surface-glass backdrop-blur-md'
            : 'border-b border-transparent'
        )}
      >
        <nav aria-label="Primary" className="mx-auto max-w-6xl px-6">
          <div className="flex h-16 items-center justify-between gap-4">
            <a
              href="#intro"
              className="font-display text-sm font-medium tracking-tight text-foreground transition-opacity hover:opacity-80"
            >
              {profile.name}
            </a>

            <ul className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="-mr-2 p-2 text-foreground-muted transition-colors hover:text-foreground md:hidden"
            >
              {menuOpen ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
              <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
            </button>
          </div>

          <div
            id="mobile-menu"
            hidden={!menuOpen}
            className="border-t border-border pb-5 pt-4 md:hidden"
          >
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-md px-2 py-3 text-base text-foreground-muted transition-colors hover:bg-surface-elevated hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}
