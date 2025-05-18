import React from 'react';
import Hero from '@/src/components/Hero';
import Skills from '@/src/components/Skills';
import Experience from '@/src/components/Experience';
import Projects from '@/src/components/Projects';
import About from '@/src/components/About';

export default function Home() {
  return (
    <div className="space-y-20 mx-8 sm:mr-16">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
    </div>
  );
}
