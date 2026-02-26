import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SOCIAL_LINKS from '@/src/lib/socials';

interface NavMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NavMenu({ isOpen, onClose }: NavMenuProps) {
  const [activeSection, setActiveSection] = useState(
    window.location.pathname.startsWith('/blog') ? 'blog'
    : window.location.pathname.startsWith('/digest') ? 'digest'
    : 'hero',
  );

  const menuItems = [
    { href: '/#hero', label: 'Home', id: 'hero' },
    { href: '/#about', label: 'About', id: 'about' },
    { href: '/#skills', label: 'Skills', id: 'skills' },
    { href: '/#experience', label: 'Experience', id: 'experience' },
    { href: '/#education', label: 'Education', id: 'education' },
    { href: '/#projects', label: 'Projects', id: 'projects' },
    { href: '/#contact', label: 'Contact', id: 'contact' },
    { href: '/blog', label: 'Blog', id: 'blog' },
    { href: '/digest', label: 'Digest', id: 'digest' },
  ];

  // Update active section when route changes
  useEffect(() => {
    const handleLocationChange = () => {
      if (window.location.pathname.startsWith('/blog')) {
        setActiveSection('blog');
      } else if (window.location.pathname.startsWith('/digest')) {
        setActiveSection('digest');
      } else if (window.location.pathname === '/') {
        // When on home page, determine active section from scroll or default to hero
        const heroElement = document.getElementById('hero');
        if (heroElement) {
          const scrollPosition = window.scrollY + 200;
          const sections = menuItems.map((item) => item.id);

          for (const section of sections) {
            if (section === 'blog') continue; // Skip blog, it's not on home page
            const element = document.getElementById(section);
            if (!element) continue;

            const rect = element.getBoundingClientRect();
            const topPosition = rect.top + window.scrollY;
            const bottomPosition = topPosition + rect.height;

            if (scrollPosition >= topPosition && scrollPosition < bottomPosition) {
              setActiveSection(section);
              return;
            }
          }
          setActiveSection('hero');
        } else {
          setActiveSection('hero');
        }
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('pushstate', handleLocationChange);
    handleLocationChange(); // Initial check

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('pushstate', handleLocationChange);
    };
  }, []);

  // Update active section based on scroll position (only on home page)
  useEffect(() => {
    const handleScroll = () => {
      // Only update on home page
      if (window.location.pathname !== '/') return;

      const sections = menuItems.map((item) => item.id);
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        if (section === 'blog') continue; // Skip blog, it's not on home page
        const element = document.getElementById(section);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        const topPosition = rect.top + window.scrollY;
        const bottomPosition = topPosition + rect.height;

        if (scrollPosition >= topPosition && scrollPosition < bottomPosition) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const startTransition = (update: () => void) => {
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      // eslint-disable-next-line no-undef
      document.startViewTransition(() => update());
      return;
    }
    update();
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    if (href.startsWith('/blog')) {
      startTransition(() => {
        window.history.pushState({}, '', '/blog');
        window.dispatchEvent(new Event('pushstate'));
        setActiveSection('blog');
        onClose();
      });
      return;
    }

    if (href.startsWith('/digest')) {
      startTransition(() => {
        window.history.pushState({}, '', '/digest');
        window.dispatchEvent(new Event('pushstate'));
        setActiveSection('digest');
        onClose();
      });
      return;
    }

    const targetId = href.substring(2);
    const targetElement = document.getElementById(targetId);

    if (window.location.pathname !== '/') {
      // Navigate to home, then scroll after navigation
      startTransition(() => {
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new Event('pushstate'));
        setActiveSection(targetId);
        // Wait for the page to update, then scroll
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 50);
        onClose();
      });
    } else if (targetElement) {
      setActiveSection(targetId);
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth',
      });
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div className="fixed inset-0 z-40" onClick={onClose} />

          {/* Menu panel */}
          <motion.div
            className="fixed top-0 right-0 h-screen w-80 sm:w-96
                    bg-secondary shadow-lg z-41 overflow-y-auto
                    border-l border-accent flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 40,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Menu items */}
            <nav className="flex-1 flex items-center">
              <ul className="space-y-4 w-full p-6">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.1 + index * 0.1,
                      duration: 0.3,
                    }}
                  >
                    <a
                      href={item.href}
                      className={`block px-4 py-3 rounded-lg text-lg font-medium transition-all duration-400
                        ${
                          activeSection === item.id ?
                            'border-accent border text-primary hover:bg-background/70'
                          : 'border border-transparent text-muted-foreground hover:text-primary hover:bg-background/70'
                        }`}
                      onClick={(e) => handleAnchorClick(e, item.href)}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Footer section */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 py-3 border-t border-accent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
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
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
