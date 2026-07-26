'use client';

import {useState, useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {Menu, X} from 'lucide-react';
import {cn} from '@/lib/utils';

const navItems = [
  {name: 'Skills', href: '#skills'},
  {name: 'Workflow', href: '#workflow'},
  {name: 'Impact', href: '#impact'},
  {name: 'Projects', href: '#projects'},
  {name: 'Experience', href: '#experience'},
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the drawer on Escape, and stop the page scrolling behind it.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsMobileMenuOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          isScrolled ? 'border-b border-grounds bg-roast/80 backdrop-blur-xl' : 'border-b border-transparent'
        )}
      >
        <div className='mx-auto max-w-7xl px-6'>
          <div className='flex h-16 items-center justify-between'>
            <a
              href='#home'
              className='font-jetbrains text-lg font-semibold text-cream transition-colors hover:text-ember'
            >
              kit<span className='text-ember'>.dev</span>
            </a>

            <nav className='hidden items-center gap-8 md:flex'>
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className='text-sm font-medium text-cream-muted transition-colors hover:text-cream'
                >
                  {item.name}
                </a>
              ))}
            </nav>

            <div className='hidden md:flex'>
              <Button asChild className='bg-ember px-5 text-roast hover:bg-ember-soft'>
                <a href='#contact'>Let&apos;s talk</a>
              </Button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='p-2 text-cream-muted transition-colors hover:text-cream md:hidden'
              aria-label='Toggle menu'
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className='fixed inset-0 z-40 md:hidden'>
          <div className='fixed inset-0 bg-roast/80 backdrop-blur-sm' onClick={() => setIsMobileMenuOpen(false)} />
          <div className='fixed inset-x-0 top-16 border-b border-grounds bg-roast/95 backdrop-blur-xl'>
            <nav className='mx-auto max-w-7xl px-6 py-6'>
              <div className='flex flex-col gap-1'>
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className='rounded-lg px-2 py-2.5 text-left text-base text-cream-muted transition-colors hover:bg-crema/5 hover:text-cream'
                  >
                    {item.name}
                  </a>
                ))}
                <Button asChild className='mt-3 w-full bg-ember py-3 text-roast hover:bg-ember-soft'>
                  <a href='#contact' onClick={() => setIsMobileMenuOpen(false)}>
                    Let&apos;s talk
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
