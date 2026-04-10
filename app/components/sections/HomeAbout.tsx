'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface AboutInfo {
  name: string;
  tagline: string;
  description: string;
  established_year: number;
  linkedln: string | null;
  github: string | null;
  twitter: string | null;
}

interface Skill {
  id: number;
  name: string;
  category: string;
  icon: string | null;
}

export function HomeAbout() {
  const [info, setInfo] = useState<AboutInfo | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    // 1. FETCH INFO: Added '/about/' to the URL
    const fetchInfo = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/info`);
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) setInfo(data[0]);
        } else {
          console.error("Failed to fetch About Info");
        }
      } catch (e) { console.error(e); }
    };

    // 2. FETCH SKILLS: Added '/about/' to the URL
    const fetchSkills = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills/`);
        if (res.ok) {
           setSkills(await res.json());
        } else {
           console.error("Failed to fetch Skills");
        }
      } catch (e) { console.error(e); }
    };

    fetchInfo();
    fetchSkills();
  }, []);

  // Filter logic matches your model: 'AI', 'WEB', 'TOOL'
  const aiSkills = skills.filter(s => s.category === 'AI');
  const webSkills = skills.filter(s => s.category === 'WEB');

  return (
    <section className="w-full py-24 px-6 bg-[#050508] relative">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT: Text Content */}
        <div>
          <h2 className="text-4xl font-bold text-white mb-6">
            {info?.name || "Engineering Intelligence"} <br />
            <span className="text-blue-500">{info?.tagline || "Since Day One."}</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8 whitespace-pre-wrap">
            {info?.description || "Loading company story... (Make sure you added 'About' data in Django Admin)"}
          </p>
          
          {/* Social Links */}
          <div className="flex gap-4">
            {info?.github && (
              <Link href={info.github} target="_blank" className="text-sm text-gray-400 hover:text-white border border-white/10 px-4 py-2 rounded-full">
                GitHub
              </Link>
            )}
            {info?.linkedln && (
              <Link href={info.linkedln} target="_blank" className="text-sm text-gray-400 hover:text-white border border-white/10 px-4 py-2 rounded-full">
                LinkedIn
              </Link>
            )}
          </div>
        </div>

        {/* RIGHT: Skills Grid */}
        <div className="space-y-8">
          
          {/* AI Skills */}
          {aiSkills.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase mb-3 tracking-widest">AI & Research</h3>
              <div className="flex flex-wrap gap-3">
                {aiSkills.map(skill => (
                  <div key={skill.id} className="flex items-center gap-2 px-4 py-2 bg-[#10121A] border border-white/10 rounded-lg hover:border-blue-500/50 transition-colors">
                    {skill.icon && <img src={skill.icon} alt="" className="w-5 h-5 object-contain" />}
                    <span className="text-sm text-gray-300">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Web Skills */}
          {webSkills.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase mb-3 tracking-widest">Web Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {webSkills.map(skill => (
                  <div key={skill.id} className="flex items-center gap-2 px-4 py-2 bg-[#10121A] border border-white/10 rounded-lg hover:border-purple-500/50 transition-colors">
                    {skill.icon && <img src={skill.icon} alt="" className="w-5 h-5 object-contain" />}
                    <span className="text-sm text-gray-300">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}