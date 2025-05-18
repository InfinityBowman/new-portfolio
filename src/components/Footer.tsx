import React from 'react';
import SOCIAL_LINKS from '@/src/lib/socials';

export default function Footer() {
  return (
    <footer className="relative z-10 w-full flex bg-background items-center justify-center border-t border-accent mx-auto text-center text-xs gap-8 py-3">
      <div className="text-left">
        <p>© {new Date().getFullYear()} Jacob Maynard </p>
      </div>
      <div className="flex justify-center gap-4">
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={link.className}
            aria-label={link.label}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </footer>
  );
}
