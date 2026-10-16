'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Coins,
  Sparkles,
  Shield,
  Trash2,
  Bell,
  Globe,
  Moon,
  LogOut,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lock,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function ProfilePage() {
  const {
    user,
    isLoggedIn,
    openLoginModal,
    logout,
    credits,
    planType,
    openBuyCreditsModal,
    language,
    setLanguage,
    showToast,
  } = useApp();

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleDeleteAllData = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('vibin_projects');
      localStorage.removeItem('vibin_saved_items');
      localStorage.removeItem('vibin_user');
      localStorage.removeItem('vibin_credits');
    }
    setDeleteConfirmOpen(false);
    showToast('All room data and uploaded photos deleted permanently 🗑️', 'info');
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-cream-50 py-8 px-4 sm:px-6 lg:px-8 text-charcoal-900 pb-28 md:pb-12">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="pb-6 border-b border-cream-200">
          <span className="text-xs font-bold uppercase tracking-wider text-terracotta-600">
            Account & Preferences
          </span>
          <h1 className="mt-1 text-2xl font-extrabold text-charcoal-900 sm:text-3xl">
            Your Profile
          </h1>
        </div>

        {/* User Card */}
        <div className="mt-6 rounded-3xl border border-cream-200 bg-white p-6 shadow-soft">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-terracotta-500 to-terracotta-600 text-white font-bold text-xl shadow-soft overflow-hidden">
                {user?.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.avatar_url} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  user?.full_name ? user.full_name[0].toUpperCase() : <User className="h-7 w-7" />
                )}
              </div>

              <div>
                <h2 className="text-lg font-bold text-charcoal-900">
                  {user?.full_name || (isLoggedIn ? 'Vibin Member' : 'Guest Explorer')}
                </h2>
                <p className="text-xs text-charcoal-500">
                  {user?.email || 'Browsing in Guest Preview mode'}
                </p>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="rounded-full bg-cream-100 px-2 py-0.5 text-[10px] font-bold text-charcoal-700 capitalize">
                    Plan: {planType} Member
                  </span>
                  <span className="rounded-full bg-sage-50 px-2 py-0.5 text-[10px] font-bold text-sage-700">
                    Active
                  </span>
                </div>
              </div>
            </div>

            <div>
              {isLoggedIn ? (
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 rounded-full border border-cream-300 bg-cream-100 px-4 py-2 text-xs font-semibold text-charcoal-700 hover:bg-cream-200 transition"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Log Out</span>
                </button>
              ) : (
                <button
                  onClick={() => openLoginModal('Sign in to sync your rooms and credits')}
                  className="rounded-full bg-terracotta-500 px-5 py-2.5 text-xs font-bold text-white shadow-soft hover:bg-terracotta-600 transition"
                >
                  Sign In / Create Account
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Credit Balance Card */}
        <div className="mt-6 rounded-3xl border border-mustard-200 bg-gradient-to-br from-mustard-50 via-white to-mustard-50/40 p-6 shadow-soft">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-mustard-100 text-mustard-700">
                  <Coins className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-mustard-800">
                  Makeover Credits
                </span>
              </div>
              <h3 className="mt-2 text-2xl font-extrabold text-charcoal-900">
                {credits} {credits === 1 ? 'Free Makeover' : 'Free Makeovers'} Remaining
              </h3>
              <p className="mt-0.5 text-xs text-charcoal-500">
                Each credit unlocks a complete before-and-after makeover with shopping checklist.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={openBuyCreditsModal}
                className="flex items-center gap-1.5 rounded-full bg-terracotta-500 px-5 py-2.5 text-xs font-bold text-white shadow-soft hover:bg-terracotta-600 active:scale-95 transition"
              >
                <Coins className="h-3.5 w-3.5" />
                <span>Buy Credits</span>
              </button>

              <button
                onClick={openBuyCreditsModal}
                className="flex items-center gap-1.5 rounded-full border border-charcoal-300 bg-white px-4 py-2.5 text-xs font-bold text-charcoal-800 hover:bg-cream-100 transition"
              >
                <Sparkles className="h-3.5 w-3.5 text-mustard-600" />
                <span>Upgrade to Vibin Pro</span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Preview Cards */}
        <div className="mt-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal-900 mb-3">
            Pricing Plans (India-First Rates)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Starter */}
            <div className="rounded-2xl border border-cream-200 bg-white p-4 shadow-soft">
              <span className="rounded-full bg-cream-100 px-2 py-0.5 text-[10px] font-bold text-charcoal-700">
                Starter
              </span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-charcoal-900">₹49</span>
                <span className="text-xs text-charcoal-500">one-time</span>
              </div>
              <p className="mt-1 text-xs font-semibold text-terracotta-600">5 makeovers</p>
              <p className="mt-1 text-[11px] text-charcoal-500">Great for a quick single-room makeover check.</p>
              <button
                onClick={openBuyCreditsModal}
                className="mt-4 w-full rounded-full border border-cream-300 bg-cream-50 py-2 text-xs font-semibold text-charcoal-800 hover:bg-cream-100"
              >
                Get Starter
              </button>
            </div>

            {/* Makeover Pass */}
            <div className="rounded-2xl border-2 border-terracotta-400 bg-white p-4 shadow-card relative">
              <span className="absolute -top-2.5 right-3 rounded-full bg-terracotta-500 px-2 py-0.5 text-[9px] font-bold text-white shadow-sm">
                Most Popular
              </span>
              <span className="rounded-full bg-terracotta-100 px-2 py-0.5 text-[10px] font-bold text-terracotta-700">
                Makeover Pass
              </span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-charcoal-900">₹99</span>
                <span className="text-xs text-charcoal-500">one-time</span>
              </div>
              <p className="mt-1 text-xs font-semibold text-terracotta-600">15 makeovers</p>
              <p className="mt-1 text-[11px] text-charcoal-500">Test all vibes and share options with flatmates.</p>
              <button
                onClick={openBuyCreditsModal}
                className="mt-4 w-full rounded-full bg-terracotta-500 py-2 text-xs font-bold text-white shadow-soft hover:bg-terracotta-600"
              >
                Get Makeover Pass
              </button>
            </div>

            {/* Vibin Pro */}
            <div className="rounded-2xl border border-cream-200 bg-white p-4 shadow-soft">
              <span className="rounded-full bg-mustard-100 px-2 py-0.5 text-[10px] font-bold text-mustard-800">
                Vibin Pro
              </span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-charcoal-900">₹299</span>
                <span className="text-xs text-charcoal-500">/month</span>
              </div>
              <p className="mt-1 text-xs font-semibold text-terracotta-600">Unlimited Iterations</p>
              <p className="mt-1 text-[11px] text-charcoal-500">Designed for full apartment renovations.</p>
              <button
                onClick={openBuyCreditsModal}
                className="mt-4 w-full rounded-full border border-cream-300 bg-cream-50 py-2 text-xs font-semibold text-charcoal-800 hover:bg-cream-100"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Settings Section */}
        <div className="mt-8 rounded-3xl border border-cream-200 bg-white p-6 shadow-soft">
          <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal-900 mb-4">
            Preferences & Settings
          </h3>

          <div className="space-y-4">
            {/* Language */}
            <div className="flex items-center justify-between pb-3 border-b border-cream-100">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-cream-100 p-2 text-charcoal-600">
                  <Globe className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-charcoal-900">App Language</h4>
                  <p className="text-[11px] text-charcoal-500">English or Hinglish UI tone</p>
                </div>
              </div>

              <div className="flex gap-1.5">
                <button
                  onClick={() => setLanguage('en')}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    language === 'en'
                      ? 'bg-terracotta-500 text-white'
                      : 'border border-cream-300 bg-white text-charcoal-700'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('hinglish')}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    language === 'hinglish'
                      ? 'bg-terracotta-500 text-white'
                      : 'border border-cream-300 bg-white text-charcoal-700'
                  }`}
                >
                  Hinglish 🇮🇳
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between pb-3 border-b border-cream-100">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-cream-100 p-2 text-charcoal-600">
                  <Bell className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-charcoal-900">Makeover Alerts</h4>
                  <p className="text-[11px] text-charcoal-500">Notify when AI room render is completed</p>
                </div>
              </div>

              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  notificationsEnabled ? 'bg-terracotta-500' : 'bg-cream-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Dark Mode (Coming Soon) */}
            <div className="flex items-center justify-between opacity-70">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-cream-100 p-2 text-charcoal-600">
                  <Moon className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-charcoal-900">Dark Mode</h4>
                    <span className="rounded-full bg-mustard-100 px-2 py-0.2 text-[9px] font-bold text-mustard-800">
                      Coming soon
                    </span>
                  </div>
                  <p className="text-[11px] text-charcoal-500">Late night room styling palette</p>
                </div>
              </div>

              <div className="h-6 w-11 rounded-full bg-cream-200 opacity-50 cursor-not-allowed">
                <span className="inline-block h-4 w-4 translate-x-1 transform rounded-full bg-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Privacy & Data Management */}
        <div className="mt-8 rounded-3xl border border-cream-200 bg-white p-6 shadow-soft">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="h-5 w-5 text-sage-600" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal-900">
              Privacy & Data Control
            </h3>
          </div>

          <p className="text-xs text-charcoal-600 leading-relaxed mb-4">
            You have complete control over your uploads. You can purge your room photos, remove generated concepts, or delete your entire account at any moment.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => showToast('All temporary room cache cleared', 'info')}
              className="flex w-full items-center justify-between rounded-2xl border border-cream-300 bg-cream-50/70 p-3.5 text-left text-xs font-semibold text-charcoal-800 hover:bg-cream-100 transition"
            >
              <span>Manage uploaded photos</span>
              <ChevronRight className="h-4 w-4 text-charcoal-400" />
            </button>

            <button
              onClick={() => setDeleteConfirmOpen(true)}
              className="flex w-full items-center justify-between rounded-2xl border border-dustypink-200 bg-dustypink-50/50 p-3.5 text-left text-xs font-semibold text-dustypink-700 hover:bg-dustypink-100/70 transition"
            >
              <div className="flex items-center gap-2">
                <Trash2 className="h-4 w-4 text-dustypink-600" />
                <span>Delete account & all room data</span>
              </div>
              <ChevronRight className="h-4 w-4 text-dustypink-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-elevated border border-dustypink-200">
            <div className="flex items-center gap-3 text-dustypink-600">
              <AlertTriangle className="h-6 w-6" />
              <h3 className="text-base font-bold text-charcoal-900">
                Delete All Room Data?
              </h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-charcoal-600">
              This will permanently delete all your uploaded room photos, generated makeovers, saved shopping checklists, and reset your account. This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-2.5">
              <button
                onClick={() => setDeleteConfirmOpen(false)}
                className="rounded-full border border-cream-300 bg-white px-4 py-2 text-xs font-semibold text-charcoal-700 hover:bg-cream-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAllData}
                className="rounded-full bg-dustypink-600 px-5 py-2 text-xs font-semibold text-white hover:bg-dustypink-700 transition"
              >
                Yes, Delete Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
