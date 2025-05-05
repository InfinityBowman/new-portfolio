import React from 'react';
import { Hero } from '@/components/hero/hero';

export default function HomePage() {
  return (
    <>
      <Hero />
      <main className="flex-1 flex flex-col gap-6 px-4"></main>
    </>
  );
}
