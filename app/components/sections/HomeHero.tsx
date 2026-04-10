'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function HomeHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      
      // 1. Initial Reveal Animation (Load)
      const tl = gsap.timeline();
      tl.from(textRef.current, { y: 100, opacity: 0, duration: 1, ease: "power4.out" })
        .from(visualRef.current, { scale: 0.8, opacity: 0, duration: 1, ease: "back.out(1.7)" }, "-=0.5")
        .from([badge1Ref.current, badge2Ref.current], { y: 20, opacity: 0, stagger: 0.2, duration: 0.8 }, "-=0.5");

      // 2. Scroll Parallax Effect (Like the video)
      // The Text moves slower than the Visual, creating depth
      gsap.to(textRef.current, {
        y: -150, // Moves up slowly
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(visualRef.current, {
        y: -50, // Moves up barely
        scale: 1.1, // Grows slightly
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Badges float faster
      gsap.to([badge1Ref.current, badge2Ref.current], {
        y: -200,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // Make the container tall so we have room to scroll, but keep content sticky
    <section ref={containerRef} className="relative h-[120vh] w-full bg-[#0A0A10] overflow-hidden">
      
      {/* Background Grid (Subtle) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0 pointer-events-none" />

      {/* Sticky Content Wrapper */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center">
        
        {/* LAYER 1: Massive Background Text (Like "More" in video) */}
        <h1 
          ref={textRef} 
          className="relative z-10 font-heading font-bold text-[18vw] leading-none text-white/5 select-none whitespace-nowrap"
        >
          NEXUS AI
        </h1>

        {/* LAYER 2: The Main Visual (Like the Bottle in video) */}
        {/* We use a glowing abstract shape to represent "AI Core" */}
        <div 
          ref={visualRef}
          className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px]"
        >
            {/* The Orb/Image */}
            <div className="w-full h-full rounded-full bg-gradient-to-b from-blue-500 to-purple-600 blur-sm opacity-90 animate-pulse-slow flex items-center justify-center shadow-[0_0_100px_rgba(59,130,246,0.4)]">
                <div className="w-[90%] h-[90%] rounded-full bg-[#0A0A10] flex items-center justify-center border border-white/10 relative overflow-hidden">
                    {/* Inner decorative circle */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                    <div className="text-center z-10 p-6">
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-2">FUTURE</h2>
                        <p className="text-blue-400 font-mono text-sm tracking-[0.3em]">INTELLIGENCE</p>
                    </div>
                </div>
            </div>
        </div>

        {/* LAYER 3: Floating "Feature" Badges (Like "20g Protein" in video) */}
        
        {/* Badge Left */}
        <div 
          ref={badge1Ref}
          className="absolute z-30 top-[60%] left-[10%] md:left-[20%] p-4 glass rounded-2xl border border-white/10 shadow-2xl transform -rotate-6 backdrop-blur-md"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
              ⚡
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Speed</p>
              <p className="text-lg font-bold text-white">10x Faster</p>
            </div>
          </div>
        </div>

        {/* Badge Right */}
        <div 
          ref={badge2Ref}
          className="absolute z-30 top-[30%] right-[10%] md:right-[20%] p-4 glass rounded-2xl border border-white/10 shadow-2xl transform rotate-6 backdrop-blur-md"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
              🧠
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Model</p>
              <p className="text-lg font-bold text-white">GPT-4 Turbo</p>
            </div>
          </div>
        </div>

        {/* Call to Action (Bottom) */}
        <div className="absolute z-40 bottom-10 md:bottom-20 flex gap-4">
             <Link 
                href="#works" 
                className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                Start Building
              </Link>
        </div>

      </div>
    </section>
  );
}