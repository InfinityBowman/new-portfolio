import React from 'react';
import Hero from '@/src/components/hero/Hero';
import Skills from '@/src/components/Skills';
import AboutPage from '@/src/pages/About';
import Experience from '@/src/components/Experience';

export default function HomePage() {
  return (
    <div className="space-y-20 mx-8 mr-16">
      <Hero />
      <Skills />
      <Experience />
      <AboutPage />
    </div>
  );
}
