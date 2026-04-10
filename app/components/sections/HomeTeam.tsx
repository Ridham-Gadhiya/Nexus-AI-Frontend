'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
// Import the animation component
import { Reveal } from '../animations/Reveal';

// Interface matching your Django Serializer
interface Developer {
  id: number;
  name: string;
  email: string;
  bio: string;
  role: string;
  thumbnail: string | null;
  linkedln: string | null;
  github: string | null;
}

export function HomeTeam() {
  const [team, setTeam] = useState<Developer[]>([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        // Fetch from your Developer App endpoint
        const res = await fetch('http://127.0.0.1:8000/api/list_developers/');
        if (res.ok) {
          setTeam(await res.json());
        }
      } catch (e) { console.error(e); }
    };
    fetchTeam();
  }, []);

  // If no team members exist, hide the section entirely
  if (team.length === 0) return null;

  return (
    <section className="w-full py-20 px-6 bg-[#0A0A10]">
      <div className="max-w-7xl mx-auto">
        
        {/* Title Animation */}
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Meet The <span className="text-blue-500">Creators</span>
            </h2>
            <div className="h-1 w-20 bg-blue-500 mt-4 mx-auto rounded-full" />
          </div>
        </Reveal>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {team.map((member, index) => (
            // Animation Wrapper: Stagger delay based on index (0.1s, 0.2s, etc.)
            <Reveal key={member.id} delay={index * 0.1}>
              <div className="h-full bg-[#10121A] border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-2 group">
                
                {/* Image Area */}
                <div className="h-72 w-full bg-gray-800 overflow-hidden relative">
                  {member.thumbnail ? (
                    <img 
                      src={member.thumbnail} 
                      alt={member.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    // Fallback Avatar
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                      <span className="text-5xl">👨‍💻</span>
                    </div>
                  )}
                  
                  {/* Role Badge */}
                  <div className="absolute bottom-4 left-4 bg-blue-600/90 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 shadow-lg">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {member.role}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex flex-col h-auto">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm text-blue-400/80 mb-4 font-mono">
                    {member.email}
                  </p>
                  
                  <p className="text-gray-400 text-sm line-clamp-3 mb-6 leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Social Icons */}
                  <div className="mt-auto pt-4 border-t border-white/5 flex gap-4">
                    {member.github && (
                      <Link 
                        href={member.github} 
                        target="_blank" 
                        className="text-gray-500 hover:text-white text-sm flex items-center gap-1 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                        GitHub
                      </Link>
                    )}
                    {member.linkedln && (
                      <Link 
                        href={member.linkedln} 
                        target="_blank" 
                        className="text-gray-500 hover:text-blue-400 text-sm flex items-center gap-1 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                        LinkedIn
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}