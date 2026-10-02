'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Smartphone, ExternalLink, Sparkles, Layers, ArrowLeft, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsPortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'web', 'app'
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (err) {
      console.error('Failed to load portfolio projects', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter((project) => {
    if (activeTab === 'all') return true;
    return project.type === activeTab;
  });

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setActiveImageIndex(0);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center bg-white/5 text-blue-400 px-5 py-2 rounded-full text-xs font-semibold mb-4 border border-white/10"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Our Recent Work
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
          >
            Project{' '}
            <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Portfolio
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-lg text-white/60 mt-4 leading-relaxed"
          >
            Explore our latest web applications, mobile apps, and digital solutions delivered for clients worldwide.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center items-center gap-3 mb-12 flex-wrap">
          {[
            { id: 'all', label: 'All Projects', icon: Layers },
            { id: 'web', label: 'Web Applications', icon: Globe },
            { id: 'app', label: 'Mobile Apps', icon: Smartphone }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 scale-105'
                    : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Portfolio Grid */}
        {loading ? (
          <div className="text-center py-20 text-white/40">Loading portfolio...</div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 max-w-xl mx-auto">
            <Layers className="w-12 h-12 text-white/30 mx-auto mb-3" />
            <h3 className="text-xl font-semibold text-white/80">No Projects Found</h3>
            <p className="text-white/50 text-sm mt-1">
              {activeTab === 'all'
                ? 'No projects added yet. Add projects from the Admin Panel!'
                : `No ${activeTab.toUpperCase()} projects available at the moment.`}
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 mt-6 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all"
            >
              Go to Admin Panel
            </Link>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => openProjectModal(project)}
                  className="group bg-white/5 rounded-3xl border border-white/10 overflow-hidden hover:border-blue-500/50 transition-all duration-300 cursor-pointer flex flex-col hover:shadow-2xl hover:shadow-blue-500/10"
                >
                  {/* Image Container */}
                  <div className="relative h-60 bg-black/40 overflow-hidden flex items-center justify-center">
                    {project.images && project.images.length > 0 ? (
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="text-white/30 flex flex-col items-center">
                        <ImageIcon className="w-12 h-12 mb-2" />
                        <span className="text-xs">No preview available</span>
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-80" />

                    {/* Badge */}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-semibold text-white/90 border border-white/10 flex items-center gap-1.5">
                      {project.type === 'web' ? <Globe className="w-3.5 h-3.5 text-blue-400" /> : <Smartphone className="w-3.5 h-3.5 text-emerald-400" />}
                      {project.type.toUpperCase()}
                    </span>

                    {/* Image Counter */}
                    {project.images && project.images.length > 1 && (
                      <span className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-lg border border-white/10">
                        {project.images.length} Images
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">
                        {project.category || (project.type === 'web' ? 'Web Development' : 'Mobile App')}
                      </span>
                      <h3 className="text-xl font-bold text-white mt-1 group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-white/60 text-sm mt-2 line-clamp-2">{project.description}</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                        {project.technologies &&
                          project.technologies.slice(0, 3).map((tech, idx) => (
                            <span key={idx} className="bg-white/10 text-white/80 text-[10px] px-2.5 py-0.5 rounded-full">
                              {tech}
                            </span>
                          ))}
                      </div>

                      <span className="text-xs text-blue-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        View Details <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Project Detail Gallery Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-white/10 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl relative my-8">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black text-white p-2 rounded-full border border-white/20 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Slider Header */}
            <div className="relative h-80 sm:h-96 bg-black flex items-center justify-center overflow-hidden">
              {selectedProject.images && selectedProject.images.length > 0 ? (
                <img
                  src={selectedProject.images[activeImageIndex]}
                  alt={selectedProject.title}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-white/40">No images to display</div>
              )}

              {/* Prev / Next controls */}
              {selectedProject.images && selectedProject.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) => (prev === 0 ? selectedProject.images.length - 1 : prev - 1))
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black p-2 rounded-full text-white border border-white/10"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) => (prev === selectedProject.images.length - 1 ? 0 : prev + 1))
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black p-2 rounded-full text-white border border-white/10"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Image Thumbnails */}
            {selectedProject.images && selectedProject.images.length > 1 && (
              <div className="flex gap-2 p-4 bg-slate-950/80 border-b border-white/10 overflow-x-auto justify-center">
                {selectedProject.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx ? 'border-blue-500 scale-105' : 'border-transparent opacity-60'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Project Details */}
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">
                    {selectedProject.category || selectedProject.type}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">{selectedProject.title}</h2>
                </div>
                {selectedProject.client && (
                  <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-right">
                    <span className="text-[10px] text-white/50 block">CLIENT</span>
                    <span className="text-sm font-semibold text-white/90">{selectedProject.client}</span>
                  </div>
                )}
              </div>

              <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6">
                {selectedProject.description}
              </p>

              {/* Technologies */}
              {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-white/40 uppercase mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, idx) => (
                      <span key={idx} className="bg-blue-500/10 text-blue-300 border border-blue-500/20 text-xs px-3 py-1 rounded-full font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
