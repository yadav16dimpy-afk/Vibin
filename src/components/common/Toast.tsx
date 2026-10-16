'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function Toast() {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="h-4 w-4 text-sage-600" />,
    error: <AlertCircle className="h-4 w-4 text-dustypink-600" />,
    info: <Info className="h-4 w-4 text-terracotta-500" />,
  };

  return (
    <aside
      aria-label="Notification"
      className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 sm:bottom-6 sm:right-6 sm:left-auto sm:translate-x-0"
    >
      <div className="flex items-center gap-2.5 rounded-full border border-cream-300 bg-white/95 px-4 py-2.5 text-xs font-semibold text-charcoal-800 shadow-elevated backdrop-blur-md animate-bounce-subtle">
        {icons[toast.type]}
        <span>{toast.message}</span>
      </div>
    </aside>
  );
}
