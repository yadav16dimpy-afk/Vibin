'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, X, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { RoomProject } from '@/lib/supabase/types';
import { VIBES } from '@/data/vibes';

export default function GeneratingPage() {
  const router = useRouter();
  const { draft, deductCredit, saveProject, showToast, user } = useApp();

  const [progress, setProgress] = useState(12);
  const [activeMessageIndex, setActiveMessageIndex] = useState(0);
  const [isCancelled, setIsCancelled] = useState(false);

  // Rotating messages required by prompt
  const messages = [
    'Understanding your room layout...',
    'Finding your best vibe...',
    'Designing within your budget...',
    'Adding renter-friendly details...',
    'Creating your makeover...',
  ];

  // Rotate messages and progress
  useEffect(() => {
    if (isCancelled) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) {
          clearInterval(interval);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 6;
        return Math.min(prev + increment, 98);
      });
    }, 600);

    const messageInterval = setInterval(() => {
      setActiveMessageIndex((prev) => (prev + 1) % messages.length);
    }, 1800);

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, [isCancelled, messages.length]);

  // Handle completion
  useEffect(() => {
    if (progress >= 100 && !isCancelled) {
      // Deduct credit
      deductCredit();

      // Find selected vibe
      const vibeObj = VIBES.find((v) => v.id === draft.vibeStyle) || VIBES[0];

      // Create new project
      const newProjectId = 'proj_' + Math.random().toString(36).substring(2, 9);
      const newProject: RoomProject = {
        id: newProjectId,
        user_id: user?.id || 'user_demo',
        title: `My ${vibeObj.name} Makeover`,
        room_type: draft.roomType,
        room_size: draft.roomSize,
        furnishing_status: draft.furnishingStatus,
        vibe_style: draft.vibeStyle,
        budget_range: draft.budgetRange,
        custom_budget_inr: draft.customBudgetInr || 4500,
        custom_notes: draft.customNotes,
        renter_friendly: draft.rules.renterFriendly,
        keep_existing_furniture: draft.rules.keepExistingFurniture,
        no_drilling: draft.rules.noDrilling,
        small_space_optimized: draft.rules.smallSpaceOptimized,
        pet_friendly: draft.rules.petFriendly,
        status: 'generated',
        original_image_url:
          draft.photoPreviewUrl ||
          'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
        generated_image_url: vibeObj.sampleImageUrl,
        style_match_score: 97,
        budget_match_score: 95,
        renter_friendly_score: 99,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      saveProject(newProject);
      showToast('AI Room Makeover ready! ✨', 'success');

      // Small delay before transition for satisfaction
      const timer = setTimeout(() => {
        router.push(`/results/${newProjectId}`);
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [progress, isCancelled]);

  const handleCancel = () => {
    setIsCancelled(true);
    showToast('Generation cancelled', 'info');
    router.push('/create');
  };

  const selectedVibe = VIBES.find((v) => v.id === draft.vibeStyle) || VIBES[0];

  return (
    <div className="flex min-h-[85vh] flex-col items-center justify-center bg-cream-50 px-4 py-12 text-charcoal-900">
      <div className="w-full max-w-md rounded-3xl border border-cream-200 bg-white p-8 text-center shadow-elevated">
        {/* Animated Scanner / Pulse Illustration with Official Mark */}
        <div className="relative mx-auto flex h-28 w-28 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-terracotta-100 animate-ping opacity-30" />
          <div className="absolute inset-2 rounded-full bg-mustard-100 animate-pulse opacity-50" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white border-2 border-terracotta-300 shadow-card p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/vibin-mark.png"
              alt="Vibin AI Makeover"
              className="h-full w-full object-contain animate-pulse"
            />
          </div>
        </div>

        {/* Dynamic Rotating Status Message */}
        <div className="mt-8">
          <h2 className="text-xl font-bold tracking-tight text-charcoal-900 transition-all duration-300">
            {messages[activeMessageIndex]}
          </h2>
          <p className="mt-1 text-xs text-charcoal-500">
            Applying <span className="font-semibold text-terracotta-600">{selectedVibe.name}</span> aesthetic to your space
          </p>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="mt-6">
          <div className="flex justify-between text-xs font-semibold text-charcoal-600 mb-1.5">
            <span>Generating Design Concept</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-cream-200">
            <div
              className="h-full bg-gradient-to-r from-terracotta-500 to-mustard-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Renter Guarantee Badge */}
        <div className="mt-6 rounded-2xl bg-cream-100/70 p-3 text-left border border-cream-200 flex items-start gap-2.5">
          <ShieldCheck className="h-4 w-4 text-sage-600 shrink-0 mt-0.5" />
          <span className="text-[11px] text-charcoal-600 leading-tight">
            <strong>Renter Shield:</strong> Preserving original walls and fixed furniture. Curating removable lighting, rugs, and decor.
          </span>
        </div>

        {/* Mandatory AI Concept Note */}
        <p className="mt-5 text-[11px] leading-relaxed text-charcoal-400">
          Note: AI results are design concepts. Real colours, dimensions and products may vary.
        </p>

        {/* Cancel Button */}
        <div className="mt-6">
          <button
            onClick={handleCancel}
            className="rounded-full border border-cream-300 bg-white px-6 py-2.5 text-xs font-semibold text-charcoal-600 hover:bg-cream-100 transition"
          >
            Cancel Makeover
          </button>
        </div>
      </div>
    </div>
  );
}
