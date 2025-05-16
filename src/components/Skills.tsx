import SectionTitle from '@/src/components/SectionTitle';
import { MY_STACK } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Skills() {
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
      id="skills"
      ref={containerRef}
      className=" min-h-screen"
    >
      <SectionTitle title="My Stack" />

      <div className="space-y-20">
        {Object.entries(MY_STACK).map(([key, value]) => (
          <div
            className="grid md:grid-cols-12"
            key={key}
          >
            <div className="sm:col-span-5">
              <h3 className="slide-up text-5xl leading-none text-muted-foreground uppercase mb-4">{key}</h3>
            </div>

            <div className="sm:col-span-7 flex gap-x-11 gap-y-9 flex-wrap">
              {value.map((item) => (
                <div
                  className="slide-up flex gap-2 sm:gap-3.5 items-center leading-none"
                  key={item.name}
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10">
                    <img
                      src={item.icon}
                      alt={item.name + ' icon'}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-xl sm:text-2xl capitalize">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
