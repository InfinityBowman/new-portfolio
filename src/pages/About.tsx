import React, { Suspense, lazy } from 'react';
import { LoadingSpinner } from '@/components/spinner';
import BackgroundCanvas from '@/components/background-grid';

const AboutMe = lazy(() => import('@/components/about/about-me'));
const Projects = lazy(() => import('@/components/about/projects'));

export default function AboutPage() {
  return (
    <>
      <BackgroundCanvas opacity={0.2} />
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
