'use client';
import { HomeAbout } from '../components/sections/HomeAbout';
import { HomeTeam } from '../components/sections/HomeTeam';
import { HomeAchievements } from '../components/sections/HomeAchievements';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0A0A10] pt-24 space-y-20 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-6xl md:text-8xl font-heading font-bold text-white mb-4">Who We Are</h1>
      </div>
      <HomeAbout />
      <HomeAchievements />
      <HomeTeam />
    </main>
  );
}