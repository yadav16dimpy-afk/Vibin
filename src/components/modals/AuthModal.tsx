'use client';

import React, { useState } from 'react';
import { Sparkles, Mail, ShieldCheck, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function AuthModal() {
  const { loginModalOpen, closeLoginModal, loginModalReason, loginWithGoogle, loginWithEmail } = useApp();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!loginModalOpen) return null;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await loginWithEmail(email, name);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-cream-50 p-6 sm:p-8 shadow-elevated border border-cream-200">
        {/* Close Button */}
        <button
          onClick={closeLoginModal}
          className="absolute right-4 top-4 rounded-full p-2 text-charcoal-400 hover:bg-cream-200/60 hover:text-charcoal-700 transition"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center">
          <div className="mx-auto mb-2 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/vibin-logo-trimmed.png"
              alt="Vibin - Your Space, Your Vibe"
              className="h-16 w-auto object-contain"
            />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-charcoal-900">
            Welcome to Vibin
          </h2>
          <p className="mt-1 text-xs text-charcoal-500">
            {loginModalReason || 'Your room. Your vibe. Your budget.'}
          </p>
        </div>

        {/* Perks pill */}
        <div className="mt-6 rounded-2xl bg-white p-3.5 border border-cream-200 shadow-soft">
          <div className="flex items-center gap-2 text-xs font-semibold text-charcoal-800">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-terracotta-100 text-terracotta-700 text-[10px]">
              ✓
            </span>
            <span>2 Free Makeovers on sign-in</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-charcoal-800">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sage-100 text-sage-700 text-[10px]">
              ✓
            </span>
            <span>Save designs & shopping checklists</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-full border border-charcoal-300 bg-white py-3 px-4 text-sm font-semibold text-charcoal-800 shadow-soft transition hover:bg-cream-100 hover:border-charcoal-400 active:scale-[0.99] disabled:opacity-50"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Email Option Toggle */}
          {!showEmailForm ? (
            <button
              onClick={() => setShowEmailForm(true)}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-cream-300 bg-cream-100 py-3 text-xs font-semibold text-charcoal-700 hover:bg-cream-200/80 transition"
            >
              <Mail className="h-4 w-4" />
              <span>Continue with Email</span>
            </button>
          ) : (
            <form onSubmit={handleEmailSubmit} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-medium text-charcoal-700 mb-1">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Verma"
                  className="w-full rounded-xl border border-cream-300 bg-white px-3.5 py-2.5 text-xs text-charcoal-900 placeholder:text-charcoal-400 focus:border-terracotta-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-charcoal-700 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full rounded-xl border border-cream-300 bg-white px-3.5 py-2.5 text-xs text-charcoal-900 placeholder:text-charcoal-400 focus:border-terracotta-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-terracotta-500 py-2.5 text-xs font-semibold text-white hover:bg-terracotta-600 transition disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Send Magic Link / Sign In'}
              </button>
            </form>
          )}

          {/* Guest preview */}
          <div className="pt-2 text-center">
            <button
              onClick={closeLoginModal}
              className="text-xs font-medium text-charcoal-500 hover:text-charcoal-800 underline decoration-cream-400 underline-offset-4"
            >
              Continue as Guest (Preview Mode)
            </button>
          </div>
        </div>

        {/* Privacy badge */}
        <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-charcoal-500">
          <ShieldCheck className="h-3.5 w-3.5 text-sage-600" />
          <span>Photos remain private. No spam, ever.</span>
        </div>
      </div>
    </div>
  );
}
