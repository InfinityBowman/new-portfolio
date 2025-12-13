import SectionTitle from '@/src/components/SectionTitle';
import SOCIAL_LINKS from '@/src/lib/socials';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useRef } from 'react';
import { FaEnvelope } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Contact() {
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
        stagger: 0.3,
      });
    },
    { scope: containerRef },
  );

  return (
    <section id="contact" ref={containerRef} className="min-h-[50vh] flex flex-col justify-center">
      <SectionTitle title="Get In Touch" />

      <div className="slide-up p-6 border rounded-xl border-accent backdrop-blur-md text-center space-y-6">
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          I'm always open to new opportunities, collaborations, or just a friendly chat about tech. Feel free to reach out!
        </p>

        <div className="flex justify-center gap-4 flex-wrap slide-up">
          <a
            href="mailto:jacobmaynard03@gmail.com"
            className="group flex items-center gap-2 border border-muted p-3 px-5 text-primary bg-background rounded-lg hover:bg-secondary hover:border-primary transition-colors"
          >
            <FaEnvelope size={20} />
            <span className="text-secondary-foreground group-hover:text-primary transition-colors">Email Me</span>
          </a>

          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 border border-muted p-3 px-5 text-primary bg-background rounded-lg hover:bg-secondary hover:border-primary transition-colors"
              aria-label={link.label}
            >
              {link.icon}
              <span className="text-secondary-foreground group-hover:text-primary transition-colors">{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
