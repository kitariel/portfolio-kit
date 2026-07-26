import {SiteHeader} from '@/components/site-header';
import {HeroSequence} from '@/components/hero-sequence';
import {SelectedWork} from '@/components/selected-work';
import {FurtherWork} from '@/components/further-work';
import {HowIWork} from '@/components/how-i-work';
import {ExperienceSection} from '@/components/experience-section';
import {Capabilities} from '@/components/capabilities';
import {ContactSection} from '@/components/contact-section';
import {SiteFooter} from '@/components/site-footer';

export default function Home() {
  return (
    <>
      <a
        href="#work"
        className="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-3 focus:text-canvas"
      >
        Skip to selected work
      </a>

      <SiteHeader />

      <main id="main">
        <HeroSequence />
        <SelectedWork />
        <FurtherWork />
        <HowIWork />
        <ExperienceSection />
        <Capabilities />
        <ContactSection />
      </main>

      <SiteFooter />
    </>
  );
}
