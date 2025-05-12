import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactLenis } from 'lenis/react';
import './global.css';
import 'lenis/dist/lenis.css';
import App from './App';
import ScrollProgressIndicator from '@/src/components/ScrollProgressIndicator';
import CustomCursor from '@/src/components/CustomCursor';
import BackgroundParticles from '@/src/components/BackgroundParticles';
import BackgroundCanvas from '@/src/components/BackgroundGrid';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
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
      <CustomCursor />
    </ReactLenis>
  </React.StrictMode>,
);
