import SectionTitle from '@/src/components/SectionTitle';
import { MY_EXPERIENCE } from '@/src/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const slideUpEl = containerRef.current?.querySelectorAll('.slide-up');

      if (!slideUpEl?.length) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 100%',
          scrub: 0.5,
        },
      });

      tl.from('.slide-up', {
        opacity: 0,
        y: 40,
        ease: 'none',
        stagger: 0.4,
      });
    },
    { scope: containerRef },
  );

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 0%',
          end: 'bottom 0%',
          scrub: 0.5,
        },
      });

      tl.to('.slide-up', {
        opacity: 0,
        y: -20,
        ease: 'none',
        stagger: 0.4,
      });
    },
    { scope: containerRef },
  );

  return (
    <section id="experience" ref={containerRef} className=" min-h-screen">
      <SectionTitle title="My Experience" />

      <div className="space-y-12">
        {Object.entries(MY_EXPERIENCE).map(([key, value]) => (
          <div className="flex slide-up p-4 border rounded-xl border-accent backdrop-blur-md" key={key}>
            <div className="text-md sm:text-lg text-muted-foreground/90 space-y-2">
              <p>{value.company}</p>
              <h3 className="md:text-5xl sm:text-4xl text-3xl leading-none text-muted-foreground">{value.title}</h3>
              <p>{value.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
