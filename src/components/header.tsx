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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({behavior: 'smooth'});
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          isScrolled ? 'border-b border-white/10 bg-[#0b0e1a]/80 backdrop-blur-md' : 'border-b border-transparent'
        )}
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex h-16 items-center justify-between">
            <button onClick={() => scrollToSection('#home')} className="font-jetbrains text-lg font-semibold text-white transition-colors hover:text-violet-300">
              kit<span className="text-violet-400">.dev</span>
            </button>

            <nav className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
                >
                  {item.name}
                </button>
              ))}
            </nav>

            <div className="hidden md:flex">
              <Button
                onClick={() => scrollToSection('#contact')}
                className="bg-gradient-to-r from-violet-500 to-cyan-500 px-5 text-white hover:opacity-95"
              >
                Let&apos;s talk
              </Button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-300 transition-colors hover:text-white md:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed inset-x-0 top-16 border-b border-white/10 bg-[#0b0e1a]/95 backdrop-blur-md">
            <nav className="mx-auto max-w-6xl px-6 py-6">
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="rounded-lg px-2 py-2.5 text-left text-base text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {item.name}
                  </button>
                ))}
                <Button
                  onClick={() => scrollToSection('#contact')}
                  className="mt-3 w-full bg-gradient-to-r from-violet-500 to-cyan-500 py-3 text-white"
                >
                  Let&apos;s talk
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
