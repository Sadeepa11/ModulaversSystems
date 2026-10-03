'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Trash2,
  Edit3,
  Image as ImageIcon,
  Folder,
  Globe,
  Smartphone,
  Sparkles,
  Check,
  X,
  Upload,
  Loader2,
  CloudUpload,
  Star,
  Search,
  Filter,
  ExternalLink,
  Layers
} from 'lucide-react';

export default function AdminPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'web', 'app'

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    type: 'web',
    category: '',
    client: '',
    description: '',
    technologies: '',
    projectLink: '',
    featured: false
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatusText, setUploadStatusText] = useState('');

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
      console.error('Failed to fetch projects', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'title' && !editingProject) {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    }
  };

  // Real-time Cloudinary image upload one-by-one with progress bar
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploadingImages(true);
    setUploadProgress(0);

    const folder = `modulavers/projects/${formData.type}/${formData.slug || 'project'}`;
    const newUrls = [...uploadedImageUrls];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setUploadStatusText(`Uploading image ${i + 1} of ${files.length}: ${file.name}`);

      try {
        const fileFormData = new FormData();
        fileFormData.append('file', file);
        fileFormData.append('folder', folder);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: fileFormData,
        });

        const data = await res.json();
        if (data.success && data.url) {
          newUrls.push(data.url);
          setUploadedImageUrls([...newUrls]);
        }
      } catch (uploadErr) {
        console.error('Error uploading file:', file.name, uploadErr);
      }

      const progress = Math.round(((i + 1) / files.length) * 100);
      setUploadProgress(progress);
    }

    setUploadingImages(false);
    setUploadStatusText('');
  };

  const removeImage = (indexToRemove) => {
    setUploadedImageUrls((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const setPrimaryCover = (indexToMakePrimary) => {
    if (indexToMakePrimary === 0) return;
    setUploadedImageUrls((prev) => {
      const copy = [...prev];
      const [selected] = copy.splice(indexToMakePrimary, 1);
      return [selected, ...copy];
    });
  };

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      slug: '',
      type: 'web',
      category: '',
      client: '',
      description: '',
      technologies: '',
      projectLink: '',
      featured: false
    });
    setUploadedImageUrls([]);
    setSelectedFiles([]);
    setPreviewUrls([]);
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      slug: project.slug,
      type: project.type,
      category: project.category || '',
      client: project.client || '',
      description: project.description || '',
      technologies: (project.technologies || []).join(', '),
      projectLink: project.projectLink || '',
      featured: !!project.featured
    });
    setUploadedImageUrls(project.images || []);
    setSelectedFiles([]);
    setPreviewUrls(project.images || []);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const body = new FormData();
      body.append('title', formData.title);
      body.append('slug', formData.slug);
      body.append('type', formData.type);
      body.append('category', formData.category);
      body.append('client', formData.client);
      body.append('description', formData.description);
      body.append('technologies', formData.technologies);
      body.append('projectLink', formData.projectLink || '');
      body.append('featured', formData.featured ? 'true' : 'false');

      uploadedImageUrls.forEach((url) => {
        body.append('images', url);
      });

      let res;
      if (editingProject) {
        res = await fetch(`/api/projects/${editingProject.id}`, {
          method: 'PUT',
          body
        });
      } else {
        res = await fetch('/api/projects', {
          method: 'POST',
          body
        });
      }

      const result = await res.json();
      if (result.success) {
        setIsModalOpen(false);
        fetchProjects();
      } else {
        alert('Error: ' + result.error);
      }
    } catch (err) {
      alert('Failed to save project: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE'
      });
      const result = await res.json();
      if (result.success) {
        fetchProjects();
      } else {
        alert('Error: ' + result.error);
      }
    } catch (err) {
      alert('Failed to delete project: ' + err.message);
    }
  };

  // Filtered projects computation
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.category && project.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (project.client && project.client.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = filterType === 'all' || project.type === filterType;

    return matchesSearch && matchesType;
  });

  const webCount = projects.filter((p) => p.type === 'web').length;
  const appCount = projects.filter((p) => p.type === 'app').length;

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-2 pb-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="relative bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-xl overflow-hidden shadow-2xl">
          {/* Subtle Ambient Background Light */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-semibold mb-3 border border-blue-500/20 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" /> Modulavers Control Center
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                Project Dashboard
              </h1>
              <p className="text-slate-400 text-sm mt-2 max-w-2xl leading-relaxed">
                Manage your system portfolio projects. Upload screenshots directly to Cloudinary and monitor live project showcases.
              </p>
            </div>

            <button
              onClick={openAddModal}
              className="flex items-center gap-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold px-6 py-3 rounded-2xl shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 scale-100 hover:scale-105 active:scale-95 text-sm shrink-0"
            >
              <Plus className="w-5 h-5" /> Add New Project
            </button>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-800/80">
            <div className="bg-slate-950/50 border border-slate-800/60 rounded-2xl p-4 flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-bold text-white">{projects.length}</span>
                <p className="text-slate-400 text-xs font-medium">Total Projects</p>
              </div>
            </div>

            <div className="bg-slate-950/50 border border-slate-800/60 rounded-2xl p-4 flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-bold text-white">{webCount}</span>
                <p className="text-slate-400 text-xs font-medium">Web Applications</p>
              </div>
            </div>

            <div className="bg-slate-950/50 border border-slate-800/60 rounded-2xl p-4 flex items-center gap-4 col-span-2 sm:col-span-1">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-bold text-white">{appCount}</span>
                <p className="text-slate-400 text-xs font-medium">Mobile Apps</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Search Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-900/40 border border-slate-800/60 p-3 sm:p-4 rounded-2xl backdrop-blur-md">
          {/* Type Filter Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All Projects', count: projects.length },
              { id: 'web', label: 'Web Applications', count: webCount },
              { id: 'app', label: 'Mobile Apps', count: appCount }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shrink-0 ${
                  filterType === tab.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/50'
                }`}
              >
                {tab.label}
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/10 text-white/90">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search projects by title..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-500 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            <span className="text-sm font-medium">Loading portfolio projects...</span>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800/80 max-w-xl mx-auto p-8">
            <Folder className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-200">No Projects Found</h3>
            <p className="text-slate-400 text-xs mt-1 mb-6 leading-relaxed">
              {searchTerm
                ? `No projects match your search term "${searchTerm}".`
                : 'Click "Add New Project" above to create your first portfolio entry.'}
            </p>
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-2.5 rounded-xl text-xs transition-all shadow-lg"
            >
              <Plus className="w-4 h-4" /> Add Project Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-slate-900/60 rounded-3xl border border-slate-800/80 overflow-hidden flex flex-col hover:border-slate-700 transition-all duration-300 group hover:shadow-2xl hover:shadow-blue-500/5 backdrop-blur-xl"
              >
                {/* Image Preview Container */}
                <div className="h-52 bg-slate-950 relative overflow-hidden flex items-center justify-center border-b border-slate-800/80">
                  {proj.images && proj.images.length > 0 ? (
                    <img
                      src={proj.images[0]}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-slate-600">
                      <ImageIcon className="w-10 h-10 mb-1" />
                      <span className="text-xs">No images uploaded</span>
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

                  {/* Type Badge */}
                  <span
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 backdrop-blur-md shadow-lg border ${
                      proj.type === 'web'
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    }`}
                  >
                    {proj.type === 'web' ? <Globe className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
                    {proj.type.toUpperCase()}
                  </span>

                  {/* Image Counter Badge */}
                  {proj.images && proj.images.length > 1 && (
                    <span className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-0.5 rounded-lg border border-white/10">
                      {proj.images.length} Photos
                    </span>
                  )}
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {proj.category && (
                      <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider block mb-1">
                        {proj.category}
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-slate-400 text-xs line-clamp-2 mt-2 leading-relaxed">
                      {proj.description || 'No description provided.'}
                    </p>
                  </div>

                  <div>
                    {/* Tech Badges */}
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {proj.technologies.slice(0, 4).map((tech, idx) => (
                          <span
                            key={idx}
                            className="bg-slate-800/80 border border-slate-700/50 text-slate-300 text-[10px] px-2.5 py-0.5 rounded-full font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                      {proj.projectLink ? (
                        <a
                          href={proj.projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 hover:underline"
                        >
                          Live App <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-[11px] text-slate-500 font-medium">Internal Project</span>
                      )}

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(proj)}
                          className="p-2 bg-slate-800/80 hover:bg-blue-600/20 text-slate-300 hover:text-blue-400 border border-slate-700/60 rounded-xl transition-all"
                          title="Edit Project"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(proj.id)}
                          className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/20 rounded-xl transition-all"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add / Edit Project Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative my-auto">
              
              {/* Animated Submitting Overlay */}
              <AnimatePresence>
                {submitting && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center"
                  >
                    <div className="relative mb-6">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="w-20 h-20 border-4 border-blue-500/20 border-t-blue-500 rounded-full"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <CloudUpload className="w-8 h-8 text-blue-400 animate-bounce" />
                      </div>
                    </div>

                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xl font-bold text-white mb-2"
                    >
                      Saving Project...
                    </motion.h3>
                    <p className="text-slate-400 text-xs max-w-xs leading-relaxed">
                      Uploading images directly to Cloudinary and saving details...
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h2 className="text-lg font-bold text-white">
                    {editingProject ? 'Edit Project Entry' : 'Add New Project'}
                  </h2>
                </div>
                <button
                  onClick={() => !submitting && setIsModalOpen(false)}
                  disabled={submitting}
                  className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[78vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Project Title *</label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g. Modulavers Website"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Folder / Slug Name *</label>
                    <input
                      type="text"
                      name="slug"
                      required
                      value={formData.slug}
                      onChange={handleInputChange}
                      placeholder="e.g. modulavers-website"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Type */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Project Type *</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option value="web">Web Application</option>
                      <option value="app">Mobile App</option>
                    </select>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Category</label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      placeholder="e.g. E-Commerce"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  {/* Client */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Client Name</label>
                    <input
                      type="text"
                      name="client"
                      value={formData.client}
                      onChange={handleInputChange}
                      placeholder="e.g. Modulavers Inc"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Description</label>
                  <textarea
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter detailed description of the project..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Technologies (comma separated)</label>
                  <input
                    type="text"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleInputChange}
                    placeholder="React, Next.js, Tailwind CSS, Node.js"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Live Project URL */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Live Project URL <span className="text-slate-500 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="url"
                    name="projectLink"
                    value={formData.projectLink}
                    onChange={handleInputChange}
                    placeholder="https://example.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* File Upload Zone */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Upload Images (Direct to Cloudinary)
                  </label>

                  <div className="border-2 border-dashed border-slate-800 hover:border-blue-500/50 bg-slate-950/60 hover:bg-slate-950 rounded-2xl p-5 text-center cursor-pointer relative transition-all group">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      disabled={uploadingImages}
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    />
                    <Upload className="w-8 h-8 text-blue-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-xs text-slate-300 font-medium">Click or drag & drop project images to upload</p>
                    <p className="text-[10px] text-slate-500 mt-1">Uploaded in real-time to Cloudinary storage</p>
                  </div>
                </div>

                {/* Upload Progress Bar */}
                {uploadingImages && (
                  <div className="bg-slate-950 border border-blue-500/30 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-blue-400 font-medium">
                      <span className="flex items-center gap-2 truncate max-w-[80%]">
                        <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                        {uploadStatusText || 'Uploading to Cloudinary...'}
                      </span>
                      <span className="font-bold">{uploadProgress}%</span>
                    </div>

                    <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-indigo-500 h-full transition-all duration-300 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Image Previews & Cover Selection */}
                {uploadedImageUrls.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-slate-300">
                        Uploaded Images ({uploadedImageUrls.length}):
                      </label>
                      <span className="text-[10px] text-amber-400 font-medium flex items-center gap-1 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> First image (★) is Main Cover
                      </span>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mt-3">
                      {uploadedImageUrls.map((url, idx) => (
                        <div
                          key={idx}
                          className={`relative rounded-xl overflow-hidden bg-slate-950 border transition-all group ${
                            idx === 0
                              ? 'border-2 border-amber-400 ring-2 ring-amber-400/20'
                              : 'border-slate-800 hover:border-slate-600'
                          }`}
                        >
                          <div className="h-24 w-full">
                            <img src={url} alt={`Uploaded ${idx + 1}`} className="w-full h-full object-cover" />
                          </div>

                          {idx === 0 ? (
                            <div className="absolute top-1 left-1 bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded-md text-[9px] font-extrabold flex items-center gap-0.5 shadow-md">
                              <Star className="w-2.5 h-2.5 fill-slate-950" /> COVER
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setPrimaryCover(idx)}
                              className="absolute top-1 left-1 bg-slate-900/90 hover:bg-amber-500 text-slate-300 hover:text-slate-950 px-1.5 py-0.5 rounded-md text-[9px] font-bold flex items-center gap-0.5 opacity-90 group-hover:opacity-100 transition-all border border-slate-700"
                              title="Set as Main Cover Image"
                            >
                              <Star className="w-2.5 h-2.5" /> Make Cover
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute top-1 right-1 bg-red-600/90 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                            title="Remove Image"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Modal Footer */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : editingProject ? (
                      'Update Project'
                    ) : (
                      'Save Project'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
