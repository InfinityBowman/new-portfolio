import React, { useState } from 'react';
import Hero from '@/src/components/hero/Hero';
import Skills from '@/src/components/Skills';
import AboutPage from '@/src/pages/About';
import Footer from '@/src/components/Footer';
import NavMenuToggle from '@/src/components/nav/NavMenuToggle';
import NavMenu from '@/src/components/nav/NavMenu';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <NavMenuToggle
        onToggle={handleMenuToggle}
        isOpen={isMenuOpen}
      />
      <NavMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
      <Hero />
      <Skills />
      <AboutPage />
      <Footer />
    </>
  );
}
