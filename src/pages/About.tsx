import React, { Suspense, lazy } from 'react';
import { LoadingSpinner } from '@/src/components/Spinner';

const AboutMe = lazy(() => import('@/src/components/about/AboutMe'));
const Projects = lazy(() => import('@/src/components/about/Projects'));

export default function AboutPage() {
  return (
    <>
      <div className="flex flex-col items-center mx-4 mb-4 gap-2">
        <Suspense fallback={<LoadingSpinner />}>
          <AboutMe />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <Projects />
        </Suspense>
      </div>
    </>
  );
}
