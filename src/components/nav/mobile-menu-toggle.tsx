import { useState } from 'react';
import MobileMenu from './mobile-menu';
import type { ReactNode } from 'react';

export default function MobileMenuToggle() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleMenuClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={handleMenuToggle}
        className="inline-flex items-center justify-center p-2 rounded-md"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        type="button"
      >
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <line
            x1="4"
            y1="6"
            x2="20"
            y2="6"
            className={`transition-transform duration-300 ${
              isOpen ? 'transform rotate-45 translate-y-[-0.02rem] translate-x-[0.55rem]' : ''
            }`}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="4"
            y1="12"
            x2="20"
            y2="12"
            className={`transition duration-300 ${isOpen ? 'translate-x-7 opacity-25' : ''}`}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="4"
            y1="18"
            x2="20"
            y2="18"
            className={`transition-transform duration-300 ${
              isOpen ? 'transform -rotate-45 translate-y-[0.51rem] -translate-x-[0.51rem]' : ''
            }`}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <MobileMenu
        isOpen={isOpen}
        onClose={handleMenuClose}
      >
      </MobileMenu>
    </>
  );
}
