'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Bed,
  Sofa,
  Building2,
  BookOpen,
  Sun,
  UtensilsCrossed,
  IndianRupee,
  Shield,
  Package,
  Heart,
  Laptop,
  Users,
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { RoomType, BudgetTier } from '@/lib/supabase/types';

export default function OnboardingPage() {
  const router = useRouter();
  const { updateDraft, setLanguage, language, showToast } = useApp();

  const [step, setStep] = useState(1);

  // Selections
  const [selectedRoom, setSelectedRoom] = useState<RoomType>('hostel_room');
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>(['Low budget', 'Rental friendly']);
  const [selectedBudget, setSelectedBudget] = useState<BudgetTier>('under_5000');
  const [selectedLang, setSelectedLang] = useState<'en' | 'hinglish'>(language);

  // Screen 1: Room options
  const roomOptions: Array<{ id: RoomType; label: string; icon: any; desc: string }> = [
    { id: 'hostel_room', label: 'Hostel Room', icon: Building2, desc: 'Shared metal cots, strict wardens, compact storage' },
    { id: 'pg_room', label: 'PG Room', icon: Building2, desc: 'Paying guest accommodation with existing wardrobe & bed' },
    { id: 'bedroom', label: 'Bedroom', icon: Bed, desc: 'Personal bedroom in rented flat or family home' },
    { id: 'study_area', label: 'Study Area', icon: Laptop, desc: 'Desk nook, study corner, or work-from-home space' },
    { id: 'living_room', label: 'Living Room', icon: Sofa, desc: 'Main common area, seating, TV wall & coffee corner' },
    { id: 'balcony', label: 'Balcony', icon: Sun, desc: 'Chai nook, green plants, fairy lights & seating' },
    { id: 'kitchen', label: 'Kitchen', icon: UtensilsCrossed, desc: 'Compact rental kitchen counters and open shelving' },
  ];

  // Screen 2: Priorities
  const priorityOptions = [
    { id: 'Low budget', label: 'Low budget', icon: IndianRupee, desc: 'Smart dupes under ₹5,000' },
    { id: 'Rental friendly', label: 'Rental friendly', icon: Shield, desc: 'Zero drilling, 100% deposit safe' },
    { id: 'More storage', label: 'More storage', icon: Package, desc: 'Vertical organizers & under-bed solutions' },
    { id: 'Cozy vibe', label: 'Cozy vibe', icon: Heart, desc: 'Warm 2700K fairy lights & soft textures' },
    { id: 'Better study setup', label: 'Better study setup', icon: BookOpen, desc: 'Ergonomic desk, cable control & task light' },
    { id: 'Better for guests', label: 'Better for guests', icon: Users, desc: 'Floor cushions, warm hospitality seating' },
  ];

  // Screen 3: Budget
  const budgetOptions: Array<{ id: BudgetTier; label: string; desc: string; popular?: boolean }> = [
    { id: 'under_5000', label: 'Under ₹5,000', desc: 'Hostel & student favorite. High-impact lighting and textiles.', popular: true },
    { id: '5000_10000', label: '₹5,000–₹10,000', desc: 'Adds rugs, desk organizers, wall art, and ambient lamps.' },
    { id: '10000_25000', label: '₹10,000–₹25,000', desc: 'Complete 1BHK room transformation with movable furniture.' },
    { id: '25000_50000', label: '₹25,000–₹50,000', desc: 'Premium styling, full wardrobe organization, and accents.' },
    { id: '50000_plus', label: '₹50,000+', desc: 'Complete luxury interior revamp for new apartment owners.' },
  ];

  // Screen 4: Languages
  const languages = [
    { id: 'en', label: 'English', sub: 'Standard English', active: true },
    { id: 'hinglish', label: 'Hinglish', sub: 'Apna casual blend', active: true },
    { id: 'hi', label: 'हिंदी (Hindi)', sub: 'Coming soon', active: false },
    { id: 'ta', label: 'தமிழ் (Tamil)', sub: 'Coming soon', active: false },
    { id: 'te', label: 'తెలుగు (Telugu)', sub: 'Coming soon', active: false },
    { id: 'mr', label: 'मराठी (Marathi)', sub: 'Coming soon', active: false },
    { id: 'bn', label: 'বাংলা (Bengali)', sub: 'Coming soon', active: false },
    { id: 'kn', label: 'ಕನ್ನಡ (Kannada)', sub: 'Coming soon', active: false },
    { id: 'ml', label: 'മലയാളം (Malayalam)', sub: 'Coming soon', active: false },
  ];

  const togglePriority = (p: string) => {
    if (selectedPriorities.includes(p)) {
      setSelectedPriorities(selectedPriorities.filter((item) => item !== p));
    } else {
      setSelectedPriorities([...selectedPriorities, p]);
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Complete Onboarding: Sync to AppContext and redirect to Create
      setLanguage(selectedLang);
      updateDraft({
        roomType: selectedRoom,
        budgetRange: selectedBudget,
        rules: {
          renterFriendly: selectedPriorities.includes('Rental friendly'),
          keepExistingFurniture: true,
          noDrilling: selectedPriorities.includes('Rental friendly'),
          smallSpaceOptimized: selectedPriorities.includes('More storage'),
          petFriendly: false,
        },
      });
      showToast('Preferences saved! Let’s upload your room 📸', 'success');
      router.push('/create');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="min-h-[85vh] bg-cream-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl">
        {/* Step Indicator Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-semibold text-charcoal-500">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 hover:text-charcoal-800 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
            <span>Step {step} of 4</span>
          </div>

          <div className="mt-3 flex gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  s <= step ? 'bg-terracotta-500' : 'bg-cream-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* SCREEN 1: What are you redesigning? */}
        {step === 1 && (
          <div className="animate-fade-in">
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta-600">
              Personalize Your Experience
            </span>
            <h1 className="mt-2 text-2xl font-extrabold text-charcoal-900 sm:text-3xl">
              What are you redesigning?
            </h1>
            <p className="mt-1 text-xs text-charcoal-600">
              Pick the space you want to transform first. You can always change this later.
            </p>

            <div className="mt-6 space-y-2.5">
              {roomOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedRoom === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedRoom(opt.id)}
                    className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all ${
                      isSelected
                        ? 'border-terracotta-500 bg-white ring-2 ring-terracotta-400 shadow-card'
                        : 'border-cream-300 bg-white/70 hover:bg-white hover:border-cream-400'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl transition ${
                          isSelected ? 'bg-terracotta-500 text-white' : 'bg-cream-100 text-charcoal-700'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-charcoal-900">{opt.label}</div>
                        <div className="text-[11px] text-charcoal-500">{opt.desc}</div>
                      </div>
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
          </div>
        )}

        {/* SCREEN 2: What matters most? */}
        {step === 2 && (
          <div className="animate-fade-in">
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta-600">
              Your Constraints
            </span>
            <h1 className="mt-2 text-2xl font-extrabold text-charcoal-900 sm:text-3xl">
              What matters most to you?
            </h1>
            <p className="mt-1 text-xs text-charcoal-600">
              Select all that apply. Vibin uses these rules to filter decor suggestions.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {priorityOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedPriorities.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() => togglePriority(opt.id)}
                    className={`flex flex-col items-start rounded-2xl border p-4 text-left transition-all ${
                      isSelected
                        ? 'border-terracotta-500 bg-white ring-2 ring-terracotta-400 shadow-card'
                        : 'border-cream-300 bg-white/70 hover:bg-white hover:border-cream-400'
                    }`}
                  >
                    <div className="flex w-full items-center justify-between">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                          isSelected ? 'bg-terracotta-500 text-white' : 'bg-cream-100 text-charcoal-700'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                          isSelected
                            ? 'border-terracotta-500 bg-terracotta-500 text-white'
                            : 'border-cream-300'
                        }`}
                      >
                        {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>
                    </div>
                    <span className="mt-3 text-sm font-bold text-charcoal-900">{opt.label}</span>
                    <span className="mt-0.5 text-[11px] text-charcoal-500">{opt.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* SCREEN 3: Choose your budget */}
        {step === 3 && (
          <div className="animate-fade-in">
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta-600">
              Indian Rupee Range
            </span>
            <h1 className="mt-2 text-2xl font-extrabold text-charcoal-900 sm:text-4xl">
              Choose your budget
            </h1>
            <p className="mt-1 text-xs text-charcoal-600">
              We design realistic makeovers tailored to what you actually want to spend.
            </p>

            <div className="mt-6 space-y-3">
              {budgetOptions.map((opt) => {
                const isSelected = selectedBudget === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedBudget(opt.id)}
                    className={`relative flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all ${
                      isSelected
                        ? 'border-terracotta-500 bg-white ring-2 ring-terracotta-400 shadow-card'
                        : 'border-cream-300 bg-white/70 hover:bg-white hover:border-cream-400'
                    }`}
                  >
                    {opt.popular && (
                      <span className="absolute -top-2.5 right-4 rounded-full bg-terracotta-500 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
                        Most Popular
                      </span>
                    )}
                    <div>
                      <div className="text-sm font-bold text-charcoal-900">{opt.label}</div>
                      <div className="text-[11px] text-charcoal-500">{opt.desc}</div>
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
          </div>
        )}

        {/* SCREEN 4: Choose your language */}
        {step === 4 && (
          <div className="animate-fade-in">
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta-600">
              Language Preference
            </span>
            <h1 className="mt-2 text-2xl font-extrabold text-charcoal-900 sm:text-3xl">
              Choose your language
            </h1>
            <p className="mt-1 text-xs text-charcoal-600">
              Vibin speaks the language of young India. English & Hinglish are active now.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {languages.map((lang) => {
                const isSelected = selectedLang === lang.id;
                return (
                  <button
                    key={lang.id}
                    disabled={!lang.active}
                    onClick={() => lang.active && setSelectedLang(lang.id as 'en' | 'hinglish')}
                    className={`flex items-center justify-between rounded-2xl border p-3.5 text-left transition-all ${
                      !lang.active
                        ? 'opacity-50 cursor-not-allowed bg-cream-100/50 border-cream-200'
                        : isSelected
                        ? 'border-terracotta-500 bg-white ring-2 ring-terracotta-400 shadow-card'
                        : 'border-cream-300 bg-white/70 hover:bg-white'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold text-charcoal-900">{lang.label}</div>
                      <div className="text-[11px] text-charcoal-500">
                        {lang.active ? lang.sub : <span className="text-terracotta-600 font-semibold">{lang.sub}</span>}
                      </div>
                    </div>
                    {lang.active && (
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                          isSelected
                            ? 'border-terracotta-500 bg-terracotta-500 text-white'
                            : 'border-cream-300'
                        }`}
                      >
                        {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Sticky Continue Footer */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleNext}
            className="flex items-center gap-2 rounded-full bg-terracotta-500 px-8 py-3.5 text-sm font-bold text-white shadow-card hover:bg-terracotta-600 hover:scale-[1.02] active:scale-95 transition"
          >
            <span>{step === 4 ? 'Upload Room Photo' : 'Continue'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
