'use client';
import { HomeWorks } from '../components/sections/HomeWorks';

export default function WorksPage() {
  return (
    <main className="min-h-screen bg-[#0A0A10] pt-24">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h1 className="text-6xl md:text-8xl font-heading font-bold text-white mb-4">Our Work</h1>
        <p className="text-gray-400 text-xl max-w-2xl">
          A selection of AI-driven solutions and immersive web experiences.
        </p>
      </div>
      <HomeWorks />
    </main>
  );
}