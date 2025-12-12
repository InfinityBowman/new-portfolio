import SectionTitle from '@/src/components/SectionTitle';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { MY_PROJECTS } from '@/src/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const slideUpEl = containerRef.current?.querySelectorAll('.slide-up');

      if (!slideUpEl?.length) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 100%',
          end: 'bottom 95%',
          scrub: 0.5,
        },
      });

      tl.from('.slide-up', {
        opacity: 0,
        y: 60,
        ease: 'power1.inOut',
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
          end: 'bottom 5%',
          scrub: 0.5,
        },
      });

      tl.to('.slide-up', {
        opacity: 0,
        y: -50,
        ease: 'power1.inOut',
        stagger: 0.4,
      });
    },
    { scope: containerRef },
  );

  return (
    <section id="projects" ref={containerRef} className="min-h-screen mb-10">
      <SectionTitle title="My Projects" />

      <div className="space-y-8">
        {Object.entries(MY_PROJECTS).map(([key, project]) => (
          <div
            className="flex slide-up flex-col sm:flex-row p-4 border justify-between rounded-xl border-accent backdrop-blur-xs bg-background/60 gap-4"
            key={key}
          >
            <div className="text-sm sm:text-md text-muted-foreground/95 space-y-4 space-x-2">
              <h3 className="md:text-3xl sm:text-2xl text-1xl leading-none text-muted-foreground">{project.title}</h3>
              <hr className="relative bottom-1 w-10 h-0.5 bg-muted border-0 my-2" />
              <p className="max-w-[60ch] mb-6">{project.description}</p>

              <a
                href={project.refUrl}
                target="_blank"
                className="inline-flex items-center gap-2 border border-muted p-2 text-primary bg-background rounded-lg hover:bg-secondary focus:border-primary"
              >
                <span>{project.source}</span>
                <FaExternalLinkAlt />
              </a>
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  className="inline-flex items-center gap-2 border border-muted p-2 text-primary bg-background rounded-lg hover:bg-secondary focus:border-primary"
                >
                  <span>Website</span>
                  <FaExternalLinkAlt />
                </a>
              ) : null}
              {project.readMore && (
                <button
                  className="inline-flex items-center gap-2 border border-muted p-2 text-primary bg-background rounded-lg hover:bg-secondary focus:border-primary"
                  onClick={() => {
                    window.history.pushState({}, '', project.readMore);
                    window.dispatchEvent(new Event('pushstate'));
                  }}
                >
                  Read More
                </button>
              )}
            </div>
            {project.isVideo ? (
              <div className="flex flex-1 justify-center">
                <video
                  className="rounded-lg border border-white/30 md:max-w-lg sm:max-w-sm h-auto max-h-[400px] object-contain bg-black/20"
                  src={project.media}
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label={`Demo video for ${project.title}`}
                ></video>
              </div>
            ) : (
              <div className="m-auto">
                <img
                  className="rounded-lg border border-white/30 lg:max-w-lg md:max-w-md sm:max-w-xs h-auto max-h-[400px] object-contain bg-black/20"
                  src={project.media}
                  alt={project.title + ' image'}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
