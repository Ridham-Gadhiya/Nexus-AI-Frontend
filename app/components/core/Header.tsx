'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname(); // Get current page to highlight link

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkClass = (path: string) => `text-sm font-medium transition-colors ${
    pathname === path ? 'text-blue-400' : 'text-gray-300 hover:text-white'
  }`;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-[#0A0A10]/80 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        <Link href="/" className="text-2xl font-heading font-bold text-white tracking-tighter">
          NEXUS<span className="text-blue-500">.AI</span>
        </Link>

        <nav className="hidden md:flex gap-8">
          <Link href="/works" className={linkClass('/works')}>Works</Link>
          <Link href="/about" className={linkClass('/about')}>About</Link>
          <Link href="/contact" className={linkClass('/contact')}>Contact</Link>
        </nav>

        {/* Mobile Menu Button (Placeholder) */}
        <button className="md:hidden text-white">Menu</button>
      </div>
    </header>
  );
}