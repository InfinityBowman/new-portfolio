import React, { Suspense, lazy } from 'react';
import { LoadingSpinner } from '@/components/spinner';
import BackgroundCanvas from '@/components/background-grid';

const TopTrack = lazy(() => import('@/components/hobbies/top-track'));
const MyTracks = lazy(() => import('@/components/hobbies/my-tracks'));
const GraphicDesign = lazy(() => import('@/components/hobbies/graphic-design'));

export default function HobbiesPage() {
  return (
    <>
      <BackgroundCanvas opacity={0.2} />
      <div className="p-6">
        <Suspense fallback={<LoadingSpinner />}>
          <GraphicDesign />
          <MyTracks />
          <TopTrack />
        </Suspense>
      </div>
    </>
  );
}
