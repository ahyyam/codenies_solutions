
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Contact from '@/components/Contact';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <Contact />
        <footer className="bg-secondary py-6 text-center text-secondary-foreground">
            <p className="text-sm">
                © {new Date().getFullYear()} Codenies Solutions. All rights reserved.
            </p>
        </footer>
    </>
  );
}

