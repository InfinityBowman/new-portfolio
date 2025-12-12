import React from 'react';

export default function NotFoundPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      <div className="z-10 text-center px-6 max-w-2xl">
        <div className="animate-fade-in">
          <h1 className="text-8xl font-bold mb-2 text-white">404</h1>
          <h2 className="text-2xl md:text-4xl font-semibold mb-6 text-white/90">Page Not Found</h2>

          <p className="text-white/70 mb-8 text-lg">The page you're looking for doesn't exist or has been moved.</p>

          <a
            href="/"
            className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-md hover:bg-white/20 transition-colors border border-white/20"
          >
            Return Home
          </a>
        </div>
      </div>
    </div>
  );
}
