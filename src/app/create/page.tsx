'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Camera,
  Upload,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  ShieldCheck,
  Image as ImageIcon,
  X,
  AlertCircle,
  HelpCircle,
  Info,
  Maximize2,
  Lock,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { VIBES } from '@/data/vibes';
import { RoomType, RoomSize, FurnishingStatus, BudgetTier, VibeStyleId } from '@/lib/supabase/types';
import { uploadRoomImage } from '@/lib/supabase/client';

function CreateMakeoverContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefillId = searchParams.get('prefill');

  const {
    draft,
    updateDraft,
    updateDraftRules,
    credits,
    deductCredit,
    openBuyCreditsModal,
    showToast,
    user,
  } = useApp();

  const [currentStep, setCurrentStep] = useState(1);
  const [imagePreview, setImagePreview] = useState<string | null>(draft.photoPreviewUrl);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Handle prefill if passed via query params
  useEffect(() => {
    if (prefillId) {
      if (prefillId === 'pg-room-bengaluru') {
        setImagePreview('https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80');
        updateDraft({
          roomType: 'hostel_room',
          vibeStyle: 'cozy',
          budgetRange: 'under_5000',
        });
      } else if (prefillId === 'living-room-pune') {
        setImagePreview('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80');
        updateDraft({
          roomType: 'living_room',
          vibeStyle: 'modern_indian',
          budgetRange: '5000_10000',
        });
      }
    }
  }, [prefillId]);

  // Handle file selection
  const handleFile = (file: File) => {
    setUploadError(null);

    // Validate size (max 15MB)
    if (file.size > 15 * 1024 * 1024) {
      setUploadError('Image size exceeds 15MB. Please choose a smaller photo.');
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);
    updateDraft({
      photoFile: file,
      photoPreviewUrl: objectUrl,
    });
    showToast('Photo uploaded successfully! 📸', 'success');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Sample room loader helper
  const loadSampleRoom = (sampleUrl: string, roomType: RoomType) => {
    setImagePreview(sampleUrl);
    updateDraft({
      photoPreviewUrl: sampleUrl,
      roomType,
    });
    showToast('Sample room loaded for testing ✨', 'info');
  };

  const removePhoto = () => {
    setImagePreview(null);
    updateDraft({ photoFile: null, photoPreviewUrl: null });
  };

  const validateStep = () => {
    if (currentStep === 1) {
      if (!imagePreview) {
        setUploadError('Please take a photo or select an image of your room to continue.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Step 5: Start AI generation
      if (credits <= 0) {
        openBuyCreditsModal();
        return;
      }
      router.push('/generating');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
  };

  const budgetOptions: Array<{ id: BudgetTier; label: string; desc: string }> = [
    { id: 'under_5000', label: 'Under ₹5,000', desc: 'Hostel friendly lightings, bedsheets & desk organizers' },
    { id: '5000_10000', label: '₹5,000–₹10,000', desc: 'Adds rugs, ambient accent lamps & curated wall art' },
    { id: '10000_25000', label: '₹10,000–₹25,000', desc: 'Full room upgrade with modular movable furniture' },
    { id: '25000_50000', label: '₹25,000–₹50,000', desc: 'Premium redesign with luxury textiles and fittings' },
    { id: '50000_plus', label: '₹50,000+', desc: 'Complete apartment setup for new homeowners' },
  ];

  return (
    <div className="min-h-[90vh] bg-cream-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Progress Bar & Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-semibold text-charcoal-500">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 hover:text-charcoal-800 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
            <span>Step {currentStep} of 5</span>
          </div>

          <div className="mt-2.5 flex gap-1.5 sm:gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  s <= currentStep ? 'bg-terracotta-500' : 'bg-cream-200'
                }`}
              />
            ))}
          </div>

          {/* Step titles indicator */}
          <div className="mt-3 flex justify-between text-[11px] font-medium text-charcoal-400">
            <span className={currentStep === 1 ? 'font-bold text-terracotta-600' : ''}>1. Photo</span>
            <span className={currentStep === 2 ? 'font-bold text-terracotta-600' : ''}>2. Details</span>
            <span className={currentStep === 3 ? 'font-bold text-terracotta-600' : ''}>3. Vibe</span>
            <span className={currentStep === 4 ? 'font-bold text-terracotta-600' : ''}>4. Budget</span>
            <span className={currentStep === 5 ? 'font-bold text-terracotta-600' : ''}>5. Rules</span>
          </div>
        </div>

        {/* =========================================================================
            STEP 1: UPLOAD ROOM PHOTO
        ========================================================================= */}
        {currentStep === 1 && (
          <div className="animate-fade-in">
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta-600">
              Step 1 of 5
            </span>
            <h1 className="mt-1 text-2xl font-extrabold text-charcoal-900 sm:text-3xl">
              Upload Your Room Photo
            </h1>
            <p className="mt-1 text-xs text-charcoal-600">
              Take a photo standing in a corner facing the center of your room for the best makeover view.
            </p>

            {/* Hidden Input Elements */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/jpeg,image/png,image/webp,image/heic"
              className="hidden"
              onChange={handleInputChange}
            />
            <input
              type="file"
              ref={cameraInputRef}
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleInputChange}
            />

            {/* Error Message Alert */}
            {uploadError && (
              <div className="mt-4 flex items-center gap-2 rounded-2xl bg-dustypink-100 p-3 text-xs text-dustypink-700">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}

            {/* Upload Area / Image Preview */}
            <div className="mt-5">
              {!imagePreview ? (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed p-8 text-center transition-all ${
                    isDragging
                      ? 'border-terracotta-500 bg-terracotta-50'
                      : 'border-cream-300 bg-white/70 hover:border-terracotta-300 hover:bg-white'
                  }`}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-terracotta-100 text-terracotta-600 shadow-soft">
                    <Camera className="h-7 w-7" />
                  </div>

                  <h3 className="mt-4 text-base font-bold text-charcoal-900">
                    Snap or upload your room photo
                  </h3>
                  <p className="mt-1 text-xs text-charcoal-500 max-w-xs">
                    JPG, PNG, HEIC up to 15MB. Drag & drop on desktop.
                  </p>

                  {/* Buttons for Mobile & Desktop */}
                  <div className="mt-6 flex flex-col sm:flex-row gap-2.5 w-full max-w-xs">
                    {/* Camera Button (Mobile friendly) */}
                    <button
                      onClick={() => cameraInputRef.current?.click()}
                      className="flex items-center justify-center gap-2 rounded-full bg-terracotta-500 py-3 px-4 text-xs font-bold text-white shadow-soft hover:bg-terracotta-600 active:scale-95 transition"
                    >
                      <Camera className="h-4 w-4" />
                      <span>Take Photo</span>
                    </button>

                    {/* Gallery Button */}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center justify-center gap-2 rounded-full border border-cream-300 bg-white py-3 px-4 text-xs font-semibold text-charcoal-800 hover:bg-cream-100 transition"
                    >
                      <Upload className="h-4 w-4 text-charcoal-600" />
                      <span>Upload from Gallery</span>
                    </button>
                  </div>

                  {/* Quick test with sample rooms */}
                  <div className="mt-6 pt-5 border-t border-cream-200 w-full text-center">
                    <span className="text-[11px] font-semibold text-charcoal-400 uppercase tracking-wider">
                      Or try with a sample Indian room:
                    </span>
                    <div className="mt-2.5 flex flex-wrap justify-center gap-2">
                      <button
                        onClick={() =>
                          loadSampleRoom(
                            'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80',
                            'hostel_room'
                          )
                        }
                        className="rounded-full border border-cream-300 bg-cream-100 px-3 py-1 text-[11px] font-medium text-charcoal-700 hover:bg-cream-200 transition"
                      >
                        Sample PG Room
                      </button>
                      <button
                        onClick={() =>
                          loadSampleRoom(
                            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
                            'living_room'
                          )
                        }
                        className="rounded-full border border-cream-300 bg-cream-100 px-3 py-1 text-[11px] font-medium text-charcoal-700 hover:bg-cream-200 transition"
                      >
                        Sample Living Room
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Uploaded Preview State */
                <div className="relative overflow-hidden rounded-3xl border border-cream-200 bg-white p-3 shadow-elevated">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-charcoal-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagePreview}
                      alt="Room preview"
                      className="h-full w-full object-cover"
                    />

                    {/* Remove / Retake Button */}
                    <button
                      onClick={removePhoto}
                      className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md hover:bg-black transition"
                    >
                      <X className="h-3.5 w-3.5" />
                      <span>Retake</span>
                    </button>

                    <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                      Ready for AI makeover ✨
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between px-2">
                    <span className="text-xs font-semibold text-charcoal-700">Photo uploaded</span>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs font-semibold text-terracotta-600 hover:text-terracotta-700"
                    >
                      Replace photo
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Image Upload Consent */}
            <div className="mt-5 rounded-2xl bg-white p-4 border border-cream-200 text-xs text-charcoal-600 flex items-start gap-3 shadow-soft">
              <ShieldCheck className="h-5 w-5 text-sage-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="text-charcoal-800">Your privacy is protected:</strong> Your photo is used to create your room design. You can delete it anytime.
              </p>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 2: SELECT ROOM DETAILS
        ========================================================================= */}
        {currentStep === 2 && (
          <div className="animate-fade-in space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-terracotta-600">
                Step 2 of 5
              </span>
              <h1 className="mt-1 text-2xl font-extrabold text-charcoal-900 sm:text-3xl">
                Room Details
              </h1>
              <p className="mt-1 text-xs text-charcoal-600">
                Help Vibin scale furniture proportions and layout for your room.
              </p>
            </div>

            {/* Room Type Dropdown */}
            <div className="rounded-2xl border border-cream-200 bg-white p-5 shadow-soft">
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700">
                Room Type
              </label>
              <select
                value={draft.roomType}
                onChange={(e) => updateDraft({ roomType: e.target.value as RoomType })}
                className="mt-2 w-full rounded-xl border border-cream-300 bg-cream-50 px-3.5 py-3 text-sm font-semibold text-charcoal-900 focus:border-terracotta-500 focus:outline-none"
              >
                <option value="hostel_room">Hostel Room</option>
                <option value="pg_room">PG Accommodation Room</option>
                <option value="bedroom">Bedroom</option>
                <option value="living_room">Living Room</option>
                <option value="study_area">Study Nook / Home Office</option>
                <option value="balcony">Balcony / Chai Spot</option>
                <option value="kitchen">Compact Rental Kitchen</option>
              </select>
            </div>

            {/* Room Size Radio Cards */}
            <div className="rounded-2xl border border-cream-200 bg-white p-5 shadow-soft">
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-3">
                Room Size
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'small' as RoomSize, label: 'Small', desc: '< 100 sq ft (Hostel/PG)' },
                  { id: 'medium' as RoomSize, label: 'Medium', desc: '100 - 180 sq ft (1BHK)' },
                  { id: 'large' as RoomSize, label: 'Large', desc: '> 180 sq ft (Master bed)' },
                ].map((size) => {
                  const isSelected = draft.roomSize === size.id;
                  return (
                    <button
                      key={size.id}
                      onClick={() => updateDraft({ roomSize: size.id })}
                      className={`rounded-xl border p-3 text-center transition-all ${
                        isSelected
                          ? 'border-terracotta-500 bg-terracotta-50 text-terracotta-800 ring-2 ring-terracotta-300 font-bold'
                          : 'border-cream-300 bg-white text-charcoal-700 hover:border-cream-400'
                      }`}
                    >
                      <span className="block text-sm font-bold">{size.label}</span>
                      <span className="block text-[10px] text-charcoal-500 mt-0.5">{size.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Current Room Condition */}
            <div className="rounded-2xl border border-cream-200 bg-white p-5 shadow-soft">
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-3">
                Current Condition
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'empty' as FurnishingStatus, label: 'Empty', desc: 'Blank slate' },
                  { id: 'partly_furnished' as FurnishingStatus, label: 'Partly Furnished', desc: 'Bed / Wardrobe only' },
                  { id: 'fully_furnished' as FurnishingStatus, label: 'Fully Furnished', desc: 'Needs styling & vibe' },
                ].map((cond) => {
                  const isSelected = draft.furnishingStatus === cond.id;
                  return (
                    <button
                      key={cond.id}
                      onClick={() => updateDraft({ furnishingStatus: cond.id })}
                      className={`rounded-xl border p-3 text-center transition-all ${
                        isSelected
                          ? 'border-terracotta-500 bg-terracotta-50 text-terracotta-800 ring-2 ring-terracotta-300 font-bold'
                          : 'border-cream-300 bg-white text-charcoal-700 hover:border-cream-400'
                      }`}
                    >
                      <span className="block text-xs font-bold">{cond.label}</span>
                      <span className="block text-[10px] text-charcoal-500 mt-0.5">{cond.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional Wishlist / What you want to change */}
            <div className="rounded-2xl border border-cream-200 bg-white p-5 shadow-soft">
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                Tell us what you want to change (Optional)
              </label>
              <textarea
                value={draft.customNotes}
                onChange={(e) => updateDraft({ customNotes: e.target.value })}
                rows={3}
                placeholder="e.g. Hide the harsh tube light with warm fairy lights, add a study rug, and make the bed feel cozy like a Pinterest photo."
                className="w-full rounded-xl border border-cream-300 bg-cream-50 p-3 text-xs text-charcoal-900 placeholder:text-charcoal-400 focus:border-terracotta-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 3: CHOOSE YOUR VIBE
        ========================================================================= */}
        {currentStep === 3 && (
          <div className="animate-fade-in space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-terracotta-600">
                Step 3 of 5
              </span>
              <h1 className="mt-1 text-2xl font-extrabold text-charcoal-900 sm:text-3xl">
                Choose Your Vibe
              </h1>
              <p className="mt-1 text-xs text-charcoal-600">
                Tap on an aesthetic. Vibin applies these colours, lighting moods, and textures to your room.
              </p>
            </div>

            {/* Visual Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {VIBES.map((vibe) => {
                const isSelected = draft.vibeStyle === vibe.id;
                return (
                  <div
                    key={vibe.id}
                    onClick={() => updateDraft({ vibeStyle: vibe.id })}
                    className={`group relative cursor-pointer overflow-hidden rounded-2xl border transition-all ${
                      isSelected
                        ? 'border-terracotta-500 bg-white ring-2 ring-terracotta-400 shadow-card'
                        : 'border-cream-300 bg-white/80 hover:border-cream-400 hover:bg-white'
                    }`}
                  >
                    {/* Image Preview Thumbnail */}
                    <div className="relative h-28 w-full overflow-hidden bg-charcoal-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={vibe.sampleImageUrl}
                        alt={vibe.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                      {vibe.badge && (
                        <span className="absolute top-2.5 left-2.5 rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-bold text-charcoal-800 shadow-sm backdrop-blur-sm">
                          {vibe.badge}
                        </span>
                      )}

                      <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white">
                        <span className="text-sm font-bold drop-shadow-sm">{vibe.name}</span>
                        {isSelected && (
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-terracotta-500 text-white">
                            <Check className="h-3 w-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Vibe Details */}
                    <div className="p-3">
                      <p className="text-[11px] text-charcoal-600 leading-tight">
                        {vibe.description}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {vibe.keywords.slice(0, 3).map((kw, i) => (
                          <span
                            key={i}
                            className="rounded-md bg-cream-100 px-1.5 py-0.5 text-[9px] font-medium text-charcoal-600"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 4: CHOOSE BUDGET
        ========================================================================= */}
        {currentStep === 4 && (
          <div className="animate-fade-in space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-terracotta-600">
                Step 4 of 5
              </span>
              <h1 className="mt-1 text-2xl font-extrabold text-charcoal-900 sm:text-3xl">
                Choose Your Budget
              </h1>
              <p className="mt-1 text-xs text-charcoal-600">
                Vibin curates decor items that fit strictly within your selected limit.
              </p>
            </div>

            {/* Budget Presets */}
            <div className="space-y-2.5">
              {budgetOptions.map((opt) => {
                const isSelected = draft.budgetRange === opt.id && !draft.customBudgetInr;
                return (
                  <button
                    key={opt.id}
                    onClick={() => updateDraft({ budgetRange: opt.id, customBudgetInr: null })}
                    className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all ${
                      isSelected
                        ? 'border-terracotta-500 bg-white ring-2 ring-terracotta-400 shadow-card'
                        : 'border-cream-300 bg-white/70 hover:bg-white hover:border-cream-400'
                    }`}
                  >
                    <div>
                      <span className="block text-sm font-bold text-charcoal-900">{opt.label}</span>
                      <span className="block text-[11px] text-charcoal-500 mt-0.5">{opt.desc}</span>
                    </div>
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                        isSelected
                          ? 'border-terracotta-500 bg-terracotta-500 text-white'
                          : 'border-cream-300'
                      }`}
                    >
                      {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Optional Custom Budget Input */}
            <div className="rounded-2xl border border-cream-200 bg-white p-5 shadow-soft">
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-2">
                Or enter a custom amount (₹ INR)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-sm font-bold text-charcoal-500">₹</span>
                <input
                  type="number"
                  placeholder="e.g. 7500"
                  value={draft.customBudgetInr || ''}
                  onChange={(e) => {
                    const val = e.target.value ? parseInt(e.target.value, 10) : null;
                    updateDraft({ customBudgetInr: val });
                  }}
                  className="w-full rounded-xl border border-cream-300 bg-cream-50 pl-8 pr-4 py-2.5 text-sm font-semibold text-charcoal-900 focus:border-terracotta-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 5: ROOM RULES
        ========================================================================= */}
        {currentStep === 5 && (
          <div className="animate-fade-in space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-terracotta-600">
                Step 5 of 5
              </span>
              <h1 className="mt-1 text-2xl font-extrabold text-charcoal-900 sm:text-3xl">
                Room Rules & Constraints
              </h1>
              <p className="mt-1 text-xs text-charcoal-600">
                Protect your security deposit and tailor the makeover to your rental rules.
              </p>
            </div>

            {/* Toggles Container */}
            <div className="space-y-3">
              {/* Toggle 1: Renter / Hostel Friendly */}
              <div className="rounded-2xl border border-cream-300 bg-white p-4 shadow-soft">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-charcoal-900">Renter / Hostel Friendly</h3>
                    <p className="text-[11px] text-sage-600 font-semibold">100% Landlord & Warden Approved</p>
                  </div>
                  <button
                    onClick={() => updateDraftRules({ renterFriendly: !draft.rules.renterFriendly })}
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      draft.rules.renterFriendly ? 'bg-terracotta-500' : 'bg-cream-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        draft.rules.renterFriendly ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {draft.rules.renterFriendly && (
                  <div className="mt-3 rounded-xl bg-sage-50/70 p-3 text-xs text-sage-800 leading-relaxed border border-sage-200">
                    <p>
                      <strong>Vibin Guarantee:</strong> Vibin will keep walls, floors, tiles, doors and fixed furniture unchanged. It will focus on removable decor, lighting, rugs, curtains, bedding, storage and movable furniture.
                    </p>
                  </div>
                )}
              </div>

              {/* Toggle 2: Keep Existing Furniture */}
              <div className="flex items-center justify-between rounded-2xl border border-cream-300 bg-white p-4 shadow-soft">
                <div>
                  <h3 className="text-sm font-bold text-charcoal-900">Keep Existing Furniture</h3>
                  <p className="text-[11px] text-charcoal-500">Don’t discard heavy beds, desks or closets</p>
                </div>
                <button
                  onClick={() =>
                    updateDraftRules({ keepExistingFurniture: !draft.rules.keepExistingFurniture })
                  }
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    draft.rules.keepExistingFurniture ? 'bg-terracotta-500' : 'bg-cream-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      draft.rules.keepExistingFurniture ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Toggle 3: No Drilling */}
              <div className="flex items-center justify-between rounded-2xl border border-cream-300 bg-white p-4 shadow-soft">
                <div>
                  <h3 className="text-sm font-bold text-charcoal-900">No Drilling</h3>
                  <p className="text-[11px] text-charcoal-500">Command strips, free-standing poles & suction only</p>
                </div>
                <button
                  onClick={() => updateDraftRules({ noDrilling: !draft.rules.noDrilling })}
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    draft.rules.noDrilling ? 'bg-terracotta-500' : 'bg-cream-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      draft.rules.noDrilling ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Toggle 4: Small Space Optimized */}
              <div className="flex items-center justify-between rounded-2xl border border-cream-300 bg-white p-4 shadow-soft">
                <div>
                  <h3 className="text-sm font-bold text-charcoal-900">Small Space Optimized</h3>
                  <p className="text-[11px] text-charcoal-500">Vertical storage & clutter-minimizing layouts</p>
                </div>
                <button
                  onClick={() =>
                    updateDraftRules({ smallSpaceOptimized: !draft.rules.smallSpaceOptimized })
                  }
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    draft.rules.smallSpaceOptimized ? 'bg-terracotta-500' : 'bg-cream-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      draft.rules.smallSpaceOptimized ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Toggle 5: Pet Friendly (Coming Soon) */}
              <div className="flex items-center justify-between rounded-2xl border border-cream-200 bg-cream-100/50 p-4 opacity-75">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-charcoal-700">Pet Friendly</h3>
                    <span className="rounded-full bg-mustard-100 px-2 py-0.5 text-[9px] font-bold text-mustard-700">
                      Coming soon
                    </span>
                  </div>
                  <p className="text-[11px] text-charcoal-400">Non-toxic indoor plants and scratch-resistant rugs</p>
                </div>
                <div className="h-6 w-11 rounded-full bg-cream-300 opacity-50 cursor-not-allowed">
                  <span className="inline-block h-4 w-4 translate-x-1 transform rounded-full bg-white" />
                </div>
              </div>
            </div>

            {/* Credits Info */}
            <div className="rounded-2xl bg-terracotta-50 p-3.5 border border-terracotta-200 flex items-center justify-between text-xs text-terracotta-800">
              <span className="font-semibold">
                Will consume 1 Makeover Credit (Balance: {credits})
              </span>
              <span className="text-[11px] text-terracotta-600">Simulated generation</span>
            </div>
          </div>
        )}

        {/* Navigation Buttons (Bottom) */}
        <div className="mt-8 flex items-center justify-between gap-3 pt-4 border-t border-cream-200">
          <button
            onClick={handleBack}
            className="rounded-full border border-cream-300 bg-white px-5 py-3 text-xs font-semibold text-charcoal-700 hover:bg-cream-100 transition"
          >
            {currentStep === 1 ? 'Cancel' : 'Previous'}
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 rounded-full bg-terracotta-500 px-7 py-3 text-sm font-bold text-white shadow-card hover:bg-terracotta-600 active:scale-95 transition"
          >
            {currentStep === 5 ? (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Generate Makeover ✨</span>
              </>
            ) : (
              <>
                <span>Continue</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CreateMakeoverPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-charcoal-500">Loading makeover builder...</div>}>
      <CreateMakeoverContent />
    </Suspense>
  );
}
