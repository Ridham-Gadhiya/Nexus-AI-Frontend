'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the plugin
gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Optional delay before starting
}

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // The Animation Logic
    gsap.fromTo(
      element,
      {
        autoAlpha: 0, // CSS visibility + opacity
        y: 50,        // Start 50px down
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        delay: delay,
        ease: "power3.out", // Smooth easing
        scrollTrigger: {
          trigger: element,
          start: "top 85%", // Start when top of element hits 85% of viewport height
          toggleActions: "play none none reverse", // Play on enter, reverse on leave
        },
      }
    );

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [delay]);

  return (
    <div ref={ref} className={`reveal-wrapper ${className}`}>
      {children}
    </div>
  );
}