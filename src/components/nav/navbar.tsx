import { ReactNode, useState, useEffect } from 'react';
import NavMenuToggle from './NavMenuToggle';

const NAVIGATION_LINKS = [
  { href: '/about', label: 'About Me' },
  // { href: '/hobbies', label: 'Hobbies' },
];

export default function NavBar() {
  const [pathname, setPathname] = useState(window.location.pathname);

  // Update pathname when location changes
  useEffect(() => {
    const handleLocationChange = () => {
      const newPath = window.location.pathname;
      setPathname(newPath);
    };
    window.addEventListener('popstate', handleLocationChange);

    // Listen for custom navigation events from App.jsx
    window.addEventListener('pathchange', handleLocationChange);

    // Update pathname immediately in case it changed before this component mounted
    handleLocationChange();

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('pathchange', handleLocationChange);
    };
  }, []);

  return (
    <nav
      className="w-full py-4"
      aria-label="Main navigation"
    >
      <div className="flex items-center">
        {/* Left side - Logo/Home link */}
        <div className="w-1/4">
          <a
            href="/"
            className="font-semibold text-lg hover:opacity-80 transition-opacity"
            aria-label="Home"
          >
            Jacob Maynard
          </a>
        </div>

        {/* Center - Navigation Links */}
        <div className="flex-1 flex justify-center">
          <div className="hidden md:flex md:items-center md:gap-5">
            {NAVIGATION_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={`navbar-link relative pb-3 top-2 transition-colors ${
                  pathname === href ? 'link-active' : 'border-b border-transparent'
                }`}
                aria-current={pathname === href ? 'page' : undefined}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
