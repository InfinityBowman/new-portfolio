import { useEffect, useRef } from 'react';

interface BackgroundCanvasProps {
  opacity?: number;
}

export default function BackgroundCanvas({ opacity = 0.2 }: BackgroundCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const particles: Particle[] = [];
    let pixelRatio = window.devicePixelRatio || 1;

    // Resize handler with DPI scaling
    function resizeCanvas() {
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        // Set the canvas size considering device pixel ratio
        canvas.width = rect.width * pixelRatio;
        canvas.height = rect.height * pixelRatio;
        // Scale all drawing operations
        ctx!.scale(pixelRatio, pixelRatio);

        // Reinitialize particles when resizing
        initParticles();
      }
    }

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        const displayWidth = canvas!.width / pixelRatio;
        const displayHeight = canvas!.height / pixelRatio;

        this.x = Math.round(Math.random() * displayWidth);
        this.y = Math.round(Math.random() * displayHeight);
        this.size = Math.max(1.5, Math.round(Math.random() * 3 + 0.5)); // Integer sizes

        const signX = Math.random() < 0.5 ? -1 : 1;
        const signY = Math.random() < 0.5 ? -1 : 1;
        this.speedX = signX * (Math.random() * 2 + 0.2);
        this.speedY = signY * (Math.random() * 2 + 0.2);
        this.color = `hsl(${Math.random() * 360}, 100%, 100%)`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Round positions to avoid subpixel rendering
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);

        const displayWidth = canvas!.width / pixelRatio;
        const displayHeight = canvas!.height / pixelRatio;

        // Bounce off edges
        if (this.x + this.size > displayWidth || this.x - this.size < 0) {
          this.speedX = this.speedX * -1;
        }
        if (this.y + this.size > displayHeight || this.y - this.size < 0) {
          this.speedY = this.speedY * -1;
        }
      }

      draw() {
        if (!ctx) return;

        // For small particles, use rectangles instead of circles
        if (this.size <= 1) {
          ctx.fillStyle = this.color;
          ctx.fillRect(this.x, this.y, this.size, this.size);
        } else {
          // For larger particles, use crisp circles
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function initParticles() {
      particles.length = 0; // Clear existing particles

      const displayWidth = canvas!.width / pixelRatio;
      const displayHeight = canvas!.height / pixelRatio;

      // Calculate number of particles based on screen size
      const particleCount = Math.min(
        100, // Maximum particles
        Math.floor((displayWidth * displayHeight) / 15000), // Scale with screen size
      );

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    initParticles();

    // Connect nearby particles with lines - optimized
    function connectParticles() {
      if (!ctx) return;

      // Only check connections for particles within a certain distance
      const maxDistance = 100;
      const gridSize = Math.ceil(maxDistance);
      const grid: Record<string, Particle[]> = {};

      // Place particles in grid cells for spatial partitioning
      particles.forEach((particle) => {
        const cellX = Math.floor(particle.x / gridSize);
        const cellY = Math.floor(particle.y / gridSize);
        const key = `${cellX},${cellY}`;

        if (!grid[key]) grid[key] = [];
        grid[key].push(particle);
      });

      // Check connections only with nearby grid cells
      particles.forEach((p1) => {
        const cellX = Math.floor(p1.x / gridSize);
        const cellY = Math.floor(p1.y / gridSize);

        // Check 9 surrounding cells (3x3 grid)
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            const key = `${cellX + x},${cellY + y}`;
            const cellParticles = grid[key] || [];

            cellParticles.forEach((p2) => {
              if (p1 === p2) return; // Skip self

              const dx = p1.x - p2.x;
              const dy = p1.y - p2.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < 80) {
                ctx.beginPath();
                ctx.strokeStyle = p1.color;
                ctx.lineWidth = 0.5; // Slightly thicker for better visibility
                ctx.globalAlpha = 1 - distance / 80; // Fade out with distance
                ctx.moveTo(Math.round(p1.x), Math.round(p1.y));
                ctx.lineTo(Math.round(p2.x), Math.round(p2.y));
                ctx.stroke();
              }
            });
          }
        }
      });

      // Reset opacity
      ctx.globalAlpha = 1;
    }

    // Use requestAnimationFrame with throttling
    let lastTime = 0;
    const fps = 30; // Target 30 FPS instead of 60
    const frameInterval = 1000 / fps;

    function animate(timestamp: number) {
      if (!ctx || !canvas) return;

      const deltaTime = timestamp - lastTime;

      if (deltaTime >= frameInterval) {
        lastTime = timestamp - (deltaTime % frameInterval);

        const displayWidth = canvas.width / pixelRatio;
        const displayHeight = canvas.height / pixelRatio;

        ctx.clearRect(0, 0, displayWidth, displayHeight);

        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();
        }

        connectParticles();
      }

      requestAnimationFrame(animate);
    }

    // Start animation loop
    const animationId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
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
        zIndex: -1,
        opacity: opacity,
        background: 'transparent',
        pointerEvents: 'none',
      }}
    />
  );
}
