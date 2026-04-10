'use client';
import { HomeContact } from '../components/sections/HomeContact';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0A0A10] pt-24 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <h1 className="text-6xl md:text-8xl font-heading font-bold text-white mb-4">Get in Touch</h1>
      </div>
      <HomeContact />
    </main>
  );
}