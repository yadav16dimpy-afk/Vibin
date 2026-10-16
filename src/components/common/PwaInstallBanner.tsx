'use client';

import React, { useState } from 'react';
import { Download, X, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function PwaInstallBanner() {
  const { canInstallPwa, installPwa } = useApp();
  const [dismissed, setDismissed] = useState(false);

  if (!canInstallPwa || dismissed) return null;

  return (
    <div className="fixed top-20 left-4 right-4 z-30 mx-auto max-w-md rounded-2xl border border-terracotta-200 bg-white/95 p-3.5 shadow-elevated backdrop-blur-md transition-all animate-fade-in">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-cream-300 shadow-soft overflow-hidden p-1.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/vibin-mark.png"
              alt="Vibin App Icon"
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <h4 className="text-xs font-bold text-charcoal-900">Install Vibin App</h4>
            <p className="text-[11px] text-charcoal-500">
              One-tap camera upload & faster room makeovers
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={installPwa}
            className="flex items-center gap-1 rounded-full bg-terracotta-500 px-3 py-1.5 text-xs font-semibold text-white shadow-soft hover:bg-terracotta-600 transition"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Install</span>
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="rounded-full p-1.5 text-charcoal-400 hover:bg-cream-100 hover:text-charcoal-700"
            aria-label="Dismiss banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
