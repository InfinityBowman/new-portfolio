import React from 'react';
import Hero from '@/src/components/Hero';
import Skills from '@/src/components/Skills';
import Experience from '@/src/components/Experience';
import Education from '@/src/components/Education';
import Projects from '@/src/components/Projects';
import About from '@/src/components/About';
import Contact from '@/src/components/Contact';

export default function Home() {
  return (
    <div className="space-y-60 mx-8 sm:mr-16">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Projects />
      <Contact />
    </div>
  );
}
