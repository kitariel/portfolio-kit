"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Download, Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { PortfolioSidebar } from "./portfolio-sidebar";
import { Modal } from "@/components/ui/modal";
import { navItems, profile } from "@/lib/portfolio-data";
import { getActiveSection } from "@/lib/portfolio-view";

export function PortfolioShell({ children }: { children: ReactNode }) {
  const [active, setActive] = useState("#overview");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const sections = navItems.map((item) => ({
        href: item.href,
        top:
          document.querySelector(item.href)?.getBoundingClientRect().top ??
          Infinity,
      }));
      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 4;
      setActive((current) => getActiveSection(sections, current, atBottom));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onHashChange = () => {
      if (navItems.some((item) => item.href === window.location.hash))
        setActive(window.location.hash);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("resize", onScroll);
    const media = window.matchMedia("(min-width: 1280px)");
    const closeOnDesktop = () => {
      if (media.matches) setMenuOpen(false);
    };
    media.addEventListener("change", closeOnDesktop);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("resize", onScroll);
      media.removeEventListener("change", closeOnDesktop);
    };
  }, []);

  const navigate = (href: string) => {
    setActive(href);
    setMenuOpen(false);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-3 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <aside
        aria-label="Portfolio sidebar"
        className="fixed inset-y-0 left-0 z-40 hidden w-60 overflow-y-auto border-r border-border bg-surface xl:block"
      >
        <PortfolioSidebar active={active} onNavigate={navigate} />
      </aside>
      <div className="min-w-0 xl:pl-60">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-surface px-4 sm:px-6 lg:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border xl:hidden"
            >
              <Menu aria-hidden className="h-[18px] w-[18px]" />
              <span className="sr-only">Open navigation</span>
            </button>
            <span className="hidden text-sm text-foreground-muted sm:inline">
              Portfolio <span className="px-3 text-border-strong">/</span>
            </span>
            <span className="truncate text-sm font-medium">
              {navItems.find((item) => item.href === active)?.label}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-lg border border-border px-3 text-xs font-medium transition-colors hover:bg-background"
            >
              <Download aria-hidden className="h-4 w-4" />
              Résumé<span className="sr-only"> (PDF, opens in a new tab)</span>
            </a>
          </div>
        </header>
        <div className="mx-auto max-w-[1760px] p-4 sm:p-6 lg:p-6">
          {children}
        </div>
      </div>
      <Modal
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        labelledBy="navigation-title"
        className="inset-y-0 left-0 right-auto m-0 h-dvh max-h-dvh w-[280px] max-w-[calc(100%-48px)] rounded-none border-y-0 border-l-0"
      >
        <div id="mobile-navigation" className="flex h-dvh flex-col">
          <div className="flex items-center justify-between border-b border-border px-6 py-3">
            <h2 id="navigation-title" className="text-sm font-medium">
              Navigation
            </h2>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-lg hover:bg-background"
              aria-label="Close navigation"
            >
              <X aria-hidden className="h-[18px] w-[18px]" />
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            <PortfolioSidebar active={active} onNavigate={navigate} />
          </div>
        </div>
      </Modal>
    </>
  );
}
