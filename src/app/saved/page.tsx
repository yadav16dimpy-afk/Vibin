'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bookmark,
  Sparkles,
  Search,
  Filter,
  Plus,
  Trash2,
  ExternalLink,
  Calendar,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { VIBES } from '@/data/vibes';

export default function SavedDesignsPage() {
  const { projects, deleteProject, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVibeFilter, setSelectedVibeFilter] = useState<string>('all');

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.vibe_style.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVibe =
      selectedVibeFilter === 'all' || project.vibe_style === selectedVibeFilter;
    return matchesSearch && matchesVibe;
  });

  return (
    <div className="min-h-screen bg-cream-50 py-8 px-4 sm:px-6 lg:px-8 text-charcoal-900 pb-28 md:pb-12">
      <div className="mx-auto max-w-5xl">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-cream-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta-600">
              Your Personal Vibe Board
            </span>
            <h1 className="mt-1 text-2xl font-extrabold text-charcoal-900 sm:text-3xl">
              Saved Designs
            </h1>
            <p className="mt-1 text-xs text-charcoal-600">
              Explore and manage all room makeover concepts created with Vibin.
            </p>
          </div>

          <Link
            href="/create"
            className="inline-flex items-center gap-2 rounded-full bg-terracotta-500 px-5 py-2.5 text-xs font-bold text-white shadow-soft hover:bg-terracotta-600 transition self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" />
            <span>New Makeover</span>
          </Link>
        </div>

        {/* Search and Vibe Filter */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-charcoal-400" />
            <input
              type="text"
              placeholder="Search by room title or style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-cream-300 bg-white pl-10 pr-4 py-2.5 text-xs text-charcoal-900 placeholder:text-charcoal-400 focus:border-terracotta-500 focus:outline-none shadow-soft"
            />
          </div>

          <div className="w-full sm:w-auto">
            <select
              value={selectedVibeFilter}
              onChange={(e) => setSelectedVibeFilter(e.target.value)}
              className="w-full rounded-2xl border border-cream-300 bg-white px-4 py-2.5 text-xs font-semibold text-charcoal-700 focus:border-terracotta-500 focus:outline-none shadow-soft"
            >
              <option value="all">All Vibe Styles</option>
              {VIBES.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Projects Grid or Empty State */}
        {filteredProjects.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const vibeMeta = VIBES.find((v) => v.id === project.vibe_style);
              const formattedDate = new Date(project.created_at).toLocaleDateString('en-IN', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });

              return (
                <div
                  key={project.id}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-cream-200 bg-white shadow-soft transition-all hover:shadow-card"
                >
                  {/* Thumbnail Previews: Original & Generated */}
                  <div className="relative h-48 w-full overflow-hidden bg-charcoal-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.generated_image_url}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Original room inset preview */}
                    <div className="absolute bottom-2.5 right-2.5 h-14 w-14 overflow-hidden rounded-xl border-2 border-white shadow-md bg-black">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.original_image_url}
                        alt="Original"
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute bottom-0 inset-x-0 bg-black/60 text-[8px] text-white text-center font-bold">
                        Before
                      </span>
                    </div>

                    {/* Status Pill */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-bold text-charcoal-800 backdrop-blur-sm shadow-sm capitalize">
                      <span className="h-1.5 w-1.5 rounded-full bg-sage-500" />
                      <span>{project.status || 'Saved'}</span>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="absolute top-2.5 right-2.5 rounded-full bg-black/50 p-1.5 text-white hover:bg-black/80 transition"
                      title="Delete saved project"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Project Details */}
                  <div className="flex flex-1 flex-col justify-between p-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta-600">
                          {vibeMeta?.name || project.vibe_style}
                        </span>
                        <span className="text-[10px] text-charcoal-400 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formattedDate}
                        </span>
                      </div>

                      <h3 className="mt-1 text-sm font-bold text-charcoal-900 line-clamp-1">
                        {project.title}
                      </h3>

                      <div className="mt-2 flex items-center gap-2 text-xs">
                        <span className="rounded-md bg-cream-100 px-2 py-0.5 text-[11px] font-semibold text-charcoal-700">
                          Budget: {project.custom_budget_inr ? `₹${project.custom_budget_inr.toLocaleString('en-IN')}` : 'Under ₹5,000'}
                        </span>
                        <span className="rounded-md bg-sage-50 px-2 py-0.5 text-[11px] font-semibold text-sage-700">
                          Renter friendly
                        </span>
                      </div>
                    </div>

                    {/* Action link to open results */}
                    <div className="mt-4 pt-3 border-t border-cream-100 flex items-center justify-between">
                      <Link
                        href={`/results/${project.id}`}
                        className="text-xs font-bold text-terracotta-600 hover:text-terracotta-700 flex items-center gap-1"
                      >
                        <span>View Makeover</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>

                      <Link
                        href="/checklist"
                        className="text-xs font-semibold text-charcoal-600 hover:text-charcoal-900"
                      >
                        Shopping List
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State as specified in prompt */
          <div className="mt-16 rounded-3xl border border-dashed border-cream-300 bg-white p-12 text-center shadow-soft">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-terracotta-100 text-terracotta-600 shadow-soft">
              <Sparkles className="h-8 w-8" />
            </div>

            <h3 className="mt-4 text-xl font-bold text-charcoal-900">
              Your future favourite room starts here.
            </h3>
            <p className="mt-1 text-xs text-charcoal-500 max-w-sm mx-auto">
              You haven’t saved any room transformations yet. Take a quick photo of your hostel or flat to preview a new aesthetic.
            </p>

            <div className="mt-6">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 rounded-full bg-terracotta-500 px-6 py-3 text-xs font-bold text-white shadow-soft hover:bg-terracotta-600 transition"
              >
                <Plus className="h-4 w-4" />
                <span>Create Your First Makeover</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
