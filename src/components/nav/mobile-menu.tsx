import React, { useState, useEffect } from 'react';
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [pathname, setPathname] = useState(window.location.pathname);

  // Update pathname when location changes
  useEffect(() => {
    const handleLocationChange = () => {
      setPathname(window.location.pathname);
    };

    // Listen for popstate events (when user navigates with browser buttons)
    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 top-12 bg-background transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div
        className={`flex w-screen bg-background rounded-xl shadow-lg transform transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col py-4 space-y-2">
          {pathname === '/kontakt-guide' && (
            <a
              href="/kontakt-guide"
              className={`block px-4 py-2 rounded-md text-lg font-medium duration-300 bg-background text-primary hover:bg-primary-foreground`}
              onClick={onClose}
            >
              Kontakt Guide
            </a>
          )}
          {pathname !== '/kontakt-guide' && (
            <>
              <a
                href="/about"
                className={`block px-4 py-2 rounded-md text-lg font-medium duration-300 bg-background text-primary hover:bg-primary-foreground`}
                onClick={onClose}
              >
                About Me
              </a>
              <a
                href="/hobbies"
                className={`block px-4 py-2 rounded-md text-lg font-medium duration-300 bg-background text-primary hover:bg-primary-foreground`}
                onClick={onClose}
              >
                Hobbies
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
