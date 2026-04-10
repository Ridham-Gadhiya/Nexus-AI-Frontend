import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#050508] border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Column 1: Brand */}
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-bold text-white mb-4">NEXUS AI LABS</h2>
          <p className="text-gray-400 max-w-sm">
            Architecting the future of digital intelligence. We build world-class web experiences and AI solutions.
          </p>
        </div>

        {/* Column 2: Links */}
        <div>
          <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Sitemap</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="text-gray-500 hover:text-blue-400 transition-colors">Home</Link></li>
            <li><Link href="#works" className="text-gray-500 hover:text-blue-400 transition-colors">Works</Link></li>
            <li><Link href="#contact" className="text-gray-500 hover:text-blue-400 transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Socials */}
        <div>
          <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Connect</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-500 hover:text-blue-400 transition-colors">LinkedIn</a></li>
            <li><a href="#" className="text-gray-500 hover:text-blue-400 transition-colors">Twitter / X</a></li>
            <li><a href="#" className="text-gray-500 hover:text-blue-400 transition-colors">GitHub</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center md:text-left text-gray-600 text-sm">
        © 2025 Nexus AI Labs. All rights reserved.
      </div>
    </footer>
  );
}