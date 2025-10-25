import React, { useState, useEffect, Suspense, lazy } from 'react';
import Home from '@/src/Home';
import NotFoundPage from '@/src/NotFound';
import NavMenuToggle from '@/src/components/nav/NavMenuToggle';
import NavMenu from '@/src/components/nav/NavMenu';
import Footer from '@/src/components/Footer';

const Blog = lazy(() => import('@/src/Blog'));

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
    window.addEventListener('pushstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('pushstate', handleLocationChange);
    };
  }, []);

  const isHomePage = currentPath === '/';
  const isBlogPage = currentPath.startsWith('/blog');

  return (
    <>
      <NavMenuToggle onToggle={handleMenuToggle} isOpen={isMenuOpen} />
      <NavMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <main className="relative z-10">
        {isHomePage && <Home />}
        {isBlogPage && (
          <Suspense fallback={<div className="min-h-screen"></div>}>
            <Blog />
          </Suspense>
        )}
        {!isHomePage && !isBlogPage && <NotFoundPage />}
      </main>
      <Footer />
    </>
  );
}
