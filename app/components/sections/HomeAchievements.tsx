'use client';

import React, { useEffect, useState } from 'react';

// 1. Interface matching YOUR specific model
interface Achievement {
  id: number;
  title: string;
  description: string;
  image: string | null;    // URL from ImageField
  img_link: string | null; // URLField
}

export function HomeAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        // Make sure this URL matches your backend
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list_achievements/`);
        if (res.ok) {
          const data = await res.json();
          setAchievements(data);
        }
      } catch (error) {
        console.error('Failed to load achievements', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  if (loading || achievements.length === 0) return null;

  return (
    <section className="w-full py-20 px-6 bg-[#0A0A10] relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 flex items-end gap-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Awards & <span className="text-blue-500">Achievements</span>
          </h2>
          <div className="h-[2px] flex-1 bg-white/10 mb-2" />
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {achievements.map((item) => (
            <div 
              key={item.id} 
              className="group flex flex-col sm:flex-row bg-[#10121A] border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300"
            >
              {/* Image Section */}
              <div className="sm:w-48 h-48 sm:h-auto relative shrink-0 bg-gray-800 overflow-hidden">
                {/* Priority: Use uploaded image first, then img_link, then placeholder */}
                {item.image ? (
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : item.img_link ? (
                  <img src={item.img_link} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                    <span className="text-4xl">🏆</span>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                  {item.description}
                </p>
                
                {/* If there is an external link, show a button */}
                {item.img_link && (
                  <a 
                    href={item.img_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300"
                  >
                    View Certificate <span className="ml-1">→</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}