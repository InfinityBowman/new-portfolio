import SectionTitle from '@/src/components/SectionTitle';
import { MY_EXPERIENCE } from '@/src/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useMemo, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const hasDetails = useMemo(() => MY_EXPERIENCE.map((item) => Boolean(item.highlights?.length || item.tech?.length)), []);

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
    <section id="experience" ref={containerRef} className="min-h-screen">
      <SectionTitle title="My Experience" />

      <div className="space-y-12">
        {MY_EXPERIENCE.map((value, index) => {
          const isOpen = openIndex === index;
          const panelId = `experience-panel-${index}`;
          const buttonId = `experience-button-${index}`;
          const canExpand = hasDetails[index];

          const content = (
            <>
              <div className="flex items-start justify-between gap-6">
                <div className="text-md sm:text-lg text-muted-foreground/90 space-y-2">
                  <p>{value.company}</p>
                  <h3 className="md:text-5xl sm:text-4xl text-3xl leading-none text-muted-foreground">{value.title}</h3>
                  <p>{value.duration}</p>
                </div>

                {canExpand ? (
                  <span className="shrink-0 pt-1 text-muted-foreground/90" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                ) : null}
              </div>

              {canExpand ? (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <div className="pt-4">
                      {value.highlights?.length ? (
                        <ul className="space-y-2 text-muted-foreground/90">
                          {value.highlights.map((item) => (
                            <li key={item} className="text-md sm:text-lg">
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      {value.tech?.length ? (
                        <div className={`${value.highlights?.length ? 'mt-4' : ''} text-muted-foreground/90`}>
                          <p className="text-sm sm:text-base">Tech</p>
                          <p className="text-md sm:text-lg">{value.tech.join(' • ')}</p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null}
            </>
          );

          return (
            <React.Fragment key={`${value.company}-${index}`}>
              {canExpand ? (
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex((prev) => (prev === index ? null : index))}
                  className="slide-up w-full p-4 border rounded-xl border-accent backdrop-blur-md text-left"
                >
                  {content}
                </button>
              ) : (
                <div className="slide-up p-4 border rounded-xl border-accent backdrop-blur-md">{content}</div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}
