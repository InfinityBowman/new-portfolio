import React, { useState, useEffect } from 'react';
import Home from '@/src/Home';
import NotFoundPage from '@/src/NotFound';
import NavMenuToggle from '@/src/components/nav/NavMenuToggle';
import NavMenu from '@/src/components/nav/NavMenu';
import Footer from '@/src/components/Footer';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const isHomePage = currentPath === '/';

  return (
    <>
      <NavMenuToggle
        onToggle={handleMenuToggle}
        isOpen={isMenuOpen}
      />
      <NavMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
      <main>{isHomePage ? <Home /> : <NotFoundPage />}</main>
      <Footer />
    </>
  );
}
