'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
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
  Layers,
  ArrowLeft,
  LayoutDashboard,
  Home,
  Menu,
  Table as TableIcon,
  Grid as GridIcon
} from 'lucide-react';

export default function AdminPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Search & Filter & View Mode State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'web', 'app'
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'

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
    <div className="h-screen w-full flex bg-gray-50 -mt-16 overflow-hidden font-sans">
      
      {/* Sidebar (Main Dark Theme Style - Max Height 100vh) */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 w-64 h-screen max-h-screen bg-slate-950 text-white border-r border-slate-800 flex flex-col justify-between p-5 overflow-y-auto transform transition-transform duration-300 md:translate-x-0 shrink-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6">
          {/* Logo Brand Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold shadow-lg shadow-blue-500/20">
                M
              </div>
              <div>
                <h2 className="text-base font-bold text-white leading-none">Modulavers</h2>
                <span className="text-[11px] text-blue-400 font-medium">Control Center</span>
              </div>
            </div>
            {/* Mobile close button */}
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Menu Links */}
          <div className="space-y-1.5 pt-4 border-t border-slate-800/80">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-3 block mb-2">
              Portfolio Management
            </span>

            <button
              onClick={() => {
                setFilterType('all');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                filterType === 'all'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4" /> All Projects
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300">
                {projects.length}
              </span>
            </button>

            <button
              onClick={() => {
                setFilterType('web');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                filterType === 'web'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-purple-400" /> Web Applications
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300">
                {webCount}
              </span>
            </button>

            <button
              onClick={() => {
                setFilterType('app');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                filterType === 'app'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Smartphone className="w-4 h-4 text-emerald-400" /> Mobile Apps
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300">
                {appCount}
              </span>
            </button>
          </div>

          {/* Quick Action Button */}
          <div className="pt-4 border-t border-slate-800/80">
            <button
              onClick={openAddModal}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-2.5 rounded-xl shadow-lg shadow-blue-500/20 text-xs transition-all"
            >
              <Plus className="w-4 h-4" /> Add New Project
            </button>
          </div>
        </div>

        {/* Sidebar Footer Link */}
        <div className="pt-4 border-t border-slate-800">
          <Link
            href="/"
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition-all"
          >
            <Home className="w-4 h-4 text-blue-400" /> Back to Main Site
          </Link>
        </div>
      </aside>

      {/* Main Content Area (White Background Design - Independent Scroll) */}
      <div className="flex-1 flex flex-col min-w-0 bg-gray-50 h-screen overflow-y-auto">
        
        {/* Top Header Bar for Main Content */}
        <header className="bg-white border-b border-gray-200/80 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">Project Management</h1>
              <p className="text-xs text-gray-500">Manage all website and mobile application portfolios</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl text-xs shadow-md transition-all"
            >
              <Plus className="w-4 h-4" /> Create Project
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          
          {/* Quick Stats Grid (White Card Design) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900">{projects.length}</span>
                <p className="text-xs font-medium text-gray-500">Total Portfolio Projects</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl border border-purple-100">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900">{webCount}</span>
                <p className="text-xs font-medium text-gray-500">Web Applications</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900">{appCount}</span>
                <p className="text-xs font-medium text-gray-500">Mobile Applications</p>
              </div>
            </div>
          </div>

          {/* Search, Filter & View Mode Controls Bar */}
          <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
              {[
                { id: 'all', label: 'All Projects' },
                { id: 'web', label: 'Web Applications' },
                { id: 'app', label: 'Mobile Apps' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterType(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                    filterType === tab.id
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* View Mode Toggle Buttons */}
              <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200 shrink-0">
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === 'table'
                      ? 'bg-white text-blue-600 shadow-sm font-bold'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                  title="Table View"
                >
                  <TableIcon className="w-3.5 h-3.5" /> Table
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white text-blue-600 shadow-sm font-bold'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                  title="Grid View"
                >
                  <GridIcon className="w-3.5 h-3.5" /> Grid
                </button>
              </div>

              {/* Search Input Box */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search projects..."
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-10 pr-4 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Projects View Section */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              <span className="text-xs font-medium">Loading portfolio projects...</span>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200/80 p-8 shadow-sm">
              <Folder className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-800">No Projects Found</h3>
              <p className="text-xs text-gray-500 mt-1 mb-5">
                {searchTerm
                  ? `No projects matching "${searchTerm}".`
                  : 'Start by creating your first portfolio project.'}
              </p>
              <button
                onClick={openAddModal}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-xl text-xs transition-all shadow-md"
              >
                <Plus className="w-4 h-4" /> Add Project Now
              </button>
            </div>
          ) : viewMode === 'table' ? (
            /* Data Table View */
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/80 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      <th className="py-3.5 px-4 sm:px-6">Preview</th>
                      <th className="py-3.5 px-4 sm:px-6">Project Title & Client</th>
                      <th className="py-3.5 px-4 sm:px-6">Type</th>
                      <th className="py-3.5 px-4 sm:px-6">Technologies</th>
                      <th className="py-3.5 px-4 sm:px-6">Live URL</th>
                      <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-xs">
                    {filteredProjects.map((proj) => (
                      <tr key={proj.id} className="hover:bg-blue-50/30 transition-colors group">
                        {/* Image Thumbnail */}
                        <td className="py-3.5 px-4 sm:px-6">
                          <div className="relative w-16 h-12 rounded-xl bg-gray-100 overflow-hidden border border-gray-200 shrink-0">
                            {proj.images && proj.images.length > 0 ? (
                              <img src={proj.images[0]} alt={proj.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <ImageIcon className="w-5 h-5" />
                              </div>
                            )}
                            {proj.images && proj.images.length > 1 && (
                              <span className="absolute bottom-0.5 right-0.5 bg-black/70 text-white text-[9px] px-1 rounded font-medium">
                                +{proj.images.length - 1}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Title & Info */}
                        <td className="py-3.5 px-4 sm:px-6">
                          <span className="font-bold text-gray-900 text-sm block group-hover:text-blue-600 transition-colors">
                            {proj.title}
                          </span>
                          <div className="flex items-center gap-2 mt-0.5 text-gray-500 text-[11px]">
                            {proj.category && <span className="font-medium text-blue-600">{proj.category}</span>}
                            {proj.client && <span>• Client: {proj.client}</span>}
                          </div>
                        </td>

                        {/* Type Badge */}
                        <td className="py-3.5 px-4 sm:px-6 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                              proj.type === 'web'
                                ? 'bg-purple-100 text-purple-700 border-purple-200'
                                : 'bg-emerald-100 text-emerald-700 border-emerald-200'
                            }`}
                          >
                            {proj.type === 'web' ? <Globe className="w-3 h-3" /> : <Smartphone className="w-3 h-3" />}
                            {proj.type.toUpperCase()}
                          </span>
                        </td>

                        {/* Technologies */}
                        <td className="py-3.5 px-4 sm:px-6">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {proj.technologies && proj.technologies.length > 0 ? (
                              proj.technologies.map((tech, idx) => (
                                <span key={idx} className="bg-gray-100 text-gray-700 text-[10px] px-2 py-0.5 rounded-md font-medium border border-gray-200">
                                  {tech}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-400 text-[11px]">-</span>
                            )}
                          </div>
                        </td>

                        {/* Live Link */}
                        <td className="py-3.5 px-4 sm:px-6 whitespace-nowrap">
                          {proj.projectLink ? (
                            <a
                              href={proj.projectLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                            >
                              Visit <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-gray-400 text-[11px]">No link</span>
                          )}
                        </td>

                        {/* Action Buttons */}
                        <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditModal(proj)}
                              className="p-1.5 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 rounded-lg transition-colors border border-gray-200"
                              title="Edit Project"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(proj.id)}
                              className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors border border-rose-200"
                              title="Delete Project"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Cards Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden flex flex-col hover:border-gray-300 hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Image Preview Container */}
                  <div className="h-48 bg-gray-100 relative overflow-hidden flex items-center justify-center border-b border-gray-100">
                    {proj.images && proj.images.length > 0 ? (
                      <img
                        src={proj.images[0]}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-gray-400">
                        <ImageIcon className="w-10 h-10 mb-1" />
                        <span className="text-xs">No images</span>
                      </div>
                    )}

                    {/* Badge */}
                    <span
                      className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 shadow-sm border ${
                        proj.type === 'web'
                          ? 'bg-purple-100 text-purple-700 border-purple-200'
                          : 'bg-emerald-100 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {proj.type === 'web' ? <Globe className="w-3 h-3" /> : <Smartphone className="w-3 h-3" />}
                      {proj.type.toUpperCase()}
                    </span>

                    {/* Image Counter */}
                    {proj.images && proj.images.length > 1 && (
                      <span className="absolute bottom-3 right-3 bg-gray-900/80 text-white text-[10px] font-medium px-2 py-0.5 rounded-md">
                        {proj.images.length} Photos
                      </span>
                    )}
                  </div>

                  {/* Details Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {proj.category && (
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                          {proj.category}
                        </span>
                      )}
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-gray-500 text-xs line-clamp-2 mt-1 leading-relaxed">
                        {proj.description || 'No description provided.'}
                      </p>
                    </div>

                    <div>
                      {/* Tech Pills */}
                      {proj.technologies && proj.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {proj.technologies.slice(0, 3).map((tech, idx) => (
                            <span
                              key={idx}
                              className="bg-gray-100 border border-gray-200 text-gray-700 text-[10px] px-2.5 py-0.5 rounded-full font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Action Links */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        {proj.projectLink ? (
                          <a
                            href={proj.projectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 hover:underline"
                          >
                            Live App <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-[10px] text-gray-400 font-medium">Internal</span>
                        )}

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => openEditModal(proj)}
                            className="p-2 bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-lg transition-colors"
                            title="Edit Project"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(proj.id)}
                            className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors"
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
        </main>
      </div>

      {/* Add / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white border border-gray-200 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative my-auto">
            
            {/* Animated Submitting Overlay */}
            <AnimatePresence>
              {submitting && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center"
                >
                  <div className="relative mb-6">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <CloudUpload className="w-6 h-6 text-blue-600 animate-bounce" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-1">Saving Project...</h3>
                  <p className="text-gray-500 text-xs">Uploading images and saving details to Cloudinary...</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/80">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h2 className="text-base font-bold text-gray-900">
                  {editingProject ? 'Edit Project Entry' : 'Add New Project'}
                </h2>
              </div>
              <button
                onClick={() => !submitting && setIsModalOpen(false)}
                disabled={submitting}
                className="text-gray-400 hover:text-gray-700 p-2 rounded-xl hover:bg-gray-200/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Project Title *</label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. Modulavers Website"
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Folder / Slug Name *</label>
                  <input
                    type="text"
                    name="slug"
                    required
                    value={formData.slug}
                    onChange={handleInputChange}
                    placeholder="e.g. modulavers-website"
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Project Type *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                  >
                    <option value="web">Web Application</option>
                    <option value="app">Mobile App</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="e.g. E-Commerce"
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Client Name</label>
                  <input
                    type="text"
                    name="client"
                    value={formData.client}
                    onChange={handleInputChange}
                    placeholder="e.g. Modulavers Inc"
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter project description..."
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Technologies (comma separated)</label>
                <input
                  type="text"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleInputChange}
                  placeholder="React, Next.js, Tailwind CSS, Node.js"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Live Project URL <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="url"
                  name="projectLink"
                  value={formData.projectLink}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                />
              </div>

              {/* Upload Zone */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Upload Images (Direct to Cloudinary)
                </label>
                <div className="border-2 border-dashed border-gray-300 hover:border-blue-500 bg-gray-50 hover:bg-white rounded-2xl p-5 text-center cursor-pointer relative transition-all group">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    disabled={uploadingImages}
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                  <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-xs text-gray-700 font-medium">Click or drag & drop images to upload</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Images upload automatically to Cloudinary</p>
                </div>
              </div>

              {/* Progress Bar */}
              {uploadingImages && (
                <div className="bg-gray-50 border border-blue-200 rounded-2xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-blue-700 font-medium">
                    <span className="flex items-center gap-2 truncate max-w-[80%]">
                      <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                      {uploadStatusText || 'Uploading to Cloudinary...'}
                    </span>
                    <span className="font-bold">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-600 h-full transition-all duration-300 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Uploaded Previews */}
              {uploadedImageUrls.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-gray-700">
                      Uploaded Images ({uploadedImageUrls.length}):
                    </label>
                    <span className="text-[10px] text-amber-600 font-medium flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> First image (★) is Cover
                    </span>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {uploadedImageUrls.map((url, idx) => (
                      <div
                        key={idx}
                        className={`relative rounded-xl overflow-hidden bg-gray-100 border transition-all group ${
                          idx === 0
                            ? 'border-2 border-amber-500 ring-2 ring-amber-200'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        <div className="h-20 w-full">
                          <img src={url} alt={`Uploaded ${idx + 1}`} className="w-full h-full object-cover" />
                        </div>

                        {idx === 0 ? (
                          <div className="absolute top-1 left-1 bg-amber-500 text-white px-1.5 py-0.5 rounded text-[8px] font-extrabold flex items-center gap-0.5 shadow">
                            <Star className="w-2.5 h-2.5 fill-white" /> COVER
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setPrimaryCover(idx)}
                            className="absolute top-1 left-1 bg-white/90 hover:bg-amber-500 text-gray-700 hover:text-white px-1.5 py-0.5 rounded text-[8px] font-bold flex items-center gap-0.5 opacity-90 group-hover:opacity-100 transition-all border border-gray-300"
                            title="Make Cover Image"
                          >
                            <Star className="w-2.5 h-2.5" /> Make Cover
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow"
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
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-md disabled:opacity-50"
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
  );
}
