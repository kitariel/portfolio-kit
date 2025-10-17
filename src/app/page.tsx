import Hero from './component/Hero';
import AboutSection from './component/AboutSection';
import PortfolioShowcase from './component/PortfolioShowcase';

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <PortfolioShowcase />
    </main>
  );
}
