'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Interface matching your Django API response
interface WorkDetail {
  id: number;
  title: string;
  description: string;
  project_type: string;
  repo_link: string | null;
  live_demo: string | null;
  thumbnail: string | null;
  video: string | null;
  tech: string;
  created_at: string;
}

export default function WorkDetailPage() {
  const params = useParams();
  const { id } = params; // Get the ID from the URL (e.g., works/1 -> id = 1)
  
  const [work, setWork] = useState<WorkDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchWorkDetail = async () => {
      try {
        // Fetching from your specific Detail Endpoint
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/detail_list_work/${id}/`);
        
        if (!res.ok) throw new Error('Project not found');
        
        const data = await res.json();
        setWork(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkDetail();
  }, [id]);


  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  if (!work) return <div className="min-h-screen flex items-center justify-center text-red-500">Project not found</div>;

  // Helper to split tech string
  const techStack = work.tech ? work.tech.split(',') : [];

  return (
    <main className="min-h-screen bg-[#0A0A10] pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Back Button */}
        <Link href="/#works" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          ← Back to Works
        </Link>

        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
             <span className="px-3 py-1 text-xs font-mono uppercase text-blue-400 border border-blue-400/20 rounded-full">
               {work.project_type}
             </span>
             <span className="text-gray-500 text-sm">
               {new Date(work.created_at).toLocaleDateString()}
             </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">{work.title}</h1>
        </div>

  

        <div className="w-full h-[400px] md:h-[600px] bg-gray-800 rounded-2xl overflow-hidden mb-16 border border-white/10 relative group">
          {work?.thumbnail ? (
            <img src={work.thumbnail} alt={work.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
              <span className="text-gray-500">No Preview Image Available</span>
            </div>
          )}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Left: Description */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed whitespace-pre-wrap">
              {work.description}
            </div>
          </div>

          {/* Right: Meta Info */}
          <div className="space-y-8">
            
            {/* Tech Stack */}
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-white/5 text-white text-sm rounded-md border border-white/10">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Links</h3>
              <div className="flex flex-col gap-3">
                {work.repo_link && (
                  <Link href={work.repo_link} target="_blank" className="px-6 py-3 bg-white text-black font-bold rounded-lg text-center hover:bg-gray-200 transition-colors">
                    View Source Code
                  </Link>
                )}
                {work.live_demo && (
                  <Link href={work.live_demo} target="_blank" className="px-6 py-3 border border-white/20 text-white font-bold rounded-lg text-center hover:bg-white/10 transition-colors">
                    Live Demo
                  </Link>
                )}
                {!work.repo_link && !work.live_demo && (
                    <p className="text-gray-600 text-sm">No public links available.</p>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}