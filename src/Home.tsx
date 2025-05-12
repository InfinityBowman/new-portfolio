import React from 'react';
import Hero from '@/src/components/Hero';
import Skills from '@/src/components/Skills';
import Experience from '@/src/components/Experience';
import Projects from '@/src/components/Projects';

export default function Home() {
  return (
    <div className="space-y-20 mx-8 mr-16">
      <Hero />
      <Skills />
      <Experience />
      <Projects />
    </div>
  );
}
