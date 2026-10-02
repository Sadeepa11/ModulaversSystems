'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Smartphone, ArrowRight, Sparkles, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects((data.projects || []).slice(0, 3)); // Display top 3 projects on homepage
      })
      .catch((err) => console.error('Failed to load home projects:', err))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && projects.length === 0) {
    return null; // Hide section if no projects are published yet
  }

  return (
    <section className="py-24 bg-dark-bg text-white relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <div className="inline-flex items-center bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 border border-blue-500/20">
              <Sparkles className="w-3.5 h-3.5 mr-2" /> Featured Portfolio
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold leading-tight">
              Our Recent{' '}
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors group"
          >
            View Full Portfolio <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 bg-white/5 animate-pulse rounded-3xl border border-white/10" />
            ))}
          </div>
        ) : (
          /* Projects Grid */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden flex flex-col group hover:border-blue-500/40 transition-all shadow-xl"
              >
                {/* Cover Image */}
                <div className="relative h-56 bg-black/40 overflow-hidden flex items-center justify-center">
                  {project.images && project.images.length > 0 ? (
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="text-white/30 flex flex-col items-center">
                      <ImageIcon className="w-10 h-10 mb-1" />
                      <span className="text-xs">No Image</span>
                    </div>
                  )}

                  <span className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-semibold text-white border border-white/10 flex items-center gap-1">
                    {project.type === 'web' ? <Globe className="w-3 h-3 text-blue-400" /> : <Smartphone className="w-3 h-3 text-emerald-400" />}
                    {project.type.toUpperCase()}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-widest">
                      {project.category || (project.type === 'web' ? 'Web Application' : 'Mobile App')}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-white/60 text-xs mt-2 line-clamp-2">{project.description}</p>
                  </div>

                  <Link
                    href="/projects"
                    className="mt-6 pt-4 border-t border-white/10 text-xs font-semibold text-blue-400 flex items-center justify-between group-hover:text-blue-300"
                  >
                    Explore Project <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
