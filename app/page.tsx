'use client';

import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

// --- Types ---
interface Work {
  id: number;
  title: string;
  description: string;
  project_type: string;
  thumbnail: string | null;
  tech: string;
}

export default function Home() {
  // Refs for GSAP
  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const worksRef = useRef<HTMLDivElement>(null);
  const worksContainerRef = useRef<HTMLDivElement>(null);
  
  // Hero Refs
  const textRef = useRef<HTMLHeadingElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const cardLeftRef = useRef<HTMLDivElement>(null);
  const cardRightRef = useRef<HTMLDivElement>(null);
  
  // Data State
  const [works, setWorks] = useState<Work[]>([]);
  const baseurl = `${process.env.NEXT_PUBLIC_API_URL}`;
  const image_url = `${baseurl}${works[0]?.thumbnail}` || null;

  // 1. Fetch Works Data
  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/list_work/`);
        if (res.ok) {
          const data = await res.json();
          // Take only first 5 for the homepage showcase
          setWorks(data.slice(0, 5));
        }
      } catch (e) { console.error("Failed to fetch works", e); }
    };
    fetchWorks();
  }, []);

  // 2. GSAP Animations (Hero + Horizontal Scroll)
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      
      // --- HERO ANIMATION (Timeline 1) ---
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=200%", // Pin for 2 screens worth
          scrub: 1,
          pin: true,
        }
      });

      heroTl
        .to(textRef.current, { scale: 2, opacity: 0, y: -150 }, 0)
        .to(orbRef.current, { y: 0, scale: 1.2, opacity: 1 }, 0)
        .to(cardLeftRef.current, { x: 0, y: 0, opacity: 1, rotate: -6 }, 0.2)
        .to(cardRightRef.current, { x: 0, y: 0, opacity: 1, rotate: 6 }, 0.2);

      // --- WORKS HORIZONTAL SCROLL (Timeline 2) ---
      // Only run if we have works to scroll
      if (worksContainerRef.current) {
        const scrollWidth = worksContainerRef.current.scrollWidth;
        const windowWidth = window.innerWidth;
        
        const worksTl = gsap.timeline({
          scrollTrigger: {
            trigger: worksRef.current,
            start: "top top",
            end: `+=${scrollWidth}`, // Scroll distance = width of content
            scrub: 1,
            pin: true,
          }
        });

        // 1. Animate Title Characters
        worksTl.from(".work-title-char", {
          y: 100,
          opacity: 0,
          rotateX: 90,
          stagger: 0.05,
          duration: 1,
          ease: "power4.out"
        });

        // 2. Horizontal Move
        worksTl.to(worksContainerRef.current, {
          x: -(scrollWidth - windowWidth + 100), // Scroll to end
          ease: "none",
        });
      }

    }, mainRef);

    return () => ctx.revert();
  }, [works]); // Re-run when works load

  // Helper to split text for animation
  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="work-title-char inline-block will-change-transform">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <main ref={mainRef} className="bg-[#0A0A10] overflow-x-hidden">
      
      {/* ================= HERO SECTION ================= */}
      <section ref={heroRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background Text */}
        <h1 
          ref={textRef}
          className="absolute z-0 font-heading font-bold text-[25vw] text-white/5 whitespace-nowrap select-none"
        >
          NEXUS
        </h1>

        {/* Orb */}
        <div 
          ref={orbRef}
          className="relative z-10 w-[300px] h-[300px] md:w-[500px] md:h-[500px] opacity-0 translate-y-[200px] scale-50"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-600 to-purple-600 blur-[100px] opacity-60 animate-pulse-slow absolute inset-0" />
          <div className="relative w-full h-full rounded-full bg-black border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            <div className="text-center p-6 relative z-20">
               <span className="block text-blue-400 font-mono text-sm tracking-[0.4em] mb-2">SYSTEM</span>
               <span className="block text-white font-heading text-5xl md:text-7xl font-bold">ONLINE</span>
            </div>
          </div>
        </div>

        {/* Floating Cards */}
        <div ref={cardLeftRef} className="absolute left-[10%] top-[40%] z-20 opacity-0 -translate-x-[100px] translate-y-[100px] p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl w-64 shadow-2xl">
          <div className="text-3xl font-bold text-white mb-1">60 FPS</div>
          <div className="text-xs text-gray-400 uppercase tracking-widest">Performance</div>
        </div>
        <div ref={cardRightRef} className="absolute right-[10%] top-[50%] z-20 opacity-0 translate-x-[100px] translate-y-[100px] p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl w-64 shadow-2xl">
          <div className="text-3xl font-bold text-white mb-1">GEN-AI</div>
          <div className="text-xs text-gray-400 uppercase tracking-widest">Intelligence</div>
        </div>
      </section>


      {/* ================= WORKS HORIZONTAL SECTION ================= */}
      <section ref={worksRef} className="h-screen w-full flex flex-col justify-center relative overflow-hidden py-20">
        
        {/* Section Header (Animated Text) */}
        <div className="absolute top-10 left-6 md:left-20 z-30">
          <h2 className="text-6xl md:text-8xl font-heading font-bold text-white overflow-hidden">
            {splitText("SELECTED WORKS")}
          </h2>
          <p className="text-gray-400 mt-4 max-w-md">
            Drag or scroll to explore our latest digital frontiers.
          </p>
        </div>

        {/* Horizontal Scrolling Container */}
        <div 
          ref={worksContainerRef}
          className="flex gap-12 px-20 items-center w-max h-[70vh] mt-20"
        >
          {/* Loading State */}
          {works.length === 0 && (
             <div className="text-white text-2xl animate-pulse pl-20">Loading Projects...</div>
          )}

          {/* Project Cards */}
          {works.map((work, index) => (
            <Link href={`/works/${work.id}`} key={work.id} className="group relative h-full aspect-[3/4] md:aspect-[4/3] w-[80vw] md:w-[600px] flex-shrink-0">
              <div className="w-full h-full bg-[#10121A] border border-white/10 rounded-3xl overflow-hidden relative transition-transform duration-500 group-hover:scale-[1.02] group-hover:border-blue-500/50">
                
                {/* Image */}
                {image_url ? (
                   <img src={image_url} alt={work.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                ) : (
                   <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                      <span className="text-6xl opacity-20">🖼️</span>
                   </div>
                )}

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/80 to-transparent translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                   <div className="flex justify-between items-end">
                      <div>
                         <span className="text-blue-400 font-mono text-xs uppercase tracking-wider mb-2 block">
                            {work.project_type || "Project"}
                         </span>
                         <h3 className="text-4xl font-bold text-white mb-2 font-heading">
                            {work.title}
                         </h3>
                         <p className="text-gray-400 text-sm line-clamp-2 max-w-md">
                            {work.description}
                         </p>
                      </div>
                      <div className="h-12 w-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                         ↗
                      </div>
                   </div>
                </div>

              </div>
              
              {/* Big Number Index */}
              <div className="absolute -top-10 -left-10 text-[10rem] font-bold text-white/5 font-heading z-[-1]">
                0{index + 1}
              </div>
            </Link>
          ))}

          {/* "View All" Card at the end */}
          <Link href="/works" className="h-full w-[300px] flex-shrink-0 flex items-center justify-center border border-white/10 rounded-3xl hover:bg-white/5 transition-colors group">
             <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400">View All</div>
                <div className="text-gray-500">Explore Archive →</div>
             </div>
          </Link>

        </div>
      </section>

      {/* ================= FOOTER CALL TO ACTION ================= */}
      <section className="h-[50vh] flex items-center justify-center bg-black">
        <Link href="/contact" className="text-center group">
           <h2 className="text-5xl md:text-8xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-700">
              START PROJECT
           </h2>
           <p className="text-gray-500 mt-4 tracking-widest uppercase text-sm group-hover:text-white transition-colors">
              Click to Initiate
           </p>
        </Link>
      </section>

    </main>
  );
}