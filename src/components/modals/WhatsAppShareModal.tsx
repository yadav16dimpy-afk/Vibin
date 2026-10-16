'use client';

import React, { useState } from 'react';
import { X, Copy, Check, MessageCircle, Share2, Sparkles, Image as ImageIcon } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface WhatsAppShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  styleName: string;
  budgetString: string;
  totalInr: number;
  items: Array<{ title: string; priceInr: number }>;
  imageUrl?: string;
}

export default function WhatsAppShareModal({
  isOpen,
  onClose,
  styleName,
  budgetString,
  totalInr,
  items,
  imageUrl,
}: WhatsAppShareModalProps) {
  const { showToast } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Format message exactly as required in user prompt:
  const checklistLines = items
    .slice(0, 5)
    .map((item) => `- ${item.title} — ₹${item.priceInr.toLocaleString('en-IN')}`)
    .join('\n');

  const formattedMessage = `Here’s my room makeover by Vibin ✨
Style: ${styleName}
Budget: ${budgetString}
Estimated shopping total: ₹${totalInr.toLocaleString('en-IN')}

My shopping checklist:
${checklistLines}

Made with Vibin.`;

  const encodedWhatsAppUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(formattedMessage)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedMessage);
    setCopied(true);
    showToast('Copied makeover summary to clipboard! 📋', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `My Room Makeover by Vibin (${styleName})`,
          text: formattedMessage,
          url: window.location.href,
        });
        showToast('Shared successfully!', 'success');
      } catch (e) {
        // user cancelled
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-cream-50 p-6 shadow-elevated border border-cream-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-charcoal-400 hover:bg-cream-200/60 hover:text-charcoal-700 transition"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#25D366]/15 text-[#25D366]">
            <MessageCircle className="h-6 w-6 fill-current" />
          </div>
          <h2 className="mt-3 text-xl font-bold text-charcoal-900">Share Your Vibe</h2>
          <p className="mt-1 text-xs text-charcoal-500">
            Send your room makeover & shopping list to flatmates or friends on WhatsApp
          </p>
        </div>

        {/* Message Preview Box */}
        <div className="mt-5 rounded-2xl border border-cream-300 bg-white p-4 shadow-soft">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-cream-100">
            <span className="text-[11px] font-bold text-charcoal-400 uppercase tracking-wider">
              WhatsApp Message Preview
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-[11px] font-semibold text-terracotta-600 hover:text-terracotta-700"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
          </div>
          <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-charcoal-800 selection:bg-terracotta-100 max-h-48 overflow-y-auto">
            {formattedMessage}
          </pre>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-2.5">
          <a
            href={encodedWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-sm font-bold text-white shadow-soft transition hover:bg-[#20BD5A] active:scale-95"
          >
            <MessageCircle className="h-4 w-4 fill-white" />
            <span>Send to WhatsApp</span>
          </a>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleNativeShare}
              className="flex items-center justify-center gap-2 rounded-full border border-cream-300 bg-white py-2.5 text-xs font-semibold text-charcoal-700 hover:bg-cream-100 transition"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Share Sheet</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 rounded-full border border-cream-300 bg-white py-2.5 text-xs font-semibold text-charcoal-700 hover:bg-cream-100 transition"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-sage-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Message'}</span>
            </button>
          </div>
        </div>

        <div className="mt-4 text-center">
          <span className="text-[11px] text-charcoal-400">
            Tip: Your flatmates can vote on this vibe before anyone buys decor!
          </span>
        </div>
      </div>
    </div>
  );
}
