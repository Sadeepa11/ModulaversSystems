'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit3, Image as ImageIcon, Folder, Globe, Smartphone, Sparkles, Check, X, Upload, Loader2, CloudUpload, CheckCircle2 } from 'lucide-react';

export default function AdminPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    type: 'web',
    category: '',
    client: '',
    description: '',
    technologies: '',
    featured: false
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
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
      githubLink: '',
      featured: false
    });
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
      githubLink: project.githubLink || '',
      featured: !!project.featured
    });
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
      body.append('githubLink', formData.githubLink || '');
      body.append('featured', formData.featured ? 'true' : 'false');

      selectedFiles.forEach((file) => {
        body.append('images', file);
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

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 sm:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-semibold mb-2 border border-blue-500/20">
              <Sparkles className="w-3.5 h-3.5" /> Modulavers Control Center
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Project Management Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">
              Add, update, or remove projects. Images will be organized automatically into <code className="text-blue-400 bg-slate-900 px-1.5 py-0.5 rounded">public/images/projects/web</code> or <code className="text-blue-400 bg-slate-900 px-1.5 py-0.5 rounded">app</code>.
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-2.5 rounded-xl shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" /> Add New Project
          </button>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-500">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800">
            <Folder className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-slate-300">No Projects Found</h3>
            <p className="text-slate-500 text-sm mt-1 mb-6">Click "Add New Project" above to create your first real project entry.</p>
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-lg text-sm transition-all"
            >
              <Plus className="w-4 h-4" /> Add Project Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden flex flex-col hover:border-slate-700 transition-all group"
              >
                {/* Image Preview */}
                <div className="h-48 bg-slate-950 relative overflow-hidden flex items-center justify-center border-b border-slate-800">
                  {proj.images && proj.images.length > 0 ? (
                    <img
                      src={proj.images[0]}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-slate-600">
                      <ImageIcon className="w-10 h-10 mb-1" />
                      <span className="text-xs">No images</span>
                    </div>
                  )}

                  {/* Type Badge */}
                  <span
                    className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 backdrop-blur-md shadow-md ${
                      proj.type === 'web'
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {proj.type === 'web' ? <Globe className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
                    {proj.type.toUpperCase()}
                  </span>

                  {proj.images && proj.images.length > 1 && (
                    <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-0.5 rounded-md backdrop-blur-md">
                      +{proj.images.length - 1} more
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-slate-400 text-xs line-clamp-2 mb-4">{proj.description}</p>
                  </div>

                  <div>
                    {/* Tech Tags */}
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {proj.technologies.slice(0, 3).map((tech, idx) => (
                          <span key={idx} className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded-md">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                      <span className="text-slate-500">{proj.createdAt || 'Recent'}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(proj)}
                          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors"
                          title="Edit Project"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(proj.id)}
                          className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 rounded-lg transition-colors"
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

        {/* Add / Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative">
              {/* Animated Submitting Overlay */}
              <AnimatePresence>
                {submitting && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center"
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
                      Uploading & Saving Project...
                    </motion.h3>
                    <p className="text-slate-400 text-xs max-w-xs leading-relaxed">
                      Uploading images directly to Cloudinary and storing project details...
                    </p>

                    <div className="flex items-center gap-2 mt-6 bg-slate-900 px-4 py-2 rounded-full border border-slate-800 text-xs text-blue-400 font-medium">
                      <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                      Processing Request
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
                <h2 className="text-xl font-semibold text-white">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h2>
                <button
                  onClick={() => !submitting && setIsModalOpen(false)}
                  disabled={submitting}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Project Title *</label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g. Modulavers Website"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Folder / Slug Name *</label>
                    <input
                      type="text"
                      name="slug"
                      required
                      value={formData.slug}
                      onChange={handleInputChange}
                      placeholder="e.g. modulavers-website"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Type */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Project Type *</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="web">Web (web/)</option>
                      <option value="app">App (app/)</option>
                    </select>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      placeholder="e.g. E-Commerce"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Client */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Client Name</label>
                    <input
                      type="text"
                      name="client"
                      value={formData.client}
                      onChange={handleInputChange}
                      placeholder="e.g. Modulavers Inc"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Description</label>
                  <textarea
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter short description of the project..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Technologies (comma separated)</label>
                  <input
                    type="text"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleInputChange}
                    placeholder="React, Next.js, Tailwind CSS, Node.js"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Project Links (Optional) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Live Project URL <span className="text-slate-500 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="url"
                      name="projectLink"
                      value={formData.projectLink}
                      onChange={handleInputChange}
                      placeholder="https://example.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      GitHub Repository URL <span className="text-slate-500 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="url"
                      name="githubLink"
                      value={formData.githubLink}
                      onChange={handleInputChange}
                      placeholder="https://github.com/user/repository"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Upload Images (Uploaded directly to Cloudinary)
                  </label>
                  <div className="border-2 border-dashed border-slate-800 hover:border-slate-700 bg-slate-950 rounded-xl p-4 text-center cursor-pointer relative">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                    <p className="text-xs text-slate-400 font-medium">Click or drag & drop project images here</p>
                    <p className="text-[10px] text-slate-500 mt-1">Images are automatically uploaded to Cloudinary</p>
                  </div>
                </div>

                {/* Image Previews */}
                {previewUrls.length > 0 && (
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2">Selected / Existing Images:</label>
                    <div className="flex flex-wrap gap-2">
                      {previewUrls.map((url, idx) => (
                        <div key={idx} className="w-16 h-16 rounded-lg overflow-hidden border border-slate-700 bg-slate-950">
                          <img src={url} alt="preview" className="w-full h-full object-cover" />
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
                    className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center gap-2 px-5 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors shadow-lg disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving to Cloudinary...
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
