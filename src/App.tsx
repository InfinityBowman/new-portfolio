import React, { Suspense, useState, useEffect } from 'react';
import { LoadingSpinner } from '@/src/components/Spinner';
import HomePage from '@/src/pages/Home';
import NotFoundPage from '@/src/pages/NotFound';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

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
    <main>
      <Suspense fallback={<LoadingSpinner />}>{isHomePage ? <HomePage /> : <NotFoundPage />}</Suspense>
    </main>
  );
}
