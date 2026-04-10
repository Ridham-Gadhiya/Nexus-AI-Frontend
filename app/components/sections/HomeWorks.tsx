'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

// 1. The Interface matching YOUR Django API response
interface Work {
  id: number;
  title: string;
  description: string;
  project_type: string;
  repo_link: string | null;
  live_demo: string | null;
  thumbnail: string | null;
  tech: string; // "Python,DL,ML"
}

export function HomeWorks() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 2. Fetching from your API
    const fetchWorks = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/list_work/`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setWorks(data);
      } catch (error) {
        console.error('Error loading works:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, []);

  if (loading) return <div className="p-20 text-center text-blue-400">Loading Projects...</div>;
  const baseurl = 'http://127.0.0.1:8000/';
  const image_url = `${baseurl}${works[0]?.thumbnail}` || null;
  return (
    <section className="relative w-full py-20 px-6 bg-[#0A0A10]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 inline-block">
            Selected Works
          </h2>
          <div className="h-1 w-20 bg-blue-500 mt-4 mx-auto md:mx-0 rounded-full" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work) => {
            // Helper: Split the 'tech' string into an array for badges
            const techTags = work.tech ? work.tech.split(',') : [];

            return (
              // CHANGE: We wrap the whole card in a Next.js Link
              <Link href={`/works/${work.id}`} key={work.id} className="block group">
                <div 
                  className="relative h-full bg-[#10121A] border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
                >
                  {/* Image Area (Handling NULL thumbnails) */}
                  <div className="relative h-48 w-full overflow-hidden bg-gray-800">
                    {image_url ?(
                      <img 
                        src={image_url} 
                        alt={work.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      // Fallback Gradient if no image exists yet
                      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">No Preview</span>
                      </div>
                    )}
                    
                    {/* Overlay Badge */}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                      <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">
                        {work.project_type}
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {work.title}
                        </h3>
                        <span className="text-gray-500 group-hover:translate-x-1 transition-transform">↗</span>
                    </div>
                    
                    <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                      {work.description}
                    </p>

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-2">
                      {techTags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="text-[10px] uppercase tracking-widest px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}