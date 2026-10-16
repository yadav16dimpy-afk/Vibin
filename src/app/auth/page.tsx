'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, Mail, ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function AuthPage() {
  const router = useRouter();
  const { loginWithGoogle, loginWithEmail, isLoggedIn, showToast } = useApp();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [loading, setLoading] = useState(false);

  if (isLoggedIn) {
    router.push('/saved');
    return null;
  }

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      router.push('/saved');
    } finally {
      setLoading(false);
    }
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await loginWithEmail(email, name);
      router.push('/saved');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center bg-cream-50 px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-cream-200 bg-white p-8 shadow-elevated">
        {/* Brand Icon */}
        <div className="text-center">
          <div className="mx-auto mb-3 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/vibin-logo-trimmed.png"
              alt="Vibin - Your Space, Your Vibe"
              className="h-20 w-auto object-contain"
            />
          </div>
          <h1 className="text-2xl font-extrabold text-charcoal-900">
            Sign In to Vibin
          </h1>
          <p className="mt-1 text-xs text-charcoal-500">
            Your room. Your vibe. Your budget.
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-6 rounded-2xl bg-cream-50 p-4 border border-cream-200 space-y-2 text-xs text-charcoal-700">
          <div className="flex items-center gap-2">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-terracotta-100 text-terracotta-700 text-[10px] font-bold">
              ✓
            </span>
            <span>2 Free Makeovers instantly credited</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-sage-100 text-sage-700 text-[10px] font-bold">
              ✓
            </span>
            <span>Sync room designs and shopping checklists</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-mustard-100 text-mustard-700 text-[10px] font-bold">
              ✓
            </span>
            <span>100% private, encrypted photo storage</span>
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="mt-6 space-y-3">
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-full border border-charcoal-300 bg-white py-3 px-4 text-sm font-semibold text-charcoal-800 shadow-soft hover:bg-cream-100 transition disabled:opacity-50"
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

          {!showEmailForm ? (
            <button
              onClick={() => setShowEmailForm(true)}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-cream-300 bg-cream-100 py-3 text-xs font-semibold text-charcoal-700 hover:bg-cream-200 transition"
            >
              <Mail className="h-4 w-4" />
              <span>Continue with Email</span>
            </button>
          ) : (
            <form onSubmit={handleEmail} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-medium text-charcoal-700 mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Vikram Malhotra"
                  className="w-full rounded-xl border border-cream-300 bg-white px-3.5 py-2.5 text-xs text-charcoal-900 focus:border-terracotta-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-charcoal-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-cream-300 bg-white px-3.5 py-2.5 text-xs text-charcoal-900 focus:border-terracotta-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-terracotta-500 py-2.5 text-xs font-semibold text-white hover:bg-terracotta-600 transition disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In with Email'}
              </button>
            </form>
          )}

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="text-xs font-medium text-charcoal-500 hover:text-charcoal-800 underline decoration-cream-300"
            >
              Continue Browsing as Guest
            </Link>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-charcoal-400">
          <ShieldCheck className="h-3.5 w-3.5 text-sage-600" />
          <span>Photos remain private. No spam, ever.</span>
        </div>
      </div>
    </div>
  );
}
