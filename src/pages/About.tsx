import React from 'react';
import AboutMe from '@/src/components/about/AboutMe';
import Projects from '@/src/components/about/Projects';
import SectionTitle from '@/src/components/SectionTitle';

export default function AboutPage() {
  return (
    <section className="min-h-screen">
      <div className="">
        <SectionTitle title="My Experience" />
        <div className="flex flex-col items-center mb-4 gap-2 ">
          <AboutMe />
          <Projects />
        </div>
      </div>
    </section>
  );
}
