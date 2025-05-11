import SectionTitle from '@/src/components/SectionTitle';
import { MY_EXPERIENCE } from '@/lib/data';
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
          end: 'bottom 80%',
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
          start: 'bottom 50%',
          end: 'bottom 10%',
          scrub: 1,
        },
      });

      tl.to(containerRef.current, {
        y: -150,
        opacity: 0,
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      id="my-stack"
      ref={containerRef}
      className=" min-h-screen"
    >
      <SectionTitle title="My Experience" />

      <div className="space-y-20">
        {Object.entries(MY_EXPERIENCE).map(([key, value]) => (
          <div
            className="flex rounded-lg border"
            key={key}
          >
            <div className="slide-up text-lg text-muted-foreground/80 space-y-2 [& p]:text-red">
              <p>{value.company}</p>
              <h3 className=" text-5xl leading-none text-muted-foreground uppercase">{value.title}</h3>
              <p>{value.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
