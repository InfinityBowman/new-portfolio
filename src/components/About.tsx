import SectionTitle from '@/src/components/SectionTitle';
import { ABOUT } from '@/src/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useRef } from 'react';
import SOCIAL_LINKS from '@/src/lib/socials';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  const startTransition = (update: () => void) => {
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      // eslint-disable-next-line no-undef
      document.startViewTransition(() => update());
      return;
    }
    update();
  };

  useGSAP(
    () => {
      const slideOverEl = containerRef.current?.querySelectorAll('.slide-over');

      if (!slideOverEl?.length) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'top 30%',
          scrub: 1,
        },
      });

      tl.from('.slide-over', {
        opacity: 0,
        x: -300,
        ease: 'none',
        stagger: 0.2,
      });

      tl.from('.slide-in', { opacity: 0, x: 200 });
      tl.from('.pop-in', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          end: 'top 30%',
          scrub: 1,
        },
        scale: 0,
        opacity: 0,
        y: 50,
        stagger: 0.3,
      });
    },
    { scope: containerRef },
  );

  useGSAP(
    () => {
      const revealLineEl = containerRef.current?.querySelectorAll('.reveal-line');

      if (!revealLineEl?.length) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 90%',
          end: 'top 30%',
          scrub: 0.5,
        },
      });

      tl.to('.reveal-line', {
        x: 0,
        ease: 'power2.out',
      });
    },
    { scope: containerRef },
  );

  return (
    <section id="about" ref={containerRef} className="min-h-screen">
      <SectionTitle title="whoami" />

      <div className="sm:space-y-10 space-y-6">
        <div className="overflow-hidden mx-2">
          <hr className="text-secondary-foreground/70 transform -translate-x-full reveal-line" />
        </div>
        <div className="grid md:grid-cols-12 gap-y-6 sm:gap-y-9 gap-x-16 flex-wrap">
          <h3 className="sm:col-span-5 slide-over text-4xl sm:text-5xl whitespace-nowrap">{ABOUT.title}</h3>
          <p className="sm:col-span-7 slide-in text-md sm:mr-2 sm:text-xl text-muted-foreground">{ABOUT.description}</p>
        </div>
        <div className="flex sm:gap-4 gap-2 flex-wrap">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link.className} group flex items-center gap-2 border border-muted p-1.5 px-2 text-primary bg-background rounded-lg hover:bg-secondary focus:border-primary pop-in`}
              aria-label={link.label}
            >
              <span className="text-secondary-foreground group-hover:text-primary transition-colors">{link.label}</span>

              {link.icon}
            </a>
          ))}
          <a
            href="/blog"
            className={` group flex items-center gap-2 border border-muted p-1.5 px-2 text-primary bg-background rounded-lg hover:bg-secondary focus:border-primary pop-in`}
            aria-label="Blog"
            onClick={(e) => {
              e.preventDefault();
              startTransition(() => {
                window.history.pushState({}, '', '/blog');
                window.dispatchEvent(new Event('pushstate'));
              });
            }}
          >
            <span className="text-secondary-foreground group-hover:text-primary transition-colors">My Blog</span>
          </a>
        </div>
      </div>
    </section>
  );
}
