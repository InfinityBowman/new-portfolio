import { useEffect, useRef } from 'react';
import { DEFAULT_CONFIG } from '@/src/lib/constellation/types';
import { createNodes, updateNodes, computeConnections } from '@/src/lib/constellation/simulation';
import { initRenderer, resizeRenderer, renderFrame, cleanupRenderer } from '@/src/lib/constellation/renderer';

interface ConstellationBackgroundProps {
  opacity?: number;
}

export default function ConstellationBackground({ opacity = 1 }: ConstellationBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const config = DEFAULT_CONFIG;
    const nodes = createNodes(config);
    const renderer = initRenderer(canvas, config);
    if (!renderer) return;

    let pixelRatio = window.devicePixelRatio || 1;

    function resize() {
      if (!canvas || !renderer) return;
      pixelRatio = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * pixelRatio;
      canvas.height = rect.height * pixelRatio;
      resizeRenderer(renderer, canvas.width, canvas.height);
    }

    resize();
    window.addEventListener('resize', resize);

    let animId = 0;
    let startTime = 0;

    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const time = (timestamp - startTime) / 1000;

      updateNodes(nodes, time, config);
      const connections = computeConnections(nodes, config);
      renderFrame(renderer!, nodes, connections, time);

      animId = requestAnimationFrame(animate);
    }

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
      cleanupRenderer(renderer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        opacity,
        background: 'transparent',
        pointerEvents: 'none',
      }}
    />
  );
}
