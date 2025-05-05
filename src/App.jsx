import React, { Suspense, lazy, useState, useEffect } from 'react';
import { LoadingSpinner } from '@/components/spinner.tsx';
import NavBarWrapper from '@/components/nav/navbar-wrapper';
import Footer from '@/components/footer';

// Lazy load page components
import HomePage from '@/pages/Home';
// const HomePage = lazy(() => import('@/pages/HomePage'));
const AboutPage = lazy(() => import('@/pages/About'));
const HobbiesPage = lazy(() => import('@/pages/Hobbies'));

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // Handle navigation
    const handleNavigation = (event) => {
      // Find if the click is on an anchor tag or one of its children
      let target = event.target;
      while (target && target.tagName !== 'A') {
        target = target.parentElement;
      }

      // If we found an anchor and it's an internal link
      if (target && target.href && target.href.includes(window.location.origin)) {
        event.preventDefault();
        const href = target.getAttribute('href');

        // Only update if we're navigating to a different path
        if (href !== currentPath) {
          window.history.pushState({}, '', href);
          setCurrentPath(href);

          // Dispatch a custom event that the NavBar component can listen for
          window.dispatchEvent(new CustomEvent('pathchange'));
        }
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    document.addEventListener('click', handleNavigation);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      document.removeEventListener('click', handleNavigation);
    };
  }, [currentPath]);

  // Render the appropriate page based on the current path
  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage />;
      case '/about':
        return <AboutPage />;
      case '/hobbies':
        return <HobbiesPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="min-h-screen flex flex-col items-center">
        <div className="flex-1 w-full flex flex-col gap-10 items-center">
          <header className="sticky top-0 w-full h-12 z-50 bg-background border-b border-b-foreground flex items-center text-sm p-4">
            <NavBarWrapper />
          </header>
          <Suspense fallback={<LoadingSpinner />}>{renderPage()}</Suspense>
        </div>

        <Footer />
      </main>
    </div>
  );
}
