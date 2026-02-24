import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { ReactLenis } from 'lenis/react';
import './global.css';
import 'lenis/dist/lenis.css';
import App from './App';
import ScrollProgressIndicator from '@/src/components/ScrollProgressIndicator';
import BackgroundParticles from '@/src/components/BackgroundParticles';
import BackgroundCanvas from '@/src/components/BackgroundGrid';

const ConstellationPage = lazy(() => import('@/src/ConstellationPage'));

const isConstellationPage = window.location.pathname === '/constellation';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {isConstellationPage ? (
      <Suspense fallback={null}>
        <ConstellationPage />
      </Suspense>
    ) : (
      <ReactLenis
        root
        options={{
          lerp: 0.1,
          duration: 1.4,
          smoothWheel: true,
          orientation: 'vertical',
        }}
      >
        <App />
        <BackgroundParticles opacity={0.5} />
        <BackgroundCanvas opacity={0.1} />
        <ScrollProgressIndicator />
      </ReactLenis>
    )}
  </React.StrictMode>,
);
